#!/usr/bin/env python3
"""Cruza lo que has enviado con lo que te han respondido, alumno por alumno.

Clasifica a cada alumno en tres grupos:
  1. Le escribiste y te ha contestado.
  2. Le escribiste y NO te contesta  ← el que importa vigilar.
  3. Todavía no le has escrito.

SOLO LECTURA. Nunca envía, marca ni borra nada: los buzones se abren con
readonly=True y no se importa smtplib en ninguna parte.

Uso:
    python3 respuestas_alumnos.py              # últimos 30 días
    python3 respuestas_alumnos.py --dias 90
    python3 respuestas_alumnos.py --todos      # sin límite de fecha
"""

import argparse
import csv
import email
import email.utils
import imaplib
import os
import sys
from datetime import datetime, timedelta
from email.header import decode_header, make_header
from pathlib import Path

BASE = Path(__file__).parent
CSV_ALUMNOS = BASE.parent / "alumnos.csv"
BUZON_ENVIADOS = "[Gmail]/Enviados"

# Correos personales conocidos → correo institucional del alumno.
# Solo hace falta añadir aquí los casos que la detección por nombre no pille.
ALIAS = {
    "rebeksaba@gmail.com": "rebeca.sanchez.bautista@students.thepower.education",
    "pelayoespinosa@gmail.com": "pelayo.espinosa.tavira@students.thepower.education",
}


def normalizar(texto):
    """minúsculas, sin acentos, sin puntuación."""
    import unicodedata
    t = unicodedata.normalize("NFKD", texto or "").encode("ascii", "ignore").decode()
    return "".join(c if c.isalnum() or c.isspace() else " " for c in t.lower()).split()


def emparejar_por_nombre(display, alumnos):
    """Si un correo desconocido trae un nombre que casa con un alumno, lo asocia.

    Exige al menos 2 palabras coincidentes (nombre + apellido) para no
    confundir a dos alumnos que compartan nombre de pila.
    """
    tokens = set(normalizar(display))
    if len(tokens) < 2:
        return None
    mejor, puntos = None, 0
    for correo, a in alumnos.items():
        comunes = tokens & set(normalizar(a["nombre"]))
        if len(comunes) >= 2 and len(comunes) > puntos:
            mejor, puntos = correo, len(comunes)
    return mejor


def cargar_env():
    ruta = BASE / ".env"
    if not ruta.exists():
        sys.exit(f"No existe {ruta}. Copia .env.example a .env y rellénalo.")
    for linea in ruta.read_text(encoding="utf-8").splitlines():
        linea = linea.strip()
        if linea and not linea.startswith("#") and "=" in linea:
            k, v = linea.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip())


def cargar_alumnos():
    if not CSV_ALUMNOS.exists():
        sys.exit(f"No existe {CSV_ALUMNOS}")
    alumnos = {}
    with CSV_ALUMNOS.open(encoding="utf-8") as f:
        for fila in csv.DictReader(f):
            correo = (fila.get("email") or "").strip().lower()
            if correo and "@" in correo and not correo.startswith("pendiente"):
                alumnos[correo] = {
                    "nombre": fila["nombre"].strip(),
                    "ciclo": (fila.get("ciclo") or "").strip(),
                    "recibidos": [],   # lo que me ha escrito
                    "enviados": [],    # lo que yo le he escrito
                }
    return alumnos


def decodificar(valor):
    if not valor:
        return ""
    try:
        return str(make_header(decode_header(valor)))
    except Exception:
        return valor


def fecha(msg):
    try:
        dt = email.utils.parsedate_to_datetime(msg.get("Date"))
        return dt.replace(tzinfo=None) if dt.tzinfo else dt
    except Exception:
        return None


def direcciones(msg, campos):
    """Devuelve todas las direcciones que aparecen en los campos indicados."""
    out = []
    for campo in campos:
        for valor in msg.get_all(campo, []):
            for _, addr in email.utils.getaddresses([valor]):
                if addr:
                    out.append(addr.lower().strip())
    return out


def recorrer(m, buzon, criterio, campos, callback):
    """Abre un buzón en solo lectura y aplica callback a cada mensaje."""
    estado, _ = m.select(buzon, readonly=True)
    if estado != "OK":
        print(f"  ⚠ No se pudo abrir {buzon}, se omite.")
        return 0
    _, datos = m.search(None, criterio)
    ids = datos[0].split()
    cabeceras = " ".join(campos + ["SUBJECT", "DATE"])
    for num in ids:
        _, cuerpo = m.fetch(num, f"(BODY.PEEK[HEADER.FIELDS ({cabeceras})])")
        if cuerpo and isinstance(cuerpo[0], tuple):
            callback(email.message_from_bytes(cuerpo[0][1]))
    return len(ids)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dias", type=int, default=30)
    ap.add_argument("--todos", action="store_true")
    args = ap.parse_args()

    cargar_env()
    alumnos = cargar_alumnos()

    resolver = {c: c for c in alumnos}
    for alt, oficial in ALIAS.items():
        if oficial in alumnos:
            resolver[alt.lower()] = oficial

    m = imaplib.IMAP4_SSL(os.environ.get("IMAP_HOST", "imap.gmail.com"),
                          int(os.environ.get("IMAP_PORT", 993)))
    m.login(os.environ["IMAP_USER"], os.environ["IMAP_PASS"].replace(" ", ""))

    if args.todos:
        criterio, etiqueta = "ALL", "todo el histórico"
    else:
        desde = (datetime.now() - timedelta(days=args.dias)).strftime("%d-%b-%Y")
        criterio, etiqueta = f'(SINCE "{desde}")', f"últimos {args.dias} días"

    detectados = {}  # correo personal → alumno, hallados por nombre

    def registrar(clave, campos):
        def _cb(msg):
            for campo in campos:
                for valor in msg.get_all(campo, []):
                    for display, addr in email.utils.getaddresses([valor]):
                        if not addr:
                            continue
                        addr = addr.lower().strip()
                        oficial = resolver.get(addr)
                        if not oficial and clave == "recibidos":
                            # correo desconocido: ¿el nombre casa con algún alumno?
                            oficial = emparejar_por_nombre(display, alumnos)
                            if oficial:
                                resolver[addr] = oficial
                                detectados[addr] = alumnos[oficial]["nombre"]
                        if oficial:
                            alumnos[oficial][clave].append({
                                "fecha": fecha(msg),
                                "asunto": decodificar(msg.get("Subject")),
                                "addr": addr,
                            })
        return _cb

    n_in = recorrer(m, "INBOX", criterio, ["FROM"], registrar("recibidos", ["FROM"]))
    n_out = recorrer(m, BUZON_ENVIADOS, criterio,
                     ["TO", "CC", "BCC"], registrar("enviados", ["TO", "CC", "BCC"]))
    m.logout()

    print(f"Revisados {n_in} mensajes de INBOX y {n_out} de Enviados ({etiqueta}).\n")

    contestan   = [a for a in alumnos.values() if a["enviados"] and a["recibidos"]]
    sin_contestar = [a for a in alumnos.values() if a["enviados"] and not a["recibidos"]]
    sin_escribir  = [a for a in alumnos.values() if not a["enviados"]]
    # Han escrito ellos sin que yo les haya escrito antes
    espontaneos = [a for a in alumnos.values() if not a["enviados"] and a["recibidos"]]
    sin_escribir = [a for a in sin_escribir if a not in espontaneos]

    def ultimo_de(msgs):
        return sorted(msgs, key=lambda x: x["fecha"] or datetime.min)[-1] if msgs else None

    def fmt(msg):
        return msg["fecha"].strftime("%d/%m/%Y") if msg and msg["fecha"] else "?"

    def linea(a, msgs, etiqueta_fecha):
        ultimo = ultimo_de(msgs)
        print(f"  · {a['nombre']} ({a['ciclo']}) — {etiqueta_fecha} {fmt(ultimo)}")
        print(f"      {ultimo['asunto'][:66]}")
        if ultimo["addr"] not in alumnos:
            print(f"      ⚠ correo personal: {ultimo['addr']}")
        # ¿Su último mensaje es posterior a mi última respuesta?
        mio, suyo = ultimo_de(a["enviados"]), ultimo_de(a["recibidos"])
        if mio and suyo and suyo["fecha"] and mio["fecha"]:
            if suyo["fecha"] > mio["fecha"]:
                print(f"      → PENDIENTE DE TU RESPUESTA (le escribiste el {fmt(mio)})")
            else:
                print(f"      → ya respondido el {fmt(mio)}")

    if espontaneos:
        print("=" * 76)
        print(f"TE HAN ESCRITO ELLOS (sin correo previo tuyo): {len(espontaneos)}")
        print("=" * 76)
        for a in sorted(espontaneos, key=lambda x: x["nombre"]):
            linea(a, a["recibidos"], "escribió el")

    if contestan:
        print("\n" + "=" * 76)
        print(f"LE ESCRIBISTE Y TE HA CONTESTADO: {len(contestan)}")
        print("=" * 76)
        for a in sorted(contestan, key=lambda x: x["nombre"]):
            linea(a, a["recibidos"], "contestó el")

    if sin_contestar:
        print("\n" + "=" * 76)
        print(f"⚠ LE ESCRIBISTE Y NO CONTESTA: {len(sin_contestar)}")
        print("=" * 76)
        for a in sorted(sin_contestar, key=lambda x: (x["ciclo"], x["nombre"])):
            linea(a, a["enviados"], "le escribiste el")
        print("\n  No contestar a las comunicaciones del tutor es causa de suspenso")
        print("  automático. Conviene insistir y dejar constancia.")

    if sin_escribir:
        print("\n" + "=" * 76)
        print(f"TODAVÍA NO LE HAS ESCRITO: {len(sin_escribir)}")
        print("=" * 76)
        for a in sorted(sin_escribir, key=lambda x: (x["ciclo"], x["nombre"])):
            print(f"  · {a['nombre']} ({a['ciclo']})")

    nuevos = {a: n for a, n in detectados.items() if a not in ALIAS}
    if nuevos:
        print("\n" + "=" * 76)
        print("CORREOS PERSONALES DETECTADOS POR NOMBRE (verifica y añádelos a ALIAS)")
        print("=" * 76)
        for addr, nombre in nuevos.items():
            print(f'  "{addr}": ...  # {nombre}')

    print(f"\nTotal: {len(alumnos)} alumnos.")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Detecta qué alumnos han respondido al correo y cuáles siguen sin dar señales.

SOLO LECTURA. Este script nunca envía, marca ni borra nada: el buzón se abre
con readonly=True y no se importa smtplib en ninguna parte.

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
import re
import sys
from datetime import datetime, timedelta
from email.header import decode_header, make_header
from pathlib import Path

BASE = Path(__file__).parent
CSV_ALUMNOS = BASE.parent / "alumnos.csv"

# Correos personales desde los que algún alumno escribe (no institucionales).
# Clave: correo alternativo → valor: correo institucional del alumno.
ALIAS = {
    "rebeksaba@gmail.com": "rebeca.sanchez.bautista@students.thepower.education",
}


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
                    "modulo": (fila.get("modulo") or "").strip(),
                    "mensajes": [],
                }
    return alumnos


def decodificar(valor):
    if not valor:
        return ""
    try:
        return str(make_header(decode_header(valor)))
    except Exception:
        return valor


def remitente(msg):
    bruto = msg.get("From", "")
    _, addr = email.utils.parseaddr(bruto)
    return addr.lower().strip()


def fecha(msg):
    try:
        dt = email.utils.parsedate_to_datetime(msg.get("Date"))
        return dt.replace(tzinfo=None) if dt.tzinfo else dt
    except Exception:
        return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dias", type=int, default=30, help="ventana de búsqueda (por defecto 30)")
    ap.add_argument("--todos", action="store_true", help="buscar sin límite de fecha")
    args = ap.parse_args()

    cargar_env()
    alumnos = cargar_alumnos()

    # Mapa de cualquier correo conocido (institucional o alias) → institucional
    resolver = {c: c for c in alumnos}
    for alt, oficial in ALIAS.items():
        if oficial in alumnos:
            resolver[alt.lower()] = oficial

    m = imaplib.IMAP4_SSL(os.environ.get("IMAP_HOST", "imap.gmail.com"),
                          int(os.environ.get("IMAP_PORT", 993)))
    m.login(os.environ["IMAP_USER"], os.environ["IMAP_PASS"].replace(" ", ""))
    m.select("INBOX", readonly=True)  # ← solo lectura, siempre

    if args.todos:
        criterio, etiqueta = "ALL", "todo el histórico"
    else:
        desde = (datetime.now() - timedelta(days=args.dias)).strftime("%d-%b-%Y")
        criterio, etiqueta = f'(SINCE "{desde}")', f"últimos {args.dias} días"

    _, datos = m.search(None, criterio)
    ids = datos[0].split()
    print(f"Revisando {len(ids)} mensajes de INBOX ({etiqueta})…\n")

    for num in ids:
        _, cuerpo = m.fetch(num, "(BODY.PEEK[HEADER.FIELDS (FROM SUBJECT DATE)])")
        if not cuerpo or not isinstance(cuerpo[0], tuple):
            continue
        msg = email.message_from_bytes(cuerpo[0][1])
        addr = remitente(msg)
        oficial = resolver.get(addr)
        if oficial:
            alumnos[oficial]["mensajes"].append({
                "fecha": fecha(msg),
                "asunto": decodificar(msg.get("Subject")),
                "desde": addr,
            })

    m.logout()

    # ── Informe ──
    han_escrito = {c: a for c, a in alumnos.items() if a["mensajes"]}
    en_silencio = {c: a for c, a in alumnos.items() if not a["mensajes"]}

    print("=" * 78)
    print(f"HAN ESCRITO: {len(han_escrito)} de {len(alumnos)}")
    print("=" * 78)
    for a in sorted(han_escrito.values(), key=lambda x: x["nombre"]):
        msgs = sorted(a["mensajes"], key=lambda x: x["fecha"] or datetime.min, reverse=True)
        ultimo = msgs[0]
        cuando = ultimo["fecha"].strftime("%d/%m/%Y %H:%M") if ultimo["fecha"] else "?"
        print(f"\n  {a['nombre']} ({a['ciclo']}) · {len(msgs)} mensaje(s)")
        print(f"    Último: {cuando}")
        print(f"    Asunto: {ultimo['asunto'][:70]}")
        if ultimo["desde"] not in alumnos:
            print(f"    ⚠ Escribe desde correo personal: {ultimo['desde']}")

    print("\n" + "=" * 78)
    print(f"SIN RESPUESTA: {len(en_silencio)} de {len(alumnos)}")
    print("=" * 78)
    for a in sorted(en_silencio.values(), key=lambda x: (x["ciclo"], x["nombre"])):
        print(f"  · {a['nombre']} ({a['ciclo']})")

    if en_silencio:
        print("\nRecuerda: no contestar a las comunicaciones del tutor es causa")
        print("de suspenso automático. Conviene dejar constancia del seguimiento.")


if __name__ == "__main__":
    main()

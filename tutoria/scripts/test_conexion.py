#!/usr/bin/env python3
"""Comprueba que la conexión IMAP funciona antes de montar nada más encima."""

import imaplib
import os
import sys
from pathlib import Path


def cargar_env(ruta=None):
    ruta = Path(ruta or Path(__file__).parent / ".env")
    if not ruta.exists():
        sys.exit(f"No existe {ruta}\nCopia .env.example a .env y rellénalo.")
    for linea in ruta.read_text(encoding="utf-8").splitlines():
        linea = linea.strip()
        if linea and not linea.startswith("#") and "=" in linea:
            clave, valor = linea.split("=", 1)
            os.environ.setdefault(clave.strip(), valor.strip())


def main():
    cargar_env()
    user = os.environ.get("IMAP_USER")
    password = os.environ.get("IMAP_PASS", "").replace(" ", "")
    host = os.environ.get("IMAP_HOST", "imap.gmail.com")
    port = int(os.environ.get("IMAP_PORT", 993))

    if not user or not password or password.startswith("x" * 8):
        sys.exit("Falta rellenar IMAP_USER o IMAP_PASS en .env")

    print(f"Conectando a {host}:{port} como {user} …")
    try:
        m = imaplib.IMAP4_SSL(host, port)
        m.login(user, password)
    except imaplib.IMAP4.error as e:
        msg = str(e)
        print(f"\n❌ Fallo de autenticación: {msg}\n")
        if "Invalid credentials" in msg or "AUTHENTICATIONFAILED" in msg:
            print("Causas habituales:")
            print("  • La contraseña de aplicación está mal copiada (quita los espacios).")
            print("  • El administrador de thePower tiene IMAP deshabilitado.")
            print("  • No tienes la verificación en dos pasos activada.")
        sys.exit(1)

    print("✅ Conexión correcta.\n")

    estado, buzones = m.list()
    print(f"Buzones disponibles ({len(buzones)}):")
    for b in buzones:
        nombre = b.decode(errors="replace").split(' "/" ')[-1].strip('"')
        print(f"  · {nombre}")

    m.select("INBOX", readonly=True)
    _, datos = m.search(None, "ALL")
    total = len(datos[0].split())
    _, no_leidos = m.search(None, "UNSEEN")
    print(f"\nINBOX: {total} mensajes, {len(no_leidos[0].split())} sin leer.")

    m.logout()


if __name__ == "__main__":
    main()

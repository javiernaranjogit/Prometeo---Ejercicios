# Mail — Recordatorio deadline parejas/grupos PI (URGENTE)

**Asunto:** ⚠️ Último aviso · Proyecto Intermodular en pareja o grupo — plazo miércoles 23/09 a las 23:59

**Para:** (Bcc a los 9 alumnos de PI)

---

Hola,

Os escribo para recordaros el **plazo del Proyecto Intermodular**.

El proyecto se puede hacer de **tres formas**:

- **Individual**
- **En pareja**
- **En grupo de 3 personas como máximo**

El único requisito es que **todos los integrantes sean del mismo ciclo formativo** (todos ASIR o todos DAW; no se pueden mezclar).

## ⏰ Plazo: miércoles 23 de septiembre de 2026, 23:59

**Si quieres hacerlo en pareja o en grupo**, respóndeme a este correo **antes del miércoles** indicando:

- Nombres completos de todos los integrantes
- Ciclo formativo

Es importante avisar con tiempo porque, si los integrantes tenéis tutores distintos, hay que reasignar el grupo a un único tutor y anotarlo para la organización de los tribunales de defensa.

**Si no me dices nada antes del plazo**, se dará por hecho que harás el proyecto de forma **individual**.

> **Nota:** si alguno de vosotros ve que no aparece en los listados de Proyecto Intermodular, avisadme. Puede ser que no estéis matriculados en el módulo (las prácticas y el proyecto son cosas distintas: el proyecto sí requiere matrícula).

Cualquier duda, aquí estoy.

Un saludo,
**Javier Naranjo**
Tutor de Proyecto Intermodular y FFE
javier.naranjo@thepower.education

---

## Lista Bcc

Los correos están en `tutoria/alumnos.csv` (fuera de git por contener datos personales).
Para generarla:

```bash
awk -F, 'NR>1 && $4 ~ /PI/ {printf "%s, ", $3}' tutoria/alumnos.csv
```

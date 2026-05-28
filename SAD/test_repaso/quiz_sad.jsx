const { useState } = React;

const QUESTIONS = [
  {
    "id": 1,
    "unit": "U1",
    "tag": "S1 · Triada CIA",
    "q": "¿Cuál es la definición correcta de 'vulnerabilidad' en seguridad informática?",
    "options": [
      "Evento externo con potencial de causar daño",
      "Debilidad explotable en un sistema o proceso",
      "Combinación de probabilidad e impacto",
      "Acción malintencionada de un atacante"
    ],
    "correct": 1,
    "explanation": "La vulnerabilidad es la debilidad del sistema (contraseña débil, puerto abierto, software sin actualizar). La amenaza es el evento potencial, y el riesgo surge cuando una amenaza aprovecha una vulnerabilidad."
  },
  {
    "id": 2,
    "unit": "U1",
    "tag": "S1 · Triada CIA",
    "q": "La 'Disponibilidad' en la triada CIA garantiza que...",
    "options": [
      "Solo los usuarios autorizados acceden a la información",
      "Los datos no son alterados sin autorización",
      "Los sistemas están accesibles cuando se necesitan",
      "Las comunicaciones están cifradas en tránsito"
    ],
    "correct": 2,
    "explanation": "Disponibilidad = sistemas y datos operativos cuando el usuario los necesita. Se garantiza con redundancia, copias de seguridad y planes de continuidad de negocio."
  },
  {
    "id": 3,
    "unit": "U1",
    "tag": "S1 · Triada CIA",
    "q": "El ransomware WannaCry (2017) afectó principalmente a cuál principio de la triada CIA como más dañino:",
    "options": [
      "Confidencialidad",
      "Integridad",
      "Disponibilidad",
      "Autenticidad"
    ],
    "correct": 2,
    "explanation": "WannaCry paralizó hospitales y empresas: nadie podía acceder a sus sistemas. Afectó la Disponibilidad de forma masiva, aunque también comprometió la Integridad (datos cifrados sin permiso)."
  },
  {
    "id": 4,
    "unit": "U1",
    "tag": "S1 · Riesgo",
    "q": "¿Cuál es la fórmula conceptual del riesgo en seguridad?",
    "options": [
      "Amenaza × Impacto",
      "Amenaza + Vulnerabilidad",
      "Vulnerabilidad / Probabilidad",
      "Impacto − Contramedida"
    ],
    "correct": 1,
    "explanation": "Riesgo = Amenaza + Vulnerabilidad. El riesgo existe cuando una amenaza puede aprovechar una vulnerabilidad. Se gestiona evaluando probabilidad × impacto y aplicando contramedidas."
  },
  {
    "id": 5,
    "unit": "U2",
    "tag": "S2 · RGPD",
    "q": "¿En cuántas horas como máximo debe notificarse una brecha de datos a la autoridad según el RGPD?",
    "options": [
      "24 horas",
      "48 horas",
      "72 horas",
      "7 días"
    ],
    "correct": 2,
    "explanation": "El RGPD exige notificar brechas a la autoridad de control (AEPD en España) en un plazo máximo de 72 horas desde que se tiene conocimiento del incidente."
  },
  {
    "id": 6,
    "unit": "U2",
    "tag": "S2 · Normativas",
    "q": "¿Cuál de estos marcos es OBLIGATORIO para el sector público español?",
    "options": [
      "ISO/IEC 27001",
      "RGPD únicamente",
      "ENS (Esquema Nacional de Seguridad)",
      "NIST CSF"
    ],
    "correct": 2,
    "explanation": "El ENS es obligatorio para la Administración Pública española y sus proveedores de servicios. ISO 27001 y NIST son voluntarios (aunque muy recomendados)."
  },
  {
    "id": 7,
    "unit": "U2",
    "tag": "S2 · ISO 27001",
    "q": "El ciclo de mejora continua de ISO 27001 se denomina:",
    "options": [
      "ISMS",
      "PDCA",
      "DPIA",
      "RACI"
    ],
    "correct": 1,
    "explanation": "PDCA (Plan-Do-Check-Act): planificar → implementar → verificar → actuar. Es el ciclo que estructura el SGSI de ISO 27001 y garantiza la mejora continua."
  },
  {
    "id": 8,
    "unit": "U2",
    "tag": "S2 · Roles",
    "q": "El DPO (Delegado de Protección de Datos) vela principalmente por el cumplimiento de:",
    "options": [
      "ISO/IEC 27001",
      "ENS",
      "RGPD",
      "PCI-DSS"
    ],
    "correct": 2,
    "explanation": "El DPO es el rol exigido por el RGPD para garantizar el cumplimiento en materia de protección de datos personales. Actúa como punto de contacto con la AEPD."
  },
  {
    "id": 9,
    "unit": "U2",
    "tag": "S3 · BCP",
    "q": "¿Qué mide el RPO (Recovery Point Objective)?",
    "options": [
      "Tiempo máximo para restaurar el servicio",
      "Máxima pérdida de datos tolerable expresada en tiempo",
      "Número de réplicas necesarias",
      "Coste total de la recuperación"
    ],
    "correct": 1,
    "explanation": "RPO define cuántos datos puede permitirse perder una organización (en tiempo). RTO define cuánto tiempo puede estar caído el servicio. Ambos guían la arquitectura de continuidad."
  },
  {
    "id": 10,
    "unit": "U2",
    "tag": "S3 · Incidentes",
    "q": "¿Cuál es la primera acción correcta ante sospecha de infección por malware en un equipo corporativo?",
    "options": [
      "Apagar el equipo inmediatamente y desenchufarlo",
      "Aislarlo de la red para contener la propagación lateral",
      "Pagar el rescate si es ransomware",
      "Reinstalar el sistema operativo sin análisis previo"
    ],
    "correct": 1,
    "explanation": "Primer paso: aislar el equipo de la red (física y lógicamente) para evitar que el malware se propague. Luego se analiza, erradica y recupera siguiendo el playbook de incidentes."
  },
  {
    "id": 11,
    "unit": "U2",
    "tag": "S3 · Auditoría",
    "q": "El propósito principal de una auditoría de seguridad es:",
    "options": [
      "Encontrar responsables de errores y sancionarlos",
      "Mejorar la postura de seguridad detectando no conformidades",
      "Certificar al personal de TI en sus puestos",
      "Justificar el presupuesto de seguridad anual"
    ],
    "correct": 1,
    "explanation": "Las auditorías no buscan culpables, sino detectar vulnerabilidades y oportunidades de mejora. En marcos como ISO 27001 son un requisito obligatorio del ciclo PDCA."
  },
  {
    "id": 12,
    "unit": "U2",
    "tag": "S3 · BCP",
    "q": "El incidente de OVHcloud (2021) demostró que tener backups en el mismo recinto físico...",
    "options": [
      "Es suficiente para garantizar la continuidad del negocio",
      "No protege ante desastres físicos como incendios",
      "Es la mejor práctica según ISO 22301",
      "Reduce el RTO prácticamente a cero"
    ],
    "correct": 1,
    "explanation": "El incendio en Estrasburgo destruyó las copias almacenadas en el mismo edificio. Solo sobrevivieron clientes con copias off-site (en otras sedes). Backup ≠ continuidad sin separación geográfica."
  },
  {
    "id": 13,
    "unit": "U2",
    "tag": "S4 · MFA",
    "q": "MFA (autenticación multifactor) combina factores de categorías distintas. ¿Cuál opción combina correctamente dos categorías diferentes?",
    "options": [
      "Contraseña + PIN numérico",
      "Huella dactilar + reconocimiento facial",
      "Contraseña + token TOTP del móvil",
      "Dos contraseñas diferentes en sistemas distintos"
    ],
    "correct": 2,
    "explanation": "MFA combina: SABES (contraseña) + TIENES (token TOTP/móvil) + ERES (biometría). Contraseña + PIN son ambos 'algo que sabes' → misma categoría, no es MFA real."
  },
  {
    "id": 14,
    "unit": "U2",
    "tag": "S4 · ACL",
    "q": "El 'principio de mínimo privilegio' establece que:",
    "options": [
      "Solo el administrador tiene acceso completo a todos los recursos",
      "Cada usuario tiene solo los permisos imprescindibles para su trabajo",
      "Los privilegios se otorgan por defecto a todos los empleados",
      "Los permisos concedidos nunca se revocan automáticamente"
    ],
    "correct": 1,
    "explanation": "Mínimo privilegio: cada persona (o proceso) tiene solo los accesos estrictamente necesarios para su función. Reduce la superficie de ataque y limita el daño si una cuenta es comprometida."
  },
  {
    "id": 15,
    "unit": "U2",
    "tag": "S4 · Herramientas",
    "q": "¿Qué comando de Linux configura ACLs granulares sobre archivos y directorios?",
    "options": [
      "chmod",
      "chown",
      "setfacl",
      "sudo"
    ],
    "correct": 2,
    "explanation": "setfacl (y getfacl para consultar) permiten permisos por usuario/grupo específico, más granular que chmod. Ejemplo: setfacl -m u:juan:rw archivo.txt"
  },
  {
    "id": 16,
    "unit": "U2",
    "tag": "S4 · MFA",
    "q": "Una llave de seguridad FIDO2/WebAuthn (como YubiKey) corresponde al factor de autenticación:",
    "options": [
      "Algo que sabes",
      "Algo que tienes",
      "Algo que eres",
      "Algo que haces"
    ],
    "correct": 1,
    "explanation": "YubiKey es un dispositivo físico → 'algo que tienes'. Es el factor más resistente al phishing porque la autenticación está vinculada criptográficamente al dominio del sitio."
  },
  {
    "id": 17,
    "unit": "U3",
    "tag": "S5 · Backup",
    "q": "La regla 3-2-1 de backups establece: 3 copias totales, 2 medios distintos y...",
    "options": [
      "1 copia cifrada obligatoriamente",
      "1 copia fuera de las instalaciones (off-site)",
      "1 copia en modo RAID",
      "1 copia en la nube pública"
    ],
    "correct": 1,
    "explanation": "3 copias · 2 medios de almacenamiento distintos (ej: disco local + NAS) · 1 copia off-site (otra sede o nube). La copia off-site protege ante desastres físicos que destruyan la ubicación principal."
  },
  {
    "id": 18,
    "unit": "U3",
    "tag": "S5 · Backup",
    "q": "¿Por qué RAID NO es un sustituto del sistema de backup?",
    "options": [
      "Porque es demasiado lento para grandes volúmenes",
      "Porque no protege contra borrado accidental, corrupción de datos o ransomware",
      "Porque requiere conexión a Internet constante",
      "Porque no está estandarizado en entornos empresariales"
    ],
    "correct": 1,
    "explanation": "RAID ofrece redundancia ante fallos de hardware, pero replica también los errores: si cifras o borras un archivo por error, el RAID lo replica en todos los discos. RAID = disponibilidad; backup = recuperación."
  },
  {
    "id": 19,
    "unit": "U3",
    "tag": "S5 · Backup",
    "q": "La evolución 3-2-1-1-0 añade respecto al 3-2-1 original:",
    "options": [
      "1 copia en RAID adicional + 0 errores de hardware",
      "1 copia inmutable o air-gapped + 0 errores tras verificación de restauración",
      "1 copia diaria adicional + 0 interrupciones del servicio",
      "1 responsable designado + 0 accesos no autorizados a backups"
    ],
    "correct": 1,
    "explanation": "El '1' extra es una copia inmutable o air-gapped (desconectada de la red, inaccesible para el ransomware). El '0' = cero errores confirmados en prueba de restauración real."
  },
  {
    "id": 20,
    "unit": "U3",
    "tag": "S5 · Herramientas",
    "q": "¿Qué comando Linux sincroniza eficientemente transfiriendo solo los archivos modificados?",
    "options": [
      "cp -r /origen /destino",
      "scp -r usuario@servidor:/backup",
      "rsync -avh --delete /origen/ /destino/",
      "dd if=/origen of=/destino"
    ],
    "correct": 2,
    "explanation": "rsync -avh --delete sincroniza solo cambios, preserva permisos y evita duplicados. Con cron se automatizan copias periódicas. Funciona también por SSH: rsync -avz /carpeta usuario@servidor:/backup/"
  },
  {
    "id": 21,
    "unit": "U3",
    "tag": "S6 · Forense",
    "q": "¿Cuál es la fase INICIAL del proceso de análisis forense digital?",
    "options": [
      "Preservación",
      "Análisis",
      "Identificación",
      "Documentación"
    ],
    "correct": 2,
    "explanation": "Orden correcto: Identificación → Preservación → Análisis → Documentación → Presentación. Primero se localiza qué evidencia existe (discos, RAM, logs) antes de actuar sobre ella."
  },
  {
    "id": 22,
    "unit": "U3",
    "tag": "S6 · Forense",
    "q": "¿Por qué NO se debe encender un dispositivo sospechoso para analizarlo directamente?",
    "options": [
      "Puede dañar físicamente los discos magnéticos",
      "El SO modifica miles de registros al arrancar, destruyendo evidencia volátil",
      "El antivirus bloqueará el acceso forense",
      "Viola el RGPD si contiene datos personales"
    ],
    "correct": 1,
    "explanation": "Al encender el sistema, el SO escribe en disco (logs de arranque, timestamps, swap). Se destruye evidencia crítica. Procedimiento correcto: apagar directamente y crear imagen forense bit-a-bit."
  },
  {
    "id": 23,
    "unit": "U3",
    "tag": "S6 · Herramientas",
    "q": "¿Qué herramienta forense es el estándar para analizar volcados de memoria RAM?",
    "options": [
      "Autopsy",
      "FTK Imager",
      "Volatility Framework",
      "Wireshark"
    ],
    "correct": 2,
    "explanation": "Volatility Framework examina volcados de RAM: identifica procesos en ejecución, contraseñas en memoria, malware oculto y conexiones activas que no dejan rastro en disco."
  },
  {
    "id": 24,
    "unit": "U3",
    "tag": "S6 · Cadena de custodia",
    "q": "La 'cadena de custodia' en análisis forense sirve para:",
    "options": [
      "Cifrar las evidencias para que no sean accesibles",
      "Demostrar que la evidencia no ha sido alterada desde su recogida",
      "Acelerar el proceso de análisis técnico",
      "Reducir el tamaño de las imágenes forenses"
    ],
    "correct": 1,
    "explanation": "La cadena de custodia documenta cada manipulación: quién, cuándo, qué hizo. Sin ella las pruebas pierden validez legal. Es el pilar de admisibilidad judicial de la evidencia digital."
  },
  {
    "id": 25,
    "unit": "U4",
    "tag": "S7 · Criptografía",
    "q": "¿Cuál es la principal VENTAJA de la criptografía simétrica sobre la asimétrica?",
    "options": [
      "Resuelve el problema del intercambio seguro de claves",
      "Es órdenes de magnitud más rápida para cifrar grandes volúmenes de datos",
      "No requiere ningún tipo de clave secreta compartida",
      "Permite crear firmas digitales verificables"
    ],
    "correct": 1,
    "explanation": "La criptografía simétrica (AES) es mucho más rápida. Por eso cifra el tráfico de datos. La asimétrica (RSA/ECC) solo se usa para intercambiar la clave simétrica temporal de forma segura."
  },
  {
    "id": 26,
    "unit": "U4",
    "tag": "S7 · Criptografía",
    "q": "En criptografía asimétrica, para ENVIAR un mensaje cifrado a alguien usas:",
    "options": [
      "Tu propia clave privada",
      "Tu propia clave pública",
      "La clave pública del destinatario",
      "La clave privada del destinatario"
    ],
    "correct": 2,
    "explanation": "Cifras con la clave PÚBLICA del destinatario. Solo él puede descifrar con su clave PRIVADA (que nunca comparte). Para firma digital es al revés: firmas con TU clave privada."
  },
  {
    "id": 27,
    "unit": "U4",
    "tag": "S7 · Criptografía",
    "q": "¿Qué algoritmo es hoy el estándar de facto para cifrado simétrico seguro?",
    "options": [
      "DES",
      "3DES",
      "AES",
      "RSA"
    ],
    "correct": 2,
    "explanation": "AES (Advanced Encryption Standard) con claves de 128, 192 o 256 bits es el estándar adoptado por el gobierno de EE.UU. DES y 3DES están obsoletos. RSA es asimétrico, no simétrico."
  },
  {
    "id": 28,
    "unit": "U4",
    "tag": "S7 · Criptografía",
    "q": "El caso Enigma (WWII) demostró que el punto más débil de la criptografía simétrica es:",
    "options": [
      "El algoritmo matemático de cifrado en sí",
      "La longitud insuficiente de las claves",
      "La gestión y distribución segura de las claves",
      "El hardware electromecánico que lo ejecuta"
    ],
    "correct": 2,
    "explanation": "Enigma tenía 150 billones de combinaciones posibles pero la clave diaria debía distribuirse físicamente a todos los operadores. Si una copia caía en manos enemigas, todo el sistema quedaba comprometido."
  },
  {
    "id": 29,
    "unit": "U4",
    "tag": "S8 · Hash",
    "q": "¿Cuál es la característica fundamental de una función hash criptográfica?",
    "options": [
      "Se puede revertir conociendo la clave de cifrado",
      "Produce una huella de longitud fija e irreversible de cualquier entrada",
      "Usa la misma clave que el cifrado simétrico AES",
      "Solo funciona correctamente con texto plano ASCII"
    ],
    "correct": 1,
    "explanation": "Hash = función irreversible (no se puede recuperar el original a partir del hash). Misma entrada → mismo hash siempre. Cambiar 1 bit en la entrada cambia completamente el hash (efecto avalancha)."
  },
  {
    "id": 30,
    "unit": "U4",
    "tag": "S8 · Hash",
    "q": "¿Cuál de estos algoritmos hash está actualmente OBSOLETO y no debe usarse en producción?",
    "options": [
      "SHA-256",
      "SHA-3",
      "MD5",
      "SHA-512"
    ],
    "correct": 2,
    "explanation": "MD5 y SHA-1 están obsoletos por vulnerabilidades de colisión (dos entradas distintas pueden generar el mismo hash). SHA-256 y SHA-3 son los estándares actuales recomendados por NIST."
  },
  {
    "id": 31,
    "unit": "U4",
    "tag": "S8 · HTTPS",
    "q": "En HTTPS/TLS, ¿para qué se usa SHA-256?",
    "options": [
      "Para cifrar el tráfico entre navegador y servidor",
      "Para autenticar al servidor mediante certificado digital",
      "Para verificar la integridad de certificados y comunicaciones",
      "Para gestionar las sesiones de usuario autenticadas"
    ],
    "correct": 2,
    "explanation": "SHA garantiza integridad: detecta cualquier manipulación de los certificados o del tráfico. RSA/ECC autentica el servidor, AES cifra el tráfico. Los tres juntos forman TLS."
  },
  {
    "id": 32,
    "unit": "U4",
    "tag": "S8 · Firmas",
    "q": "Para crear una firma digital, el emisor genera el hash del documento y lo...",
    "options": [
      "Cifra con la clave pública del receptor",
      "Cifra con su propia clave PRIVADA",
      "Envía junto al documento sin cifrar",
      "Descifra con su clave pública para verificar"
    ],
    "correct": 1,
    "explanation": "Firma = hash(doc) cifrado con clave privada del emisor. El receptor descifra con la clave pública, recalcula el hash del documento recibido y los compara. Iguales → íntegro y auténtico."
  },
  {
    "id": 33,
    "unit": "U4",
    "tag": "S8 · Mitos",
    "q": "Un sitio web con candado HTTPS en el navegador garantiza que...",
    "options": [
      "El sitio es completamente seguro y sus datos están protegidos",
      "La conexión está cifrada pero no garantiza que el sitio sea honesto",
      "El propietario ha sido verificado presencialmente por la CA",
      "No existe ningún malware en el sitio web"
    ],
    "correct": 1,
    "explanation": "HTTPS garantiza conexión cifrada y certificado válido, pero los atacantes pueden obtener certificados para sitios fraudulentos. Candado verde ≠ sitio de confianza."
  },
  {
    "id": 34,
    "unit": "U5",
    "tag": "S9 · Malware",
    "q": "¿Cuál es la diferencia principal entre un virus y un gusano informático?",
    "options": [
      "Los virus son siempre más peligrosos",
      "Los gusanos se propagan solos por la red sin necesitar un archivo huésped",
      "Los virus solo atacan sistemas Windows",
      "Los gusanos solo se distribuyen por correo electrónico"
    ],
    "correct": 1,
    "explanation": "Un virus necesita adjuntarse a un archivo huésped y que el usuario lo ejecute. Un gusano se auto-replica y propaga por la red de forma autónoma (como WannaCry con EternalBlue)."
  },
  {
    "id": 35,
    "unit": "U5",
    "tag": "S9 · Phishing",
    "q": "El phishing de la Agencia Tributaria explota principalmente:",
    "options": [
      "Vulnerabilidades técnicas del navegador web",
      "La confianza en organismos oficiales y la sensación de urgencia artificial",
      "Contraseñas débiles reutilizadas por el usuario",
      "Redes WiFi públicas sin contraseña"
    ],
    "correct": 1,
    "explanation": "El phishing es ingeniería social, no un ataque técnico. Explota psicología: confianza en el remitente aparente + urgencia (devolución disponible / problema con tu declaración)."
  },
  {
    "id": 36,
    "unit": "U5",
    "tag": "S9 · Defensa",
    "q": "¿Cuál de estas herramientas bloquea anuncios maliciosos y rastreadores en el navegador?",
    "options": [
      "Bitwarden",
      "uBlock Origin",
      "HTTPS Everywhere",
      "Windows Defender Antivirus"
    ],
    "correct": 1,
    "explanation": "uBlock Origin bloquea anuncios y rastreadores que pueden inyectar código malicioso (malvertising). HTTPS Everywhere fuerza conexiones seguras. Bitwarden es un gestor de contraseñas."
  },
  {
    "id": 37,
    "unit": "U5",
    "tag": "S9 · Mitos",
    "q": "¿Es cierto que los equipos Mac son inmunes al malware por diseño?",
    "options": [
      "Sí, macOS tiene inmunidad total por su arquitectura",
      "No, macOS es objetivo creciente con malware específico como OSX.Flashback",
      "Sí, mientras se instalen solo apps de la App Store",
      "No, pero solo si el usuario desactiva el Gatekeeper manualmente"
    ],
    "correct": 1,
    "explanation": "FALSO que los Mac sean inmunes. La popularización de macOS atrajo malware específico. Apple incluye XProtect y Gatekeeper, pero no sustituyen buenas prácticas de seguridad del usuario."
  },
  {
    "id": 38,
    "unit": "U5",
    "tag": "S9 · Defensa",
    "q": "¿Cuál es el 'eslabón más débil' en la cadena de seguridad según los expertos?",
    "options": [
      "El sistema operativo desactualizado",
      "El factor humano (el usuario)",
      "El firewall mal configurado",
      "El cifrado insuficiente de los datos"
    ],
    "correct": 1,
    "explanation": "El factor humano sigue siendo la vulnerabilidad principal. El mejor antivirus no sirve si el usuario ignora una alerta o introduce sus credenciales en una web falsa. La formación es esencial."
  },
  {
    "id": 39,
    "unit": "U5",
    "tag": "S10 · MitM",
    "q": "Un ataque Man-in-the-Middle en red WiFi pública permite al atacante:",
    "options": [
      "Solo ver qué webs visitas pero no el contenido",
      "Interceptar y modificar el tráfico no cifrado entre víctima y servidor",
      "Solo funciona conociendo la contraseña del router",
      "Únicamente capturar contraseñas de aplicaciones antiguas"
    ],
    "correct": 1,
    "explanation": "En red pública, el atacante puede posicionarse entre el usuario y el servidor, capturando y modificando tráfico sin cifrar. Contraseñas, sesiones y datos bancarios quedan expuestos."
  },
  {
    "id": 40,
    "unit": "U5",
    "tag": "S10 · VPN",
    "q": "¿Por qué se desaconsejan las VPN gratuitas para uso profesional?",
    "options": [
      "Son más lentas y limitan el ancho de banda",
      "Suelen financiarse recopilando y vendiendo datos de navegación del usuario",
      "No cifran el tráfico de forma correcta",
      "Solo funcionan correctamente en dispositivos móviles"
    ],
    "correct": 1,
    "explanation": "Las VPN gratuitas monetizan los datos del usuario para sostenerse económicamente. Para uso profesional: ProtonVPN, NordVPN o Mullvad, con políticas de privacidad auditadas externamente."
  },
  {
    "id": 41,
    "unit": "U5",
    "tag": "S10 · Ransomware",
    "q": "¿Qué ransomware atacó al SEPE en 2021 y cómo entró en los sistemas?",
    "options": [
      "WannaCry mediante exploit de Windows sin parchear",
      "Ryuk distribuido mediante un correo con adjunto malicioso",
      "NotPetya a través de una actualización de software comprometida",
      "LockBit mediante credenciales de VPN robadas"
    ],
    "correct": 1,
    "explanation": "Ryuk entró por un adjunto de correo aparentemente inofensivo. Se propagó lateralmente por la red cifrando archivos. La falta de backups recientes prolongó la parálisis durante semanas."
  },
  {
    "id": 42,
    "unit": "U5",
    "tag": "S10 · Ransomware",
    "q": "Según Europol, ¿qué porcentaje de víctimas que pagan el rescate recuperan todos sus datos?",
    "options": [
      "Más del 80%",
      "Alrededor del 50%",
      "Menos del 20%",
      "Prácticamente el 100% si pagan rápido"
    ],
    "correct": 2,
    "explanation": "Menos del 20% recuperan completamente sus datos tras pagar. Pagar además financia organizaciones criminales y no garantiza que no vuelvan a atacarte. La solución: backups limpios e inmutables."
  },
  {
    "id": 43,
    "unit": "U5",
    "tag": "S10 · WiFi",
    "q": "¿Una red WiFi pública con contraseña es segura para transmitir datos bancarios?",
    "options": [
      "Sí, la contraseña cifra todo el tráfico entre usuarios",
      "No, la contraseña solo restringe acceso; usuarios de la misma red pueden capturar tu tráfico",
      "Sí, si la web destino usa HTTPS",
      "Solo si el router tiene WPA3 activado"
    ],
    "correct": 1,
    "explanation": "La contraseña WiFi evita que se conecten externos, pero todos los conectados comparten la red. Un usuario malicioso interno puede capturar tráfico. Usa siempre VPN en redes públicas."
  },
  {
    "id": 44,
    "unit": "U6",
    "tag": "S11 · Nmap",
    "q": "¿Qué hace el comando: nmap -sV 192.168.1.0/24 ?",
    "options": [
      "Captura todo el tráfico de la red local en tiempo real",
      "Escanea la red identificando hosts activos, puertos abiertos y versiones de servicios",
      "Monitoriza el estado de servidores y genera alertas automáticas",
      "Analiza logs del sistema buscando patrones anómalos"
    ],
    "correct": 1,
    "explanation": "nmap -sV escanea el rango /24 completo. -sV detecta versiones de servicios en cada puerto. Permite descubrir qué equipos están activos y qué servicios exponen. Solo en redes propias o autorizadas."
  },
  {
    "id": 45,
    "unit": "U6",
    "tag": "S11 · Wireshark",
    "q": "Wireshark es una herramienta de:",
    "options": [
      "Escaneo de puertos y descubrimiento de hosts",
      "Captura y análisis de paquetes de red en tiempo real",
      "Monitorización continua de servidores con alertas",
      "Gestión centralizada de vulnerabilidades"
    ],
    "correct": 1,
    "explanation": "Wireshark captura paquetes de red y los analiza mostrando protocolos, IPs, tiempos de respuesta y contenido. Es la referencia para auditar comunicaciones y detectar tráfico sospechoso."
  },
  {
    "id": 46,
    "unit": "U6",
    "tag": "S11 · Nagios/Zabbix",
    "q": "¿Cuál es la diferencia principal entre Nagios y Zabbix?",
    "options": [
      "Nagios es de pago, Zabbix es completamente gratuito",
      "Nagios solo funciona en Linux, Zabbix en Windows",
      "Ambos monitorizan continuamente; Zabbix añade dashboards más modernos y reportes históricos avanzados",
      "Nagios analiza paquetes de red, Zabbix escanea puertos activamente"
    ],
    "correct": 2,
    "explanation": "Ambos son sistemas de monitorización continua con alertas automáticas. Zabbix tiene interfaz más moderna, dashboards personalizables y se integra bien con Grafana para visualizaciones avanzadas."
  },
  {
    "id": 47,
    "unit": "U6",
    "tag": "S11 · Filosofía",
    "q": "¿Es correcto afirmar que Nmap y Wireshark son herramientas exclusivas de hackers maliciosos?",
    "options": [
      "Sí, están prohibidas en la mayoría de países europeos",
      "No, son herramientas de diagnóstico y auditoría usadas por profesionales de seguridad",
      "Sí, solo se usan para atacar infraestructuras corporativas",
      "No, pero requieren licencia especial para uso profesional"
    ],
    "correct": 1,
    "explanation": "Son herramientas neutras de diagnóstico y auditoría. Su legalidad depende del contexto y autorización del propietario de la red. En manos de un profesional de seguridad son instrumentos de protección."
  },
  {
    "id": 48,
    "unit": "U6",
    "tag": "S12 · Correo",
    "q": "¿Cuál es la diferencia clave entre IMAP y POP3 para la recepción de correo?",
    "options": [
      "IMAP es más antiguo y menos seguro que POP3",
      "IMAP sincroniza correos en todos los dispositivos sin borrarlos del servidor; POP3 los descarga y elimina",
      "POP3 es el protocolo moderno recomendado actualmente",
      "No hay diferencia funcional relevante en la actualidad"
    ],
    "correct": 1,
    "explanation": "IMAP deja los correos en el servidor y los sincroniza en todos los dispositivos. POP3 los descarga y normalmente los borra del servidor. En la era multi-dispositivo IMAP es el estándar recomendado."
  },
  {
    "id": 49,
    "unit": "U6",
    "tag": "S12 · Archivos",
    "q": "FTP clásico es inseguro porque:",
    "options": [
      "Es demasiado lento para archivos mayores de 100MB",
      "Transmite credenciales y datos en texto plano sin cifrar",
      "No soporta autenticación por contraseña",
      "Requiere VPN para funcionar correctamente"
    ],
    "correct": 1,
    "explanation": "FTP transmite todo sin cifrar: cualquiera que capture el tráfico puede leer credenciales y datos. SFTP (sobre SSH) y FTPS (sobre TLS) son las alternativas seguras."
  },
  {
    "id": 50,
    "unit": "U6",
    "tag": "S12 · TCP/IP",
    "q": "¿Qué protocolo de la capa de transporte garantiza la entrega completa y ordenada de los paquetes?",
    "options": [
      "IP",
      "UDP",
      "TCP",
      "ICMP"
    ],
    "correct": 2,
    "explanation": "TCP garantiza entrega, orden y control de errores: si un paquete se pierde, lo solicita de nuevo. UDP es más rápido pero sin garantías, ideal para VoIP y streaming donde prima la velocidad sobre la perfección."
  },
  {
    "id": 51,
    "unit": "U6",
    "tag": "S12 · Correo",
    "q": "¿Para qué sirve el protocolo SMTP?",
    "options": [
      "Recibir correos desde el servidor de correo",
      "Sincronizar correos entre múltiples dispositivos",
      "Enviar correos electrónicos entre servidores y clientes",
      "Transferir archivos de forma segura mediante SSH"
    ],
    "correct": 2,
    "explanation": "SMTP (Simple Mail Transfer Protocol) es el protocolo para ENVIAR correos. Para recibirlos: IMAP (sincroniza, deja en servidor) o POP3 (descarga y borra). Puerto 25 entre servidores, 587 para clientes autenticados."
  },
  {
    "id": 52,
    "unit": "U6",
    "tag": "S12 · TCP/IP",
    "q": "VoIP (Voice over IP) convierte la voz en paquetes y los envía usando principalmente:",
    "options": [
      "TCP, para garantizar la entrega de cada paquete de voz",
      "UDP, porque prima la velocidad sobre la entrega perfecta",
      "FTP, para transferir los archivos de audio",
      "SMTP, como extensión del protocolo de correo"
    ],
    "correct": 1,
    "explanation": "VoIP usa UDP porque en una llamada de voz es preferible perder algún paquete (pequeño glitch) que esperar retransmisiones. Con TCP la latencia haría la llamada inutilizable."
  },
  {
    "id": 53,
    "unit": "U6",
    "tag": "S13 · Firewall",
    "q": "La política de seguridad más recomendada para configurar un firewall es:",
    "options": [
      "Permitir todo el tráfico y bloquear solo lo identificado como malicioso",
      "Denegar por defecto y permitir solo el tráfico explícitamente autorizado",
      "Permitir todo el tráfico saliente sin ninguna restricción",
      "Bloquear únicamente los puertos conocidos como peligrosos"
    ],
    "correct": 1,
    "explanation": "'Deny all, permit by exception': se bloquea todo por defecto y se abre solo lo necesario. Es el principio de mínimo privilegio aplicado al tráfico de red. Reduce la superficie de ataque al máximo."
  },
  {
    "id": 54,
    "unit": "U6",
    "tag": "S13 · Proxy",
    "q": "Un servidor proxy corporativo como Squid permite principalmente:",
    "options": [
      "Cifrar todo el tráfico interno de la empresa",
      "Filtrar contenido por usuario/categoría, cachear recursos y registrar navegación",
      "Reemplazar completamente al firewall perimetral",
      "Autenticar usuarios contra Active Directory directamente"
    ],
    "correct": 1,
    "explanation": "Squid actúa como intermediario: filtra categorías (redes sociales, apuestas), cachea recursos estáticos ahorrando ancho de banda y registra la navegación para auditorías y prevención de incidentes."
  },
  {
    "id": 55,
    "unit": "U6",
    "tag": "S13 · UFW",
    "q": "¿Qué efecto tiene el comando: sudo ufw default deny incoming ?",
    "options": [
      "Bloquea absolutamente todo el tráfico, incluido el tráfico saliente",
      "Establece que todo el tráfico entrante se deniega por defecto hasta que se permita explícitamente",
      "Desactiva el servicio UFW completamente en el sistema",
      "Permite únicamente el tráfico del puerto 80 (HTTP)"
    ],
    "correct": 1,
    "explanation": "Establece la política por defecto para tráfico ENTRANTE: denegar todo. Luego se añaden excepciones explícitas (ufw allow 22/tcp para SSH, ufw allow 80/tcp para web). Base de configuración segura."
  },
  {
    "id": 56,
    "unit": "U6",
    "tag": "S13 · Mitos",
    "q": "¿Un firewall bien configurado protege completamente de todos los ciberataques?",
    "options": [
      "Sí, si se configura correctamente es protección total",
      "No, es solo una capa; phishing y malware descargado desde HTTPS pueden pasar",
      "Sí, especialmente los NGFW de nueva generación con IA",
      "No, pero bloquea estadísticamente más del 99,9% de los ataques"
    ],
    "correct": 1,
    "explanation": "Un firewall es una capa de defensa, no la solución total. El tráfico HTTPS cifrado no se inspecciona sin SSL inspection. Phishing, malware desde webs legítimas y exploits de aplicación pasan sin ser detectados."
  },
  {
    "id": 57,
    "unit": "U7",
    "tag": "S14 · SSH",
    "q": "Para deshabilitar el acceso por contraseña en SSH y usar solo claves criptográficas, configuras en sshd_config:",
    "options": [
      "AllowPassword no",
      "PasswordAuthentication no",
      "DisablePassword yes",
      "UseOnlyKeys yes"
    ],
    "correct": 1,
    "explanation": "En /etc/ssh/sshd_config: 'PasswordAuthentication no' deshabilita el login por contraseña. Junto con 'PermitRootLogin no', elimina prácticamente el riesgo de ataques de fuerza bruta por SSH."
  },
  {
    "id": 58,
    "unit": "U7",
    "tag": "S14 · Alta Disponibilidad",
    "q": "El RTO (Recovery Time Objective) mide:",
    "options": [
      "Cuántos datos puede perder la organización expresado en tiempo",
      "Cuánto tiempo puede estar el servicio caído antes de impactar al negocio",
      "El número mínimo de réplicas necesarias para garantizar HA",
      "El coste total estimado de la recuperación ante desastres"
    ],
    "correct": 1,
    "explanation": "RTO = tiempo máximo tolerable de inactividad del servicio. RPO = máxima pérdida de datos tolerable (en tiempo). Ambos definen los requisitos de continuidad y guían el diseño de la arquitectura HA."
  },
  {
    "id": 59,
    "unit": "U7",
    "tag": "S14 · Alta Disponibilidad",
    "q": "¿Qué hace un balanceador de carga como HAProxy?",
    "options": [
      "Cifra el tráfico entre clientes y servidores backend",
      "Distribuye peticiones entre varios servidores para evitar saturación y garantizar continuidad",
      "Autentica a los usuarios antes de permitirles el acceso",
      "Almacena copias de seguridad de los servidores en tiempo real"
    ],
    "correct": 1,
    "explanation": "HAProxy distribuye tráfico entre servidores backend. Si uno cae, redirige al resto automáticamente (health checks). Combina disponibilidad + rendimiento. Estándar en arquitecturas web de alta disponibilidad."
  },
  {
    "id": 60,
    "unit": "U7",
    "tag": "S14 · Clústeres",
    "q": "En Linux, la combinación estándar para alta disponibilidad con failover automático es:",
    "options": [
      "Apache + MySQL",
      "Pacemaker + Corosync",
      "HAProxy + Nginx en tándem",
      "OpenVPN + WireGuard"
    ],
    "correct": 1,
    "explanation": "Pacemaker gestiona los recursos del clúster y la conmutación por error (failover). Corosync gestiona la comunicación y heartbeat entre nodos. Juntos son el estándar Linux para HA de servicios críticos."
  }
];

const UNIT_COLORS = {
  "U1": "#8B5CF6",
  "U2": "#06B6D4",
  "U3": "#3B82F6",
  "U4": "#F59E0B",
  "U5": "#10B981",
  "U6": "#F43F5E",
  "U7": "#EC4899"
};

const SHAPE_COLORS = ["#E53E3E", "#3182CE", "#38A169", "#D69E2E"];

const unitKey = (u) => (u || "").split("·")[0];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Baraja las opciones de una pregunta y recalcula el índice de la correcta
function shuffleOptions(q) {
  const idxs = shuffle(q.options.map((_, i) => i));
  return {
    ...q,
    options: idxs.map(i => q.options[i]),
    correct: idxs.indexOf(q.correct)
  };
}

function useQuestions() {
  const [questions] = useState(() => shuffle(QUESTIONS).map(shuffleOptions));
  return questions;
}

function AnswerBtn({ label, text, color, state, onClick, disabled }) {
  const shapes = ["◆", "●", "▲", "■"];
  const isSelected = state === "selected";
  const isCorrect = state === "correct";
  const isWrong = state === "wrong";
  const isNeutral = state === "neutral";

  let bg = color;
  let border = "transparent";
  let scale = 1;
  if (isCorrect) { bg = "#10B981"; border = "#6EE7B7"; scale = 1.02; }
  if (isWrong) { bg = "#EF4444"; border = "#FCA5A5"; scale = 0.98; }
  if (isNeutral) { bg = "#1E293B"; border = "transparent"; }
  if (isSelected && !isCorrect && !isWrong) { border = "#FFFFFF"; }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        background: bg,
        border: `3px solid ${border}`,
        borderRadius: 14,
        padding: "16px 20px",
        cursor: disabled ? "default" : "pointer",
        transform: `scale(${scale})`,
        transition: "all 0.25s cubic-bezier(.34,1.56,.64,1)",
        textAlign: "left",
        width: "100%",
        opacity: isNeutral ? 0.45 : 1,
        boxShadow: isCorrect ? `0 0 24px #10B98166` : isWrong ? `0 0 24px #EF444466` : "0 4px 16px #0006"
      }}
    >
      <span style={{
        fontSize: 22, fontWeight: 900, color: "#FFFFFF",
        minWidth: 28, textAlign: "center",
        textShadow: "0 2px 6px #0008"
      }}>{shapes[label]}</span>
      <span style={{
        fontSize: 15, fontWeight: 600, color: "#FFFFFF",
        lineHeight: 1.35, textShadow: "0 1px 4px #0006",
        letterSpacing: "-0.01em",
        fontFamily: "inherit", whiteSpace: "pre-wrap"
      }}>{text}</span>
      {(isCorrect || isWrong) && (
        <span style={{ marginLeft: "auto", fontSize: 20 }}>
          {isCorrect ? "✓" : "✗"}
        </span>
      )}
    </button>
  );
}

function ResultsScreen({ results, questions, onRestart }) {
  const [filter, setFilter] = useState("all");
  const score = results.filter(r => r.correct).length;
  const total = results.length;
  const pct = Math.round((score / total) * 100);

  const grade = pct >= 90 ? { label: "¡Sobresaliente!", color: "#10B981", emoji: "🏆" }
    : pct >= 70 ? { label: "Notable", color: "#3B82F6", emoji: "🎯" }
    : pct >= 50 ? { label: "Aprobado", color: "#F59E0B", emoji: "📚" }
    : { label: "A repasar", color: "#EF4444", emoji: "💪" };

  const filtered = results.filter(r => {
    if (filter === "correct") return r.correct;
    if (filter === "wrong") return !r.correct;
    return true;
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)",
      padding: "32px 16px",
      fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif"
    }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{
          textAlign: "center", marginBottom: 32,
          background: "linear-gradient(135deg, #1E293B, #312E81)",
          borderRadius: 24, padding: "36px 24px",
          border: "1px solid #3730A3",
          boxShadow: "0 20px 60px #0008"
        }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>{grade.emoji}</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF", marginBottom: 4 }}>{grade.label}</div>
          <div style={{
            fontSize: 72, fontWeight: 900,
            color: grade.color,
            lineHeight: 1,
            textShadow: `0 0 40px ${grade.color}88`,
            fontFamily: "'Space Mono', monospace"
          }}>{pct}%</div>
          <div style={{ fontSize: 18, color: "#94A3B8", marginTop: 8 }}>
            {score} correctas de {total} preguntas
          </div>

          <div style={{
            height: 12, background: "#0F172A",
            borderRadius: 99, margin: "20px auto 0",
            maxWidth: 400, overflow: "hidden"
          }}>
            <div style={{
              height: "100%", width: `${pct}%`,
              background: `linear-gradient(90deg, ${grade.color}, ${grade.color}88)`,
              borderRadius: 99,
              transition: "width 1s ease",
              boxShadow: `0 0 12px ${grade.color}`
            }} />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 20 }}>
            {Object.entries(
              results.reduce((acc, r) => {
                const u = unitKey(questions.find(q => q.id === r.id)?.unit || "?");
                if (!acc[u]) acc[u] = { correct: 0, total: 0 };
                acc[u].total++;
                if (r.correct) acc[u].correct++;
                return acc;
              }, {})
            ).sort(([a], [b]) => a.localeCompare(b)).map(([unit, s]) => (
              <div key={unit} style={{
                background: "#0F172A",
                borderRadius: 10,
                padding: "6px 14px",
                border: `2px solid ${UNIT_COLORS[unit] || "#8B5CF6"}44`
              }}>
                <span style={{ color: UNIT_COLORS[unit] || "#8B5CF6", fontWeight: 700, fontSize: 12 }}>{unit}</span>
                <span style={{ color: "#94A3B8", fontSize: 12, marginLeft: 6 }}>{s.correct}/{s.total}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 20, justifyContent: "center" }}>
          {[
            { key: "all", label: `Todas (${total})` },
            { key: "correct", label: `✓ Correctas (${results.filter(r=>r.correct).length})` },
            { key: "wrong", label: `✗ Falladas (${results.filter(r=>!r.correct).length})` }
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              background: filter === f.key ? "#6366F1" : "#1E293B",
              color: "#FFFFFF", border: "none", borderRadius: 10,
              padding: "8px 18px", cursor: "pointer", fontWeight: 600,
              fontSize: 13, transition: "all 0.2s"
            }}>{f.label}</button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {filtered.map((r) => {
            const q = questions.find(qq => qq.id === r.id);
            if (!q) return null;
            const uk = unitKey(q.unit);
            return (
              <div key={r.id} style={{
                background: r.correct ? "#0D2818" : "#2D0A0A",
                border: `1px solid ${r.correct ? "#10B98133" : "#EF444433"}`,
                borderRadius: 16, padding: "18px 20px",
                borderLeft: `4px solid ${r.correct ? "#10B981" : "#EF4444"}`
              }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{
                    background: UNIT_COLORS[uk] || "#8B5CF6",
                    color: "#FFF", borderRadius: 6, padding: "2px 8px",
                    fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", marginTop: 2
                  }}>{q.tag}</span>
                  <span style={{ color: "#E2E8F0", fontWeight: 600, fontSize: 14, lineHeight: 1.4 }}>
                    {q.q}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: r.correct ? "1fr" : "1fr 1fr", gap: 8 }}>
                  <div style={{
                    background: r.correct ? "#10B98122" : "#EF444422",
                    borderRadius: 8, padding: "8px 12px"
                  }}>
                    <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2, fontWeight: 700 }}>
                      {r.correct ? "✓ TU RESPUESTA (CORRECTA)" : "✗ TU RESPUESTA"}
                    </div>
                    <div style={{ fontSize: 13, color: r.correct ? "#6EE7B7" : "#FCA5A5", fontWeight: 600, fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                      {q.options[r.chosen]}
                    </div>
                  </div>
                  {!r.correct && (
                    <div style={{
                      background: "#10B98122",
                      borderRadius: 8, padding: "8px 12px"
                    }}>
                      <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2, fontWeight: 700 }}>✓ RESPUESTA CORRECTA</div>
                      <div style={{ fontSize: 13, color: "#6EE7B7", fontWeight: 600, fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
                        {q.options[q.correct]}
                      </div>
                    </div>
                  )}
                </div>

                {q.explanation && (
                  <div style={{
                    background: "#0F172A", borderRadius: 8, padding: "10px 14px",
                    borderLeft: "3px solid #6366F1", marginTop: 10
                  }}>
                    <span style={{ fontSize: 10, color: "#6366F1", fontWeight: 700 }}>EXPLICACIÓN · </span>
                    <span style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.5 }}>{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button onClick={onRestart} style={{
          display: "block", margin: "0 auto",
          background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
          color: "#FFFFFF", border: "none", borderRadius: 14,
          padding: "16px 48px", cursor: "pointer",
          fontSize: 16, fontWeight: 800,
          boxShadow: "0 8px 32px #6366F144",
          letterSpacing: "-0.02em"
        }}>
          🔁 Nuevo Quiz
        </button>
      </div>
    </div>
  );
}

function App() {
  const allQuestions = useQuestions();

  const [phase, setPhase] = useState("start");
  const [current, setCurrent] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState([]);
  const [animIn, setAnimIn] = useState(true);

  const q = allQuestions[current];
  const uk = q ? unitKey(q.unit) : "U1";
  const unitColor = UNIT_COLORS[uk] || "#8B5CF6";

  const handleReveal = (idx) => {
    setChosen(idx);
    setRevealed(true);
    const correct = idx === q.correct;
    setResults(prev => [...prev, { id: q.id, chosen: idx, correct }]);
  };

  const handleNext = () => {
    if (current + 1 >= allQuestions.length) {
      setPhase("results");
      return;
    }
    setAnimIn(false);
    setTimeout(() => {
      setCurrent(c => c + 1);
      setChosen(null);
      setRevealed(false);
      setAnimIn(true);
    }, 200);
  };

  const handleBack = () => {
    if (current === 0) return;
    setAnimIn(false);
    setTimeout(() => {
      setResults(prev => {
        const newResults = [...prev];
        if (revealed) newResults.pop();
        if (newResults.length > 0) newResults.pop();
        return newResults;
      });
      setCurrent(c => c - 1);
      setChosen(null);
      setRevealed(false);
      setAnimIn(true);
    }, 200);
  };

  const handleRestart = () => {
    setCurrent(0);
    setChosen(null);
    setRevealed(false);
    setResults([]);
    setPhase("start");
    setAnimIn(true);
  };

  if (phase === "results") {
    return <ResultsScreen results={results} questions={allQuestions} onRestart={handleRestart} />;
  }

  if (phase === "start") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
        padding: 24
      }}>
        <div style={{
          textAlign: "center", maxWidth: 600,
          background: "linear-gradient(135deg, #1E293B, #312E81)",
          borderRadius: 28, padding: "48px 40px",
          border: "1px solid #3730A3",
          boxShadow: "0 32px 80px #0008"
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔒</div>
          <h1 style={{
            fontSize: 32, fontWeight: 900, color: "#FFFFFF",
            margin: "0 0 8px",
            background: "linear-gradient(135deg, #A78BFA, #6366F1)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>SAD · Test de Repaso</h1>
          <p style={{ color: "#94A3B8", fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
            {allQuestions.length} preguntas · Sin límite de tiempo<br />
            Cubre las 7 Unidades · S1-S14
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 32 }}>
            {Object.entries(UNIT_COLORS).map(([u, c]) => (
              <div key={u} style={{
                background: `${c}22`, border: `1px solid ${c}55`,
                borderRadius: 8, padding: "4px 12px",
                color: c, fontSize: 12, fontWeight: 700
              }}>{u}</div>
            ))}
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32,
            textAlign: "left"
          }}>
            {[
              ["🎯", "4 opciones por pregunta"],
              ["⬅️", "Puedes volver atrás"],
              ["📊", "Resultado detallado al final"],
              ["🔀", "Preguntas barajadas"]
            ].map(([icon, text]) => (
              <div key={text} style={{
                background: "#0F172A", borderRadius: 10, padding: "12px 14px",
                display: "flex", gap: 8, alignItems: "center"
              }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span style={{ color: "#CBD5E1", fontSize: 13, fontWeight: 600 }}>{text}</span>
              </div>
            ))}
          </div>

          <button onClick={() => setPhase("quiz")} style={{
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            color: "#FFFFFF", border: "none", borderRadius: 16,
            padding: "18px 56px", cursor: "pointer",
            fontSize: 18, fontWeight: 900,
            boxShadow: "0 8px 32px #6366F166",
            letterSpacing: "-0.02em",
            transition: "transform 0.15s"
          }}>
            ¡Empezar! 🚀
          </button>
        </div>
      </div>
    );
  }

  const progress = ((current) / allQuestions.length) * 100;
  const correctSoFar = results.filter(r => r.correct).length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)",
      fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
      display: "flex", flexDirection: "column"
    }}>
      <div style={{
        background: "#0F172A", padding: "12px 20px",
        display: "flex", alignItems: "center", gap: 16,
        borderBottom: "1px solid #1E293B"
      }}>
        <button
          onClick={handleBack}
          disabled={current === 0}
          title="Volver a la pregunta anterior"
          style={{
            background: current === 0 ? "#1E293B" : "#312E81",
            border: `1px solid ${current === 0 ? "#334155" : "#6366F1"}`,
            borderRadius: 8,
            color: current === 0 ? "#475569" : "#A5B4FC",
            cursor: current === 0 ? "default" : "pointer",
            padding: "6px 12px",
            fontSize: 13, fontWeight: 700,
            display: "flex", alignItems: "center", gap: 4,
            transition: "all 0.2s",
            whiteSpace: "nowrap"
          }}
        >
          ← Atrás
        </button>

        <div style={{
          background: `${unitColor}22`, border: `1px solid ${unitColor}55`,
          borderRadius: 8, padding: "4px 12px",
          color: unitColor, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap"
        }}>{q.tag}</div>

        <div style={{ flex: 1, height: 8, background: "#1E293B", borderRadius: 99, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: `linear-gradient(90deg, ${unitColor}, ${unitColor}88)`,
            borderRadius: 99, transition: "width 0.4s ease"
          }} />
        </div>

        <span style={{ color: "#94A3B8", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap",
          fontFamily: "'Space Mono', monospace" }}>
          {current + 1}/{allQuestions.length}
        </span>
        <span style={{ color: "#10B981", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>
          ✓{correctSoFar}
        </span>
      </div>

      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        maxWidth: 780, width: "100%", margin: "0 auto",
        padding: "24px 20px 20px",
        opacity: animIn ? 1 : 0,
        transform: animIn ? "translateY(0)" : "translateY(-10px)",
        transition: "all 0.2s ease"
      }}>
        <div style={{
          background: "linear-gradient(135deg, #1E293B, #1E1B4B)",
          borderRadius: 20, padding: "28px 28px 24px",
          marginBottom: 20,
          border: `1px solid ${unitColor}33`,
          boxShadow: `0 0 40px ${unitColor}11`,
          flex: "0 0 auto"
        }}>
          <div style={{
            fontSize: 13, color: unitColor, fontWeight: 800,
            marginBottom: 12, letterSpacing: "0.08em",
            textTransform: "uppercase"
          }}>Pregunta {current + 1}</div>
          <p style={{
            fontSize: 18, fontWeight: 700, color: "#F1F5F9",
            lineHeight: 1.5, margin: 0,
            letterSpacing: "-0.01em"
          }}>{q.q}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          {q.options.map((opt, i) => {
            let state = "default";
            if (revealed) {
              if (i === q.correct) state = "correct";
              else if (i === chosen && i !== q.correct) state = "wrong";
              else state = "neutral";
            }
            return (
              <AnswerBtn
                key={i}
                label={i}
                text={opt}
                color={SHAPE_COLORS[i]}
                state={state}
                onClick={() => !revealed && handleReveal(i)}
                disabled={revealed}
              />
            );
          })}
        </div>

        {revealed && (
          <div style={{
            marginTop: 16,
            background: chosen === q.correct ? "#0D2818" : "#1A0A0A",
            borderRadius: 14, padding: "16px 18px",
            border: `1px solid ${chosen === q.correct ? "#10B98133" : "#EF444433"}`,
            borderLeft: `4px solid ${chosen === q.correct ? "#10B981" : "#EF4444"}`
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: chosen === q.correct ? "#10B981" : "#EF4444", marginBottom: 6 }}>
              {chosen === q.correct ? "✓ CORRECTO" : "✗ INCORRECTO · LA CORRECTA ERA"}
            </div>
            {chosen !== q.correct && (
              <p style={{ margin: "0 0 10px", fontSize: 14, color: "#FCA5A5", lineHeight: 1.55, fontWeight: 700, whiteSpace: "pre-wrap" }}>
                {q.options[q.correct]}
              </p>
            )}
            <p style={{ margin: 0, fontSize: 13, color: "#94A3B8", lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
              {q.explanation}
            </p>
          </div>
        )}

        {revealed && (
          <button onClick={handleNext} style={{
            marginTop: 14,
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            color: "#FFFFFF", border: "none", borderRadius: 12,
            padding: "14px", cursor: "pointer",
            fontSize: 15, fontWeight: 800,
            boxShadow: "0 4px 20px #6366F144",
            width: "100%", letterSpacing: "-0.01em"
          }}>
            {current + 1 >= allQuestions.length ? "Ver resultados →" : "Siguiente pregunta →"}
          </button>
        )}
      </div>
    </div>
  );
}

const { useState } = React;

const QUESTIONS = [
  {
    "id": 1,
    "unit": "U1",
    "tag": "S1 · Servicios de Red",
    "q": "¿Qué modelo de comunicación asigna el rol de cliente al dispositivo que solicita recursos y el de servidor al que los proporciona?",
    "options": [
      "Modelo cliente-servidor",
      "Modelo broadcast",
      "Modelo peer-to-peer (P2P)",
      "Modelo híbrido"
    ],
    "correct": 0,
    "explanation": "En el modelo cliente-servidor el cliente solicita recursos/servicios y el servidor los provee. Es la base de la web, correo, DNS, etc."
  },
  {
    "id": 2,
    "unit": "U1",
    "tag": "S1 · Servicios de Red",
    "q": "¿Qué protocolo de aplicación se usa específicamente para la transferencia de páginas web de forma segura?",
    "options": [
      "IMAP",
      "SMTP",
      "FTP",
      "HTTPS"
    ],
    "correct": 3,
    "explanation": "HTTPS = HTTP sobre TLS/SSL. Cifra la transferencia de páginas web. IMAP/SMTP son de correo y FTP de archivos."
  },
  {
    "id": 3,
    "unit": "U1",
    "tag": "S1 · Servicios de Red",
    "q": "En el modelo P2P, ¿cómo actúan los equipos respecto a los roles de cliente y servidor?",
    "options": [
      "Actúan simultáneamente como clientes y servidores",
      "Alternan roles según la hora del día",
      "Solo como clientes",
      "Solo como servidores"
    ],
    "correct": 0,
    "explanation": "En P2P no hay roles fijos: cada nodo actúa a la vez como cliente (pide) y servidor (ofrece). Ej: BitTorrent."
  },
  {
    "id": 4,
    "unit": "U1",
    "tag": "S1 · Servicios de Red",
    "q": "¿Cuál de las siguientes NO es una tendencia actual que complementa al modelo cliente-servidor clásico?",
    "options": [
      "APIs REST y microservicios",
      "Virtualización de servidores",
      "Protocolo Telnet",
      "Computación en la nube"
    ],
    "correct": 2,
    "explanation": "Telnet es un protocolo antiguo y NO seguro, en desuso. APIs REST, virtualización y cloud sí son tendencias que complementan el modelo cliente-servidor."
  },
  {
    "id": 5,
    "unit": "U1",
    "tag": "S1 · Servicios de Red",
    "q": "¿Qué protocolo se usa para transferir archivos de forma segura sobre SSH?",
    "options": [
      "SFTP",
      "SCP únicamente",
      "FTP",
      "FTPS"
    ],
    "correct": 0,
    "explanation": "SFTP transfiere archivos de forma segura sobre SSH (puerto 22). No confundir con FTPS (FTP+TLS) ni con FTP plano."
  },
  {
    "id": 6,
    "unit": "U1",
    "tag": "S2 · Servicios de Red",
    "q": "¿Cuál es la función principal del protocolo DNS?",
    "options": [
      "Asignar automáticamente direcciones IP",
      "Traducir nombres de dominio en direcciones IP",
      "Gestionar la transferencia segura de archivos",
      "Sincronizar los relojes de los sistemas en red"
    ],
    "correct": 1,
    "explanation": "DNS traduce nombres de dominio (www.ejemplo.com) a direcciones IP. La asignación automática de IP es DHCP; la sincronización horaria es NTP."
  },
  {
    "id": 7,
    "unit": "U1",
    "tag": "S2 · Servicios de Red",
    "q": "¿Qué protocolo se encarga de asignar de forma automática una dirección IP a cada dispositivo que se conecta a la red?",
    "options": [
      "NTP",
      "LDAP",
      "DHCP",
      "DNS"
    ],
    "correct": 2,
    "explanation": "DHCP asigna automáticamente IP, máscara, puerta de enlace y DNS a los dispositivos que se conectan. DNS resuelve nombres y NTP sincroniza relojes."
  },
  {
    "id": 8,
    "unit": "U1",
    "tag": "S2 · Servicios de Red",
    "q": "¿Qué consecuencia tiene una desincronización grave de NTP en una red empresarial?",
    "options": [
      "Pérdida de velocidad de descarga",
      "Fallos en certificados SSL y registros de auditoría",
      "Cortes en el suministro de DHCP",
      "Imposibilidad de resolver nombres DNS"
    ],
    "correct": 1,
    "explanation": "Si los relojes se desincronizan, fallan los certificados SSL (validez por fecha) y los registros de auditoría pierden coherencia temporal. Por eso NTP es crítico."
  },
  {
    "id": 9,
    "unit": "U1",
    "tag": "S2 · Servicios de Red",
    "q": "¿Qué extensión de seguridad añade DNS para protegerse contra ataques de suplantación?",
    "options": [
      "DNSSEC",
      "LDAPS",
      "STARTTLS",
      "DANE"
    ],
    "correct": 0,
    "explanation": "DNSSEC firma criptográficamente las respuestas DNS para evitar suplantación y cache poisoning, garantizando que vienen del servidor legítimo."
  },
  {
    "id": 10,
    "unit": "U1",
    "tag": "S2 · Servicios de Red",
    "q": "¿Qué comando Linux se usa para forzar la renovación de la dirección IP asignada por DHCP?",
    "options": [
      "dig +renew",
      "nslookup",
      "ipconfig /renew",
      "dhclient"
    ],
    "correct": 3,
    "explanation": "En Linux, dhclient solicita/renueva la concesión DHCP. ipconfig /renew es el equivalente en Windows; dig y nslookup son para DNS."
  },
  {
    "id": 11,
    "unit": "U2",
    "tag": "S3 · Directorio y Acceso Remoto",
    "q": "¿Qué protocolo estándar define cómo acceder y consultar la información en un servicio de directorio?",
    "options": [
      "RADIUS",
      "Kerberos",
      "LDAP",
      "NFS"
    ],
    "correct": 2,
    "explanation": "LDAP es el protocolo estándar para acceder y consultar servicios de directorio (usuarios, grupos, recursos) de forma jerárquica."
  },
  {
    "id": 12,
    "unit": "U2",
    "tag": "S3 · Directorio y Acceso Remoto",
    "q": "¿Qué tecnología añade Microsoft a LDAP en Active Directory para autenticación segura basada en tickets cifrados?",
    "options": [
      "TLS/SSL",
      "RADIUS",
      "Kerberos",
      "SAML"
    ],
    "correct": 2,
    "explanation": "Active Directory combina LDAP con Kerberos, que autentica mediante tickets cifrados, evitando enviar contraseñas por la red."
  },
  {
    "id": 13,
    "unit": "U2",
    "tag": "S3 · Directorio y Acceso Remoto",
    "q": "En la estructura jerárquica de LDAP, ¿qué son las OUs (Organizational Units)?",
    "options": [
      "Agrupaciones de objetos por áreas o departamentos",
      "Controladores de dominio secundarios",
      "Certificados de autenticación",
      "Objetos individuales de usuario"
    ],
    "correct": 0,
    "explanation": "Las OU (Organizational Units) agrupan objetos del directorio por departamentos o áreas, facilitando la aplicación de políticas (GPO)."
  },
  {
    "id": 14,
    "unit": "U2",
    "tag": "S3 · Directorio y Acceso Remoto",
    "q": "¿Cuál es el principal beneficio de centralizar la gestión de usuarios en Active Directory?",
    "options": [
      "Reducción del ancho de banda",
      "Un único punto de administración y autenticación",
      "Eliminación de servidores físicos",
      "Mayor velocidad de transferencia en red"
    ],
    "correct": 1,
    "explanation": "Centralizar usuarios en AD da un único punto de administración y autenticación: se gestionan altas, bajas y permisos desde un solo sitio."
  },
  {
    "id": 15,
    "unit": "U2",
    "tag": "S3 · Directorio y Acceso Remoto",
    "q": "¿Qué puerto usa LDAP cifrado (LDAPS)?",
    "options": [
      "443",
      "993",
      "389",
      "636"
    ],
    "correct": 3,
    "explanation": "LDAPS (LDAP sobre TLS) usa el puerto 636. El LDAP sin cifrar usa el 389."
  },
  {
    "id": 16,
    "unit": "U2",
    "tag": "S4 · Directorio y Acceso Remoto",
    "q": "¿En qué puerto opera SSH por defecto?",
    "options": [
      "21",
      "22",
      "3389",
      "443"
    ],
    "correct": 1,
    "explanation": "SSH opera por defecto en el puerto 22. El 21 es FTP, el 443 HTTPS y el 3389 RDP."
  },
  {
    "id": 17,
    "unit": "U2",
    "tag": "S4 · Directorio y Acceso Remoto",
    "q": "¿Qué protocolo de acceso remoto proporciona una sesión gráfica completa del escritorio en sistemas Windows?",
    "options": [
      "Telnet",
      "RDP",
      "VNC sobre SSH",
      "SSH"
    ],
    "correct": 1,
    "explanation": "RDP (Remote Desktop Protocol) da una sesión gráfica completa del escritorio Windows. SSH/Telnet son de consola; VNC es gráfico pero multiplataforma."
  },
  {
    "id": 18,
    "unit": "U2",
    "tag": "S4 · Directorio y Acceso Remoto",
    "q": "¿Qué hace un túnel SSH (port forwarding)?",
    "options": [
      "Cifra solo las contraseñas transmitidas",
      "Redirige tráfico interno cifrado sin abrir puertos al exterior",
      "Crea una VPN completa entre dos redes",
      "Reemplaza al protocolo RDP"
    ],
    "correct": 1,
    "explanation": "El port forwarding de SSH crea un túnel cifrado que redirige tráfico interno sin necesidad de abrir puertos al exterior, protegiendo servicios."
  },
  {
    "id": 19,
    "unit": "U2",
    "tag": "S4 · Directorio y Acceso Remoto",
    "q": "¿Qué comando genera un par de claves pública/privada para autenticación SSH?",
    "options": [
      "openssl genrsa",
      "ssh-copy-id",
      "ssh-keygen",
      "ssh-add"
    ],
    "correct": 2,
    "explanation": "ssh-keygen genera el par de claves pública/privada. ssh-copy-id las instala en el servidor y ssh-add las añade al agente."
  },
  {
    "id": 20,
    "unit": "U2",
    "tag": "S4 · Directorio y Acceso Remoto",
    "q": "¿Dónde se encuentran los registros de accesos SSH en un sistema Linux?",
    "options": [
      "/var/log/secure.log",
      "/var/log/syslog",
      "/var/log/auth.log",
      "/etc/ssh/sshd.log"
    ],
    "correct": 2,
    "explanation": "En Debian/Ubuntu los accesos SSH se registran en /var/log/auth.log (en RedHat sería /var/log/secure)."
  },
  {
    "id": 21,
    "unit": "U3",
    "tag": "S5 · Transferencia de Archivos",
    "q": "¿En qué puerto establece FTP la conexión de control entre cliente y servidor?",
    "options": [
      "21",
      "990",
      "22",
      "20"
    ],
    "correct": 0,
    "explanation": "FTP usa el puerto 21 para la conexión de control (comandos) y el 20 para datos en modo activo."
  },
  {
    "id": 22,
    "unit": "U3",
    "tag": "S5 · Transferencia de Archivos",
    "q": "¿Cuál es la principal debilidad de FTP clásico?",
    "options": [
      "Solo permite transferir un archivo a la vez",
      "Transmite comandos y contraseñas en texto plano sin cifrado",
      "Requiere certificados TLS para funcionar",
      "No soporta modo pasivo"
    ],
    "correct": 1,
    "explanation": "FTP clásico transmite usuario, contraseña y datos en texto plano, sin cifrar: cualquiera que capture el tráfico los lee. Por eso se usa SFTP/FTPS."
  },
  {
    "id": 23,
    "unit": "U3",
    "tag": "S5 · Transferencia de Archivos",
    "q": "¿Sobre qué protocolo funciona SFTP?",
    "options": [
      "TLS/SSL en puerto 990",
      "SSH en puerto 22",
      "HTTPS en puerto 443",
      "FTP con cifrado en puerto 21"
    ],
    "correct": 1,
    "explanation": "SFTP funciona sobre SSH (puerto 22), heredando su cifrado y autenticación. No tiene relación con FTP salvo el propósito."
  },
  {
    "id": 24,
    "unit": "U3",
    "tag": "S5 · Transferencia de Archivos",
    "q": "¿Qué diferencia principal existe entre FTPS y SFTP?",
    "options": [
      "FTPS extiende FTP con TLS/SSL; SFTP es un protocolo independiente sobre SSH",
      "FTPS solo cifra datos; SFTP solo cifra contraseñas",
      "FTPS usa el puerto 22 y SFTP el puerto 990",
      "FTPS es solo para Windows; SFTP solo para Linux"
    ],
    "correct": 0,
    "explanation": "FTPS es FTP clásico al que se le añade una capa TLS/SSL. SFTP es un protocolo distinto que va sobre SSH. Mismo objetivo, arquitecturas distintas."
  },
  {
    "id": 25,
    "unit": "U3",
    "tag": "S5 · Transferencia de Archivos",
    "q": "En FTP, ¿qué modo de conexión es el recomendado en redes con firewall?",
    "options": [
      "Modo seguro, que combina activo y pasivo",
      "Modo implícito, que cifra automáticamente",
      "Modo activo, porque el servidor inicia la conexión de datos",
      "Modo pasivo, porque el cliente inicia ambas conexiones"
    ],
    "correct": 3,
    "explanation": "En modo pasivo el cliente inicia ambas conexiones (control y datos), lo que evita problemas con firewalls/NAT del lado del cliente. El activo da problemas tras firewall."
  },
  {
    "id": 26,
    "unit": "U3",
    "tag": "S6 · Transferencia de Archivos",
    "q": "¿Qué directiva de vsftpd restringe al usuario dentro de su directorio asignado?",
    "options": [
      "ssl_enable=YES",
      "anonymous_enable=NO",
      "chroot_local_user=YES",
      "local_enable=YES"
    ],
    "correct": 2,
    "explanation": "chroot_local_user=YES enjaula a cada usuario en su directorio home, impidiendo que navegue por el resto del sistema de archivos."
  },
  {
    "id": 27,
    "unit": "U3",
    "tag": "S6 · Transferencia de Archivos",
    "q": "¿En qué archivo se almacenan los logs de actividad de vsftpd?",
    "options": [
      "/etc/vsftpd/access.log",
      "/var/log/auth.log",
      "/var/log/ftp.log",
      "/var/log/vsftpd.log"
    ],
    "correct": 3,
    "explanation": "vsftpd registra su actividad en /var/log/vsftpd.log."
  },
  {
    "id": 28,
    "unit": "U3",
    "tag": "S6 · Transferencia de Archivos",
    "q": "¿Qué directiva activa el cifrado TLS en vsftpd?",
    "options": [
      "encrypt=YES",
      "tls_enable=YES",
      "ftps_mode=YES",
      "ssl_enable=YES"
    ],
    "correct": 3,
    "explanation": "ssl_enable=YES activa el cifrado TLS/SSL en vsftpd, convirtiéndolo en FTPS."
  },
  {
    "id": 29,
    "unit": "U3",
    "tag": "S6 · Transferencia de Archivos",
    "q": "¿Para qué sirven las directivas pasv_min_port y pasv_max_port en vsftpd?",
    "options": [
      "Limitar el tamaño máximo de archivo transferible",
      "Definir el número máximo de conexiones simultáneas",
      "Establecer el rango de puertos para el modo pasivo",
      "Configurar los puertos de control FTP"
    ],
    "correct": 2,
    "explanation": "pasv_min_port y pasv_max_port definen el rango de puertos para las conexiones de datos en modo pasivo, que hay que abrir en el firewall."
  },
  {
    "id": 30,
    "unit": "U3",
    "tag": "S6 · Transferencia de Archivos",
    "q": "¿Qué comando reinicia el servicio vsftpd en un sistema con systemd?",
    "options": [
      "sudo vsftpd --restart",
      "sudo systemctl restart vsftpd",
      "sudo /etc/init.d/vsftpd reload",
      "service ftp restart"
    ],
    "correct": 1,
    "explanation": "Con systemd se reinicia con sudo systemctl restart vsftpd."
  },
  {
    "id": 31,
    "unit": "U4",
    "tag": "S7 · Servicios Web",
    "q": "¿En qué puerto opera HTTP por defecto?",
    "options": [
      "8080",
      "80",
      "21",
      "443"
    ],
    "correct": 1,
    "explanation": "HTTP opera por defecto en el puerto 80; HTTPS en el 443."
  },
  {
    "id": 32,
    "unit": "U4",
    "tag": "S7 · Servicios Web",
    "q": "¿Qué capa de seguridad añade HTTPS al protocolo HTTP?",
    "options": [
      "SSH",
      "IPsec",
      "TLS/SSL",
      "WPA2"
    ],
    "correct": 2,
    "explanation": "HTTPS añade una capa TLS/SSL sobre HTTP para cifrar la comunicación y autenticar el servidor mediante certificado."
  },
  {
    "id": 33,
    "unit": "U4",
    "tag": "S7 · Servicios Web",
    "q": "¿Qué código de estado HTTP indica que el recurso solicitado no ha sido encontrado?",
    "options": [
      "404 Not Found",
      "403 Forbidden",
      "500 Internal Server Error",
      "301 Moved Permanently"
    ],
    "correct": 0,
    "explanation": "El código 404 Not Found indica que el recurso solicitado no existe. 403 es prohibido, 500 error de servidor y 301 redirección permanente."
  },
  {
    "id": 34,
    "unit": "U4",
    "tag": "S7 · Servicios Web",
    "q": "¿Qué método HTTP se utiliza para enviar datos al servidor al completar un formulario?",
    "options": [
      "PUT",
      "GET",
      "POST",
      "DELETE"
    ],
    "correct": 2,
    "explanation": "POST envía datos al servidor (formularios) en el cuerpo de la petición. GET solo solicita/consulta y pasa parámetros en la URL."
  },
  {
    "id": 35,
    "unit": "U4",
    "tag": "S7 · Servicios Web",
    "q": "¿Qué son los tipos MIME en HTTP?",
    "options": [
      "Cabeceras de autenticación de usuario",
      "Identificadores que indican al navegador el tipo de contenido recibido",
      "Métodos HTTP para gestionar recursos",
      "Protocolos de cifrado en capa de transporte"
    ],
    "correct": 1,
    "explanation": "Los tipos MIME (text/html, image/png, application/json…) indican al navegador qué clase de contenido recibe para interpretarlo correctamente."
  },
  {
    "id": 36,
    "unit": "U4",
    "tag": "S8 · Servicios Web",
    "q": "¿Qué función tienen los Virtual Hosts en Apache?",
    "options": [
      "Cifrar automáticamente el tráfico",
      "Gestionar la caché de páginas web",
      "Aumentar hilos de procesamiento",
      "Alojar múltiples dominios en un mismo servidor sin interferencias"
    ],
    "correct": 3,
    "explanation": "Los Virtual Hosts permiten alojar varios dominios/sitios en un mismo servidor Apache, sirviendo el contenido correcto según el nombre solicitado."
  },
  {
    "id": 37,
    "unit": "U4",
    "tag": "S8 · Servicios Web",
    "q": "¿Qué archivo de configuración de Apache permite definir reglas locales sin acceso de administrador?",
    "options": [
      ".htaccess",
      "sites-available/default.conf",
      "envvars",
      "apache2.conf"
    ],
    "correct": 0,
    "explanation": ".htaccess permite definir reglas de configuración por directorio sin tocar la config global ni tener acceso de administrador."
  },
  {
    "id": 38,
    "unit": "U4",
    "tag": "S8 · Servicios Web",
    "q": "¿Qué directiva de .htaccess desactiva el listado de directorios en Apache?",
    "options": [
      "Options -Indexes",
      "Header always set X-Frame-Options DENY",
      "Require all denied",
      "RewriteEngine Off"
    ],
    "correct": 0,
    "explanation": "Options -Indexes desactiva el listado automático del contenido de un directorio cuando no hay archivo índice, evitando exponer ficheros."
  },
  {
    "id": 39,
    "unit": "U4",
    "tag": "S8 · Servicios Web",
    "q": "¿Qué herramienta gratuita se usa habitualmente para obtener certificados TLS/SSL en Apache?",
    "options": [
      "DigiCert Community",
      "Apache SSL Wizard",
      "OpenSSL directamente",
      "Let's Encrypt con Certbot"
    ],
    "correct": 3,
    "explanation": "Let's Encrypt (con el cliente Certbot) emite certificados TLS/SSL gratuitos y automatiza su renovación en Apache/Nginx."
  },
  {
    "id": 40,
    "unit": "U4",
    "tag": "S8 · Servicios Web",
    "q": "¿Qué comando verifica la sintaxis de la configuración de Apache antes de reiniciarlo?",
    "options": [
      "systemctl verify apache2",
      "apache2 --check",
      "sudo a2enmod syntax",
      "sudo apachectl configtest"
    ],
    "correct": 3,
    "explanation": "sudo apachectl configtest (o apache2ctl configtest) valida la sintaxis de la configuración antes de reiniciar, evitando caídas del servicio."
  },
  {
    "id": 41,
    "unit": "U5",
    "tag": "S9 · Correo Electrónico",
    "q": "¿Qué protocolo se encarga del envío y transporte de correo electrónico entre servidores?",
    "options": [
      "IMAP",
      "MIME",
      "POP3",
      "SMTP"
    ],
    "correct": 3,
    "explanation": "SMTP (Simple Mail Transfer Protocol) se encarga del envío y transporte de correo entre servidores. IMAP/POP3 son para recibir/leer."
  },
  {
    "id": 42,
    "unit": "U5",
    "tag": "S9 · Correo Electrónico",
    "q": "¿En qué se diferencia IMAP de POP3 en la gestión del buzón?",
    "options": [
      "IMAP descarga mensajes; POP3 los mantiene en servidor",
      "IMAP cifra mensajes; POP3 los transmite en texto plano",
      "IMAP mantiene mensajes en servidor y sincroniza dispositivos; POP3 los descarga y elimina",
      "IMAP solo funciona en escritorio; POP3 en cualquier dispositivo"
    ],
    "correct": 2,
    "explanation": "IMAP mantiene los mensajes en el servidor y sincroniza el estado entre dispositivos. POP3 los descarga al cliente y normalmente los borra del servidor."
  },
  {
    "id": 43,
    "unit": "U5",
    "tag": "S9 · Correo Electrónico",
    "q": "¿Cuál es el puerto seguro estándar para IMAP con SSL?",
    "options": [
      "143",
      "993",
      "995",
      "587"
    ],
    "correct": 1,
    "explanation": "IMAP sobre SSL (IMAPS) usa el puerto 993. POP3S usa 995, IMAP sin cifrar 143 y SMTP envío 587."
  },
  {
    "id": 44,
    "unit": "U5",
    "tag": "S9 · Correo Electrónico",
    "q": "¿Qué registro DNS indica a qué servidor debe entregar los mensajes de un dominio?",
    "options": [
      "Registro TXT",
      "Registro A",
      "Registro CNAME",
      "Registro MX"
    ],
    "correct": 3,
    "explanation": "El registro MX (Mail Exchange) del DNS indica qué servidor recibe el correo de un dominio. El A apunta a una IP y CNAME es un alias."
  },
  {
    "id": 45,
    "unit": "U5",
    "tag": "S9 · Correo Electrónico",
    "q": "¿Qué estándar define cómo se empaquetan adjuntos e imágenes en un mensaje de correo?",
    "options": [
      "SASL",
      "DKIM",
      "MIME",
      "SMTP AUTH"
    ],
    "correct": 2,
    "explanation": "MIME (Multipurpose Internet Mail Extensions) define cómo se empaquetan adjuntos, imágenes y texto enriquecido dentro de un mensaje de correo."
  },
  {
    "id": 46,
    "unit": "U5",
    "tag": "S10 · Correo Electrónico",
    "q": "¿Cuál es la función de Postfix en una arquitectura de servidor de correo?",
    "options": [
      "Almacenar buzones mediante IMAP/POP3",
      "Filtrar spam y malware",
      "Gestionar el transporte y envío SMTP",
      "Gestionar certificados TLS"
    ],
    "correct": 2,
    "explanation": "Postfix es un MTA: gestiona el transporte y envío SMTP del correo. El almacenamiento de buzones lo hace Dovecot (IMAP/POP3)."
  },
  {
    "id": 47,
    "unit": "U5",
    "tag": "S10 · Correo Electrónico",
    "q": "¿En qué archivo de configuración se definen el dominio, relay y cifrado TLS para Postfix?",
    "options": [
      "/etc/postfix/main.cf",
      "/etc/dovecot/dovecot.conf",
      "/etc/mail/sendmail.cf",
      "/etc/postfix/master.cf"
    ],
    "correct": 0,
    "explanation": "main.cf es el archivo principal de Postfix donde se configuran dominio, relay, TLS y restricciones. master.cf define los servicios/procesos."
  },
  {
    "id": 48,
    "unit": "U5",
    "tag": "S10 · Correo Electrónico",
    "q": "¿Qué hace SpamAssassin en un servidor de correo?",
    "options": [
      "Cifra mensajes en tránsito",
      "Bloquea IPs tras intentos fallidos",
      "Gestiona registros MX del dominio",
      "Analiza y puntúa mensajes para detectar spam"
    ],
    "correct": 3,
    "explanation": "SpamAssassin analiza cada mensaje y le asigna una puntuación según reglas; si supera el umbral se marca/clasifica como spam."
  },
  {
    "id": 49,
    "unit": "U5",
    "tag": "S10 · Correo Electrónico",
    "q": "¿Qué herramienta bloquea IPs que realizan múltiples intentos fallidos de autenticación?",
    "options": [
      "ClamAV",
      "SpamAssassin",
      "amavisd-new",
      "Fail2ban"
    ],
    "correct": 3,
    "explanation": "Fail2ban monitoriza logs y bloquea (vía firewall) las IPs que acumulan intentos fallidos de autenticación, mitigando fuerza bruta."
  },
  {
    "id": 50,
    "unit": "U5",
    "tag": "S10 · Correo Electrónico",
    "q": "¿Qué formato de buzón almacena cada mensaje como un archivo independiente en el servidor?",
    "options": [
      "Spool",
      "mbox",
      "Maildir",
      "INBOX"
    ],
    "correct": 2,
    "explanation": "Maildir almacena cada mensaje como un archivo independiente, lo que evita corrupción y bloqueos. mbox guarda todo en un único fichero."
  },
  {
    "id": 51,
    "unit": "U6",
    "tag": "S11 · Mensajería y Noticias",
    "q": "¿En qué año nació IRC como protocolo de mensajería en tiempo real?",
    "options": [
      "1991",
      "1988",
      "1983",
      "1995"
    ],
    "correct": 1,
    "explanation": "IRC (Internet Relay Chat) nació en 1988, creado por Jarkko Oikarinen. Es uno de los primeros sistemas de chat en tiempo real."
  },
  {
    "id": 52,
    "unit": "U6",
    "tag": "S11 · Mensajería y Noticias",
    "q": "¿Qué comando IRC se usa para unirse a un canal?",
    "options": [
      "/enter #canal",
      "/open #canal",
      "/connect #canal",
      "/join #canal"
    ],
    "correct": 3,
    "explanation": "/join #canal une al usuario a un canal en IRC."
  },
  {
    "id": 53,
    "unit": "U6",
    "tag": "S11 · Mensajería y Noticias",
    "q": "¿Qué modo de canal IRC restringe la escritura solo a usuarios autorizados?",
    "options": [
      "+r",
      "+k",
      "+i",
      "+m"
    ],
    "correct": 3,
    "explanation": "El modo +m (moderado) restringe la escritura solo a usuarios con voz (+v) u operadores. +i es invitación, +k clave, +r registrado."
  },
  {
    "id": 54,
    "unit": "U6",
    "tag": "S11 · Mensajería y Noticias",
    "q": "¿Qué puerto usa IRC con cifrado TLS?",
    "options": [
      "6660",
      "7000",
      "6667",
      "6697"
    ],
    "correct": 3,
    "explanation": "IRC sobre TLS usa el puerto 6697. El IRC sin cifrar suele usar el 6667."
  },
  {
    "id": 55,
    "unit": "U6",
    "tag": "S11 · Mensajería y Noticias",
    "q": "¿Qué plataforma moderna hereda directamente la filosofía de canales temáticos de IRC?",
    "options": [
      "Discord",
      "Signal",
      "WhatsApp",
      "Telegram grupos"
    ],
    "correct": 0,
    "explanation": "Discord hereda la filosofía de IRC: canales temáticos, servidores (guilds) y comunidades en tiempo real, con interfaz moderna."
  },
  {
    "id": 56,
    "unit": "U6",
    "tag": "S12 · Mensajería y Noticias",
    "q": "¿Qué software GNU gestiona listas de distribución con panel web y archivo histórico?",
    "options": [
      "Mailman",
      "Postmaster",
      "Listserv",
      "Sendmail"
    ],
    "correct": 0,
    "explanation": "GNU Mailman gestiona listas de distribución con panel web de administración y archivo histórico de mensajes."
  },
  {
    "id": 57,
    "unit": "U6",
    "tag": "S12 · Mensajería y Noticias",
    "q": "¿Cómo funciona una lista de distribución de correo?",
    "options": [
      "Es un foro web donde los usuarios publican de forma asíncrona",
      "Un servidor reenvía cada mensaje a todos los suscriptores",
      "Los suscriptores se conectan a un servidor para leer mensajes",
      "Los mensajes se cifran y envían individualmente a cada miembro"
    ],
    "correct": 1,
    "explanation": "En una lista de distribución, un servidor reenvía automáticamente cada mensaje recibido a todos los suscriptores."
  },
  {
    "id": 58,
    "unit": "U6",
    "tag": "S12 · Mensajería y Noticias",
    "q": "¿Qué protocolo usan los servicios de noticias (newsgroups) distribuidos?",
    "options": [
      "IMAP",
      "RSS",
      "NNTP",
      "SMTP"
    ],
    "correct": 2,
    "explanation": "NNTP (Network News Transfer Protocol) es el protocolo de los grupos de noticias (newsgroups/Usenet) distribuidos."
  },
  {
    "id": 59,
    "unit": "U6",
    "tag": "S12 · Mensajería y Noticias",
    "q": "¿En qué puerto opera NNTP con cifrado TLS?",
    "options": [
      "563",
      "993",
      "119",
      "143"
    ],
    "correct": 0,
    "explanation": "NNTP sobre TLS (NNTPS) usa el puerto 563. El NNTP sin cifrar usa el 119."
  },
  {
    "id": 60,
    "unit": "U6",
    "tag": "S12 · Mensajería y Noticias",
    "q": "¿Qué componente de Mailman 3 proporciona el archivo histórico de conversaciones?",
    "options": [
      "Postorius",
      "HyperKitty",
      "Sympa",
      "Mailpile"
    ],
    "correct": 1,
    "explanation": "En Mailman 3, HyperKitty es el componente que proporciona el archivo web e histórico de conversaciones. Postorius es la administración."
  },
  {
    "id": 61,
    "unit": "U7",
    "tag": "S13 · Multimedia y VoIP",
    "q": "¿Qué protocolo de streaming divide el vídeo en fragmentos .ts servidos por HTTP?",
    "options": [
      "RTSP",
      "RTMP",
      "RTP",
      "HLS"
    ],
    "correct": 3,
    "explanation": "HLS (HTTP Live Streaming, de Apple) trocea el vídeo en fragmentos .ts servidos por HTTP, lo que facilita su distribución y adaptación de calidad."
  },
  {
    "id": 62,
    "unit": "U7",
    "tag": "S13 · Multimedia y VoIP",
    "q": "¿En qué puerto opera RTMP por defecto?",
    "options": [
      "1234",
      "554",
      "1935",
      "8080"
    ],
    "correct": 2,
    "explanation": "RTMP (Real-Time Messaging Protocol) opera por defecto en el puerto 1935. Muy usado para ingesta hacia plataformas de streaming."
  },
  {
    "id": 63,
    "unit": "U7",
    "tag": "S13 · Multimedia y VoIP",
    "q": "¿Para qué tipo de entorno está principalmente diseñado el protocolo RTSP?",
    "options": [
      "Transferencia de archivos multimedia grandes",
      "Streaming masivo en redes CDN",
      "Control de sesiones en cámaras IP y videovigilancia",
      "Distribución de audio en streaming de radio"
    ],
    "correct": 2,
    "explanation": "RTSP (Real-Time Streaming Protocol) está diseñado para controlar sesiones (play/pause) en cámaras IP y videovigilancia."
  },
  {
    "id": 64,
    "unit": "U7",
    "tag": "S13 · Multimedia y VoIP",
    "q": "¿Qué herramienta open source convierte un servidor Linux en plataforma de streaming RTMP?",
    "options": [
      "Nginx con módulo RTMP",
      "VLC Server",
      "Apache Media Server",
      "FFmpeg-Server"
    ],
    "correct": 0,
    "explanation": "Nginx con el módulo RTMP convierte un servidor Linux en plataforma de streaming, recibiendo RTMP y reempaquetando a HLS/DASH."
  },
  {
    "id": 65,
    "unit": "U7",
    "tag": "S13 · Multimedia y VoIP",
    "q": "¿Qué herramienta de línea de comandos convierte un stream RTMP a formato HLS?",
    "options": [
      "OBS Studio",
      "ffmpeg",
      "VLC",
      "GStreamer"
    ],
    "correct": 1,
    "explanation": "ffmpeg es la navaja suiza multimedia por línea de comandos: convierte un stream RTMP a HLS, transcodifica, etc."
  },
  {
    "id": 66,
    "unit": "U7",
    "tag": "S14 · Multimedia y VoIP",
    "q": "¿Qué protocolo VoIP se encarga de la señalización (establecer, modificar, finalizar llamadas)?",
    "options": [
      "RTP",
      "SIP",
      "WebRTC",
      "RTCP"
    ],
    "correct": 1,
    "explanation": "SIP (Session Initiation Protocol) gestiona la señalización VoIP: establece, modifica y finaliza las llamadas. El audio en sí lo transporta RTP."
  },
  {
    "id": 67,
    "unit": "U7",
    "tag": "S14 · Multimedia y VoIP",
    "q": "¿Sobre qué protocolo de transporte opera RTP para minimizar la latencia?",
    "options": [
      "TCP",
      "UDP",
      "SCTP",
      "HTTP"
    ],
    "correct": 1,
    "explanation": "RTP va sobre UDP para minimizar latencia: en voz/vídeo en tiempo real es preferible perder algún paquete a esperar retransmisiones (como haría TCP)."
  },
  {
    "id": 68,
    "unit": "U7",
    "tag": "S14 · Multimedia y VoIP",
    "q": "¿Cuál es la ventaja principal de WebRTC frente a SIP tradicional?",
    "options": [
      "Soporta más codecs de audio",
      "Mayor ancho de banda disponible",
      "Permite comunicación en tiempo real directamente desde el navegador sin plugins",
      "Es más compatible con redes antiguas"
    ],
    "correct": 2,
    "explanation": "WebRTC permite comunicación de voz/vídeo en tiempo real directamente desde el navegador, sin plugins ni software adicional."
  },
  {
    "id": 69,
    "unit": "U7",
    "tag": "S14 · Multimedia y VoIP",
    "q": "¿Qué centralita IP open source ofrece interfaz web gráfica sobre Asterisk?",
    "options": [
      "FreePBX",
      "Freeswitch",
      "Kamailio",
      "OpenSIPS"
    ],
    "correct": 0,
    "explanation": "FreePBX es la interfaz web gráfica más extendida sobre Asterisk para administrar una centralita IP (extensiones, rutas, buzones)."
  },
  {
    "id": 70,
    "unit": "U7",
    "tag": "S14 · Multimedia y VoIP",
    "q": "¿Qué mecanismo de red prioriza el tráfico de voz para evitar jitter y cortes en VoIP?",
    "options": [
      "QoS con DSCP",
      "VLAN de datos",
      "NAT",
      "VPN"
    ],
    "correct": 0,
    "explanation": "QoS con marcado DSCP prioriza los paquetes de voz en la red, reduciendo jitter, latencia y cortes en las llamadas VoIP."
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
          <div style={{ fontSize: 64, marginBottom: 16 }}>🌐</div>
          <h1 style={{
            fontSize: 32, fontWeight: 900, color: "#FFFFFF",
            margin: "0 0 8px",
            background: "linear-gradient(135deg, #A78BFA, #6366F1)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>SRI · Test de Repaso</h1>
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

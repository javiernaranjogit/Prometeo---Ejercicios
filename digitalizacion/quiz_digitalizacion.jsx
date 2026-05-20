const { useState } = React;

const QUESTIONS = [
  // ── U1: FUNDAMENTOS ──────────────────────────────────────────────────
  {
    id: 1, unit: "U1", topic: "Fundamentos",
    q: "¿Qué describe mejor la 'digitalización' de una empresa?",
    options: ["Tener página web y redes sociales", "Sustituir papel por archivos PDF", "Reorganización del modelo de negocio usando tecnología digital como catalizador", "Comprar ordenadores nuevos para todos los empleados"],
    correct: 2,
    explanation: "La digitalización implica una reorganización fundamental del modelo de negocio, sus procesos y cultura usando tecnología como palanca de cambio. No es solo tener presencia online."
  },
  {
    id: 2, unit: "U1", topic: "Industria 4.0",
    q: "¿Cuál es el pilar tecnológico principal de la Industria 4.0?",
    options: ["Electricidad y producción en masa", "IoT + IA + Cloud = interconexión inteligente", "Vapor y mecanización", "Impresión offset y fax"],
    correct: 1,
    explanation: "La Industria 4.0 o cuarta revolución industrial se sustenta en IoT (conectividad), IA (decisiones autónomas) y Cloud (capacidad de procesamiento)."
  },
  {
    id: 3, unit: "U1", topic: "Industria 5.0",
    q: "¿Qué distingue a la Industria 5.0 de la 4.0?",
    options: ["Mayor automatización y eliminación del factor humano", "Énfasis en la persona, sostenibilidad y resiliencia frente a crisis", "Uso exclusivo de inteligencia artificial sin intervención humana", "Producción en masa a bajo coste en países emergentes"],
    correct: 1,
    explanation: "La Industria 5.0 reorienta la tecnología poniendo la persona en el centro del proceso productivo, promoviendo colaboración humano-robot, sostenibilidad y resiliencia."
  },
  {
    id: 4, unit: "U1", topic: "IT/OT",
    q: "¿Qué representa la 'OT' en la convergencia IT/OT?",
    options: ["Online Technology: sistemas de comunicación por internet", "Operational Technology: tecnología de control físico (PLCs, SCADA, sensores)", "Output Technology: sistemas de impresión y salida de datos", "Open Technology: software de código abierto"],
    correct: 1,
    explanation: "OT (Operational Technology) incluye autómatas (PLCs), sistemas de control (SCADA), sensores y actuadores que controlan procesos físicos e industriales."
  },
  {
    id: 5, unit: "U1", topic: "Sectores",
    q: "¿A qué sector pertenece la 'AgroTech' o Agricultura de Precisión?",
    options: ["Sector Secundario (Industria)", "Sector Terciario (Servicios)", "Sector Primario (Agricultura, Ganadería, Pesca)", "Sector Cuaternario (Conocimiento)"],
    correct: 2,
    explanation: "AgroTech es la revolución digital del Sector Primario: usa sensores de humedad, drones multiespectrales, GPS en tractores e IA para optimizar cultivos."
  },
  {
    id: 6, unit: "U1", topic: "Casos",
    q: "La fábrica de Siemens en Amberg lleva 30 años multiplicando su producción. ¿En qué factor clave se basa?",
    options: ["Incorporación de miles de trabajadores nuevos cada año", "Fusión perfecta IT/OT: gemelo digital + 1.000+ sensores + código único por producto", "Subcontratación de producción a países con mano de obra barata", "Reubicación de la planta a zonas de menor coste energético"],
    correct: 1,
    explanation: "Siemens Amberg alcanza 99,999% de productos sin defectos y ha multiplicado la producción ×14 con la misma superficie, gracias a la convergencia IT/OT y un gemelo digital completo."
  },
  {
    id: 7, unit: "U1", topic: "Mitos",
    q: "¿Cuál de estas afirmaciones sobre la Industria 4.0 es FALSA?",
    options: ["La IA puede automatizar tareas repetitivas liberando tiempo creativo a las personas", "La Industria 4.0 destruye masivamente empleos sin crear nuevos perfiles", "La digitalización es accesible también para pymes gracias al Cloud y el SaaS", "Los cobots trabajan junto a personas de forma colaborativa y segura"],
    correct: 1,
    explanation: "FALSO. La evidencia muestra que la IA no destruye el trabajo sino que transforma roles. Los empleos se transforman, demandando nuevas habilidades digitales."
  },
  {
    id: 8, unit: "U1", topic: "RFID/Inditex",
    q: "¿Qué tecnología usa Inditex/Zara para tener control de inventario en tiempo real?",
    options: ["Códigos QR en cada prenda", "Etiquetas RFID con identificador único en cada prenda", "Cámaras de visión artificial en todas las tiendas", "Escáneres láser de código de barras tradicional"],
    correct: 1,
    explanation: "Zara usa etiquetas RFID que permiten escanear un área entera en segundos. Los datos de ventas/stock (OT) se analizan en sede central (IT) para decisiones de producción casi en tiempo real."
  },

  // ── U2: THD ──────────────────────────────────────────────────────────
  {
    id: 9, unit: "U2", topic: "IoT",
    q: "¿Cuál es la clave real del IoT, más allá del dispositivo físico?",
    options: ["La velocidad de conexión a internet del dispositivo", "El dato en contexto: leerlo, almacenarlo, analizarlo y actuar sobre él", "El precio del hardware del sensor", "La marca del fabricante del dispositivo conectado"],
    correct: 1,
    explanation: "El valor del IoT no está en el dispositivo sino en el dato en contexto: captarlo, almacenarlo, analizarlo (con IA) y convertir decisiones reactivas en proactivas."
  },
  {
    id: 10, unit: "U2", topic: "Cobots",
    q: "¿Qué son los 'cobots' y en qué se diferencian de robots tradicionales?",
    options: ["Robots de combate militar autónomos", "Robots colaborativos diseñados para trabajar junto a personas de forma segura y flexible", "Robots de alta velocidad que sustituyen completamente al operario", "Ordenadores de control de procesos industriales (PLCs)"],
    correct: 1,
    explanation: "Los cobots (robots colaborativos) son compactos, flexibles y programables. Trabajan junto a personas asumiendo tareas repetitivas, riesgosas o rutinarias (3R), mejorando ergonomía y calidad."
  },
  {
    id: 11, unit: "U2", topic: "RA/RV",
    q: "¿Cuál es la diferencia clave entre Realidad Aumentada (RA) y Realidad Virtual (RV)?",
    options: ["RA crea un entorno 100% digital; RV superpone info digital sobre el mundo real", "RA superpone capas digitales sobre el mundo real; RV crea un entorno 100% digital inmersivo", "Son lo mismo, solo cambia el nombre según el fabricante", "RA es para uso médico y RV es exclusivamente para videojuegos"],
    correct: 1,
    explanation: "RA superpone instrucciones/datos sobre el mundo real (guiado de tareas). RV crea entornos digitales inmersivos para simulación, entrenamiento en riesgo o diseño sin intervención física."
  },
  {
    id: 12, unit: "U2", topic: "Ciberseguridad",
    q: "¿Por qué se dice que la ciberseguridad es un 'pilar transversal' de las THD?",
    options: ["Porque solo afecta a los departamentos de IT", "Porque IoT, RA, robótica y cloud generan superficies de ataque que deben protegerse", "Porque es obligatoria solo en grandes empresas con más de 250 empleados", "Porque reemplaza a los firewalls tradicionales"],
    correct: 1,
    explanation: "Todo dispositivo IoT, red, plataforma cloud o sistema RA genera nuevas superficies de ataque. Sin ciberseguridad (CIA: Confidencialidad, Integridad, Disponibilidad), la transformación digital es frágil."
  },
  {
    id: 13, unit: "U2", topic: "Blockchain",
    q: "¿Qué característica hace al Blockchain diferente de una base de datos tradicional?",
    options: ["Es más rápido que cualquier base de datos relacional", "Es distribuido, encriptado e inmutable: no puede modificarse sin consenso de toda la red", "Solo puede almacenar transacciones de criptomonedas", "Requiere un servidor central que valide todas las operaciones"],
    correct: 1,
    explanation: "Blockchain es una cadena inalterable de bloques con marca de tiempo y referencia criptográfica al bloque anterior, visible para todos los participantes pero imposible de modificar sin consenso."
  },
  {
    id: 14, unit: "U2", topic: "Gemelo Digital",
    q: "¿Qué permite hacer un Gemelo Digital que no permite un plano técnico tradicional?",
    options: ["Mostrar el diseño en 3D con colores", "Actualizarse con datos reales en tiempo real para simular, predecir fallos y optimizar sin intervenir el sistema físico", "Calcular el coste de fabricación del producto", "Compartir documentos de diseño entre varios ingenieros"],
    correct: 1,
    explanation: "El Gemelo Digital se conecta a sensores IoT y actualiza el modelo virtual en tiempo real. Permite simular escenarios, anticipar fallos y optimizar sin tocar el sistema real (aprende y predice)."
  },
  {
    id: 15, unit: "U2", topic: "Impresión 3D",
    q: "¿Qué ventaja principal aporta la Impresión 3D frente a la fabricación tradicional?",
    options: ["Produce piezas más baratas en cualquier cantidad", "Añade solo el material necesario capa a capa, reduciendo residuos y permitiendo piezas personalizadas", "Es el único método para fabricar piezas de metal", "Elimina la necesidad de diseñadores y ingenieros"],
    correct: 1,
    explanation: "La fabricación aditiva (impresión 3D) añade solo el material necesario, reduciendo residuos. Permite prototipado rápido, producción personalizada (médica, ortopédica) y fabricación distribuida bajo demanda."
  },
  {
    id: 16, unit: "U2", topic: "5G",
    q: "¿Cuál es la característica del 5G más crítica para el IoT industrial?",
    options: ["Mayor resolución de pantalla en smartphones", "Latencia ultrabaja + velocidad ultraalta + conectividad masiva de dispositivos", "Mejor cobertura en zonas rurales remotas", "Reducción del consumo de batería en teléfonos móviles"],
    correct: 1,
    explanation: "Las tres características clave del 5G son: velocidad ultraalta (hasta 10 Gbps), latencia ultrabaja (milisegundos) y conectividad masiva (millones de dispositivos por km²), habilitando IoT e industria en tiempo real."
  },

  // ── U3: CLOUD ────────────────────────────────────────────────────────
  {
    id: 17, unit: "U3", topic: "Cloud - IaaS",
    q: "Un equipo de TI quiere máximo control sobre el sistema operativo y las aplicaciones. ¿Qué modelo cloud elige?",
    options: ["SaaS (Software as a Service)", "PaaS (Platform as a Service)", "IaaS (Infrastructure as a Service)", "DaaS (Desktop as a Service)"],
    correct: 2,
    explanation: "IaaS ofrece los elementos básicos (servidores virtuales, redes, almacenamiento) y el cliente gestiona todo lo demás. Es el nivel más flexible y técnico. Ejemplos: Amazon EC2, Azure VMs, Google Compute Engine."
  },
  {
    id: 18, unit: "U3", topic: "Cloud - SaaS",
    q: "¿Cuál de estas herramientas es un ejemplo de SaaS?",
    options: ["Amazon EC2", "Google App Engine", "Heroku", "Salesforce CRM"],
    correct: 3,
    explanation: "SaaS (Software as a Service) son aplicaciones completas usadas directamente desde el navegador sin instalar nada. Ejemplos: Salesforce, Gmail, Dropbox, Microsoft 365, Canva."
  },
  {
    id: 19, unit: "U3", topic: "Tipos de nube",
    q: "Un banco quiere guardar datos sensibles en infraestructura exclusiva pero usar la nube pública para picos de demanda. ¿Qué tipo de nube usa?",
    options: ["Nube pública", "Nube privada", "Nube híbrida", "Nube comunitaria"],
    correct: 2,
    explanation: "La nube híbrida combina nube privada (para datos sensibles con más control) y nube pública (para escalabilidad en procesos menos críticos o de alta demanda). Ideal para banca y salud."
  },
  {
    id: 20, unit: "U3", topic: "Seguridad cloud",
    q: "La mayoría de brechas de datos en la nube se deben a…",
    options: ["Fallos de hardware de los proveedores cloud", "Errores de configuración por parte del usuario (contraseñas débiles, permisos incorrectos)", "Ataques físicos a los centros de datos", "Virus transmitidos por el aire en salas de servidores"],
    correct: 1,
    explanation: "Los principales proveedores invierten miles de millones en seguridad. Las brechas suelen originarse en errores humanos de configuración. La nube bien gestionada es más segura que servidores propios."
  },
  {
    id: 21, unit: "U3", topic: "Casos - Netflix",
    q: "¿Qué modelo de servicio cloud adoptó Netflix principalmente tras migrar a AWS?",
    options: ["SaaS: usaron Google Workspace para gestionar su contenido", "IaaS + algunos componentes PaaS, con arquitectura autoscalable", "PaaS exclusivamente con Heroku", "Nube privada propia sin proveedores externos"],
    correct: 1,
    explanation: "Netflix migró a AWS usando principalmente IaaS (Amazon EC2, S3, CloudFront). El gran logro fue una arquitectura autoscalable: más servidores cuando hay picos de demanda, liberando recursos después."
  },
  {
    id: 22, unit: "U3", topic: "Shared Responsibility",
    q: "En el 'Modelo de Responsabilidad Compartida' del cloud, ¿qué protege el cliente (no el proveedor)?",
    options: ["La seguridad física de los centros de datos", "El hardware de servidores y la red de fibra óptica", "Los accesos, contraseñas, permisos y configuración de sus datos", "La disponibilidad y redundancia de la infraestructura cloud"],
    correct: 2,
    explanation: "El proveedor protege la infraestructura (hardware, red, instalaciones físicas). El cliente es responsable de configurar correctamente usuarios, accesos, contraseñas y permisos de sus datos y aplicaciones."
  },
  {
    id: 23, unit: "U3", topic: "PaaS",
    q: "¿Qué analogía describe mejor a PaaS?",
    options: ["Alquilar un terreno donde tú construyes la casa a tu medida (IaaS)", "Alquilar un coche para usarlo directamente sin preocuparte del mantenimiento", "Alquilar un taller con herramientas listas para usar: tú solo desarrollas", "Comprar tu propio terreno y construir desde cero"],
    correct: 2,
    explanation: "PaaS es como un taller listo con herramientas: el proveedor gestiona infra y plataforma, el cliente solo desarrolla/despliega su aplicación. Ejemplos: Heroku, Google App Engine, Azure App Service."
  },
  {
    id: 24, unit: "U3", topic: "Mito cloud",
    q: "¿Cuál de estas afirmaciones sobre el cloud es VERDADERA?",
    options: ["La nube solo sirve para almacenar archivos como Dropbox o Google Drive", "La nube es siempre más cara que mantener servidores propios", "La nube permite desplegar IA, Big Data, IoT, videojuegos online y fábricas conectadas", "Migrar a la nube garantiza automáticamente el éxito del proyecto digital"],
    correct: 2,
    explanation: "El Cloud Computing abarca un ecosistema integral: IA, Big Data, DevOps, IoT, simulaciones científicas... Es la columna vertebral de la economía digital, no solo almacenamiento."
  },

  // ── U4: IA & BIG DATA ────────────────────────────────────────────────
  {
    id: 25, unit: "U4", topic: "Tipos de IA",
    q: "¿Qué tipo de IA existe actualmente en el mercado de forma real y funcional?",
    options: ["AGI (Inteligencia General Artificial) capaz de razonar en cualquier contexto", "ANI (Inteligencia Estrecha) diseñada para tareas concretas con alta precisión", "Superinteligencia que supera las capacidades humanas en todos los campos", "IA cuántica que procesa información a nivel de partículas subatómicas"],
    correct: 1,
    explanation: "Solo existe la ANI (Artificial Narrow Intelligence): diseñada para tareas concretas (reconocer rostros, recomendar música, traducir). La AGI (general) aún no existe y sigue siendo objeto de debate."
  },
  {
    id: 26, unit: "U4", topic: "Machine Learning",
    q: "¿En qué se basa el Machine Learning?",
    options: ["En reglas explícitas programadas por el desarrollador para cada situación", "En algoritmos que identifican patrones en datos sin que el programador especifique cada regla", "En copiar el comportamiento humano paso a paso mediante scripts", "En buscar información en internet en tiempo real"],
    correct: 1,
    explanation: "ML entrena algoritmos con ejemplos: 'cuando veas muchos casos como estos, aprende a predecir'. No necesita que el programador especifique reglas. Usos: detección de fraude, predicción de demanda, reconocimiento de voz."
  },
  {
    id: 27, unit: "U4", topic: "Deep Learning",
    q: "¿Qué diferencia al Deep Learning del Machine Learning clásico?",
    options: ["El DL requiere menos datos para entrenarse", "El DL usa redes neuronales profundas con muchas capas que aprenden representaciones abstractas por sí solas", "El DL solo funciona con imágenes, no con texto o audio", "El DL es más lento y menos preciso que el ML tradicional"],
    correct: 1,
    explanation: "DL usa redes neuronales artificiales profundas (muchas capas) que imitan el cerebro. Aprenden por sí mismas a reconocer patrones complejos sin que se les indique qué rasgos buscar."
  },
  {
    id: 28, unit: "U4", topic: "NLP",
    q: "¿Qué tecnología hace posible que un asistente virtual entienda y responda en lenguaje humano natural?",
    options: ["Computer Vision (Visión Artificial)", "Natural Language Processing (NLP)", "Robotic Process Automation (RPA)", "Business Intelligence (BI)"],
    correct: 1,
    explanation: "NLP (Procesamiento del Lenguaje Natural) permite a las máquinas comprender, generar y traducir lenguaje humano. Es lo que hay detrás de ChatGPT, traductores automáticos, chatbots y análisis de sentimientos."
  },
  {
    id: 29, unit: "U4", topic: "Big Data 3V",
    q: "Las '3V del Big Data' son…",
    options: ["Velocidad, Virtualización, Verificación", "Volumen, Velocidad, Variedad", "Valor, Veracidad, Virtualización", "Volumen, Visualización, Validación"],
    correct: 1,
    explanation: "Las 3V del Big Data son: Volumen (cantidades masivas), Velocidad (procesamiento en tiempo real) y Variedad (múltiples formatos: texto, imágenes, vídeos, sensores). Sin IA, son solo datos sin valor."
  },
  {
    id: 30, unit: "U4", topic: "IA + Big Data",
    q: "¿Cómo se relacionan Big Data e IA?",
    options: ["Son tecnologías opuestas que no pueden usarse juntas", "Big Data alimenta a la IA con datos; la IA los convierte en conocimiento accionable formando un ciclo virtuoso", "El Big Data reemplaza a la IA haciendo innecesario el aprendizaje automático", "La IA genera Big Data de forma automática sin necesidad de recopilar datos reales"],
    correct: 1,
    explanation: "Ciclo virtuoso: Big Data aporta datos masivos → IA los procesa y aprende → genera acciones inteligentes → las acciones producen nuevos datos. Sin Big Data la IA no tiene materia prima; sin IA el Big Data es solo ruido."
  },
  {
    id: 31, unit: "U4", topic: "Sesgos",
    q: "¿Qué ocurrió con el sistema de selección de personal de IA desarrollado por Amazon en 2018?",
    options: ["Funcionó perfectamente y redujo el tiempo de contratación un 90%", "Penalizó automáticamente currículums femeninos por estar entrenado con datos históricos sesgados hacia hombres", "Fue hackeado y comprometió datos de candidatos", "Rechazó candidatos sin experiencia favoreciendo solo a perfiles senior"],
    correct: 1,
    explanation: "El algoritmo fue entrenado con 10 años de datos donde la mayoría eran hombres en puestos técnicos. Aprendió a penalizar currículums femeninos. Amazon lo descartó. Lección: los sesgos están en los datos, no solo en los algoritmos."
  },
  {
    id: 32, unit: "U4", topic: "Ética IA",
    q: "¿Qué es el AI Act de la Unión Europea aprobado en 2024?",
    options: ["Una ley que prohíbe el uso de IA en entornos empresariales europeos", "Un marco legal que clasifica sistemas de IA por nivel de riesgo y obliga a transparencia, trazabilidad y supervisión humana", "Una directiva que obliga a todas las empresas a usar IA en sus procesos", "Un acuerdo internacional que cede la regulación de IA a Estados Unidos"],
    correct: 1,
    explanation: "El AI Act UE (2024) es el primer marco legal pionero mundial. Clasifica sistemas de IA por riesgo (alto, medio, bajo) y exige explicabilidad (XAI), supervisión humana, trazabilidad y protección de datos."
  },

  // ── U5: VALOR DEL DATO ────────────────────────────────────────────────
  {
    id: 33, unit: "U5", topic: "Dato vs Información",
    q: "'37 ºC' es un dato. '37 ºC de temperatura corporal de un paciente adulto' es…",
    options: ["Sigue siendo un dato sin valor añadido", "Información (dato + contexto + estructura)", "Conocimiento aplicable para tomar decisiones", "Big Data porque tiene muchos decimales"],
    correct: 1,
    explanation: "La cadena de valor es: Dato (bruto, sin contexto) → Información (dato + contexto + estructura) → Conocimiento (interpretación para decidir). '37 ºC corporal' es información; '37 ºC es normal, no intervenir' es conocimiento."
  },
  {
    id: 34, unit: "U5", topic: "Ciclo de vida",
    q: "¿Cuál es el orden correcto del ciclo de vida del dato?",
    options: ["Análisis → Captura → Almacenamiento → Uso → Destrucción", "Captura → Almacenamiento → Procesamiento → Análisis → Uso → Archivo/Destrucción", "Uso → Análisis → Captura → Almacenamiento → Destrucción", "Destrucción → Captura → Análisis → Almacenamiento → Uso"],
    correct: 1,
    explanation: "El ciclo de vida del dato: Captura (sensores, formularios) → Almacenamiento (BBDD, Data Lake) → Procesamiento (limpieza, integración) → Análisis → Uso y Visualización → Archivo/Destrucción (RGPD)."
  },
  {
    id: 35, unit: "U5", topic: "Data Warehouse",
    q: "¿Cuál es la filosofía de almacenamiento de un Data Warehouse?",
    options: ["Schema-on-read: la estructura se aplica al leer los datos", "Schema-on-write: el formato y validación se definen antes de almacenar los datos", "No-schema: acepta cualquier tipo de dato sin estructura", "Schema-on-demand: el esquema se crea cuando lo pide el analista"],
    correct: 1,
    explanation: "Data Warehouse usa schema-on-write: estructura rígida y predefinida. Ideal para BI, reporting y análisis histórico. Los datos entran ya validados y estructurados. Ejemplos: Amazon Redshift, Google BigQuery."
  },
  {
    id: 36, unit: "U5", topic: "Data Lake",
    q: "¿Para qué uso es más adecuado un Data Lake?",
    options: ["Reporting financiero mensual con datos estructurados", "Exploración, Machine Learning y Ciencia de Datos con datos en bruto (estructurados y no estructurados)", "Contabilidad y facturación empresarial", "Gestión de relaciones con clientes (CRM)"],
    correct: 1,
    explanation: "Data Lake almacena datos en su formato nativo (schema-on-read). Ideal para exploración, ML y Ciencia de Datos donde el objetivo es descubrir patrones aún no definidos. Ejemplos: Amazon S3, Azure Data Lake."
  },
  {
    id: 37, unit: "U5", topic: "Data Lakehouse",
    q: "¿Qué es un Data Lakehouse?",
    options: ["Un Data Lake ubicado físicamente dentro de un almacén industrial", "Una arquitectura que combina la gobernanza del Data Warehouse con la flexibilidad del Data Lake", "Un tipo de base de datos NoSQL para startups", "Una nube privada exclusiva para gestión de datos empresariales"],
    correct: 1,
    explanation: "El Data Lakehouse integra lo mejor de ambos mundos: la flexibilidad del lago (datos brutos, schema-on-read) y la gobernanza del almacén (estructura, calidad, control). Las empresas avanzadas usan ambos."
  },
  {
    id: 38, unit: "U5", topic: "CIA Ciberseguridad",
    q: "La 'tríada CIA' en ciberseguridad hace referencia a…",
    options: ["Central Intelligence Agency, Confidential Information, Access", "Confidencialidad, Integridad y Disponibilidad de la información", "Cloud, IoT, Automatización: los tres pilares de la Industria 4.0", "Contraseña, Identificación y Autenticación"],
    correct: 1,
    explanation: "CIA es la base de toda estrategia de ciberseguridad: Confidencialidad (solo acceden los autorizados), Integridad (datos no alterados sin autorización) y Disponibilidad (sistemas accesibles cuando se necesitan)."
  },
  {
    id: 39, unit: "U5", topic: "Amenazas",
    q: "El ataque WannaCry de 2017 fue un ejemplo de…",
    options: ["Phishing: correo falso para robar contraseñas", "Ransomware: cifró archivos en miles de equipos y exigió rescate en Bitcoin", "DDoS: saturó servidores con tráfico masivo", "Ingeniería social: manipuló empleados para revelar contraseñas"],
    correct: 1,
    explanation: "WannaCry fue ransomware que explotó la vulnerabilidad 'EternalBlue' de Windows. Cifró archivos y exigió 300-600 USD en Bitcoin. Afectó 150+ países. Lección: actualizar sistemas + copias de seguridad."
  },
  {
    id: 40, unit: "U5", topic: "RGPD",
    q: "¿Qué principio fundamental establece el RGPD sobre la protección de datos?",
    options: ["Las empresas pueden usar datos personales sin restricciones si los anonimiza", "Privacidad desde el diseño y por defecto: seguridad incorporada desde el origen del sistema", "Solo aplica a empresas de más de 500 empleados en Europa", "Los datos personales pueden compartirse libremente entre empresas del mismo sector"],
    correct: 1,
    explanation: "El RGPD establece 'privacy by design and by default': la privacidad debe incorporarse desde el diseño del sistema, no añadirse al final. Garantiza derechos ARCO-POL y obliga a proteger datos activamente."
  },
  {
    id: 41, unit: "U5", topic: "Casos",
    q: "¿Cómo usó el Ayuntamiento de Barcelona los datos para mejorar la recogida de residuos?",
    options: ["Contratando más camiones y conductores para más frecuencia de recogida", "Sensores IoT en contenedores + modelos de optimización de rutas → rutas dinámicas según nivel de llenado real", "Instalando contenedores más grandes para reducir la frecuencia", "Subcontratando el servicio a empresas privadas con tecnología propia"],
    correct: 1,
    explanation: "Barcelona desplegó sensores IoT en contenedores midiendo nivel de llenado en tiempo real. Con Ciencia de Datos optimizó rutas, reduciendo kilómetros, combustible y rebosamientos. Dato bruto → conocimiento accionable."
  },
  {
    id: 42, unit: "U5", topic: "Mito datos",
    q: "¿Cuál es el riesgo de 'acumular muchos datos sin estrategia'?",
    options: ["Que los datos se dupliquen y ocupen más espacio del necesario", "Crear un 'data swamp': pantano de datos inutilizables por falta de gobernanza, calidad y preguntas claras", "Que los datos expiren y dejen de ser válidos", "Que otros competidores puedan acceder a esos datos fácilmente"],
    correct: 1,
    explanation: "Sin gobernanza, calidad y preguntas de negocio claras, el Data Lake se convierte en un data swamp (pantano). El valor no está en los datos sino en las decisiones que permiten tomar."
  },

  // ── U6: PROYECTO TRANSFORM. DIGITAL ──────────────────────────────────
  {
    id: 43, unit: "U6", topic: "Estrategia digital",
    q: "¿Cuál es el primer paso correcto para iniciar un proyecto de transformación digital?",
    options: ["Seleccionar la tecnología más innovadora del mercado (IA, blockchain, IoT)", "Contratar a un consultora tecnológica para que implante soluciones", "Definir la estrategia digital: qué objetivos persigue y desde dónde parte la empresa", "Migrar toda la infraestructura a la nube inmediatamente"],
    correct: 2,
    explanation: "La transformación digital empieza por la estrategia (dirección y objetivos), luego el diagnóstico (punto de partida) y DESPUÉS la selección tecnológica. Elegir tecnología sin diagnóstico es como construir por el tejado."
  },
  {
    id: 44, unit: "U6", topic: "Diagnóstico digital",
    q: "¿Cuáles son las 4 áreas del diagnóstico digital?",
    options: ["Hardware, Software, Redes y Almacenamiento", "Procesos, Personas/Cultura, Tecnología y Clientes", "Marketing, Ventas, Producción y Logística", "Finanzas, RRHH, IT y Operaciones"],
    correct: 1,
    explanation: "El diagnóstico digital analiza: Procesos (cuellos de botella, automatizables), Personas/Cultura (mentalidad digital, habilidades), Tecnología (sistemas existentes, integración) y Clientes (experiencia digital, datos, expectativas)."
  },
  {
    id: 45, unit: "U6", topic: "Selección THD",
    q: "Al seleccionar una Tecnología Habilitadora Digital (THD), ¿cuál es el criterio más importante?",
    options: ["Que sea la tecnología más mencionada en redes sociales y conferencias", "Que sea la más económica del mercado", "Que resuelva necesidades estratégicas concretas con ROI, escalabilidad y seguridad", "Que la use la competencia directa de la empresa"],
    correct: 2,
    explanation: "La THD debe: alinearse con la estrategia, aportar ROI medible, integrarse con sistemas existentes, escalar con el crecimiento y cumplir criterios de seguridad. Adoptar tecnología 'de moda' sin diagnóstico genera gasto inútil."
  },
  {
    id: 46, unit: "U6", topic: "Herramientas análisis",
    q: "¿Para qué sirve la 'Matriz Impacto/Esfuerzo' en un proyecto de transformación digital?",
    options: ["Para calcular el presupuesto total del proyecto digital", "Para clasificar iniciativas en 4 cuadrantes y priorizar: alto impacto/bajo esfuerzo primero", "Para medir el impacto ambiental de la digitalización", "Para evaluar el rendimiento individual de los empleados en el proceso de cambio"],
    correct: 1,
    explanation: "La Matriz Impacto/Esfuerzo clasifica iniciativas: Alto impacto/Bajo esfuerzo → hacer primero; Alto/Alto → planificar; Bajo/Bajo → evaluar; Bajo/Alto → descartar. Evita la dispersión y guía decisiones realistas."
  },
  {
    id: 47, unit: "U6", topic: "Plan implantación",
    q: "¿Cuáles son las 4 áreas críticas del Plan de Implantación?",
    options: ["Marketing, Ventas, IT y Finanzas", "Gestión de datos, Seguridad, Recursos Humanos/Cambio y Medición (KPIs SMART)", "Hardware, Software, Redes y Formación", "Nube, IA, Blockchain y IoT"],
    correct: 1,
    explanation: "Las 4 áreas críticas: Gestión de datos (gobierno, calidad, accesos) + Seguridad (ciberseguridad, RGPD, privacidad por diseño) + RRHH/Cambio (reskilling, comunicación) + Medición (objetivos SMART, KPIs)."
  },
  {
    id: 48, unit: "U6", topic: "Gestión del cambio",
    q: "¿Por qué fracasan muchos proyectos de transformación digital?",
    options: ["Por elegir tecnología demasiado avanzada para el mercado actual", "Porque la tecnología es demasiado cara y los presupuestos son insuficientes", "Por no gestionar el cambio cultural: las personas no adoptan las nuevas herramientas", "Porque los reguladores no permiten implementar innovaciones digitales"],
    correct: 2,
    explanation: "La tecnología solo funciona si las personas la adoptan. La gestión del cambio (comunicar el porqué, formación/reskilling, acompañamiento, reducir resistencias) es el punto más crítico. La transformación digital es, sobre todo, una transformación cultural."
  },
  {
    id: 49, unit: "U6", topic: "LEGO caso",
    q: "¿Cómo logró LEGO su transformación digital sin abandonar su producto físico?",
    options: ["Vendiendo la empresa a un fabricante de videojuegos", "Creando LEGO Ideas (co-creación online), ecosistema de videojuegos y series, manteniendo la esencia creativa", "Reduciendo el catálogo de productos para centrarse solo en sets digitales", "Externalizando toda la producción y convirtiéndose en empresa puramente digital"],
    correct: 1,
    explanation: "LEGO redefinió su propuesta de valor integrando lo digital sin abandonar lo físico. LEGO Ideas permite que fans propongan sets (co-creación). Con alianzas para videojuegos y series pasó de la quiebra a ser referente mundial."
  },
  {
    id: 50, unit: "U6", topic: "KPIs SMART",
    q: "¿Qué significa que un objetivo de transformación digital sea 'SMART'?",
    options: ["Que use tecnología inteligente (Smart Technology) para medirse automáticamente", "Específico, Medible, Alcanzable, Relevante y con límite de Tiempo", "Que sea diseñado por consultores externos especializados en digitalización", "Simple, Manejable, Adaptable, Repetible y Transferible"],
    correct: 1,
    explanation: "SMART: Specific (específico), Measurable (medible), Achievable (alcanzable), Relevant (relevante), Time-bound (con plazo). Sin métricas SMART no hay forma de justificar la inversión ni corregir el rumbo."
  },

  // ── REPASO TRANSVERSAL ────────────────────────────────────────────────
  {
    id: 51, unit: "Transversal", topic: "Mitos generales",
    q: "¿Cuál de estas afirmaciones es VERDADERA?",
    options: ["La RV profesional solo se usa para videojuegos", "La ciberseguridad solo afecta a bancos y gobiernos grandes", "Blockchain es lo mismo que Bitcoin", "La nube bien configurada suele ser más segura que servidores locales propios"],
    correct: 3,
    explanation: "Los tres primeros son mitos. VERDADERO: La nube (AWS, Azure, Google Cloud) invierte miles de millones en seguridad con cifrado AES-256, vigilancia 24h y certificaciones. La mayoría de brechas son por errores humanos, no del proveedor."
  },
  {
    id: 52, unit: "Transversal", topic: "Aplicaciones IA",
    q: "Waze/Google Maps son ejemplos de IA aplicada a…",
    options: ["Visión Artificial para detectar obstáculos en carretera", "NLP para interpretar comandos de voz del conductor", "ML aplicado a optimización de rutas en tiempo real con millones de datos GPS", "Deep Learning para predecir el tiempo meteorológico"],
    correct: 2,
    explanation: "Waze y Google Maps usan Machine Learning para analizar millones de puntos GPS en tiempo real, predecir tráfico, calcular rutas óptimas y estimar tiempos de llegada. Ejemplo cotidiano de IA + Big Data en acción."
  },
  {
    id: 53, unit: "Transversal", topic: "Sector Terciario",
    q: "¿Qué tecnología es la clave del 'fast fashion' de Inditex para reaccionar en días a las tendencias?",
    options: ["Big Data de redes sociales para predecir modas", "IA generativa para diseñar ropa automáticamente", "RFID + integración en tiempo real entre tiendas, online y cadena de suministro (IT/OT)", "Impresión 3D para fabricar prendas bajo demanda"],
    correct: 2,
    explanation: "Inditex usa RFID en cada prenda (OT), datos de ventas analizados en sede central (IT), y talleres de proximidad. Si un modelo triunfa el lunes, el jueves está en tiendas la nueva versión: convergencia IT/OT perfecta."
  },
  {
    id: 54, unit: "Transversal", topic: "Modelos cloud",
    q: "Una startup quiere desplegar su app web rápido sin configurar servidores. ¿Qué modelo cloud elige?",
    options: ["IaaS con Amazon EC2 y configuración manual del servidor", "PaaS con Heroku o Render: sube código y la app queda online en minutos", "Nube privada con servidores propios en las oficinas", "SaaS: usa Gmail para gestionar la comunicación del equipo"],
    correct: 1,
    explanation: "PaaS (Heroku, Render, Google App Engine) permite subir código y tener la app online en minutos sin configurar servidores. Perfecto para startups, prototipos o proyectos iniciales."
  },
  {
    id: 55, unit: "Transversal", topic: "Ética y datos",
    q: "¿Qué garantiza el RGPD a cualquier ciudadano europeo?",
    options: ["Que sus datos nunca se almacenen digitalmente", "Acceso, rectificación, supresión y portabilidad de sus datos personales (derechos ARCO-POL)", "Que no pueda comprarse publicidad personalizada en internet", "Que las empresas paguen por usar sus datos personales"],
    correct: 1,
    explanation: "El RGPD garantiza derechos ARCO-POL: Acceso (saber qué datos tienen), Rectificación (corregirlos), Cancelación/Supresión ('derecho al olvido'), Oposición, Portabilidad y Limitación del tratamiento."
  },
  {
    id: 56, unit: "Transversal", topic: "IT/OT en práctica",
    q: "Un termostato inteligente que enciende la calefacción al recibir una orden de voz es ejemplo de…",
    options: ["Inteligencia Artificial General (AGI)", "Convergencia IT/OT a pequeña escala: voz (IT) controla sistema físico de calefacción (OT)", "Blockchain para registro seguro de la temperatura", "Data Warehouse para histórico de temperaturas del hogar"],
    correct: 1,
    explanation: "El termostato inteligente es convergencia IT/OT doméstica: la orden de voz (IT/información) controla el sistema físico de calefacción (OT/operaciones físicas). Misma lógica que en fábricas inteligentes, a menor escala."
  },
  {
    id: 57, unit: "Transversal", topic: "Transformación cultural",
    q: "Según el temario, ¿por qué las personas se resisten a la transformación digital?",
    options: ["Porque son incapaces de aprender nuevas tecnologías a partir de cierta edad", "Por incertidumbre y falta de comprensión del porqué: no se resisten al cambio sino a no entenderlo", "Porque prefieren el trabajo manual y no valoran la eficiencia", "Porque los sindicatos bloquean sistemáticamente cualquier innovación tecnológica"],
    correct: 1,
    explanation: "Las personas no se resisten al cambio en sí, sino a la incertidumbre. Con comunicación clara del porqué, participación activa y formación específica (reskilling), la resistencia disminuye y el cambio fluye."
  },
  {
    id: 58, unit: "Transversal", topic: "McLaren F1",
    q: "¿Cómo usa McLaren F1 las THD en competición?",
    options: ["Solo usa Big Data offline para analizar carreras pasadas", "Gemelo Digital (300+ sensores) + Impresión 3D + Blockchain + 5G para optimizar rendimiento en tiempo real", "Principalmente IA generativa para diseñar el monoplaza cada temporada", "Cobots que realizan los cambios de neumáticos durante las paradas en boxes"],
    correct: 1,
    explanation: "McLaren integra: Gemelo Digital (300+ sensores, modelo virtual en tiempo real), Impresión 3D (prototipado en horas), Blockchain (integridad de datos de carrera) y 5G (comunicación circuito-fábrica con latencia mínima)."
  },
  {
    id: 59, unit: "Transversal", topic: "Dato a decisión",
    q: "¿Qué significa que Amazon use 'logística predictiva'?",
    options: ["Que Amazon adivina qué quiere comprar el usuario antes de que lo busque usando magia algorítmica", "Que modelos de Big Data + ML predicen qué productos se venderán en cada zona y los preposicionan en almacenes cercanos antes del pedido", "Que los precios suben automáticamente cuando hay mucha demanda", "Que los repartidores usan GPS inteligente para optimizar su ruta diaria"],
    correct: 1,
    explanation: "Amazon predice con Big Data + ML qué productos se venderán en cada zona geográfica, moviéndolos a almacenes cercanos ANTES de que se realicen los pedidos. Esto reduce tiempos de entrega y costes logísticos."
  },
  {
    id: 60, unit: "Transversal", topic: "Visión de conjunto",
    q: "¿Cuál es el hilo conductor de todas las unidades del curso?",
    options: ["La tecnología por sí misma garantiza el éxito empresarial", "Los datos son el petróleo del siglo XXI: capturarlos, analizarlos y actuar sobre ellos es la ventaja competitiva real, siempre con personas y ética en el centro", "La digitalización es un proceso técnico que solo compete al departamento de IT", "Las grandes empresas siempre llevan ventaja sobre las pymes en transformación digital"],
    correct: 1,
    explanation: "El hilo conductor: los datos son el activo estratégico central. La cadena completa (THD → Cloud → IA/Big Data → Gobierno del dato → Estrategia digital) sirve para convertir datos en decisiones de valor, con personas y ética como pilares transversales."
  }
];

const UNIT_COLORS = {
  "U1": "#8B5CF6",
  "U2": "#06B6D4",
  "U3": "#3B82F6",
  "U4": "#F59E0B",
  "U5": "#10B981",
  "U6": "#F43F5E",
  "Transversal": "#EC4899"
};

const SHAPE_COLORS = ["#E53E3E", "#3182CE", "#38A169", "#D69E2E"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function useQuestions() {
  const [questions] = useState(() => shuffle(QUESTIONS));
  return questions;
}



// ── Answer button ─────────────────────────────────────────────────────────
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
        letterSpacing: "-0.01em"
      }}>{text}</span>
      {(isCorrect || isWrong) && (
        <span style={{ marginLeft: "auto", fontSize: 20 }}>
          {isCorrect ? "✓" : "✗"}
        </span>
      )}
    </button>
  );
}

// ── Results screen ────────────────────────────────────────────────────────
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
        {/* Header resultado */}
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

          {/* Barra de progreso */}
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

          {/* Stats por unidad */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 20 }}>
            {Object.entries(
              results.reduce((acc, r) => {
                const u = questions.find(q => q.id === r.id)?.unit || "?";
                if (!acc[u]) acc[u] = { correct: 0, total: 0 };
                acc[u].total++;
                if (r.correct) acc[u].correct++;
                return acc;
              }, {})
            ).map(([unit, s]) => (
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

        {/* Filtros */}
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

        {/* Lista de resultados */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {filtered.map((r, i) => {
            const q = questions.find(qq => qq.id === r.id);
            if (!q) return null;
            return (
              <div key={r.id} style={{
                background: r.correct ? "#0D2818" : "#2D0A0A",
                border: `1px solid ${r.correct ? "#10B98133" : "#EF444433"}`,
                borderRadius: 16, padding: "18px 20px",
                borderLeft: `4px solid ${r.correct ? "#10B981" : "#EF4444"}`
              }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{
                    background: UNIT_COLORS[q.unit] || "#8B5CF6",
                    color: "#FFF", borderRadius: 6, padding: "2px 8px",
                    fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", marginTop: 2
                  }}>{q.unit}</span>
                  <span style={{ color: "#E2E8F0", fontWeight: 600, fontSize: 14, lineHeight: 1.4 }}>
                    {q.q}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                  <div style={{
                    background: r.correct ? "#10B98122" : "#EF444422",
                    borderRadius: 8, padding: "8px 12px"
                  }}>
                    <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2, fontWeight: 700 }}>
                      {r.correct ? "✓ TU RESPUESTA (CORRECTA)" : "✗ TU RESPUESTA"}
                    </div>
                    <div style={{ fontSize: 13, color: r.correct ? "#6EE7B7" : "#FCA5A5", fontWeight: 600 }}>
                      {q.options[r.chosen]}
                    </div>
                  </div>
                  {!r.correct && (
                    <div style={{
                      background: "#10B98122",
                      borderRadius: 8, padding: "8px 12px"
                    }}>
                      <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2, fontWeight: 700 }}>✓ RESPUESTA CORRECTA</div>
                      <div style={{ fontSize: 13, color: "#6EE7B7", fontWeight: 600 }}>
                        {q.options[q.correct]}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{
                  background: "#0F172A", borderRadius: 8, padding: "10px 14px",
                  borderLeft: "3px solid #6366F1"
                }}>
                  <span style={{ fontSize: 10, color: "#6366F1", fontWeight: 700 }}>EXPLICACIÓN · </span>
                  <span style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.5 }}>{q.explanation}</span>
                </div>
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

// ── Main Quiz Screen ──────────────────────────────────────────────────────
function App() {
  const allQuestions = useQuestions();

  const [phase, setPhase] = useState("start"); // start | quiz | results
  const [current, setCurrent] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState([]);
  const [animIn, setAnimIn] = useState(true);

  const q = allQuestions[current];
  const unitColor = q ? (UNIT_COLORS[q.unit] || "#8B5CF6") : "#8B5CF6";

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
      // Eliminar el resultado de la pregunta actual (si ya respondió) y el de la anterior
      setResults(prev => {
        const newResults = [...prev];
        // Si la pregunta actual ya fue respondida, quitarla
        if (revealed) newResults.pop();
        // Quitar también la respuesta de la pregunta anterior (volvemos a ella sin respuesta)
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
          <div style={{ fontSize: 64, marginBottom: 16 }}>⚡</div>
          <h1 style={{
            fontSize: 32, fontWeight: 900, color: "#FFFFFF",
            margin: "0 0 8px",
            background: "linear-gradient(135deg, #A78BFA, #6366F1)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>Quiz Digitalización</h1>
          <p style={{ color: "#94A3B8", fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
            60 preguntas · Sin límite de tiempo<br />
            Cubre las 6 Unidades del temario
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
              ["✍️", "Explicación de cada respuesta"]
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

  // ── Quiz screen ──────────────────────────────────────────────────────
  const progress = ((current) / allQuestions.length) * 100;
  const correctSoFar = results.filter(r => r.correct).length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)",
      fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
      display: "flex", flexDirection: "column"
    }}>
      {/* Top bar */}
      <div style={{
        background: "#0F172A", padding: "12px 20px",
        display: "flex", alignItems: "center", gap: 16,
        borderBottom: "1px solid #1E293B"
      }}>
        {/* Botón volver atrás */}
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
        }}>{q.unit} · {q.topic}</div>

        {/* Barra de progreso */}
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

      {/* Question */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        maxWidth: 780, width: "100%", margin: "0 auto",
        padding: "24px 20px 20px",
        opacity: animIn ? 1 : 0,
        transform: animIn ? "translateY(0)" : "translateY(-10px)",
        transition: "all 0.2s ease"
      }}>
        {/* Pregunta */}
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

        {/* Opciones */}
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

        {/* Explicación post-reveal */}
        {revealed && (
          <div style={{
            marginTop: 16,
            background: chosen === q.correct ? "#0D2818" : "#1A0A0A",
            borderRadius: 14, padding: "16px 18px",
            border: `1px solid ${chosen === q.correct ? "#10B98133" : "#EF444433"}`,
            borderLeft: `4px solid ${chosen === q.correct ? "#10B981" : "#EF4444"}`
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: chosen === q.correct ? "#10B981" : "#EF4444", marginBottom: 6 }}>
              {chosen === q.correct ? "✓ CORRECTO" : "✗ INCORRECTO"}
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#94A3B8", lineHeight: 1.55 }}>
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

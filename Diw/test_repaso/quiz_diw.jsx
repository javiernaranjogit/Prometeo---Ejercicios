const { useState } = React;

const QUESTIONS = [
  {
    "id": 1,
    "unit": "U1·S1",
    "q": "¿Qué tecnología se usa para crear interfaces de escritorio en Java con separación entre estructura y lógica?",
    "options": [
      "HTML + CSS",
      "React",
      "JavaFX con FXML",
      "Angular"
    ],
    "correct": 2,
    "explanation": "JavaFX usa FXML (XML declarativo) para describir la estructura de la interfaz, separada del controlador Java que contiene la lógica. HTML+CSS y React/Angular son web, no escritorio Java."
  },
  {
    "id": 2,
    "unit": "U1·S1",
    "q": "¿Cuál es la principal ventaja de las interfaces web frente a las GUI de escritorio?",
    "options": [
      "Mayor acceso a recursos del sistema operativo",
      "Soporte nativo de FXML",
      "Portabilidad: funcionan en cualquier navegador sin instalar nada",
      "Mejor rendimiento en CPU"
    ],
    "correct": 2,
    "explanation": "Las interfaces web son portables: cualquier dispositivo con navegador puede ejecutarlas sin instalación. A cambio, tienen menos acceso al SO que una app de escritorio."
  },
  {
    "id": 3,
    "unit": "U1·S1",
    "q": "¿Para qué sirve Figma en el proceso de desarrollo de interfaces?",
    "options": [
      "Diseñar y prototipar flujos antes de escribir código",
      "Compilar y ejecutar código JavaScript",
      "Depurar errores en tiempo de ejecución",
      "Gestionar bases de datos relacionales"
    ],
    "correct": 0,
    "explanation": "Figma es una herramienta de diseño y prototipado: permite crear wireframes, mockups y flujos navegables antes de programar nada, validando ideas con el usuario."
  },
  {
    "id": 4,
    "unit": "U1·S1",
    "q": "¿Qué editor se recomienda para desarrollo web con recarga en caliente?",
    "options": [
      "NetBeans",
      "Eclipse",
      "IntelliJ IDEA",
      "VS Code con Live Server"
    ],
    "correct": 3,
    "explanation": "VS Code + Live Server recarga el navegador automáticamente al guardar cambios. NetBeans, Eclipse e IntelliJ están más orientados a Java/backend."
  },
  {
    "id": 5,
    "unit": "U1·S1",
    "q": "Una herramienta interna sin conexión que requiere acceso a archivos del sistema operativo, ¿qué tecnología es más adecuada?",
    "options": [
      "Figma en modo offline",
      "JavaFX con FXML",
      "React como PWA",
      "HTML + CSS + JS en navegador"
    ],
    "correct": 1,
    "explanation": "Una app interna offline con acceso al sistema operativo encaja con escritorio nativo: JavaFX + FXML. Las opciones web están limitadas por el sandbox del navegador."
  },
  {
    "id": 6,
    "unit": "U1·S2",
    "q": "¿Cómo se maneja el evento clic en un botón en JavaFX?",
    "options": [
      "handleEvent()",
      "onClick()",
      "setOnAction()",
      "addEventListener('click')"
    ],
    "correct": 2,
    "explanation": "En JavaFX el manejador de eventos del botón se asigna con setOnAction(e -> ...). onClick/addEventListener son del mundo web, handleEvent() no existe en JavaFX."
  },
  {
    "id": 7,
    "unit": "U1·S2",
    "q": "¿Qué etiqueta HTML representa un botón que dispara acciones?",
    "options": [
      "<input type='submit'>",
      "<div role='button'>",
      "<a>",
      "<button>"
    ],
    "correct": 3,
    "explanation": "<button> es el elemento semántico nativo para acciones. <input type='submit'> sirve dentro de formularios; <a> son enlaces; <div role='button'> es un parche con ARIA."
  },
  {
    "id": 8,
    "unit": "U1·S2",
    "q": "¿Cuál es la función principal de los formularios en una interfaz?",
    "options": [
      "Recoger y validar datos del usuario",
      "Ejecutar scripts del servidor",
      "Definir la estructura visual",
      "Organizar la navegación"
    ],
    "correct": 0,
    "explanation": "Los formularios sirven para que el usuario introduzca datos y el sistema los valide antes de procesarlos. La estructura visual la define el resto del HTML/CSS."
  },
  {
    "id": 9,
    "unit": "U1·S2",
    "q": "En JavaFX, ¿qué control se usa para introducir texto de una línea?",
    "options": [
      "TextField",
      "InputBox",
      "Label",
      "TextArea"
    ],
    "correct": 0,
    "explanation": "TextField es el control de JavaFX para una sola línea de texto. TextArea es para varias líneas, Label es solo lectura y InputBox no existe."
  },
  {
    "id": 10,
    "unit": "U1·S2",
    "q": "¿Qué elemento HTML organiza las rutas de navegación principales de un sitio?",
    "options": [
      "<nav>",
      "<header>",
      "<aside>",
      "<section>"
    ],
    "correct": 0,
    "explanation": "<nav> es el elemento semántico que agrupa los enlaces de navegación principales. Mejora la accesibilidad y el SEO frente a un <div> genérico."
  },
  {
    "id": 11,
    "unit": "U2·S3",
    "q": "¿Qué caracteriza a una interfaz declarativa?",
    "options": [
      "Usa código imperativo para crear cada componente",
      "Solo funciona en aplicaciones web",
      "Requiere JavaScript para funcionar",
      "Describe qué se muestra, no cómo construirlo paso a paso"
    ],
    "correct": 3,
    "explanation": "Una interfaz declarativa describe QUÉ se ve (estructura final) y el motor se encarga del CÓMO. FXML, HTML y JSX son ejemplos. La opuesta es la imperativa (Swing clásico)."
  },
  {
    "id": 12,
    "unit": "U2·S3",
    "q": "¿Qué herramienta permite construir interfaces FXML arrastrando componentes sin escribir código?",
    "options": [
      "Scene Builder",
      "Figma",
      "IntelliJ IDEA",
      "NetBeans Designer"
    ],
    "correct": 0,
    "explanation": "Scene Builder es la herramienta visual oficial de JavaFX: arrastras componentes y genera el FXML automáticamente, sin escribir XML a mano."
  },
  {
    "id": 13,
    "unit": "U2·S3",
    "q": "¿Cuál es el principal beneficio de separar la estructura visual de la lógica del programa?",
    "options": [
      "Aumenta el rendimiento de la aplicación",
      "Elimina la necesidad de CSS",
      "Facilita el trabajo paralelo entre diseñadores y desarrolladores",
      "Reduce el tamaño del archivo final"
    ],
    "correct": 2,
    "explanation": "Separar vista (FXML/HTML) y lógica (Java/JS) permite que diseñadores y desarrolladores trabajen en paralelo sobre los mismos archivos sin pisarse."
  },
  {
    "id": 14,
    "unit": "U2·S3",
    "q": "HTML y FXML son lenguajes de...",
    "options": [
      "Programación orientada a objetos",
      "Descripción estructural",
      "Scripting del lado servidor",
      "Compilación nativa"
    ],
    "correct": 1,
    "explanation": "HTML y FXML no programan: describen la ESTRUCTURA de la interfaz mediante etiquetas. La lógica va en JavaScript o Java por separado."
  },
  {
    "id": 15,
    "unit": "U2·S3",
    "q": "En FXML, ¿dónde se implementa la lógica de un botón?",
    "options": [
      "En el archivo CSS",
      "En el archivo manifest",
      "En el propio archivo FXML",
      "En el controlador Java con @FXML"
    ],
    "correct": 3,
    "explanation": "La lógica de un botón FXML se escribe en el controlador Java: un método anotado con @FXML referenciado desde el FXML con onAction=\"#metodo\"."
  },
  {
    "id": 16,
    "unit": "U2·S4",
    "q": "¿Qué selector CSS aplica estilo solo a los párrafos dentro de un div?",
    "options": [
      ".div-p",
      "div p",
      "p.div",
      "p > div"
    ],
    "correct": 1,
    "explanation": "El selector descendiente 'div p' selecciona cualquier <p> dentro de un <div>, sin importar la profundidad. 'p > div' sería un <p> hijo directo de un <div> (al revés)."
  },
  {
    "id": 17,
    "unit": "U2·S4",
    "q": "¿Cuál es el orden correcto de precedencia en CSS?",
    "options": [
      "Clase > ID > Inline > Elemento",
      "Defecto > Elemento > Clase > ID",
      "Inline > ID > Clase > Elemento > Defecto",
      "Elemento > Clase > ID > Inline"
    ],
    "correct": 2,
    "explanation": "La cascada en CSS: !important > inline (style=\"...\") > ID (#x) > clase/atributo/pseudoclase > elemento > regla por defecto. A mayor especificidad, más prioridad."
  },
  {
    "id": 18,
    "unit": "U2·S4",
    "q": "Un contenedor flex en dirección row no centra verticalmente sus elementos. ¿Qué propiedad falta?",
    "options": [
      "align-items: center",
      "justify-content: center",
      "align-content: center",
      "flex-direction: column"
    ],
    "correct": 0,
    "explanation": "En flex con dirección row, align-items controla el eje vertical (cross axis). justify-content controla el horizontal. Para centrar verticalmente: align-items: center."
  },
  {
    "id": 19,
    "unit": "U2·S4",
    "q": "¿Qué media query aplica estilos cuando la pantalla es de 768px o menos?",
    "options": [
      "@media (min-width: 768px)",
      "@media (max-width: 768px)",
      "@media screen 768",
      "@media (width: 768px)"
    ],
    "correct": 1,
    "explanation": "@media (max-width: 768px) aplica cuando el ancho de pantalla es igual o menor a 768px. min-width sería al revés (≥768px)."
  },
  {
    "id": 20,
    "unit": "U2·S4",
    "q": "Un contenedor flex con justify-content: space-between muestra los elementos agrupados a la izquierda. ¿Causa más probable?",
    "options": [
      "El contenedor tiene solo el ancho de sus hijos",
      "Falta align-items",
      "Falta flex-wrap",
      "space-between solo funciona en columnas"
    ],
    "correct": 0,
    "explanation": "space-between distribuye los hijos en TODO el ancho disponible del contenedor. Si el contenedor es solo tan ancho como sus hijos, no hay espacio que distribuir."
  },
  {
    "id": 21,
    "unit": "U2·S4",
    "q": "¿Qué directiva CSS sobrescribe cualquier otra regla, aunque se recomienda usarla con moderación?",
    "options": [
      "inherit",
      "initial",
      "!important",
      "!override"
    ],
    "correct": 2,
    "explanation": "!important sobrescribe la cascada normal, incluso reglas inline. Es un último recurso porque rompe la lógica de especificidad y complica el mantenimiento."
  },
  {
    "id": 22,
    "unit": "U3·S5",
    "q": "¿Qué tres dimensiones define la norma ISO 9241-11 para medir la usabilidad?",
    "options": [
      "Eficacia, eficiencia y satisfacción",
      "Usabilidad, rendimiento y estabilidad",
      "Velocidad, precisión y confort",
      "Diseño, funcionalidad y accesibilidad"
    ],
    "correct": 0,
    "explanation": "ISO 9241-11 define usabilidad como Eficacia (cumplir el objetivo), Eficiencia (con cuánto esfuerzo) y Satisfacción (cómo se siente el usuario)."
  },
  {
    "id": 23,
    "unit": "U3·S5",
    "q": "Una aplicación muestra 'Error 404' sin más explicación. ¿Qué heurística de Nielsen incumple principalmente?",
    "options": [
      "Reconocer, diagnosticar y recuperar errores",
      "Prevención de errores",
      "Visibilidad del estado del sistema",
      "Consistencia y estándares"
    ],
    "correct": 0,
    "explanation": "Mostrar 'Error 404' sin contexto rompe la heurística 'Ayudar a reconocer, diagnosticar y recuperarse de errores': debe explicar qué pasó y cómo seguir."
  },
  {
    "id": 24,
    "unit": "U3·S5",
    "q": "¿Qué heurística de Nielsen indica que la interfaz debe eliminar información irrelevante?",
    "options": [
      "Ayuda y documentación",
      "Diseño estético y minimalista",
      "Control y libertad del usuario",
      "Flexibilidad y eficiencia"
    ],
    "correct": 1,
    "explanation": "La heurística de diseño estético y minimalista pide eliminar la información innecesaria que compite con la relevante y reduce su visibilidad."
  },
  {
    "id": 25,
    "unit": "U3·S5",
    "q": "¿Qué principio de Nielsen establece que el usuario siempre debe poder deshacer acciones?",
    "options": [
      "Control y libertad del usuario",
      "Prevención de errores",
      "Reconocimiento antes que recuerdo",
      "Consistencia y estándares"
    ],
    "correct": 0,
    "explanation": "Control y libertad: el usuario debe poder revertir acciones (undo, cancelar, salir) sin sentirse atrapado, ofreciendo una 'salida de emergencia' clara."
  },
  {
    "id": 26,
    "unit": "U3·S5",
    "q": "¿Para qué sirve Figma en el contexto del diseño UX?",
    "options": [
      "Compilar código front-end",
      "Gestionar incidencias del proyecto",
      "Crear flujos de navegación, prototipos y validar con usuarios",
      "Generar documentación técnica automáticamente"
    ],
    "correct": 2,
    "explanation": "Figma cubre todo el ciclo UX previo al código: wireframes, prototipos navegables y validación con usuarios mediante tests sobre el prototipo."
  },
  {
    "id": 27,
    "unit": "U3·S5",
    "q": "Una interfaz obliga al usuario a memorizar los pasos del proceso. ¿Qué heurística incumple?",
    "options": [
      "Diseño minimalista",
      "Reconocimiento antes que recuerdo",
      "Visibilidad del estado del sistema",
      "Correspondencia con el mundo real"
    ],
    "correct": 1,
    "explanation": "Reconocimiento antes que recuerdo: la interfaz debe mostrar opciones y datos visibles para que el usuario no tenga que memorizar pasos previos."
  },
  {
    "id": 28,
    "unit": "U3·S6",
    "q": "¿Qué significan las siglas WCAG?",
    "options": [
      "Web Code Accessibility Group",
      "World Content Accessibility Guide",
      "Web Content Accessibility Guidelines",
      "Web Compatibility and Accessibility Goals"
    ],
    "correct": 2,
    "explanation": "WCAG = Web Content Accessibility Guidelines, el estándar internacional del W3C para accesibilidad web."
  },
  {
    "id": 29,
    "unit": "U3·S6",
    "q": "¿Qué principio POUR garantiza que el contenido funcione con lectores de pantalla y teclado?",
    "options": [
      "Robusto",
      "Comprensible",
      "Perceptible",
      "Operable"
    ],
    "correct": 3,
    "explanation": "Operable significa que la interfaz se puede manejar (teclado, lector de pantalla, gestos). Los otros 3 principios POUR son Perceptible, Comprensible (Understandable) y Robusto."
  },
  {
    "id": 30,
    "unit": "U3·S6",
    "q": "¿Qué nivel WCAG exige la normativa europea (RD 1112/2018) para sitios públicos?",
    "options": [
      "AA",
      "A",
      "AAA",
      "WCAG 1.0"
    ],
    "correct": 0,
    "explanation": "El RD 1112/2018 (que traspone la Directiva UE 2016/2102) exige nivel AA de WCAG 2.1 para sitios y apps del sector público en España."
  },
  {
    "id": 31,
    "unit": "U3·S6",
    "q": "¿Qué indica alt=\"\" en una imagen HTML?",
    "options": [
      "Mejora el posicionamiento SEO",
      "Error de HTML que debe corregirse",
      "Imagen decorativa que los lectores de pantalla deben ignorar",
      "Imagen sin descripción por descuido"
    ],
    "correct": 2,
    "explanation": "alt=\"\" indica explícitamente que la imagen es DECORATIVA: los lectores de pantalla la ignoran. Distinto de omitir el alt, que es un error."
  },
  {
    "id": 32,
    "unit": "U3·S6",
    "q": "¿Qué contraste mínimo exige WCAG AA para texto normal sobre fondo?",
    "options": [
      "2:1",
      "4.5:1",
      "3:1",
      "7:1"
    ],
    "correct": 1,
    "explanation": "WCAG AA exige 4.5:1 para texto normal y 3:1 para texto grande (≥18pt o ≥14pt en negrita). AAA sube a 7:1 / 4.5:1."
  },
  {
    "id": 33,
    "unit": "U3·S6",
    "q": "¿Qué atributo ARIA describe la función de un elemento cuando el texto visible no es suficiente?",
    "options": [
      "aria-hidden",
      "aria-role",
      "aria-label",
      "aria-live"
    ],
    "correct": 2,
    "explanation": "aria-label proporciona una etiqueta accesible cuando el contenido visible no es claro (por ejemplo un botón con solo un icono)."
  },
  {
    "id": 34,
    "unit": "U3·S6",
    "q": "Un texto grande (≥18px) sobre fondo blanco tiene contraste 3:1. Según WCAG AA, ¿es válido?",
    "options": [
      "Solo si el texto es bold",
      "No, siempre se requiere 4.5:1",
      "Sí, para texto grande el mínimo es 3:1",
      "Depende del color de fondo"
    ],
    "correct": 2,
    "explanation": "Para texto grande (≥18px normal o ≥14px bold) WCAG AA permite 3:1; la regla de 4.5:1 solo aplica a texto normal."
  },
  {
    "id": 35,
    "unit": "U3·S6",
    "q": "¿Qué herramienta detecta automáticamente problemas de accesibilidad en Chrome DevTools?",
    "options": [
      "AXE DevTools",
      "Lighthouse",
      "NVDA",
      "WAVE"
    ],
    "correct": 1,
    "explanation": "Lighthouse viene integrado en Chrome DevTools y audita rendimiento, accesibilidad, SEO y buenas prácticas en un clic."
  },
  {
    "id": 36,
    "unit": "U4·S7",
    "q": "En Figma, ¿qué elemento permite modificar globalmente el color de todos los botones de una aplicación?",
    "options": [
      "Frame",
      "Auto Layout",
      "Component",
      "Color Style"
    ],
    "correct": 3,
    "explanation": "Los Color Styles de Figma son tokens reutilizables: cambias el estilo y se actualizan todos los elementos que lo usan en el documento."
  },
  {
    "id": 37,
    "unit": "U4·S7",
    "q": "¿Cuál es la forma más eficiente de cambiar el color primario en toda una aplicación en Figma?",
    "options": [
      "Crear un nuevo style y sustituir uno a uno",
      "Exportar y reimportar los estilos",
      "Cambiar manualmente cada elemento",
      "Editar el Color Style existente"
    ],
    "correct": 3,
    "explanation": "Editar el Color Style existente propaga el cambio a todos los elementos que lo aplican. Crear uno nuevo o cambiar a mano es lento y propenso a errores."
  },
  {
    "id": 38,
    "unit": "U4·S7",
    "q": "¿Qué patrón de lectura visual siguen los usuarios en páginas con mucho texto?",
    "options": [
      "Patrón Z",
      "Patrón circular",
      "Patrón diagonal",
      "Patrón F"
    ],
    "correct": 3,
    "explanation": "El patrón F describe cómo los usuarios escanean páginas con mucho texto: leen las primeras líneas horizontalmente y luego bajan por la izquierda."
  },
  {
    "id": 39,
    "unit": "U4·S7",
    "q": "¿Qué principio de diseño visual indica que debe eliminarse todo elemento que no aporte información?",
    "options": [
      "Correspondencia",
      "Jerarquía visual",
      "Consistencia cromática",
      "Diseño minimalista"
    ],
    "correct": 3,
    "explanation": "El diseño minimalista (heurística de Nielsen y principio visual clásico) dice que todo elemento que no aporte información compite con el que sí, y debe eliminarse."
  },
  {
    "id": 40,
    "unit": "U4·S7",
    "q": "¿Qué herramienta se usa para verificar el contraste de color antes de implementar un diseño?",
    "options": [
      "Zeroheight",
      "Contrast Checker",
      "Figma Prototype",
      "Coolors"
    ],
    "correct": 1,
    "explanation": "Las herramientas de Contrast Checker (Stark, WebAIM Contrast Checker, etc.) calculan el ratio de contraste según WCAG antes de pasar al código."
  },
  {
    "id": 41,
    "unit": "U4·S8",
    "q": "En Figma, ¿qué ocurre con las instancias de un Component cuando se modifica el Main Component?",
    "options": [
      "Solo las instancias nuevas se actualizan",
      "Se bloquean hasta aceptar cambios manualmente",
      "Todas las instancias se actualizan automáticamente",
      "Ninguna instancia se actualiza"
    ],
    "correct": 2,
    "explanation": "El Main Component es la fuente de verdad: al editarlo, todas sus instancias heredan automáticamente los cambios, salvo las propiedades ya sobrescritas localmente."
  },
  {
    "id": 42,
    "unit": "U4·S8",
    "q": "¿Qué ventaja tienen las variantes en Figma frente a componentes separados?",
    "options": [
      "Gestión de estados (hover, activo, desactivado) sin duplicar componentes",
      "Permiten usar Auto Layout exclusivamente",
      "Menor peso del archivo Figma",
      "Mejora el rendimiento de exportación"
    ],
    "correct": 0,
    "explanation": "Las variants agrupan estados (default/hover/disabled, tamaños, etc.) en un único componente con propiedades booleanas o enum, en vez de N componentes separados."
  },
  {
    "id": 43,
    "unit": "U4·S8",
    "q": "En Auto Layout de Figma, ¿qué hace 'Hug contents'?",
    "options": [
      "El frame se ajusta al tamaño de su contenido",
      "El frame tiene tamaño fijo",
      "El frame ocupa todo el espacio del padre",
      "El frame se oculta si el contenido desborda"
    ],
    "correct": 0,
    "explanation": "Hug contents hace que el frame se ENCOJA al tamaño de su contenido. Fill ocupa todo el padre y Fixed mantiene un tamaño fijo independiente del contenido."
  },
  {
    "id": 44,
    "unit": "U4·S8",
    "q": "En Auto Layout con gap definido, se añade un nuevo elemento. ¿Qué ocurre?",
    "options": [
      "El elemento se oculta automáticamente",
      "Se redistribuye manteniendo el espaciado definido",
      "Se solapa con el elemento anterior",
      "Se rompe el layout"
    ],
    "correct": 1,
    "explanation": "Auto Layout reorganiza automáticamente los hijos respetando el gap definido: al añadir un elemento se redistribuyen sin solapamientos."
  },
  {
    "id": 45,
    "unit": "U4·S8",
    "q": "¿Cuál es el objetivo principal del prototipado en Figma?",
    "options": [
      "Automatizar pruebas de accesibilidad",
      "Validar flujos e interacciones antes de escribir código",
      "Generar código HTML directamente",
      "Gestionar el versionado del diseño"
    ],
    "correct": 1,
    "explanation": "El prototipado sirve para validar flujos e interacciones con usuarios antes de invertir en código, detectando problemas cuando arreglarlos cuesta poco."
  },
  {
    "id": 46,
    "unit": "U5·S9",
    "q": "¿Qué tipo de informe permite al usuario definir filtros por fecha o categoría y se genera en tiempo real?",
    "options": [
      "Informe estructurado o estático",
      "Dashboard visual",
      "Informe de incidencias",
      "Informe dinámico o parametrizable"
    ],
    "correct": 3,
    "explanation": "Un informe dinámico se genera bajo demanda con filtros (fechas, categorías…) sobre los datos actuales. El estático se compila una vez con datos fijos."
  },
  {
    "id": 47,
    "unit": "U5·S9",
    "q": "¿Cuál es la diferencia clave entre un dashboard y un informe dinámico?",
    "options": [
      "Son equivalentes funcionalmente",
      "El dashboard es visual e interactivo; el informe se genera bajo demanda con filtros",
      "El informe siempre se exporta en PDF",
      "El dashboard solo funciona en tiempo real"
    ],
    "correct": 1,
    "explanation": "El dashboard es una vista visual e interactiva en tiempo real con KPIs. El informe se genera bajo demanda, normalmente exportable, con filtros parametrizables."
  },
  {
    "id": 48,
    "unit": "U5·S9",
    "q": "¿Cuándo debe crearse la documentación técnica de un proyecto?",
    "options": [
      "Solo al finalizar el proyecto",
      "De forma incremental durante el desarrollo, no al final",
      "Cuando el cliente la solicite",
      "Antes de empezar a programar"
    ],
    "correct": 1,
    "explanation": "La documentación se hace en paralelo al desarrollo: si se deja para el final, se olvidan detalles, se pierde contexto y suele acabar sin hacerse."
  },
  {
    "id": 49,
    "unit": "U5·S9",
    "q": "¿Qué herramienta se usa para generar documentación técnica como sitio web estático?",
    "options": [
      "JasperReports",
      "Confluence",
      "Power BI",
      "MkDocs o Sphinx"
    ],
    "correct": 3,
    "explanation": "MkDocs y Sphinx generan sitios web estáticos a partir de Markdown/RST. Confluence es wiki online, JasperReports son informes de datos y Power BI es BI."
  },
  {
    "id": 50,
    "unit": "U5·S9",
    "q": "¿Qué principio de visualización indica que deben eliminarse elementos que no aporten información?",
    "options": [
      "Contexto",
      "Jerarquía visual",
      "Consistencia",
      "Simplicidad"
    ],
    "correct": 3,
    "explanation": "El principio de simplicidad / minimalismo: cada elemento del gráfico debe aportar información; lo decorativo (chartjunk) confunde y resta legibilidad."
  },
  {
    "id": 51,
    "unit": "U5·S10",
    "q": "¿Qué formato de imagen es ideal para logos e iconos por ser vectorial y escalable?",
    "options": [
      "SVG",
      "PNG",
      "WebP",
      "JPG"
    ],
    "correct": 0,
    "explanation": "SVG es vectorial: escala a cualquier tamaño sin pérdida y suele pesar menos para logos e iconos. PNG/JPG/WebP son rasterizados."
  },
  {
    "id": 52,
    "unit": "U5·S10",
    "q": "¿Qué ventaja tiene WebP frente a JPG en entornos web modernos?",
    "options": [
      "Mayor compatibilidad con navegadores antiguos",
      "Mejor rendimiento en CPU",
      "Soporte exclusivo en dispositivos móviles",
      "Menor peso con calidad similar o mejor"
    ],
    "correct": 3,
    "explanation": "WebP ofrece la misma calidad visual que JPG con menos peso (≈25-35% menos), reduciendo tiempo de carga. Soporte universal en navegadores modernos."
  },
  {
    "id": 53,
    "unit": "U5·S10",
    "q": "¿Qué técnica permite que los elementos multimedia se descarguen solo cuando el usuario los necesita?",
    "options": [
      "Compresión gzip",
      "Lazy loading",
      "Caché del navegador",
      "Minificación"
    ],
    "correct": 1,
    "explanation": "Lazy loading aplaza la descarga de imágenes/iframes hasta que están a punto de entrar en pantalla, ahorrando ancho de banda y mejorando el tiempo de carga inicial."
  },
  {
    "id": 54,
    "unit": "U5·S10",
    "q": "¿Qué licencia permite usar, modificar y redistribuir contenido sin restricciones?",
    "options": [
      "Creative Commons BY-NC",
      "CC0 (dominio público)",
      "Copyright",
      "Licencia comercial"
    ],
    "correct": 1,
    "explanation": "CC0 renuncia a todos los derechos: cualquiera puede usar, modificar y redistribuir el contenido para cualquier fin, incluso comercial, sin atribución."
  },
  {
    "id": 55,
    "unit": "U5·S10",
    "q": "Un desarrollador usa una imagen de internet sin revisar su licencia. ¿Cuál es el riesgo real?",
    "options": [
      "Solo aplica en uso comercial masivo",
      "Ninguno si no tiene marca de agua visible",
      "Posible infracción de derechos de autor con sanciones legales",
      "Solo afecta al posicionamiento SEO"
    ],
    "correct": 2,
    "explanation": "Usar una imagen sin verificar su licencia puede ser una infracción de copyright con consecuencias legales reales (cartas de cese, multas, retirada del contenido)."
  },
  {
    "id": 56,
    "unit": "U5·S10",
    "q": "¿Qué formato de audio ofrece alta compresión y es el estándar universal para la web?",
    "options": [
      "WAV",
      "OGG",
      "FLAC",
      "MP3"
    ],
    "correct": 3,
    "explanation": "MP3 es el estándar de audio comprimido más universal en la web por compatibilidad y buen ratio calidad/tamaño. WAV/FLAC son sin pérdida pero pesados."
  },
  {
    "id": 57,
    "unit": "U6·S11",
    "q": "¿Qué hace 'npm run build' antes de desplegar una aplicación web?",
    "options": [
      "Optimiza, empaqueta y minifica el código para producción",
      "Solo verifica compatibilidad con React",
      "Instala las dependencias del proyecto",
      "Mejora el SEO automáticamente"
    ],
    "correct": 0,
    "explanation": "npm run build minifica, agrupa y optimiza el código (tree shaking, hash de cachés…) para producción. Es el paso previo al despliegue."
  },
  {
    "id": 58,
    "unit": "U6·S11",
    "q": "¿Qué formato de empaquetado nativo se usa para distribuir en macOS?",
    "options": [
      ".snap o .AppImage",
      ".dmg o .pkg",
      ".exe o .msi",
      ".deb o .rpm"
    ],
    "correct": 1,
    "explanation": ".dmg (imagen de disco) y .pkg (instalador) son los formatos nativos de macOS. .exe/.msi son Windows; .deb/.rpm son Linux; .snap/.AppImage son universales Linux."
  },
  {
    "id": 59,
    "unit": "U6·S11",
    "q": "¿Qué ventaja ofrece Docker para el empaquetado de aplicaciones?",
    "options": [
      "Genera instaladores nativos para cada SO",
      "Encapsula la app con su entorno completo: misma imagen en dev y producción",
      "Solo sirve para aplicaciones backend",
      "Sustituye al sistema de control de versiones"
    ],
    "correct": 1,
    "explanation": "Docker encapsula la app con su entorno (dependencias, librerías, configuración) en una imagen que corre igual en dev, staging y producción: 'works on my machine' resuelto."
  },
  {
    "id": 60,
    "unit": "U6·S11",
    "q": "¿Cuáles son las fases del proceso de empaquetado profesional?",
    "options": [
      "Analizar → Desarrollar → Testear → Desplegar",
      "Preparar entorno → Compilar → Generar paquete → Probar/distribuir",
      "Diseñar → Codificar → Publicar → Mantener",
      "Instalar → Configurar → Ejecutar → Monitorizar"
    ],
    "correct": 1,
    "explanation": "El flujo profesional: preparar el entorno (limpio, reproducible), compilar, generar el paquete (instalador/imagen) y probarlo antes de distribuirlo."
  },
  {
    "id": 61,
    "unit": "U6·S12",
    "q": "¿Cuál es la función principal de la firma digital en software distribuido?",
    "options": [
      "Reducir el tamaño del instalador",
      "Activar la licencia de uso",
      "Evitar la ingeniería inversa del código",
      "Garantizar la autoría e integridad del software"
    ],
    "correct": 3,
    "explanation": "La firma digital garantiza dos cosas: AUTORÍA (proviene de quien dice) e INTEGRIDAD (nadie lo ha modificado desde que se firmó). Sistemas operativos la verifican al instalar."
  },
  {
    "id": 62,
    "unit": "U6·S12",
    "q": "¿Qué tipo de licencia de software permite ver, modificar y redistribuir el código fuente?",
    "options": [
      "Libre y de código abierto (FOSS): MIT, GPL, Apache",
      "Licencia dual o mixta",
      "Creative Commons BY-NC",
      "Propietaria o comercial"
    ],
    "correct": 0,
    "explanation": "Licencias FOSS (MIT, GPL, Apache…) permiten ver, modificar y redistribuir el código fuente. Las propietarias prohíben modificarlo o ver su fuente."
  },
  {
    "id": 63,
    "unit": "U6·S12",
    "q": "¿A través de qué canal se distribuye software verificado con actualizaciones automáticas integradas?",
    "options": [
      "Repositorios de código fuente como GitHub",
      "Distribución corporativa con MDM",
      "Tiendas oficiales (Google Play, Microsoft Store, App Store)",
      "Distribución directa desde web propia"
    ],
    "correct": 2,
    "explanation": "Las tiendas oficiales (Play Store, Microsoft Store, App Store) verifican el software, lo firman y gestionan actualizaciones automáticas en el dispositivo del usuario."
  },
  {
    "id": 64,
    "unit": "U7·S13",
    "q": "¿Qué tipo de prueba verifica el funcionamiento de una función o componente de forma aislada?",
    "options": [
      "Prueba de usabilidad",
      "Prueba de accesibilidad",
      "Prueba de integración",
      "Prueba unitaria"
    ],
    "correct": 3,
    "explanation": "Una prueba unitaria valida una función o componente AISLADO de sus dependencias (usando mocks). Verifica que esa unidad concreta hace lo que debe."
  },
  {
    "id": 65,
    "unit": "U7·S13",
    "q": "¿Qué herramienta se usa para pruebas unitarias en JavaScript?",
    "options": [
      "Postman",
      "Jest",
      "JUnit",
      "Cypress"
    ],
    "correct": 1,
    "explanation": "Jest es el framework estándar de pruebas unitarias en JavaScript (especialmente con React). JUnit es Java, Cypress hace E2E y Postman prueba APIs."
  },
  {
    "id": 66,
    "unit": "U7·S13",
    "q": "¿Qué prueba evalúa la facilidad de uso de la interfaz con usuarios reales?",
    "options": [
      "Prueba de regresión",
      "Prueba unitaria",
      "Prueba de integración",
      "Prueba de usabilidad"
    ],
    "correct": 3,
    "explanation": "Las pruebas de usabilidad observan a usuarios REALES interactuando con la interfaz para detectar fricciones que no aparecen en tests automáticos."
  },
  {
    "id": 67,
    "unit": "U7·S13",
    "q": "¿Qué porcentaje aproximado de problemas de accesibilidad detecta Lighthouse automáticamente?",
    "options": [
      "60%",
      "80%",
      "30–40%",
      "100%"
    ],
    "correct": 2,
    "explanation": "Lighthouse y otras herramientas automáticas detectan aproximadamente un 30-40% de los problemas de accesibilidad; el resto requiere revisión manual y tests con personas."
  },
  {
    "id": 68,
    "unit": "U7·S13",
    "q": "¿Qué métrica se usa en tests de usabilidad para medir la experiencia subjetiva del usuario?",
    "options": [
      "Lighthouse Score",
      "Core Web Vitals",
      "System Usability Scale (SUS)",
      "Net Promoter Score (NPS)"
    ],
    "correct": 2,
    "explanation": "SUS es un cuestionario estándar de 10 preguntas que da una puntuación 0-100 sobre la usabilidad percibida. Lighthouse mide rendimiento técnico, no experiencia subjetiva."
  },
  {
    "id": 69,
    "unit": "U7·S14",
    "q": "¿Cuál es la versión correcta según SemVer al corregir un fallo crítico en la v1.4.2 sin añadir funcionalidades?",
    "options": [
      "2.0.0",
      "1.4.2.1",
      "1.4.3",
      "1.5.0"
    ],
    "correct": 2,
    "explanation": "SemVer es MAJOR.MINOR.PATCH. Un fix sin nuevas funcionalidades incrementa el PATCH: 1.4.2 → 1.4.3. MINOR añade features compatibles, MAJOR rompe compatibilidad."
  },
  {
    "id": 70,
    "unit": "U7·S14",
    "q": "¿Qué fase de publicación precede a la versión final y solo se publica si no se detectan fallos importantes?",
    "options": [
      "Versión Beta",
      "Hotfix",
      "Versión Alpha",
      "Release Candidate (RC)"
    ],
    "correct": 3,
    "explanation": "La Release Candidate es la versión 'casi final' que se publica para validación; si no aparecen fallos importantes, se promueve a versión final."
  },
  {
    "id": 71,
    "unit": "U7·S14",
    "q": "¿Qué herramienta permite monitorizar errores en producción con contexto real del dispositivo?",
    "options": [
      "WAVE",
      "Maze",
      "Sentry",
      "Lighthouse"
    ],
    "correct": 2,
    "explanation": "Sentry captura errores de producción con stack trace, navegador, SO, usuario afectado y breadcrumbs, permitiendo reproducirlos sin depender del reporte manual."
  },
  {
    "id": 72,
    "unit": "U7·S14",
    "q": "¿Qué información debe incluir un registro de incidencia (bug report) bien documentado?",
    "options": [
      "El nombre del desarrollador que introdujo el bug",
      "Solo el mensaje de error y la fecha",
      "El número de usuarios afectados y la fecha de detección",
      "ID, descripción, pasos para reproducir, entorno, prioridad y responsable"
    ],
    "correct": 3,
    "explanation": "Un buen bug report incluye ID, descripción del problema, pasos para reproducir, entorno (versión, SO, navegador), prioridad/severidad y responsable asignado."
  },
  {
    "id": 73,
    "unit": "U7·S14",
    "q": "Un equipo lanza una beta con errores graves de flujo de usuario. ¿Qué mala práctica refleja?",
    "options": [
      "No usar control de versiones",
      "No documentar el código fuente",
      "No validar con usuarios antes de publicar la versión beta",
      "No registrar incidencias en Jira"
    ],
    "correct": 2,
    "explanation": "Publicar una beta con errores graves de flujo significa que no se validó con usuarios antes: la beta debe llegar tras pruebas internas, no como primer test."
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

function useQuestions() {
  const [questions] = useState(() => shuffle(QUESTIONS));
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
                  }}>{q.unit}</span>
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
          <div style={{ fontSize: 64, marginBottom: 16 }}>💻</div>
          <h1 style={{
            fontSize: 32, fontWeight: 900, color: "#FFFFFF",
            margin: "0 0 8px",
            background: "linear-gradient(135deg, #A78BFA, #6366F1)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>DIW · Test de Repaso</h1>
          <p style={{ color: "#94A3B8", fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
            {allQuestions.length} preguntas · Sin límite de tiempo<br />
            Cubre las 7 Unidades del temario
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
        }}>{q.unit}</div>

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

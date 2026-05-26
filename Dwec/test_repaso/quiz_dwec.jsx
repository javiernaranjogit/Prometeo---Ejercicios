const { useState } = React;

const QUESTIONS = [
  {
    "id": 1,
    "unit": "U1",
    "q": "¿Qué tecnología define la estructura semántica de una página web?",
    "options": [
      "CSS",
      "Node.js",
      "JavaScript",
      "HTML"
    ],
    "correct": 3,
    "explanation": "HTML define la estructura semántica del documento (qué es cada cosa: cabecera, párrafo, lista…). CSS estiliza, JS añade lógica y Node es un runtime."
  },
  {
    "id": 2,
    "unit": "U1",
    "q": "¿Cuál es el papel principal de JavaScript en una aplicación web?",
    "options": [
      "Añadir lógica e interactividad",
      "Aplicar estilos visuales",
      "Gestionar bases de datos",
      "Definir la estructura del documento"
    ],
    "correct": 0,
    "explanation": "JavaScript es el lenguaje de la interactividad en el cliente: maneja eventos, manipula el DOM y comunica con el servidor. La estructura es HTML y los estilos CSS."
  },
  {
    "id": 3,
    "unit": "U1",
    "q": "¿Qué perfil profesional se especializa en interfaz, accesibilidad y Core Web Vitals?",
    "options": [
      "Backend",
      "Frontend",
      "DBA",
      "DevOps"
    ],
    "correct": 1,
    "explanation": "El perfil Frontend se especializa en la interfaz: HTML/CSS/JS, accesibilidad (WCAG) y rendimiento en el navegador (Core Web Vitals). Backend es servidor; DBA bases de datos; DevOps infraestructura."
  },
  {
    "id": 4,
    "unit": "U1",
    "q": "¿Qué perfil combina desarrollo cliente y servidor de extremo a extremo?",
    "options": [
      "Sysadmin",
      "Frontend",
      "Fullstack",
      "Backend"
    ],
    "correct": 2,
    "explanation": "Un fullstack toca cliente y servidor de extremo a extremo: frontend, API, base de datos y despliegue. Frontend y backend cubren solo una parte."
  },
  {
    "id": 5,
    "unit": "U1",
    "q": "¿Qué significa WCAG?",
    "options": [
      "Web Content Accessibility Guidelines",
      "Wide CSS And Grid",
      "Web Code And Globals",
      "Web Component API Guide"
    ],
    "correct": 0,
    "explanation": "WCAG = Web Content Accessibility Guidelines, el estándar internacional de accesibilidad web del W3C (niveles A, AA, AAA)."
  },
  {
    "id": 6,
    "unit": "U1",
    "q": "¿Para qué sirve principalmente Node.js en el desarrollo frontend?",
    "options": [
      "Desplegar aplicaciones en producción",
      "Gestionar bases de datos",
      "Renderizar HTML en el servidor",
      "Ejecutar tooling: builds, linters, servidores de desarrollo"
    ],
    "correct": 3,
    "explanation": "Node.js en frontend se usa como runtime para herramientas (Vite, ESLint, Prettier, bundlers, dev server). No es donde corre tu app web final."
  },
  {
    "id": 7,
    "unit": "U1",
    "q": "¿Qué hace Husky en un proyecto JavaScript?",
    "options": [
      "Instala dependencias npm",
      "Gestiona ramas de Git",
      "Genera el build de producción",
      "Ejecuta hooks de Git (lints antes de cada commit)"
    ],
    "correct": 3,
    "explanation": "Husky engancha scripts a los hooks de Git (pre-commit, pre-push…), por ejemplo para ejecutar lint o tests antes de cada commit y evitar subir código roto."
  },
  {
    "id": 8,
    "unit": "U1",
    "q": "¿Qué comando de Vite arranca el servidor de desarrollo?",
    "options": [
      "npm start",
      "npm build",
      "npm serve",
      "npm run dev"
    ],
    "correct": 3,
    "explanation": "Vite arranca el servidor de desarrollo con `npm run dev`. `build` genera el bundle de producción y `preview` lo sirve localmente."
  },
  {
    "id": 9,
    "unit": "U1",
    "q": "¿Qué son los Core Web Vitals?",
    "options": [
      "Estándares de seguridad HTTP",
      "Métricas de rendimiento web (LCP, CLS, INP)",
      "Reglas de accesibilidad WCAG",
      "Extensiones de VS Code"
    ],
    "correct": 1,
    "explanation": "Core Web Vitals son las métricas de UX de Google: LCP (carga del contenido principal), CLS (estabilidad visual) e INP (responsividad). Determinan SEO y experiencia."
  },
  {
    "id": 10,
    "unit": "U1",
    "q": "¿Qué hace Git frente a un error grave en el código?",
    "options": [
      "Reinicia el servidor de desarrollo",
      "Formatea el código",
      "Elimina el código erróneo automáticamente",
      "Permite volver a un commit estable anterior"
    ],
    "correct": 3,
    "explanation": "Git versiona el código: ante un error grave puedes hacer `git revert` o `git checkout` a un commit anterior estable y recuperar el estado funcional."
  },
  {
    "id": 11,
    "unit": "U2",
    "q": "¿Cuál es la diferencia clave entre 'let' y 'const'?",
    "options": [
      "'let' es más rápido que 'const'",
      "'let' no tiene ámbito de bloque",
      "'const' solo funciona en funciones",
      "'const' no permite reasignación del valor"
    ],
    "correct": 3,
    "explanation": "`const` impide reasignar la referencia (el binding). `let` sí permite reasignar. Ambos tienen ámbito de bloque, a diferencia de `var`."
  },
  {
    "id": 12,
    "unit": "U2",
    "q": "¿Por qué se recomienda evitar 'var'?",
    "options": [
      "Por problemas de ámbito (function scope) y hoisting",
      "Porque no funciona en ES6",
      "Porque es más lento que let",
      "Porque no admite reasignación"
    ],
    "correct": 0,
    "explanation": "`var` tiene ámbito de función (no de bloque) y sufre hoisting: la declaración 'sube' al inicio. Esto produce bugs sutiles que `let`/`const` evitan."
  },
  {
    "id": 13,
    "unit": "U2",
    "q": "¿Qué operador se debe usar para comparación estricta en JavaScript?",
    "options": [
      "===",
      "!==",
      "=",
      "=="
    ],
    "correct": 0,
    "explanation": "`===` compara valor Y tipo sin coerción. `==` hace coerción de tipos y provoca comparaciones inesperadas (p. ej. `0 == false` es true)."
  },
  {
    "id": 14,
    "unit": "U2",
    "q": "¿Qué devuelve '2' === 2 en JavaScript?",
    "options": [
      "NaN",
      "false (tipos distintos)",
      "undefined",
      "true"
    ],
    "correct": 1,
    "explanation": "`===` no convierte tipos: string '2' y number 2 son distintos, por lo que devuelve false. Con `==` sí daría true."
  },
  {
    "id": 15,
    "unit": "U2",
    "q": "¿Qué estructura de control usar cuando hay múltiples casos con valor fijo?",
    "options": [
      "while",
      "switch",
      "for",
      "if/else"
    ],
    "correct": 1,
    "explanation": "`switch` es la estructura idiomática cuando comparas una variable contra valores fijos discretos. Es más legible que un encadenado de if/else iguales."
  },
  {
    "id": 16,
    "unit": "U2",
    "q": "¿Qué método de array transforma cada elemento y devuelve un nuevo array?",
    "options": [
      "reduce()",
      "forEach()",
      "map()",
      "filter()"
    ],
    "correct": 2,
    "explanation": "`map()` aplica una función a cada elemento y devuelve un nuevo array con los resultados. `forEach` no devuelve nada, `filter` filtra y `reduce` agrega."
  },
  {
    "id": 17,
    "unit": "U2",
    "q": "¿Qué método de array filtra elementos según una condición?",
    "options": [
      "slice()",
      "map()",
      "find()",
      "filter()"
    ],
    "correct": 3,
    "explanation": "`filter()` devuelve un nuevo array con los elementos que cumplen la condición del callback. `find` devuelve solo el primer match."
  },
  {
    "id": 18,
    "unit": "U2",
    "q": "¿Qué devuelve 'document.querySelectorAll()'?",
    "options": [
      "Un HTMLCollection",
      "El primer elemento coincidente",
      "Un array",
      "Un NodeList"
    ],
    "correct": 3,
    "explanation": "`querySelectorAll` devuelve un NodeList (estático). `getElementsByTagName` devuelve un HTMLCollection (en vivo). NodeList se itera con forEach."
  },
  {
    "id": 19,
    "unit": "U2",
    "q": "¿Qué ventaja tienen las funciones flecha respecto a las tradicionales?",
    "options": [
      "Se declaran con function",
      "Son más rápidas",
      "Admiten más parámetros",
      "No crean su propio 'this'"
    ],
    "correct": 3,
    "explanation": "Las funciones flecha no tienen su propio `this`: lo heredan del contexto donde se definieron. Útil dentro de callbacks para evitar perder el `this` del componente."
  },
  {
    "id": 20,
    "unit": "U2",
    "q": "¿Qué hace 'event.preventDefault()'?",
    "options": [
      "Evita el comportamiento por defecto del evento",
      "Detiene la propagación",
      "Elimina el evento",
      "Ejecuta el evento manualmente"
    ],
    "correct": 0,
    "explanation": "`event.preventDefault()` cancela la acción por defecto del navegador (enviar formulario, seguir enlace…). `stopPropagation` detiene el burbujeo."
  },
  {
    "id": 21,
    "unit": "U3",
    "q": "¿Qué método es más seguro para insertar texto en el DOM?",
    "options": [
      "eval",
      "document.write",
      "textContent",
      "innerHTML"
    ],
    "correct": 2,
    "explanation": "`textContent` inserta texto plano y escapa el contenido, por lo que evita XSS. `innerHTML` interpreta HTML y permite inyecciones si los datos no están saneados."
  },
  {
    "id": 22,
    "unit": "U3",
    "q": "¿Qué hace 'classList.toggle()'?",
    "options": [
      "Siempre elimina la clase",
      "Siempre añade la clase",
      "Comprueba si la clase existe",
      "Añade la clase si no existe, la elimina si existe"
    ],
    "correct": 3,
    "explanation": "`classList.toggle(clase)` alterna: si la clase está, la quita; si no está, la añade. Perfecto para botones de mostrar/ocultar."
  },
  {
    "id": 23,
    "unit": "U3",
    "q": "¿Qué hace 'appendChild()'?",
    "options": [
      "Sustituye un nodo existente",
      "Inserta un nodo al final del padre",
      "Inserta un nodo al inicio",
      "Elimina un nodo hijo"
    ],
    "correct": 1,
    "explanation": "`appendChild(nodo)` inserta el nodo como último hijo del elemento. Si el nodo ya está en el DOM, lo mueve allí (no lo duplica)."
  },
  {
    "id": 24,
    "unit": "U3",
    "q": "¿Qué garantiza el objeto Set en JavaScript?",
    "options": [
      "Serialización automática",
      "Claves de cualquier tipo",
      "Valores únicos sin duplicados",
      "Orden de inserción por clave"
    ],
    "correct": 2,
    "explanation": "Un `Set` almacena valores únicos: si añades un duplicado se ignora. Mantiene el orden de inserción."
  },
  {
    "id": 25,
    "unit": "U3",
    "q": "¿Qué ventaja principal tiene Map sobre un objeto literal?",
    "options": [
      "Permite claves de cualquier tipo (no solo strings)",
      "Ocupa menos memoria",
      "Es más rápido siempre",
      "Convierte a JSON automáticamente"
    ],
    "correct": 0,
    "explanation": "Un `Map` admite claves de cualquier tipo (objetos, funciones, números…) y preserva el orden. En un objeto literal las claves se convierten a string."
  },
  {
    "id": 26,
    "unit": "U3",
    "q": "¿Qué hace JSON.stringify()?",
    "options": [
      "Convierte JSON a objeto",
      "Convierte un objeto en una cadena JSON",
      "Comprime el JSON",
      "Valida la sintaxis JSON"
    ],
    "correct": 1,
    "explanation": "`JSON.stringify(obj)` serializa un objeto JavaScript a cadena JSON para enviarla por red o guardarla. `JSON.parse` hace lo contrario."
  },
  {
    "id": 27,
    "unit": "U3",
    "q": "¿Cómo eliminar duplicados de un array con Set?",
    "options": [
      "[...new Set(array)]",
      "array.filter(unique)",
      "array.unique()",
      "Set.from(array)"
    ],
    "correct": 0,
    "explanation": "`[...new Set(array)]` crea un Set (que elimina duplicados) y luego lo expande de nuevo a array. Es el idioma más conciso de ES6."
  },
  {
    "id": 28,
    "unit": "U3",
    "q": "¿Qué evento captura el envío de un formulario?",
    "options": [
      "click",
      "submit",
      "input",
      "change"
    ],
    "correct": 1,
    "explanation": "El evento `submit` se dispara en el formulario al enviarlo. Es el sitio correcto para validar y llamar a `event.preventDefault()` si necesitas evitar el envío."
  },
  {
    "id": 29,
    "unit": "U3",
    "q": "¿Qué hook de React se usa para gestionar el valor de un input controlado?",
    "options": [
      "useRef",
      "useEffect",
      "useContext",
      "useState"
    ],
    "correct": 3,
    "explanation": "`useState` mantiene el valor del input en el estado del componente. Cambias el valor con `onChange` y lo enlazas con la prop `value`: input controlado."
  },
  {
    "id": 30,
    "unit": "U3",
    "q": "¿La validación del cliente reemplaza la validación del servidor?",
    "options": [
      "Solo en aplicaciones React",
      "Sí, si es suficientemente robusta",
      "No, el servidor siempre debe volver a validar",
      "Solo con HTTPS"
    ],
    "correct": 2,
    "explanation": "La validación del cliente es solo UX (feedback rápido). Cualquiera puede saltársela editando el HTML o llamando a la API directamente, así que el servidor SIEMPRE debe revalidar."
  },
  {
    "id": 31,
    "unit": "U4",
    "q": "¿Para qué sirve Yup en React?",
    "options": [
      "Enrutamiento de páginas",
      "Gestión de estado global",
      "Sanitización de HTML",
      "Validación declarativa de formularios mediante esquemas"
    ],
    "correct": 3,
    "explanation": "Yup permite definir esquemas declarativos (`yup.object({email: yup.string().email().required()})`) y se integra con react-hook-form o Formik para validar formularios."
  },
  {
    "id": 32,
    "unit": "U4",
    "q": "¿Qué método crea un nuevo nodo HTML vacío?",
    "options": [
      "document.querySelector()",
      "document.appendChild()",
      "document.createNode()",
      "document.createElement()"
    ],
    "correct": 3,
    "explanation": "`document.createElement('div')` crea un nodo vacío en memoria. Luego lo configuras (textContent, classList…) y lo insertas con appendChild."
  },
  {
    "id": 33,
    "unit": "U4",
    "q": "¿Qué diferencia hay entre DOM real y Virtual DOM?",
    "options": [
      "El Virtual DOM reemplaza al DOM real",
      "No hay diferencia funcional",
      "El Virtual DOM es una capa intermedia que minimiza actualizaciones en el DOM real",
      "El DOM real es más eficiente"
    ],
    "correct": 2,
    "explanation": "El Virtual DOM (React) es una representación en memoria del DOM real. Compara dos versiones (diffing) y aplica al DOM solo los cambios mínimos, mejorando rendimiento."
  },
  {
    "id": 34,
    "unit": "U4",
    "q": "¿Qué hace 'element.remove()'?",
    "options": [
      "Mueve el elemento al final",
      "Limpia el contenido del elemento",
      "Elimina el elemento del árbol DOM",
      "Oculta el elemento"
    ],
    "correct": 2,
    "explanation": "`element.remove()` elimina el elemento de su padre y del árbol DOM. Equivale a `parent.removeChild(element)` pero más conciso."
  },
  {
    "id": 35,
    "unit": "U4",
    "q": "¿Por qué es mejor createElement() que innerHTML al insertar datos de usuario?",
    "options": [
      "No necesita selector CSS",
      "Es más seguro, evita inyecciones XSS",
      "Es más rápido",
      "Genera código más corto"
    ],
    "correct": 1,
    "explanation": "Insertar HTML con `innerHTML` ejecuta cualquier `<script>` o `onerror=...` que venga en los datos: vector clásico de XSS. Crear nodos y usar textContent es seguro."
  },
  {
    "id": 36,
    "unit": "U4",
    "q": "¿Dónde se puede usar 'await'?",
    "options": [
      "Solo en funciones declaradas como async",
      "Solo en el ámbito global",
      "Solo en funciones flecha",
      "En cualquier función"
    ],
    "correct": 0,
    "explanation": "`await` solo es válido dentro de una función `async` (o en top-level de un módulo ES). Fuera de ese contexto es error de sintaxis."
  },
  {
    "id": 37,
    "unit": "U4",
    "q": "¿Qué hace 'async/await' respecto a las promesas?",
    "options": [
      "Convierte código síncrono en asíncrono",
      "Reemplaza try/catch",
      "Elimina las promesas",
      "Proporciona sintaxis más legible, pero sigue usando promesas internamente"
    ],
    "correct": 3,
    "explanation": "`async/await` es azúcar sintáctico sobre promesas: el código parece síncrono pero internamente sigue trabajando con `Promise`. `try/catch` reemplaza a `.catch()`."
  },
  {
    "id": 38,
    "unit": "U4",
    "q": "¿Qué problema genera el 'callback hell'?",
    "options": [
      "Incompatibilidad con ES6",
      "Pérdida de rendimiento",
      "Errores de sintaxis frecuentes",
      "Funciones anidadas difíciles de leer y mantener"
    ],
    "correct": 3,
    "explanation": "Callback hell es la anidación de callbacks asíncronos (pirámide de la perdición). Hace el código difícil de leer, probar y manejar errores. Promesas/async lo evitan."
  },
  {
    "id": 39,
    "unit": "U4",
    "q": "¿Qué hace Promise.all()?",
    "options": [
      "Convierte callbacks en promesas",
      "Ejecuta promesas en secuencia",
      "Cancela promesas pendientes",
      "Ejecuta promesas en paralelo y espera a que todas resuelvan"
    ],
    "correct": 3,
    "explanation": "`Promise.all([p1,p2,p3])` ejecuta las promesas en paralelo y devuelve una promesa que resuelve cuando todas resuelven (o rechaza si una falla)."
  },
  {
    "id": 40,
    "unit": "U4",
    "q": "¿Qué sintaxis usa ES6 para exportar funciones de un módulo?",
    "options": [
      "public function nombre() {}",
      "module.exports = nombre",
      "export function nombre() {}",
      "exports.nombre = nombre"
    ],
    "correct": 2,
    "explanation": "`export function nombre() {}` es la sintaxis de módulos ES6 estándar. `module.exports`/`exports.x` es CommonJS (Node antiguo)."
  },
  {
    "id": 41,
    "unit": "U5",
    "q": "¿Qué método HTTP se usa para crear un nuevo recurso?",
    "options": [
      "GET",
      "DELETE",
      "POST",
      "PUT"
    ],
    "correct": 2,
    "explanation": "POST crea un nuevo recurso. GET lee, PUT/PATCH actualizan y DELETE borra. Es la convención REST."
  },
  {
    "id": 42,
    "unit": "U5",
    "q": "¿Qué devuelve fetch() ante un error HTTP como 404 o 500?",
    "options": [
      "Una promesa rechazada",
      "Una promesa resuelta (res.ok = false)",
      "Un error directo",
      "null"
    ],
    "correct": 1,
    "explanation": "fetch SOLO rechaza ante fallos de red; un 404 o 500 es respuesta válida con `res.ok=false`. Por eso hay que comprobar `res.ok` manualmente antes de procesar."
  },
  {
    "id": 43,
    "unit": "U5",
    "q": "¿Cuándo es false 'res.ok' en fetch?",
    "options": [
      "Cuando el JSON falla",
      "Cuando no hay red",
      "Cuando el status es 2xx",
      "Cuando el status HTTP es 4xx o 5xx"
    ],
    "correct": 3,
    "explanation": "`res.ok` es true si el status está en el rango 200-299. 4xx (cliente) y 5xx (servidor) ponen `res.ok` a false aunque la promesa resuelva."
  },
  {
    "id": 44,
    "unit": "U5",
    "q": "¿Qué hook de React se usa para cargar datos al montar un componente?",
    "options": [
      "useState",
      "useEffect",
      "useRef",
      "useCallback"
    ],
    "correct": 1,
    "explanation": "`useEffect(() => { fetch(...) }, [])` ejecuta una sola vez al montar (array de dependencias vacío). Es el patrón estándar para cargar datos iniciales."
  },
  {
    "id": 45,
    "unit": "U5",
    "q": "¿Qué hace JSON Server?",
    "options": [
      "Simula una API REST completa a partir de un archivo JSON",
      "Convierte XML a JSON",
      "Optimiza peticiones HTTP",
      "Crea un backend real en Node.js"
    ],
    "correct": 0,
    "explanation": "JSON Server lee un `db.json` y monta automáticamente una API REST falsa (GET/POST/PUT/DELETE). Ideal para prototipos antes de tener backend real."
  },
  {
    "id": 46,
    "unit": "U5",
    "q": "¿Cuál es la ventaja principal de apiService.js?",
    "options": [
      "Centraliza las llamadas a la API, facilitando mantenimiento",
      "Mejora el rendimiento de las peticiones",
      "Genera mocks automáticamente",
      "Evita usar async/await"
    ],
    "correct": 0,
    "explanation": "Tener un `apiService.js` único centraliza endpoints, headers, manejo de errores y autenticación. Si cambia la URL base solo lo tocas en un sitio."
  },
  {
    "id": 47,
    "unit": "U5",
    "q": "¿Qué es MSW (Mock Service Worker)?",
    "options": [
      "Una alternativa a fetch",
      "Intercepta peticiones HTTP en el navegador para devolver respuestas simuladas",
      "Un servidor Node.js para mocks",
      "Un linter para APIs"
    ],
    "correct": 1,
    "explanation": "MSW (Mock Service Worker) intercepta `fetch`/XHR a nivel de Service Worker en el navegador (o Node) y devuelve respuestas mock. No hace falta cambiar el código de tu app."
  },
  {
    "id": 48,
    "unit": "U5",
    "q": "¿Dónde se guardan las variables de entorno en React con Vite?",
    "options": [
      "En src/config.js",
      "En el archivo index.html",
      "En un archivo .env con prefijo VITE_",
      "En package.json"
    ],
    "correct": 2,
    "explanation": "Vite expone variables del archivo `.env` SOLO si llevan el prefijo `VITE_`. Se acceden como `import.meta.env.VITE_API_URL`."
  },
  {
    "id": 49,
    "unit": "U5",
    "q": "¿Qué es XML?",
    "options": [
      "Lenguaje de programación",
      "Formato de estilos",
      "Lenguaje de marcado extensible para intercambio estructurado de datos",
      "API de JavaScript"
    ],
    "correct": 2,
    "explanation": "XML (eXtensible Markup Language) es un formato de marcado para intercambiar datos estructurados. Es muy verboso pero estricto y autodescriptivo."
  },
  {
    "id": 50,
    "unit": "U5",
    "q": "¿Qué API de JavaScript convierte texto XML en un objeto DOM?",
    "options": [
      "DOMParser",
      "XMLReader",
      "JSONParser",
      "fetchXML"
    ],
    "correct": 0,
    "explanation": "`new DOMParser().parseFromString(xml, 'application/xml')` devuelve un documento DOM sobre el que puedes usar querySelector como con HTML."
  },
  {
    "id": 51,
    "unit": "U6",
    "q": "¿Cuál es la diferencia principal entre XML y JSON?",
    "options": [
      "XML usa etiquetas verbosas; JSON usa pares clave-valor más ligeros",
      "JSON es más pesado",
      "XML es más rápido",
      "JSON no es jerárquico"
    ],
    "correct": 0,
    "explanation": "XML usa etiquetas de apertura/cierre y atributos, muy verboso. JSON usa pares clave-valor entre llaves, más ligero y nativo en JavaScript."
  },
  {
    "id": 52,
    "unit": "U6",
    "q": "¿En qué sectores sigue siendo relevante XML hoy?",
    "options": [
      "Ninguno, está obsoleto",
      "Banca, administración pública, facturación electrónica, telecomunicaciones",
      "Solo en sistemas educativos",
      "Solo en videojuegos"
    ],
    "correct": 1,
    "explanation": "XML sigue siendo el estándar en banca (ISO 20022), administración pública, facturación electrónica (Factura-e, SII), telecomunicaciones, salud (HL7) y SOAP."
  },
  {
    "id": 53,
    "unit": "U6",
    "q": "¿Qué es XSS (Cross-Site Scripting)?",
    "options": [
      "Una librería de validación",
      "Ataque de inyección de código JavaScript malicioso en la página",
      "Un protocolo de seguridad",
      "Un framework CSS"
    ],
    "correct": 1,
    "explanation": "XSS = Cross-Site Scripting: inyectar JS malicioso en una página vulnerable (a través de un comentario, URL, etc.) que se ejecuta en el navegador de otros usuarios."
  },
  {
    "id": 54,
    "unit": "U6",
    "q": "¿Dónde NO se deben guardar tokens de autenticación?",
    "options": [
      "sessionStorage cifrado",
      "localStorage en texto plano",
      "Cookies HTTPOnly",
      "Memoria de la aplicación"
    ],
    "correct": 1,
    "explanation": "localStorage en texto plano es accesible por cualquier script de la página: ante un XSS roban el token. Mejor cookies HttpOnly o memoria."
  },
  {
    "id": 55,
    "unit": "U6",
    "q": "¿Qué librería limpia HTML dinámico para evitar XSS?",
    "options": [
      "Validator.js",
      "Yup",
      "DOMPurify",
      "crypto-js"
    ],
    "correct": 2,
    "explanation": "DOMPurify sanea HTML eliminando scripts, on-handlers y otros vectores XSS, dejando solo etiquetas/atributos permitidos. Se usa cuando NECESITAS renderizar HTML del usuario."
  },
  {
    "id": 56,
    "unit": "U6",
    "q": "¿Qué práctica segura aplica React automáticamente?",
    "options": [
      "Escapar el contenido al renderizar (evita XSS básico)",
      "Validar formularios",
      "Cifrar localStorage",
      "Bloquear cookies"
    ],
    "correct": 0,
    "explanation": "React escapa por defecto el contenido interpolado con `{}`, por lo que no se interpreta como HTML. Solo `dangerouslySetInnerHTML` rompe esa protección."
  },
  {
    "id": 57,
    "unit": "U6",
    "q": "¿Qué significa CI/CD?",
    "options": [
      "Component Integration / Component Deployment",
      "Code Integration / Code Delivery",
      "Continuous Integration / Continuous Deployment",
      "Client Design / Client Deploy"
    ],
    "correct": 2,
    "explanation": "CI/CD = Continuous Integration / Continuous Deployment: integrar cambios constantemente con tests automáticos y desplegar de forma automatizada."
  },
  {
    "id": 58,
    "unit": "U6",
    "q": "¿Qué comando genera la versión optimizada de producción en React?",
    "options": [
      "npm deploy",
      "npm run build",
      "npm start",
      "npm dev"
    ],
    "correct": 1,
    "explanation": "`npm run build` ejecuta el script `build` definido en package.json (en Vite/React genera el bundle optimizado en `/dist`). `npm start` arranca dev server."
  },
  {
    "id": 59,
    "unit": "U6",
    "q": "¿Qué es Vercel?",
    "options": [
      "Una librería de componentes",
      "Plataforma de despliegue especializada en proyectos JavaScript/React",
      "Un CDN de imágenes",
      "Un IDE de desarrollo"
    ],
    "correct": 1,
    "explanation": "Vercel es una plataforma de hosting orientada a frontend (Next.js, React, Vue…): conectas un repo de GitHub y cada push se despliega automáticamente."
  },
  {
    "id": 60,
    "unit": "U6",
    "q": "¿Qué hace GitHub Actions en un pipeline CI/CD?",
    "options": [
      "Genera documentación",
      "Revisa código manualmente",
      "Ejecuta workflows automáticos (tests, build, deploy) al hacer push",
      "Gestiona ramas de Git"
    ],
    "correct": 2,
    "explanation": "GitHub Actions ejecuta workflows YAML cuando ocurre un evento (push, PR, schedule). Típicamente corre lint + tests + build + deploy en cada push."
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
          <div style={{ fontSize: 64, marginBottom: 16 }}>⚙️</div>
          <h1 style={{
            fontSize: 32, fontWeight: 900, color: "#FFFFFF",
            margin: "0 0 8px",
            background: "linear-gradient(135deg, #A78BFA, #6366F1)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>DWEC · Test de Repaso</h1>
          <p style={{ color: "#94A3B8", fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
            {allQuestions.length} preguntas · Sin límite de tiempo<br />
            Cubre las 6 Unidades del temario · U1-U6
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

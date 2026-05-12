// ============================================================
// S12 - Lectura de XML con DOMParser
// ============================================================
// Este archivo muestra 3 formas progresivas de leer un XML:
//   1) cargarBiblioteca()  -> recorrido directo del DOM XML
//   2) cargarBiblioteca2() -> convertir XML a array de objetos JS
//   3) inicial() + filtrar() -> versión final con filtros por género
// ============================================================


// ------------------------------------------------------------
// VERSIÓN 1: leer el XML y pintarlo recorriendo nodos del DOM
// ------------------------------------------------------------
async function cargarBiblioteca() {
    // Pedimos el archivo XML como si fuera cualquier recurso (texto plano)
    const res = await fetch('biblioteca.xml');
    const texto = await res.text();

    // DOMParser convierte la cadena de texto en un documento XML navegable
    const parser = new DOMParser();
    const xml = parser.parseFromString(texto, 'application/xml');


    // Mostrar en consola para comprobar que el XML se ha parseado bien
    const nodos = xml.getElementsByTagName('libro'); // HTMLCollection de <libro>
    console.log(nodos);
    console.log(nodos.length);

    // Recorremos cada <libro> y extraemos su contenido
    const libros = Array.from(nodos); // pasamos a array para poder iterar cómodo
    let html = "";
    for (let i = 0; i < libros.length; i++) {
        const libro = libros[i];
        // Hijos del libro -> textContent saca el texto interno
        const titulo = libro.querySelector('titulo').textContent;
        const autor = libro.querySelector('autor').textContent;
        const anio = libro.querySelector('anio').textContent;
        // Atributo del propio <libro> -> getAttribute
        const genero = libro.getAttribute('genero');
        console.log(titulo);
        console.log(autor);
        console.log(anio);
        console.log(genero)
        // Construimos la tarjeta concatenando string (luego veremos template literals)
        html += '<div class="card"><h3>' + titulo + '</h3><p>' + autor + ' - ' + anio + ' - ' + genero + '</p></div>';
    }
    // Volcamos el HTML generado al div con id="lista"
    document.getElementById('lista').innerHTML = html;
}


// ------------------------------------------------------------
// Helper: convierte el documento XML en un array de objetos JS
// Esto es lo más cómodo: una vez transformado, trabajamos como si fuera JSON
// ------------------------------------------------------------
function xmlToArray(xmlDoc) {
    return Array.from(xmlDoc.getElementsByTagName('libro')).map(n => ({
        id: n.getAttribute('id'),
        genero: n.getAttribute('genero'),
        // Los atributos siempre son string -> comparamos para tener un boolean
        disponible: n.getAttribute('disponible') === 'true',
        titulo: n.querySelector('titulo').textContent,
        autor: n.querySelector('autor').textContent,
        // textContent también es string -> Number() para tener números reales
        anio: Number(n.querySelector('anio').textContent),
        paginas: Number(n.querySelector('paginas').textContent),
    }));
}


// ------------------------------------------------------------
// VERSIÓN 2: usar el helper xmlToArray y pintar con clase según disponibilidad
// ------------------------------------------------------------
async function cargarBiblioteca2() {
    const res = await fetch('biblioteca.xml');
    const texto = await res.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(texto, 'application/xml');

    // (Definida también dentro para que la función sea autocontenida en clase)
    function xmlToArray(xmlDoc) {
        return Array.from(xmlDoc.getElementsByTagName('libro')).map(n => ({
            id: n.getAttribute('id'),
            genero: n.getAttribute('genero'),
            disponible: n.getAttribute('disponible') === 'true',
            titulo: n.querySelector('titulo').textContent,
            autor: n.querySelector('autor').textContent,
            anio: Number(n.querySelector('anio').textContent),
            paginas: Number(n.querySelector('paginas').textContent),
        }));
    }

    const libros = xmlToArray(xml);
    console.log(libros);

    let html = "";
    for (let i = 0; i < libros.length; i++) {
        const libro = libros[i];
        // Según el boolean disponible asignamos una clase u otra
        // (la clase se usa en style.css para el borde verde/rojo)
        let clase;
        if (libro.disponible) {
            clase = "disponible";
        } else {
            clase = "no-disponible";
        }
        html += '<div class="card ' + clase + '"><h3>' + libro.titulo + '</h3><p>' + libro.autor + ' - ' + libro.anio + ' - ' + libro.genero + '</p></div>';
    }
    document.getElementById('lista').innerHTML = html;
}


// ------------------------------------------------------------
// VERSIÓN 3 (FINAL): cargamos una vez y luego filtramos en memoria
// ------------------------------------------------------------

// Variable global donde guardamos TODOS los libros tras la carga inicial.
// Así no hay que volver a hacer fetch cada vez que el usuario filtra.
let todosLosLibros = [];

// Pinta en pantalla el array de libros que reciba
function mostrar(libros) {
    document.getElementById('lista').innerHTML = libros
        .map(l => '<div class="card"><h3>' + l.titulo + '</h3><p>' + l.autor + ' - ' + l.genero + '</p></div>')
        .join('');
}

// Se llama desde los botones del HTML (onclick="filtrar('ficcion')", etc.)
function filtrar(genero) {
    let filtrado;
    if (genero === 'todos') {
        filtrado = todosLosLibros;          // sin filtro -> todos
    } else {
        filtrado = todosLosLibros.filter(libro => libro.genero === genero);
    }
    mostrar(filtrado);
}

// Carga inicial al abrir la página: fetch -> parse -> array -> pintar
async function inicial() {
    const res = await fetch('biblioteca.xml');
    const xml = new DOMParser().parseFromString(await res.text(), 'application/xml');
    todosLosLibros = xmlToArray(xml); // guardamos en la global para futuros filtros
    mostrar(todosLosLibros);
}




// Ejecuciones de prueba de las dos primeras versiones (comentadas).
// Solo dejamos activa la versión final.
//cargarBiblioteca();
//cargarBiblioteca2();
inicial();

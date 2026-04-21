// ─────────────────────────────────────────────
// EJERCICIO 1 — Buscador de usuarios
// ─────────────────────────────────────────────
// Construir un buscador en consola que:
//
// 1. Cargue UNA sola vez todos los usuarios de la API
//      → https://jsonplaceholder.typicode.com/users
//    Guárdalos en una variable en memoria (no refetch por búsqueda).
//
// 2. mostrar(usuarios)
//    Imprima tabla: nombre | email | ciudad (address.city).
//    Incluir al final "Total: N".
//
// 3. buscar(texto)
//    Filtre en memoria por nombre (case-insensitive, contiene).
//
// 4. init()
//    Cargue los usuarios, los muestre, y programe dos búsquedas con
//    setTimeout para demostrar el filtrado.
//
// Manejo de errores: si falla el fetch, mostrar el error y usar [].
// ─────────────────────────────────────────────

const URL_USERS = "https://jsonplaceholder.typicode.com/users";

async function obtenerUsuarios() {
    try {
        const res = await fetch(URL_USERS);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error("Error al cargar usuarios:", error.message);
        return [];
    }
}

let todosUsuarios = [];

function mostrar(usuarios) {
    console.log("\n--- USUARIOS ---");
    usuarios.forEach(({ name, email, address }) => {
        console.log(`${name} | ${email} | ${address.city}`);
    });
    console.log(`Total: ${usuarios.length}`);
}

function buscar(texto) {
    const t = texto.toLowerCase();
    const filtrados = todosUsuarios.filter(u => u.name.toLowerCase().includes(t));
    console.log(`\n> buscar("${texto}")`);
    mostrar(filtrados);
}

async function init() {
    todosUsuarios = await obtenerUsuarios();
    mostrar(todosUsuarios);

    setTimeout(() => buscar("Cle"), 2000);
    setTimeout(() => buscar("Le"), 3000);
    setTimeout(() => buscar("zzz"), 4000); // sin resultados
}

init();

// ─────────────────────────────────────────────
// LIVE CODING — Patrón fetch (GET, GET por ID, POST)
// ─────────────────────────────────────────────
// Primer contacto con APIs REST y fetch.
//
// 1. obtenerPosts()
//    - GET a https://jsonplaceholder.typicode.com/posts
//    - Imprime el total y los 3 primeros
//
// 2. obtenerPost(id)
//    - GET a /posts/:id
//    - Si res.ok es false → lanzar error con el status
//    - Probar con id=1 (ok) e id=999 (404)
//
// 3. crearPost(titulo, cuerpo)
//    - POST a /posts con headers Content-Type: application/json
//    - body serializado con JSON.stringify
//    - Imprime el recurso devuelto por el servidor
//
// Requisitos: async/await, try/catch, comprobar res.ok
// Ejecución: node api.js
// ─────────────────────────────────────────────

const API = "https://jsonplaceholder.typicode.com/posts";

async function obtenerPosts() {
    try {
        const res = await fetch(API);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const posts = await res.json();
        console.log("Total posts:", posts.length);
        console.log("Primeros 3:", posts.slice(0, 3));
        return posts;
    } catch (error) {
        console.error("Error obtenerPosts:", error.message);
        return [];
    }
}

async function obtenerPost(id) {
    try {
        const res = await fetch(`${API}/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const post = await res.json();
        console.log(`Post ${id}:`, post);
        return post;
    } catch (error) {
        console.error(`Error obtenerPost(${id}):`, error.message);
        return null;
    }
}

async function crearPost(titulo, cuerpo) {
    try {
        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: titulo, body: cuerpo, userId: 1 })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const nuevo = await res.json();
        console.log("Post creado:", nuevo);
        return nuevo;
    } catch (error) {
        console.error("Error crearPost:", error.message);
        return null;
    }
}

async function demo() {
    await obtenerPosts();
    await obtenerPost(1);
    await obtenerPost(999);
    await crearPost("Mi primer post", "Contenido del post");
}

demo();

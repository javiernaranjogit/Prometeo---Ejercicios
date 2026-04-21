// ─────────────────────────────────────────────
// EJERCICIO 4 — CRUD completo (GET, POST, PUT, DELETE)
// ─────────────────────────────────────────────
// Implementar el ciclo completo de operaciones sobre /posts:
//
//   GET    /posts?_limit=5   → listar
//   POST   /posts            → crear
//   PUT    /posts/:id        → actualizar
//   DELETE /posts/:id        → eliminar
//
// Funciones:
//
//   listarPosts()                       → lista los primeros 5
//   crearPost(titulo, cuerpo)           → crea y devuelve el nuevo
//   editarPost(id, titulo, cuerpo)      → actualiza y devuelve el editado
//   eliminarPost(id)                    → elimina (comprueba res.ok)
//
// POST y PUT requieren:
//   - headers: { "Content-Type": "application/json" }
//   - body: JSON.stringify(obj)
//
// GET y DELETE no requieren body ni headers.
//
// demo() debe: listar → crear → editar → eliminar → listar otra vez.
//
// Nota: JSONPlaceholder es fake, los cambios NO persisten.
// ─────────────────────────────────────────────

const API = "https://jsonplaceholder.typicode.com/posts";

async function listarPosts() {
    const res = await fetch(`${API}?_limit=5`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts = await res.json();
    console.log("\n--- LISTADO ---");
    posts.forEach(({ id, title }) => console.log(`  [${id}] ${title}`));
    return posts;
}

async function crearPost(titulo, cuerpo) {
    const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titulo, body: cuerpo, userId: 1 })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const nuevo = await res.json();
    console.log("\n[CREADO]:", nuevo);
    return nuevo;
}

async function editarPost(id, titulo, cuerpo) {
    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title: titulo, body: cuerpo, userId: 1 })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const editado = await res.json();
    console.log("\n[EDITADO]:", editado);
    return editado;
}

async function eliminarPost(id) {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (res.ok) console.log(`\n[ELIMINADO] post ${id}`);
    else console.log(`\n[ERROR] eliminando post ${id} (HTTP ${res.status})`);
    return res.ok;
}

async function demo() {
    try {
        await listarPosts();
        await crearPost("Nuevo post desde JS", "Contenido creado con fetch");
        await editarPost(1, "Título editado", "Contenido actualizado");
        await eliminarPost(1);
        await listarPosts();
    } catch (error) {
        console.error("Error en demo CRUD:", error.message);
    }
}

demo();

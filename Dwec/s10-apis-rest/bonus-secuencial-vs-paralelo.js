// ─────────────────────────────────────────────
// BONUS — Secuencial vs Paralelo con Promise.all
// ─────────────────────────────────────────────
// Extiende el Ejercicio 3 (perfil). Ahora queremos cargar el perfil
// de VARIOS usuarios a la vez y comparar dos estrategias:
//
//   A) Secuencial — await dentro de un for, uno detrás de otro
//   B) Paralelo   — Promise.all sobre un array de promesas
//
// Para cada estrategia medir el tiempo con Date.now() antes/después
// e imprimir el total.
//
// Ejemplo: para 5 usuarios, la secuencial tarda ~5× lo que tarda una
// petición; la paralela tarda ~1×. El ahorro depende de la latencia.
//
// Funciones:
//   cargarUsuario(id)           → GET /users/:id (devuelve {id, name})
//   cargarSecuencial(ids)       → for con await
//   cargarParalelo(ids)         → Promise.all
//   comparar(ids)               → ejecuta ambas y compara tiempos
//
// Regla: NUNCA uses paralelo si la segunda petición DEPENDE del
// resultado de la primera. Ahí el encadenamiento con await es obligatorio.
// ─────────────────────────────────────────────

const API = "https://jsonplaceholder.typicode.com/users";

async function cargarUsuario(id) {
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status} (id=${id})`);
    const { id: uid, name } = await res.json();
    return { id: uid, name };
}

async function cargarSecuencial(ids) {
    const inicio = Date.now();
    const usuarios = [];
    for (const id of ids) {
        const u = await cargarUsuario(id);
        usuarios.push(u);
    }
    const ms = Date.now() - inicio;
    console.log(`Secuencial: ${ms} ms →`, usuarios.map(u => u.name).join(", "));
    return { usuarios, ms };
}

async function cargarParalelo(ids) {
    const inicio = Date.now();
    const usuarios = await Promise.all(ids.map(cargarUsuario));
    const ms = Date.now() - inicio;
    console.log(`Paralelo:   ${ms} ms →`, usuarios.map(u => u.name).join(", "));
    return { usuarios, ms };
}

async function comparar(ids) {
    console.log(`\nCargando ${ids.length} usuarios (ids=${ids.join(",")})`);
    const a = await cargarSecuencial(ids);
    const b = await cargarParalelo(ids);
    const mejora = (a.ms / b.ms).toFixed(2);
    console.log(`Mejora: ~${mejora}× más rápido en paralelo`);
}

comparar([1, 2, 3, 4, 5]);

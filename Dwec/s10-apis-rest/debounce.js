// ─────────────────────────────────────────────
// EJERCICIO 5 — Debounce aplicado a un buscador
// ─────────────────────────────────────────────
// Sin debounce, cada pulsación del usuario dispararía una petición.
// Con debounce, solo se lanza la petición tras N ms de inactividad.
//
// 1. debounce(fn, delay)
//    - Devuelve una función que:
//      · Cancela el timer anterior (clearTimeout)
//      · Programa fn(...args) para ejecutarse tras `delay` ms
//
// 2. buscarAPI(termino)
//    - GET https://jsonplaceholder.typicode.com/users?q=<termino>
//    - Imprime el término buscado y el número de resultados
//
// 3. Simular tecleo rápido:
//    - Llamar tres veces a la versión debounced en <300ms
//    - Solo debe ejecutarse la última llamada
//
// Patrón real: buscador con autocompletar en un <input>.
// ─────────────────────────────────────────────

function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

async function buscarAPI(termino) {
    console.log(`> Buscando: "${termino}"`);
    try {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/users?q=${encodeURIComponent(termino)}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const datos = await res.json();
        console.log(`   Resultados: ${datos.length}`);
    } catch (error) {
        console.error("   Error:", error.message);
    }
}

const buscarConDebounce = debounce(buscarAPI, 300);

// Simula tecleo rápido (las dos primeras llamadas se cancelan)
buscarConDebounce("a");
buscarConDebounce("an");
buscarConDebounce("ana"); // esta sí se ejecuta 300ms después de la última tecla

// Segunda ráfaga pasados 1s (demuestra que debounce se reinicia)
setTimeout(() => {
    buscarConDebounce("L");
    buscarConDebounce("Le");
    buscarConDebounce("Leanne");
}, 1000);

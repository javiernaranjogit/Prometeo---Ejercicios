// ============================================================
// S13 - XSS (Cross-Site Scripting): demo de sanitización
// ============================================================
// Esta demo compara tres formas de pintar lo que escribe el usuario:
//   1) innerHTML directo  -> VULNERABLE a XSS
//   2) DOMPurify.sanitize -> permite HTML "seguro" (sin scripts/eventos)
//   3) textContent        -> nunca interpreta HTML (lo más seguro)
// ------------------------------------------------------------
// Probar con:  <img src=x onerror=alert('XSS')>
//   - En (1) se ejecuta el alert -> ataque XSS.
//   - En (2) DOMPurify elimina el atributo onerror.
//   - En (3) se ve el texto literal, sin interpretar nada.
// ============================================================

const inputField = document.getElementById('q');
const outVuln = document.getElementById('out-vuln');
const outSafe = document.getElementById('out-safe');
const outText = document.getElementById('out-text');

inputField.addEventListener('input', () => {
    const userInput = inputField.value;

    // 1) VULNERABLE: inyecta el HTML tal cual escribe el usuario
    outVuln.innerHTML = `<p>Buscaste: ${userInput}</p>`;

    // 2) SEGURO: DOMPurify limpia atributos/etiquetas peligrosas
    const limpio = DOMPurify.sanitize(userInput);
    outSafe.innerHTML = `<p>Buscaste: ${limpio}</p>`;

    // 3) SEGURO: textContent escapa todo, no se interpreta como HTML
    outText.textContent = `Buscaste: ${userInput}`;
});

console.log('Demo XSS cargada con DOMPurify');

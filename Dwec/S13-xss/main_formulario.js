// ============================================================
// S13 - Validación de formulario en el cliente
// ============================================================
// - Usamos las validaciones HTML5 (required, pattern, min, max...)
//   y las leemos desde JS con checkValidity() / validity.
// - Añadimos una validación extra de la LETRA del DNI que no se
//   puede expresar solo con un pattern.
// - Pintamos los errores con textContent (nunca innerHTML) para
//   evitar XSS si algún validationMessage contuviera HTML.
// ============================================================

const form = document.getElementById('registro');
const errores = document.getElementById('errores');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Limpiamos errores previos antes de revalidar
    errores.innerHTML = '';

    // checkValidity() comprueba TODAS las reglas HTML5 del formulario
    if (!form.checkValidity()) {
        for (const input of form.elements) {
            if (!input.validity.valid) {
                addError(`${input.name}: ${input.validationMessage}`);
            }
        }
        return;
    }

    // Si llega aquí, todos los campos pasan las reglas HTML5.
    // FormData + Object.fromEntries -> objeto { nombre, email, edad, dni }
    const data = Object.fromEntries(new FormData(form));

    // Validación extra: la letra del DNI debe coincidir con num % 23
    if (!letraDNIValida(data.dni)) {
        addError('DNI: Letra incorrecta');
        return;
    }

    enviar(data);
});

function addError(msg) {
    const li = document.createElement('li');
    li.textContent = msg; // textContent evita inyección de HTML
    errores.appendChild(li);
}

function enviar(data) {
    console.log('Formulario válido. Enviando...', data);
    // Aquí iría el fetch() real al backend
}

function letraDNIValida(dni) {
    // Tabla oficial de letras del DNI (orden definido por el Ministerio)
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';

    // 8 primeros dígitos -> número; el resto -> letra en mayúsculas
    const num = parseInt(dni.slice(0, 8), 10);
    const letra = dni.slice(8).toUpperCase();

    // La letra correcta es la que está en la posición (num % 23)
    return letras[num % 23] === letra;
}

console.log('Validación de formulario cargada');

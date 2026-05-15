// ===============================
// VARIABLES
// ===============================
const boton = document.getElementById("boton");
const texto = document.getElementById("texto");

// ===============================
// EVENTO CLICK
// ===============================
boton.addEventListener("click", function () {
    texto.innerHTML = "¡Has hecho clic en el botón!";
    texto.style.color = "blue";
});

// ===============================
// FUNCIÓN SIMPLE
// ===============================
function saludar(nombre) {
    alert("Hola " + nombre + " 👋");
}

// Llamar función
saludar("Carlos");

// ===============================
// CAMBIAR COLOR DEL FONDO
// ===============================
function cambiarColor() {
    const colores = ["#ff0000", "#00ff00", "#0000ff", "#ffff00"];
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];

    document.body.style.backgroundColor = colorAleatorio;
}

// ===============================
// RELOJ DIGITAL
// ===============================
function actualizarHora() {
    const reloj = document.getElementById("reloj");

    const ahora = new Date();

    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();

    // Agregar cero si es menor de 10
    horas = horas < 10 ? "0" + horas : horas;
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    reloj.innerHTML = `${horas}:${minutos}:${segundos}`;
}

// Actualizar reloj cada segundo
setInterval(actualizarHora, 1000);

// ===============================
// VALIDACIÓN DE FORMULARIO
// ===============================
function validarFormulario() {
    const nombre = document.getElementById("nombre").value;

    if (nombre === "") {
        alert("Por favor escribe tu nombre");
        return false;
    }

    alert("Formulario enviado correctamente");
    return true;
}

// ===============================
// ARRAY Y BUCLE
// ===============================
const frutas = ["Manzana", "Banana", "Naranja"];

frutas.forEach(function(fruta) {
    console.log("Fruta:", fruta);
});

// ===============================
// OBJETO
// ===============================
const persona = {
    nombre: "Juan",
    edad: 25,
    ciudad: "Madrid"
};

console.log(persona.nombre);

// ===============================
// FETCH API
// ===============================
fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => response.json())
    .then(data => {
        console.log("Datos recibidos:", data);
    })
    .catch(error => {
        console.log("Error:", error);
    });

// ===============================
// MODO OSCURO
// ===============================
function modoOscuro() {
    document.body.classList.toggle("dark-mode");
}

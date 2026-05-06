document.addEventListener("DOMContentLoaded", function() {

    const boton = document.getElementById("miBoton");
    const texto = document.getElementById("mensaje");

    boton.addEventListener("click", function() {
        texto.textContent = "¡Hiciste clic en el botón!";
        texto.style.color = "green";
    \});

\});$0
// 1. Buscamos los elementos del HTML por su ID
const boton = document.getElementById('miBoton');
const texto = document.getElementById('mensaje');

// 2. Le añadimos un "escuchador de eventos" para el clic
boton.addEventListener('click', function() {
    // 3. Modificamos el contenido del párrafo
    texto.innerText = "¡Felicidades! Has activado el código JavaScript.";
    
    // También podemos cambiar el CSS sobre la marcha
    texto.style.color = "green";
    texto.style.fontWeight = "bold";
});
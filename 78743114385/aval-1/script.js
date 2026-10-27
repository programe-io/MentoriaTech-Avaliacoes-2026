alert("Bem-vindo ao meu site! 😎");

const titulo = document.querySelector("h1");

titulo.addEventListener("click", function() {
    titulo.textContent = "Valeu por visitar meu site! 💙";
});

const texto = document.querySelector("p");

texto.addEventListener("click", function() {
    texto.style.color = "#00bfff";
});
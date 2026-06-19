// Mensagem quando abrir o site
window.onload = function () {
    alert("Bem-vindo ao meu blog!");
};

// Mudar cor do título ao clicar
const titulo = document.querySelector("header");

titulo.addEventListener("click", function () {

    if (titulo.style.background === "purple") {
        titulo.style.background = "#2196f3";
    } else {
        titulo.style.background = "purple";
    }

});
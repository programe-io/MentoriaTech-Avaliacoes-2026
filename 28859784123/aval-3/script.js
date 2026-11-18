
// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    alert("Olá! Seja bem-vindo à página pessoal do Heitor! 🚀");
});

// EFEITO DE DIGITAÇÃO
const titulo = document.querySelector("h1");

const mensagem = "Olá, eu sou Heitor!";
let indice = 0;

function escreverTexto() {
    if (indice < mensagem.length) {
        titulo.textContent += "";
        indice++;
        titulo.textContent = mensagem.substring(0, indice);
        setTimeout(escreverTexto, 100);
    }
}

// ANIMAÇÃO DE ENTRADA
window.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".container");

    container.style.opacity = "0";
    container.style.transform = "translateY(30px)";
    container.style.transition = "all 1s ease";

    setTimeout(function() {
        container.style.opacity = "1";
        container.style.transform = "translateY(0)";
    }, 200);
});

// MENSAGEM SOBRE OS SONHOS
function mostrarMensagem() {
    alert("Nunca desista dos seus sonhos, Heitor! Acredite nas suas conquistas! 🌎✈️");
}

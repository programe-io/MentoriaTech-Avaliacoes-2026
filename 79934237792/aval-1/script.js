// ======================================
// JAVASCRIPT - HOMEM-ARANHA 🕷️
// ======================================

// Frases do Homem-Aranha
const frases = [
    "Com grandes poderes vêm grandes responsabilidades!",
    "Qualquer um pode usar a máscara.",
    "Nunca desista de fazer o que é certo.",
    "Você precisa acreditar em si mesmo.",
    "Um herói ajuda as pessoas mesmo quando é difícil.",
    "Todo herói precisa continuar tentando."
];

// Seleciona os elementos do HTML
const botaoFrase = document.querySelector("button");
const frase = document.getElementById("frase");

// Mostrar uma frase aleatória
function mostrarFrase() {
    const numero = Math.floor(Math.random() * frases.length);

    frase.textContent = frases[numero];

    // Efeito visual
    frase.style.transform = "scale(1.1)";

    setTimeout(() => {
        frase.style.transform = "scale(1)";
    }, 200);
}


// ======================================
// SISTEMA DE MISSÕES
// ======================================

let missoes = 0;

const contador = document.getElementById("contador");

// Função para completar missão
function aumentarMissao() {

    missoes++;

    contador.textContent = missoes;

    // Animação do contador
    contador.style.transform = "scale(1.3)";

    setTimeout(() => {
        contador.style.transform = "scale(1)";
    }, 200);

    // Mensagens conforme o número de missões
    if (missoes === 1) {
        alert("🕷️ Primeira missão concluída!");
    }

    if (missoes === 5) {
        alert("🕸️ Parabéns! Você completou 5 missões!");
    }

    if (missoes === 10) {
        alert("🦸 Você se tornou um verdadeiro herói!");
    }
}


// ======================================
// EFEITO DE TEIA
// ======================================

document.addEventListener("click", function(event) {

    // Não criar efeito quando clicar nos botões
    if (event.target.tagName === "BUTTON") {
        return;
    }

    const teia = document.createElement("div");

    teia.textContent = "🕸️";

    teia.style.position = "fixed";
    teia.style.left = event.clientX + "px";
    teia.style.top = event.clientY + "px";
    teia.style.fontSize = "25px";
    teia.style.pointerEvents = "none";
    teia.style.zIndex = "999";
    teia.style.animation = "sumir 1s ease forwards";

    document.body.appendChild(teia);

    setTimeout(() => {
        teia.remove();
    }, 1000);
});


// ======================================
// MENSAGEM AO CARREGAR A PÁGINA
// ======================================

window.addEventListener("load", function() {

    console.log("🕷️ Site do Homem-Aranha carregado!");

});
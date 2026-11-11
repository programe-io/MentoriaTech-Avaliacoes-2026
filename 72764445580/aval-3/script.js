// Lógica do Jogo em JavaScript
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 10;

const inputPalpite = document.getElementById('palpiteInput');
const btnAdivinhar = document.getElementById('btnAdivinhar');
const mensagem = document.getElementById('mensagem');
const spanTentativas = document.getElementById('tentativasRestantes');
const btnReiniciar = document.getElementById('btnReiniciar');

// Permitir enviar pressionando a tecla "Enter"
inputPalpite.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        verificarPalpite();
    }
});

function verificarPalpite() {
    const palpite = Number(inputPalpite.value);

    // Validação de entrada
    if (!palpite || palpite < 1 || palpite > 100) {
        mensagem.style.color = "#ff4b5c";
        mensagem.textContent = "⚠️ Digite um número válido entre 1 e 100!";
        return;
    }

    tentativas--;
    spanTentativas.textContent = tentativas;

    if (palpite === numeroSecreto) {
        mensagem.style.color = "#38ef7d";
        mensagem.textContent = `🎉 Parabéns! Você acertou o número ${numeroSecreto}!`;
        fimDeJogo();
    } else if (tentativas === 0) {
        mensagem.style.color = "#ff4b5c";
        mensagem.textContent = `❌ Game Over! O número secreto era ${numeroSecreto}.`;
        fimDeJogo();
    } else if (palpite < numeroSecreto) {
        mensagem.style.color = "#00c6ff";
        mensagem.textContent = "📈 O número secreto é **MAIOR** que " + palpite + "!";
    } else {
        mensagem.style.color = "#ffaf7b";
        mensagem.textContent = "📉 O número secreto é **MENOR** que " + palpite + "!";
    }

    inputPalpite.value = "";
    inputPalpite.focus();
}

function fimDeJogo() {
    inputPalpite.disabled = true;
    btnAdivinhar.disabled = true;
    btnReiniciar.style.display = "block";
}

function reiniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativas = 10;
    spanTentativas.textContent = tentativas;
    mensagem.textContent = "";
    inputPalpite.disabled = false;
    btnAdivinhar.disabled = false;
    btnReiniciar.style.display = "none";
    inputPalpite.value = "";
    inputPalpite.focus();
}
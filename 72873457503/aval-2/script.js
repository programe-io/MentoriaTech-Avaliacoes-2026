
let numeroSecreto;
let tentativas = 0;
let jogoAtivo = true;

function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativas = 0;
    jogoAtivo = true;

    document.getElementById("numero").value = "";
    document.getElementById("mensagem").textContent = "Boa sorte!";
    document.getElementById("tentativas").textContent = "0";
}

function verificar() {
    if (!jogoAtivo) return;

    const palpite = Number(document.getElementById("numero").value);
    const mensagem = document.getElementById("mensagem");

    if (!Number.isInteger(palpite) || palpite < 1 || palpite > 100) {
        mensagem.textContent = "Digite um número de 1 a 100!";
        return;
    }

    tentativas++;

    document.getElementById("tentativas").textContent = tentativas;

    if (palpite === numeroSecreto) {
        mensagem.textContent = "🎉 Parabéns! Você acertou!";
        jogoAtivo = false;
    } else if (palpite < numeroSecreto) {
        mensagem.textContent = "⬆️ Tente um número MAIOR!";
    } else {
        mensagem.textContent = "⬇️ Tente um número MENOR!";
    }

    document.getElementById("numero").value = "";
}

function reiniciar() {
    iniciarJogo();
}

iniciarJogo();

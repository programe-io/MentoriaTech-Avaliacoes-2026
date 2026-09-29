let vidaJogador = 100;
let vidaInimigo = 100;
let jogoAtivo = true;

function atacar(tipo) {

    if (!jogoAtivo) {
        return;
    }

    let dano;

    if (tipo === "espada") {
        dano = Math.floor(Math.random() * 11) + 10;
    }

    if (tipo === "magia") {
        dano = Math.floor(Math.random() * 16) + 15;
    }

    if (tipo === "especial") {
        dano = Math.floor(Math.random() * 21) + 20;
    }

    vidaInimigo -= dano;

    if (vidaInimigo < 0) {
        vidaInimigo = 0;
    }

    atualizarTela();

    document.getElementById("mensagem").textContent =
        "Você causou " + dano + " de dano!";

    if (vidaInimigo <= 0) {
        jogoAtivo = false;

        document.getElementById("mensagem").textContent =
            "🏆 VOCÊ VENCEU A BATALHA! 🏆";

        return;
    }

    setTimeout(ataqueInimigo, 700);
}

function ataqueInimigo() {

    if (!jogoAtivo) {
        return;
    }

    let dano = Math.floor(Math.random() * 11) + 5;

    vidaJogador -= dano;

    if (vidaJogador < 0) {
        vidaJogador = 0;
    }

    atualizarTela();

    document.getElementById("mensagem").textContent =
        "O inimigo causou " + dano + " de dano!";

    if (vidaJogador <= 0) {
        jogoAtivo = false;

        document.getElementById("mensagem").textContent =
            "💀 VOCÊ PERDEU! 💀";
    }
}

function atualizarTela() {

    document.getElementById("textoVidaJogador").textContent =
        vidaJogador;

    document.getElementById("textoVidaInimigo").textContent =
        vidaInimigo;

    document.getElementById("vidaJogador").style.width =
        vidaJogador + "%";

    document.getElementById("vidaInimigo").style.width =
        vidaInimigo + "%";
}

function reiniciarJogo() {

    vidaJogador = 100;
    vidaInimigo = 100;
    jogoAtivo = true;

    document.getElementById("mensagem").textContent =
        "Escolha seu ataque!";

    atualizarTela();
}
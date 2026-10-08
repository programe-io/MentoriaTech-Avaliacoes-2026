let jogador = document.getElementById("jogador");
let moedas = document.getElementById("moedas");
let vidas = document.getElementById("vidas");

let posicaoX = 40;
let posicaoY = 100;

let totalMoedas = 0;
let totalVidas = 3;

function atualizarJogador() {
    jogador.style.left = posicaoX + "px";
    jogador.style.bottom = posicaoY + "px";
}

function esquerda() {

    posicaoX -= 20;

    if (posicaoX < 0) {
        posicaoX = 0;
    }

    atualizarJogador();
}

function direita() {

    posicaoX += 20;

    if (posicaoX > 850) {
        posicaoX = 850;
    }

    atualizarJogador();

    verificarMoedas();
    verificarChegada();
}

function pular() {

    let alturaInicial = posicaoY;

    posicaoY += 100;

    if (posicaoY > 400) {
        posicaoY = 400;
    }

    atualizarJogador();

    setTimeout(function() {

        posicaoY = alturaInicial;

        atualizarJogador();

        verificarObstaculo();

    }, 500);
}

function verificarMoedas() {

    if (posicaoX > 90 && posicaoX < 160 && posicaoY < 160) {

        totalMoedas++;

        moedas.textContent = totalMoedas;

        document.querySelector(".moeda1").style.display = "none";
    }

    if (posicaoX > 320 && posicaoX < 400 && posicaoY > 100) {

        totalMoedas++;

        moedas.textContent = totalMoedas;

        document.querySelector(".moeda2").style.display = "none";
    }

    if (posicaoX > 550 && posicaoX < 650 && posicaoY > 180) {

        totalMoedas++;

        moedas.textContent = totalMoedas;

        document.querySelector(".moeda3").style.display = "none";
    }
}

function verificarObstaculo() {

    if (posicaoX > 190 && posicaoX < 250) {

        perderVida();
    }

    if (posicaoX > 440 && posicaoX < 500) {

        perderVida();
    }
}

function perderVida() {

    totalVidas--;

    vidas.textContent = totalVidas;

    posicaoX = 40;
    posicaoY = 100;

    atualizarJogador();

    if (totalVidas <= 0) {

        alert("💀 Game Over!");

        reiniciar();
    }
}

function verificarChegada() {

    if (posicaoX > 800 && posicaoY > 250) {

        alert("🏆 Você venceu!");

        reiniciar();
    }
}

function reiniciar() {

    posicaoX = 40;
    posicaoY = 100;

    totalMoedas = 0;
    totalVidas = 3;

    moedas.textContent = totalMoedas;
    vidas.textContent = totalVidas;

    document.querySelector(".moeda1").style.display = "block";
    document.querySelector(".moeda2").style.display = "block";
    document.querySelector(".moeda3").style.display = "block";

    atualizarJogador();
}

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft" || event.key === "a") {
        esquerda();
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        direita();
    }

    if (event.key === "ArrowUp" || event.key === " " || event.key === "w") {
        pular();
    }

});

atualizarJogador();
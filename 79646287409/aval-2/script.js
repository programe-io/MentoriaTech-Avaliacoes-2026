
const carro = document.getElementById("carro");
const pista = document.querySelector(".pista");

let posicao = 105;
const velocidade = 30;

// MOVIMENTAR O CARRO
function mover(direcao) {
    const limite = pista.clientWidth - carro.offsetWidth;

    posicao += direcao * velocidade;

    // Impedir que o carro saia da pista
    if (posicao < 0) {
        posicao = 0;
    }

    if (posicao > limite) {
        posicao = limite;
    }

    carro.style.left = posicao + "px";
}

// REINICIAR O JOGO
function reiniciar() {
    posicao = (pista.clientWidth - carro.offsetWidth) / 2;
    carro.style.left = posicao + "px";
}

// CONTROLES DO TECLADO
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        mover(-1);
    }

    if (event.key === "ArrowRight") {
        mover(1);
    }
});

// POSIÇÃO INICIAL
reiniciar();

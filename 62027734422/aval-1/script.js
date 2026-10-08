let pontos = 0;

const quadrado = document.getElementById("quadrado");
const jogo = document.getElementById("jogo");
const placar = document.getElementById("pontos");

function moverQuadrado() {

    const larguraMaxima =
        jogo.clientWidth - quadrado.offsetWidth;

    const alturaMaxima =
        jogo.clientHeight - quadrado.offsetHeight;

    const x = Math.random() * larguraMaxima;
    const y = Math.random() * alturaMaxima;

    quadrado.style.left = x + "px";
    quadrado.style.top = y + "px";
}

quadrado.addEventListener("click", function() {

    pontos++;

    placar.textContent = pontos;

    moverQuadrado();
});

function iniciarJogo() {

    pontos = 0;

    placar.textContent = pontos;

    moverQuadrado();
}

moverQuadrado();
const jogo = document.getElementById("jogo");
const jogador = document.getElementById("jogador");

const pontosTexto = document.getElementById("pontos");
const vidasTexto = document.getElementById("vidas");

const gameOver = document.getElementById("gameOver");
const pontuacaoFinal = document.getElementById("pontuacaoFinal");

let jogadorX = 170;
let pontos = 0;
let vidas = 3;

let velocidade = 3;
let jogoAtivo = true;

// MOVIMENTO DO JOGADOR
document.addEventListener("keydown", function(event) {

if (!jogoAtivo) {
    return;
}

if (event.key === "ArrowLeft") {
    jogadorX -= 25;
}

if (event.key === "ArrowRight") {
    jogadorX += 25;
}

// Impede sair pela esquerda
if (jogadorX < 0) {
    jogadorX = 0;
}

// Impede sair pela direita
if (jogadorX > 340) {
    jogadorX = 340;
}

jogador.style.left = jogadorX + "px";

});

// CRIAR ESTRELA
function criarEstrela() {

if (!jogoAtivo) {
    return;
}

const estrela = document.createElement("div");

estrela.classList.add("estrela");
estrela.innerHTML = "⭐";

const posicaoX = Math.random() * 360;

estrela.style.left = posicaoX + "px";
estrela.style.top = "-40px";

jogo.appendChild(estrela);

let posicaoY = -40;

const queda = setInterval(function() {

    if (!jogoAtivo) {
        clearInterval(queda);
        estrela.remove();
        return;
    }

    posicaoY += velocidade;

    estrela.style.top = posicaoY + "px";


    // POSIÇÃO DA ESTRELA
    const estrelaX = estrela.offsetLeft;
    const estrelaY = estrela.offsetTop;


    // POSIÇÃO DO JOGADOR
    const jogadorY = jogador.offsetTop;


    // VERIFICAR SE PEGOU A ESTRELA
    if (
        estrelaY + 30 >= jogadorY &&
        estrelaY <= jogadorY + 60 &&
        estrelaX + 30 >= jogadorX &&
        estrelaX <= jogadorX + 60
    ) {

        pontos++;

        pontosTexto.textContent = pontos;

        estrela.remove();

        clearInterval(queda);


        // AUMENTAR A DIFICULDADE
        if (pontos % 10 === 0) {
            velocidade++;
        }

        return;
    }


    // ESTRELA CHEGOU AO CHÃO
    if (posicaoY > 600) {

        vidas--;

        vidasTexto.textContent = vidas;

        estrela.remove();

        clearInterval(queda);


        // FIM DO JOGO
        if (vidas <= 0) {
            finalizarJogo();
        }
    }

}, 20);

}

// FINALIZAR JOGO
function finalizarJogo() {

jogoAtivo = false;

pontuacaoFinal.textContent = pontos;

gameOver.style.display = "flex";

}

// REINICIAR
function reiniciar() {

pontos = 0;
vidas = 3;

velocidade = 3;

jogadorX = 170;

jogoAtivo = true;


pontosTexto.textContent = pontos;
vidasTexto.textContent = vidas;

jogador.style.left = jogadorX + "px";

gameOver.style.display = "none";

}

// CRIAR UMA ESTRELA A CADA 1 SEGUNDO
setInterval(criarEstrela, 1000);
const jogador = document.getElementById("jogador");

const blocosTexto = document.getElementById("blocos");

const vidaTexto = document.getElementById("vida");

let posicaoX = 100;
let posicaoY = 295;

let blocos = 20;
let vida = 100;

let pulando = false;


// ============================
// ATUALIZAR JOGADOR
// ============================

function atualizarJogador() {

    jogador.style.left = posicaoX + "px";

    jogador.style.top = posicaoY + "px";

}


// ============================
// MOVER PARA ESQUERDA
// ============================

function moverEsquerda() {

    posicaoX -= 20;

    if (posicaoX < 0) {
        posicaoX = 0;
    }

    atualizarJogador();
}


// ============================
// MOVER PARA DIREITA
// ============================

function moverDireita() {

    posicaoX += 20;

    if (posicaoX > 750) {
        posicaoX = 750;
    }

    atualizarJogador();
}


// ============================
// PULAR
// ============================

function pular() {

    if (pulando) {
        return;
    }

    pulando = true;

    let alturaInicial = posicaoY;

    posicaoY -= 100;

    atualizarJogador();

    setTimeout(function() {

        posicaoY = alturaInicial;

        atualizarJogador();

        pulando = false;

    }, 500);
}


// ============================
// QUEBRAR BLOCO
// ============================

function quebrarBloco() {

    const blocosDoMundo =
        document.querySelectorAll(".bloco");

    if (blocosDoMundo.length === 0) {

        alert("Não existem mais blocos!");

        return;
    }

    if (blocos <= 0) {

        alert("Você não tem blocos para quebrar!");

        return;
    }

    const bloco =
        blocosDoMundo[blocosDoMundo.length - 1];

    bloco.remove();

    blocos++;

    blocosTexto.textContent = blocos;
}


// ============================
// COLOCAR BLOCO
// ============================

function colocarBloco() {

    if (blocos <= 0) {

        alert("Você não possui blocos!");

        return;
    }

    const novoBloco =
        document.createElement("div");

    novoBloco.classList.add(
        "bloco",
        "terra"
    );

    novoBloco.style.left =
        posicaoX + "px";

    novoBloco.style.top =
        (posicaoY + 55) + "px";

    document.getElementById("mundo")
        .appendChild(novoBloco);

    blocos--;

    blocosTexto.textContent = blocos;
}


// ============================
// TECLADO
// ============================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "ArrowLeft" ||
            event.key === "a"
        ) {

            moverEsquerda();

        }

        if (
            event.key === "ArrowRight" ||
            event.key === "d"
        ) {

            moverDireita();

        }

        if (
            event.key === "ArrowUp" ||
            event.key === "w" ||
            event.key === " "
        ) {

            pular();

        }

    }
);


// ============================
// CLICAR NOS BLOCOS
// ============================

document.addEventListener(
    "click",
    function(event) {

        if (
            event.target.classList.contains(
                "bloco"
            )
        ) {

            event.target.remove();

            blocos++;

            blocosTexto.textContent =
                blocos;
        }

    }
);


// ============================
// INICIALIZAÇÃO
// ============================

atualizarJogador();
const celulas = document.querySelectorAll(".celula");
const mensagem = document.querySelector("#mensagem");
const botaoReiniciar = document.querySelector("#reiniciar");

let jogadorAtual = "X";
let jogoAtivo = true;
let tabuleiro = ["", "", "", "", "", "", "", "", ""];

const combinacoesVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function jogar(evento) {
    const celula = evento.target;
    const indice = Number(celula.dataset.indice);

    if (!jogoAtivo || tabuleiro[indice] !== "") {
        return;
    }

    tabuleiro[indice] = jogadorAtual;
    celula.textContent = jogadorAtual;

    const combinacaoVencedora = verificarVitoria();

    if (combinacaoVencedora) {
        mensagem.textContent = `O jogador ${jogadorAtual} venceu!`;
        jogoAtivo = false;
        destacarVitoria(combinacaoVencedora);
        desativarCelulas();
        return;
    }

    if (tabuleiro.every((posicao) => posicao !== "")) {
        mensagem.textContent = "O jogo terminou em empate!";
        jogoAtivo = false;
        desativarCelulas();
        return;
    }

    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    mensagem.textContent = `Vez do jogador ${jogadorAtual}`;
}

function verificarVitoria() {
    return combinacoesVencedoras.find(([a, b, c]) => {
        return (
            tabuleiro[a] !== "" &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]
        );
    });
}

function destacarVitoria(combinacao) {
    combinacao.forEach((indice) => {
        celulas[indice].classList.add("vencedora");
    });
}

function desativarCelulas() {
    celulas.forEach((celula) => {
        celula.disabled = true;
    });
}

function reiniciarJogo() {
    jogadorAtual = "X";
    jogoAtivo = true;
    tabuleiro = ["", "", "", "", "", "", "", "", ""];

    mensagem.textContent = "Vez do jogador X";

    celulas.forEach((celula) => {
        celula.textContent = "";
        celula.disabled = false;
        celula.classList.remove("vencedora");
    });
}

celulas.forEach((celula) => {
    celula.addEventListener("click", jogar);
});

botaoReiniciar.addEventListener("click", reiniciarJogo);

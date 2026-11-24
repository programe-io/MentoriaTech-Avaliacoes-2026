
const celulas = document.querySelectorAll(".celula");
const statusTexto = document.getElementById("status");

const scoreXElemento = document.getElementById("scoreX");
const scoreOElemento = document.getElementById("scoreO");

const botaoReiniciar = document.getElementById("reiniciar");
const botaoNovoJogo = document.getElementById("novoJogo");

let jogadorAtual = "X";
let tabuleiro = ["", "", "", "", "", "", "", "", ""];

let jogoAtivo = true;

let scoreX = 0;
let scoreO = 0;

// Combinações vencedoras
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

// Jogada do jogador
celulas.forEach(celula => {

    celula.addEventListener("click", () => {

        const indice = Number(celula.dataset.index);

        if (tabuleiro[indice] !== "" || !jogoAtivo) {
            return;
        }

        tabuleiro[indice] = jogadorAtual;

        celula.textContent = jogadorAtual;
        celula.classList.add(jogadorAtual.toLowerCase());
        celula.disabled = true;

        verificarResultado();

    });

});

// Verifica vitória ou empate
function verificarResultado() {

    let combinacaoVencedora = null;

    for (const combinacao of combinacoesVencedoras) {

        const [a, b, c] = combinacao;

        if (
            tabuleiro[a] !== "" &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]
        ) {
            combinacaoVencedora = combinacao;
            break;
        }
    }

    if (combinacaoVencedora) {

        jogoAtivo = false;

        combinacaoVencedora.forEach(indice => {
            celulas[indice].classList.add("vencedora");
        });

        statusTexto.textContent =
            "Jogador " + jogadorAtual + " venceu! 🎉";

        atualizarPlacar();

        return;
    }

    if (!tabuleiro.includes("")) {

        jogoAtivo = false;
        statusTexto.textContent = "Empate! 🤝";

        return;
    }

    // Alterna o jogador
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";

    statusTexto.textContent =
        "Vez do jogador " + jogadorAtual;
}

// Atualiza o placar
function atualizarPlacar() {

    if (jogadorAtual === "X") {
        scoreX++;
        scoreXElemento.textContent = scoreX;
    } else {
        scoreO++;
        scoreOElemento.textContent = scoreO;
    }
}

// Reinicia apenas a partida
function reiniciarPartida() {

    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogadorAtual = "X";
    jogoAtivo = true;

    statusTexto.textContent = "Vez do jogador X";

    celulas.forEach(celula => {
        celula.textContent = "";
        celula.disabled = false;
        celula.classList.remove(
            "x",
            "o",
            "vencedora"
        );
    });

}

// Zera a partida e o placar
function novoJogo() {

    scoreX = 0;
    scoreO = 0;

    scoreXElemento.textContent = 0;
    scoreOElemento.textContent = 0;

    reiniciarPartida();

}

// Eventos dos botões
botaoReiniciar.addEventListener("click", reiniciarPartida);

botaoNovoJogo.addEventListener("click", novoJogo);

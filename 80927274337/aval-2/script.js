
const casas = document.querySelectorAll(".casa");
const statusJogo = document.getElementById("status");
const botaoReiniciar = document.getElementById("reiniciar");

let jogadorAtual = "X";
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogoAtivo = true;

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

function verificarVitoria() {
    for (const combinacao of combinacoesVencedoras) {
        const [a, b, c] = combinacao;

        if (
            tabuleiro[a] !== "" &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]
        ) {
            combinacao.forEach((indice) => {
                casas[indice].classList.add("vencedora");
            });

            statusJogo.textContent =
                `Jogador ${jogadorAtual} venceu! 🎉`;

            jogoAtivo = false;
            return true;
        }
    }

    return false;
}

function jogar(evento) {
    const casa = evento.currentTarget;
    const indice = Number(casa.dataset.index);

    if (!jogoAtivo || tabuleiro[indice] !== "") {
        return;
    }

    tabuleiro[indice] = jogadorAtual;
    casa.textContent = jogadorAtual;
    casa.classList.add(jogadorAtual.toLowerCase());
    casa.disabled = true;

    if (verificarVitoria()) {
        casas.forEach((c) => c.disabled = true);
        return;
    }

    if (tabuleiro.every((valor) => valor !== "")) {
        statusJogo.textContent = "Empate! 🤝";
        jogoAtivo = false;
        return;
    }

    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    statusJogo.textContent = `Vez do jogador ${jogadorAtual}`;
}

function reiniciarJogo() {
    jogadorAtual = "X";
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogoAtivo = true;

    statusJogo.textContent = "Vez do jogador X";

    casas.forEach((casa) => {
        casa.textContent = "";
        casa.disabled = false;
        casa.classList.remove("x", "o", "vencedora");
    });
}

casas.forEach((casa) => {
    casa.addEventListener("click", jogar);
});

botaoReiniciar.addEventListener("click", reiniciarJogo);

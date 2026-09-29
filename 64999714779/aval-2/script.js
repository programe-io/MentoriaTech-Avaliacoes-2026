```javascript
const celulas = document.querySelectorAll('.celula');
const textoStatus = document.getElementById('status-jogo');

const btnReiniciar = document.getElementById('btn-reiniciar');
const btnResetarPlacar = document.getElementById('btn-resetar-placar');

const placarX = document.getElementById('placar-x');
const placarO = document.getElementById('placar-o');

let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogadorAtual = "X";
let jogoAtivo = true;

let pontosX = 0;
let pontosO = 0;

const condicoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function inicializarJogo() {

    celulas.forEach(celula => {
        celula.addEventListener('click', clicouCelula);
    });

    btnReiniciar.addEventListener('click', reiniciarJogo);
    btnResetarPlacar.addEventListener('click', resetarPlacar);
}

function clicouCelula(evento) {

    const celula = evento.currentTarget;
    const indice = Number(celula.dataset.index);

    if (tabuleiro[indice] !== "" || !jogoAtivo) {
        return;
    }

    atualizarCelula(celula, indice);
    checarVencedor();
}

function atualizarCelula(celula, indice) {

    tabuleiro[indice] = jogadorAtual;

    celula.textContent = jogadorAtual;
    celula.classList.add(jogadorAtual.toLowerCase());
}

function trocarJogador() {

    jogadorAtual = jogadorAtual === "X" ? "O" : "X";

    textoStatus.textContent =
        `Vez do jogador: ${jogadorAtual}`;
}

function checarVencedor() {

    for (const combinacao of condicoesVitoria) {

        const [a, b, c] = combinacao;

        if (
            tabuleiro[a] !== "" &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]
        ) {

            finalizarVitoria(combinacao);
            return;
        }
    }

    if (!tabuleiro.includes("")) {

        textoStatus.textContent = "🤝 Deu velha! Empate.";
        jogoAtivo = false;

        return;
    }

    trocarJogador();
}

function finalizarVitoria(combinacao) {

    textoStatus.textContent =
        `🎉 Jogador ${jogadorAtual} venceu!`;

    jogoAtivo = false;

    combinacao.forEach(indice => {
        celulas[indice].classList.add("vencedora");
    });

    if (jogadorAtual === "X") {
        pontosX++;
        placarX.textContent = pontosX;
    } else {
        pontosO++;
        placarO.textContent = pontosO;
    }
}

function reiniciarJogo() {

    jogadorAtual = "X";
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogoAtivo = true;

    textoStatus.textContent = "Vez do jogador: X";

    celulas.forEach(celula => {

        celula.textContent = "";

        celula.classList.remove(
            "x",
            "o",
            "vencedora"
        );
    });
}

function resetarPlacar() {

    pontosX = 0;
    pontosO = 0;

    placarX.textContent = "0";
    placarO.textContent = "0";

    reiniciarJogo();
}

inicializarJogo();
```

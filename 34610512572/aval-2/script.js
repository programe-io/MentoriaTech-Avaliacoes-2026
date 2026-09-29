const celulas = document.querySelectorAll(".celula");

const textoStatus = document.getElementById("status-jogo");

const btnReiniciar = document.getElementById("btn-reiniciar");

const placarX = document.getElementById("placar-x");
const placarO = document.getElementById("placar-o");
const placarEmpates = document.getElementById("placar-empates");


// Tabuleiro com exatamente 9 posições
let tabuleiro = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

let jogadorAtual = "X";

let jogoAtivo = true;


// Placar
let pontosX = 0;
let pontosO = 0;
let empates = 0;


// Combinações possíveis para vencer
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


// Inicia os eventos
function inicializarJogo() {

    celulas.forEach((celula) => {

        celula.addEventListener("click", clicouCelula);

    });

    btnReiniciar.addEventListener("click", reiniciarJogo);

}


// Quando uma casa é clicada
function clicouCelula(evento) {

    const celula = evento.currentTarget;

    const indice = Number(
        celula.getAttribute("data-index")
    );


    // Não permite jogar em casa ocupada
    // nem depois que o jogo terminou
    if (
        tabuleiro[indice] !== "" ||
        !jogoAtivo
    ) {

        return;

    }


    atualizarCelula(celula, indice);

    verificarVencedor();

}


// Atualiza a casa
function atualizarCelula(celula, indice) {

    tabuleiro[indice] = jogadorAtual;

    celula.textContent = jogadorAtual;

    celula.classList.add(
        jogadorAtual.toLowerCase()
    );

}


// Verifica vencedor
function verificarVencedor() {

    for (
        let i = 0;
        i < condicoesVitoria.length;
        i++
    ) {

        const [a, b, c] =
            condicoesVitoria[i];


        if (
            tabuleiro[a] === "" ||
            tabuleiro[b] === "" ||
            tabuleiro[c] === ""
        ) {

            continue;

        }


        if (
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]
        ) {

            finalizarVitoria(
                [a, b, c]
            );

            return;

        }

    }


    // Verifica empate
    if (!tabuleiro.includes("")) {

        finalizarEmpate();

        return;

    }


    // Continua a partida
    trocarJogador();

}


// Troca o jogador
function trocarJogador() {

    jogadorAtual =
        jogadorAtual === "X"
            ? "O"
            : "X";


    textoStatus.textContent =
        `Vez do jogador: ${jogadorAtual}`;

}


// Vitória
function finalizarVitoria(combinacao) {

    jogoAtivo = false;


    combinacao.forEach((indice) => {

        celulas[indice]
            .classList.add("vencedora");

    });


    textoStatus.textContent =
        `🎉 Jogador ${jogadorAtual} venceu!`;


    if (jogadorAtual === "X") {

        pontosX++;

        placarX.textContent = pontosX;

    } else {

        pontosO++;

        placarO.textContent = pontosO;

    }

}


// Empate
function finalizarEmpate() {

    jogoAtivo = false;

    empates++;

    placarEmpates.textContent =
        empates;

    textoStatus.textContent =
        "🤝 Deu velha! A partida terminou empatada.";

}


// Reiniciar a partida
function reiniciarJogo() {

    tabuleiro = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];


    jogadorAtual = "X";

    jogoAtivo = true;


    textoStatus.textContent =
        "Vez do jogador: X";


    celulas.forEach((celula) => {

        celula.textContent = "";

        celula.classList.remove(
            "x",
            "o",
            "vencedora"
        );

    });

}


// Inicia o jogo
inicializarJogo();
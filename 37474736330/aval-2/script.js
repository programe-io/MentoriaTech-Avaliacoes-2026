// =========================
// ELEMENTOS DO HTML
// =========================

const tabuleiro = document.getElementById("tabuleiro");

const movimentosTexto =
    document.getElementById("movimentos");

const paresTexto =
    document.getElementById("pares");

const mensagem =
    document.getElementById("mensagem");

const btnReiniciar =
    document.getElementById("btn-reiniciar");


// =========================
// CONFIGURAÇÕES DO JOGO
// =========================

// Símbolos utilizados nas cartas

const simbolos = [
    "🍎",
    "🍌",
    "🍕",
    "🚀",
    "⚽",
    "🎮",
    "🐱",
    "🌟"
];


// Cria dois exemplares de cada símbolo

let cartas = [...simbolos, ...simbolos];


// Variáveis do jogo

let primeiraCarta = null;

let segundaCarta = null;

let bloqueado = false;

let movimentos = 0;

let paresEncontrados = 0;


// =========================
// EMBARALHAR CARTAS
// =========================

function embaralharCartas() {

    cartas.sort(() => Math.random() - 0.5);

}


// =========================
// CRIAR TABULEIRO
// =========================

function criarTabuleiro() {

    // Limpa o tabuleiro

    tabuleiro.innerHTML = "";


    // Embaralha as cartas

    embaralharCartas();


    // Cria cada carta

    cartas.forEach((simbolo, indice) => {

        const carta = document.createElement("div");

        carta.classList.add("carta");

        carta.dataset.indice = indice;

        carta.dataset.simbolo = simbolo;


        // Adiciona o evento de clique

        carta.addEventListener(
            "click",
            virarCarta
        );


        // Adiciona ao tabuleiro

        tabuleiro.appendChild(carta);

    });

}


// =========================
// VIRAR CARTA
// =========================

function virarCarta(evento) {

    const carta = evento.currentTarget;


    // Impede ações inválidas

    if (
        bloqueado ||
        carta === primeiraCarta ||
        carta.classList.contains("encontrada")
    ) {

        return;

    }


    // Mostra o símbolo

    carta.textContent =
        carta.dataset.simbolo;

    carta.classList.add("revelada");


    // Primeira carta

    if (primeiraCarta === null) {

        primeiraCarta = carta;

        return;

    }


    // Segunda carta

    segundaCarta = carta;


    // Conta o movimento

    movimentos++;

    movimentosTexto.textContent =
        movimentos;


    verificarPar();

}


// =========================
// VERIFICAR PAR
// =========================

function verificarPar() {

    const combinam =
        primeiraCarta.dataset.simbolo ===
        segundaCarta.dataset.simbolo;


    if (combinam) {

        cartasCombinam();

    } else {

        cartasNaoCombinam();

    }

}


// =========================
// QUANDO AS CARTAS COMBINAM
// =========================

function cartasCombinam() {

    primeiraCarta.classList.add("encontrada");

    segundaCarta.classList.add("encontrada");


    paresEncontrados++;

    paresTexto.textContent =
        paresEncontrados;


    limparSelecao();


    // Verifica se terminou

    if (paresEncontrados === simbolos.length) {

        mensagem.textContent =
            `🎉 Parabéns! Você terminou em ${movimentos} movimentos!`;

    }

}


// =========================
// QUANDO AS CARTAS NÃO COMBINAM
// =========================

function cartasNaoCombinam() {

    bloqueado = true;


    setTimeout(() => {

        primeiraCarta.textContent = "";

        segundaCarta.textContent = "";


        primeiraCarta.classList.remove(
            "revelada"
        );

        segundaCarta.classList.remove(
            "revelada"
        );


        limparSelecao();

    }, 900);

}


// =========================
// LIMPAR SELEÇÃO
// =========================

function limparSelecao() {

    primeiraCarta = null;

    segundaCarta = null;

    bloqueado = false;

}


// =========================
// REINICIAR JOGO
// =========================

function reiniciarJogo() {

    primeiraCarta = null;

    segundaCarta = null;

    bloqueado = false;

    movimentos = 0;

    paresEncontrados = 0;


    movimentosTexto.textContent = "0";

    paresTexto.textContent = "0";

    mensagem.textContent = "";


    cartas = [
        ...simbolos,
        ...simbolos
    ];


    criarTabuleiro();

}


// =========================
// BOTÃO REINICIAR
// =========================

btnReiniciar.addEventListener(
    "click",
    reiniciarJogo
);


// =========================
// INICIAR O JOGO
// =========================

criarTabuleiro();
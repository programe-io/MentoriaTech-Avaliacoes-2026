
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const tamanho = 20;
const quantidade = canvas.width / tamanho;

let cobrinha;
let comida;
let direcao;
let proximaDirecao;
let pontuacao;
let jogo;
let acabou;

function iniciar() {
    cobrinha = [
        { x: 10, y: 10 \},
        { x: 9, y: 10 \},
        { x: 8, y: 10 \}
    ];

    direcao = { x: 1, y: 0 \};
    proximaDirecao = { x: 1, y: 0 \};

    pontuacao = 0;
    acabou = false;

    document.getElementById("score").textContent = pontuacao;
    document.getElementById("mensagem").textContent =
        "Use as setas do teclado para jogar!";

    gerarComida();
    desenhar();

    clearInterval(jogo);
    jogo = setInterval(atualizar, 120);
\}

function gerarComida() {
    do {
        comida = {
            x: Math.floor(Math.random() * quantidade),
            y: Math.floor(Math.random() * quantidade)
        \};
    \} while (
        cobrinha.some(parte =>
            parte.x === comida.x && parte.y === comida.y
        )
    );
\}

function desenhar() {
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha a comida
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(
        comida.x * tamanho,
        comida.y * tamanho,
        tamanho - 2,
        tamanho - 2
    );

    // Desenha a cobrinha
    cobrinha.forEach((parte, indice) => {
        ctx.fillStyle = indice === 0 ? "#4ade80" : "#22c55e";

        ctx.fillRect(
            parte.x * tamanho,
            parte.y * tamanho,
            tamanho - 2,
            tamanho - 2
        );
    \});
\}

function atualizar() {
    if (acabou) return;

    direcao = proximaDirecao;

    const cabeca = {
        x: cobrinha[0].x + direcao.x,
        y: cobrinha[0].y + direcao.y
    \};

    const comeu =
        cabeca.x === comida.x && cabeca.y === comida.y;

    const corpo = comeu
        ? cobrinha
        : cobrinha.slice(0, -1);

    // Verifica colisões
    if (
        cabeca.x < 0 ||
        cabeca.x >= quantidade ||
        cabeca.y < 0 ||
        cabeca.y >= quantidade ||
        corpo.some(parte =>
            parte.x === cabeca.x && parte.y === cabeca.y
        )
    ) {
        fimDeJogo();
        return;
    \}

    cobrinha.unshift(cabeca);

    if (comeu) {
        pontuacao += 10;

        document.getElementById("score").textContent = pontuacao;

        gerarComida();
    \} else {
        cobrinha.pop();
    \}

    desenhar();
\}

function fimDeJogo() {
    acabou = true;
    clearInterval(jogo);

    document.getElementById("mensagem").textContent =
        "Game Over! Pontuação: " + pontuacao;
\}

document.addEventListener("keydown", (event) => {
    const teclas = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight"
    ];

    if (teclas.includes(event.key)) {
        event.preventDefault();
    \}

    if (acabou) return;

    if (event.key === "ArrowUp" && direcao.y !== 1) {
        proximaDirecao = { x: 0, y: -1 \};
    \}

    if (event.key === "ArrowDown" && direcao.y !== -1) {
        proximaDirecao = { x: 0, y: 1 \};
    \}

    if (event.key === "ArrowLeft" && direcao.x !== 1) {
        proximaDirecao = { x: -1, y: 0 \};
    \}

    if (event.key === "ArrowRight" && direcao.x !== -1) {
        proximaDirecao = { x: 1, y: 0 \};
    \}
\});

function reiniciar() {
    iniciar();
\}

iniciar();$0
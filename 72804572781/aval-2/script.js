
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const recordElement = document.getElementById("record");

const overlay = document.getElementById("overlay");
const message = document.getElementById("message");
const description = document.getElementById("description");
const startButton = document.getElementById("startButton");

const tamanho = 20;
const quantidade = canvas.width / tamanho;

let cobrinha;
let comida;
let direcao;
let proximaDirecao;

let pontuacao = 0;
let recorde = Number(localStorage.getItem("snakeRecord")) || 0;

let velocidade = 150;
let intervalo = null;
let jogando = false;

recordElement.textContent = recorde;

function prepararJogo() {

    cobrinha = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    direcao = "RIGHT";
    proximaDirecao = "RIGHT";

    pontuacao = 0;
    velocidade = 150;

    scoreElement.textContent = pontuacao;

    criarComida();
    desenhar();

}

function criarComida() {

    do {
        comida = {
            x: Math.floor(Math.random() * quantidade),
            y: Math.floor(Math.random() * quantidade)
        };

    } while (
        cobrinha.some(parte =>
            parte.x === comida.x &&
            parte.y === comida.y
        )
    );

}

function desenhar() {

    ctx.fillStyle = "#0c1714";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grade do cenário

    ctx.strokeStyle = "#172b23";
    ctx.lineWidth = 1;

    for (let i = 0; i < quantidade; i++) {

        ctx.beginPath();
        ctx.moveTo(i * tamanho, 0);
        ctx.lineTo(i * tamanho, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * tamanho);
        ctx.lineTo(canvas.width, i * tamanho);
        ctx.stroke();

    }

    // Comida

    ctx.fillStyle = "#ff5252";

    ctx.beginPath();

    ctx.arc(
        comida.x * tamanho + tamanho / 2,
        comida.y * tamanho + tamanho / 2,
        tamanho / 2 - 3,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // Cobrinha

    cobrinha.forEach((parte, index) => {

        ctx.fillStyle = index === 0
            ? "#9cffb9"
            : "#48db83";

        ctx.fillRect(
            parte.x * tamanho + 1,
            parte.y * tamanho + 1,
            tamanho - 2,
            tamanho - 2
        );

        ctx.strokeStyle = "#0c1714";
        ctx.strokeRect(
            parte.x * tamanho + 1,
            parte.y * tamanho + 1,
            tamanho - 2,
            tamanho - 2
        );

    });

}

function iniciarJogo() {

    if (jogando) return;

    if (!cobrinha) {
        prepararJogo();
    }

    jogando = true;
    overlay.style.display = "none";

    clearInterval(intervalo);

    intervalo = setInterval(atualizarJogo, velocidade);

}

function atualizarJogo() {

    if (!jogando) return;

    direcao = proximaDirecao;

    const cabeca = { ...cobrinha[0] };

    if (direcao === "UP") cabeca.y--;
    if (direcao === "DOWN") cabeca.y++;
    if (direcao === "LEFT") cabeca.x--;
    if (direcao === "RIGHT") cabeca.x++;

    // Verifica se comeu

    const comeu =
        cabeca.x === comida.x &&
        cabeca.y === comida.y;

    // Verifica colisão com as paredes

    if (
        cabeca.x < 0 ||
        cabeca.y < 0 ||
        cabeca.x >= quantidade ||
        cabeca.y >= quantidade
    ) {
        gameOver();
        return;
    }

    // Verifica colisão com o próprio corpo

    const corpoVerificado = comeu
        ? cobrinha
        : cobrinha.slice(0, -1);

    if (
        corpoVerificado.some(parte =>
            parte.x === cabeca.x &&
            parte.y === cabeca.y
        )
    ) {
        gameOver();
        return;
    }

    cobrinha.unshift(cabeca);

    if (comeu) {

        pontuacao += 10;

        scoreElement.textContent = pontuacao;

        if (pontuacao > recorde) {

            recorde = pontuacao;

            localStorage.setItem("snakeRecord", recorde);

            recordElement.textContent = recorde;

        }

        criarComida();

        // Aumenta a velocidade

        velocidade = Math.max(65, velocidade - 5);

        clearInterval(intervalo);

        intervalo = setInterval(
            atualizarJogo,
            velocidade
        );

    } else {

        cobrinha.pop();

    }

    desenhar();

}

function mudarDirecao(novaDirecao) {

    if (!cobrinha) return;

    const movimentos = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT"
    };

    if (novaDirecao === movimentos[direcao]) {
        return;
    }

    proximaDirecao = novaDirecao;

}

function gameOver() {

    jogando = false;

    clearInterval(intervalo);

    overlay.style.display = "flex";

    message.textContent = "GAME OVER!";

    description.textContent =
        "Sua pontuação foi: " + pontuacao;

    startButton.textContent = "↻ JOGAR NOVAMENTE";

}

function reiniciarJogo() {

    clearInterval(intervalo);

    jogando = false;

    prepararJogo();

    overlay.style.display = "flex";

    message.textContent = "SNAKE GAME";

    description.textContent = "Prepare-se para jogar!";

    startButton.textContent = "▶ JOGAR";

}

// Controles do teclado

document.addEventListener("keydown", function(event) {

    const teclas = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
        w: "UP",
        W: "UP",
        s: "DOWN",
        S: "DOWN",
        a: "LEFT",
        A: "LEFT",
        d: "RIGHT",
        D: "RIGHT"
    };

    if (teclas[event.key]) {

        event.preventDefault();

        mudarDirecao(teclas[event.key]);

    }

});

// Prepara o jogo ao abrir a página

prepararJogo();

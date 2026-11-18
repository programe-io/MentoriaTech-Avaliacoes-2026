
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const mensagem = document.getElementById("mensagem");
const botao = document.getElementById("start");

const tamanho = 20;
const quantidade = 20;

let cobrinha;
let comida;
let direcao;
let proximaDirecao;
let pontuacao;
let intervalo;
let jogando = false;

function iniciarJogo() {
    clearInterval(intervalo);

    cobrinha = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    direcao = { x: 1, y: 0 };
    proximaDirecao = { x: 1, y: 0 };

    pontuacao = 0;
    scoreElement.textContent = pontuacao;

    criarComida();

    jogando = true;
    mensagem.textContent = "Boa sorte!";
    botao.textContent = "Reiniciar";

    desenhar();

    intervalo = setInterval(atualizar, 120);
}

function criarComida() {
    do {
        comida = {
            x: Math.floor(Math.random() * quantidade),
            y: Math.floor(Math.random() * quantidade)
        };
    } while (
        cobrinha.some(p => p.x === comida.x && p.y === comida.y)
    );
}

function atualizar() {
    direcao = proximaDirecao;

    const cabeca = {
        x: cobrinha[0].x + direcao.x,
        y: cobrinha[0].y + direcao.y
    };

    const comeu =
        cabeca.x === comida.x &&
        cabeca.y === comida.y;

    // Verifica colisões
    const corpo = comeu
        ? cobrinha
        : cobrinha.slice(0, -1);

    if (
        cabeca.x < 0 ||
        cabeca.x >= quantidade ||
        cabeca.y < 0 ||
        cabeca.y >= quantidade ||
        corpo.some(p => p.x === cabeca.x && p.y === cabeca.y)
    ) {
        fimDeJogo();
        return;
    }

    cobrinha.unshift(cabeca);

    if (comeu) {
        pontuacao += 10;
        scoreElement.textContent = pontuacao;
        criarComida();
    } else {
        cobrinha.pop();
    }

    desenhar();
}

function desenhar() {
    ctx.fillStyle = "#07140f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha a comida
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(
        comida.x * tamanho + tamanho / 2,
        comida.y * tamanho + tamanho / 2,
        tamanho / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Desenha a cobrinha
    cobrinha.forEach((parte, index) => {
        ctx.fillStyle = index === 0 ? "#86efac" : "#22c55e";

        ctx.fillRect(
            parte.x * tamanho + 1,
            parte.y * tamanho + 1,
            tamanho - 2,
            tamanho - 2
        );
    });
}

function fimDeJogo() {
    clearInterval(intervalo);
    jogando = false;

    mensagem.textContent = "Game Over! Pontuação: " + pontuacao;
    botao.textContent = "Jogar Novamente";
}

document.addEventListener("keydown", function(event) {
    const teclas = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight"
    ];

    if (teclas.includes(event.key)) {
        event.preventDefault();
    }

    if (!jogando) return;

    if (event.key === "ArrowUp" && direcao.y !== 1) {
        proximaDirecao = { x: 0, y: -1 };
    }

    if (event.key === "ArrowDown" && direcao.y !== -1) {
        proximaDirecao = { x: 0, y: 1 };
    }

    if (event.key === "ArrowLeft" && direcao.x !== 1) {
        proximaDirecao = { x: -1, y: 0 };
    }

    if (event.key === "ArrowRight" && direcao.x !== -1) {
        proximaDirecao = { x: 1, y: 0 };
    }
});

// Tela inicial
ctx.fillStyle = "#07140f";
ctx.fillRect(0, 0, canvas.width, canvas.height);

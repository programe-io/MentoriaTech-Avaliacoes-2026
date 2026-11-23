
const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const tamanho = 20;
const quantidade = canvas.width / tamanho;

let cobrinha;
let comida;
let direcao;
let proximaDirecao;
let pontos;
let recorde = Number(localStorage.getItem("recordeCobrinha")) || 0;
let intervalo;
let jogoAtivo = false;

const pontosElemento = document.getElementById("pontos");
const recordeElemento = document.getElementById("recorde");
const gameOver = document.getElementById("gameOver");

recordeElemento.textContent = recorde;

function iniciarJogo() {
    cobrinha = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    direcao = { x: 1, y: 0 };
    proximaDirecao = { x: 1, y: 0 };

    pontos = 0;
    pontosElemento.textContent = pontos;

    jogoAtivo = true;
    gameOver.style.display = "none";

    gerarComida();
    desenhar();

    clearInterval(intervalo);
    intervalo = setInterval(atualizar, 120);
}

function gerarComida() {
    do {
        comida = {
            x: Math.floor(Math.random() * quantidade),
            y: Math.floor(Math.random() * quantidade)
        };
    } while (
        cobrinha.some(
            parte => parte.x === comida.x && parte.y === comida.y
        )
    );
}

function desenhar() {
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar grade
    ctx.strokeStyle = "#1f2937";

    for (let i = 0; i <= canvas.width; i += tamanho) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    // Desenhar comida
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

    // Desenhar cobrinha
    cobrinha.forEach((parte, indice) => {
        ctx.fillStyle = indice === 0 ? "#4ade80" : "#22c55e";

        ctx.fillRect(
            parte.x * tamanho + 1,
            parte.y * tamanho + 1,
            tamanho - 2,
            tamanho - 2
        );
    });
}

function atualizar() {
    if (!jogoAtivo) return;

    direcao = proximaDirecao;

    const cabeca = {
        x: cobrinha[0].x + direcao.x,
        y: cobrinha[0].y + direcao.y
    };

    const comeu = cabeca.x === comida.x && cabeca.y === comida.y;

    const corpo = comeu ? cobrinha : cobrinha.slice(0, -1);

    // Verificar colisões
    if (
        cabeca.x < 0 ||
        cabeca.x >= quantidade ||
        cabeca.y < 0 ||
        cabeca.y >= quantidade ||
        corpo.some(
            parte => parte.x === cabeca.x && parte.y === cabeca.y
        )
    ) {
        terminarJogo();
        return;
    }

    cobrinha.unshift(cabeca);

    if (comeu) {
        pontos += 10;
        pontosElemento.textContent = pontos;

        if (pontos > recorde) {
            recorde = pontos;
            localStorage.setItem("recordeCobrinha", recorde);
            recordeElemento.textContent = recorde;
        }

        gerarComida();
    } else {
        cobrinha.pop();
    }

    desenhar();
}

function terminarJogo() {
    jogoAtivo = false;
    clearInterval(intervalo);
    gameOver.style.display = "flex";
}

function reiniciarJogo() {
    iniciarJogo();
}

document.addEventListener("keydown", (evento) => {
    const teclas = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight"
    ];

    if (teclas.includes(evento.key)) {
        evento.preventDefault();
    }

    if (!jogoAtivo) return;

    switch (evento.key) {
        case "ArrowUp":
            if (direcao.y !== 1) {
                proximaDirecao = { x: 0, y: -1 };
            }
            break;

        case "ArrowDown":
            if (direcao.y !== -1) {
                proximaDirecao = { x: 0, y: 1 };
            }
            break;

        case "ArrowLeft":
            if (direcao.x !== 1) {
                proximaDirecao = { x: -1, y: 0 };
            }
            break;

        case "ArrowRight":
            if (direcao.x !== -1) {
                proximaDirecao = { x: 1, y: 0 };
            }
            break;
    }
});

iniciarJogo();

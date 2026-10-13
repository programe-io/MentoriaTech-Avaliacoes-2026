const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const vidaTexto = document.getElementById("vida");
const pontosTexto = document.getElementById("pontos");
const inimigosTexto = document.getElementById("inimigos");

const menu = document.getElementById("menu");
const gameOver = document.getElementById("gameOver");
const pontuacaoFinal = document.getElementById("pontuacaoFinal");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let jogoRodando = false;
let pontos = 0;
let inimigosMortos = 0;

const teclas = {};

const jogador = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    tamanho: 25,
    velocidade: 5,
    vida: 100,
    angulo: 0
};

let balas = [];
let inimigos = [];


// ==========================
// TECLADO
// ==========================

document.addEventListener("keydown", (evento) => {
    teclas[evento.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (evento) => {
    teclas[evento.key.toLowerCase()] = false;
});


// ==========================
// MOUSE
// ==========================

canvas.addEventListener("mousemove", (evento) => {

    const dx = evento.clientX - jogador.x;
    const dy = evento.clientY - jogador.y;

    jogador.angulo = Math.atan2(dy, dx);
});

canvas.addEventListener("mousedown", (evento) => {

    if (evento.button === 0 && jogoRodando) {
        atirar();
    }
});


// ==========================
// ATIRAR
// ==========================

function atirar() {

    const velocidadeBala = 10;

    balas.push({
        x: jogador.x,
        y: jogador.y,

        dx: Math.cos(jogador.angulo) * velocidadeBala,
        dy: Math.sin(jogador.angulo) * velocidadeBala,

        tamanho: 6
    });
}


// ==========================
// CRIAR INIMIGO
// ==========================

function criarInimigo() {

    let x;
    let y;

    const lado = Math.floor(Math.random() * 4);

    if (lado === 0) {
        x = Math.random() * canvas.width;
        y = -30;
    }

    else if (lado === 1) {
        x = canvas.width + 30;
        y = Math.random() * canvas.height;
    }

    else if (lado === 2) {
        x = Math.random() * canvas.width;
        y = canvas.height + 30;
    }

    else {
        x = -30;
        y = Math.random() * canvas.height;
    }

    inimigos.push({
        x: x,
        y: y,
        tamanho: 25,
        velocidade: 1.5 + Math.random() * 1.5,
        vida: 50
    });
}


// ==========================
// MOVIMENTO DO JOGADOR
// ==========================

function moverJogador() {

    if (teclas["w"]) {
        jogador.y -= jogador.velocidade;
    }

    if (teclas["s"]) {
        jogador.y += jogador.velocidade;
    }

    if (teclas["a"]) {
        jogador.x -= jogador.velocidade;
    }

    if (teclas["d"]) {
        jogador.x += jogador.velocidade;
    }

    // Impede sair da tela

    jogador.x = Math.max(
        jogador.tamanho,
        Math.min(canvas.width - jogador.tamanho, jogador.x)
    );

    jogador.y = Math.max(
        jogador.tamanho,
        Math.min(canvas.height - jogador.tamanho, jogador.y)
    );
}


// ==========================
// ATUALIZAR BALAS
// ==========================

function atualizarBalas() {

    for (let i = balas.length - 1; i >= 0; i--) {

        const bala = balas[i];

        bala.x += bala.dx;
        bala.y += bala.dy;

        if (
            bala.x < 0 ||
            bala.x > canvas.width ||
            bala.y < 0 ||
            bala.y > canvas.height
        ) {
            balas.splice(i, 1);
        }
    }
}


// ==========================
// ATUALIZAR INIMIGOS
// ==========================

function atualizarInimigos() {

    for (let i = inimigos.length - 1; i >= 0; i--) {

        const inimigo = inimigos[i];

        const dx = jogador.x - inimigo.x;
        const dy = jogador.y - inimigo.y;

        const distancia = Math.sqrt(dx * dx + dy * dy);

        inimigo.x += (dx / distancia) * inimigo.velocidade;
        inimigo.y += (dy / distancia) * inimigo.velocidade;

        // Inimigo encostou no jogador

        if (distancia < jogador.tamanho + inimigo.tamanho) {

            jogador.vida -= 0.5;

            if (jogador.vida <= 0) {
                terminarJogo();
            }
        }
    }
}


// ==========================
// COLISÃO BALAS + INIMIGOS
// ==========================

function verificarColisoes() {

    for (let i = balas.length - 1; i >= 0; i--) {

        const bala = balas[i];

        for (let j = inimigos.length - 1; j >= 0; j--) {

            const inimigo = inimigos[j];

            const dx = bala.x - inimigo.x;
            const dy = bala.y - inimigo.y;

            const distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia < bala.tamanho + inimigo.tamanho) {

                inimigo.vida -= 25;

                balas.splice(i, 1);

                if (inimigo.vida <= 0) {

                    inimigos.splice(j, 1);

                    pontos += 100;
                    inimigosMortos++;
                }

                break;
            }
        }
    }
}


// ==========================
// DESENHAR JOGADOR
// ==========================

function desenharJogador() {

    ctx.save();

    ctx.translate(jogador.x, jogador.y);
    ctx.rotate(jogador.angulo);

    // Corpo

    ctx.fillStyle = "#3498db";

    ctx.beginPath();
    ctx.arc(0, 0, jogador.tamanho, 0, Math.PI * 2);
    ctx.fill();

    // Arma

    ctx.fillStyle = "#111";

    ctx.fillRect(0, -5, 40, 10);

    ctx.restore();
}


// ==========================
// DESENHAR BALAS
// ==========================

function desenharBalas() {

    ctx.fillStyle = "#f1c40f";

    balas.forEach((bala) => {

        ctx.beginPath();

        ctx.arc(
            bala.x,
            bala.y,
            bala.tamanho,
            0,
            Math.PI * 2
        );

        ctx.fill();
    });
}


// ==========================
// DESENHAR INIMIGOS
// ==========================

function desenharInimigos() {

    inimigos.forEach((inimigo) => {

        ctx.fillStyle = "#e74c3c";

        ctx.beginPath();

        ctx.arc(
            inimigo.x,
            inimigo.y,
            inimigo.tamanho,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Barra de vida

        ctx.fillStyle = "#111";

        ctx.fillRect(
            inimigo.x - 25,
            inimigo.y - 35,
            50,
            5
        );

        ctx.fillStyle = "#2ecc71";

        ctx.fillRect(
            inimigo.x - 25,
            inimigo.y - 35,
            inimigo.vida,
            5
        );
    });
}


// ==========================
// FUNDO
// ==========================

function desenharFundo() {

    ctx.fillStyle = "#202020";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Grade

    ctx.strokeStyle = "#292929";

    for (let x = 0; x < canvas.width; x += 50) {

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 50) {

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}


// ==========================
// HUD
// ==========================

function atualizarHUD() {

    vidaTexto.textContent = Math.max(
        0,
        Math.floor(jogador.vida)
    );

    pontosTexto.textContent = pontos;

    inimigosTexto.textContent = inimigosMortos;
}


// ==========================
// LOOP DO JOGO
// ==========================

function loop() {

    if (!jogoRodando) {
        return;
    }

    desenharFundo();

    moverJogador();
    atualizarBalas();
    atualizarInimigos();
    verificarColisoes();

    desenharBalas();
    desenharInimigos();
    desenharJogador();

    atualizarHUD();

    requestAnimationFrame(loop);
}


// ==========================
// INICIAR
// ==========================

function iniciarJogo() {

    jogador.x = canvas.width / 2;
    jogador.y = canvas.height / 2;
    jogador.vida = 100;

    balas = [];
    inimigos = [];

    pontos = 0;
    inimigosMortos = 0;

    jogoRodando = true;

    menu.style.display = "none";
    gameOver.style.display = "none";

    loop();

    iniciarSpawner();
}


// ==========================
// CRIAR INIMIGOS
// ==========================

let spawner;

function iniciarSpawner() {

    clearInterval(spawner);

    spawner = setInterval(() => {

        if (jogoRodando) {
            criarInimigo();
        }

    }, 1000);
}


// ==========================
// GAME OVER
// ==========================

function terminarJogo() {

    jogoRodando = false;

    clearInterval(spawner);

    pontuacaoFinal.textContent = pontos;

    gameOver.style.display = "flex";
}


// ==========================
// REDIMENSIONAR TELA
// ==========================

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
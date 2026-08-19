const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const vidaTexto = document.getElementById("vida");
const pontosTexto = document.getElementById("pontos");
const gameOverTela = document.getElementById("gameOver");
const pontuacaoFinal = document.getElementById("pontuacaoFinal");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ============================
// JOGADOR
// ============================

const jogador = {
    x: canvas.width / 2,
    y: canvas.height / 2,

    raio: 20,

    velocidade: 5,

    vida: 100,

    angulo: 0
};

// ============================
// CONTROLES
// ============================

const teclas = {};

let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    pressionado: false
};

document.addEventListener("keydown", (event) => {
    teclas[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (event) => {
    teclas[event.key.toLowerCase()] = false;
});

canvas.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

canvas.addEventListener("mousedown", () => {
    mouse.pressionado = true;
});

canvas.addEventListener("mouseup", () => {
    mouse.pressionado = false;
});

// ============================
// BALAS
// ============================

const balas = [];

function atirar() {

    const angulo = Math.atan2(
        mouse.y - jogador.y,
        mouse.x - jogador.x
    );

    balas.push({
        x: jogador.x,
        y: jogador.y,

        velocidade: 12,

        raio: 5,

        dx: Math.cos(angulo),
        dy: Math.sin(angulo)
    });
}

// Controle da cadência de tiro
let ultimoTiro = 0;
const intervaloTiro = 150;

// ============================
// INIMIGOS
// ============================

const inimigos = [];

let ultimoSpawn = 0;
let intervaloSpawn = 1000;

function criarInimigo() {

    let x;
    let y;

    // Escolhe um lado aleatório da tela
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

        raio: 18,

        velocidade: 1.5 + Math.random() * 1.5,

        vida: 1
    });
}

// ============================
// PARTÍCULAS
// ============================

const particulas = [];

function criarExplosao(x, y, cor) {

    for (let i = 0; i < 12; i++) {

        const angulo = Math.random() * Math.PI * 2;
        const velocidade = Math.random() * 4 + 1;

        particulas.push({
            x: x,
            y: y,

            dx: Math.cos(angulo) * velocidade,
            dy: Math.sin(angulo) * velocidade,

            vida: 30,

            cor: cor
        });
    }
}

// ============================
// PONTUAÇÃO
// ============================

let pontos = 0;

// ============================
// ATUALIZAÇÃO DO JOGADOR
// ============================

function atualizarJogador() {

    if (teclas["w"] || teclas["arrowup"]) {
        jogador.y -= jogador.velocidade;
    }

    if (teclas["s"] || teclas["arrowdown"]) {
        jogador.y += jogador.velocidade;
    }

    if (teclas["a"] || teclas["arrowleft"]) {
        jogador.x -= jogador.velocidade;
    }

    if (teclas["d"] || teclas["arrowright"]) {
        jogador.x += jogador.velocidade;
    }

    // Impede o jogador de sair da tela
    jogador.x = Math.max(
        jogador.raio,
        Math.min(canvas.width - jogador.raio, jogador.x)
    );

    jogador.y = Math.max(
        jogador.raio,
        Math.min(canvas.height - jogador.raio, jogador.y)
    );

    jogador.angulo = Math.atan2(
        mouse.y - jogador.y,
        mouse.x - jogador.x
    );
}

// ============================
// ATUALIZAÇÃO DAS BALAS
// ============================

function atualizarBalas() {

    for (let i = balas.length - 1; i >= 0; i--) {

        const bala = balas[i];

        bala.x += bala.dx * bala.velocidade;
        bala.y += bala.dy * bala.velocidade;

        // Remove balas que saíram da tela
        if (
            bala.x < -20 ||
            bala.x > canvas.width + 20 ||
            bala.y < -20 ||
            bala.y > canvas.height + 20
        ) {
            balas.splice(i, 1);
        }
    }
}

// ============================
// ATUALIZAÇÃO DOS INIMIGOS
// ============================

function atualizarInimigos() {

    for (let i = inimigos.length - 1; i >= 0; i--) {

        const inimigo = inimigos[i];

        const dx = jogador.x - inimigo.x;
        const dy = jogador.y - inimigo.y;

        const distancia = Math.sqrt(dx * dx + dy * dy);

        inimigo.x += (dx / distancia) * inimigo.velocidade;
        inimigo.y += (dy / distancia) * inimigo.velocidade;

        // Inimigo encostou no jogador
        if (distancia < jogador.raio + inimigo.raio) {

            jogador.vida -= 10;

            criarExplosao(
                inimigo.x,
                inimigo.y,
                "#ff3333"
            );

            inimigos.splice(i, 1);

            atualizarHUD();

            if (jogador.vida <= 0) {
                terminarJogo();
            }
        }
    }
}

// ============================
// COLISÕES
// ============================

function verificarColisoes() {

    for (let i = balas.length - 1; i >= 0; i--) {

        const bala = balas[i];

        for (let j = inimigos.length - 1; j >= 0; j--) {

            const inimigo = inimigos[j];

            const dx = bala.x - inimigo.x;
            const dy = bala.y - inimigo.y;

            const distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia < bala.raio + inimigo.raio) {

                criarExplosao(
                    inimigo.x,
                    inimigo.y,
                    "#ff9900"
                );

                balas.splice(i, 1);
                inimigos.splice(j, 1);

                pontos += 10;

                atualizarHUD();

                break;
            }
        }
    }
}

// ============================
// PARTÍCULAS
// ============================

function atualizarParticulas() {

    for (let i = particulas.length - 1; i >= 0; i--) {

        const p = particulas[i];

        p.x += p.dx;
        p.y += p.dy;

        p.vida--;

        if (p.vida <= 0) {
            particulas.splice(i, 1);
        }
    }
}

// ============================
// DESENHAR JOGADOR
// ============================

function desenharJogador() {

    ctx.save();

    ctx.translate(jogador.x, jogador.y);
    ctx.rotate(jogador.angulo);

    // Corpo
    ctx.fillStyle = "#3498db";

    ctx.beginPath();
    ctx.arc(0, 0, jogador.raio, 0, Math.PI * 2);
    ctx.fill();

    // Arma
    ctx.fillStyle = "#dddddd";

    ctx.fillRect(
        5,
        -5,
        28,
        10
    );

    // Olho
    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(7, -7, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

// ============================
// DESENHAR BALAS
// ============================

function desenharBalas() {

    for (const bala of balas) {

        ctx.fillStyle = "#ffff00";

        ctx.shadowColor = "#ffff00";
        ctx.shadowBlur = 10;

        ctx.beginPath();

        ctx.arc(
            bala.x,
            bala.y,
            bala.raio,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.shadowBlur = 0;
    }
}

// ============================
// DESENHAR INIMIGOS
// ============================

function desenharInimigos() {

    for (const inimigo of inimigos) {

        ctx.fillStyle = "#e74c3c";

        ctx.beginPath();

        ctx.arc(
            inimigo.x,
            inimigo.y,
            inimigo.raio,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Olho
        const angulo = Math.atan2(
            jogador.y - inimigo.y,
            jogador.x - inimigo.x
        );

        const olhoX =
            inimigo.x +
            Math.cos(angulo) * 7;

        const olhoY =
            inimigo.y +
            Math.sin(angulo) * 7;

        ctx.fillStyle = "white";

        ctx.beginPath();

        ctx.arc(
            olhoX,
            olhoY,
            5,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}

// ============================
// DESENHAR PARTÍCULAS
// ============================

function desenharParticulas() {

    for (const p of particulas) {

        ctx.globalAlpha = p.vida / 30;

        ctx.fillStyle = p.cor;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            3,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    ctx.globalAlpha = 1;
}

// ============================
// HUD
// ============================

function atualizarHUD() {

    vidaTexto.textContent = Math.max(
        0,
        jogador.vida
    );

    pontosTexto.textContent = pontos;
}

// ============================
// GAME OVER
// ============================

let jogoRodando = true;

function terminarJogo() {

    jogoRodando = false;

    pontuacaoFinal.textContent = pontos;

    gameOverTela.style.display = "flex";
}

// ============================
// REINICIAR
// ============================

function reiniciarJogo() {

    jogador.x = canvas.width / 2;
    jogador.y = canvas.height / 2;

    jogador.vida = 100;

    pontos = 0;

    balas.length = 0;
    inimigos.length = 0;
    particulas.length = 0;

    jogoRodando = true;

    gameOverTela.style.display = "none";

    atualizarHUD();
}

// ============================
// LOOP PRINCIPAL
// ============================

function gameLoop(tempo) {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    if (jogoRodando) {

        atualizarJogador();

        atualizarBalas();

        atualizarInimigos();

        atualizarParticulas();

        verificarColisoes();

        // Atirar
        if (
            mouse.pressionado &&
            tempo - ultimoTiro > intervaloTiro
        ) {
            atirar();
            ultimoTiro = tempo;
        }

        // Criar inimigos
        if (
            tempo - ultimoSpawn > intervaloSpawn
        ) {
            criarInimigo();

            ultimoSpawn = tempo;

            // Aumenta a dificuldade
            if (intervaloSpawn > 300) {
                intervaloSpawn -= 10;
            }
        }
    }

    desenharBalas();
    desenharInimigos();
    desenharParticulas();
    desenharJogador();

    requestAnimationFrame(gameLoop);
}

// ============================
// REDIMENSIONAMENTO
// ============================

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Inicia o jogo
atualizarHUD();

requestAnimationFrame(gameLoop);
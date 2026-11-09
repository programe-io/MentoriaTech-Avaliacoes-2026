
const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

let jogador = 300;
let carros = [];
let pontos = 0;
let velocidade = 4;
let rodando = false;
let tempo = 0;

let esquerda = false;
let direita = false;
let animationId = null;

// Desenhar pista
function desenharPista() {
    ctx.fillStyle = "#27852b";
    ctx.fillRect(0, 0, 600, 650);

    ctx.fillStyle = "#444";
    ctx.beginPath();
    ctx.moveTo(235, 0);
    ctx.lineTo(365, 0);
    ctx.lineTo(570, 650);
    ctx.lineTo(30, 650);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "white";
    ctx.lineWidth = 7;

    ctx.beginPath();
    ctx.moveTo(235, 0);
    ctx.lineTo(30, 650);
    ctx.moveTo(365, 0);
    ctx.lineTo(570, 650);
    ctx.stroke();

    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.setLineDash([35, 35]);
    ctx.lineDashOffset = -tempo * 3;

    ctx.beginPath();
    ctx.moveTo(278, 0);
    ctx.lineTo(200, 650);
    ctx.moveTo(322, 0);
    ctx.lineTo(400, 650);
    ctx.stroke();

    ctx.setLineDash([]);
}

// Desenhar carro
function desenharCarro(x, y, cor, escala = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(escala, escala);

    ctx.fillStyle = "#111";
    ctx.fillRect(-28, 12, 12, 36);
    ctx.fillRect(16, 12, 12, 36);

    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.roundRect(-22, 0, 44, 65, 9);
    ctx.fill();

    ctx.fillStyle = "#8de5ff";
    ctx.fillRect(-15, 12, 30, 18);

    ctx.fillStyle = "#fff9a0";
    ctx.fillRect(-17, 3, 8, 5);
    ctx.fillRect(9, 3, 8, 5);

    ctx.restore();
}

// Criar adversários
function criarCarro() {
    const faixas = [240, 300, 360];
    const cores = ["#00bfff", "#ffcc00", "#a020f0", "#eeeeee"];

    carros.push({
        x: faixas[Math.floor(Math.random() * faixas.length)],
        y: -80,
        cor: cores[Math.floor(Math.random() * cores.length)],
        passou: false
    });
}

// Desenhar jogo
function desenhar() {
    desenharPista();

    carros.forEach(c => {
        desenharCarro(c.x, c.y, c.cor, 0.7);
    });

    desenharCarro(jogador, 540, "#ff2020", 1.25);
}

// Finalizar
function fimDeJogo() {
    rodando = false;

    if (animationId !== null) {
        cancelAnimationFrame(animationId);
    }

    animationId = null;

    document.getElementById("mensagem").innerText =
        "💥 FIM DE JOGO! Pontuação: " + pontos;
}

// Atualizar
function atualizar() {
    if (!rodando) return;

    tempo++;

    velocidade = 4 + Math.floor(pontos / 100);

    if (esquerda) jogador -= 5;
    if (direita) jogador += 5;

    jogador = Math.max(90, Math.min(510, jogador));

    if (tempo % Math.max(28, 75 - velocidade * 3) === 0) {
        criarCarro();
    }

    for (const c of carros) {
        c.y += velocidade;

        if (
            Math.abs(c.x - jogador) < 42 &&
            c.y > 485 && c.y < 605
        ) {
            desenhar();
            fimDeJogo();
            return;
        }

        if (c.y > 660 && !c.passou) {
            c.passou = true;
            pontos += 10;
        }
    }

    carros = carros.filter(c => !c.passou && c.y < 710);

    document.getElementById("pontos").innerText = pontos;
    document.getElementById("velocidade").innerText = velocidade;

    desenhar();

    animationId = requestAnimationFrame(atualizar);
}

// Iniciar corrida
function iniciar() {
    if (animationId !== null) {
        cancelAnimationFrame(animationId);
    }

    pontos = 0;
    tempo = 0;
    velocidade = 4;
    jogador = 300;
    carros = [];

    esquerda = false;
    direita = false;
    rodando = true;

    document.getElementById("pontos").innerText = "0";
    document.getElementById("velocidade").innerText = "1";

    document.getElementById("mensagem").innerText =
        "🏁 Boa corrida! Desvie dos carros!";

    desenhar();

    animationId = requestAnimationFrame(atualizar);
}

// Teclado
document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        esquerda = true;
    }

    if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        direita = true;
    }
});

document.addEventListener("keyup", e => {
    if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        esquerda = false;
    }

    if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        direita = false;
    }
});

// Controles de celular
function controle(botao, lado) {
    botao.addEventListener("pointerdown", e => {
        e.preventDefault();

        if (lado === "esquerda") esquerda = true;
        else direita = true;
    });

    ["pointerup", "pointerleave", "pointercancel"].forEach(evento => {
        botao.addEventListener(evento, () => {
            if (lado === "esquerda") esquerda = false;
            else direita = false;
        });
    });
}

controle(document.getElementById("esquerda"), "esquerda");
controle(document.getElementById("direita"), "direita");

document.getElementById("iniciar").addEventListener("click", iniciar);

desenhar();

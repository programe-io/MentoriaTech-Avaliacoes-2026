
const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const pontosTexto = document.getElementById("pontos");
const recordeTexto = document.getElementById("recorde");
const mensagem = document.getElementById("mensagem");
const botao = document.getElementById("reiniciar");

const jogador = {
    x: 180,
    y: 430,
    largura: 40,
    altura: 40,
    velocidade: 6
};

let obstaculos = [];
let pontos = 0;
let recorde = 0;
let velocidadeObstaculos = 3;
let teclas = {};
let jogando = false;
let animacao = null;
let ultimoObstaculo = 0;

recordeTexto.textContent = recorde;

// Desenha o personagem
function desenharJogador() {
    ctx.fillStyle = "#72f1ff";
    ctx.fillRect(
        jogador.x,
        jogador.y,
        jogador.largura,
        jogador.altura
    );

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(jogador.x + 8, jogador.y + 8, 7, 7);
    ctx.fillRect(jogador.x + 25, jogador.y + 8, 7, 7);
}

// Cria e desenha os obstáculos
function desenharObstaculos() {
    ctx.fillStyle = "#ff477e";

    obstaculos.forEach(obstaculo => {
        ctx.fillRect(
            obstaculo.x,
            obstaculo.y,
            obstaculo.largura,
            obstaculo.altura
        );
    });
}

// Move o jogador
function moverJogador() {
    if (teclas["ArrowLeft"] || teclas["a"]) {
        jogador.x -= jogador.velocidade;
    }

    if (teclas["ArrowRight"] || teclas["d"]) {
        jogador.x += jogador.velocidade;
    }

    // Impede que o personagem saia da tela
    jogador.x = Math.max(
        0,
        Math.min(canvas.width - jogador.largura, jogador.x)
    );
}

// Gera obstáculos em posições aleatórias
function criarObstaculo() {
    const largura = 30 + Math.random() * 30;

    obstaculos.push({
        x: Math.random() * (canvas.width - largura),
        y: -40,
        largura: largura,
        altura: 30
    });
}

// Verifica se o jogador bateu em um obstáculo
function houveColisao(a, b) {
    return (
        a.x < b.x + b.largura &&
        a.x + a.largura > b.x &&
        a.y < b.y + b.altura &&
        a.y + a.altura > b.y
    );
}

// Encerra a partida
function fimDeJogo() {
    jogando = false;

    recorde = Math.max(recorde, pontos);
    recordeTexto.textContent = recorde;

    mensagem.textContent =
        "Fim de jogo! Você fez " + pontos + " pontos.";

    botao.textContent = "Jogar novamente";

    if (animacao !== null) {
        cancelAnimationFrame(animacao);
        animacao = null;
    }

    desenharTelaFinal();
}

// Desenha a tela de fim de jogo
function desenharTelaFinal() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "bold 30px Arial";
    ctx.fillText("FIM DE JOGO", canvas.width / 2, 220);

    ctx.font = "20px Arial";
    ctx.fillText(
        "Pontos: " + pontos,
        canvas.width / 2,
        265
    );
}

// Atualiza o jogo a cada quadro
function atualizar() {
    if (!jogando) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moverJogador();

    const agora = Date.now();

    if (agora - ultimoObstaculo > 750) {
        criarObstaculo();
        ultimoObstaculo = agora;
    }

    obstaculos.forEach(obstaculo => {
        obstaculo.y += velocidadeObstaculos;
    });

    // Remove obstáculos que saíram da tela
    const quantidadeAntes = obstaculos.length;

    obstaculos = obstaculos.filter(
        obstaculo => obstaculo.y < canvas.height
    );

    // Cada obstáculo que passa rende um ponto
    pontos += quantidadeAntes - obstaculos.length;
    pontosTexto.textContent = pontos;

    // Aumenta a dificuldade aos poucos
    velocidadeObstaculos = 3 + Math.floor(pontos / 10) * 0.5;

    desenharJogador();
    desenharObstaculos();

    // Verifica colisões
    for (const obstaculo of obstaculos) {
        if (houveColisao(jogador, obstaculo)) {
            fimDeJogo();
            return;
        }
    }

    animacao = requestAnimationFrame(atualizar);
}

// Começa ou reinicia o jogo
function iniciarJogo() {
    if (animacao !== null) {
        cancelAnimationFrame(animacao);
    }

    jogador.x = 180;
    obstaculos = [];
    pontos = 0;
    velocidadeObstaculos = 3;
    ultimoObstaculo = Date.now();

    pontosTexto.textContent = "0";
    mensagem.textContent = "Desvie e tente fazer muitos pontos!";

    botao.textContent = "Reiniciar";
    jogando = true;

    atualizar();
}

// Captura as teclas pressionadas
document.addEventListener("keydown", function(evento) {
    const tecla = evento.key.toLowerCase();

    if (
        ["arrowleft", "arrowright", " "].includes(tecla)
    ) {
        evento.preventDefault();
    }

    teclas[evento.key] = true;
    teclas[tecla] = true;
});

document.addEventListener("keyup", function(evento) {
    delete teclas[evento.key];
    delete teclas[evento.key.toLowerCase()];
});

botao.addEventListener("click", iniciarJogo);

// Tela inicial
ctx.fillStyle = "#72f1ff";
ctx.textAlign = "center";
ctx.font = "bold 22px Arial";
ctx.fillText("Prepare-se!", canvas.width / 2, 240);

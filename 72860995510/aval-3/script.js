
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const finalScore = document.getElementById("finalScore");

const telaInicial = document.getElementById("telaInicial");
const gameOver = document.getElementById("gameOver");

// Configurações do jogo
const largura = canvas.width;
const altura = canvas.height;

let passaro;
let canos;
let pontuacao;
let gravidade = 0.4;
let impulso = -7;
let velocidadeCanos = 2.5;
let intervaloCanos = 100;
let contador = 0;

let jogoAtivo = false;
let animacao;

// Passaro
function criarPassaro() {
    return {
        x: 80,
        y: 250,
        largura: 30,
        altura: 25,
        velocidade: 0
    };
}

// Desenha o pássaro
function desenharPassaro() {
    ctx.fillStyle = "#facc15";

    ctx.beginPath();
    ctx.ellipse(
        passaro.x,
        passaro.y,
        17,
        13,
        0,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Asa
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.ellipse(
        passaro.x - 5,
        passaro.y + 3,
        8,
        5,
        0,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Olho
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(passaro.x + 8, passaro.y - 5, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(passaro.x + 10, passaro.y - 5, 2, 0, Math.PI * 2);
    ctx.fill();

    // Bico
    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.moveTo(passaro.x + 15, passaro.y);
    ctx.lineTo(passaro.x + 27, passaro.y + 4);
    ctx.lineTo(passaro.x + 15, passaro.y + 7);
    ctx.fill();
}

// Desenha o cenário
function desenharCenario() {
    // Céu
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, largura, altura);

    // Nuvens
    ctx.fillStyle = "rgba(255,255,255,0.7)";

    ctx.beginPath();
    ctx.arc(80, 100, 20, 0, Math.PI * 2);
    ctx.arc(105, 100, 25, 0, Math.PI * 2);
    ctx.arc(130, 100, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(260, 180, 18, 0, Math.PI * 2);
    ctx.arc(285, 180, 23, 0, Math.PI * 2);
    ctx.arc(310, 180, 18, 0, Math.PI * 2);
    ctx.fill();

    // Chão
    ctx.fillStyle = "#ded895";
    ctx.fillRect(0, altura - 25, largura, 25);

    ctx.fillStyle = "#84c341";
    ctx.fillRect(0, altura - 30, largura, 8);
}

// Cria canos
function criarCano() {
    const abertura = 155;
    const alturaMinima = 70;
    const alturaMaxima = altura - abertura - 100;

    const alturaTopo = Math.floor(
        Math.random() * (alturaMaxima - alturaMinima + 1)
    ) + alturaMinima;

    canos.push({
        x: largura,
        largura: 55,
        alturaTopo: alturaTopo,
        abertura: abertura,
        pontuado: false
    });
}

// Desenha os canos
function desenharCanos() {
    canos.forEach(cano => {
        ctx.fillStyle = "#22c55e";
        ctx.strokeStyle = "#15803d";
        ctx.lineWidth = 3;

        // Cano superior
        ctx.fillRect(
            cano.x,
            0,
            cano.largura,
            cano.alturaTopo
        );

        ctx.strokeRect(
            cano.x,
            -1,
            cano.largura,
            cano.alturaTopo + 1
        );

        // Cano inferior
        const inicioInferior = cano.alturaTopo + cano.abertura;

        ctx.fillRect(
            cano.x,
            inicioInferior,
            cano.largura,
            altura - inicioInferior - 25
        );

        ctx.strokeRect(
            cano.x,
            inicioInferior,
            cano.largura,
            altura - inicioInferior - 25
        );

        // Bordas dos canos
        ctx.fillStyle = "#16a34a";

        ctx.fillRect(
            cano.x - 4,
            cano.alturaTopo - 15,
            cano.largura + 8,
            15
        );

        ctx.fillRect(
            cano.x - 4,
            inicioInferior,
            cano.largura + 8,
            15
        );
    });
}

// Atualiza o jogo
function atualizar() {
    if (!jogoAtivo) return;

    // Gravidade
    passaro.velocidade += gravidade;
    passaro.y += passaro.velocidade;

    // Limites da tela
    if (
        passaro.y - 13 < 0 ||
        passaro.y + 13 > altura - 30
    ) {
        terminarJogo();
        return;
    }

    // Criação dos canos
    contador++;

    if (contador >= intervaloCanos) {
        criarCano();
        contador = 0;
    }

    // Movimento dos canos
    canos.forEach(cano => {
        cano.x -= velocidadeCanos;

        // Pontuação
        if (
            !cano.pontuado &&
            cano.x + cano.largura < passaro.x
        ) {
            pontuacao++;
            scoreElement.textContent = pontuacao;
            cano.pontuado = true;
        }

        // Colisão horizontal
        const colideHorizontal =
            passaro.x + 13 > cano.x &&
            passaro.x - 13 < cano.x + cano.largura;

        // Colisão vertical
        const colideVertical =
            passaro.y - 11 < cano.alturaTopo ||
            passaro.y + 11 > cano.alturaTopo + cano.abertura;

        if (colideHorizontal && colideVertical) {
            terminarJogo();
        }
    });

    // Remove canos fora da tela
    canos = canos.filter(
        cano => cano.x + cano.largura > 0
    );
}

// Desenha tudo
function desenhar() {
    desenharCenario();
    desenharCanos();
    desenharPassaro();
}

// Loop principal
function loop() {
    if (!jogoAtivo) return;

    atualizar();

    if (!jogoAtivo) return;

    desenhar();

    animacao = requestAnimationFrame(loop);
}

// Faz o pássaro voar
function voar() {
    if (!jogoAtivo) return;

    passaro.velocidade = impulso;
}

// Inicia o jogo
function iniciarJogo() {
    cancelAnimationFrame(animacao);

    passaro = criarPassaro();
    canos = [];
    pontuacao = 0;
    contador = 0;

    scoreElement.textContent = 0;

    jogoAtivo = true;

    telaInicial.classList.add("escondido");
    gameOver.classList.add("escondido");

    desenhar();
    loop();
}

// Finaliza o jogo
function terminarJogo() {
    jogoAtivo = false;

    cancelAnimationFrame(animacao);

    finalScore.textContent = pontuacao;

    gameOver.classList.remove("escondido");
}

// Controles do teclado
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();

        if (jogoAtivo) {
            voar();
        } else if (telaInicial.classList.contains("escondido")) {
            iniciarJogo();
        }
    }
});

// Controle por clique ou toque
canvas.addEventListener("pointerdown", function() {
    voar();
});

// Tela inicial
desenharCenario();
passaro = criarPassaro();
canos = [];
desenharPassaro();

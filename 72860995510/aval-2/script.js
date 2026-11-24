
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const mensagem = document.getElementById("mensagem");

const tamanho = 20;
const quantidade = canvas.width / tamanho;

let cobra;
let comida;
let direcao;
let proximaDirecao;
let pontuacao;
let velocidade;
let intervalo;
let jogoAtivo = false;

// Inicia o jogo
function iniciarJogo() {
    clearInterval(intervalo);

    cobra = [
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

    mensagem.style.display = "none";

    jogoAtivo = true;

    desenhar();

    intervalo = setInterval(atualizar, velocidade);
}

// Cria comida em posição aleatória
function criarComida() {
    do {
        comida = {
            x: Math.floor(Math.random() * quantidade),
            y: Math.floor(Math.random() * quantidade)
        };
    } while (
        cobra.some(parte =>
            parte.x === comida.x &&
            parte.y === comida.y
        )
    );
}

// Desenha a cobra e a comida
function desenhar() {
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha comida
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

    // Desenha cobra
    cobra.forEach((parte, index) => {
        ctx.fillStyle = index === 0 ? "#4ade80" : "#22c55e";

        ctx.fillRect(
            parte.x * tamanho + 1,
            parte.y * tamanho + 1,
            tamanho - 2,
            tamanho - 2
        );
    });
}

// Atualiza o jogo
function atualizar() {
    direcao = proximaDirecao;

    const cabeca = { ...cobra[0] };

    if (direcao === "UP") cabeca.y--;
    if (direcao === "DOWN") cabeca.y++;
    if (direcao === "LEFT") cabeca.x--;
    if (direcao === "RIGHT") cabeca.x++;

    const comeu = (
        cabeca.x === comida.x &&
        cabeca.y === comida.y
    );

    // Verifica colisão com as paredes
    if (
        cabeca.x < 0 ||
        cabeca.x >= quantidade ||
        cabeca.y < 0 ||
        cabeca.y >= quantidade
    ) {
        fimDeJogo();
        return;
    }

    // Verifica colisão com o próprio corpo
    const corpoVerificado = comeu
        ? cobra
        : cobra.slice(0, -1);

    if (corpoVerificado.some(parte =>
        parte.x === cabeca.x &&
        parte.y === cabeca.y
    )) {
        fimDeJogo();
        return;
    }

    cobra.unshift(cabeca);

    if (comeu) {
        pontuacao += 10;
        scoreElement.textContent = pontuacao;

        criarComida();

        // Aumenta a velocidade
        if (velocidade > 60) {
            velocidade -= 5;
            clearInterval(intervalo);
            intervalo = setInterval(atualizar, velocidade);
        }
    } else {
        cobra.pop();
    }

    desenhar();
}

// Movimentação
function mover(novaDirecao) {
    if (!jogoAtivo) return;

    const opostas = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT"
    };

    if (opostas[novaDirecao] === direcao) {
        return;
    }

    proximaDirecao = novaDirecao;
}

// Teclado
document.addEventListener("keydown", function(event) {
    const teclas = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
        w: "UP",
        s: "DOWN",
        a: "LEFT",
        d: "RIGHT"
    };

    if (teclas[event.key]) {
        event.preventDefault();
        mover(teclas[event.key]);
    }
});

// Fim de jogo
function fimDeJogo() {
    clearInterval(intervalo);
    jogoAtivo = false;

    mensagem.innerHTML = `
        <h2>Game Over!</h2>
        <p>Sua pontuação: ${pontuacao}</p>
        <button onclick="iniciarJogo()">Jogar Novamente</button>
    `;

    mensagem.style.display = "block";
}


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const tamanho = 20;

let cobrinha;
let comida;
let direcao;
let proximaDirecao;
let pontuacao = 0;
let jogo;
let rodando = false;

function iniciarJogo() {
    clearInterval(jogo);

    cobrinha = [
        { x: 200, y: 200 },
        { x: 180, y: 200 },
        { x: 160, y: 200 }
    ];

    direcao = "direita";
    proximaDirecao = "direita";
    pontuacao = 0;
    rodando = true;

    document.getElementById("score").textContent = pontuacao;
    document.getElementById("mensagem").textContent = "Boa sorte!";
    document.getElementById("iniciar").textContent = "Reiniciar";

    criarComida();
    desenhar();

    jogo = setInterval(atualizarJogo, 120);
}

function criarComida() {
    do {
        comida = {
            x: Math.floor(Math.random() * (canvas.width / tamanho)) * tamanho,
            y: Math.floor(Math.random() * (canvas.height / tamanho)) * tamanho
        };
    } while (cobrinha.some(parte =>
        parte.x === comida.x && parte.y === comida.y
    ));
}

function desenhar() {
    ctx.fillStyle = "#d1fae5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar comida
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(
        comida.x + tamanho / 2,
        comida.y + tamanho / 2,
        tamanho / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Desenhar cobrinha
    cobrinha.forEach((parte, index) => {
        ctx.fillStyle = index === 0 ? "#15803d" : "#22c55e";
        ctx.fillRect(
            parte.x + 1,
            parte.y + 1,
            tamanho - 2,
            tamanho - 2
        );
    });
}

function atualizarJogo() {
    direcao = proximaDirecao;

    const cabeca = { ...cobrinha[0] };

    if (direcao === "direita") cabeca.x += tamanho;
    if (direcao === "esquerda") cabeca.x -= tamanho;
    if (direcao === "cima") cabeca.y -= tamanho;
    if (direcao === "baixo") cabeca.y += tamanho;

    const comeu = cabeca.x === comida.x && cabeca.y === comida.y;

    // Verificar colisão com as paredes
    if (
        cabeca.x < 0 ||
        cabeca.x >= canvas.width ||
        cabeca.y < 0 ||
        cabeca.y >= canvas.height
    ) {
        fimDeJogo();
        return;
    }

    // Verificar colisão com o próprio corpo
    const corpo = comeu ? cobrinha : cobrinha.slice(0, -1);

    if (corpo.some(parte =>
        parte.x === cabeca.x && parte.y === cabeca.y
    )) {
        fimDeJogo();
        return;
    }

    cobrinha.unshift(cabeca);

    if (comeu) {
        pontuacao += 10;
        document.getElementById("score").textContent = pontuacao;
        criarComida();
    } else {
        cobrinha.pop();
    }

    desenhar();
}

function fimDeJogo() {
    clearInterval(jogo);
    rodando = false;

    document.getElementById("mensagem").textContent =
        "Fim de jogo! Sua pontuação foi: " + pontuacao;

    document.getElementById("iniciar").textContent = "Jogar novamente";
}

document.addEventListener("keydown", function(event) {
    const teclas = {
        ArrowUp: "cima",
        ArrowDown: "baixo",
        ArrowLeft: "esquerda",
        ArrowRight: "direita"
    };

    const novaDirecao = teclas[event.key];

    if (!novaDirecao || !rodando) return;

    event.preventDefault();

    const movimentosOpostos = {
        cima: "baixo",
        baixo: "cima",
        esquerda: "direita",
        direita: "esquerda"
    };

    if (novaDirecao !== movimentosOpostos[direcao]) {
        proximaDirecao = novaDirecao;
    }
});

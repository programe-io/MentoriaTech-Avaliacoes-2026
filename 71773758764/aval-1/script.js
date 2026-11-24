
const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const pontos = document.getElementById("pontos");

const tamanho = 20;

let cobra;
let comida;
let direcao;
let pontuacao;
let fimDeJogo;
let intervalo;

function iniciar() {
    cobra = [
        {x: 200, y: 200},
        {x: 180, y: 200},
        {x: 160, y: 200}
    ];

    direcao = "direita";
    pontuacao = 0;
    fimDeJogo = false;

    pontos.textContent = pontuacao;
    criarComida();

    clearInterval(intervalo);
    intervalo = setInterval(atualizar, 130);
}

function criarComida() {
    comida = {
        x: Math.floor(Math.random() * 20) * tamanho,
        y: Math.floor(Math.random() * 20) * tamanho
    };
}

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" && direcao !== "baixo")
        direcao = "cima";

    if (event.key === "ArrowDown" && direcao !== "cima")
        direcao = "baixo";

    if (event.key === "ArrowLeft" && direcao !== "direita")
        direcao = "esquerda";

    if (event.key === "ArrowRight" && direcao !== "esquerda")
        direcao = "direita";
});

function atualizar() {
    if (fimDeJogo) return;

    let cabeca = {...cobra[0]};

    if (direcao === "cima") cabeca.y -= tamanho;
    if (direcao === "baixo") cabeca.y += tamanho;
    if (direcao === "esquerda") cabeca.x -= tamanho;
    if (direcao === "direita") cabeca.x += tamanho;

    if (
        cabeca.x < 0 ||
        cabeca.x >= canvas.width ||
        cabeca.y < 0 ||
        cabeca.y >= canvas.height ||
        cobra.some(p => p.x === cabeca.x && p.y === cabeca.y)
    ) {
        fimDeJogo = true;
        clearInterval(intervalo);
        alert("Fim de jogo! Pontuação: " + pontuacao);
        return;
    }

    cobra.unshift(cabeca);

    if (cabeca.x === comida.x && cabeca.y === comida.y) {
        pontuacao += 10;
        pontos.textContent = pontuacao;
        criarComida();
    } else {
        cobra.pop();
    }

    desenhar();
}

function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(comida.x, comida.y, tamanho, tamanho);

    cobra.forEach((parte, index) => {
        ctx.fillStyle = index === 0 ? "#00ff88" : "#00cc70";
        ctx.fillRect(parte.x, parte.y, tamanho - 2, tamanho - 2);
    });
}

function reiniciar() {
    iniciar();
    desenhar();
}

iniciar();
desenhar();

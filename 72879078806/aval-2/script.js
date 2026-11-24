
const canvas = document.getElementById("tabuleiro");
const ctx = canvas.getContext("2d");

const tamanho = 20;
const quantidade = canvas.width / tamanho;

let cobrinha;
let comida;
let direcao;
let proximaDirecao;
let pontuacao = 0;
let velocidade = 150;
let intervalo;
let jogando = false;

let recorde = Number(localStorage.getItem("recordeSnake")) || 0;

document.getElementById("recorde").textContent = recorde;

function iniciarJogo() {

    clearInterval(intervalo);

    cobrinha = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    direcao = "direita";
    proximaDirecao = "direita";

    pontuacao = 0;
    velocidade = 150;
    jogando = true;

    document.getElementById("pontuacao").textContent = pontuacao;
    document.getElementById("mensagem").textContent = "Boa sorte!";

    gerarComida();
    desenhar();

    intervalo = setInterval(atualizar, velocidade);
}

function gerarComida() {

    do {
        comida = {
            x: Math.floor(Math.random() * quantidade),
            y: Math.floor(Math.random() * quantidade)
        };
    } while (cobrinha.some(parte =>
        parte.x === comida.x && parte.y === comida.y
    ));
}

function desenhar() {

    ctx.fillStyle = "#0b1419";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar a comida
    ctx.fillStyle = "#ff4444";
    ctx.fillRect(
        comida.x * tamanho,
        comida.y * tamanho,
        tamanho - 2,
        tamanho - 2
    );

    // Desenhar a cobrinha
    cobrinha.forEach((parte, index) => {

        ctx.fillStyle = index === 0 ? "#00ff88" : "#00b86b";

        ctx.fillRect(
            parte.x * tamanho,
            parte.y * tamanho,
            tamanho - 2,
            tamanho - 2
        );
    });
}

function atualizar() {

    direcao = proximaDirecao;

    const cabeca = { ...cobrinha[0] };

    if (direcao === "cima") cabeca.y--;
    if (direcao === "baixo") cabeca.y++;
    if (direcao === "esquerda") cabeca.x--;
    if (direcao === "direita") cabeca.x++;

    // Verificar colisão com as paredes
    if (
        cabeca.x < 0 ||
        cabeca.x >= quantidade ||
        cabeca.y < 0 ||
        cabeca.y >= quantidade
    ) {
        fimDeJogo();
        return;
    }

    // Verificar se comeu a comida
    const comeu = cabeca.x === comida.x && cabeca.y === comida.y;

    // Permite entrar na posição da cauda quando ela vai se mover
    const partesVerificadas = comeu
        ? cobrinha
        : cobrinha.slice(0, -1);

    // Verificar colisão com o próprio corpo
    if (partesVerificadas.some(parte =>
        parte.x === cabeca.x && parte.y === cabeca.y
    )) {
        fimDeJogo();
        return;
    }

    cobrinha.unshift(cabeca);

    if (comeu) {

        pontuacao += 10;

        document.getElementById("pontuacao").textContent = pontuacao;

        gerarComida();

        // Aumentar a velocidade
        if (velocidade > 60) {
            velocidade -= 5;

            clearInterval(intervalo);
            intervalo = setInterval(atualizar, velocidade);
        }

    } else {

        cobrinha.pop();

    }

    desenhar();
}

function mover(novaDirecao) {

    if (!jogando) return;

    // Impedir que a cobrinha volte na direção contrária
    if (
        novaDirecao === "cima" && direcao !== "baixo" ||
        novaDirecao === "baixo" && direcao !== "cima" ||
        novaDirecao === "esquerda" && direcao !== "direita" ||
        novaDirecao === "direita" && direcao !== "esquerda"
    ) {
        proximaDirecao = novaDirecao;
    }
}

document.addEventListener("keydown", function(event) {

    const teclas = {
        ArrowUp: "cima",
        ArrowDown: "baixo",
        ArrowLeft: "esquerda",
        ArrowRight: "direita"
    };

    if (teclas[event.key]) {
        event.preventDefault();
        mover(teclas[event.key]);
    }
});

function fimDeJogo() {

    clearInterval(intervalo);
    jogando = false;

    document.getElementById("mensagem").textContent =
        "Game Over! Pontuação: " + pontuacao;

    if (pontuacao > recorde) {

        recorde = pontuacao;

        localStorage.setItem("recordeSnake", recorde);

        document.getElementById("recorde").textContent = recorde;
    }
}


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const recordeElement = document.getElementById("recorde");
const fantasmasElement = document.getElementById("fantasmas");

const mensagem = document.getElementById("mensagem");
const gameOver = document.getElementById("gameOver");
const pontuacaoFinal = document.getElementById("pontuacaoFinal");

const tamanho = 20;
const quantidade = canvas.width / tamanho;

let cobra;
let comida;
let fantasmas = [];

let direcao;
let proximaDirecao;

let pontuacao = 0;
let velocidade = 140;

let jogoAtivo = false;
let intervalo;
let temporizadorFantasma;

let recorde = Number(localStorage.getItem("snakeRecorde")) || 0;

recordeElement.textContent = recorde;

// Posição aleatória
function posicaoAleatoria() {
    return {
        x: Math.floor(Math.random() * quantidade),
        y: Math.floor(Math.random() * quantidade)
    };
}

// Verifica posições ocupadas
function posicaoOcupada(posicao) {
    return cobra.some(parte =>
        parte.x === posicao.x &&
        parte.y === posicao.y
    ) || fantasmas.some(espirito =>
        espirito.corpo.some(parte =>
            parte.x === posicao.x &&
            parte.y === posicao.y
        )
    );
}

// Cria comida
function criarComida() {
    let posicao;

    do {
        posicao = posicaoAleatoria();
    } while (posicaoOcupada(posicao));

    comida = posicao;
}

// Cria fantasma
function criarFantasma() {
    if (!jogoAtivo || fantasmas.length >= 3) return;

    let posicao;
    let tentativas = 0;

    do {
        posicao = posicaoAleatoria();
        tentativas++;
    } while (
        posicaoOcupada(posicao) &&
        tentativas < 100
    );

    if (posicaoOcupada(posicao)) return;

    const fantasma = {
        corpo: [
            posicao,
            { x: posicao.x - 1, y: posicao.y },
            { x: posicao.x - 2, y: posicao.y }
        ],
        duracao: 0,
        movimentos: 0
    };

    if (fantasma.corpo.some(parte =>
        parte.x < 0 || parte.x >= quantidade
    )) {
        fantasma.corpo = [
            posicao,
            { x: posicao.x + 1, y: posicao.y },
            { x: posicao.x + 2, y: posicao.y }
        ];

        if (fantasma.corpo.some(parte =>
            parte.x >= quantidade
        )) return;
    }

    fantasmas.push(fantasma);

    atualizarStatus();
}

// Desenha jogador
function desenharCobra() {
    cobra.forEach((parte, index) => {
        ctx.fillStyle = index === 0 ? "#4ade80" : "#16a34a";

        ctx.beginPath();

        ctx.roundRect(
            parte.x * tamanho + 1,
            parte.y * tamanho + 1,
            tamanho - 2,
            tamanho - 2,
            5
        );

        ctx.fill();
    });
}

// Desenha fantasmas
function desenharFantasmas() {
    fantasmas.forEach(espirito => {
        espirito.corpo.forEach((parte, index) => {
            ctx.globalAlpha = 0.55;
            ctx.fillStyle = "#a78bfa";

            ctx.beginPath();

            ctx.arc(
                parte.x * tamanho + 10,
                parte.y * tamanho + 10,
                9,
                0,
                Math.PI * 2
            );

            ctx.fill();

            if (index === 0) {
                ctx.globalAlpha = 1;
                ctx.fillStyle = "white";

                ctx.fillRect(
                    parte.x * tamanho + 5,
                    parte.y * tamanho + 6,
                    4,
                    4
                );

                ctx.fillRect(
                    parte.x * tamanho + 13,
                    parte.y * tamanho + 6,
                    4,
                    4
                );
            }
        });
    });

    ctx.globalAlpha = 1;
}

// Desenha comida
function desenharComida() {
    ctx.fillStyle = "#ef4444";

    ctx.beginPath();

    ctx.arc(
        comida.x * tamanho + 10,
        comida.y * tamanho + 10,
        8,
        0,
        Math.PI * 2
    );

    ctx.fill();
}

// Desenha cenário
function desenhar() {
    ctx.fillStyle = "#080817";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#17172e";

    for (let i = 0; i <= quantidade; i++) {
        ctx.beginPath();
        ctx.moveTo(i * tamanho, 0);
        ctx.lineTo(i * tamanho, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * tamanho);
        ctx.lineTo(canvas.width, i * tamanho);
        ctx.stroke();
    }

    desenharComida();
    desenharFantasmas();
    desenharCobra();
}

// Atualiza fantasmas
function moverFantasmas() {
    fantasmas.forEach(espirito => {
        espirito.duracao++;
        espirito.movimentos++;

        if (espirito.duracao > 90) return;
        if (espirito.movimentos < 2) return;

        espirito.movimentos = 0;

        const cabeca = espirito.corpo[0];
        const alvo = cobra[0];

        const dx = alvo.x - cabeca.x;
        const dy = alvo.y - cabeca.y;

        let movimento;

        if (Math.abs(dx) > Math.abs(dy)) {
            movimento = {
                x: dx > 0 ? 1 : -1,
                y: 0
            };
        } else {
            movimento = {
                x: 0,
                y: dy > 0 ? 1 : -1
            };
        }

        const novaCabeca = {
            x: cabeca.x + movimento.x,
            y: cabeca.y + movimento.y
        };

        // Fantasma atravessa paredes
        if (novaCabeca.x < 0) novaCabeca.x = quantidade - 1;
        if (novaCabeca.x >= quantidade) novaCabeca.x = 0;

        if (novaCabeca.y < 0) novaCabeca.y = quantidade - 1;
        if (novaCabeca.y >= quantidade) novaCabeca.y = 0;

        espirito.corpo.unshift(novaCabeca);
        espirito.corpo.pop();

        // Colisão com o jogador
        if (cobra.some(parte =>
            parte.x === novaCabeca.x &&
            parte.y === novaCabeca.y
        )) {
            fimDeJogo();
        }
    });

    fantasmas = fantasmas.filter(
        espirito => espirito.duracao <= 90
    );

    atualizarStatus();
}

// Atualiza status
function atualizarStatus() {
    fantasmasElement.textContent = fantasmas.length;
}

// Atualiza cobrinha
function atualizar() {
    if (!jogoAtivo) return;

    direcao = proximaDirecao;

    const cabeca = { ...cobra[0] };

    if (direcao === "UP") cabeca.y--;
    if (direcao === "DOWN") cabeca.y++;
    if (direcao === "LEFT") cabeca.x--;
    if (direcao === "RIGHT") cabeca.x++;

    const comeu =
        cabeca.x === comida.x &&
        cabeca.y === comida.y;

    // Colisão com parede
    if (
        cabeca.x < 0 ||
        cabeca.x >= quantidade ||
        cabeca.y < 0 ||
        cabeca.y >= quantidade
    ) {
        fimDeJogo();
        return;
    }

    // Colisão com o próprio corpo
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

    // Colisão com fantasmas
    if (fantasmas.some(espirito =>
        espirito.corpo.some(parte =>
            parte.x === cabeca.x &&
            parte.y === cabeca.y
        )
    )) {
        fimDeJogo();
        return;
    }

    cobra.unshift(cabeca);

    if (comeu) {
        pontuacao += 10;
        scoreElement.textContent = pontuacao;

        criarComida();

        if (velocidade > 65) {
            velocidade -= 3;

            clearInterval(intervalo);
            intervalo = setInterval(atualizar, velocidade);
        }
    } else {
        cobra.pop();
    }

    moverFantasmas();

    if (jogoAtivo) {
        desenhar();
    }
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

    if (opostas[novaDirecao] === direcao) return;

    proximaDirecao = novaDirecao;
}

// Teclado: WASD e setas
document.addEventListener("keydown", function(event) {
    const tecla = event.key.toLowerCase();

    const teclas = {
        arrowup: "UP",
        arrowdown: "DOWN",
        arrowleft: "LEFT",
        arrowright: "RIGHT",
        w: "UP",
        s: "DOWN",
        a: "LEFT",
        d: "RIGHT"
    };

    if (teclas[tecla]) {
        event.preventDefault();
        mover(teclas[tecla]);
    }
});

// Fim de jogo
function fimDeJogo() {
    if (!jogoAtivo) return;

    jogoAtivo = false;

    clearInterval(intervalo);
    clearTimeout(temporizadorFantasma);

    if (pontuacao > recorde) {
        recorde = pontuacao;

        localStorage.setItem("snakeRecorde", recorde);

        recordeElement.textContent = recorde;
    }

    // Mostra a pontuação final
    pontuacaoFinal.textContent = pontuacao;

    // Esconde tela inicial e mostra Game Over
    mensagem.classList.add("escondido");
    gameOver.classList.remove("escondido");
}

// Aparição dos fantasmas
function agendarFantasma() {
    if (!jogoAtivo) return;

    const tempo = 4000 + Math.random() * 5000;

    temporizadorFantasma = setTimeout(() => {
        if (jogoAtivo) {
            criarFantasma();
            agendarFantasma();
        }
    }, tempo);
}

// Iniciar ou reiniciar jogo
function iniciarJogo() {
    clearInterval(intervalo);
    clearTimeout(temporizadorFantasma);

    cobra = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    fantasmas = [];

    pontuacao = 0;
    velocidade = 140;

    direcao = "RIGHT";
    proximaDirecao = "RIGHT";

    jogoAtivo = true;

    scoreElement.textContent = 0;
    atualizarStatus();

    criarComida();

    mensagem.classList.add("escondido");
    gameOver.classList.add("escondido");

    desenhar();

    intervalo = setInterval(atualizar, velocidade);

    agendarFantasma();
}

// Desenha tela inicial
cobra = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
];

comida = { x: 15, y: 10 };

desenhar();

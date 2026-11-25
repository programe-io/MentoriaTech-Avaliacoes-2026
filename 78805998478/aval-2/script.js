
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

const tamanho = 40;
const colunas = 20;
const linhas = 12;

let mundo = [];

let jogador = {
    x: 5,
    y: 4,
    cor: "red"
};

let blocoSelecionado = 1;

// Criar mundo
for (let y = 0; y < linhas; y++) {
    mundo[y] = [];

    for (let x = 0; x < colunas; x++) {
        if (y < 5) {
            mundo[y][x] = 0;
        } else if (y === 5) {
            mundo[y][x] = 1;
        } else if (y < 8) {
            mundo[y][x] = 2;
        } else {
            mundo[y][x] = 3;
        }
    }
}

// Cores dos blocos
const cores = {
    0: "#87ceeb",
    1: "#36a832",
    2: "#96552c",
    3: "#777777"
};

// Desenhar jogo
function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < linhas; y++) {
        for (let x = 0; x < colunas; x++) {

            let bloco = mundo[y][x];

            ctx.fillStyle = cores[bloco];

            ctx.fillRect(
                x * tamanho,
                y * tamanho,
                tamanho,
                tamanho
            );

            if (bloco !== 0) {
                ctx.strokeStyle = "#333";
                ctx.strokeRect(
                    x * tamanho,
                    y * tamanho,
                    tamanho,
                    tamanho
                );
            }
        }
    }

    // Jogador
    ctx.fillStyle = jogador.cor;

    ctx.fillRect(
        jogador.x * tamanho + 8,
        jogador.y * tamanho + 5,
        24,
        30
    );

    // Olhos
    ctx.fillStyle = "white";
    ctx.fillRect(
        jogador.x * tamanho + 12,
        jogador.y * tamanho + 12,
        5,
        5
    );

    ctx.fillRect(
        jogador.x * tamanho + 23,
        jogador.y * tamanho + 12,
        5,
        5
    );
}

// Movimentação
document.addEventListener("keydown", function(e) {

    let nx = jogador.x;
    let ny = jogador.y;

    if (e.key === "ArrowUp" || e.key === "w") ny--;
    if (e.key === "ArrowDown" || e.key === "s") ny++;
    if (e.key === "ArrowLeft" || e.key === "a") nx--;
    if (e.key === "ArrowRight" || e.key === "d") nx++;

    if (
        nx >= 0 && nx < colunas &&
        ny >= 0 && ny < linhas &&
        mundo[ny][nx] === 0
    ) {
        jogador.x = nx;
        jogador.y = ny;
    }

    desenhar();
});

// Selecionar bloco
function selecionar(tipo) {
    blocoSelecionado = tipo;
}

// Quebrar e colocar blocos
canvas.addEventListener("click", function(e) {

    const rect = canvas.getBoundingClientRect();

    const x = Math.floor(
        (e.clientX - rect.left) * canvas.width / rect.width / tamanho
    );

    const y = Math.floor(
        (e.clientY - rect.top) * canvas.height / rect.height / tamanho
    );

    if (x >= 0 && x < colunas && y >= 0 && y < linhas) {
        mundo[y][x] = 0;
    }

    desenhar();
});

canvas.addEventListener("contextmenu", function(e) {
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    const x = Math.floor(
        (e.clientX - rect.left) * canvas.width / rect.width / tamanho
    );

    const y = Math.floor(
        (e.clientY - rect.top) * canvas.height / rect.height / tamanho
    );

    if (
        x >= 0 && x < colunas &&
        y >= 0 && y < linhas &&
        mundo[y][x] === 0 &&
        !(x === jogador.x && y === jogador.y)
    ) {
        mundo[y][x] = blocoSelecionado;
    }

    desenhar();
});

// Iniciar
desenhar();


const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const tamanho = 40;
const colunas = 10;
const linhas = 12;

let jogador;
let moedas;
let pontos;
let terminou = false;

// Obstáculos do mapa
const paredes = [
    [2,1], [3,1], [4,1],
    [6,2], [6,3],
    [1,3], [2,3],
    [3,5], [4,5], [5,5],
    [8,4], [8,5],
    [1,7], [2,7],
    [5,7], [6,7],
    [7,9], [8,9],
    [3,10], [4,10]
];

function reiniciar() {
    jogador = {x: 0, y: 0};
    pontos = 0;
    terminou = false;

    moedas = [];

    while (moedas.length < 10) {
        let moeda = {
            x: Math.floor(Math.random() * colunas),
            y: Math.floor(Math.random() * linhas)
        };

        if (
            !parede(moeda.x, moeda.y) &&
            !(moeda.x === 0 && moeda.y === 0) &&
            !moedas.some(m => m.x === moeda.x && m.y === moeda.y)
        ) {
            moedas.push(moeda);
        }
    }

    atualizarPlacar();
    desenhar();
}

function parede(x, y) {
    return paredes.some(p => p[0] === x && p[1] === y);
}

function atualizarPlacar() {
    document.getElementById("pontos").textContent = pontos;
}

function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar chão
    for (let y = 0; y < linhas; y++) {
        for (let x = 0; x < colunas; x++) {

            ctx.fillStyle = "#286344";
            ctx.fillRect(x * tamanho, y * tamanho, tamanho, tamanho);

            ctx.strokeStyle = "#3c8055";
            ctx.strokeRect(x * tamanho, y * tamanho, tamanho, tamanho);

            // Paredes
            if (parede(x, y)) {
                ctx.fillStyle = "#53616a";
                ctx.fillRect(
                    x * tamanho + 2,
                    y * tamanho + 2,
                    tamanho - 4,
                    tamanho - 4
                );

                ctx.font = "25px Arial";
                ctx.fillText("🪨", x * tamanho + 6, y * tamanho + 30);
            }
        }
    }

    // Desenhar moedas
    moedas.forEach(m => {
        ctx.font = "27px Arial";
        ctx.fillText(
            "🪙",
            m.x * tamanho + 6,
            m.y * tamanho + 30
        );
    });

    // Desenhar jogador
    ctx.font = "30px Arial";
    ctx.fillText(
        "🧑",
        jogador.x * tamanho + 5,
        jogador.y * tamanho + 32
    );

    if (terminou) {
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(0, 170, 400, 130);

        ctx.fillStyle = "#ffd700";
        ctx.font = "bold 27px Arial";
        ctx.textAlign = "center";
        ctx.fillText("🏆 VOCÊ VENCEU!", 200, 225);

        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.fillText("Encontrou todos os tesouros!", 200, 260);

        ctx.textAlign = "left";
    }
}

function movimentar(dx, dy) {
    if (terminou) return;

    let novoX = jogador.x + dx;
    let novoY = jogador.y + dy;

    // Limites do mapa
    if (
        novoX < 0 || novoX >= colunas ||
        novoY < 0 || novoY >= linhas
    ) {
        return;
    }

    // Não atravessar pedras
    if (parede(novoX, novoY)) {
        return;
    }

    jogador.x = novoX;
    jogador.y = novoY;

    // Coletar moedas
    let indice = moedas.findIndex(m =>
        m.x === jogador.x && m.y === jogador.y
    );

    if (indice !== -1) {
        moedas.splice(indice, 1);
        pontos++;
        atualizarPlacar();
    }

    // Vitória
    if (pontos === 10) {
        terminou = true;
    }

    desenhar();
}

// Controles do teclado
document.addEventListener("keydown", function(event) {

    const teclas = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight"
    ];

    if (teclas.includes(event.key)) {
        event.preventDefault();
    }

    switch(event.key) {
        case "ArrowUp":
            movimentar(0, -1);
            break;

        case "ArrowDown":
            movimentar(0, 1);
            break;

        case "ArrowLeft":
            movimentar(-1, 0);
            break;

        case "ArrowRight":
            movimentar(1, 0);
            break;
    }
});

reiniciar();

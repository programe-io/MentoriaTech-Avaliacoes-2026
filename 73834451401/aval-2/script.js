
const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const dinheiroEl = document.getElementById("dinheiro");
const vidaEl = document.getElementById("vida");
const veiculoEl = document.getElementById("veiculo");

const mundo = {
    largura: 1800,
    altura: 1400
};

const jogador = {
    x: 400,
    y: 300,
    tamanho: 22,
    velocidade: 3,
    dinheiro: 500,
    vida: 100,
    carro: null
};

const teclas = {};
let cameraX = 0;
let cameraY = 0;

const carros = [
    { x: 320, y: 250, cor: "#e63946" },
    { x: 500, y: 350, cor: "#2878d0" },
    { x: 750, y: 450, cor: "#f2c14e" },
    { x: 900, y: 300, cor: "#dddddd" },
    { x: 1100, y: 650, cor: "#9b59b6" }
];

const predios = [];

for (let y = 80; y < mundo.altura; y += 240) {
    for (let x = 80; x < mundo.largura; x += 280) {
        predios.push({
            x,
            y,
            largura: 130,
            altura: 100,
            cor: ["#777", "#9a8068", "#686b78"][
                Math.floor(Math.random() * 3)
            ]
        });
    }
}

window.addEventListener("keydown", (e) => {
    teclas[e.key.toLowerCase()] = true;

    if (["ArrowUp", "ArrowDown", "ArrowLeft",
         "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
    }

    if (e.key.toLowerCase() === "e" && !e.repeat) {
        alternarCarro();
    }
});

window.addEventListener("keyup", (e) => {
    teclas[e.key.toLowerCase()] = false;
});

function alternarCarro() {
    if (jogador.carro) {
        jogador.x = jogador.carro.x + 35;
        jogador.y = jogador.carro.y;
        jogador.carro = null;
        return;
    }

    const carroProximo = carros.find(carro => {
        const dx = carro.x - jogador.x;
        const dy = carro.y - jogador.y;
        return Math.hypot(dx, dy) < 55;
    });

    if (carroProximo) {
        jogador.carro = carroProximo;
    }
}

function atualizar() {
    let velocidade = jogador.velocidade;

    if (teclas[" "] && !jogador.carro) {
        velocidade = 5;
    }

    if (jogador.carro) {
        velocidade = 6;
    }

    let dx = 0;
    let dy = 0;

    if (teclas["w"] || teclas["arrowup"]) dy -= velocidade;
    if (teclas["s"] || teclas["arrowdown"]) dy += velocidade;
    if (teclas["a"] || teclas["arrowleft"]) dx -= velocidade;
    if (teclas["d"] || teclas["arrowright"]) dx += velocidade;

    if (dx !== 0 && dy !== 0) {
        dx *= Math.SQRT1_2;
        dy *= Math.SQRT1_2;
    }

    if (jogador.carro) {
        jogador.carro.x += dx;
        jogador.carro.y += dy;

        jogador.carro.x = Math.max(
            15, Math.min(mundo.largura - 15, jogador.carro.x)
        );
        jogador.carro.y = Math.max(
            15, Math.min(mundo.altura - 15, jogador.carro.y)
        );

        jogador.x = jogador.carro.x;
        jogador.y = jogador.carro.y;
    } else {
        jogador.x += dx;
        jogador.y += dy;
    }

    jogador.x = Math.max(
        10, Math.min(mundo.largura - 10, jogador.x)
    );
    jogador.y = Math.max(
        10, Math.min(mundo.altura - 10, jogador.y)
    );

    cameraX = jogador.x - canvas.width / 2;
    cameraY = jogador.y - canvas.height / 2;

    cameraX = Math.max(
        0, Math.min(mundo.largura - canvas.width, cameraX)
    );
    cameraY = Math.max(
        0, Math.min(mundo.altura - canvas.height, cameraY)
    );

    dinheiroEl.textContent = jogador.dinheiro;
    vidaEl.textContent = jogador.vida;
    veiculoEl.textContent = jogador.carro ? "Sim" : "Não";
}

function desenharCidade() {
    ctx.fillStyle = "#56874a";
    ctx.fillRect(0, 0, mundo.largura, mundo.altura);

    // Ruas horizontais
    ctx.fillStyle = "#454545";

    for (let y = 180; y < mundo.altura; y += 300) {
        ctx.fillRect(0, y, mundo.largura, 90);

        ctx.strokeStyle = "#d8d18a";
        ctx.setLineDash([25, 20]);
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, y + 45);
        ctx.lineTo(mundo.largura, y + 45);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // Ruas verticais
    for (let x = 220; x < mundo.largura; x += 350) {
        ctx.fillStyle = "#454545";
        ctx.fillRect(x, 0, 90, mundo.altura);

        ctx.strokeStyle = "#d8d18a";
        ctx.setLineDash([25, 20]);
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x + 45, 0);
        ctx.lineTo(x + 45, mundo.altura);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // Prédios
    predios.forEach(p => {
        ctx.fillStyle = "#263c24";
        ctx.fillRect(p.x + 6, p.y + 7, p.largura, p.altura);

        ctx.fillStyle = p.cor;
        ctx.fillRect(p.x, p.y, p.largura, p.altura);

        ctx.fillStyle = "#d9c99d";

        for (let wy = p.y + 15; wy < p.y + p.altura - 10; wy += 28) {
            for (let wx = p.x + 15; wx < p.x + p.largura - 10; wx += 30) {
                ctx.fillRect(wx, wy, 12, 12);
            }
        }
    });
}

function desenharCarros() {
    carros.forEach(carro => {
        ctx.fillStyle = "#222";
        ctx.fillRect(carro.x - 18, carro.y - 12, 42, 28);

        ctx.fillStyle = carro.cor;
        ctx.fillRect(carro.x - 21, carro.y - 15, 42, 28);

        ctx.fillStyle = "#bce8ef";
        ctx.fillRect(carro.x - 12, carro.y - 12, 23, 9);

        ctx.fillStyle = "#111";
        ctx.fillRect(carro.x - 15, carro.y + 8, 9, 5);
        ctx.fillRect(carro.x + 8, carro.y + 8, 9, 5);
    });
}

function desenharJogador() {
    if (jogador.carro) return;

    // Corpo
    ctx.fillStyle = "#1685bb";
    ctx.fillRect(jogador.x - 9, jogador.y - 4, 18, 17);

    // Cabeça
    ctx.fillStyle = "#c99168";
    ctx.beginPath();
    ctx.arc(jogador.x, jogador.y - 10, 8, 0, Math.PI * 2);
    ctx.fill();

    // Cabelo
    ctx.fillStyle = "#222";
    ctx.fillRect(jogador.x - 7, jogador.y - 19, 14, 5);
}

function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(-cameraX, -cameraY);

    desenharCidade();
    desenharCarros();
    desenharJogador();

    ctx.restore();

    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.fillText("SAN ANDREAS", 15, 25);
}

function loop() {
    atualizar();
    desenhar();
    requestAnimationFrame(loop);
}

loop();

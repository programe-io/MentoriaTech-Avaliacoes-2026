
/* MINI THE SIMS 2D - JAVASCRIPT */

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// PERSONAGEM
const player = {
    x: 390,
    y: 300,
    cor: "#4e7be9",
    fome: 100,
    energia: 100,
    higiene: 100,
    diversao: 100
};

// MÓVEIS DA CASA
const moveis = [
    {
        x: 75, y: 75, w: 110, h: 75,
        cor: "#8d64cf",
        nome: "Cama",
        tipo: "energia",
        emoji: "🛏️"
    },
    {
        x: 255, y: 85, w: 100, h: 70,
        cor: "#e9a24d",
        nome: "Geladeira",
        tipo: "fome",
        emoji: "🍔"
    },
    {
        x: 500, y: 80, w: 130, h: 70,
        cor: "#5a9dd6",
        nome: "Chuveiro",
        tipo: "higiene",
        emoji: "🚿"
    },
    {
        x: 520, y: 305, w: 125, h: 75,
        cor: "#d76fa8",
        nome: "TV",
        tipo: "diversao",
        emoji: "📺"
    },
    {
        x: 120, y: 325, w: 110, h: 65,
        cor: "#bc8256",
        nome: "Sofá",
        tipo: "diversao",
        emoji: "🛋️"
    }
];

const teclas = {};

function limite(valor) {
    return Math.max(0, Math.min(100, valor));
}

// DESENHAR O JOGO
function desenhar() {
    ctx.clearRect(0, 0, 800, 500);

    // Jardim
    ctx.fillStyle = "#a4d88d";
    ctx.fillRect(0, 0, 800, 500);

    // Piso da casa
    ctx.fillStyle = "#f5dfb9";
    ctx.fillRect(35, 35, 730, 430);

    // Linhas do piso
    ctx.strokeStyle = "#e4cda7";
    ctx.lineWidth = 1;

    for (let x = 35; x < 765; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 35);
        ctx.lineTo(x, 465);
        ctx.stroke();
    }

    for (let y = 35; y < 465; y += 40) {
        ctx.beginPath();
        ctx.moveTo(35, y);
        ctx.lineTo(765, y);
        ctx.stroke();
    }

    // Paredes
    ctx.strokeStyle = "#83664d";
    ctx.lineWidth = 12;
    ctx.strokeRect(35, 35, 730, 430);

    // Tapete
    ctx.fillStyle = "#e8b8d7";
    ctx.fillRect(305, 250, 180, 120);

    // Desenhar móveis
    for (const m of moveis) {
        ctx.fillStyle = "#0002";
        ctx.fillRect(m.x + 5, m.y + 6, m.w, m.h);

        ctx.fillStyle = m.cor;
        ctx.fillRect(m.x, m.y, m.w, m.h);

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.strokeRect(m.x, m.y, m.w, m.h);

        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
            m.emoji,
            m.x + m.w / 2,
            m.y + 42
        );

        ctx.fillStyle = "#222";
        ctx.font = "13px Arial";
        ctx.fillText(
            m.nome,
            m.x + m.w / 2,
            m.y + m.h - 9
        );
    }

    // Sombra do personagem
    ctx.fillStyle = "#0003";
    ctx.beginPath();
    ctx.ellipse(
        player.x,
        player.y + 17,
        16, 6, 0, 0,
        Math.PI * 2
    );
    ctx.fill();

    // Corpo
    ctx.fillStyle = player.cor;
    ctx.fillRect(player.x - 11, player.y - 2, 22, 22);

    // Cabeça
    ctx.fillStyle = "#e8ac7b";
    ctx.beginPath();
    ctx.arc(
        player.x,
        player.y - 12,
        13, 0,
        Math.PI * 2
    );
    ctx.fill();

    // Cabelo
    ctx.fillStyle = "#503022";
    ctx.beginPath();
    ctx.arc(
        player.x,
        player.y - 17,
        13,
        Math.PI,
        Math.PI * 2
    );
    ctx.fill();

    // Olhos
    ctx.fillStyle = "#222";
    ctx.fillRect(player.x - 6, player.y - 12, 3, 3);
    ctx.fillRect(player.x + 4, player.y - 12, 3, 3);

    // Nome
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#222";
    ctx.fillText(
        "Meu Sim",
        player.x,
        player.y - 35
    );
}

// MOVIMENTAÇÃO
function mover(dx, dy) {
    if (player.energia <= 0) {
        mensagem("Seu Sim está cansado! Vá até a cama.");
        return;
    }

    player.x = Math.max(
        55,
        Math.min(745, player.x + dx)
    );

    player.y = Math.max(
        65,
        Math.min(440, player.y + dy)
    );

    player.energia = limite(player.energia - 0.03);
    atualizarStatus();
}

// MENSAGENS
function mensagem(texto) {
    document.getElementById("message").textContent = texto;
}

// INTERAÇÃO COM OS MÓVEIS
function interagir() {
    let perto = null;
    let menor = Infinity;

    for (const m of moveis) {
        const cx = Math.max(
            m.x,
            Math.min(player.x, m.x + m.w)
        );

        const cy = Math.max(
            m.y,
            Math.min(player.y, m.y + m.h)
        );

        const distancia = Math.hypot(
            player.x - cx,
            player.y - cy
        );

        if (distancia < 55 && distancia < menor) {
            perto = m;
            menor = distancia;
        }
    }

    if (!perto) {
        mensagem("Aproxime-se de um móvel!");
        return;
    }

    player[perto.tipo] = limite(
        player[perto.tipo] + 35
    );

    mensagem("Você usou: " + perto.nome + "! ✨");
    atualizarStatus();
}

// ATUALIZAR NECESSIDADES
function atualizarStatus() {
    const tipos = [
        "fome",
        "energia",
        "higiene",
        "diversao"
    ];

    for (const tipo of tipos) {
        document.getElementById(tipo).value = player[tipo];
    }
}

// TROCAR ROUPA
function trocarCor() {
    const cores = [
        "#4e7be9",
        "#e85a9c",
        "#55ad77",
        "#e7a52b",
        "#9c6ade"
    ];

    player.cor = cores[
        Math.floor(Math.random() * cores.length)
    ];

    mensagem("Roupa trocada!");
}

// REINICIAR
function reiniciar() {
    player.x = 390;
    player.y = 300;

    const tipos = [
        "fome",
        "energia",
        "higiene",
        "diversao"
    ];

    for (const tipo of tipos) {
        player[tipo] = 100;
    }

    atualizarStatus();
    mensagem("Novo dia no Mini The Sims!");
}

// CONTROLES DO TECLADO
document.addEventListener("keydown", function(e) {
    const tecla = e.key.toLowerCase();

    if ([
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright",
        " "
    ].includes(tecla)) {
        e.preventDefault();
    }

    teclas[tecla] = true;

    if (tecla === "e" && !e.repeat) {
        interagir();
    }
});

document.addEventListener("keyup", function(e) {
    teclas[e.key.toLowerCase()] = false;
});

// LOOP PRINCIPAL
function loop() {
    let dx = 0;
    let dy = 0;

    if (teclas["w"] || teclas["arrowup"]) {
        dy -= 3;
    }

    if (teclas["s"] || teclas["arrowdown"]) {
        dy += 3;
    }

    if (teclas["a"] || teclas["arrowleft"]) {
        dx -= 3;
    }

    if (teclas["d"] || teclas["arrowright"]) {
        dx += 3;
    }

    if (dx || dy) {
        mover(dx, dy);
    }

    desenhar();
    requestAnimationFrame(loop);
}

// NECESSIDADES DIMINUEM COM O TEMPO
setInterval(function() {
    player.fome = limite(player.fome - 1);
    player.higiene = limite(player.higiene - 0.5);
    player.diversao = limite(player.diversao - 0.7);
    player.energia = limite(player.energia - 0.4);

    atualizarStatus();
}, 3000);

// INICIAR JOGO
atualizarStatus();
loop();

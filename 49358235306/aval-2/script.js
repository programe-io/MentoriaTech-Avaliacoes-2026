const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = {
    x: 218,
    y: 520,
    w: 44,
    h: 44
};

let blocks = [];
let score = 0;
let best = Number(localStorage.getItem("best") || 0);
let running = false;
let direction = 0;
let speed = 3;
let spawn = 0;

document.getElementById("best").textContent = best;

function move(dir) {
    if (!running) return;

    player.x += dir * 35;
    player.x = Math.max(0, Math.min(436, player.x));
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" || e.key === "a") {
        direction = -1;
    }

    if (e.key === "ArrowRight" || e.key === "d") {
        direction = 1;
    }
});

document.addEventListener("keyup", () => {
    direction = 0;
});

function start() {
    player.x = 218;
    blocks = [];
    score = 0;
    speed = 3;
    spawn = 0;
    running = true;

    loop();
}

function draw() {
    ctx.clearRect(0, 0, 480, 600);

    // Jogador
    ctx.fillStyle = "#35c6a5";
    ctx.fillRect(player.x, player.y, player.w, player.h);

    // Obstáculos
    blocks.forEach(block => {
        ctx.fillStyle = "#ff647c";
        ctx.fillRect(
            block.x,
            block.y,
            block.w,
            block.h
        );
    });
}

function loop() {
    if (!running) return;

    // Movimento do jogador
    player.x += direction * 5;
    player.x = Math.max(0, Math.min(436, player.x));

    // Criar obstáculos
    spawn++;

    if (spawn > 45) {
        let w = 30 + Math.random() * 40;

        blocks.push({
            x: Math.random() * (480 - w),
            y: -40,
            w: w,
            h: 30
        });

        spawn = 0;
    }

    // Movimento dos obstáculos
    blocks.forEach(block => {
        block.y += speed;
    });

    blocks = blocks.filter(block => block.y < 620);

    // Verificar colisões
    for (let block of blocks) {
        if (
            player.x < block.x + block.w &&
            player.x + player.w > block.x &&
            player.y < block.y + block.h &&
            player.y + player.h > block.y
        ) {
            endGame();
            return;
        }
    }

    // Pontuação
    score++;

    document.getElementById("score").textContent =
        Math.floor(score / 10);

    // Aumentar dificuldade
    speed += 0.001;

    draw();

    requestAnimationFrame(loop);
}

function endGame() {
    running = false;

    let points = Math.floor(score / 10);

    if (points > best) {
        best = points;

        localStorage.setItem("best", best);

        document.getElementById("best").textContent = best;
    }

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 35px Arial";
    ctx.textAlign = "center";

    ctx.fillText("FIM DE JOGO", 240, 280);

    ctx.font = "20px Arial";

    ctx.fillText(
        "Pontuação: " + points,
        240,
        320
    );
}

draw();
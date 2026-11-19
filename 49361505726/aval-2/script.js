<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Jogo JavaScript</title>
<style>
body {
    background: #222;
    color: white;
    text-align: center;
    font-family: Arial;
}

canvas {
    background: linear-gradient(#55bbee, #b5eaff);
    border: 4px solid white;
    max-width: 95%;
}

button {
    padding: 12px 25px;
    background: #38aa36;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 18px;
}
</style>
</head>

<body>

<h1>🎮 JOGO DE SOBREVIVÊNCIA</h1>
<h2>Pontos: <span id="score">0</span></h2>

<canvas id="game" width="700" height="350"></canvas>

<p>Pressione ESPAÇO para pular!</p>
<button onclick="restart()">REINICIAR</button>

<script>
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player, obstacle, score, gameOver, speed;

function restart() {
    player = {
        x: 70,
        y: 250,
        width: 35,
        height: 45,
        velocity: 0,
        jumping: false
    };

    obstacle = {
        x: 700,
        y: 260,
        width: 30,
        height: 35
    };

    score = 0;
    speed = 5;
    gameOver = false;

    document.getElementById("score").textContent = score;
}

document.addEventListener("keydown", function(e) {
    if (e.code === "Space" && !player.jumping && !gameOver) {
        player.velocity = -13;
        player.jumping = true;
    }

    if (e.code === "Space" && gameOver) {
        restart();
    }
});

function drawPlayer() {
    ctx.fillStyle = "#ffcc66";
    ctx.fillRect(player.x, player.y, 35, 45);

    ctx.fillStyle = "#2255dd";
    ctx.fillRect(player.x, player.y + 20, 35, 25);

    ctx.fillStyle = "black";
    ctx.fillRect(player.x + 8, player.y + 8, 5, 5);
    ctx.fillRect(player.x + 23, player.y + 8, 5, 5);
}

function drawObstacle() {
    ctx.fillStyle = "#228833";
    ctx.fillRect(
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height
    );
}

function update() {
    if (gameOver) return;

    // Gravidade
    player.velocity += 0.6;
    player.y += player.velocity;

    if (player.y >= 250) {
        player.y = 250;
        player.velocity = 0;
        player.jumping = false;
    }

    // Movimento do obstáculo
    obstacle.x -= speed;

    if (obstacle.x < -30) {
        obstacle.x = 700;
        score++;
        speed += 0.2;

        document.getElementById("score").textContent = score;
    }

    // Colisão
    if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
    ) {
        gameOver = true;
    }
}

function draw() {
    ctx.clearRect(0, 0, 700, 350);

    // Chão
    ctx.fillStyle = "#55aa33";
    ctx.fillRect(0, 295, 700, 55);

    drawPlayer();
    drawObstacle();

    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("GAME OVER!", 220, 150);

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Pressione ESPAÇO para reiniciar", 160, 190);
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

restart();
loop();
</script>

</body>
</html>
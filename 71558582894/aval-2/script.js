const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const startButton = document.getElementById("startButton");

const box = 20;

let snake;
let food;
let direction;
let score;
let game;
let gameRunning = false;

// Inicia o jogo
function startGame() {

    snake = [
        { x: 200, y: 200 },
        { x: 180, y: 200 },
        { x: 160, y: 200 }
    ];

    food = createFood();

    direction = "RIGHT";

    score = 0;

    scoreElement.textContent = score;

    gameRunning = true;

    startButton.textContent = "Reiniciar";

    clearInterval(game);

    game = setInterval(drawGame, 100);
}

// Cria a comida em uma posição aleatória
function createFood() {

    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

// Desenha o jogo
function drawGame() {

    // Limpa o canvas
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha a comida
    ctx.fillStyle = "#ef4444";

    ctx.beginPath();
    ctx.arc(
        food.x + box / 2,
        food.y + box / 2,
        box / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Desenha a cobra
    snake.forEach((part, index) => {

        if (index === 0) {
            ctx.fillStyle = "#22c55e";
        } else {
            ctx.fillStyle = "#4ade80";
        }

        ctx.fillRect(
            part.x + 1,
            part.y + 1,
            box - 2,
            box - 2
        );
    });

    // Calcula a nova posição da cabeça
    let head = {
        x: snake[0].x,
        y: snake[0].y
    };

    if (direction === "UP") {
        head.y -= box;
    }

    if (direction === "DOWN") {
        head.y += box;
    }

    if (direction === "LEFT") {
        head.x -= box;
    }

    if (direction === "RIGHT") {
        head.x += box;
    }

    // Verifica colisão
    if (checkCollision(head)) {
        gameOver();
        return;
    }

    // Verifica se comeu a comida
    if (head.x === food.x && head.y === food.y) {

        score++;

        scoreElement.textContent = score;

        food = createFood();

    } else {

        snake.pop();
    }

    // Adiciona a nova cabeça
    snake.unshift(head);
}

// Verifica colisões
function checkCollision(head) {

    // Colisão com as paredes
    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height
    ) {
        return true;
    }

    // Colisão com o próprio corpo
    for (let i = 0; i < snake.length; i++) {

        if (
            head.x === snake[i].x &&
            head.y === snake[i].y
        ) {
            return true;
        }
    }

    return false;
}

// Finaliza o jogo
function gameOver() {

    clearInterval(game);

    gameRunning = false;

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 35px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        "Fim de Jogo!",
        canvas.width / 2,
        canvas.height / 2 - 20
    );

    ctx.font = "20px Arial";

    ctx.fillText(
        "Pontuação: " + score,
        canvas.width / 2,
        canvas.height / 2 + 25
    );
}

// Controles pelo teclado
document.addEventListener("keydown", function(event) {

    if (!gameRunning) {
        return;
    }

    if (
        (event.key === "ArrowUp" || event.key === "w") &&
        direction !== "DOWN"
    ) {
        direction = "UP";
    }

    if (
        (event.key === "ArrowDown" || event.key === "s") &&
        direction !== "UP"
    ) {
        direction = "DOWN";
    }

    if (
        (event.key === "ArrowLeft" || event.key === "a") &&
        direction !== "RIGHT"
    ) {
        direction = "LEFT";
    }

    if (
        (event.key === "ArrowRight" || event.key === "d") &&
        direction !== "LEFT"
    ) {
        direction = "RIGHT";
    }
});

// Botão iniciar/reiniciar
startButton.addEventListener("click", startGame);

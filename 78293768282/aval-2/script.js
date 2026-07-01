const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score");
const gameOverScreen = document.getElementById("game-over-screen");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake, food, dx, dy, score, highScore, gameInterval;

// Recupera o recorde salvo no navegador
highScore = localStorage.getItem("snakeHighScore") || 0;
highScoreElement.innerText = highScore;

// Inicia as variáveis do jogo
resetGame();

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 5, y: 5 };
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.innerText = score;
    
    gameOverScreen.classList.add("hidden");
    document.addEventListener("keydown", changeDirection);
    
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 100);
}

function updateGame() {
    if (checkCollision()) {
        endGame();
        return;
    }

    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
}

function clearCanvas() {
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#4af626" : "#2b9e13"; // Cabeça neon, corpo escuro
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 1, gridSize - 1);
    });
}

function moveSnake() {
    if (dx === 0 && dy === 0) return;

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 10;
        scoreElement.innerText = score;
        
        // Atualiza o recorde se a pontuação atual for maior
        if (score > highScore) {
            highScore = score;
            highScoreElement.innerText = highScore;
            localStorage.setItem("snakeHighScore", highScore);
        }
        
        generateFood();
    } else {
        snake.pop();
    }
}

function drawFood() {
    ctx.fillStyle = "#ff4444";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1);
}

function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);

    // Evita comida em cima da cobra
    snake.forEach(part => {
        if (part.x === food.x && part.y === food.y) generateFood();
    });
}

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && dx !== 1)  { dx = -1; dy = 0; } // Esquerda
    if (key === 38 && dy !== 1)  { dx = 0; dy = -1; } // Cima
    if (key === 39 && dx !== -1) { dx = 1; dy = 0; }  // Direita
    if (key === 40 && dy !== -1) { dx = 0; dy = 1; }  // Baixo
}

function checkCollision() {
    // Bateu em si mesma
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    // Bateu nas bordas
    return snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount;
}

function endGame() {
    clearInterval(gameInterval);
    document.removeEventListener("keydown", changeDirection);
    gameOverScreen.classList.remove("hidden");
}
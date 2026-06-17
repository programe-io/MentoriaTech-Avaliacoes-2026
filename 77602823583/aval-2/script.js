const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const currentScoreDisplay = document.getElementById("current-score");
const highScoreDisplay = document.getElementById("high-score");
const gameOverScreen = document.getElementById("game-over-screen");

// Configurações do Grid do Jogo
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Estado do Jogo
let snake = [];
let food = { x: 0, y: 0 };
let dx = gridSize; // Velocidade X inicial (andando para a direita)
let dy = 0;        // Velocidade Y inicial
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
let gameInterval;
let isGameOver = false;
let changingDirection = false; // Bloqueia cliques duplos rápidos que causam auto-colisão

// Inicializa o placar de recorde
highScoreDisplay.innerText = highScore;

// Escuta os comandos do teclado
window.addEventListener("keydown", changeDirection);

// Inicia o ciclo do jogo pela primeira vez
resetGame();

function resetGame() {
    // Esconde tela de game over
    gameOverScreen.style.display = "none";
    isGameOver = false;
    score = 0;
    currentScoreDisplay.innerText = score;
    
    // Posição inicial da cobrinha (no meio da tela, com 3 blocos)
    snake = [
        { x: 10 * gridSize, y: 10 * gridSize },
        { x: 9 * gridSize, y: 10 * gridSize },
        { x: 8 * gridSize, y: 10 * gridSize }
    ];
    
    dx = gridSize;
    dy = 0;
    
    generateFood();
    
    // Limpa o loop anterior se existir e define a velocidade (100ms por quadro)
    clearInterval(gameInterval);
    gameInterval = setInterval(update, 100);
}

// Loop Principal
function update() {
    if (checkCollision()) {
        endGame();
        return;
    }

    changingDirection = false;
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
}

// Limpa a tela a cada frame
function clearCanvas() {
    ctx.fillStyle = "#111116";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Desenha a Cobrinha
function drawSnake() {
    snake.forEach((part, index) => {
        // Cabeça é verde escura, o resto é verde claro
        ctx.fillStyle = index === 0 ? "#388e3c" : "#4caf50";
        ctx.strokeStyle = "#111116";
        
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
        ctx.strokeRect(part.x, part.y, gridSize, gridSize);
    });
}

// Atualiza a posição da cobrinha
function moveSnake() {
    // Cria a nova cabeça baseada na direção atual
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Checa se comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        currentScoreDisplay.innerText = score;
        generateFood();
    } else {
        // Se não comeu, remove o último pedaço da cauda para manter o tamanho estável
        snake.pop();
    }
}

// Altera a direção impedindo movimentos inversos diretos
function changeDirection(event) {
    if (isGameOver) {
        if (event.key === " " || event.code === "Space") {
            resetGame();
        }
        return;
    }

    if (changingDirection) return;

    const keyPressed = event.key.toLowerCase();
    const goingUp = dy === -gridSize;
    const goingDown = dy === gridSize;
    const goingRight = dx === gridSize;
    const goingLeft = dx === -gridSize;

    if ((keyPressed === "arrowleft" || keyPressed === "a") && !goingRight) {
        dx = -gridSize;
        dy = 0;
        changingDirection = true;
    }
    if ((keyPressed === "arrowup" || keyPressed === "w") && !goingDown) {
        dx = 0;
        dy = -gridSize;
        changingDirection = true;
    }
    if ((keyPressed === "arrowright" || keyPressed === "d") && !goingLeft) {
        dx = gridSize;
        dy = 0;
        changingDirection = true;
    }
    if ((keyPressed === "arrowdown" || keyPressed === "s") && !goingUp) {
        dx = 0;
        dy = gridSize;
        changingDirection = true;
    }
}

// Gera comida em locais aleatórios alinhados ao grid
function generateFood() {
    food.x = Math.floor(Math.random() * tileCount) * gridSize;
    food.y = Math.floor(Math.random() * tileCount) * gridSize;

    // Garante que a comida não apareça em cima da própria cobra
    snake.forEach(part => {
        const hasEaten = part.x === food.x && part.y === food.y;
        if (hasEaten) generateFood();
    });
}

// Desenha a comida (Maçã)
function drawFood() {
    ctx.fillStyle = "#f44336";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Checa colisões com as paredes ou o próprio corpo
function checkCollision() {
    const head = snake[0];

    // Colisão com as paredes
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Colisão com o próprio corpo (ignora o índice 0 que é a própria cabeça)
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Finaliza a partida e gerencia recordes
function endGame() {
    isGameOver = true;
    clearInterval(gameInterval);
    gameOverScreen.style.display = "flex";

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("snakeHighScore", highScore);
        highScoreDisplay.innerText = highScore;
    }
}
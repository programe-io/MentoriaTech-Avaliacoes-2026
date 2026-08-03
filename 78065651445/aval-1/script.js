const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayMsg = document.getElementById('overlay-msg');
const startBtn = document.getElementById('start-btn');

// Configurações da Grade
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Variáveis do Jogo
let snake = [];
let food = { x: 0, y: 0 };
let dx = gridSize;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameInterval = null;
let changingDirection = false;

highScoreElement.textContent = highScore;

// Inicialização e Reinício
function startGame() {
    snake = [
        { x: 160, y: 200 },
        { x: 140, y: 200 },
        { x: 120, y: 200 }
    ];
    score = 0;
    dx = gridSize;
    dy = 0;
    scoreElement.textContent = score;
    overlay.style.display = 'none';

    generateFood();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}

// Loop Principal
function gameLoop() {
    changingDirection = false;
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    checkCollision();
}

function clearCanvas() {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach((segment, index) => {
        // Cabeça com cor levemente diferente
        ctx.fillStyle = index === 0 ? '#4ade80' : '#22c55e';
        ctx.fillRect(segment.x, segment.y, gridSize - 2, gridSize - 2);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Verifica se comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * tileCount) * gridSize;
    food.y = Math.floor(Math.random() * tileCount) * gridSize;

    // Garante que a comida não apareça em cima da cobra
    snake.forEach(segment => {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
        }
    });
}

function drawFood() {
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(
        food.x + gridSize / 2, 
        food.y + gridSize / 2, 
        gridSize / 2 - 1, 
        0, 
        Math.PI * 2
    );
    ctx.fill();
}

function checkCollision() {
    const head = snake[0];

    // Colisão com as paredes
    const hitWall = head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height;

    // Colisão com o próprio corpo
    let hitSelf = false;
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            hitSelf = true;
            break;
        }
    }

    if (hitWall || hitSelf) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(gameInterval);
    overlayTitle.textContent = 'Fim de Jogo!';
    overlayMsg.textContent = `Sua pontuação final foi: ${score}`;
    startBtn.textContent = 'Jogar Novamente';
    overlay.style.display = 'flex';
}

// Controle de Direção
function changeDirection(dir) {
    if (changingDirection) return;

    const goingUp = dy === -gridSize;
    const goingDown = dy === gridSize;
    const goingRight = dx === gridSize;
    const goingLeft = dx === -gridSize;

    if (dir === 'LEFT' && !goingRight) { dx = -gridSize; dy = 0; changingDirection = true; }
    if (dir === 'UP' && !goingDown) { dx = 0; dy = -gridSize; changingDirection = true; }
    if (dir === 'RIGHT' && !goingLeft) { dx = gridSize; dy = 0; changingDirection = true; }
    if (dir === 'DOWN' && !goingUp) { dx = 0; dy = gridSize; changingDirection = true; }
}

// Eventos de Teclado
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft': case 'a': case 'A': changeDirection('LEFT'); break;
        case 'ArrowUp': case 'w': case 'W': changeDirection('UP'); break;
        case 'ArrowRight': case 'd': case 'D': changeDirection('RIGHT'); break;
        case 'ArrowDown': case 's': case 'S': changeDirection('DOWN'); break;
    }
});

// Eventos de Botões Virtuais
document.getElementById('btn-up').addEventListener('click', () => changeDirection('UP'));
document.getElementById('btn-down').addEventListener('click', () => changeDirection('DOWN'));
document.getElementById('btn-left').addEventListener('click', () => changeDirection('LEFT'));
document.getElementById('btn-right').addEventListener('click', () => changeDirection('RIGHT'));

startBtn.addEventListener('click', startGame);
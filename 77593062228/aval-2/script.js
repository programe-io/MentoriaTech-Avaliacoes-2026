const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreValue = document.getElementById("scoreValue");
const highScoreValue = document.getElementById("highScoreValue");
const resetBtn = document.getElementById("resetBtn");

// Configurações mecânicas do mapa
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Estado da Cobra
let snakeX = 10;
let snakeY = 10;
let snakeBody = [
    {x: 10, y: 10},
    {x: 9, y: 10},
    {x: 8, y: 10}
];

// Vetores de movimento (Começa indo para a direita)
let velocityX = 1;
let velocityY = 0;

let appleX = 5;
let appleY = 5;
let score = 0;

// Gerenciamento do Recorde Local
let highScore = localStorage.getItem("snakeHighScore") || 0;
highScoreValue.innerText = highScore;

// Trava de comandos para evitar colisões por cliques rápidos demais
let canChangeDirection = true;

// Inicializadores
setInterval(updateGame, 100);
document.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

function updateGame() {
    canChangeDirection = true;

    snakeX += velocityX;
    snakeY += velocityY;

    // Sistema de travessia de bordas (Efeito Pac-Man)
    if (snakeX < 0) snakeX = tileCount - 1;
    if (snakeX >= tileCount) snakeX = 0;
    if (snakeY < 0) snakeY = tileCount - 1;
    if (snakeY >= tileCount) snakeY = 0;

    let newHead = { x: snakeX, y: snakeY };

    // Colisão com o próprio corpo
    for (let i = 0; i < snakeBody.length; i++) {
        if (newHead.x === snakeBody[i].x && newHead.y === snakeBody[i].y) {
            resetGame();
            return;
        }
    }

    snakeBody.unshift(newHead);

    // Comer a fruta
    if (snakeX === appleX && snakeY === appleY) {
        score += 10;
        scoreValue.innerText = score;
        
        if (score > highScore) {
            highScore = score;
            highScoreValue.innerText = highScore;
            localStorage.setItem("snakeHighScore", highScore);
        }
        
        generateApple();
    } else {
        snakeBody.pop();
    }

    draw();
}

function draw() {
    // Fundo do Canvas
    ctx.fillStyle = "#09020c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grade Cyber no background
    ctx.strokeStyle = "rgba(255, 0, 127, 0.04)";
    ctx.lineWidth = 1;
    for (let i = 0; i < tileCount; i++) {
        ctx.beginPath(); ctx.moveTo(i * gridSize, 0); ctx.lineTo(i * gridSize, canvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * gridSize); ctx.lineTo(canvas.width, i * gridSize); ctx.stroke();
    }

    // Desenho da Maçã (Neon Ciano)
    ctx.fillStyle = "#00ffff";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#00ffff";
    ctx.fillRect(appleX * gridSize + 3, appleY * gridSize + 3, gridSize - 6, gridSize - 6);

    // Desenho da Cobra (Neon Rosa em Fade)
    ctx.shadowBlur = 12;
    ctx.shadowColor = "#ff007f";
    for (let i = 0; i < snakeBody.length; i++) {
        if (i === 0) {
            ctx.fillStyle = "#ff007f"; // Cabeça
        } else {
            let opacity = Math.max(0.3, 1 - (i / snakeBody.length));
            ctx.fillStyle = `rgba(255, 51, 153, ${opacity})`; // Corpo
        }
        ctx.fillRect(snakeBody[i].x * gridSize + 1, snakeBody[i].y * gridSize + 1, gridSize - 2, gridSize - 2);
    }
    
    ctx.shadowBlur = 0; // Desativa o efeito de sombra para otimização
}

function generateApple() {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);

    for (let i = 0; i < snakeBody.length; i++) {
        if (appleX === snakeBody[i].x && appleY === snakeBody[i].y) {
            generateApple();
            break;
        }
    }
}

function changeDirection(event) {
    if (!canChangeDirection) return;

    const keyPressed = event.keyCode;
    const LEFT = 37; const UP = 38; const RIGHT = 39; const DOWN = 40;

    const goingUp = velocityY === -1;
    const goingDown = velocityY === 1;
    const goingRight = velocityX === 1;
    const goingLeft = velocityX === -1;

    if (keyPressed === LEFT && !goingRight) { velocityX = -1; velocityY = 0; canChangeDirection = false; }
    if (keyPressed === UP && !goingDown) { velocityX = 0; velocityY = -1; canChangeDirection = false; }
    if (keyPressed === RIGHT && !goingLeft) { velocityX = 1; velocityY = 0; canChangeDirection = false; }
    if (keyPressed === DOWN && !goingUp) { velocityX = 0; velocityY = 1; canChangeDirection = false; }
}

function resetGame() {
    alert("💥 GAME OVER! Pontuação final: " + score);
    snakeX = 10;
    snakeY = 10;
    snakeBody = [
        {x: 10, y: 10},
        {x: 9, y: 10},
        {x: 8, y: 10}
    ];
    velocityX = 1;
    velocityY = 0;
    score = 0;
    scoreValue.innerText = score;
    generateApple();
}
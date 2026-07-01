// --- CONFIGURAÇÕES INICIAIS E VARIÁVEIS GLOBAIS ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("final-score");
const gameOverScreen = document.getElementById("game-over-screen");
const restartBtn = document.getElementById("restart-btn");

// Estado do jogo
let gameInterval;
let isGameOver = false;
let score = 0;
let gameSpeed = 5;
let enemySpawnTimer = 0;
let lineOffset = 0; // Para dar o efeito de movimento na pista

// Controles do teclado
const keys = {
    ArrowLeft: false,
    ArrowRight: false
};

// --- CLASSES DOS OBJETOS ---

// Classe que representa o carro do jogador e os inimigos
class Car {
    constructor(x, y, width, height, color, isPlayer = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.isPlayer = isPlayer;
        this.speed = 7; // Velocidade de movimento lateral do jogador
    }

    // Desenha o carro no Canvas (Design simples em blocos estilo retrô)
    draw() {
        // Corpo principal do carro
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Rodas (4 retângulos pretos nas pontas)
        ctx.fillStyle = "#000";
        ctx.fillRect(this.x - 4, this.y + 10, 4, 15); // Esquerda Superior
        ctx.fillRect(this.x + this.width, this.y + 10, 4, 15); // Direita Superior
        ctx.fillRect(this.x - 4, this.y + this.height - 25, 4, 15); // Esquerda Inferior
        ctx.fillRect(this.x + this.width, this.y + this.height - 25, 4, 15); // Direita Inferior

        // Parabrisa/Vidro
        ctx.fillStyle = "#e0f7fa";
        if (this.isPlayer) {
            ctx.fillRect(this.x + 5, this.y + 15, this.width - 10, 10); // Vidro frontal jogador
        } else {
            ctx.fillRect(this.x + 5, this.y + this.height - 25, this.width - 10, 10); // Vidro frontal inimigo
        }
    }

    // Move o jogador baseado nas teclas pressionadas
    movePlayer() {
        if (keys.ArrowLeft && this.x > 20) {
            this.x -= this.speed;
        }
        if (keys.ArrowRight && this.x < canvas.width - this.width - 20) {
            this.x += this.speed;
        }
    }

    // Move o inimigo para baixo
    moveEnemy() {
        this.y += gameSpeed;
    }
}

// Instanciação do Jogador (Centralizado na parte inferior)
const playerWidth = 40;
const playerHeight = 70;
let player = new Car(canvas.width / 2 - playerWidth / 2, canvas.height - playerHeight - 20, playerWidth, playerHeight, "#2196F3", true);

let enemies = [];

// --- FUNÇÕES DE SUPORTE E CENÁRIO ---

// Desenha as marcações da pista (faixas tracejadas)
function drawRoad() {
    ctx.fillStyle = "#555"; // Bordas da pista
    ctx.fillRect(0, 0, 15, canvas.height);
    ctx.fillRect(canvas.width - 15, 0, 15, canvas.height);

    ctx.fillStyle = "#fff"; // Linhas brancas das bordas
    ctx.fillRect(15, 0, 5, canvas.height);
    ctx.fillRect(canvas.width - 20, 0, 5, canvas.height);

    // Linha tracejada central (Efeito de movimento)
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#fff";
    ctx.setLineDash([30, 20]); // 30px linha, 20px espaço
    ctx.lineDashOffset = -lineOffset;
    
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    
    // Atualiza o offset para mover a pista
    lineOffset += gameSpeed;
    if (lineOffset > 50) lineOffset = 0;
}

// Cria novos carros inimigos em posições aleatórias da pista
function spawnEnemies() {
    enemySpawnTimer++;
    // Spawna um inimigo a cada X frames (diminui conforme o jogo acelera)
    let spawnRate = Math.max(40, 100 - Math.floor(score / 2)); 

    if (enemySpawnTimer >= spawnRate) {
        // Define uma posição X aleatória válida dentro da estrada
        const minX = 25;
        const maxX = canvas.width - playerWidth - 25;
        const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        
        // Cores aleatórias para os inimigos
        const colors = ["#e53935", "#8e24aa", "#ffb300", "#43a047"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        enemies.push(new Car(randomX, -playerHeight, playerWidth, playerHeight, randomColor, false));
        enemySpawnTimer = 0;
    }
}

// Checa colisão no estilo AABB (Caixa delimitadora por eixos alinhados)
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Finaliza o jogo
function gameOver() {
    isGameOver = true;
    cancelAnimationFrame(gameInterval);
    finalScoreElement.innerText = score;
    gameOverScreen.classList.remove("hidden");
}

// --- GAME LOOP PRINCIPAL ---

function updateGame() {
    if (isGameOver) return;

    // 1. Limpar o Canvas para o próximo frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Desenhar o cenário
    drawRoad();

    // 3. Atualizar e desenhar o jogador
    player.movePlayer();
    player.draw();

    // 4. Gerenciar Inimigos (Movimentação, Colisão e Pontuação)
    spawnEnemies();

    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].moveEnemy();
        enemies[i].draw();

        // Checar colisão com o jogador
        if (checkCollision(player, enemies[i])) {
            gameOver();
            return;
        }

        // Se o inimigo sair da tela, remove do array e ganha ponto
        if (enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
            score++;
            scoreElement.innerText = score;

            // Aumenta a velocidade do jogo gradualmente a cada 5 pontos
            if (score % 5 === 0) {
                gameSpeed += 0.5;
            }
        }
    }

    // Chama o próximo frame
    gameInterval = requestAnimationFrame(updateGame);
}

// --- EVENT LISTENERS (CONTROLES) ---

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        keys[e.key] = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        keys[e.key] = false;
    }
});

// Inicializador / Reiniciador do jogo
function initGame() {
    enemies = [];
    score = 0;
    gameSpeed = 5;
    enemySpawnTimer = 0;
    isGameOver = false;
    scoreElement.innerText = score;
    player.x = canvas.width / 2 - playerWidth / 2; // Reseta posição do jogador
    gameOverScreen.classList.add("hidden");
    
    // Inicia o loop do jogo
    gameInterval = requestAnimationFrame(updateGame);
}

// Evento do botão de restart
restartBtn.addEventListener("click", initGame);

// Inicia o jogo automaticamente ao carregar a página
initGame();
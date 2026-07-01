const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const gameOverScreen = document.getElementById('game-over-screen');
const restartBtn = document.getElementById('restart-btn');

let gameSpeed = 6;
let score = 0;
let isGameOver = false;
let gameFrame = 0;

const keys = {};
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

class Player {
    constructor() {
        this.x = 100;
        this.normalHeight = 60;
        this.slideHeight = 30;
        this.width = 30;
        this.height = this.normalHeight;
        this.y = 320 - this.height;
        this.velocityY = 0;
        this.gravity = 0.6;
        this.jumpForce = -13;
        this.isGrounded = false;
        this.isSliding = false;
    }

    update(currentPlatform) {
        if (keys['ArrowDown'] && this.isGrounded) {
            if (!this.isSliding) {
                this.isSliding = true;
                this.height = this.slideHeight;
                if (currentPlatform) this.y = currentPlatform.y - this.height;
            }
        } else {
            if (this.isSliding) {
                this.isSliding = false;
                this.height = this.normalHeight;
                if (currentPlatform) this.y = currentPlatform.y - this.height;
            }
        }

        if ((keys['ArrowUp'] || keys['Space']) && this.isGrounded && !this.isSliding) {
            this.velocityY = this.jumpForce;
            this.isGrounded = false;
        }

        this.velocityY += this.gravity;
        this.y += this.velocityY;

        if (currentPlatform && 
            this.x + this.width > currentPlatform.x && 
            this.x < currentPlatform.x + currentPlatform.width) {
            
            if (this.y + this.height <= currentPlatform.y + this.velocityY && this.y + this.height + this.velocityY >= currentPlatform.y) {
                this.velocityY = 0;
                this.y = currentPlatform.y - this.height;
                this.isGrounded = true;
            }
        } else {
            this.isGrounded = false;
        }

        if (this.y > canvas.height) {
            endGame();
        }
    }

    draw() {
        ctx.save();
        
        // Configuração de sombra/brilho global do personagem
        ctx.shadowColor = '#ff6600';
        ctx.shadowBlur = this.isSliding ? 15 : 8;

        if (!this.isSliding) {
            // --- JOGADOR EM PÉ / PANDO (FORMA CORPORAL DETALHADA) ---
            
            // 1. Pernas / Calça (Preto Carbono)
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(this.x + 4, this.y + 36, 10, 24); // Perna Esquerda
            ctx.fillRect(this.x + 16, this.y + 36, 10, 24); // Perna Direita
            
            // Detalhe das botas (Laranja Fogo)
            ctx.fillStyle = '#ff6600';
            ctx.fillRect(this.x + 3, this.y + 54, 11, 6);
            ctx.fillRect(this.x + 16, this.y + 54, 11, 6);

            // 2. Tronco / Jaqueta (Branco Alpino)
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(this.x + 2, this.y + 16, 26, 22); 
            
            // Detalhes da Jaqueta (Faixas Laranja e Zíper)
            ctx.fillStyle = '#ff6600';
            ctx.fillRect(this.x + 2, this.y + 20, 4, 12); // Listra manga esquerda
            ctx.fillRect(this.x + 24, this.y + 20, 4, 12); // Listra manga direita
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(this.x + 14, this.y + 16, 2, 22); // Linha central/Zíper

            // 3. Cabeça / Capacete Futurista
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(this.x + 15, this.y + 8, 8, 0, Math.PI * 2); // Cabeça arredondada
            ctx.fill();

            // Visor do Capacete (Ciano Neon Brilhante)
            ctx.fillStyle = '#00ffff';
            ctx.shadowColor = '#00ffff';
            ctx.fillRect(this.x + 13, this.y + 4, 9, 5); 

        } else {
            // --- JOGADOR AGACHADO / SLIDE (FORMA AERODINÂMICA HORIZONTAL) ---
            
            // 1. Corpo/Jaqueta inclinado deslizando (Branco)
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(this.x, this.y + 5, 22, 20);

            // Detalhe da Jaqueta no Slide
            ctx.fillStyle = '#ff6600';
            ctx.fillRect(this.x, this.y + 5, 22, 4);

            // 2. Pernas esticadas para trás (Preto Carbono)
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(this.x + 20, this.y + 12, 10, 12);
            // Bota empurrando o chão
            ctx.fillStyle = '#ff6600';
            ctx.fillRect(this.x + 28, this.y + 10, 4, 14);

            // 3. Cabeça abaixada projetada para a frente
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(this.x + 6, this.y + 12, 7, 0, Math.PI * 2);
            ctx.fill();

            // Visor olhando para frente no slide
            ctx.fillStyle = '#00ffff';
            ctx.shadowColor = '#00ffff';
            ctx.fillRect(this.x + 1, this.y + 9, 5, 4);
        }

        ctx.restore();
    }
}

class Platform {
    constructor(x, width) {
        this.x = x;
        this.y = 320; 
        this.width = width;
        this.height = 80;
    }

    update() {
        this.x -= gameSpeed;
    }

    draw() {
        ctx.fillStyle = '#130f26';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.save();
        ctx.fillStyle = '#9400d3'; 
        ctx.shadowColor = '#9400d3';
        ctx.shadowBlur = 10;
        ctx.fillRect(this.x, this.y, this.width, 5); 
        ctx.restore();
    }
}

class Obstacle {
    constructor(x, type, platformY) {
        this.x = x;
        this.type = type; 
        this.width = 25;
        
        if (this.type === 'low') {
            this.height = 35;
            this.y = platformY - this.height; 
        } else {
            this.height = 110;
            this.y = platformY - 150; 
        }
    }

    update() {
        this.x -= gameSpeed;
    }

    draw() {
        ctx.save();
        ctx.fillStyle = '#ff0055';
        ctx.shadowColor = '#ff0055';
        ctx.shadowBlur = 15;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 0;
        ctx.fillRect(this.x + 8, this.y + 5, this.width - 16, this.height - 10);
        ctx.restore();
    }
}

let player;
let platforms = [];
let obstacles = [];

function init() {
    player = new Player();
    platforms = [new Platform(0, 1000)]; 
    obstacles = [];
    score = 0;
    gameSpeed = 6;
    isGameOver = false;
    gameFrame = 0;
    scoreElement.innerText = score;
    gameOverScreen.classList.add('hidden');
    animate();
}

function generateEnvironment() {
    let lastPlatform = platforms[platforms.length - 1];

    if (lastPlatform.x + lastPlatform.width < canvas.width + 400) {
        let minPlatformWidth = 450;
        let maxPlatformWidth = 750;
        let nextWidth = Math.floor(Math.random() * (maxPlatformWidth - minPlatformWidth)) + minPlatformWidth;
        
        let minGap = 80;
        let maxGap = 130;
        let nextGap = Math.floor(Math.random() * (maxGap - minGap)) + minGap;

        let nextX = lastPlatform.x + lastPlatform.width + nextGap;
        let newPlatform = new Platform(nextX, nextWidth);
        platforms.push(newPlatform);

        if (Math.random() < 0.75) {
            let type = Math.random() > 0.5 ? 'low' : 'high';
            let obstacleX = nextX + (nextWidth / 2) + (Math.random() * 60);
            obstacles.push(new Obstacle(obstacleX, type, newPlatform.y));
        }
    }

    if (platforms[0].x + platforms[0].width < 0) platforms.shift();
    if (obstacles.length > 0 && obstacles[0].x + obstacles[0].width < 0) obstacles.shift();
}

// Detecção de colisão AABB
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function endGame() {
    isGameOver = true;
    finalScoreElement.innerText = score;
    gameOverScreen.classList.remove('hidden');
}

function animate() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameFrame++;

    if (gameFrame % 10 === 0) {
        score++;
        scoreElement.innerText = score;
        if (score % 250 === 0 && gameSpeed < 11) gameSpeed += 0.4; 
    }

    generateEnvironment();

    let currentPlatform = platforms.find(p => player.x + player.width > p.x && player.x < p.x + p.width);

    platforms.forEach(p => {
        p.update();
        p.draw();
    });

    player.update(currentPlatform);
    player.draw();

    obstacles.forEach(o => {
        o.update();
        o.draw();
        
        if (checkCollision(player, o)) {
            endGame();
        }
    });

    requestAnimationFrame(animate);
}

restartBtn.addEventListener('click', init);
init();
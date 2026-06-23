const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreVal = document.getElementById("score-val");
const gameOverScreen = document.getElementById("game-over-screen");
const finalScore = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

// Configuração das 3 pistas
const LANES = [66, 200, 333]; 
let currentLane = 1; 

// Estados do jogo
let gameActive = true;
let score = 0;
let gameSpeed = 6;
let obstacles = [];
let spawnTimer = 0;

// O Jogador
const player = {
    x: LANES[currentLane],
    y: 510,
    radius: 18,
    color: "#ffca28", 
    targetX: LANES[currentLane] 
};

// Molde dos Obstáculos
class Obstacle {
    constructor() {
        this.lane = Math.floor(Math.random() * 3);
        this.width = 54;
        this.height = 75;
        this.x = LANES[this.lane] - (this.width / 2); 
        this.y = -this.height;
        this.color = Math.random() > 0.5 ? "#f85149" : "#58a6ff"; 
    }

    update() {
        this.y += gameSpeed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(this.x, this.y, this.width, this.height, 8);
        } else {
            ctx.rect(this.x, this.y, this.width, this.height);
        }
        ctx.fill();
        
        // Detalhes (Janelas do trem)
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillRect(this.x + 8, this.y + 12, 12, 15);
        ctx.fillRect(this.x + 34, this.y + 12, 12, 15);
    }
}

// Escuta os comandos do teclado
window.addEventListener("keydown", (e) => {
    if (!gameActive) return;

    if ((e.key === "ArrowLeft" || e.key === "a" || e.key === "A") && currentLane > 0) {
        currentLane--;
    } else if ((e.key === "ArrowRight" || e.key === "d" || e.key === "D") && currentLane < 2) {
        currentLane++;
    }
    player.targetX = LANES[currentLane];
});

// Reinicia o sistema do jogo
function init() {
    obstacles = [];
    score = 0;
    gameSpeed = 6;
    currentLane = 1;
    player.targetX = LANES[currentLane];
    player.x = LANES[currentLane];
    scoreVal.innerText = score;
    gameActive = true;
    gameOverScreen.classList.add("hidden");
    animate();
}

// Loop de quadros (Engine)
function animate() {
    if (!gameActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha linhas de divisão (Trilhos)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 6;
    for (let i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(i * (canvas.width / 3), 0);
        ctx.lineTo(i * (canvas.width / 3), canvas.height);
        ctx.stroke();
    }

    // Movimento lateral suave (Interpolação)
    player.x += (player.targetX - player.x) * 0.22;

    // Desenha o boneco do jogador
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "#ff5500";
    ctx.fillRect(player.x - 14, player.y - 24, 28, 8); // Boné

    // Cronômetro para soltar novos trens
    spawnTimer++;
    let spawnInterval = Math.max(40, 70 - Math.floor(gameSpeed * 2));
    if (spawnTimer >= spawnInterval) { 
        obstacles.push(new Obstacle());
        spawnTimer = 0;
    }

    // Gerencia cada obstáculo na tela
    for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        obs.update();
        obs.draw();

        // Hitbox do jogador
        let pLeft = player.x - player.radius + 3;
        let pRight = player.x + player.radius - 3;
        let pTop = player.y - player.radius + 3;
        let pBottom = player.y + player.radius - 3;

        // Detector de colisão física
        if (obs.x < pRight &&
            obs.x + obs.width > pLeft &&
            obs.y < pBottom &&
            obs.y + obs.height > pTop) {
            
            gameActive = false;
            finalScore.innerText = score;
            gameOverScreen.classList.remove("hidden");
        }

        // Ponto ganho ao esquivar do trem
        if (obs.y > canvas.height) {
            obstacles.splice(i, 1);
            score += 10;
            scoreVal.innerText = score;
            
            // Dificuldade progressiva
            if (score % 70 === 0) {
                gameSpeed += 0.4;
            }
        }
    }

    requestAnimationFrame(animate);
}

restartBtn.addEventListener("click", init);
init();
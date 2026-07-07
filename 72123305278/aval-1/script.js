// Captura dos elementos da interface gerados pelo HTML
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const coinCountEl = document.getElementById('coin-count');
const scoreCountEl = document.getElementById('score-count');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreEl = document.getElementById('final-score');

// Configurações das 3 pistas virtuais
const lanes = [80, 200, 320]; 
let currentLane = 1;

// Estado Geral do Jogo (Configurações de Alta Dificuldade)
let gameActive = true;
let score = 0;
let coins = 0;
let gameSpeed = 8; // Velocidade inicial hardcore
let spawnTimer = 0;
let animFrame = 0;

// Objeto do Jogador com física de transição lateral (Lerp)
const player = {
    x: lanes[currentLane],       
    targetX: lanes[currentLane], 
    y: 520,                      
    width: 30,
    height: 50,
    tilt: 0                      
};

// Listas de controle de entidades em movimento
let obstacles = [];
let gameCoins = [];

// Ouvinte de Eventos de Teclado (Inputs do jogador)
window.addEventListener('keydown', (e) => {
    if (!gameActive) return;
    
    if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && currentLane > 0) {
        currentLane--;
        player.tilt = -0.25; // Inclinação para a esquerda
    }
    if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && currentLane < 2) {
        currentLane++;
        player.tilt = 0.25; // Inclinação para a direita
    }
    player.targetX = lanes[currentLane];
});

// Mecanismo de IA para geração de obstáculos e moedas
function spawnElements() {
    spawnTimer++;
    
    // O intervalo diminui à medida que o jogo acelera, entupindo a tela
    let spawnInterval = Math.max(18, Math.floor(45 - (gameSpeed * 1.5))); 
    
    if (spawnTimer % spawnInterval === 0) {
        let setupType = Math.random();
        
        if (setupType < 0.40) {
            // BLOQUEIO DUPLO: Duas pistas fechadas ao mesmo tempo
            let freeLane = Math.floor(Math.random() * 3); 
            for (let i = 0; i < 3; i++) {
                if (i !== freeLane) {
                    obstacles.push({ x: lanes[i] - 32, y: -60, width: 64, height: 25, type: 'normal' });
                }
            }
        } else if (setupType < 0.70) {
            // TREM ALTO / PAREDE LONGA: Ocupa uma pista, mas é muito comprido
            let targetLane = Math.floor(Math.random() * 3);
            obstacles.push({ x: lanes[targetLane] - 30, y: -160, width: 60, height: 120, type: 'long' });
        } else {
            // OBSTÁCULO SIMPLES + MOEDA
            let obsLane = Math.floor(Math.random() * 3);
            obstacles.push({ x: lanes[obsLane] - 30, y: -40, width: 60, height: 25, type: 'normal' });
            
            let coinLane = (obsLane + 1) % 3;
            gameCoins.push({ x: lanes[coinLane], y: -20, radius: 12 });
        }
    }
}

// Atualização lógica da física e das posições (Engine do Jogo)
function update() {
    if (!gameActive) return;

    // Movimentação lateral fluida por interpolação linear
    player.x += (player.targetX - player.x) * 0.25;
    player.tilt += (0 - player.tilt) * 0.12;

    score += 0.3; 
    scoreCountEl.innerText = Math.floor(score);
    
    // Aceleração progressiva constante do jogo
    gameSpeed += 0.004; 
    animFrame += 0.3;    

    // Lógica de movimentação e colisão de obstáculos
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].y += gameSpeed;

        // Detecção de colisão por Hitbox (AABB)
        if (
            player.x + 14 > obstacles[i].x &&
            player.x - 14 < obstacles[i].x + obstacles[i].width &&
            player.y + 10 > obstacles[i].y &&
            player.y - 40 < obstacles[i].y + obstacles[i].height
        ) {
            gameOver();
        }

        if (obstacles[i].y > canvas.height) obstacles.splice(i, 1);
    }

    // Lógica de movimentação e coleta de moedas
    for (let i = gameCoins.length - 1; i >= 0; i--) {
        gameCoins[i].y += gameSpeed;

        // Detecção de colisão circular por distância euclidiana
        let distX = player.x - gameCoins[i].x;
        let distY = (player.y - 15) - gameCoins[i].y;
        let distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < 26) {
            coins++;
            score += 50; // Moedas dão bônus de metros direto no placar
            coinCountEl.innerText = coins;
            gameCoins.splice(i, 1);
            continue;
        }

        if (gameCoins[i].y > canvas.height) gameCoins.splice(i, 1);
    }

    spawnElements();
}

// Renderização Gráfica das imagens e formas no Canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Desenhar as Linhas das Pistas (Efeito Neon)
    ctx.strokeStyle = '#3d1c2a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(140, 0); ctx.lineTo(140, canvas.height);
    ctx.moveTo(260, 0); ctx.lineTo(260, canvas.height);
    ctx.stroke();

    // Grid em movimento rápido no chão
    let lineY = (score * 12) % 60;
    ctx.strokeStyle = 'rgba(255, 0, 85, 0.15)';
    for (let y = lineY; y < canvas.height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // 2. Desenhar as Moedas de Ouro
    gameCoins.forEach(coin => {
        ctx.fillStyle = '#ffcc00';
        ctx.shadowColor = '#ffcc00';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, coin.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.shadowBlur = 0;

    // 3. Desenhar os Obstáculos (Normais e Longos)
    obstacles.forEach(obs => {
        if (obs.type === 'long') {
            let grad = ctx.createLinearGradient(obs.x, obs.y, obs.x, obs.y + obs.height);
            grad.addColorStop(0, '#ff5500');
            grad.addColorStop(1, '#661100');
            ctx.fillStyle = grad;
            ctx.shadowColor = '#ff5500';
        } else {
            ctx.fillStyle = '#ff0055';
            ctx.shadowColor = '#ff0055';
        }
        
        ctx.shadowBlur = 12;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(obs.x + 4, obs.y + 4, obs.width - 8, 4);
    });
    ctx.shadowBlur = 0;

    // 4. Desenhar o Personagem Corredor 2D
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.tilt);

    // Sombra do Personagem
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.ellipse(0, 12, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pernas Animadas (Movimento senoidal/cossenoide)
    ctx.fillStyle = '#00f3ff';
    let legLeftY = Math.sin(animFrame) * 9;
    let legRightY = Math.cos(animFrame) * 9;
    ctx.fillRect(-8, 0, 5, 10 + legLeftY);
    ctx.fillRect(3, 0, 5, 10 + legRightY);

    // Jaqueta
    ctx.fillStyle = '#16192b';
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 2;
    ctx.fillRect(-12, -30, 24, 30);
    ctx.strokeRect(-12, -30, 24, 30);

    // Logotipo brilhante nas costas
    ctx.fillStyle = '#ff0055';
    ctx.fillRect(-4, -22, 8, 14);

    // Capacete Cyber
    ctx.fillStyle = '#00f3ff';
    ctx.shadowColor = '#00f3ff';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, -40, 10, 0, Math.PI * 2);
    ctx.fill();

    // Visor
    ctx.fillStyle = '#ff0055';
    ctx.fillRect(-6, -43, 12, 5);

    ctx.restore();
    ctx.shadowBlur = 0;
}

// Função de Loop Principal controlada pelo navegador
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Ativada ao bater em um obstáculo
function gameOver() {
    gameActive = false;
    gameOverScreen.style.display = 'flex';
    finalScoreEl.innerHTML = `Moedas Coletadas: ${coins}<br>Recorde de Distância: <span style="color:#00f3ff; font-weight:bold">${Math.floor(score)}m</span>`;
}

// Reinicia todas as variáveis para o estado inicial
function resetGame() {
    obstacles = [];
    gameCoins = [];
    score = 0;
    coins = 0;
    gameSpeed = 8; 
    currentLane = 1;
    player.x = lanes[currentLane];
    player.targetX = lanes[currentLane];
    player.tilt = 0;
    coinCountEl.innerText = '0';
    scoreCountEl.innerText = '0';
    gameOverScreen.style.display = 'none';
    gameActive = true;
}

// Inicialização Global
gameLoop(); 
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configurações do Jogo
const groundY = canvas.height - 80;
let score = 0;
let gameActive = true;
let gameWon = false; 
let gameSpeed = 6; 

// Escala de tempo APENAS para o contador
const timeScale = 1 / 1.5; 
let startTime = Date.now();
let elapsedTime = "0.00";

// Propriedades do Jogador
const player = {
    x: 100,
    y: groundY - 40,
    size: 40,
    vy: 0,
    gravity: 0.9, 
    jumpForce: -14, 
    isGrounded: false,
    rotation: 0
};

// Sistema de Partículas (Efeito Visual de Rastro/Poeira)
let particles = [];
function createParticle(x, y, color) {
    particles.push({
        x: x,
        y: y,
        vx: -gameSpeed * 0.4 + (Math.random() * 2 - 1),
        vy: (Math.random() * -2),
        size: Math.random() * 5 + 2,
        alpha: 1,
        color: color,
        decay: Math.random() * 0.03 + 0.02
    });
}

function updateAndDrawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        
        if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
        }
        
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Lista de Obstáculos e Controle de Spawn
let obstacles = [];
let spawnTimer = 0;

// Dimensões fixas do botão de Reiniciar (usado apenas na Vitória)
const btnW = 320;
const btnH = 50;
const btnX = canvas.width / 2 - btnW / 2;
const btnY = canvas.height / 2 + 15; 

// Função auxiliar para verificar se o clique foi no botão
function isButtonClick(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const clickX = (clientX - rect.left) * (canvas.width / rect.width);
    const clickY = (clientY - rect.top) * (canvas.height / rect.height);
    
    return (clickX >= btnX && clickX <= btnX + btnW && clickY >= btnY && clickY <= btnY + btnH);
}

// Função para desenhar a Bandeira do Brasil de forma geométrica no Canvas
function drawBrazilianFlag(centerX, centerY, width) {
    const height = width * (14 / 20); 
    const x = centerX - width / 2;
    const y = centerY - height / 2;

    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#009b3a';

    // 1. Retângulo Verde
    ctx.fillStyle = '#009b3a';
    ctx.fillRect(x, y, width, height);

    // 2. Losango Amarelo
    const margin = width * 0.085; 
    ctx.fillStyle = '#fedf00';
    ctx.beginPath();
    ctx.moveTo(centerX, y + margin); 
    ctx.lineTo(x + width - margin, centerY); 
    ctx.lineTo(centerX, y + height - margin); 
    ctx.lineTo(x + margin, centerY); 
    ctx.closePath();
    ctx.fill();

    // 3. Círculo Azul
    const radius = width * 0.175; 
    ctx.fillStyle = '#002776';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    // 4. Faixa Branca
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = width * 0.02;
    ctx.beginPath();
    ctx.arc(centerX - radius * 0.3, centerY + radius * 1.1, radius * 1.2, Math.PI * 1.7, Math.PI * 1.95);
    ctx.stroke();

    ctx.restore();
}

// Captura de comandos
window.addEventListener('keydown', (e) => {
    if (gameWon && e.code === 'KeyF') {
        resetGame();
        return;
    }
    if (e.code === 'Space') jump();
});

window.addEventListener('touchstart', (e) => {
    if (gameWon) {
        const touch = e.touches[0];
        if (isButtonClick(touch.clientX, touch.clientY)) {
            resetGame();
        }
    } else {
        jump();
    }
});

window.addEventListener('mousedown', (e) => {
    if (gameWon) {
        if (isButtonClick(e.clientX, e.clientY)) {
            resetGame();
        }
    } else {
        jump();
    }
});

function jump() {
    if (gameWon) return;
    if (player.isGrounded) {
        player.vy = player.jumpForce;
        player.isGrounded = false;
        // Partículas de impacto no pulo
        for(let i=0; i<8; i++) createParticle(player.x + player.size/2, groundY, '#00f0ff');
    }
}

// Gerador de Obstáculos
function spawnObstacle() {
    if (spawnTimer <= 0) {
        const types = ['singleSpike', 'tripleSpike', 'block', 'barricadeWithStair'];
        const randomType = types[Math.floor(Math.random() * types.length)];

        if (randomType === 'singleSpike') {
            obstacles.push({ type: 'singleSpike', x: canvas.width, width: 30, height: 40, y: groundY });
            spawnTimer = Math.random() * 50 + 70;
        } 
        else if (randomType === 'tripleSpike') {
            obstacles.push({ type: 'tripleSpike', x: canvas.width, width: 85, height: 40, y: groundY });
            spawnTimer = Math.random() * 50 + 85;
        } 
        else if (randomType === 'block') {
            obstacles.push({ type: 'block', x: canvas.width, width: 40, height: 40, y: groundY });
            spawnTimer = Math.random() * 50 + 70;
        } 
        else if (randomType === 'barricadeWithStair') {
            obstacles.push({ 
                type: 'barricadeWithStair', 
                x: canvas.width, 
                stairWidth: 40, 
                stairHeight: 40, 
                wallWidth: 40, 
                wallHeight: 80, 
                y: groundY 
            });
            spawnTimer = Math.random() * 60 + 110;
        }
    }
    spawnTimer--;
}

function resetGame() {
    player.y = groundY - player.size;
    player.vy = 0;
    player.rotation = 0;
    player.isGrounded = true;
    obstacles = [];
    particles = []; // Limpa partículas antigas
    score = 0;
    gameSpeed = 6; 
    startTime = Date.now(); 
    elapsedTime = "0.00";
    gameActive = true;
    gameWon = false; 
}

function checkSolidCollision(p, bX, bY, bW, bH) {
    if (p.x < bX + bW && p.x + p.size > bX && p.y < bY + bH && p.y + p.size > bY) {
        let overlapX1 = (p.x + p.size) - bX; 
        let overlapX2 = (bX + bW) - p.x;     
        let overlapY1 = (p.y + p.size) - bY; 
        
        let minX = Math.min(overlapX1, overlapX2);
        
        if (overlapY1 < minX && p.vy >= 0) {
            p.y = bY - p.size;
            p.vy = 0;
            p.isGrounded = true;
            return "TOP";
        } else {
            return "DEATH";
        }
    }
    return "NONE";
}

function update() {
    if (!gameActive || gameWon) return; 

    let currentTime = Date.now();
    let realElapsed = (currentTime - startTime) / 1000;
    elapsedTime = (realElapsed * timeScale).toFixed(2);

    player.vy += player.gravity;
    player.y += player.vy;

    let onPlatform = false;
    spawnObstacle();

    // Cria rastro de poeira constante se o jogador estiver no chão
    if (player.isGrounded && Math.random() < 0.4) {
        createParticle(player.x, groundY - 2, 'rgba(0, 240, 255, 0.5)');
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        obs.x -= gameSpeed;
        
        if (obs.type === 'singleSpike' || obs.type === 'tripleSpike') {
            if (player.x < obs.x + obs.width &&
                player.x + player.size > obs.x &&
                player.y + player.size > obs.y - obs.height &&
                player.y < obs.y) {
                resetGame(); 
                return;
            }
        } 
        else if (obs.type === 'block') {
            let result = checkSolidCollision(player, obs.x, obs.y - obs.height, obs.width, obs.height);
            if (result === "TOP") onPlatform = true;
            if (result === "DEATH") {
                resetGame(); 
                return;
            }
        }
        else if (obs.type === 'barricadeWithStair') {
            let resultStair = checkSolidCollision(player, obs.x, obs.y - obs.stairHeight, obs.stairWidth, obs.stairHeight);
            if (resultStair === "TOP") onPlatform = true;
            if (resultStair === "DEATH") {
                resetGame(); 
                return;
            }

            let wallX = obs.x + obs.stairWidth;
            let resultWall = checkSolidCollision(player, wallX, obs.y - obs.wallHeight, obs.wallWidth, obs.wallHeight);
            if (resultWall === "TOP") onPlatform = true;
            if (resultWall === "DEATH") {
                resetGame(); 
                return;
            }
        }

        let fullWidth = obs.width || (obs.stairWidth + obs.wallWidth);
        if (obs.x + fullWidth < 0) {
            obstacles.splice(i, 1);
            score += 4; 
            
            if (score >= 36) {
                gameWon = true;
                return;
            }

            if (score % 20 === 0) gameSpeed += 0.5; 
        }
    }

    if (onPlatform) {
        player.rotation = Math.round(player.rotation / 90) * 90;
    } else {
        if (player.y >= groundY - player.size) {
            player.y = groundY - player.size;
            player.vy = 0;
            player.isGrounded = true;
            player.rotation = Math.round(player.rotation / 90) * 90;
        } else {
            player.rotation += 4; 
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- NOVO FUNDO DEGRADÊ ESPACIAL DE ALTA QUALIDADE ---
    let bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#0b0410');
    bgGradient.addColorStop(0.5, '#1a0b2e');
    bgGradient.addColorStop(1, '#07020d');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Renderiza e atualiza partículas atrás do jogador e obstáculos
    updateAndDrawParticles();

    // --- CHÃO ROXO VIDRADO (COM BRILHO NEON) ---
    ctx.save();
    let glassGradient = ctx.createLinearGradient(0, groundY, 0, canvas.height);
    glassGradient.addColorStop(0, 'rgba(154, 75, 255, 0.45)');  
    glassGradient.addColorStop(0.1, 'rgba(59, 12, 110, 0.3)');   
    glassGradient.addColorStop(1, 'rgba(10, 2, 20, 0.8)');   
    ctx.fillStyle = glassGradient;
    ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
    ctx.restore();                 

    // --- LINHA CINZA NEON PRINCIPAL (O CHÃO) ---
    ctx.save();
    ctx.strokeStyle = '#c084fc'; 
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#a855f7';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(canvas.width, groundY);
    ctx.stroke();
    ctx.restore();

    // --- JOGADOR MELHORADO (CUBO CIANO FUTURISTA COM GLOW) ---
    ctx.save();
    ctx.translate(player.x + player.size / 2, player.y + player.size / 2);
    ctx.rotate((player.rotation * Math.PI) / 180);
    
    // Sombra interna/Efeito Glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00f0ff';
    
    // Degradê interno do cubo
    let playerGrad = ctx.createLinearGradient(-player.size/2, -player.size/2, player.size/2, player.size/2);
    playerGrad.addColorStop(0, '#00ffff');
    playerGrad.addColorStop(1, '#0088cc');
    ctx.fillStyle = playerGrad;
    ctx.fillRect(-player.size / 2, -player.size / 2, player.size, player.size);
    
    // Detalhe interno geométrico (estilo Tron/Geometry Dash)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 0; // Desliga o shadow para a linha interna ficar nítida
    ctx.strokeRect(-player.size / 2 + 6, -player.size / 2 + 6, player.size - 12, player.size - 12);
    
    // Pequeno detalhe central
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-4, -4, 8, 8);
    ctx.restore();

    // --- OBSTÁCULOS REESTILIZADOS ---
    obstacles.forEach(obs => {
        ctx.save();
        
        if (obs.type === 'singleSpike') {
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#ef4444';
            let spikeGrad = ctx.createLinearGradient(obs.x, obs.y - obs.height, obs.x, obs.y);
            spikeGrad.addColorStop(0, '#ff6b6b');
            spikeGrad.addColorStop(1, '#991b1b');
            ctx.fillStyle = spikeGrad;
            
            ctx.beginPath();
            ctx.moveTo(obs.x, obs.y);
            ctx.lineTo(obs.x + obs.width / 2, obs.y - obs.height);
            ctx.lineTo(obs.x + obs.width, obs.y);
            ctx.closePath();
            ctx.fill();
        } 
        else if (obs.type === 'tripleSpike') {
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#ec4899';
            let spikeW = obs.width / 3;
            for (let k = 0; k < 3; k++) {
                let startX = obs.x + (k * spikeW);
                let tripleGrad = ctx.createLinearGradient(startX, obs.y - obs.height, startX, obs.y);
                tripleGrad.addColorStop(0, '#f472b6');
                tripleGrad.addColorStop(1, '#9d174d');
                ctx.fillStyle = tripleGrad;

                ctx.beginPath();
                ctx.moveTo(startX, obs.y);
                ctx.lineTo(startX + spikeW / 2, obs.y - obs.height);
                ctx.lineTo(startX + spikeW, obs.y);
                ctx.closePath();
                ctx.fill();
            }
        } 
        else if (obs.type === 'block') {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#a855f7';
            let blockGrad = ctx.createLinearGradient(obs.x, obs.y - obs.height, obs.x + obs.width, obs.y);
            blockGrad.addColorStop(0, '#c084fc');
            blockGrad.addColorStop(1, '#581c87');
            ctx.fillStyle = blockGrad;
            
            ctx.fillRect(obs.x, obs.y - obs.height, obs.width, obs.height);
            ctx.strokeStyle = '#e9d5ff';
            ctx.lineWidth = 2;
            ctx.strokeRect(obs.x, obs.y - obs.height, obs.width, obs.height);
        }
        else if (obs.type === 'barricadeWithStair') {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#6366f1';
            
            // Degrau inferior
            let stairGrad = ctx.createLinearGradient(obs.x, obs.y - obs.stairHeight, obs.x + obs.stairWidth, obs.y);
            stairGrad.addColorStop(0, '#818cf8');
            stairGrad.addColorStop(1, '#3730a3');
            ctx.fillStyle = stairGrad;
            ctx.fillRect(obs.x, obs.y - obs.stairHeight, obs.stairWidth, obs.stairHeight);
            ctx.strokeStyle = '#e0e7ff';
            ctx.strokeRect(obs.x, obs.y - obs.stairHeight, obs.stairWidth, obs.stairHeight);

            // Parede alta
            let wallX = obs.x + obs.stairWidth;
            let wallGrad = ctx.createLinearGradient(wallX, obs.y - obs.wallHeight, wallX + obs.wallWidth, obs.y);
            wallGrad.addColorStop(0, '#4f46e5');
            wallGrad.addColorStop(1, '#1e1b4b');
            ctx.fillStyle = wallGrad;
            ctx.fillRect(wallX, obs.y - obs.wallHeight, obs.wallWidth, obs.wallHeight);
            ctx.strokeRect(wallX, obs.y - obs.wallHeight, obs.wallWidth, obs.wallHeight);
        }
        
        ctx.restore();
    });

    // --- INTERFACE HUD MODERNA ---
    ctx.save();
    ctx.textBaseline = 'top';
    
    // Box de Pontos
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 22px "Courier New", Courier, monospace';
    ctx.shadowBlur = 5;
    ctx.shadowColor = '#ffffff';
    ctx.textAlign = 'left';
    ctx.fillText(`PONTOS: ${String(score).padStart(3, '0')}`, 30, 30);

    // Box de Tempo
    ctx.textAlign = 'right';
    ctx.fillStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.fillText(`TEMPO: ${elapsedTime}s`, canvas.width - 30, 30); 
    ctx.restore();

    // --- TELA DE VITÓRIA PREMIUM ---
    if (gameWon) {
        ctx.save();
        ctx.fillStyle = 'rgba(6, 18, 12, 0.92)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Brilho do título
        ctx.shadowBlur = 25;
        ctx.shadowColor = '#22c55e';
        ctx.fillStyle = '#4ade80'; 
        ctx.font = 'bold 50px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('¡VITÓRIA EXCEPCIONAL!', canvas.width / 2, canvas.height / 2 - 60);

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '20px Arial';
        ctx.fillText('Parabéns! Você dominou o percurso perfeitamente.', canvas.width / 2, canvas.height / 2 - 15);
        ctx.fillStyle = '#fbbf24'; 
        ctx.font = 'bold 22px Arial';
        ctx.fillText(`Pontuação Final: ${score} Recorde`, canvas.width / 2, canvas.height / 2 + 20);

        // Botão de reiniciar Estilizado
        ctx.fillStyle = 'rgba(34, 197, 94, 0.15)';
        ctx.strokeStyle = '#4ade80'; 
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(btnX, btnY, btnW, btnH, 10); 
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '600 16px Arial';
        ctx.fillText('Pressione F ou Clique Aqui para Voltar', canvas.width / 2, btnY + 31);
        
        // BANDEIRA DO BRASIL ÚNICA
        drawBrazilianFlag(canvas.width / 2, canvas.height - 75, 120);
        ctx.restore();
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();  
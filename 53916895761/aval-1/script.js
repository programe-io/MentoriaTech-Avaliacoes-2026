// ==================== CONFIGURAÇÃO E MAPAS DE FASE ====================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRID_SIZE = 20;
const TILE_COUNT = canvas.width / GRID_SIZE;

// Definição das Frutas, Cores e Pontuações
const FRUIT_TYPES = [
    { name: 'normal', chance: 0.65, points: 10, color1: '#ff6688', color2: '#cc1133', shadow: '#ff4466', label: '🍒' },
    { name: 'rara', chance: 0.20, points: 25, color1: '#ffbb44', color2: '#ff6600', shadow: '#ffaa00', label: '🍊' },
    { name: 'mistica', chance: 0.10, points: 50, color1: '#66ffff', color2: '#0099cc', shadow: '#00e5ff', label: '💎' },
    { name: 'caos', chance: 0.05, points: 100, color1: '#dd99ff', color2: '#7711dd', shadow: '#ae81ff', label: '💀' }
];

// Configuração das fases: velocidade base, pontuação alvo e disposição dos obstáculos fixos
const CONFIG_FASES = [
    { fase: 1, speed: 7, target: 60, theme: '#00ff88', bg: '#050515', walls: [] },
    { fase: 2, speed: 9, target: 150, theme: '#00e5ff', bg: '#020b14', walls: [{x:5,y:5},{x:6,y:5},{x:7,y:5},{x:12,y:14},{x:13,y:14},{x:14,y:14}] },
    { fase: 3, speed: 11, target: 300, theme: '#ffaa00', bg: '#100a02', walls: [{x:10,y:4},{x:10,y:5},{x:10,y:6},{x:10,y:7},{x:10,y:12},{x:10,y:13},{x:10,y:14},{x:10,y:15}] },
    { fase: 4, speed: 13, target: 500, theme: '#ff4466', bg: '#140208', walls: [{x:4,y:4},{x:15,y:4},{x:4,y:15},{x:15,y:15},{x:9,y:9},{x:10,y:9},{x:9,y:10},{x:10,y:10}] },
    { fase: 5, speed: 15, target: 9999, theme: '#ae81ff', bg: '#0d0214', walls: [{x:2,y:5},{x:3,y:5},{x:4,y:5},{x:15,y:5},{x:16,y:5},{x:17,y:5},{x:2,y:14},{x:3,y:14},{x:4,y:14},{x:15,y:14},{x:16,y:14},{x:17,y:14},{x:9,y:4},{x:10,y:4},{x:9,y:15},{x:10,y:15}] }
];

// ==================== ESTADO GLOBAL DE JOGO ====================
let snake = [];
let food = {};
let obstacles = [];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };

let score = 0;
let currentFaseIdx = 0;
let highScore = parseInt(localStorage.getItem('snakeHighPhaseScore')) || 0;

let gameRunning = false;
let gamePaused = false;
let gameLoop = null;
let currentSpeed = 7;
let particles = [];
let animationFrame = 0;

// Seleção de DOM
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highScore');
const valFaseEl = document.getElementById('valFase');
const valObjetivoEl = document.getElementById('valObjetivo');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const nextLevelScreen = document.getElementById('nextLevelScreen');
const finalScoreEl = document.getElementById('finalScore');
const newRecordMsg = document.getElementById('newRecordMsg');
const gameTitle = document.getElementById('gameTitle');

highScoreEl.textContent = highScore;

// ==================== CONTROLE LOGICO E MECÂNICAS ====================

function initGame(resetCompletamente = true) {
    if (resetCompletamente) {
        score = 0;
        currentFaseIdx = 0;
        scoreEl.textContent = '0';
    }

    const cfg = CONFIG_FASES[currentFaseIdx];
    currentSpeed = cfg.speed;
    obstacles = [...cfg.walls];
    
    // Customização visual de acordo com o nível atual
    document.body.style.backgroundColor = cfg.bg;
    canvas.style.borderColor = cfg.theme;
    gameTitle.style.color = cfg.theme;
    gameTitle.style.textShadow = `0 0 20px ${cfg.theme}`;
    valFaseEl.textContent = cfg.fase;
    atualizarObjetivo();

    // Posicionar cobra em local seguro e livre de blocos
    const startX = 2;
    const startY = Math.floor(TILE_COUNT / 2);
    snake = [
        { x: startX, y: startY },
        { x: startX - 1, y: startY },
        { x: startX - 2, y: startY }
    ];

    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    particles = [];
    
    spawnFood();
}

function atualizarObjetivo() {
    const cfg = CONFIG_FASES[currentFaseIdx];
    if (cfg.target > 500) {
        valObjetivoEl.textContent = "INFINITO";
    } else {
        valObjetivoEl.textContent = `${score}/${cfg.target}`;
    }
}

function spawnFood() {
    let newFood;
    let localInvalido;
    let rand = Math.random();
    let tipoEscolhido = FRUIT_TYPES[0];

    // Roda sorteio de raridade da fruta
    let acumulador = 0;
    for (let t of FRUIT_TYPES) {
        acumulador += t.chance;
        if (rand <= acumulador) {
            tipoEscolhido = t;
            break;
        }
    }

    do {
        localInvalido = false;
        newFood = {
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT),
            meta: tipoEscolhido
        };

        // Certifica de não spawnar em cima do jogador ou de paredes
        if (snake.some(s => s.x === newFood.x && s.y === newFood.y)) localInvalido = true;
        if (obstacles.some(o => o.x === newFood.x && o.y === newFood.y)) localInvalido = true;
    } while (localInvalido);

    food = newFood;
}

function update() {
    if (!gameRunning || gamePaused) return;

    animationFrame++;
    direction = { ...nextDirection };

    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    // Colisão com bordas da matriz
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        gameOver(); return;
    }

    // Colisão com obstáculos específicos da fase
    if (obstacles.some(o => o.x === head.x && o.y === head.y)) {
        gameOver(); return;
    }

    // Colisão autoinfligida (corpo)
    if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        gameOver(); return;
    }

    snake.unshift(head);

    // Processo de Alimentação
    if (head.x === food.x && head.y === food.y) {
        score += food.meta.points;
        scoreEl.textContent = score;
        
        createParticles(
            food.x * GRID_SIZE + GRID_SIZE / 2,
            food.y * GRID_SIZE + GRID_SIZE / 2,
            food.meta.shadow
        );

        // Aumento progressivo e dinâmico de velocidade por fruta ingerida
        currentSpeed += 0.2;
        
        // Valida transição de níveis
        const cfgAtual = CONFIG_FASES[currentFaseIdx];
        if (score >= cfgAtual.target && currentFaseIdx < CONFIG_FASES.length - 1) {
            avançarFase();
        } else {
            atualizarObjetivo();
            restartGameLoop();
            spawnFood();
        }
    } else {
        snake.pop();
    }
}

function avançarFase() {
    gameRunning = false;
    clearInterval(gameLoop);
    currentFaseIdx++;
    
    document.getElementById('nextLevelMsg').textContent = `Você alcançou a Fase ${CONFIG_FASES[currentFaseIdx].fase}! A velocidade e os dados corrompidos aumentaram.`;
    nextLevelScreen.classList.remove('hidden');
}

function carregarProximaFase() {
    nextLevelScreen.classList.add('hidden');
    gameRunning = true;
    initGame(false); // Inicia mantendo a pontuação atual estável
    startGameLoop();
}

// ==================== DESIGN E RENDERIZAÇÃO ====================

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const corTema = CONFIG_FASES[currentFaseIdx].theme;

    // Desenho de Linhas de Célula Estilizadas
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= TILE_COUNT; i++) {
        ctx.beginPath(); ctx.moveTo(i * GRID_SIZE, 0); ctx.lineTo(i * GRID_SIZE, canvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * GRID_SIZE); ctx.lineTo(canvas.width, i * GRID_SIZE); ctx.stroke();
    }

    // Atualização e desenho de efeitos explosivos (partículas)
    particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Desenho dos Módulos de Obstáculos (Paredes)
    obstacles.forEach(o => {
        const ox = o.x * GRID_SIZE;
        const oy = o.y * GRID_SIZE;
        
        ctx.fillStyle = '#1b1b3a';
        ctx.strokeStyle = corTema;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = corTema;
        ctx.shadowBlur = 4;
        
        roundRect(ox + 2, oy + 2, GRID_SIZE - 4, GRID_SIZE - 4, 4);
        ctx.fill();
        ctx.stroke();
        
        // Detalhe interno de aviso analógico de barreira
        ctx.fillStyle = corTema;
        ctx.fillRect(ox + GRID_SIZE/2 - 2, oy + GRID_SIZE/2 - 2, 4, 4);
    });
    ctx.shadowBlur = 0;

    // Elementos dinâmicos principais
    if (snake.length > 0) {
        drawFood();
        drawSnake();
    }
}

function drawSnake() {
    const corTema = CONFIG_FASES[currentFaseIdx].theme;

    snake.forEach((segment, index) => {
        const x = segment.x * GRID_SIZE;
        const y = segment.y * GRID_SIZE;
        const progress = index / snake.length;

        if (index === 0) {
            // Cabeça Neon
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = corTema;
            ctx.shadowBlur = 14;
            roundRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2, 5);
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Olhos vetorizados simples
            ctx.fillStyle = '#000';
            ctx.fillRect(x + GRID_SIZE/2 - (direction.y !== 0 ? 5 : -2), y + GRID_SIZE/2 - (direction.x !== 0 ? 5 : -2), 3, 3);
            ctx.fillRect(x + GRID_SIZE/2 + (direction.y !== 0 ? 3 : 2), y + GRID_SIZE/2 + (direction.x !== 0 ? 3 : 2), 3, 3);
        } else {
            // Cauda com gradiente decrescente dependente do tema de nível
            ctx.fillStyle = corTema;
            ctx.globalAlpha = 1 - (progress * 0.7);
            const offset = 1.5 + (progress * 2);
            roundRect(x + offset, y + offset, GRID_SIZE - offset*2, GRID_SIZE - offset*2, 4);
            ctx.fill();
        }
    });
    ctx.globalAlpha = 1;
}

function drawFood() {
    const meta = food.meta;
    const x = food.x * GRID_SIZE;
    const y = food.y * GRID_SIZE;
    const cx = x + GRID_SIZE / 2;
    const cy = y + GRID_SIZE / 2;

    const pulse = Math.sin(animationFrame * 0.2) * 1.8;

    ctx.shadowColor = meta.shadow;
    ctx.shadowBlur = 15 + pulse * 2;

    const gradient = ctx.createRadialGradient(cx - 2, cy - 2, 1, cx, cy, GRID_SIZE / 2 + pulse);
    gradient.addColorStop(0, meta.color1);
    gradient.addColorStop(1, meta.color2);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(3, GRID_SIZE / 2 - 2 + pulse), 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

function createParticles(x, y, color) {
    for (let i = 0; i < 15; i++) {
        particles.push({
            x: x, y: y,
            vx: (Math.random() - 0.5) * 7,
            vy: (Math.random() - 0.5) * 7,
            life: 1,
            decay: 0.03 + Math.random() * 0.03,
            size: 1.5 + Math.random() * 3,
            color: color
        });
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]; p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.life <= 0) particles.splice(i, 1);
    }
}

function roundRect(x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
}

// ==================== INTERRUPÇÕES E FIM DE SESSÃO ====================
function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);

    let isNewRecord = false;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighPhaseScore', highScore);
        highScoreEl.textContent = highScore;
        isNewRecord = true;
    }

    finalScoreEl.textContent = `Pontuação Final: ${score}`;
    newRecordMsg.style.display = isNewRecord ? 'block' : 'none';
    gameOverScreen.classList.remove('hidden');
}

function startGame() {
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    gameRunning = true;
    gamePaused = false;
    initGame(true);
    startGameLoop();
}

function startGameLoop() {
    clearInterval(gameLoop);
    gameLoop = setInterval(() => {
        update();
        updateParticles();
        draw();
    }, 1000 / currentSpeed);
}

function restartGameLoop() {
    if (gameRunning) startGameLoop();
}

// ==================== INTERAÇÃO (INPUTS) ====================
function changeDirection(key) {
    if (!gameRunning || gamePaused) return;
    switch (key) {
        case 'up': if (direction.y !== 1) nextDirection = { x: 0, y: -1 }; break;
        case 'down': if (direction.y !== -1) nextDirection = { x: 0, y: 1 }; break;
        case 'left': if (direction.x !== 1) nextDirection = { x: -1, y: 0 }; break;
        case 'right': if (direction.x !== -1) nextDirection = { x: 1, y: 0 }; break;
    }
}

document.addEventListener('keydown', (e) => {
    if ((e.key === 'p' || e.key === 'P') && gameRunning) {
        gamePaused = !gamePaused; return;
    }
    const mapping = {
        'ArrowUp': 'up', 'w': 'up', 'W': 'up',
        'ArrowDown': 'down', 's': 'down', 'S': 'down',
        'ArrowLeft': 'left', 'a': 'left', 'A': 'left',
        'ArrowRight': 'right', 'd': 'right', 'D': 'right'
    };
    if (mapping[e.key]) {
        changeDirection(mapping[e.key]);
        if (gameRunning) e.preventDefault();
    }
});

// Conectores dos botões DOM
document.getElementById('btnStart').addEventListener('click', startGame);
document.getElementById('btnRestart').addEventListener('click', startGame);
document.getElementById('btnNextLevel').addEventListener('click', carregarProximaFase);

document.getElementById('btnUp').addEventListener('click', () => changeDirection('up'));
document.getElementById('btnDown').addEventListener('click', () => changeDirection('down'));
document.getElementById('btnLeft').addEventListener('click', () => changeDirection('left'));
document.getElementById('btnRight').addEventListener('click', () => changeDirection('right'));

// Swipe para Mobile
let touchStartX = 0, touchStartY = 0;
canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX; touchStartY = e.touches[0].clientY;
}, { passive: true });

canvas.addEventListener('touchend', (e) => {
    if (!gameRunning || gamePaused) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > 30) changeDirection(dx > 0 ? 'right' : 'left');
    } else {
        if (Math.abs(dy) > 30) changeDirection(dy > 0 ? 'down' : 'up');
    }
}, { passive: true });

// Primeiro frame decorativo de fundo
draw();
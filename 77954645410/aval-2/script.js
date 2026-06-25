// Elementos do DOM
const ball = document.getElementById('ball');
const tower = document.getElementById('helix-tower');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over-screen');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');

// Estado do Jogo
let score = 0;
let towerRotation = 0;
let ballVelocityY = 0;
const ballPositionY = 250; // Posição visual fixa da bola na tela
let towerPositionY = 0;    // Deslocamento vertical da torre
let isGameOver = false;
let platforms = [];

// Constantes de Física
const gravity = 0.35;
const jumpStrength = -7.5;
const platformSpacing = 220;
const rotationSpeed = 6; // Velocidade ao apertar os botões

// --- FUNÇÕES DE INICIALIZAÇÃO ---

function init() {
    score = 0;
    towerRotation = 0;
    towerPositionY = 0;
    ballVelocityY = 0;
    isGameOver = false;
    platforms = [];
    tower.innerHTML = '';
    scoreDisplay.innerText = score;
    gameOverScreen.classList.add('hidden');
    
    buildTower();
    setupControls();
    
    // Inicia o Loop Principal
    requestAnimationFrame(updateGame);
}

function buildTower() {
    // Cria 25 níveis de plataformas
    for (let i = 0; i < 25; i++) {
        const platformY = 450 + (i * platformSpacing);
        const randomRotation = Math.floor(Math.random() * 360);
        // O primeiro nível nunca é perigoso
        const isDanger = i > 0 && Math.random() > 0.75; 

        const platformEl = document.createElement('div');
        platformEl.className = `platform ${isDanger ? 'danger' : ''}`;
        platformEl.style.top = `${platformY}px`;
        platformEl.style.transform = `rotateY(${randomRotation}deg)`;
        
        const gap = document.createElement('div');
        gap.className = 'gap';
        platformEl.appendChild(gap);
        tower.appendChild(platformEl);

        platforms.push({
            element: platformEl,
            y: platformY,
            rotation: randomRotation,
            isDanger: isDanger,
            passed: false
        });
    }
}

// --- FUNÇÕES DE CONTROLE (Mecanismo de Apertar/Arrastar) ---

function rotateLeft() {
    towerRotation += rotationSpeed;
}

function rotateRight() {
    towerRotation -= rotationSpeed;
}

function setupControls() {
    // 1. Ao APERTAR os botões virtuais da tela (Mouse ou Toque)
    let autoRotateInterval = null;

    const startRotation = (directionFn) => {
        if (isGameOver) return;
        directionFn(); // Executa o primeiro movimento imediato
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(directionFn, 20); // Continua girando enquanto mantiver pressionado
    };

    const stopRotation = () => {
        clearInterval(autoRotateInterval);
    };

    // Eventos do botão Esquerdo
    btnLeft.addEventListener('mousedown', () => startRotation(rotateLeft));
    btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); startRotation(rotateLeft); });

    // Eventos do botão Direito
    btnRight.addEventListener('mousedown', () => startRotation(rotateRight));
    btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); startRotation(rotateRight); });

    // Parar rotação ao soltar
    window.addEventListener('mouseup', stopRotation);
    window.addEventListener('touchend', stopRotation);

    // 2. Controles Físicos do Teclado (Setas Laterais)
    window.addEventListener('keydown', (e) => {
        if (isGameOver) return;
        if (e.key === 'ArrowLeft') rotateLeft();
        if (e.key === 'ArrowRight') rotateRight();
    });

    // 3. Mecânica Alternativa: Arrastar o mouse diretamente na tela
    let isDragging = false;
    let previousX = 0;

    window.addEventListener('mousedown', (e) => {
        if(e.target.classList.contains('control-btn')) return;
        isDragging = true;
        previousX = e.clientX;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging || isGameOver) return;
        const deltaX = e.clientX - previousX;
        towerRotation += deltaX * 0.4;
        previousX = e.clientX;
    });

    window.addEventListener('mouseup', () => isDragging = false);
}

// --- FUNÇÕES DA LÓGICA DO JOGO ---

function updateGame() {
    if (isGameOver) return;

    // Aplica a gravidade na velocidade
    ballVelocityY += gravity;
    // Move a torre para cima/baixo baseada na velocidade da bola (efeito de câmera)
    towerPositionY -= ballVelocityY; 

    // Renderiza a transformação 3D da torre
    tower.style.transform = `rotateY(${towerRotation}deg) translateY(${towerPositionY}px)`;

    checkCollisions();

    requestAnimationFrame(updateGame);
}

function checkCollisions() {
    platforms.forEach((platform) => {
        // Calcula onde a plataforma está renderizada na tela no momento
        const currentPlatformTop = platform.y + towerPositionY;

        // Detecta se a base da bola está tocando o topo da plataforma (e caindo)
        if (ballPositionY + 18 >= currentPlatformTop && 
            ballPositionY + 18 <= currentPlatformTop + 18 && 
            ballVelocityY > 0) {
            
            // Calcula qual parte da plataforma está virada para a frente (ângulo relativo)
            const relativeRotation = (platform.rotation + towerRotation) % 360;
            const normalizedAngle = relativeRotation < 0 ? relativeRotation + 360 : relativeRotation;

            // Se o ângulo corresponder à abertura (Gap): o jogador passa direto
            if (normalizedAngle > 325 || normalizedAngle < 35) {
                if (!platform.passed) {
                    score += 10;
                    scoreDisplay.innerText = score;
                    platform.passed = true;
                }
            } else {
                // Se bateu na parte sólida:
                if (platform.isDanger) {
                    gameOver();
                } else {
                    // Executa a função de Pulo
                    ballVelocityY = jumpStrength;
                }
            }
        }
    });
}

function gameOver() {
    isGameOver = true;
    gameOverScreen.classList.remove('hidden');
}

function restartGame() {
    init();
}

// Executa o início do jogo automaticamente ao carregar
init();
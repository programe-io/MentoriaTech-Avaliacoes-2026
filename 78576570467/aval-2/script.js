const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameOverScreen = document.getElementById('game-over-screen');
const deathReasonText = document.getElementById('death-reason');
const scoreDisplay = document.getElementById('score');

// Configurações do Jogo
let gameSpeed = 6;
let score = 0;
let isGameOver = false;
let gameFrame = 0;

const GROUND_Y = canvas.height - 60; // Altura onde ficam os tetos dos prédios
let buildings = [];
let obstacles = [];

// Propriedades do Jogador (Silhueta)
const player = {
    x: 150,
    y: GROUND_Y - 60,
    width: 25,
    height: 60,
    originalHeight: 60,
    velocityY: 0,
    gravity: 0.6,
    jumpForce: -13,
    isGrounded: false,
    isSliding: false,
    slideTimer: 0,
    slideDuration: 35
};

// Captura de Teclado
const keys = {};
window.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) {
        e.preventDefault(); // Impede a página de rolar
    }
    keys[e.code] = true;
    
    if (isGameOver && e.code === 'Space') {
        resetGame();
    }
});
window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// Inicializa a primeira sequência estável de prédios
function initBuildings() {
    buildings = [
        { x: 0, width: 500 },
        { x: 550, width: 400 }
    ];
    obstacles = [];
}

// Gerencia a geração dos Prédios (Plataformas) e os Abismos (Void)
function handleTopology() {
    // Adiciona novos prédios conforme a tela avança
    if (buildings.length === 0 || buildings[buildings.length - 1].x + buildings[buildings.length - 1].width < canvas.width + 300) {
        const lastBuilding = buildings[buildings.length - 1];
        
        // Define o tamanho do abismo (distância entre prédios)
        const gap = Math.floor(Math.random() * 60) + 90; // Entre 90 e 150 pixels de vão
        const nextWidth = Math.floor(Math.random() * 300) + 400; // Largura do próximo prédio
        
        const nextX = lastBuilding ? lastBuilding.x + lastBuilding.width + gap : 0;
        
        buildings.push({ x: nextX, width: nextWidth });

        // Chance de gerar um obstáculo em cima deste novo prédio recém-criado
        // Garante que o obstáculo surja longe da borda inicial do prédio
        if (Math.random() > 0.35) {
            const type = Math.random() > 0.5 ? 'high' : 'low';
            let obsX = nextX + 200 + Math.random() * (nextWidth - 280);
            
            if (type === 'low') {
                obstacles.push({
                    type: 'low',
                    x: obsX,
                    y: GROUND_Y - 35,
                    width: 35,
                    height: 35
                });
            } else {
                // Obstáculo ALTO: Começa do topo da tela e desce até bem próximo do chão.
                // O teto impede o pulo completamente, forçando o slide (deslize).
                obstacles.push({
                    type: 'high',
                    x: obsX,
                    y: 0, // Vem lá de cima
                    width: 40,
                    height: GROUND_Y - 35 // Deixa apenas uma fresta de 35px no chão
                });
            }
        }
    }

    // Atualiza e desenha os prédios
    ctx.fillStyle = '#0f0f11';
    for (let i = buildings.length - 1; i >= 0; i--) {
        buildings[i].x -= gameSpeed;
        
        // Desenha a silhueta do edifício até o fundo do canvas
        ctx.fillRect(buildings[i].x, GROUND_Y, buildings[i].width, canvas.height - GROUND_Y);

        // Remove prédios antigos que já saíram completamente da tela
        if (buildings[i].x + buildings[i].width < 0) {
            buildings.splice(i, 1);
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
        }
    }
}

function handlePlayer() {
    player.y += player.velocityY;
    player.velocityY += player.gravity;

    // Verificar se o jogador está pisando em QUALQUER um dos prédios atuais
    let platformUnderneath = null;
    for (let b of buildings) {
        if (player.x + player.width > b.x && player.x < b.x + b.width) {
            // Checa se os pés do jogador estão no nível do teto do prédio
            if (player.y + player.height >= GROUND_Y && player.y + player.height <= GROUND_Y + 15 && player.velocityY >= 0) {
                platformUnderneath = b;
                break;
            }
        }
    }

    if (platformUnderneath) {
        player.y = GROUND_Y - player.height;
        player.velocityY = 0;
        player.isGrounded = true;
    } else {
        player.isGrounded = false;
    }

    // Se o player passar do limite inferior do cenário, caiu no Void
    if (player.y > canvas.height) {
        endGame("Você despencou no abismo dos prédios!");
    }

    // Comando: Pular
    if (keys['ArrowUp'] && player.isGrounded && !player.isSliding) {
        player.velocityY = player.jumpForce;
        player.isGrounded = false;
    }

    // Comando: Deslizar (Slide)
    if (keys['ArrowDown'] && player.isGrounded && !player.isSliding) {
        player.isSliding = true;
        player.height = player.originalHeight / 2;
        player.y += player.originalHeight / 2;
        player.slideTimer = player.slideDuration;
    }

    // Contador do Slide
    if (player.isSliding) {
        player.slideTimer--;
        if (player.slideTimer <= 0) {
            player.isSliding = false;
            player.y -= player.originalHeight / 2;
            player.height = player.originalHeight;
        }
    }
}

function handleObstacles() {
    ctx.fillStyle = '#0f0f11';

    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= gameSpeed;

        // Desenha obstáculo
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

        // Detecção de colisão por caixa (AABB)
        if (
            player.x < obstacles[i].x + obstacles[i].width &&
            player.x + player.width > obstacles[i].x &&
            player.y < obstacles[i].y + obstacles[i].height &&
            player.y + player.height > obstacles[i].y
        ) {
            if (obstacles[i].type === 'high') {
                endGame("Colisão superior! Você devia ter deslizado.");
            } else {
                endGame("Você tropeçou no obstáculo inferior!");
            }
        }

        // Limpa obstáculos antigos
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
        }
    }
}

function drawPlayer() {
    ctx.fillStyle = '#000000'; // Silhueta do personagem principal
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Pequeno visor cibernético/neon característico de jogos minimalistas
    ctx.fillStyle = '#00f0ff';
    if (!player.isSliding) {
        ctx.fillRect(player.x + player.width - 8, player.y + 10, 5, 4);
    } else {
        ctx.fillRect(player.x + player.width - 8, player.y + 8, 5, 4);
    }
}

function endGame(reason) {
    isGameOver = true;
    deathReasonText.innerText = reason;
    gameOverScreen.classList.remove('hidden');
}

function resetGame() {
    isGameOver = false;
    score = 0;
    gameSpeed = 6;
    player.y = GROUND_Y - player.originalHeight;
    player.height = player.originalHeight;
    player.velocityY = 0;
    player.isSliding = false;
    scoreDisplay.innerText = `Score: ${score}`;
    gameOverScreen.classList.add('hidden');
    initBuildings();
    animate();
}

function animate() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    handleTopology();  // Desenha os prédios estruturais e cria abismos
    handlePlayer();    // Aplica física e comandos do usuário
    handleObstacles(); // Movimenta perigos e analisa colisões
    drawPlayer();      // Renderiza o corredor

    // Aceleração gradativa com o tempo
    gameSpeed += 0.001;

    requestAnimationFrame(animate);
}

// Início técnico do script
initBuildings();
animate();
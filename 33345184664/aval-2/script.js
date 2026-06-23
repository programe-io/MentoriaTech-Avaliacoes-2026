// Configurações de Dificuldade
const configs = {
    facil: { rows: 6, cols: 6, mines: 4 },
    normal: { rows: 10, cols: 10, mines: 15 },
    dificil: { rows: 14, cols: 14, mines: 35 } // Bombas em pontos estratégicos (mais densas)
};

let currentConfig = configs.facil;
let gameState = "lobby"; // lobby, menu, playing, over
let playerPos = { x: 0, y: 0 };
let exitPos = { x: 0, y: 0 };
let mineMap = [];

// Elementos do DOM
const lobbyScreen = document.getElementById('lobby');
const difficultyScreen = document.getElementById('difficulty-screen');
const gameScreen = document.getElementById('game-screen');
const gameBoard = document.getElementById('game-board');
const levelIndicator = document.getElementById('level-indicator');
const gameMessage = document.getElementById('game-message');

// --- EVENTOS DO LOBBY ---
window.addEventListener('keydown', (e) => {
    if (gameState === "lobby") {
        gameState = "menu";
        lobbyScreen.classList.add('hidden');
        difficultyScreen.classList.remove('hidden');
    } else if (gameState === "playing") {
        handleMovement(e.key.toLowerCase());
    }
});

// --- INICIALIZAÇÃO DO JOGO ---
function startGame(difficulty) {
    currentConfig = configs[difficulty];
    levelIndicator.innerText = `Nível: ${difficulty.toUpperCase()}`;
    
    difficultyScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    gameState = "playing";
    gameMessage.classList.add('hidden');
    
    generateMap();
    renderBoard();
}

function backToMenu() {
    gameScreen.classList.add('hidden');
    difficultyScreen.classList.remove('hidden');
    gameState = "menu";
}

// --- LÓGICA DO MAPA ---
function generateMap() {
    const { rows, cols, mines } = currentConfig;
    
    // Inicializa mapa vazio
    mineMap = Array(rows).fill(null).map(() => Array(cols).fill(false));
    
    // Define início (Top-Left) e saída (Bottom-Right)
    playerPos = { x: 0, y: 0 };
    exitPos = { x: cols - 1, y: rows - 1 };

    // Posiciona as bombas
    let placedMines = 0;
    while (placedMines < mines) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);
        
        // Evita botar bomba na saída, na entrada ou adjacente imediato da entrada para o jogador respirar
        const isStartZone = (r <= 1 && c <= 1);
        const isExit = (r === exitPos.y && c === exitPos.x);

        if (!mineMap[r][c] && !isStartZone && !isExit) {
            mineMap[r][c] = true;
            placedMines++;
        }
    }
}

// --- RENDERIZAÇÃO DO TABULEIRO ---
function renderBoard() {
    const { rows, cols } = currentConfig;
    gameBoard.innerHTML = '';
    
    // Ajusta o CSS Grid dinamicamente baseado no tamanho do mapa
    gameBoard.style.gridTemplateRows = `repeat(${rows}, var(--tile-size))`;
    gameBoard.style.gridTemplateColumns = `repeat(${cols}, var(--tile-size))`;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${r}-${c}`;

            if (r === 0 && c === 0) cell.classList.add('start');
            if (r === exitPos.y && c === exitPos.x) {
                cell.classList.add('exit');
                cell.innerText = '🚪';
            }

            gameBoard.appendChild(cell);
        }
    }
    updatePlayerPosition();
}

function updatePlayerPosition() {
    // Remove o boneco da posição anterior
    document.querySelectorAll('.cell.player').forEach(el => {
        el.classList.remove('player');
        el.innerText = '';
    });

    // Adiciona na nova posição
    const currentCell = document.getElementById(`cell-${playerPos.y}-${playerPos.x}`);
    if (currentCell) {
        currentCell.classList.add('player');
        currentCell.innerText = '🧍';
    }
}

// --- CONTROLE DE MOVIMENTAÇÃO ---
function handleMovement(key) {
    let nextX = playerPos.x;
    let nextY = playerPos.y;

    // Mapeamento solicitado: E (cima), D (baixo), S (esquerda), F (direita)
    if (key === 'e') nextY--;
    else if (key === 'd') nextY++;
    else if (key === 's') nextX--;
    else if (key === 'f') nextX++;
    else return; // Ignora outras teclas

    // Verifica limites do mapa
    if (nextX >= 0 && nextX < currentConfig.cols && nextY >= 0 && nextY < currentConfig.rows) {
        playerPos.x = nextX;
        playerPos.y = nextY;
        
        updatePlayerPosition();
        checkGameStatus();
    }
}

// --- VERIFICAÇÃO DE VITÓRIA / DERROTA ---
function checkGameStatus() {
    // Pisou em uma bomba?
    if (mineMap[playerPos.y][playerPos.x]) {
        endGame(false);
    } 
    // Chegou na porta?
    else if (playerPos.x === exitPos.x && playerPos.y === exitPos.y) {
        endGame(true);
    }
}

function endGame(isVictory) {
    gameState = "over";
    gameMessage.classList.remove('hidden');

    if (isVictory) {
        gameMessage.innerText = "Você Escapou! 🎉";
        gameMessage.className = "win";
    } else {
        gameMessage.innerText = "BOOM! Você pisou em uma mina. 💥";
        gameMessage.className = "lose";
        
        // Revela onde estavam as bombas
        revealMines();
    }
}

function revealMines() {
    for (let r = 0; r < currentConfig.rows; r++) {
        for (let c = 0; c < currentConfig.cols; c++) {
            if (mineMap[r][c]) {
                const cell = document.getElementById(`cell-${r}-${c}`);
                cell.classList.add('exploded');
                cell.innerText = '💣';
            }
        }
    }
}
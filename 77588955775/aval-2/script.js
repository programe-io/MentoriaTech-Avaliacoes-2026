const BOARD_SIZE = 8;
const boardElement = document.getElementById('board');
const piecesContainer = document.getElementById('pieces-container');
const scoreElement = document.getElementById('score');
const streakElement = document.getElementById('streak');
const highscoreElement = document.getElementById('highscore');
const gameOverScreen = document.getElementById('game-over');

let board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));
let score = 0;
let streak = 0;
let highscore = localStorage.getItem('bb_v3_highscore') || 0;

let currentPieces = [];
let dragActive = false;
let activePieceObj = null;
let activePieceEl = null;
let activeTouchId = null;

let dragStartTime = 0;
let startX = 0;
let startY = 0;

const PIECE_TYPES = [
    { shape: [[1]], color: 'color-1' },
    { shape: [[1, 1]], color: 'color-2' },
    { shape: [[1, 1, 1]], color: 'color-2' },
    { shape: [[1, 1, 1, 1]], color: 'color-6' },
    { shape: [[1], [1]], color: 'color-3' },
    { shape: [[1], [1], [1]], color: 'color-3' },
    { shape: [[1, 1], [1, 1]], color: 'color-4' },
    { shape: [[1, 1, 1], [0, 1, 0]], color: 'color-5' },
    { shape: [[1, 0], [1, 0], [1, 1]], color: 'color-1' },
    { shape: [[1, 1], [0, 1]], color: 'color-6' }
];

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSynthSound(freq, type, duration, endFreq = null) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    if(endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + duration);
    
    osc.connect(gain); gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);
    osc.start(); osc.stop(audioCtx.currentTime + duration);
}

function initGame() {
    score = 0; streak = 0;
    board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));
    scoreElement.textContent = score; streakElement.textContent = streak; highscoreElement.textContent = highscore;
    document.body.classList.remove('fever-mode');
    gameOverScreen.style.display = 'none';
    createBoardDOM(); generateNewPieces(); drawBoard(); setupGlobalDragEvents();
}

function createBoardDOM() {
    boardElement.innerHTML = '';
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell'); cell.dataset.row = r; cell.dataset.col = c;
            boardElement.appendChild(cell);
        }
    }
}

function drawBoard() {
    const cells = boardElement.children;
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const index = r * BOARD_SIZE + c;
            cells[index].className = 'cell';
            if (board[r][c]) cells[index].classList.add(board[r][c]);
        }
    }
}

function generateNewPieces() {
    piecesContainer.innerHTML = ''; currentPieces = [];
    for (let i = 0; i < 3; i++) {
        const slot = document.createElement('div'); slot.classList.add('piece-slot');
        const randomType = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
        const pieceInstance = { id: i, shape: randomType.shape, color: randomType.color };
        currentPieces.push(pieceInstance);
        const pieceEl = renderPiece(pieceInstance);
        slot.appendChild(pieceEl); piecesContainer.appendChild(slot);
    }
    updatePiecesValidity();
}

function renderPiece(piece) {
    const pieceDiv = document.createElement('div');
    pieceDiv.classList.add('piece'); pieceDiv.dataset.id = piece.id;
    rebuildPieceDOM(pieceDiv, piece);

    const startDrag = (e) => {
        if (dragActive) return;
        e.preventDefault();
        const touch = e.touches ? e.touches[0] : e;
        activeTouchId = e.touches ? touch.identifier : null;
        
        dragActive = true; activePieceObj = piece; activePieceEl = pieceDiv;
        dragStartTime = Date.now();
        startX = touch.clientX; startY = touch.clientY;

        pieceDiv.classList.add('dragging');
        movePieceAt(e);
    };

    pieceDiv.addEventListener('mousedown', startDrag);
    pieceDiv.addEventListener('touchstart', startDrag, { passive: false });
    return pieceDiv;
}

function rebuildPieceDOM(el, piece) {
    el.innerHTML = '';
    el.style.gridTemplateRows = `repeat(${piece.shape.length}, 19px)`;
    el.style.gridTemplateColumns = `repeat(${piece.shape[0].length}, 19px)`;
    piece.shape.forEach(row => {
        row.forEach(val => {
            const cell = document.createElement('div');
            cell.classList.add(val ? 'piece-cell' : 'empty-piece-cell');
            if (val) cell.classList.add(piece.color);
            el.appendChild(cell);
        });
    });
}

function rotatePieceMatrix(piece) {
    const matrix = piece.shape;
    const nRow = matrix.length; const nCol = matrix[0].length;
    let newMatrix = Array(nCol).fill(null).map(() => Array(nRow).fill(0));
    for (let r = 0; r < nRow; r++) {
        for (let c = 0; c < nCol; c++) { newMatrix[c][nRow - 1 - r] = matrix[r][c]; }
    }
    piece.shape = newMatrix;
}

function setupGlobalDragEvents() {
    const moveHandler = (e) => {
        if (!dragActive || !activePieceEl) return;
        if (e.touches && e.touches[0].identifier !== activeTouchId) return;
        movePieceAt(e);
        updatePreview();
    };

    const endHandler = (e) => {
        if (!dragActive || !activePieceEl) return;
        if (e.touches && e.changedTouches[0].identifier !== activeTouchId) return;

        dragActive = false; activeTouchId = null;
        activePieceEl.classList.remove('dragging');

        const touch = e.changedTouches ? e.changedTouches[0] : e;
        const timePassed = Date.now() - dragStartTime;
        const distMoved = Math.hypot(touch.clientX - startX, touch.clientY - startY);

        // Dinâmica de Clique Rápido -> ROTAÇÃO
        if (timePassed < 200 && distMoved < 10) {
            rotatePieceMatrix(activePieceObj);
            rebuildPieceDOM(activePieceEl, activePieceObj);
            returnToSlot();
            clearPreview();
            updatePiecesValidity();
            playSynthSound(480, 'sine', 0.07);
            return;
        }

        const targetCell = getCellUnderPointer();
        if (targetCell) {
            const r = parseInt(targetCell.dataset.row);
            const c = parseInt(targetCell.dataset.col);
            if (canPlacePiece(activePieceObj.shape, r, c)) {
                placePiece(activePieceObj, r, c);
                return;
            }
        }
        returnToSlot();
        clearPreview();
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', endHandler);
    window.addEventListener('touchmove', moveHandler, { passive: false });
    window.addEventListener('touchend', endHandler);
}

// DINÂMICA DE OFFSET INTELIGENTE: Evita tampar a peça com o dedo no celular
function movePieceAt(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Aumenta o fator de escala visual e levanta a peça proporcionalmente ao tamanho dela
    activePieceEl.style.position = 'fixed';
    activePieceEl.style.transform = 'scale(1.4)';
    activePieceEl.style.left = `${clientX - activePieceEl.offsetWidth / 2}px`;
    activePieceEl.style.top = `${clientY - activePieceEl.offsetHeight - 45}px`;
}

function getCellUnderPointer() {
    if (!activePieceEl) return null;
    const rect = activePieceEl.getBoundingClientRect();
    // Ponto de detecção centralizado no primeiro bloco real superior da peça
    const element = document.elementFromPoint(rect.left + 10, rect.top + 10);
    return (element && element.classList.contains('cell')) ? element : null;
}

function updatePreview() {
    clearPreview();
    const cell = getCellUnderPointer();
    if (!cell || !activePieceObj) return;

    const r = parseInt(cell.dataset.row);
    const c = parseInt(cell.dataset.col);
    
    if (canPlacePiece(activePieceObj.shape, r, c)) {
        const cells = boardElement.children;
        const colorVar = getComputedStyle(document.documentElement).getPropertyValue(`--${activePieceObj.color}`);
        
        for (let i = 0; i < activePieceObj.shape.length; i++) {
            for (let j = 0; j < activePieceObj.shape[i].length; j++) {
                if (activePieceObj.shape[i][j]) {
                    const idx = (r + i) * BOARD_SIZE + (c + j);
                    const cellEl = cells[idx];
                    cellEl.classList.add('preview', activePieceObj.color);
                    cellEl.style.setProperty('--preview-color', colorVar);
                }
            }
        }
    }
}

function returnToSlot() {
    if (!activePieceEl) return;
    activePieceEl.style.position = 'absolute';
    activePieceEl.style.transform = 'scale(1)';
    activePieceEl.style.left = 'auto'; activePieceEl.style.top = 'auto';
}

function clearPreview() {
    document.querySelectorAll('.cell.preview').forEach(c => {
        c.className = 'cell';
        c.style.removeProperty('--preview-color');
    });
}

function canPlacePiece(shape, startRow, startCol) {
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c] !== 0) {
                const targetRow = startRow + r; const targetCol = startCol + c;
                if (targetRow >= BOARD_SIZE || targetCol >= BOARD_SIZE || board[targetRow][targetCol] !== 0) return false;
            }
        }
    }
    return true;
}

function placePiece(piece, startRow, startCol) {
    for (let r = 0; r < piece.shape.length; r++) {
        for (let c = 0; c < piece.shape[r].length; c++) {
            if (piece.shape[r][c] !== 0) board[startRow + r][startCol + c] = piece.color;
        }
    }
    score += 10;
    triggerScorePop();
    playSynthSound(300, 'triangle', 0.08, 450);
    createFloatingText(`+10`, startRow, startCol);
    currentPieces = currentPieces.filter(p => p.id !== piece.id);
    activePieceEl.remove();
    drawBoard();
    checkAndClearLines();
    if (currentPieces.length === 0) generateNewPieces();
    else updatePiecesValidity();
    updateScore();
    if (checkGameOver()) showGameOver();
}

function triggerScorePop() {
    const box = document.querySelector('.score-box');
    box.classList.add('pop');
    setTimeout(() => box.classList.remove('pop'), 200);
}

function updatePiecesValidity() {
    currentPieces.forEach(piece => {
        const visualPiece = document.querySelector(`.piece[data-id="${piece.id}"]`);
        if (!visualPiece) return;
        let valid = false;
        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                if (canPlacePiece(piece.shape, r, c)) { valid = true; break; }
            }
            if (valid) break;
        }
        if (!valid) visualPiece.classList.add('invalid-move');
        else visualPiece.classList.remove('invalid-move');
    });
}

function checkAndClearLines() {
    let rows = []; let cols = [];
    for (let r = 0; r < BOARD_SIZE; r++) if (board[r].every(cell => cell !== 0)) rows.push(r);
    for (let c = 0; c < BOARD_SIZE; c++) {
        let full = true;
        for (let r = 0; r < BOARD_SIZE; r++) if (board[r][c] === 0) { full = false; break; }
        if (full) cols.push(c);
    }
    const total = rows.length + cols.length;
    if (total > 0) {
        streak++;
        
        // Ativação Dinâmica do Fever Mode (Streak >= 3)
        if (streak >= 3) {
            document.body.classList.add('fever-mode');
            playSynthSound(220, 'sawtooth', 0.4, 80);
        } else {
            playSynthSound(180, 'sawtooth', 0.3, 60);
        }

        boardElement.classList.add('shake');
        setTimeout(() => boardElement.classList.remove('shake'), 220);

        let txt = streak > 2 ? `🔥 FEVER STREAK x${streak}! 🔥` : (streak > 1 ? `⚡ COMBO x${streak}! ⚡` : "BLAST!");
        createFloatingText(txt, rows[0] || 3, cols[0] || 3, true);

        rows.forEach(r => {
            for (let c = 0; c < BOARD_SIZE; c++) {
                const idx = r * BOARD_SIZE + c; spawnParticles(boardElement.children[idx], board[r][c]);
                board[r][c] = 0; boardElement.children[idx].classList.add('blast');
            }
        });
        cols.forEach(c => {
            for (let r = 0; r < BOARD_SIZE; r++) {
                const idx = r * BOARD_SIZE + c; spawnParticles(boardElement.children[idx], board[r][c]);
                board[r][c] = 0; boardElement.children[idx].classList.add('blast');
            }
        });

        // Multiplicador crítico agressivo baseado em Modo Fever
        const bonus = ((total * 100) * total) * streak;
        score += bonus;
        setTimeout(() => createFloatingText(`+${bonus}`, rows[0] || 4, cols[0] || 4), 100);
        setTimeout(drawBoard, 320);
    } else {
        streak = 0;
        document.body.classList.remove('fever-mode');
    }
    streakElement.textContent = streak;
}

function spawnParticles(cell, color) {
    if (!color) return;
    const rect = cell.getBoundingClientRect();
    const bRect = boardElement.getBoundingClientRect();
    const x = rect.left - bRect.left + rect.width / 2;
    const y = rect.top - bRect.top + rect.height / 2;

    // Dobra o número de partículas se estiver em Fever Mode
    const amount = document.body.classList.contains('fever-mode') ? 12 : 6;

    for (let i = 0; i < amount; i++) {
        const p = document.createElement('div'); p.className = `particle ${color}`;
        const angle = Math.random() * Math.PI * 2; 
        const spd = (document.body.classList.contains('fever-mode') ? 60 : 40) + Math.random() * 60;
        p.style.setProperty('--x', `${Math.cos(angle) * spd}px`);
        p.style.setProperty('--y', `${Math.sin(angle) * spd}px`);
        p.style.left = `${x}px`; p.style.top = `${y}px`;
        boardElement.appendChild(p); setTimeout(() => p.remove(), 450);
    }
}

function createFloatingText(text, r, c, special = false) {
    const ft = document.createElement('div'); ft.className = 'floating-text'; ft.textContent = text;
    if (special) { 
        ft.style.color = document.body.classList.contains('fever-mode') ? '#ff007f' : '#00f2fe'; 
        ft.style.fontSize = '2.2rem'; 
    } else { 
        ft.style.fontSize = '1.4rem'; 
    }
    const size = boardElement.offsetWidth / 8;
    ft.style.left = `${c * size + size / 4}px`; ft.style.top = `${r * size + size / 4}px`;
    document.getElementById('board-wrapper').appendChild(ft);
    setTimeout(() => ft.remove(), 750);
}

function updateScore() {
    scoreElement.textContent = score;
    if (score > highscore) {
        highscore = score; highscoreElement.textContent = highscore;
        localStorage.setItem('bb_v3_highscore', highscore);
    }
}

function checkGameOver() {
    if (currentPieces.length === 0) return false;
    for (let piece of currentPieces) {
        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                if (canPlacePiece(piece.shape, r, c)) return false;
            }
        }
    }
    return true;
}

function showGameOver() {
    document.getElementById('final-score-val').textContent = score;
    gameOverScreen.style.display = 'flex';
}

function resetGame() { initGame(); }

initGame();
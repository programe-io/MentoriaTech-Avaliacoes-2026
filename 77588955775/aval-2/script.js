const BOARD_SIZE = 8;
let boardState = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));
let score = 0;
let bestScore = localStorage.getItem('blockBlastBestScore') || 0;

// Matrizes com os formatos das peças
const SHAPES = [
    { matrix: [[1]], color: 1 }, 
    { matrix: [[1, 1]], color: 2 }, 
    { matrix: [[1, 1, 1]], color: 3 }, 
    { matrix: [[1], [1]], color: 2 }, 
    { matrix: [[1, 1], [1, 1]], color: 4 }, 
    { matrix: [[1, 1, 1], [0, 1, 0]], color: 5 }, 
    { matrix: [[1, 0], [1, 0], [1, 1]], color: 3 }, 
    { matrix: [[1, 1, 1], [1, 1, 1], [1, 1, 1]], color: 4 } 
];

const boardElement = document.getElementById('board');
const piecesContainer = document.getElementById('pieces-container');
const scoreElement = document.getElementById('score');
const bestScoreElement = document.getElementById('best-score');
const gameOverModal = document.getElementById('game-over-modal');
const finalScoreElement = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

let draggedPieceData = null;

function initGame() {
    score = 0;
    boardState = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));
    scoreElement.textContent = score;
    bestScoreElement.textContent = bestScore;
    gameOverModal.classList.add('hidden');
    
    createBoard();
    generateNewPieces();
}

function createBoard() {
    boardElement.innerHTML = '';
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            
            cell.addEventListener('dragover', (e) => e.preventDefault());
            cell.addEventListener('drop', dropPiece);
            
            boardElement.appendChild(cell);
        }
    }
}

function updateBoardView() {
    const cells = boardElement.children;
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const index = r * BOARD_SIZE + c;
            const cell = cells[index];
            const val = boardState[r][c];
            
            cell.className = 'cell';
            if (val > 0) {
                cell.classList.add('block-filled', `color-${val}`);
            }
        }
    }
}

function generateNewPieces() {
    piecesContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const randomShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        createPieceElement(randomShape);
    }
    checkGameOver();
}

function createPieceElement(shapeData) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('piece-wrapper');
    wrapper.setAttribute('draggable', true);
    wrapper.dataset.matrix = JSON.stringify(shapeData.matrix);

    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.gridTemplateRows = `repeat(${shapeData.matrix.length}, 28px)`;
    piece.style.gridTemplateColumns = `repeat(${shapeData.matrix[0].length}, 28px)`;

    shapeData.matrix.forEach((row) => {
        row.forEach((val) => {
            const block = document.createElement('div');
            if (val === 1) {
                block.classList.add('block-filled', `color-${shapeData.color}`);
            } else {
                block.style.opacity = 0;
            }
            piece.appendChild(block);
        });
    });

    wrapper.appendChild(piece);
    
    wrapper.addEventListener('dragstart', () => {
        draggedPieceData = { shapeData, element: wrapper };
    });

    piecesContainer.appendChild(wrapper);
}

function dropPiece(e) {
    e.preventDefault();
    if (!draggedPieceData) return;

    const targetRow = parseInt(e.target.dataset.row);
    const targetCol = parseInt(e.target.dataset.col);

    if (isNaN(targetRow) || isNaN(targetCol)) return;

    const { matrix, color } = draggedPieceData.shapeData;

    if (canPlacePiece(matrix, targetRow, targetCol)) {
        placePiece(matrix, color, targetRow, targetCol);
        draggedPieceData.element.remove();
        
        checkLineClears();
        
        if (piecesContainer.children.length === 0) {
            generateNewPieces();
        } else {
            checkGameOver();
        }
    }
    draggedPieceData = null;
}

function canPlacePiece(matrix, startRow, startCol) {
    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[r].length; c++) {
            if (matrix[r][c] === 1) {
                const boardRow = startRow + r;
                const boardCol = startCol + c;

                if (boardRow >= BOARD_SIZE || boardCol >= BOARD_SIZE || boardState[boardRow][boardCol] > 0) {
                    return false;
                }
            }
        }
    }
    return true;
}

function placePiece(matrix, color, startRow, startCol) {
    let piecesPlaced = 0;
    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[r].length; c++) {
            if (matrix[r][c] === 1) {
                boardState[startRow + r][startCol + c] = color;
                piecesPlaced++;
            }
        }
    }
    score += piecesPlaced * 10;
    updateScoreDisplay();
    updateBoardView();
}

function checkLineClears() {
    let rowsToClear = [];
    let colsToClear = [];

    for (let r = 0; r < BOARD_SIZE; r++) {
        if (boardState[r].every(cell => cell > 0)) rowsToClear.push(r);
    }

    for (let c = 0; c < BOARD_SIZE; c++) {
        let colFilled = true;
        for (let r = 0; r < BOARD_SIZE; r++) {
            if (boardState[r][c] === 0) colFilled = false;
        }
        if (colFilled) colsToClear.push(c);
    }

    if (rowsToClear.length > 0 || colsToClear.length > 0) {
        const totalClears = rowsToClear.length + colsToClear.length;
        score += totalClears * 150;

        const cells = boardElement.children;
        
        rowsToClear.forEach(r => {
            for(let c=0; c<BOARD_SIZE; c++) cells[r * BOARD_SIZE + c].classList.add('blasting');
            boardState[r].fill(0);
        });
        
        colsToClear.forEach(c => {
            for (let r = 0; r < BOARD_SIZE; r++) {
                cells[r * BOARD_SIZE + c].classList.add('blasting');
                boardState[r][c] = 0;
            }
        });

        setTimeout(() => {
            updateBoardView();
            updateScoreDisplay();
        }, 250);
    }
}

function updateScoreDisplay() {
    scoreElement.textContent = score;
    if (score > bestScore) {
        bestScore = score;
        bestScoreElement.textContent = bestScore;
        localStorage.setItem('blockBlastBestScore', bestScore);
    }
}

function checkGameOver() {
    const remainingWrappers = Array.from(piecesContainer.children);
    if (remainingWrappers.length === 0) return;

    let aPieceFits = false;

    for (let wrapper of remainingWrappers) {
        const matrix = JSON.parse(wrapper.dataset.matrix);

        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                if (canPlacePiece(matrix, r, c)) {
                    aPieceFits = true;
                    break;
                }
            }
            if (aPieceFits) break;
        }
        if (aPieceFits) break;
    }

    if (!aPieceFits) {
        finalScoreElement.textContent = score;
        gameOverModal.classList.remove('hidden');
    }
}

restartBtn.addEventListener('click', initGame);

initGame();
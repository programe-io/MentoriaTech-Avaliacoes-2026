const BOARD_SIZE = 8;
let boardState = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));
let score = 0;
let draggedPieceData = null;

// Formatos das peças (0 = vazio, id_da_cor = bloco preenchido)
const SHAPES = [
    { shape: [[1]], color: 1 }, 
    { shape: [[2, 2]], color: 2 }, 
    { shape: [[3, 3, 3]], color: 3 }, 
    { shape: [[4], [4]], color: 4 }, 
    { shape: [[5, 5], [5, 5]], color: 5 }, 
    { shape: [[1, 0], [1, 1]], color: 1 }, 
    { shape: [[0, 2], [2, 2]], color: 2 }  
];

const boardElement = document.getElementById('board');
const rackElement = document.getElementById('rack');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

function initGame() {
    boardState = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));
    score = 0;
    scoreElement.textContent = score;
    gameOverElement.classList.add('hidden');
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

function drawBoard() {
    const cells = boardElement.children;
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const index = r * BOARD_SIZE + c;
            const cellValue = boardState[r][c];
            cells[index].className = 'cell';
            if (cellValue > 0) {
                cells[index].classList.add(`color-${cellValue}`);
            }
        }
    }
}

function generateNewPieces() {
    rackElement.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const randomShapeObj = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        createRackPiece(randomShapeObj, i);
    }
    checkGameOver();
}

function createRackPiece(shapeObj, index) {
    const pieceContainer = document.createElement('div');
    pieceContainer.classList.add('piece');
    pieceContainer.draggable = true;
    pieceContainer.id = `piece-${index}`;
    
    const rows = shapeObj.shape.length;
    const cols = shapeObj.shape[0].length;
    pieceContainer.style.gridTemplateRows = `repeat(${rows}, 25px)`;
    pieceContainer.style.gridTemplateColumns = `repeat(${cols}, 25px)`;

    shapeObj.shape.forEach((row) => {
        row.forEach((value) => {
            const cell = document.createElement('div');
            cell.classList.add('piece-cell');
            if (value > 0) {
                cell.classList.add(`color-${shapeObj.color}`);
            } else {
                cell.style.opacity = '0';
            }
            pieceContainer.appendChild(cell);
        });
    });

    pieceContainer.addEventListener('dragstart', () => {
        draggedPieceData = { shapeObj: shapeObj, elementId: pieceContainer.id };
    });

    rackElement.appendChild(pieceContainer);
}

function dropPiece(e) {
    e.preventDefault();
    if (!draggedPieceData) return;

    const targetCell = e.target;
    if (!targetCell.classList.contains('cell')) return;

    const startRow = parseInt(targetCell.dataset.row);
    const startCol = parseInt(targetCell.dataset.col);
    
    const { shapeObj, elementId } = draggedPieceData;
    const shape = shapeObj.shape;

    if (canPlacePiece(shape, startRow, startCol)) {
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (shape[r][c] > 0) {
                    boardState[startRow + r][startCol + c] = shapeObj.color;
                }
            }
        }

        document.getElementById(elementId).remove();
        draggedPieceData = null;

        drawBoard();
        checkLines();

        if (rackElement.children.length === 0) {
            generateNewPieces();
        } else {
            checkGameOver();
        }
    }
}

function canPlacePiece(shape, startRow, startCol) {
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c] > 0) {
                const targetRow = startRow + r;
                const targetCol = startCol + c;

                if (targetRow >= BOARD_SIZE || targetCol >= BOARD_SIZE) return false;
                if (boardState[targetRow][targetCol] > 0) return false;
            }
        }
    }
    return true;
}

function checkLines() {
    let rowsToRemove = [];
    let colsToRemove = [];

    for (let r = 0; r < BOARD_SIZE; r++) {
        if (boardState[r].every(cell => cell > 0)) rowsToRemove.push(r);
    }

    for (let c = 0; c < BOARD_SIZE; c++) {
        let colFull = true;
        for (let r = 0; r < BOARD_SIZE; r++) {
            if (boardState[r][c] === 0) { colFull = false; break; }
        }
        if (colFull) colsToRemove.push(c);
    }

    rowsToRemove.forEach(r => {
        boardState[r] = Array(BOARD_SIZE).fill(0);
        score += 10;
    });

    colsToRemove.forEach(c => {
        for (let r = 0; r < BOARD_SIZE; r++) boardState[r][c] = 0;
        score += 10;
    });

    if (rowsToRemove.length > 0 || colsToRemove.length > 0) {
        const combo = rowsToRemove.length + colsToRemove.length;
        if (combo > 1) score += combo * 5; // Bônus por combo
        scoreElement.textContent = score;
        drawBoard();
    }
}

function checkGameOver() {
    const rackPieces = rackElement.children;
    if (rackPieces.length === 0) return;

    let anyPieceFits = false;

    for (let piece of rackElement.children) {
        const sampleCell = piece.querySelector('.piece-cell:not([style*="opacity: 0"])');
        if (!sampleCell) continue;
        
        const colorClass = Array.from(sampleCell.classList).find(cls => cls.startsWith('color-'));
        const colorId = parseInt(colorClass.split('-')[1]);
        const matchedShape = SHAPES.find(s => s.color === colorId).shape;

        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                if (canPlacePiece(matchedShape, r, c)) {
                    anyPieceFits = true;
                    break;
                }
            }
            if (anyPieceFits) break;
        }
        if (anyPieceFits) break;
    }

    if (!anyPieceFits) {
        gameOverElement.classList.remove('hidden');
        finalScoreElement.textContent = score;
    }
}

restartBtn.addEventListener('click', initGame);
initGame();
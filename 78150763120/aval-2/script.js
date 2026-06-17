const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');

// Estado do jogo
// 0: Vazio, 1: Vermelha, 2: Preta, 3: Dama Vermelha, 4: Dama Preta
let boardState = [];
let turn = 1; // 1 = Vermelhas, 2 = Pretas
let selectedPiece = null; // {row, col}
let availableMoves = [];
let isMultiJumpChain = false; // Controla se o jogador está no meio de um combo de capturas

function initGame() {
    turn = 1;
    selectedPiece = null;
    availableMoves = [];
    isMultiJumpChain = false;
    statusElement.innerText = "Turno: Vermelhas";
    
    boardState = Array(8).fill(null).map(() => Array(8).fill(0));
    
    // Peças pretas em cima
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 8; c++) {
            if ((r + c) % 2 === 1) boardState[r][c] = 2;
        }
    }
    
    // Peças vermelhas embaixo
    for (let r = 5; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if ((r + c) % 2 === 1) boardState[r][c] = 1;
        }
    }

    renderBoard();
}

function renderBoard() {
    boardElement.innerHTML = '';
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            const isDark = (r + c) % 2 === 1;
            cell.classList.add(isDark ? 'dark' : 'light');

            const pieceValue = boardState[r][c];
            if (pieceValue > 0) {
                const piece = document.createElement('div');
                piece.classList.add('piece');
                
                if (pieceValue === 1 || pieceValue === 3) piece.classList.add('red-piece');
                if (pieceValue === 2 || pieceValue === 4) piece.classList.add('black-piece');
                if (pieceValue === 3 || pieceValue === 4) piece.classList.add('king');

                // Condição para interagir com a peça
                const isCurrentTurnPiece = (turn === 1 && (pieceValue === 1 || pieceValue === 3)) ||
                                           (turn === 2 && (pieceValue === 2 || pieceValue === 4));
                
                if (isCurrentTurnPiece) {
                    // Se estiver em modo combo, bloqueia clicar em outras peças
                    if (!isMultiJumpChain || (selectedPiece && selectedPiece.row === r && selectedPiece.col === c)) {
                        if (selectedPiece && selectedPiece.row === r && selectedPiece.col === c) {
                            piece.classList.add('selected');
                        }
                        piece.addEventListener('click', (e) => {
                            e.stopPropagation();
                            selectPiece(r, c);
                        });
                    }
                }
                cell.appendChild(piece);
            }

            // Exibe as bolinhas verdes de movimentos possíveis
            const move = availableMoves.find(m => m.toRow === r && m.toCol === c);
            if (move) {
                const highlight = document.createElement('div');
                highlight.classList.add('highlight');
                highlight.addEventListener('click', () => movePiece(move));
                cell.appendChild(highlight);
            }

            boardElement.appendChild(cell);
        }
    }
}

function selectPiece(row, col) {
    // Se o jogador já está em uma sequência de capturas, ele não pode mudar de peça
    if (isMultiJumpChain) return;

    selectedPiece = { row, col };
    availableMoves = calculateMoves(row, col);
    renderBoard();
}

function calculateMoves(row, col, restrictToJumps = false) {
    const piece = boardState[row][col];
    const moves = [];
    
    // Movimento normal simples (Apenas para frente)
    let walkDirections = [];
    if (piece === 1) walkDirections = [[-1, -1], [-1, 1]]; // Vermelhas sobem
    if (piece === 2) walkDirections = [[1, -1], [1, 1]];   // Pretas descem
    if (piece === 3 || piece === 4) walkDirections = [[1, 1], [1, -1], [-1, 1], [-1, -1]]; // Damas

    // Regra especial: Todas as peças (normais ou damas) capturam em todas as direções (inclusive para trás)
    const jumpDirections = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

    // 1. Movimentos de Caminhada Simples (ignorado se estivermos procurando apenas re-capturas)
    if (!restrictToJumps) {
        walkDirections.forEach(([dr, dc]) => {
            const nextRow = row + dr;
            const nextCol = col + dc;
            if (isValidIndex(nextRow, nextCol) && boardState[nextRow][nextCol] === 0) {
                moves.push({ toRow: nextRow, toCol: nextCol, jump: null });
            }
        });
    }

    // 2. Movimentos de Captura (Pular peças para frente ou para trás)
    jumpDirections.forEach(([dr, dc]) => {
        const nextRow = row + dr;
        const nextCol = col + dc;
        const jumpRow = row + (dr * 2);
        const jumpCol = col + (dc * 2);

        if (isValidIndex(jumpRow, jumpCol) && boardState[jumpRow][jumpCol] === 0) {
            const middlePiece = boardState[nextRow][nextCol];
            if (middlePiece > 0) {
                const isOpponent = (turn === 1 && (middlePiece === 2 || middlePiece === 4)) ||
                                   (turn === 2 && (middlePiece === 1 || middlePiece === 3));
                
                if (isOpponent) {
                    moves.push({
                        toRow: jumpRow,
                        toCol: jumpCol,
                        jump: { row: nextRow, col: nextCol }
                    });
                }
            }
        }
    });

    return moves;
}

function isValidIndex(r, c) {
    return r >= 0 && r < 8 && c >= 0 && c < 8;
}

function movePiece(move) {
    const { row, col } = selectedPiece;
    let pieceValue = boardState[row][col];

    // Se realizou um pulo/captura
    if (move.jump) {
        boardState[move.jump.row][move.jump.col] = 0; // Remove a peça comida
    }

    // Move a peça para o novo destino
    boardState[move.toRow][move.toCol] = pieceValue;
    boardState[row][col] = 0;

    // Promoção para Dama
    if (move.toRow === 0 && pieceValue === 1) boardState[move.toRow][move.toCol] = 3;
    if (move.toRow === 7 && pieceValue === 2) boardState[move.toRow][move.toCol] = 4;

    // Atualiza a posição atual da peça movida para checar sequência
    selectedPiece = { row: move.toRow, col: move.toCol };

    // Se foi uma captura, checa se ela tem mais capturas disponíveis daquela nova posição
    if (move.jump) {
        const extraJumps = calculateMoves(move.toRow, move.toCol, true); // true ativa restrição a apenas pulos
        
        if (extraJumps.length > 0) {
            // Existe outra peça para comer! Mantém o turno e força o combo.
            isMultiJumpChain = true;
            availableMoves = extraJumps;
            renderBoard();
            return; // Encerra a função sem mudar o turno
        }
    }

    // Se chegou aqui, não há mais capturas em sequência disponíveis. Muda o turno.
    isMultiJumpChain = false;
    selectedPiece = null;
    availableMoves = [];
    turn = turn === 1 ? 2 : 1;
    statusElement.innerText = `Turno: ${turn === 1 ? 'Vermelhas' : 'Pretas'}`;

    renderBoard();
    checkGameOver();
}

function checkGameOver() {
    let redCount = 0;
    let blackCount = 0;

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if (boardState[r][c] === 1 || boardState[r][c] === 3) redCount++;
            if (boardState[r][c] === 2 || boardState[r][c] === 4) blackCount++;
        }
    }

    if (redCount === 0) {
        statusElement.innerText = "Fim de jogo! Pretas venceram!";
        turn = 0;
    } else if (blackCount === 0) {
        statusElement.innerText = "Fim de jogo! Vermelhas venceram!";
        turn = 0;
    }
}

initGame();
const size = 4; // Matriz 4x4
let board = [];
let moves = 0;

// Elementos do DOM
const puzzleContainer = document.getElementById('puzzle');
const movesDisplay = document.getElementById('moves');
const resetBtn = document.getElementById('btn-reset');

// Inicializa o jogo
function initGame() {
    moves = 0;
    movesDisplay.innerText = moves;
    
    // Cria a sequência correta (1 a 15 e a última vazia como 0)
    board = Array.from({length: size * size - 1}, (_, i) => i + 1);
    board.push(0);

    // Embaralha de forma que o puzzle continue solucionável
    shuffleBoard();
    renderBoard();
}

// Renderiza o tabuleiro na tela
function renderBoard() {
    puzzleContainer.innerHTML = '';

    board.forEach((value, index) => {
        const tile = document.createElement('div');
        if (value === 0) {
            tile.className = 'tile empty';
        } else {
            tile.className = 'tile';
            tile.innerText = value;
            // Adiciona o evento de clique para mover a peça
            tile.onclick = () => moveTile(index);
        }
        puzzleContainer.appendChild(tile);
    });
}

// Lógica de movimentação das peças
function moveTile(index) {
    const emptyIndex = board.indexOf(0);
    
    // Calcula linha e coluna da peça clicada e do espaço vazio
    const tileRow = Math.floor(index / size);
    const tileCol = index % size;
    const emptyRow = Math.floor(emptyIndex / size);
    const emptyCol = emptyIndex % size;

    // Verifica se a peça clicada está adjacente ao espaço vazio (distância de Manhattan igual a 1)
    const isAdjacent = (Math.abs(tileRow - emptyRow) + Math.abs(tileCol - emptyCol)) === 1;

    if (isAdjacent) {
        // Troca de posição no array
        board[emptyIndex] = board[index];
        board[index] = 0;
        
        moves++;
        movesDisplay.innerText = moves;
        
        renderBoard();
        checkWin();
    }
}

// Embaralha simulando movimentos válidos para garantir que tem solução
function shuffleBoard() {
    for (let i = 0; i < 200; i++) {
        const emptyIndex = board.indexOf(0);
        const validMoves = [];

        const row = Math.floor(emptyIndex / size);
        const col = emptyIndex % size;

        if (row > 0) validMoves.push(emptyIndex - size); // Cima
        if (row < size - 1) validMoves.push(emptyIndex + size); // Baixo
        if (col > 0) validMoves.push(emptyIndex - 1); // Esquerda
        if (col < size - 1) validMoves.push(emptyIndex + 1); // Direita

        // Escolhe um movimento aleatório permitido
        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        board[emptyIndex] = board[randomMove];
        board[randomMove] = 0;
    }
}

// Verifica se o jogador venceu
function checkWin() {
    let won = true;
    for (let i = 0; i < board.length - 1; i++) {
        if (board[i] !== i + 1) {
            won = false;
            break;
        }
    }
    if (won && board[board.length - 1] === 0) {
        setTimeout(() => {
            alert(`Parabéns! Você resolveu o Numpuz em ${moves} movimentos!`);
        }, 200);
    }
}

// Ouvintes de eventos (Event Listeners)
resetBtn.addEventListener('click', initGame);

// Começa o jogo assim que a página carrega
window.onload = initGame;
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageText = document.getElementById('message-text');
const messageContainer = document.getElementById('message-container');
const restartBtn = document.getElementById('restart-btn');
const scoreXElement = document.getElementById('score-x');
const scoreOElement = document.getElementById('score-o');

let isCircleTurn = false;
let scoreX = 0;
let scoreO = 0;

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticais
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

const startGame = () => {
    isCircleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.innerText = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    messageContainer.classList.add('hide');
};

function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'o' : 'x';
    
    // Marcar célula
    placeMark(cell, currentClass);

    // Verificar vitória ou empate
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerText = currentClass.toUpperCase();
}

function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function endGame(draw) {
    if (draw) {
        messageText.innerText = 'Empate!';
    } else {
        messageText.innerText = `Jogador ${isCircleTurn ? 'O' : 'X'} venceu!`;
        updateScore();
    }
    messageContainer.classList.remove('hide');
}

function updateScore() {
    if (isCircleTurn) {
        scoreO++;
        scoreOElement.innerText = scoreO;
    } else {
        scoreX++;
        scoreXElement.innerText = scoreX;
    }
}

restartBtn.addEventListener('click', startGame);

// Inicia o jogo pela primeira vez
startGame();
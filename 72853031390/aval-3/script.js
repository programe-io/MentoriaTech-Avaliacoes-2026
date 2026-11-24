
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");

const playerXElement = document.getElementById("playerX");
const playerOElement = document.getElementById("playerO");

const modeCPUButton = document.getElementById("modeCPU");
const modePVPButton = document.getElementById("modePVP");
const difficultyBox = document.getElementById("difficultyBox");
const difficultySelect = document.getElementById("difficultySelect");

const nameX = document.getElementById("nameX");
const nameO = document.getElementElementById
    ? document.getElementElementById("nameO")
    : document.getElementById("nameO");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

let scoreX = 0;
let scoreO = 0;

let gameMode = "cpu";
let difficulty = "easy";
let cpuThinking = false;

// COMBINAÇÕES VENCEDORAS

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

// CLIQUES NO TABULEIRO

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = Number(cell.dataset.index);

        if (gameOver || cpuThinking || board[index] !== "") {
            return;
        }

        // CPU: jogador humano controla somente X
        if (gameMode === "cpu" && currentPlayer !== "X") {
            return;
        }

        makeMove(index, currentPlayer);
    });
});

// FAZER JOGADA

function makeMove(index, player) {
    if (board[index] !== "" || gameOver) return;

    board[index] = player;

    cells[index].textContent = player;
    cells[index].classList.add(player.toLowerCase());
    cells[index].disabled = true;

    checkWinner();
}

// VERIFICAR VITÓRIA

function getWinningCombination(position) {
    return winningCombinations.find(combination => {
        const [a, b, c] = combination;

        return (
            position[a] !== "" &&
            position[a] === position[b] &&
            position[a] === position[c]
        );
    });
}

function checkWinner() {
    const winningCombination = getWinningCombination(board);

    if (winningCombination) {
        gameOver = true;

        winningCombination.forEach(index => {
            cells[index].classList.add("winner");
        });

        if (currentPlayer === "X") {
            scoreX++;
            scoreXElement.textContent = scoreX;
        } else {
            scoreO++;
            scoreOElement.textContent = scoreO;
        }

        const winnerName = gameMode === "cpu" && currentPlayer === "O"
            ? "CPU"
            : currentPlayer === "X"
                ? "Jogador 1"
                : "Jogador 2";

        statusText.textContent = `🏆 ${winnerName} venceu!`;

        return;
    }

    // EMPATE

    if (board.every(cell => cell !== "")) {
        gameOver = true;
        statusText.textContent = "🤝 Empate!";
        return;
    }

    // TROCAR JOGADOR

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    updateTurn();

    // VEZ DA CPU

    if (gameMode === "cpu" && currentPlayer === "O") {
        cpuTurn();
    }
}

// ATUALIZAR STATUS

function updateTurn() {
    if (gameMode === "cpu") {
        statusText.textContent = currentPlayer === "X"
            ? "Sua vez! (X)"
            : "CPU pensando...";

    } else {
        statusText.textContent = currentPlayer === "X"
            ? "Vez do jogador 1 (X)"
            : "Vez do jogador 2 (O)";
    }

    playerXElement.classList.toggle("active", currentPlayer === "X");
    playerOElement.classList.toggle("active", currentPlayer === "O");
}

// ============================
// INTELIGÊNCIA ARTIFICIAL
// ============================

// VEZ DA CPU

function cpuTurn() {
    if (gameOver) return;

    cpuThinking = true;
    cells.forEach(cell => cell.disabled = true);

    statusText.textContent = "🤖 CPU pensando...";

    setTimeout(() => {
        if (gameOver) {
            cpuThinking = false;
            return;
        }

        let move;

        if (difficulty === "easy") {
            move = getRandomMove(board);
        }

        if (difficulty === "medium") {
            move = getMediumMove(board);
        }

        if (difficulty === "hard") {
            move = getBestMove(board);
        }

        if (move !== undefined && move !== null) {
            makeMove(move, "O");
        }

        cpuThinking = false;

        if (!gameOver && currentPlayer === "X") {
            cells.forEach((cell, index) => {
                cell.disabled = board[index] !== "";
            });
        }

    }, 450);
}

// DIFICULDADE FÁCIL
// Escolhe uma casa aleatória

function getRandomMove(position) {
    const available = position
        .map((value, index) => value === "" ? index : null)
        .filter(index => index !== null);

    if (available.length === 0) return null;

    return available[Math.floor(Math.random() * available.length)];
}

// DIFICULDADE MÉDIA
// Tenta vencer, bloquear ou escolher uma posição estratégica

function getMediumMove(position) {

    // 1. Tenta vencer
    let move = findWinningMove(position, "O");
    if (move !== null) return move;

    // 2. Bloqueia o jogador
    move = findWinningMove(position, "X");
    if (move !== null) return move;

    // 3. Pega o centro
    if (position[4] === "") return 4;

    // 4. Tenta pegar um canto
    const corners = [0, 2, 6, 8].filter(i => position[i] === "");

    if (corners.length > 0) {
        return corners[Math.floor(Math.random() * corners.length)];
    }

    // 5. Escolhe uma casa disponível
    return getRandomMove(position);
}

// ENCONTRAR JOGADA VENCEDORA OU BLOQUEIO

function findWinningMove(position, player) {
    for (let i = 0; i < 9; i++) {
        if (position[i] !== "") continue;

        position[i] = player;

        const wins = getWinningCombination(position) !== undefined;

        position[i] = "";

        if (wins) return i;
    }

    return null;
}

// DIFICULDADE IMPOSSÍVEL
// Algoritmo Minimax

function getBestMove(position) {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 9; i++) {
        if (position[i] !== "") continue;

        position[i] = "O";

        const score = minimax(position, 0, false);

        position[i] = "";

        if (score > bestScore) {
            bestScore = score;
            bestMove = i;
        }
    }

    return bestMove;
}

// MINIMAX

function minimax(position, depth, isMaximizing) {
    const result = evaluateBoard(position);

    if (result !== null) {
        return result - depth;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let i = 0; i < 9; i++) {
            if (position[i] !== "") continue;

            position[i] = "O";

            const score = minimax(position, depth + 1, false);

            position[i] = "";

            bestScore = Math.max(bestScore, score);
        }

        return bestScore;

    } else {
        let bestScore = Infinity;

        for (let i = 0; i < 9; i++) {
            if (position[i] !== "") continue;

            position[i] = "X";

            const score = minimax(position, depth + 1, true);

            position[i] = "";

            bestScore = Math.min(bestScore, score);
        }

        return bestScore;
    }
}

// AVALIAR TABULEIRO

function evaluateBoard(position) {
    const combination = getWinningCombination(position);

    if (combination) {
        const winner = position[combination[0]];

        if (winner === "O") return 10;
        if (winner === "X") return -10;
    }

    if (position.every(cell => cell !== "")) {
        return 0;
    }

    return null;
}

// ============================
// MODOS DE JOGO
// ============================

function setMode(mode) {
    gameMode = mode;

    modeCPUButton.classList.toggle("active", mode === "cpu");
    modePVPButton.classList.toggle("active", mode === "pvp");

    difficultyBox.style.display = mode === "cpu" ? "flex" : "none";

    if (mode === "cpu") {
        nameX.textContent = "Jogador 1";
        nameO.textContent = "CPU";
    } else {
        nameX.textContent = "Jogador 1";
        nameO.textContent = "Jogador 2";
    }

    restartGame();
}

// TROCAR DIFICULDADE

function changeDifficulty() {
    difficulty = difficultySelect.value;
    restartGame();
}

// ============================
// REINICIAR
// ============================

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    cpuThinking = false;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
        cell.classList.remove("x", "o", "winner");
    });

    updateTurn();
}

// ZERAR PLACAR

function resetScore() {
    scoreX = 0;
    scoreO = 0;

    scoreXElement.textContent = "0";
    scoreOElement.textContent = "0";

    restartGame();
}

// INICIALIZAÇÃO

updateTurn();

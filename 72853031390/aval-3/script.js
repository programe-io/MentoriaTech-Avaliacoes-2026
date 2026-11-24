
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");

const playerXElement = document.getElementById("playerX");
const playerOElement = document.getElementById("playerO");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

let scoreX = 0;
let scoreO = 0;

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

// CLIQUE NAS CASAS

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = Number(cell.dataset.index);

        if (board[index] !== "" || gameOver) {
            return;
        }

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        cell.disabled = true;

        checkWinner();
    });
});

// VERIFICAR VITÓRIA OU EMPATE

function checkWinner() {

    let winningCombination = null;

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winningCombination = combination;
            break;
        }
    }

    // VITÓRIA

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

        statusText.textContent = `🎉 Jogador ${currentPlayer} venceu!`;

        return;
    }

    // EMPATE

    if (board.every(cell => cell !== "")) {
        gameOver = true;
        statusText.textContent = "🤝 Empate! Ninguém venceu.";
        return;
    }

    // TROCAR JOGADOR

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    updateTurn();
}

// ATUALIZAR VEZ DO JOGADOR

function updateTurn() {
    statusText.textContent = `Vez do jogador ${currentPlayer}`;

    playerXElement.classList.toggle(
        "active",
        currentPlayer === "X"
    );

    playerOElement.classList.toggle(
        "active",
        currentPlayer === "O"
    );
}

// REINICIAR PARTIDA

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;

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

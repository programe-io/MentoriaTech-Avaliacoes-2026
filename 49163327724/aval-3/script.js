const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let cells = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  cells.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(index));
    board.appendChild(cell);
  });
  statusText.textContent = `Vez do jogador ${currentPlayer}`;
}

function handleClick(index) {
  if (cells[index] !== "" || !gameActive) return;

  cells[index] = currentPlayer;
  board.children[index].textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Jogador ${currentPlayer} venceu!`;
    gameActive = false;
    return;
  }

  if (!cells.includes("")) {
    statusText.textContent = "Empate!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Vez do jogador ${currentPlayer}`;
}

function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function restartGame() {
  currentPlayer = "X";
  cells = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  createBoard();
}

createBoard();
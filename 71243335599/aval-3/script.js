const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Clique nas células
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => makeMove(cell, index));
});

function makeMove(cell, index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  checkWinner();

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (gameActive) {
    statusText.textContent = `Vez do jogador ${currentPlayer}`;
  }
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]) {
      statusText.textContent = `Jogador ${board[a]} venceu!`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "Empate!";
    gameActive = false;
  }
}

// Função para reiniciar
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Vez do jogador X";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}<div id="status">Vez do jogador X</div>

<div class="board">
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
  <div class="cell"></div>
</div>

<button onclick="resetGame()">Reiniciar</button>

<script src="script.js"></script>
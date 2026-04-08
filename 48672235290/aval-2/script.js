const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function handleClick(index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer.toLowerCase());

  checkWinner();
}

function checkWinner() {
  let win = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      win = true;
      break;
    }
  }

  if (win) {
    alert(`Jogador ${currentPlayer} venceu!`);
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    alert("Empate!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Adiciona evento de clique em cada célula
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(index));
});<button onclick="resetGame()">Reiniciar</button>
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = 'X';

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('x', 'o');
  });
}
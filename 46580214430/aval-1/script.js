const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [, [3, 4, 5], [6, 7, 8], // Linhas, [1, 4, 7], [2, 5, 8], // Colunas, [2, 4, 6]             // Diagonais
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (boardState[index] !== '' || !gameActive) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.innerHTML = `Jogador <span style="color: ${currentPlayer === 'X' ? '#00e676' : '#ff5252'}">${currentPlayer}</span> venceu! 🎉`;
    gameActive = false;
    return;
  }

  if (!boardState.includes('')) {
    statusText.textContent = 'Empate! 🤝';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  const color = currentPlayer === 'X' ? '#00e676' : '#ff5252';
  statusText.innerHTML = `Vez do jogador: <span style="color: ${color}">${currentPlayer}</span>`;
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  boardState = ['', '', '', '', '', '', '', '', ''];
  statusText.innerHTML = `Vez do jogador: <span>X</span>`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
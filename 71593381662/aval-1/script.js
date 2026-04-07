<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Jogo da Velha</title>
<style>
  body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }

  h1 {
    margin-bottom: 20px;
  }

  #board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-gap: 5px;
  }

  .cell {
    width: 100px;
    height: 100px;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    cursor: pointer;
    user-select: none;
  }

  .cell:hover {
    background-color: #ddd;
  }

  #message {
    margin-top: 20px;
    font-size: 20px;
  }

  button {
    margin-top: 15px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
</style>
</head>
<body>

<h1>Jogo da Velha</h1>
<div id="board"></div>
<div id="message"></div>
<button onclick="resetGame()">Reiniciar Jogo</button>

<script>
  const boardElement = document.getElementById('board');
  const messageElement = document.getElementById('message');

  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let gameOver = false;

  // Cria o tabuleiro
  function createBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.textContent = cell;
      cellElement.addEventListener('click', () => makeMove(index));
      boardElement.appendChild(cellElement);
    });
  }

  // Realiza uma jogada
  function makeMove(index) {
    if (board[index] !== '' || gameOver) return;
    board[index] = currentPlayer;
    createBoard();
    if (checkWin()) {
      messageElement.textContent = `Jogador ${currentPlayer} venceu! 🎉`;
      gameOver = true;
    } else if (board.every(cell => cell !== '')) {
      messageElement.textContent = "Empate! 🤝";
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      messageElement.textContent = `É a vez do jogador ${currentPlayer}`;
    }
  }

  // Verifica vitória
  function checkWin() {
    const winConditions = [
      [0,1,2],[3,4,5],[6,7,8], // linhas
      [0,3,6],[1,4,7],[2,5,8], // colunas
      [0,4,8],[2,4,6]          // diagonais
    ];
    return winConditions.some(condition => {
      const [a,b,c] = condition;
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  }

  // Reinicia o jogo
  function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    messageElement.textContent = `É a vez do jogador ${currentPlayer}`;
    createBoard();
  }

  // Inicializa
  createBoard();
  messageElement.textContent = `É a vez do jogador ${currentPlayer}`;
</script>

</body>
</html>
const boardElement = document.getElementById("board");
const turnElement = document.getElementById("turn");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restart");

let board;
let currentPlayer;
let selected;
let possibleMoves;
let mustContinue;
let gameOver;

function createGame() {
  board = Array.from({ length: 8 }, () => Array(8).fill(null));

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = { color: "black", king: false };
      }
    }
  }

  for (let row = 5; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = { color: "red", king: false };
      }
    }
  }

  currentPlayer = "red";
  selected = null;
  possibleMoves = [];
  mustContinue = false;
  gameOver = false;

  messageElement.textContent = "Escolha uma peça para começar.";
  render();
}

function inside(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function opponent(color) {
  return color === "red" ? "black" : "red";
}

function getMoves(row, col, capturesOnly = false) {
  const piece = board[row][col];
  if (!piece) return [];

  const moves = [];
  const directions = [
    [-1, -1], [-1, 1],
    [1, -1], [1, 1]
  ];

  for (const [dr, dc] of directions) {
    if (!piece.king) {
      // Peças comuns só andam para a frente.
      if (!capturesOnly) {
        const forward = piece.color === "red" ? -1 : 1;
        if (dr === forward) {
          const nr = row + dr;
          const nc = col + dc;

          if (inside(nr, nc) && !board[nr][nc]) {
            moves.push({
              to: [nr, nc],
              capture: null
            });
          }
        }
      }

      // Peças comuns podem capturar para frente ou para trás.
      const mr = row + dr;
      const mc = col + dc;
      const lr = row + dr * 2;
      const lc = col + dc * 2;

      if (
        inside(lr, lc) &&
        board[mr]?.[mc] &&
        board[mr][mc].color === opponent(piece.color) &&
        !board[lr][lc]
      ) {
        moves.push({
          to: [lr, lc],
          capture: [mr, mc]
        });
      }
    } else {
      // Damas podem andar por várias casas na diagonal.
      let distance = 1;

      while (inside(row + dr * distance, col + dc * distance)) {
        const nr = row + dr * distance;
        const nc = col + dc * distance;

        if (!board[nr][nc]) {
          if (!capturesOnly) {
            moves.push({
              to: [nr, nc],
              capture: null
            });
          }
        } else {
          if (board[nr][nc].color === piece.color) break;

          const capturedRow = nr;
          const capturedCol = nc;
          distance++;

          while (inside(row + dr * distance, col + dc * distance)) {
            const lr = row + dr * distance;
            const lc = col + dc * distance;

            if (board[lr][lc]) break;

            moves.push({
              to: [lr, lc],
              capture: [capturedRow, capturedCol]
            });

            distance++;
          }

          break;
        }

        distance++;
      }
    }
  }

  return moves;
}

function getAllMoves(color, capturesOnly = false) {
  const all = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];

      if (piece && piece.color === color) {
        const moves = getMoves(row, col, capturesOnly);

        for (const move of moves) {
          all.push({
            from: [row, col],
            ...move
          });
        }
      }
    }
  }

  return all;
}

function render() {
  boardElement.innerHTML = "";

  const capturesAvailable = getAllMoves(currentPlayer, true);
  const allMoves = capturesAvailable.length
    ? capturesAvailable
    : getAllMoves(currentPlayer);

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.className = "square " +
        ((row + col) % 2 === 0 ? "light" : "dark");

      if (selected && selected[0] === row && selected[1] === col) {
        square.classList.add("selected");
      }

      const isTarget = possibleMoves.some(move =>
        move.to[0] === row && move.to[1] === col
      );

      if (isTarget) square.classList.add("target");

      const piece = board[row][col];

      if (piece) {
        const pieceElement = document.createElement("div");
        pieceElement.className = `piece ${piece.color}`;

        if (piece.king) {
          pieceElement.textContent = "♛";
        }

        square.appendChild(pieceElement);
      }

      square.addEventListener("click", () => handleClick(row, col));
      boardElement.appendChild(square);
    }
  }

  turnElement.textContent = currentPlayer === "red"
    ? "Vez das peças vermelhas"
    : "Vez das peças pretas";
}

function handleClick(row, col) {
  if (gameOver) return;

  const piece = board[row][col];

  if (selected) {
    const move = possibleMoves.find(item =>
      item.to[0] === row && item.to[1] === col
    );

    if (move) {
      makeMove(move);
      return;
    }

    if (
      piece &&
      piece.color === currentPlayer &&
      (!mustContinue || (selected[0] === row && selected[1] === col))
    ) {
      selectPiece(row, col);
      return;
    }

    if (!mustContinue) {
      selected = null;
      possibleMoves = [];
      messageElement.textContent = "Escolha uma peça válida.";
      render();
    }

    return;
  }

  if (piece && piece.color === currentPlayer) {
    selectPiece(row, col);
  }
}

function selectPiece(row, col) {
  const captures = getAllMoves(currentPlayer, true);
  const mustCapture = captures.length > 0;

  if (mustContinue && (row !== selected[0] || col !== selected[1])) {
    return;
  }

  const moves = getMoves(row, col, mustCapture);

  if (moves.length === 0) {
    messageElement.textContent = mustCapture
      ? "Você precisa escolher uma peça que possa capturar."
      : "Essa peça não tem movimentos disponíveis.";
    return;
  }

  selected = [row, col];
  possibleMoves = moves;

  messageElement.textContent = mustCapture
    ? "Captura obrigatória! Escolha uma casa marcada."
    : "Escolha uma casa marcada para mover.";

  render();
}

function makeMove(move) {
  const [fromRow, fromCol] = selected;
  const [toRow, toCol] = move.to;

  const piece = board[fromRow][fromCol];

  board[toRow][toCol] = piece;
  board[fromRow][fromCol] = null;

  if (move.capture) {
    const [captureRow, captureCol] = move.capture;
    board[captureRow][captureCol] = null;
  }

  let promoted = false;

  if (
    !piece.king &&
    ((piece.color === "red" && toRow === 0) ||
     (piece.color === "black" && toRow === 7))
  ) {
    piece.king = true;
    promoted = true;
  }

  // Se capturou, verifica se a mesma peça pode capturar novamente.
  if (move.capture && !promoted) {
    const nextCaptures = getMoves(toRow, toCol, true);

    if (nextCaptures.length > 0) {
      selected = [toRow, toCol];
      possibleMoves = nextCaptures;
      mustContinue = true;
      messageElement.textContent =
        "Continue capturando com a mesma peça!";
      render();
      return;
    }
  }

  finishTurn();
}

function finishTurn() {
  selected = null;
  possibleMoves = [];
  mustContinue = false;

  currentPlayer = opponent(currentPlayer);

  const redPieces = countPieces("red");
  const blackPieces = countPieces("black");

  if (redPieces === 0 || getAllMoves("red").length === 0) {
    endGame("PRETAS");
    return;
  }

  if (blackPieces === 0 || getAllMoves("black").length === 0) {
    endGame("VERMELHAS");
    return;
  }

  messageElement.textContent = "Sua vez! Escolha uma peça.";
  render();
}

function countPieces(color) {
  let count = 0;

  for (const row of board) {
    for (const piece of row) {
      if (piece && piece.color === color) count++;
    }
  }

  return count;
}

function endGame(winner) {
  gameOver = true;
  turnElement.textContent = "Fim de jogo!";
  messageElement.textContent = `🏆 As peças ${winner} venceram!`;
  render();
}

restartButton.addEventListener("click", createGame);

createGame();
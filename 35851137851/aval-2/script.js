const emojis = ['🚀', '🎮', '👾', '🍕', '🐱', '🌈', '🔥', '💎'];
const cardsData = [...emojis, ...emojis]; // Duplica para formar os pares

const grid = document.getElementById('grid');
const attemptsElement = document.getElementById('attempts');
const restartBtn = document.getElementById('restart-btn');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;
let matchedPairs = 0;

// Embaralha o array de cartas
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Cria o tabuleiro do jogo
function createBoard() {
  grid.innerHTML = '';
  attempts = 0;
  matchedPairs = 0;
  attemptsElement.textContent = attempts;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  const shuffledCards = shuffle([...cardsData]);

  shuffledCards.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;

    card.innerHTML = `
      <div class="card-face card-front">❓</div>
      <div class="card-face card-back">${emoji}</div>
    `;

    card.addEventListener('click', flipCard);
    grid.appendChild(card);
  });
}

// Lógica para virar a carta
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  attempts++;
  attemptsElement.textContent = attempts;

  checkForMatch();
}

// Verifica se as duas cartas formam um par
function checkForMatch() {
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

// Trava as cartas que formaram par
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  
  matchedPairs++;
  resetBoard();

  if (matchedPairs === emojis.length) {
    setTimeout(() => {
      alert(`Parabéns! Você venceu em ${attempts} tentativas! 🎉`);
    }, 500);
  }
}

// Desvira as cartas caso não formem par
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

// Reseta o estado do tabuleiro para a próxima jogada
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  [lockBoard] = [false];
}

// Evento de reiniciar
restartBtn.addEventListener('click', createBoard);

// Inicia o jogo ao carregar
createBoard();
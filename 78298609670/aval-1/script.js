const grid = document.getElementById('grid');
const emojis = ['🔥', '🔥', '☁️', '☁️', '🧪', '🧪', '👾', '👾', '🎸', '🎸', '🍕', '🍕', '💎', '💎', '🚀', '🚀'];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function createBoard() {
    // Embaralhar emojis
    const shuffledEmojis = emojis.sort(() => 0.5 - Math.random());
    
    shuffledEmojis.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.innerHTML = `
            <div class="front">?</div>
            <div class="back">${emoji}</div>
        `;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function restartGame() {
    grid.innerHTML = '';
    createBoard();
}

createBoard();
const board = document.getElementById('board');
const emojis = ['🚀', '🚀', '💻', '💻', '🎨', '🎨', '🕹️', '🕹️', '🍎', '🍎', '🔥', '🔥', '🧠', '🧠', '🌈', '🌈'];
let flippedCards = [];
let matchedCount = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    board.innerHTML = '';
    const shuffledEmojis = shuffle([...emojis]);
    
    shuffledEmojis.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-front">${emoji}</div>
            <div class="card-back">?</div>
        `;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flip')) {
        this.classList.add('flip');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.innerText === card2.innerText;

    if (isMatch) {
        matchedCount += 2;
        flippedCards = [];
        if (matchedCount === emojis.length) alert('Parabéns! Você venceu!');
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            flippedCards = [];
        }, 1000); // Espera 1 segundo para o jogador ver as cartas
    }
}

function restartGame() {
    matchedCount = 0;
    flippedCards = [];
    createBoard();
}

// Inicia o jogo ao carregar a página
createBoard();
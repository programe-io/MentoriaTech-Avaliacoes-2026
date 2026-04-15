const symbols = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍉'];
let cards = [...symbols, ...symbols]; // Duplica para criar pares
let flippedCards = [];
let matchedCount = 0;

const grid = document.getElementById('grid');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    grid.innerHTML = '';
    const shuffledCards = shuffle(cards);
    
    shuffledCards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.innerText = '?'; // Lado de trás da carta
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerText = this.dataset.symbol;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount += 2;
        flippedCards = [];
        
        if (matchedCount === cards.length) {
            setTimeout(() => alert('Parabéns! Você venceu!'), 300);
        }
    } else {
        // Se não for par, vira de volta após 1 segundo
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerText = '?';
            card2.innerText = '?';
            flippedCards = [];
        }, 1000);
    }
}

function restartGame() {
    matchedCount = 0;
    flippedCards = [];
    createBoard();
}

// Inicia o jogo pela primeira vez
createBoard();
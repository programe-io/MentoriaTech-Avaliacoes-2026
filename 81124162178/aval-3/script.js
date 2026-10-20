// Lógica do Mini-Game: Adivinhe o Número
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    let guess = parseInt(document.getElementById('userGuess').value);
    let message = document.getElementById('gameMessage');

    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.style.color = "#ffa502";
        message.innerText = "Digite um número válido entre 1 e 100!";
        return;
    }

    attempts++;

    if (guess === secretNumber) {
        message.style.color = "#00ff88";
        message.innerText = `🎉 Parabéns! Você acertou em ${attempts} tentativas!`;
    } else if (guess < secretNumber) {
        message.style.color = "#3742fa";
        message.innerText = "📈 O número secreto é MAIOR!";
    } else {
        message.style.color = "#ff4757";
        message.innerText = "📉 O número secreto é MENOR!";
    }
}

function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('userGuess').value = '';
    document.getElementById('gameMessage').style.color = "#fff";
    document.getElementById('gameMessage').innerText = "Novo jogo iniciado! Boa sorte!";
}

// Filtro de Pesquisa do Catálogo
function filterGames() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('game-card');

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getAttribute('data-title');
        
        if (title.includes(input)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// Rolar suavemente até os jogos
function scrollToGames() {
    document.getElementById('gameCatalog').scrollIntoView({ behavior: 'smooth' });
}
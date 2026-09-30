
/* =========================
   ELEMENTOS DO JOGO
========================= */

const gameBoard = document.getElementById("gameBoard");
const difficulty = document.getElementById("difficulty");

const levelDisplay = document.getElementById("level");
const scoreDisplay = document.getElementById("score");
const movesDisplay = document.getElementById("moves");
const timeDisplay = document.getElementById("time");
const message = document.getElementById("message");

const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

/* =========================
   CONFIGURAÇÃO DAS CARTAS
========================= */

// Cada símbolo representa uma personagem ou
// um elemento do universo kawaii.

const symbols = [
    "😈", "💜", "🖤", "🎀", "💀",
    "🌙", "🦇", "💗", "⭐", "🕷"
];

// Quantidade de pares e tempo de cada dificuldade.

const levels = {
    easy: {
        pairs: 6,
        time: 60,
        number: 1
    },

    medium: {
        pairs: 8,
        time: 90,
        number: 2
    },

    hard: {
        pairs: 10,
        time: 120,
        number: 3
    }
};

/* =========================
   VARIÁVEIS DO JOGO
========================= */

let firstCard = null;
let secondCard = null;

let lockBoard = false;
let gameActive = false;

let score = 0;
let moves = 0;
let matchedPairs = 0;
let timeLeft = 60;

let timer = null;
let mismatchTimeout = null;

let currentCards = [];

/* =========================
   EMBARALHAR CARTAS
========================= */

function shuffle(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(
            Math.random() * (i + 1)
        );

        [
            shuffled[i],
            shuffled[randomIndex]
        ] = [
            shuffled[randomIndex],
            shuffled[i]
        ];
    }

    return shuffled;
}

/* =========================
   ATUALIZAR PONTUAÇÃO
========================= */

function updateStats() {
    scoreDisplay.textContent = score;
    movesDisplay.textContent = moves;
    timeDisplay.textContent = `${timeLeft}s`;
}

/* =========================
   CRIAR UMA CARTA
========================= */

function createCard(symbol, index) {
    const card = document.createElement("button");

    card.type = "button";
    card.className = "card";

    card.dataset.symbol = symbol;
    card.dataset.index = index;

    card.setAttribute("aria-label", "Carta fechada");
    card.setAttribute("aria-pressed", "false");

    card.addEventListener("click", () => {
        flipCard(card);
    });

    return card;
}

/* =========================
   INICIAR O JOGO
========================= */

function startGame() {
    clearInterval(timer);
    clearTimeout(mismatchTimeout);

    const selectedLevel = levels[difficulty.value];

    // Reinicia todas as variáveis.

    firstCard = null;
    secondCard = null;

    lockBoard = false;
    gameActive = true;

    score = 0;
    moves = 0;
    matchedPairs = 0;

    timeLeft = selectedLevel.time;

    levelDisplay.textContent = selectedLevel.number;

    updateStats();

    message.textContent = "Boa sorte! Encontre os pares!";

    startButton.textContent = "↻ Novo jogo";

    // Seleciona os símbolos e cria os pares.

    const selectedSymbols = symbols.slice(
        0,
        selectedLevel.pairs
    );

    currentCards = shuffle([
        ...selectedSymbols,
        ...selectedSymbols
    ]);

    // Ajusta o número de colunas conforme a dificuldade.

    gameBoard.classList.remove(
        "easy-board",
        "medium-board",
        "hard-board"
    );

    if (difficulty.value === "hard") {
        gameBoard.style.gridTemplateColumns =
            "repeat(5, minmax(0, 1fr))";
    } else {
        gameBoard.style.gridTemplateColumns =
            "repeat(4, minmax(0, 1fr))";
    }

    gameBoard.innerHTML = "";

    currentCards.forEach((symbol, index) => {
        const card = createCard(symbol, index);
        gameBoard.appendChild(card);
    });

    // Inicia a contagem regressiva.

    timer = setInterval(() => {
        timeLeft--;

        updateStats();

        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

/* =========================
   VIRAR UMA CARTA
========================= */

function flipCard(card) {
    if (!gameActive) return;
    if (lockBoard) return;
    if (card.classList.contains("flipped")) return;
    if (card.classList.contains("matched")) return;

    card.classList.add("flipped");

    card.textContent = card.dataset.symbol;

    card.setAttribute(
        "aria-label",
        `Carta revelada: ${card.dataset.symbol}`
    );

    card.setAttribute("aria-pressed", "true");

    // Guarda a primeira carta escolhida.

    if (firstCard === null) {
        firstCard = card;
        return;
    }

    // Guarda a segunda carta e registra a tentativa.

    secondCard = card;
    moves++;

    updateStats();

    checkMatch();
}

/* =========================
   COMPARAR OS PARES
========================= */

function checkMatch() {
    const isMatch =
        firstCard.dataset.symbol ===
        secondCard.dataset.symbol;

    if (isMatch) {
        handleMatch();
    } else {
        handleMismatch();
    }
}

/* =========================
   QUANDO ACERTA
========================= */

function handleMatch() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    firstCard.disabled = true;
    secondCard.disabled = true;

    matchedPairs++;
    score += 10;

    message.textContent = "Acertou! Mais um par! 💜";

    updateStats();

    resetTurn();

    // Verifica se todos os pares foram encontrados.

    const totalPairs = levels[difficulty.value].pairs;

    if (matchedPairs === totalPairs) {
        endGame(true);
    }
}

/* =========================
   QUANDO ERRA
========================= */

function handleMismatch() {
    lockBoard = true;

    message.textContent =
        "Ops! Essas cartas são diferentes. Tente novamente!";

    mismatchTimeout = setTimeout(() => {
        if (!gameActive) return;

        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        firstCard.textContent = "";
        secondCard.textContent = "";

        firstCard.setAttribute(
            "aria-label",
            "Carta fechada"
        );

        secondCard.setAttribute(
            "aria-label",
            "Carta fechada"
        );

        firstCard.setAttribute("aria-pressed", "false");
        secondCard.setAttribute("aria-pressed", "false");

        resetTurn();

        message.textContent = "Continue procurando os pares!";
    }, 800);
}

/* =========================
   PREPARAR A PRÓXIMA JOGADA
========================= */

function resetTurn() {
    firstCard = null;
    secondCard = null;

    lockBoard = false;
}

/* =========================
   ENCERRAR A PARTIDA
========================= */

function endGame(won) {
    gameActive = false;
    lockBoard = true;

    clearInterval(timer);
    clearTimeout(mismatchTimeout);

    if (won) {
        message.textContent =
            `Você venceu! 💜 Pontuação final: ${score} pontos!`;
    } else {
        message.textContent =
            `O tempo acabou! Você fez ${score} pontos. Tente novamente!`;
    }

    startButton.textContent = "▶ Jogar novamente";
}

/* =========================
   BOTÕES DE CONTROLE
========================= */

// Iniciar ou começar uma nova partida.

startButton.addEventListener("click", startGame);

// Reiniciar a partida atual.

resetButton.addEventListener("click", startGame);

// Quando a dificuldade mudar, prepara um novo tabuleiro.

difficulty.addEventListener("change", () => {
    clearInterval(timer);
    clearTimeout(mismatchTimeout);

    gameActive = false;
    lockBoard = false;

    firstCard = null;
    secondCard = null;

    score = 0;
    moves = 0;
    matchedPairs = 0;

    timeLeft = levels[difficulty.value].time;

    levelDisplay.textContent =
        levels[difficulty.value].number;

    updateStats();

    gameBoard.innerHTML = `
        <p class="start-message">
            💜 Clique em iniciar para jogar!
        </p>
    `;

    gameBoard.style.gridTemplateColumns =
        difficulty.value === "hard"
            ? "repeat(5, minmax(0, 1fr))"
            : "repeat(4, minmax(0, 1fr))";

    message.textContent =
        "Dificuldade alterada! Prepare-se para jogar.";

    startButton.textContent = "▶ Iniciar jogo";
});
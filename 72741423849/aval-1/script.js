/* =========================================
   MENU RESPONSIVO
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});


/* Fecha o menu ao clicar em um link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.textContent = "☰";

    });

});


/* =========================================
   MODAL DO BLOG
========================================= */

const modal = document.getElementById("blogModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const readButtons = document.querySelectorAll(".read-more");

readButtons.forEach(button => {

    button.addEventListener("click", () => {

        const title = button.dataset.title;
        const content = button.dataset.content;

        modalTitle.textContent = title;
        modalText.textContent = content;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

    });

});


function closeModal() {

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


modalClose.addEventListener("click", closeModal);


/* Fechar clicando fora do modal */

modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeModal();
    }

});


/* Fechar com ESC */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
    }

});


/* =========================================
   JOGO DE BOLHAS
========================================= */

const gameArea = document.getElementById("gameArea");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const startGameButton = document.getElementById("startGame");
const resetGameButton = document.getElementById("resetGame");
const gameMessage = document.getElementById("gameMessage");
const gameResult = document.getElementById("gameResult");

let score = 0;
let timeLeft = 20;
let gameRunning = false;
let gameTimer = null;
let bubbleTimer = null;


/* Criar uma bolha */

function createGameBubble() {

    if (!gameRunning) {
        return;
    }

    const bubble = document.createElement("button");

    bubble.classList.add("game-bubble");

    bubble.setAttribute(
        "aria-label",
        "Bolha"
    );

    const size = Math.floor(
        Math.random() * 35
    ) + 35;

    const maxX =
        gameArea.clientWidth - size;

    const maxY =
        gameArea.clientHeight - size;

    const x =
        Math.max(
            0,
            Math.random() * maxX
        );

    const y =
        Math.max(
            0,
            Math.random() * maxY
        );

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    bubble.addEventListener("click", () => {

        if (!gameRunning) {
            return;
        }

        score++;

        scoreElement.textContent = score;

        bubble.remove();

    });

    gameArea.appendChild(bubble);

    setTimeout(() => {

        if (bubble.isConnected) {
            bubble.remove();
        }

    }, 1800);

}


/* Iniciar jogo */

function startGame() {

    if (gameRunning) {
        return;
    }

    score = 0;
    timeLeft = 20;

    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;

    gameRunning = true;

    gameResult.textContent = "";

    gameMessage.style.display = "none";

    clearInterval(gameTimer);
    clearInterval(bubbleTimer);

    createGameBubble();

    bubbleTimer = setInterval(
        createGameBubble,
        650
    );

    gameTimer = setInterval(() => {

        timeLeft--;

        timerElement.textContent =
            timeLeft;

        if (timeLeft <= 0) {
            finishGame();
        }

    }, 1000);

}


/* Finalizar jogo */

function finishGame() {

    gameRunning = false;

    clearInterval(gameTimer);
    clearInterval(bubbleTimer);

    gameTimer = null;
    bubbleTimer = null;

    document
        .querySelectorAll(".game-bubble")
        .forEach(bubble => bubble.remove());

    gameMessage.style.display = "grid";

    gameMessage.textContent =
        "Fim de jogo! 🫧";

    gameResult.textContent =
        `Você conseguiu pegar ${score} bolha${score === 1 ? "" : "s"}!`;

}


/* Reiniciar jogo */

function resetGame() {

    gameRunning = false;

    clearInterval(gameTimer);
    clearInterval(bubbleTimer);

    gameTimer = null;
    bubbleTimer = null;

    score = 0;
    timeLeft = 20;

    scoreElement.textContent = "0";
    timerElement.textContent = "20";

    gameResult.textContent = "";

    gameMessage.style.display = "grid";

    gameMessage.textContent =
        'Clique em "Começar Jogo" para iniciar!';

    document
        .querySelectorAll(".game-bubble")
        .forEach(bubble => bubble.remove());

}


/* Eventos dos botões */

startGameButton.addEventListener(
    "click",
    startGame
);

resetGameButton.addEventListener(
    "click",
    resetGame
);


/* =========================================
   FORMULÁRIO DE CONTATO
========================================= */

const contactForm =
    document.getElementById("contactForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const messageInput =
    document.getElementById("message");

const nameError =
    document.getElementById("nameError");

const emailError =
    document.getElementById("emailError");

const messageError =
    document.getElementById("messageError");

const successMessage =
    document.getElementById("successMessage");


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        let valid = true;

        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        successMessage.textContent = "";


        /* Validar nome */

        if (
            nameInput.value.trim().length < 3
        ) {

            nameError.textContent =
                "Digite seu nome.";

            valid = false;

        }


        /* Validar e-mail */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailPattern.test(
                emailInput.value.trim()
            )
        ) {

            emailError.textContent =
                "Digite um e-mail válido.";

            valid = false;

        }


        /* Validar mensagem */

        if (
            messageInput.value.trim().length < 10
        ) {

            messageError.textContent =
                "A mensagem deve ter pelo menos 10 caracteres.";

            valid = false;

        }


        /* Resultado */

        if (valid) {

            successMessage.textContent =
                "🌊 Mensagem enviada com sucesso! Obrigado por entrar em contato!";

            contactForm.reset();

        }

    }
);


/* =========================================
   ANIMAÇÃO DOS CARDS AO ENTRAR NA TELA
========================================= */

const animatedElements =
    document.querySelectorAll(
        ".character-card, .place-card, .fact-card, .blog-card"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


animatedElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});


/* =========================================
   EFEITO DE BOLHAS EXTRAS
========================================= */

function createBackgroundBubble() {

    const bubble =
        document.createElement("span");

    bubble.style.position = "fixed";
    bubble.style.bottom = "-30px";

    const size =
        Math.floor(
            Math.random() * 25
        ) + 10;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    bubble.style.left =
        `${Math.random() * 100}%`;

    bubble.style.border =
        "2px solid rgba(255,255,255,0.35)";

    bubble.style.borderRadius =
        "50%";

    bubble.style.pointerEvents =
        "none";

    bubble.style.zIndex = "-1";

    const duration =
        Math.floor(
            Math.random() * 8
        ) + 7;

    bubble.style.animation =
        `riseBubble ${duration}s linear forwards`;

    document.body.appendChild(bubble);

    setTimeout(() => {

        bubble.remove();

    }, duration * 1000);

}


/* Criar bolhas periodicamente */

setInterval(
    createBackgroundBubble,
    1800
);
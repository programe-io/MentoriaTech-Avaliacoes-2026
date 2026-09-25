/* ==================================================
   MUNDO DE CENTOPIA
   JavaScript puro
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       PARTÍCULAS MÁGICAS
    ================================================== */

    const magicBackground =
        document.getElementById("magicBackground");

    function createMagicParticles() {

        if (!magicBackground) return;

        for (let i = 0; i < 45; i++) {

            const particle =
                document.createElement("span");

            particle.classList.add("magic-particle");

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.animationDuration =
                (5 + Math.random() * 10) + "s";

            particle.style.animationDelay =
                Math.random() * 8 + "s";

            particle.style.opacity =
                0.3 + Math.random() * 0.7;

            magicBackground.appendChild(particle);
        }
    }

    createMagicParticles();


    /* ==================================================
       MENU HAMBÚRGUER
    ================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            mainNav.classList.toggle("active");

            if (mainNav.classList.contains("active")) {
                menuToggle.textContent = "✕";
            } else {
                menuToggle.textContent = "☰";
            }
        });

        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

                menuToggle.textContent = "☰";
            });

        });
    }


    /* ==================================================
       CURTIDAS
    ================================================== */

    const likeButtons =
        document.querySelectorAll(".like-btn");

    likeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const counter =
                button.querySelector(".like-count");

            let count =
                parseInt(counter.textContent);

            const liked =
                button.classList.contains("liked");

            if (liked) {

                count--;

                button.classList.remove("liked");

                button.firstChild.textContent =
                    "❤️ Curtir ";

            } else {

                count++;

                button.classList.add("liked");

                button.firstChild.textContent =
                    "💖 Curtido ";

            }

            counter.textContent = count;
        });

    });


    /* ==================================================
       COMENTÁRIOS
    ================================================== */

    const commentButtons =
        document.querySelectorAll(".comment-btn");

    commentButtons.forEach(button => {

        button.addEventListener("click", () => {

            const post =
                button.closest(".post-card");

            const commentArea =
                post.querySelector(".comment-area");

            commentArea.classList.toggle("active");

            if (commentArea.classList.contains("active")) {

                const input =
                    commentArea.querySelector("input");

                input.focus();
            }
        });

    });


    const publishButtons =
        document.querySelectorAll(".publish-comment");

    publishButtons.forEach(button => {

        button.addEventListener("click", () => {

            const commentArea =
                button.closest(".comment-area");

            const input =
                commentArea.querySelector("input");

            const commentsList =
                commentArea.querySelector(".comments-list");

            const text =
                input.value.trim();

            if (text === "") {

                input.focus();

                return;
            }

            const comment =
                document.createElement("div");

            comment.classList.add("comment-item");

            comment.innerHTML =
                `✨ <strong>Visitante:</strong> ${escapeHTML(text)}`;

            commentsList.appendChild(comment);

            input.value = "";

        });

    });


    /* ==================================================
       EVITAR HTML INJETADO NOS COMENTÁRIOS
    ================================================== */

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;
    }


    /* ==================================================
       COMPARTILHAMENTO
    ================================================== */

    const shareButtons =
        document.querySelectorAll(".share-btn");

    shareButtons.forEach(button => {

        button.addEventListener("click", () => {

            showShareMessage();

        });

    });


    function showShareMessage() {

        const oldMessage =
            document.querySelector(".share-message");

        if (oldMessage) {
            oldMessage.remove();
        }

        const message =
            document.createElement("div");

        message.className =
            "share-message";

        message.textContent =
            "✨ Publicação compartilhada pelo reino mágico!";

        document.body.appendChild(message);

        setTimeout(() => {

            message.style.opacity = "0";
            message.style.transform =
                "translateY(20px)";

            setTimeout(() => {
                message.remove();
            }, 300);

        }, 2500);
    }


    /* ==================================================
       MODO NOTURNO
    ================================================== */

    const themeButton =
        document.getElementById("themeBtn");

    if (themeButton) {

        themeButton.addEventListener("click", () => {

            document.body.classList.toggle("night-mode");

            const nightMode =
                document.body.classList.contains("night-mode");

            if (nightMode) {

                themeButton.textContent =
                    "☀️ Modo Claro";

            } else {

                themeButton.textContent =
                    "🌙 Modo Noturno";
            }

            localStorage.setItem(
                "centopiaNightMode",
                nightMode
            );
        });


        const savedTheme =
            localStorage.getItem(
                "centopiaNightMode"
            );

        if (savedTheme === "true") {

            document.body.classList.add("night-mode");

            themeButton.textContent =
                "☀️ Modo Claro";
        }
    }


    /* ==================================================
       MINI JOGO - CAÇA ÀS ESTRELAS
    ================================================== */

    const gameArea =
        document.getElementById("gameArea");

    const scoreElement =
        document.getElementById("score");

    const timeElement =
        document.getElementById("time");

    const startGameButton =
        document.getElementById("startGame");

    const restartGameButton =
        document.getElementById("restartGame");

    const gameMessage =
        document.getElementById("gameMessage");

    let score = 0;
    let timeLeft = 20;

    let gameRunning = false;
    let timer = null;
    let starTimer = null;


    function updateGameInfo() {

        scoreElement.textContent =
            score;

        timeElement.textContent =
            timeLeft;
    }


    function createGameStar() {

        if (!gameRunning || !gameArea) {
            return;
        }

        const star =
            document.createElement("button");

        star.className =
            "game-star";

        star.textContent =
            "✨";

        const areaWidth =
            gameArea.clientWidth;

        const areaHeight =
            gameArea.clientHeight;

        const x =
            Math.random() *
            Math.max(areaWidth - 50, 10);

        const y =
            Math.random() *
            Math.max(areaHeight - 50, 10);

        star.style.left =
            x + "px";

        star.style.top =
            y + "px";

        star.addEventListener("click", () => {

            score++;

            updateGameInfo();

            star.remove();

            createGameStar();
        });

        gameArea.appendChild(star);

        setTimeout(() => {

            if (star.isConnected) {
                star.remove();
            }

        }, 1500);
    }


    function startGame() {

        if (gameRunning) return;

        score = 0;
        timeLeft = 20;

        gameRunning = true;

        updateGameInfo();

        gameMessage.style.display =
            "none";

        gameArea
            .querySelectorAll(".game-star")
            .forEach(star => star.remove());

        createGameStar();

        starTimer =
            setInterval(() => {

                createGameStar();

            }, 900);

        timer =
            setInterval(() => {

                timeLeft--;

                updateGameInfo();

                if (timeLeft <= 0) {

                    endGame();
                }

            }, 1000);
    }


    function endGame() {

        gameRunning = false;

        clearInterval(timer);
        clearInterval(starTimer);

        timer = null;
        starTimer = null;

        gameArea
            .querySelectorAll(".game-star")
            .forEach(star => star.remove());

        gameMessage.style.display =
            "grid";

        gameMessage.innerHTML =
            `🌟 Tempo encerrado!<br>
             Você encontrou <strong>${score}</strong> estrela(s)! ✨`;
    }


    function restartGame() {

        clearInterval(timer);
        clearInterval(starTimer);

        timer = null;
        starTimer = null;

        gameRunning = false;

        score = 0;
        timeLeft = 20;

        updateGameInfo();

        gameArea
            .querySelectorAll(".game-star")
            .forEach(star => star.remove());

        gameMessage.style.display =
            "grid";

        gameMessage.textContent =
            'Clique em "Começar" para iniciar!';
    }


    if (startGameButton) {

        startGameButton.addEventListener(
            "click",
            startGame
        );
    }


    if (restartGameButton) {

        restartGameButton.addEventListener(
            "click",
            restartGame
        );
    }


    updateGameInfo();


    /* ==================================================
       ANIMAÇÃO DE ENTRADA DOS CARDS
    ================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".post-card, .unicorn-card, .location-card, .curiosity-card, .gallery-card"
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
                threshold: 0.1
            }
        );


    animatedElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(element);
    });


    /* ==================================================
       EFEITO SUAVE NO HERO
    ================================================== */

    window.addEventListener("scroll", () => {

        const hero =
            document.querySelector(".hero");

        if (!hero) return;

        const scroll =
            window.scrollY;

        if (scroll < hero.offsetHeight) {

            hero.style.backgroundPosition =
                `center ${scroll * 0.2}px`;
        }
    });

});
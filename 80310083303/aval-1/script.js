const player = document.getElementById("player");
const star = document.getElementById("star");

const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");

const startButton = document.getElementById("startButton");
const message = document.getElementById("message");

const gameArea = document.getElementById("gameArea");

let playerX = 50;
let playerY = 50;

let score = 0;
let time = 30;

let playing = false;
let timer;

const speed = 4;

// Iniciar jogo
startButton.addEventListener("click", startGame);

function startGame() {

    score = 0;
        time = 30;

            playerX = 50;
                playerY = 50;

                    scoreText.textContent = score;
                        timeText.textContent = time;

                            playing = true;

                                startButton.textContent = "Reiniciar";

                                    message.textContent = "Pegue o máximo de estrelas que conseguir! ⭐";

                                        movePlayer();

                                            moveStar();

                                                clearInterval(timer);

                                                    timer = setInterval(() => {

                                                            time--;

                                                                    timeText.textContent = time;

                                                                            if (time <= 0) {
                                                                                        endGame();
                                                                                                }

                                                                                                    }, 1000);
                                                                                                    }


                                                                                                    // Controlar personagem
                                                                                                    document.addEventListener("keydown", function(event) {

                                                                                                        if (!playing) return;

                                                                                                            if (event.key === "ArrowUp") {
                                                                                                                    playerY -= speed;
                                                                                                                        }

                                                                                                                            if (event.key === "ArrowDown") {
                                                                                                                                    playerY += speed;
                                                                                                                                        }

                                                                                                                                            if (event.key === "ArrowLeft") {
                                                                                                                                                    playerX -= speed;
                                                                                                                                                        }

                                                                                                                                                            if (event.key === "ArrowRight") {
                                                                                                                                                                    playerX += speed;
                                                                                                                                                                        }

                                                                                                                                                                            // Limites da tela
                                                                                                                                                                                playerX = Math.max(5, Math.min(95, playerX));
                                                                                                                                                                                    playerY = Math.max(5, Math.min(95, playerY));

                                                                                                                                                                                        movePlayer();

                                                                                                                                                                                            checkCollision();
                                                                                                                                                                                            });


                                                                                                                                                                                            // Movimentar jogador
                                                                                                                                                                                            function movePlayer() {

                                                                                                                                                                                                player.style.left = playerX + "%";
                                                                                                                                                                                                    player.style.top = playerY + "%";
                                                                                                                                                                                                    }


                                                                                                                                                                                                    // Criar estrela em posição aleatória
                                                                                                                                                                                                    function moveStar() {

                                                                                                                                                                                                        const x = Math.random() * 90 + 5;
                                                                                                                                                                                                            const y = Math.random() * 85 + 5;

                                                                                                                                                                                                                star.style.left = x + "%";
                                                                                                                                                                                                                    star.style.top = y + "%";
                                                                                                                                                                                                                    }


                                                                                                                                                                                                                    // Verificar se pegou a estrela
                                                                                                                                                                                                                    function checkCollision() {

                                                                                                                                                                                                                        const playerRect = player.getBoundingClientRect();
                                                                                                                                                                                                                            const starRect = star.getBoundingClientRect();

                                                                                                                                                                                                                                if (
                                                                                                                                                                                                                                        playerRect.left < starRect.right &&
                                                                                                                                                                                                                                                playerRect.right > starRect.left &&
                                                                                                                                                                                                                                                        playerRect.top < starRect.bottom &&
                                                                                                                                                                                                                                                                playerRect.bottom > starRect.top
                                                                                                                                                                                                                                                                    ) {

                                                                                                                                                                                                                                                                            score++;

                                                                                                                                                                                                                                                                                    scoreText.textContent = score;

                                                                                                                                                                                                                                                                                            moveStar();
                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                }


                                                                                                                                                                                                                                                                                                // Finalizar jogo
                                                                                                                                                                                                                                                                                                function endGame() {

                                                                                                                                                                                                                                                                                                    playing = false;

                                                                                                                                                                                                                                                                                                        clearInterval(timer);

                                                                                                                                                                                                                                                                                                            message.textContent =
                                                                                                                                                                                                                                                                                                                    "🎉 Fim de jogo! Você fez " + score + " pontos!";

                                                                                                                                                                                                                                                                                                                        startButton.textContent = "Jogar Novamente";
                                                                                                                                                                                                                                                                                                                        }
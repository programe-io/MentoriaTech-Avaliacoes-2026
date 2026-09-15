const target = document.getElementById("target");
const gameArea = document.getElementById("gameArea");

const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");

const startButton = document.getElementById("startButton");
const message = document.getElementById("message");

let score = 0;
let time = 30;
let playing = false;
let timer;

// Começar o jogo
startButton.addEventListener("click", startGame);

function startGame() {

    score = 0;
        time = 30;
            playing = true;

                scoreText.textContent = score;
                    timeText.textContent = time;

                        message.textContent = "Clique no 🎯 o mais rápido que puder!";

                            startButton.textContent = "Reiniciar";

                                target.style.display = "flex";

                                    moveTarget();

                                        clearInterval(timer);

                                            timer = setInterval(() => {

                                                    time--;

                                                            timeText.textContent = time;

                                                                    if (time <= 0) {
                                                                                endGame();
                                                                                        }

                                                                                            }, 1000);
                                                                                            }


                                                                                            // Clicar no alvo
                                                                                            target.addEventListener("click", () => {

                                                                                                if (!playing) return;

                                                                                                    score++;

                                                                                                        scoreText.textContent = score;

                                                                                                            moveTarget();
                                                                                                            });


                                                                                                            // Mover o alvo
                                                                                                            function moveTarget() {

                                                                                                                const areaWidth = gameArea.clientWidth;
                                                                                                                    const areaHeight = gameArea.clientHeight;

                                                                                                                        const targetWidth = target.offsetWidth;
                                                                                                                            const targetHeight = target.offsetHeight;

                                                                                                                                const maxX = areaWidth - targetWidth;
                                                                                                                                    const maxY = areaHeight - targetHeight;

                                                                                                                                        const x = Math.random() * maxX;
                                                                                                                                            const y = Math.random() * maxY;

                                                                                                                                                target.style.left = x + "px";
                                                                                                                                                    target.style.top = y + "px";
                                                                                                                                                    }


                                                                                                                                                    // Finalizar jogo
                                                                                                                                                    function endGame() {

                                                                                                                                                        playing = false;

                                                                                                                                                            clearInterval(timer);

                                                                                                                                                                target.style.display = "none";

                                                                                                                                                                    message.textContent =
                                                                                                                                                                            `🏆 Fim de jogo! Você fez ${score} pontos!`;

                                                                                                                                                                                startButton.textContent = "Jogar Novamente";
                                                                                                                                                                                }
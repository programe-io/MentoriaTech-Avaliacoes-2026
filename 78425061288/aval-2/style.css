const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreText = document.getElementById("score");
const gameOver = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

let playerX = 150;
let score = 0;
let speed = 5;
let playing = true;

let enemies = [];

function moveLeft() {
    if (!playing) return;

        playerX -= 45;

            if (playerX < 0) {
                    playerX = 0;
                        }

                            player.style.left = playerX + "px";
                            }

                            function moveRight() {
                                if (!playing) return;

                                    playerX += 45;

                                        if (playerX > 297) {
                                                playerX = 297;
                                                    }

                                                        player.style.left = playerX + "px";
                                                        }

                                                        document.addEventListener("keydown", function(e) {

                                                            if (e.key === "ArrowLeft" || e.key === "a") {
                                                                    moveLeft();
                                                                        }

                                                                            if (e.key === "ArrowRight" || e.key === "d") {
                                                                                    moveRight();
                                                                                        }

                                                                                        });

                                                                                        function createEnemy() {

                                                                                            if (!playing) return;

                                                                                                const enemy = document.createElement("div");

                                                                                                    enemy.classList.add("enemy");

                                                                                                        let x = Math.floor(Math.random() * 6) * 50;

                                                                                                            enemy.style.left = x + "px";
                                                                                                                enemy.style.top = "-100px";

                                                                                                                    game.appendChild(enemy);

                                                                                                                        enemies.push(enemy);
                                                                                                                        }

                                                                                                                        function collision(a, b) {

                                                                                                                            const r1 = a.getBoundingClientRect();
                                                                                                                                const r2 = b.getBoundingClientRect();

                                                                                                                                    return !(
                                                                                                                                            r1.bottom < r2.top ||
                                                                                                                                                    r1.top > r2.bottom ||
                                                                                                                                                            r1.right < r2.left ||
                                                                                                                                                                    r1.left > r2.right
                                                                                                                                                                        );
                                                                                                                                                                        }

                                                                                                                                                                        function gameLoop() {

                                                                                                                                                                            if (!playing) return;

                                                                                                                                                                                document.querySelectorAll(".line").forEach(line => {

                                                                                                                                                                                        let top = parseInt(line.style.top);

                                                                                                                                                                                                top += speed;

                                                                                                                                                                                                        if (top > 600) {
                                                                                                                                                                                                                    top = -80;
                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                    line.style.top = top + "px";

                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                            enemies.forEach((enemy, index) => {

                                                                                                                                                                                                                                                    let top = parseInt(enemy.style.top);

                                                                                                                                                                                                                                                            top += speed;

                                                                                                                                                                                                                                                                    enemy.style.top = top + "px";

                                                                                                                                                                                                                                                                            if (collision(player, enemy)) {
                                                                                                                                                                                                                                                                                        endGame();
                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                        if (top > 650) {

                                                                                                                                                                                                                                                                                                                    enemy.remove();

                                                                                                                                                                                                                                                                                                                                enemies.splice(index, 1);

                                                                                                                                                                                                                                                                                                                                            score++;

                                                                                                                                                                                                                                                                                                                                                        scoreText.textContent =
                                                                                                                                                                                                                                                                                                                                                                        "Pontos: " + score;

                                                                                                                                                                                                                                                                                                                                                                                    if (score % 5 === 0) {
                                                                                                                                                                                                                                                                                                                                                                                                    speed++;
                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                                                                                                                                requestAnimationFrame(gameLoop);
                                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                                function endGame() {

                                                                                                                                                                                                                                                                                                                                                                                                                                    playing = false;

                                                                                                                                                                                                                                                                                                                                                                                                                                        finalScore.textContent =
                                                                                                                                                                                                                                                                                                                                                                                                                                                "Você fez " + score + " pontos!";

                                                                                                                                                                                                                                                                                                                                                                                                                                                    gameOver.style.display = "flex";
                                                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                                                    function restart() {

                                                                                                                                                                                                                                                                                                                                                                                                                                                        enemies.forEach(enemy => enemy.remove());

                                                                                                                                                                                                                                                                                                                                                                                                                                                            enemies = [];

                                                                                                                                                                                                                                                                                                                                                                                                                                                                score = 0;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    speed = 5;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        playerX = 150;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            playing = true;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                player.style.left = playerX + "px";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    scoreText.textContent = "Pontos: 0";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        gameOver.style.display = "none";

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            gameLoop();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            setInterval(createEnemy, 1000);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            gameLoop();
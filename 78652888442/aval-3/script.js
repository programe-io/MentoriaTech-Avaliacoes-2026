const road = document.getElementById("road");
const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const scoreText = document.getElementById("score");
const speedText = document.getElementById("speed");
const message = document.getElementById("message");
const startButton = document.getElementById("start");

let lane = 1;
let enemyLane = 1;
let enemyY = -80;
let score = 0;
let speed = 1;
let playing = false;
let animation;
let lastTime = 0;

function updatePlayer() {
  const laneWidth = road.clientWidth / 3;
    player.style.left =
        laneWidth * lane + laneWidth / 2 - player.offsetWidth / 2 + "px";
        }

        function moveLeft() {
          if (playing && lane > 0) {
              lane--;
                  updatePlayer();
                    }
                    }

                    function moveRight() {
                      if (playing && lane < 2) {
                          lane++;
                              updatePlayer();
                                }
                                }

                                document.getElementById("left").addEventListener("pointerdown", moveLeft);
                                document.getElementById("right").addEventListener("pointerdown", moveRight);

                                document.addEventListener("keydown", function(event) {
                                  if (event.key === "ArrowLeft" || event.key === "a") {
                                      moveLeft();
                                        }

                                          if (event.key === "ArrowRight" || event.key === "d") {
                                              moveRight();
                                                }
                                                });

                                                function startGame() {
                                                  cancelAnimationFrame(animation);

                                                    lane = 1;
                                                      enemyLane = Math.floor(Math.random() * 3);
                                                        enemyY = -80;
                                                          score = 0;
                                                            speed = 1;
                                                              playing = true;
                                                                lastTime = 0;

                                                                  scoreText.textContent = score;
                                                                    speedText.textContent = speed;
                                                                      enemy.textContent = "🏍️";
                                                                        enemy.style.top = enemyY + "px";

                                                                          updatePlayer();

                                                                            enemy.style.left =
                                                                                (road.clientWidth / 3) * enemyLane +
                                                                                    road.clientWidth / 6 -
                                                                                        enemy.offsetWidth / 2 + "px";

                                                                                          message.style.display = "none";

                                                                                            animation = requestAnimationFrame(gameLoop);
                                                                                            }

                                                                                            function gameLoop(timestamp) {
                                                                                              if (!playing) return;

                                                                                                if (!lastTime) lastTime = timestamp;

                                                                                                  const delta = Math.min((timestamp - lastTime) / 16.67, 3);
                                                                                                    lastTime = timestamp;

                                                                                                      enemyY += (4 + speed * 1.3) * delta;

                                                                                                        enemy.style.top = enemyY + "px";

                                                                                                          const playerTop = player.offsetTop;
                                                                                                            const playerBottom = playerTop + player.offsetHeight;
                                                                                                              const enemyTop = enemy.offsetTop;
                                                                                                                const enemyBottom = enemyTop + enemy.offsetHeight;

                                                                                                                  const collision =
                                                                                                                      lane === enemyLane &&
                                                                                                                          playerBottom > enemyTop + 12 &&
                                                                                                                              playerTop < enemyBottom - 12;

                                                                                                                                if (collision) {
                                                                                                                                    gameOver();
                                                                                                                                        return;
                                                                                                                                          }

                                                                                                                                            if (enemyY > road.clientHeight) {
                                                                                                                                                score += 10;
                                                                                                                                                    speed = 1 + Math.floor(score / 100);

                                                                                                                                                        scoreText.textContent = score;
                                                                                                                                                            speedText.textContent = speed;

                                                                                                                                                                enemyY = -80;
                                                                                                                                                                    enemyLane = Math.floor(Math.random() * 3);

                                                                                                                                                                        enemy.style.left =
                                                                                                                                                                              (road.clientWidth / 3) * enemyLane +
                                                                                                                                                                                    road.clientWidth / 6 -
                                                                                                                                                                                          enemy.offsetWidth / 2 + "px";
                                                                                                                                                                                            }

                                                                                                                                                                                              animation = requestAnimationFrame(gameLoop);
                                                                                                                                                                                              }

                                                                                                                                                                                              function gameOver() {
                                                                                                                                                                                                playing = false;
                                                                                                                                                                                                  cancelAnimationFrame(animation);

                                                                                                                                                                                                    message.innerHTML = `
                                                                                                                                                                                                        <h1>💥 FIM DE JOGO!</h1>
                                                                                                                                                                                                            <p>Sua pontuação: <b>${score}</b></p>
                                                                                                                                                                                                                <button id="restart">JOGAR NOVAMENTE</button>
                                                                                                                                                                                                                  `;

                                                                                                                                                                                                                    message.style.display = "block";

                                                                                                                                                                                                                      document.getElementById("restart").addEventListener(
                                                                                                                                                                                                                          "click",
                                                                                                                                                                                                                              startGame
                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                startButton.addEventListener("click", startGame);

                                                                                                                                                                                                                                window.addEventListener("resize", updatePlayer);

                                                                                                                                                                                                                                updatePlayer();
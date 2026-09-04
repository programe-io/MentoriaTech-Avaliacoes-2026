const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreElement = document.getElementById("score");
const finalScore = document.getElementById("finalScore");

let playerX;
let score = 0;
let speed = 5;
let gameRunning = false;
let enemies = [];
let roadLines = [];
let enemyTimer;

const keys = {
  ArrowLeft: false,
    ArrowRight: false
    };

    // Criar as linhas da estrada
    function createRoad() {
      roadLines.forEach(line => line.remove());
        roadLines = [];

          for (let i = 0; i < 8; i++) {
              const line = document.createElement("div");

                  line.className = "road-line";
                      line.style.top = `${i * 100 - 80}px`;

                          game.appendChild(line);
                              roadLines.push(line);
                                }
                                }

                                // Criar carro inimigo
                                function createEnemy() {
                                  const enemy = document.createElement("div");

                                    enemy.className = "enemy";

                                      const colors = [
                                          "#457b9d",
                                              "#f4a261",
                                                  "#2a9d8f",
                                                      "#8338ec",
                                                          "#ff006e"
                                                            ];

                                                              const lanes = [70, 180, 290];

                                                                const randomColor =
                                                                    colors[Math.floor(Math.random() * colors.length)];

                                                                      const randomLane =
                                                                          lanes[Math.floor(Math.random() * lanes.length)];

                                                                            enemy.style.background = randomColor;
                                                                              enemy.style.left = randomLane + "px";
                                                                                enemy.style.top = "-120px";

                                                                                  game.appendChild(enemy);
                                                                                    enemies.push(enemy);
                                                                                    }

                                                                                    // Detectar colisão
                                                                                    function checkCollision(a, b) {
                                                                                      const rectA = a.getBoundingClientRect();
                                                                                        const rectB = b.getBoundingClientRect();

                                                                                          return (
                                                                                              rectA.left < rectB.right &&
                                                                                                  rectA.right > rectB.left &&
                                                                                                      rectA.top < rectB.bottom &&
                                                                                                          rectA.bottom > rectB.top
                                                                                                            );
                                                                                                            }

                                                                                                            // Atualizar o jogo
                                                                                                            function updateGame() {
                                                                                                              if (!gameRunning) return;

                                                                                                                // Controle do jogador
                                                                                                                  if (keys.ArrowLeft) {
                                                                                                                      playerX -= 7;
                                                                                                                        }

                                                                                                                          if (keys.ArrowRight) {
                                                                                                                              playerX += 7;
                                                                                                                                }

                                                                                                                                  // Limites da pista
                                                                                                                                    const maxX = game.clientWidth - player.offsetWidth - 10;

                                                                                                                                      if (playerX < 10) {
                                                                                                                                          playerX = 10;
                                                                                                                                            }

                                                                                                                                              if (playerX > maxX) {
                                                                                                                                                  playerX = maxX;
                                                                                                                                                    }

                                                                                                                                                      player.style.left = playerX + "px";

                                                                                                                                                        // Movimento das linhas
                                                                                                                                                          roadLines.forEach(line => {
                                                                                                                                                              let top = parseInt(line.style.top);

                                                                                                                                                                  top += speed;

                                                                                                                                                                      if (top > game.clientHeight) {
                                                                                                                                                                            top = -80;
                                                                                                                                                                                }

                                                                                                                                                                                    line.style.top = top + "px";
                                                                                                                                                                                      });

                                                                                                                                                                                        // Movimento dos carros inimigos
                                                                                                                                                                                          enemies.forEach((enemy, index) => {
                                                                                                                                                                                              let top = parseInt(enemy.style.top);

                                                                                                                                                                                                  top += speed;

                                                                                                                                                                                                      enemy.style.top = top + "px";

                                                                                                                                                                                                          // Se o carro sair da tela
                                                                                                                                                                                                              if (top > game.clientHeight) {
                                                                                                                                                                                                                    enemy.remove();
                                                                                                                                                                                                                          enemies.splice(index, 1);

                                                                                                                                                                                                                                score++;
                                                                                                                                                                                                                                      scoreElement.textContent = score;

                                                                                                                                                                                                                                            // Aumentar dificuldade
                                                                                                                                                                                                                                                  if (score % 10 === 0) {
                                                                                                                                                                                                                                                          speed += 0.7;
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                        // Verificar colisão
                                                                                                                                                                                                                                                                            if (checkCollision(player, enemy)) {
                                                                                                                                                                                                                                                                                  endGame();
                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                          requestAnimationFrame(updateGame);
                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                          // Teclas
                                                                                                                                                                                                                                                                                          document.addEventListener("keydown", event => {
                                                                                                                                                                                                                                                                                            if (
                                                                                                                                                                                                                                                                                                event.key === "ArrowLeft" ||
                                                                                                                                                                                                                                                                                                    event.key === "ArrowRight"
                                                                                                                                                                                                                                                                                                      ) {
                                                                                                                                                                                                                                                                                                          keys[event.key] = true;
                                                                                                                                                                                                                                                                                                              event.preventDefault();
                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                document.addEventListener("keyup", event => {
                                                                                                                                                                                                                                                                                                                  if (
                                                                                                                                                                                                                                                                                                                      event.key === "ArrowLeft" ||
                                                                                                                                                                                                                                                                                                                          event.key === "ArrowRight"
                                                                                                                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                                                                                                                keys[event.key] = false;
                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                                                                                                  // Iniciar o jogo
                                                                                                                                                                                                                                                                                                                                  function startGame() {
                                                                                                                                                                                                                                                                                                                                    // Limpar carros antigos
                                                                                                                                                                                                                                                                                                                                      enemies.forEach(enemy => enemy.remove());
                                                                                                                                                                                                                                                                                                                                        enemies = [];

                                                                                                                                                                                                                                                                                                                                          // Resetar pontuação
                                                                                                                                                                                                                                                                                                                                            score = 0;
                                                                                                                                                                                                                                                                                                                                              speed = 5;

                                                                                                                                                                                                                                                                                                                                                scoreElement.textContent = score;

                                                                                                                                                                                                                                                                                                                                                  // Esconder telas
                                                                                                                                                                                                                                                                                                                                                    document.getElementById("startScreen").style.display = "none";
                                                                                                                                                                                                                                                                                                                                                      document.getElementById("gameOver").style.display = "none";

                                                                                                                                                                                                                                                                                                                                                        // Posicionar jogador
                                                                                                                                                                                                                                                                                                                                                          playerX =
                                                                                                                                                                                                                                                                                                                                                              game.clientWidth / 2 -
                                                                                                                                                                                                                                                                                                                                                                  player.offsetWidth / 2;

                                                                                                                                                                                                                                                                                                                                                                    player.style.left = playerX + "px";

                                                                                                                                                                                                                                                                                                                                                                      // Criar estrada
                                                                                                                                                                                                                                                                                                                                                                        createRoad();

                                                                                                                                                                                                                                                                                                                                                                          gameRunning = true;

                                                                                                                                                                                                                                                                                                                                                                            // Criar inimigos
                                                                                                                                                                                                                                                                                                                                                                              clearInterval(enemyTimer);

                                                                                                                                                                                                                                                                                                                                                                                enemyTimer = setInterval(() => {
                                                                                                                                                                                                                                                                                                                                                                                    if (gameRunning) {
                                                                                                                                                                                                                                                                                                                                                                                          createEnemy();
                                                                                                                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                                                                                                                                }, 1200);

                                                                                                                                                                                                                                                                                                                                                                                                  updateGame();
                                                                                                                                                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                                                                                                                                                  // Encerrar jogo
                                                                                                                                                                                                                                                                                                                                                                                                  function endGame() {
                                                                                                                                                                                                                                                                                                                                                                                                    gameRunning = false;

                                                                                                                                                                                                                                                                                                                                                                                                      clearInterval(enemyTimer);

                                                                                                                                                                                                                                                                                                                                                                                                        finalScore.textContent = score;

                                                                                                                                                                                                                                                                                                                                                                                                          document.getElementById("gameOver").style.display = "flex";
                                                                                                                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                                                                                                                          // Preparar estrada
                                                                                                                                                                                                                                                                                                                                                                                                          createRoad();
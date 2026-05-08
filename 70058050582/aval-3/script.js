const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Jogador
let player = {
  x: 50,
    y: 180,
      width: 30,
        height: 30,
          color: "cyan",
            dy: 0
            };

            let gravity = 0.6;
            let obstacles = [];
            let score = 0;

            // Controle
            document.addEventListener("keydown", (e) => {
              if (e.code === "Space") {
                  player.dy = -10;
                    }
                    });

                    // Criar obstáculos
                    function criarObstaculo() {
                      let height = Math.random() * 200 + 50;

                        obstacles.push({
                            x: canvas.width,
                                y: canvas.height - height,
                                    width: 30,
                                        height: height,
                                            color: "red"
                                              });
                                              }

                                              // Atualizar jogo
                                              function update() {
                                                player.dy += gravity;
                                                  player.y += player.dy;

                                                    // Limite chão
                                                      if (player.y + player.height > canvas.height) {
                                                          player.y = canvas.height - player.height;
                                                              player.dy = 0;
                                                                }

                                                                  // Obstáculos
                                                                    for (let i = 0; i < obstacles.length; i++) {
                                                                        obstacles[i].x -= 4;

                                                                            // Colisão
                                                                                if (
                                                                                      player.x < obstacles[i].x + obstacles[i].width &&
                                                                                            player.x + player.width > obstacles[i].x &&
                                                                                                  player.y < obstacles[i].y + obstacles[i].height &&
                                                                                                        player.y + player.height > obstacles[i].y
                                                                                                            ) {
                                                                                                                  alert("Game Over! Pontuação: " + score);
                                                                                                                        document.location.reload();
                                                                                                                            }
                                                                                                                              }

                                                                                                                                // Remover obstáculos
                                                                                                                                  obstacles = obstacles.filter(o => o.x > -50);

                                                                                                                                    score++;
                                                                                                                                    }

                                                                                                                                    // Desenhar
                                                                                                                                    function draw() {
                                                                                                                                      ctx.clearRect(0, 0, canvas.width, canvas.height);

                                                                                                                                        // Jogador
                                                                                                                                          ctx.fillStyle = player.color;
                                                                                                                                            ctx.fillRect(player.x, player.y, player.width, player.height);

                                                                                                                                              // Obstáculos
                                                                                                                                                obstacles.forEach(o => {
                                                                                                                                                    ctx.fillStyle = o.color;
                                                                                                                                                        ctx.fillRect(o.x, o.y, o.width, o.height);
                                                                                                                                                          });

                                                                                                                                                            // Pontuação
                                                                                                                                                              ctx.fillStyle = "white";
                                                                                                                                                                ctx.font = "20px Arial";
                                                                                                                                                                  ctx.fillText("Score: " + score, 10, 25);
                                                                                                                                                                  }

                                                                                                                                                                  // Loop
                                                                                                                                                                  function gameLoop() {
                                                                                                                                                                    update();
                                                                                                                                                                      draw();
                                                                                                                                                                        requestAnimationFrame(gameLoop);
                                                                                                                                                                        }

                                                                                                                                                                        // Gerar obstáculos
                                                                                                                                                                        setInterval(criarObstaculo, 1500);

                                                                                                                                                                        // Iniciar
                                                                                                                                                                        gameLoop();
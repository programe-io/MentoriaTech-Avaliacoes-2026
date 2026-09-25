let playerPos = 25; // Posição X do carro do jogador (25px para a pista esquerda, 125px para a direita)
let enemyPos = 25;
let enemyY = -60;
let score = 0;
let gameSpeed = 4;
let gameOver = false;

const player = document.getElementById('player');
const enemy = document.getElementById('enemy');
const scoreDisplay = document.getElementById('score');

function moveLeft() {
  if (gameOver) return;
    playerPos = 25;
      player.style.left = playerPos + 'px';
      }

      function moveRight() {
        if (gameOver) return;
          playerPos = 125;
            player.style.left = playerPos + 'px';
            }

            // Controlo por teclado (setas)
            document.addEventListener('keydown', (e) => {
              if (e.key === 'ArrowLeft') moveLeft();
                if (e.key === 'ArrowRight') moveRight();
                });

                // Loop principal do jogo
                function updateGame() {
                  if (gameOver) return;

                    // Move o inimigo para baixo
                      enemyY += gameSpeed;
                        enemy.style.top = enemyY + 'px';

                          // Quando o inimigo sai da tela, volta ao topo numa pista aleatória
                            if (enemyY > 350) {
                                enemyY = -60;
                                    enemyPos = Math.random() < 0.5 ? 25 : 125;
                                        enemy.style.left = enemyPos + 'px';
                                            score += 10;
                                                scoreDisplay.innerText = score;
                                                    gameSpeed += 0.2; // Aumenta a velocidade progressivamente
                                                      }

                                                        // Deteta colisão
                                                          if (enemyY > 250 && enemyY < 330 && playerPos === enemyPos) {
                                                              gameOver = true;
                                                                  alert('Fim de Jogo! A sua pontuação foi: ' + score);
                                                                      location.reload(); // Recarrega para reiniciar
                                                                        }

                                                                          requestAnimationFrame(updateGame);
                                                                          }

                                                                          // Inicia o jogo
                                                                          updateGame();
                                                                          
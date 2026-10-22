let score = 0;
let time = 30;
let playing = false;
let timer;

const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const message = document.getElementById("message");
const treasure = document.getElementById("treasure");
const ocean = document.getElementById("ocean");

function moveTreasure() {
  const maxX = ocean.clientWidth - treasure.offsetWidth;
    const maxY = ocean.clientHeight - treasure.offsetHeight;

      treasure.style.left = Math.random() * maxX + "px";
        treasure.style.top = Math.random() * maxY + "px";

          const items = ["🪙", "💎", "⭐", "🐚", "🏆"];
            treasure.textContent =
                items[Math.floor(Math.random() * items.length)];
                }

                function startGame() {
                  clearInterval(timer);

                    score = 0;
                      time = 30;
                        playing = true;

                          scoreText.textContent = score;
                            timeText.textContent = time;
                              message.textContent = "A aventura começou! Colete os tesouros!";
                                treasure.style.display = "block";

                                  moveTreasure();

                                    timer = setInterval(() => {
                                        time--;
                                            timeText.textContent = time;

                                                if (time <= 0) {
                                                      clearInterval(timer);
                                                            playing = false;
                                                                  treasure.style.display = "none";
                                                                        message.textContent =
                                                                                `Fim da aventura! Você fez ${score} pontos! 🌟`;
                                                                                    }
                                                                                      }, 1000);
                                                                                      }

                                                                                      treasure.addEventListener("click", () => {
                                                                                        if (!playing) return;

                                                                                          score += 10;
                                                                                            scoreText.textContent = score;
                                                                                              message.textContent = "Tesouro encontrado! +10 pontos 💎";

                                                                                                moveTreasure();
                                                                                                });

                                                                                                document.getElementById("start").addEventListener("click", startGame);
                                                                                                document.getElementById("restart").addEventListener("click", startGame);

                                                                                                treasure.style.display = "none";
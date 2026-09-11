const tracks = document.querySelectorAll(".track");
const playerName = document.getElementById("playerName");
const progressBar = document.getElementById("progressBar");
const trackTime = document.getElementById("trackTime");
const playPause = document.getElementById("playPause");
const stop = document.getElementById("stop");
const status = document.getElementById("status");
const glitchBtn = document.getElementById("glitchBtn");
const alertBox = document.getElementById("alert");

let selected = null;
let playing = false;
let seconds = 0;
let timer = null;

tracks.forEach(track => {
  track.addEventListener("click", () => {
      tracks.forEach(t => t.classList.remove("active"));
          track.classList.add("active");

              selected = track.querySelector("strong").textContent;
                  playerName.textContent = selected;
                      seconds = 0;
                          progressBar.style.width = "0%";
                              trackTime.textContent = "00:00";
                                  status.textContent = "TRACK READY";

                                      if (playing) startTimer();
                                        });
                                        });

                                        function startTimer() {
                                          clearInterval(timer);
                                            playing = true;
                                              playPause.textContent = "❚❚ PAUSE";
                                                status.textContent = "PLAYING // SIMULATION";

                                                  timer = setInterval(() => {
                                                      seconds++;
                                                          const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
                                                              const secs = String(seconds % 60).padStart(2, "0");
                                                                  trackTime.textContent = `${mins}:${secs}`;
                                                                      progressBar.style.width = `${(seconds % 100)}%`;

                                                                          if (seconds >= 100) {
                                                                                seconds = 0;
                                                                                    }
                                                                                      }, 1000);
                                                                                      }

                                                                                      playPause.addEventListener("click", () => {
                                                                                        if (!selected) {
                                                                                            playerName.textContent = "SELECIONE UMA FAIXA PRIMEIRO";
                                                                                                status.textContent = "ERROR // NO TRACK";
                                                                                                    return;
                                                                                                      }

                                                                                                        if (playing) {
                                                                                                            clearInterval(timer);
                                                                                                                playing = false;
                                                                                                                    playPause.textContent = "▶ PLAY";
                                                                                                                        status.textContent = "PAUSED";
                                                                                                                          } else {
                                                                                                                              startTimer();
                                                                                                                                }
                                                                                                                                });

                                                                                                                                stop.addEventListener("click", () => {
                                                                                                                                  clearInterval(timer);
                                                                                                                                    playing = false;
                                                                                                                                      seconds = 0;
                                                                                                                                        progressBar.style.width = "0%";
                                                                                                                                          trackTime.textContent = "00:00";
                                                                                                                                            playPause.textContent = "▶ PLAY";
                                                                                                                                              status.textContent = "SYSTEM IDLE";
                                                                                                                                              });

                                                                                                                                              glitchBtn.addEventListener("click", () => {
                                                                                                                                                document.body.classList.toggle("extreme");
                                                                                                                                                  alertBox.classList.remove("show");
                                                                                                                                                    void alertBox.offsetWidth;
                                                                                                                                                      alertBox.classList.add("show");
                                                                                                                                                        glitchBtn.textContent = document.body.classList.contains("extreme")
                                                                                                                                                            ? "NORMAL"
                                                                                                                                                                : "GLITCH";
                                                                                                                                                                });

                                                                                                                                                                document.addEventListener("mousemove", (event) => {
                                                                                                                                                                  const x = (event.clientX / window.innerWidth - 0.5) * 8;
                                                                                                                                                                    const y = (event.clientY / window.innerHeight - 0.5) * 8;
                                                                                                                                                                      const eye = document.querySelector(".eye");
                                                                                                                                                                        if (eye && !document.body.classList.contains("extreme")) {
                                                                                                                                                                            eye.style.transform = `translate(${x}px, ${y}px)`;
                                                                                                                                                                              }
                                                                                                                                                                              });

                                                                                                                                                                              function updateClock() {
                                                                                                                                                                                const now = new Date();
                                                                                                                                                                                  document.getElementById("clock").textContent =
                                                                                                                                                                                      now.toLocaleTimeString("pt-BR", { hour12: false });
                                                                                                                                                                                      }
                                                                                                                                                                                      setInterval(updateClock, 1000);
                                                                                                                                                                                      updateClock();
                                                                                                                                                                                      

const musicas = [
  {
      nome: "Música 1",
          artista: "Music Play",
              capa: "https://placehold.co/300x300/242424/ffffff?text=Music+1",
                  audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                    },
                      {
                          nome: "Música 2",
                              artista: "Music Play",
                                  capa: "https://placehold.co/300x300/402020/ffffff?text=Music+2",
                                      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
                                        }
                                        ];

                                        let atual = 0;
                                        const player = new Audio();

                                        const botaoPlay = document.querySelector(".controls");
                                        const titulo = document.querySelector(".song-info strong");
                                        const artista = document.querySelector(".song-info p");

                                        function tocar(index) {
                                          atual = index;

                                            player.src = musicas[atual].audio;
                                              titulo.textContent = musicas[atual].nome;
                                                artista.textContent = musicas[atual].artista;

                                                  player.play();
                                                    botaoPlay.textContent = "⏮️　⏸️　⏭️";
                                                    }

                                                    document.querySelectorAll(".music").forEach((card, index) => {
                                                      card.addEventListener("click", () => {
                                                          tocar(index % musicas.length);
                                                            });
                                                            });

                                                            botaoPlay.addEventListener("click", () => {
                                                              if (player.paused) {
                                                                  if (!player.src) {
                                                                        tocar(atual);
                                                                            } else {
                                                                                  player.play();
                                                                                        botaoPlay.textContent = "⏮️　⏸️　⏭️";
                                                                                            }
                                                                                              } else {
                                                                                                  player.pause();
                                                                                                      botaoPlay.textContent = "⏮️　▶️　⏭️";
                                                                                                        }
                                                                                                        });

                                                                                                        player.addEventListener("ended", () => {
                                                                                                          tocar((atual + 1) % musicas.length);
                                                                                                          });
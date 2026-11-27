// Curtir post
const botoesCurtir = document.querySelectorAll(".post-actions span:first-child");

botoesCurtir.forEach(botao => {

  botao.addEventListener("click", () => {

      if (botao.textContent === "♡") {
            botao.textContent = "❤️";
                } else {
                      botao.textContent = "♡";
                          }

                            });

                            });


                            // Botão seguir
                            const botaoSeguir = document.querySelector("button");

                            botaoSeguir.addEventListener("click", () => {

                              if (botaoSeguir.textContent === "Seguir") {

                                  botaoSeguir.textContent = "Seguindo";
                                      botaoSeguir.classList.remove("bg-blue-500");
                                          botaoSeguir.classList.add("bg-gray-400");

                                            } else {

                                                botaoSeguir.textContent = "Seguir";
                                                    botaoSeguir.classList.remove("bg-gray-400");
                                                        botaoSeguir.classList.add("bg-blue-500");

                                                          }

                                                          });


                                                          // Clique nos Stories
                                                          const stories = document.querySelectorAll(".story");

                                                          stories.forEach(story => {

                                                            story.addEventListener("click", () => {

                                                                alert("Story de livros aberto! 📚");

                                                                  });

                                                                  });
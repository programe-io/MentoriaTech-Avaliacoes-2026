function curtir(botao) {
      const post = botao.closest(".post");
        const likes = post.querySelector(".likes");
          let numero = parseInt(likes.textContent) || 0;

            if (botao.textContent === "♡") {
                botao.textContent = "♥";
                    botao.style.color = "red";
                        numero++;
                          } else {
                              botao.textContent = "♡";
                                  botao.style.color = "black";
                                      numero--;
                                        }

                                          likes.textContent = numero + " curtidas";
                                          }

                                          function comentar(botao) {
                                            const texto = prompt("Escreva seu comentário:");

                                              if (texto && texto.trim()) {
                                                  const post = botao.closest(".post");
                                                      const comentarios = post.querySelector(".comentarios");
                                                          comentarios.innerHTML += "<p>💬 " + texto.replace(/</g, "&lt;") + "</p>";
                                                            }
                                                            }

                                                            function compartilhar() {
                                                              alert("Publicação pronta para compartilhar!");
                                                              }

                                                              function criarPost() {
                                                                const legenda = prompt("Escreva a legenda da publicação:");

                                                                  if (legenda && legenda.trim()) {
                                                                      const feed = document.getElementById("feed");

                                                                          const post = document.createElement("div");
                                                                              post.className = "post";

                                                                                  const perfil = document.createElement("div");
                                                                                      perfil.className = "perfil";
                                                                                          perfil.innerHTML = "<b>meu_perfil</b>";

                                                                                              const texto = document.createElement("p");
                                                                                                  texto.textContent = "meu_perfil " + legenda;

                                                                                                      post.appendChild(perfil);
                                                                                                          post.appendChild(texto);

                                                                                                              feed.prepend(post);
                                                                                                                }
                                                                                                                }
}

function curtir(botao) {
  botao.classList.toggle("liked");

    if (botao.classList.contains("liked")) {
        botao.innerHTML = "♥";
          } else {
              botao.innerHTML = "♡";
                }
                }

                function comentar(botao) {
                  const post = botao.closest(".post");
                    const campo = post.querySelector(".comment-area input");

                      campo.focus();
                      }

                      function enviarComentario(botao) {
                        const area = botao.closest(".comment-area");
                          const campo = area.querySelector("input");
                            const texto = campo.value.trim();

                              if (texto === "") {
                                  alert("Digite um comentário primeiro!");
                                      return;
                                        }

                                          const comentario = document.createElement("p");

                                            comentario.style.marginTop = "8px";
                                              comentario.textContent = "raissavictoria: " + texto;

                                                area.before(comentario);
                                                  campo.value = "";
                                                  }

                                                  function seguir(botao) {
                                                    if (botao.innerText === "Seguir") {
                                                        botao.innerText = "Seguindo";
                                                            botao.style.background = "#cbb5ed";
                                                              } else {
                                                                  botao.innerText = "Seguir";
                                                                      botao.style.background = "#895bb8";
                                                                        }
                                                                        }
                                                                        
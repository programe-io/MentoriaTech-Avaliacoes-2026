
function curtir(botao) {
  const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

      let numero = Number(likes.dataset.numero || 120);
        let curtido = botao.dataset.curtido === "true";

          numero += curtido ? -1 : 1;

            botao.dataset.curtido = !curtido;
              botao.innerText = curtido ? "♡" : "❤️";
                likes.dataset.numero = numero;
                  likes.innerText = numero + " curtidas";
                  }

                  function comentar(botao) {
                    const post = botao.closest(".post");
                      const campo = post.querySelector(".campo-comentario");
                        const comentarios = post.querySelector(".comentarios");

                          if (!campo.value.trim()) {
                              campo.focus();
                                  return;
                                    }

                                      const novo = document.createElement("p");
                                        novo.textContent = "Você: " + campo.value;
                                          comentarios.appendChild(novo);

                                            campo.value = "";
                                            }

                                            document.querySelectorAll(".campo-comentario").forEach(campo => {
                                              campo.addEventListener("keydown", function(event) {
                                                  if (event.key === "Enter") {
                                                        const botao = this.closest(".post").querySelector(".acoes button:nth-child(2)");
                                                              comentar(botao);
                                                                  }
                                                                    });
                                                                    });

                                                                    function novaPublicacao() {
                                                                      const legenda = prompt("O que você quer publicar?");

                                                                        if (!legenda || !legenda.trim()) return;

                                                                          const post = document.createElement("article");
                                                                            post.className = "post";

                                                                              const usuario = document.createElement("div");
                                                                                usuario.className = "usuario";
                                                                                  usuario.innerHTML = "<strong>seu_perfil</strong><span>•••</span>";

                                                                                    const texto = document.createElement("p");
                                                                                      texto.textContent = legenda;

                                                                                        post.appendChild(usuario);
                                                                                          post.appendChild(texto);

                                                                                            document.getElementById("feed").prepend(post);
                                                                                            }
                                                                                            
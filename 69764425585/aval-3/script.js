
function curtir(botao) {
  const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

      let numero = Number(post.dataset.likes);
        let curtido = botao.dataset.curtido === "true";

          numero = curtido ? numero - 1 : numero + 1;

            post.dataset.likes = numero;
              botao.dataset.curtido = String(!curtido);

                botao.innerText = curtido ? "♡" : "❤️";
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

                                            document.querySelectorAll(".campo-comentario")
                                            .forEach(campo => {
                                              campo.addEventListener("keydown", function(event) {
                                                  if (event.key === "Enter") {
                                                        comentar(this.closest(".post"));
                                                            }
                                                              });
                                                              });

                                                              function novaPublicacao() {
                                                                const legenda = prompt("O que você quer publicar?");

                                                                  if (!legenda || !legenda.trim()) return;

                                                                    const post = document.createElement("article");
                                                                      post.className = "post";
                                                                        post.dataset.likes = "0";

                                                                          post.innerHTML = `
                                                                              <div class="usuario">
                                                                                    <strong>seu_perfil</strong>
                                                                                        </div>

                                                                                            <p class="legenda"></p>

                                                                                                <div class="acoes">
                                                                                                      <button onclick="curtir(this)">♡</button>
                                                                                                            <button onclick="comentar(this)">♧</button>
                                                                                                                  <button>➤</button>
                                                                                                                      </div>

                                                                                                                          <p class="likes">0 curtidas</p>
                                                                                                                              <div class="comentarios"></div>
                                                                                                                                  <input class="campo-comentario"
                                                                                                                                      placeholder="Adicione um comentário...">
                                                                                                                                        `;

                                                                                                                                          post.querySelector(".legenda").textContent = legenda;

                                                                                                                                            document.getElementById("feed").prepend(post);
                                                                                                                                            }
                                                                                                                                            
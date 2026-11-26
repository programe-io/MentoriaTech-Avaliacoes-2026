
// Botão seguir
const seguir = document.getElementById("seguir");

seguir.addEventListener("click", () => {
  if (seguir.textContent === "Seguir") {
      seguir.textContent = "Seguindo";
          seguir.style.background = "#363636";
            } else {
                seguir.textContent = "Seguir";
                    seguir.style.background = "#0095f6";
                      }
                      });

                      // Curtidas
                      document.querySelectorAll(".like").forEach((botao) => {
                        botao.addEventListener("click", () => {
                            botao.classList.toggle("liked");

                                if (botao.classList.contains("liked")) {
                                      botao.textContent = "♥";
                                          } else {
                                                botao.textContent = "♡";
                                                    }
                                                      });
                                                      });

                                                      // Publicar comentários
                                                      document.querySelectorAll(".post").forEach((post) => {
                                                        const input = post.querySelector("input");
                                                          const publicar = post.querySelector(".publicar");

                                                            publicar.addEventListener("click", () => {
                                                                const texto = input.value.trim();

                                                                    if (texto === "") {
                                                                          return;
                                                                              }

                                                                                  const novoComentario = document.createElement("p");
                                                                                      novoComentario.style.padding = "5px 12px";
                                                                                          novoComentario.style.fontSize = "14px";

                                                                                              const usuario = document.createElement("strong");
                                                                                                  usuario.textContent = "Você ";

                                                                                                      novoComentario.appendChild(usuario);
                                                                                                          novoComentario.appendChild(
                                                                                                                document.createTextNode(texto)
                                                                                                                    );

                                                                                                                        post.querySelector(".comentario-area").before(novoComentario);

                                                                                                                            input.value = "";
                                                                                                                              });

                                                                                                                                input.addEventListener("keydown", (evento) => {
                                                                                                                                    if (evento.key === "Enter") {
                                                                                                                                          publicar.click();
                                                                                                                                              }
                                                                                                                                                });
                                                                                                                                                });

                                                                                                                                                // Salvar publicações
                                                                                                                                                document.querySelectorAll(".salvar").forEach((botao) => {
                                                                                                                                                  botao.addEventListener("click", () => {
                                                                                                                                                      botao.textContent =
                                                                                                                                                            botao.textContent === "♧" ? "🔖" : "♧";
                                                                                                                                                              });
                                                                                                                                                              });
                                                                                                                                                              
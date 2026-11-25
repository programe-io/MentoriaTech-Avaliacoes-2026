
function curtir(botao) {
  const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

      let quantidade = Number(
          likes.dataset.quantidade || 0
            );

              if (botao.classList.contains("liked")) {
                  quantidade--;
                      botao.classList.remove("liked");
                          botao.style.color = "black";
                              botao.innerHTML = "♡";
                                } else {
                                    quantidade++;
                                        botao.classList.add("liked");
                                            botao.style.color = "red";
                                                botao.innerHTML = "♥";
                                                  }

                                                    likes.dataset.quantidade = quantidade;
                                                      likes.innerText = quantidade + " curtidas";
                                                      }

                                                      function comentar(botao) {
                                                        const post = botao.closest(".post");
                                                          post.querySelector(".comment-input").focus();
                                                          }

                                                          function enviarComentario(event, input) {
                                                            if (event.key === "Enter" && input.value.trim() !== "") {
                                                                const post = input.closest(".post");
                                                                    const comentarios = post.querySelector(".comments");

                                                                        const novoComentario = document.createElement("p");
                                                                            novoComentario.innerHTML = "";

                                                                                const nome = document.createElement("strong");
                                                                                    nome.textContent = "Você ";

                                                                                        const texto = document.createTextNode(input.value);

                                                                                            novoComentario.append(nome, texto);
                                                                                                comentarios.appendChild(novoComentario);

                                                                                                    input.value = "";
                                                                                                      }
                                                                                                      }

                                                                                                      function novaPublicacao() {
                                                                                                        const url = prompt("Cole o link de uma imagem:");

                                                                                                          if (!url) return;

                                                                                                            const post = document.createElement("article");
                                                                                                              post.className = "post";

                                                                                                                const imagem = document.createElement("img");
                                                                                                                  imagem.className = "post-image";
                                                                                                                    imagem.src = url;
                                                                                                                      imagem.alt = "Nova publicação";

                                                                                                                        const usuario = document.createElement("div");
                                                                                                                          usuario.className = "post-user";
                                                                                                                            usuario.textContent = "jhonatas.g";

                                                                                                                              const legenda = document.createElement("p");
                                                                                                                                legenda.textContent = "Nova publicação! 🔥";

                                                                                                                                  post.append(usuario, imagem, legenda);
                                                                                                                                    document.getElementById("feed").prepend(post);
                                                                                                                                    }
                                                                                                                                    
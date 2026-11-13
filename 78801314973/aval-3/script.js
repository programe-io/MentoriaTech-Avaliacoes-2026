post.style.displaysalvarBotao.onclicksalvarBotao.classNamesalvarBotao.textContentlike.onclicklike.textContentacoes.classNametexto.textContenttexto.classNameimagem.srcimagem.classNameusuario.textContentusuario.classNamepost.classNamecomentario.textContentbotao.style.colorlikes.textContentbotao.dataset.curtidobotao.textContent
function curtir(botao) {
  const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

      if (botao.dataset.curtido === "sim") {
          botao.textContent = "♡";
              botao.dataset.curtido = "nao";
                  likes.textContent = "Curtida removida";
                    } else {
                        botao.textContent = "♥";
                            botao.style.color = "#ff3040";
                                botao.dataset.curtido = "sim";
                                    likes.textContent = "Você curtiu ❤️";
                                      }
                                      }

                                      function seguir(botao) {
                                        if (botao.textContent === "Seguir") {
                                            botao.textContent = "Seguindo";
                                              } else {
                                                  botao.textContent = "Seguir";
                                                    }
                                                    }

                                                    function salvar(botao) {
                                                      botao.textContent =
                                                          botao.textContent === "♧" ? "▣" : "♧";
                                                          }

                                                          function comentar(botao) {
                                                            const texto = prompt("Escreva seu comentário:");

                                                              if (texto && texto.trim()) {
                                                                  const comentario = document.createElement("p");
                                                                      comentario.textContent = "💬 Você: " + texto;

                                                                          botao.closest(".post")
                                                                                .querySelector(".informacoes")
                                                                                      .appendChild(comentario);
                                                                                        }
                                                                                        }

                                                                                        function abrirStory(nome) {
                                                                                          alert("Você abriu o story de " + nome);
                                                                                          }

                                                                                          function novaPublicacao() {
                                                                                            const legenda = prompt("Escreva a legenda da publicação:");
                                                                                              if (!legenda || !legenda.trim()) return;

                                                                                                const url = prompt("Cole o link de uma imagem:");
                                                                                                  if (!url || !url.trim()) return;

                                                                                                    try {
                                                                                                        const endereco = new URL(url);
                                                                                                            if (!["http:", "https:"].includes(endereco.protocol)) {
                                                                                                                  alert("Use um link de imagem válido.");
                                                                                                                        return;
                                                                                                                            }

                                                                                                                                const post = document.createElement("article");
                                                                                                                                    post.className = "post";

                                                                                                                                        const usuario = document.createElement("div");
                                                                                                                                            usuario.className = "usuario";
                                                                                                                                                usuario.textContent = "👤 mirelly";

                                                                                                                                                    const imagem = document.createElement("img");
                                                                                                                                                        imagem.className = "publicacao";
                                                                                                                                                            imagem.src = endereco.href;

                                                                                                                                                                const texto = document.createElement("div");
                                                                                                                                                                    texto.className = "informacoes";
                                                                                                                                                                        texto.textContent = "mirelly: " + legenda;

                                                                                                                                                                            const acoes = document.createElement("div");
                                                                                                                                                                                acoes.className = "acoes";

                                                                                                                                                                                    const like = document.createElement("button");
                                                                                                                                                                                        like.textContent = "♡";
                                                                                                                                                                                            like.onclick = () => curtir(like);

                                                                                                                                                                                                const salvarBotao = document.createElement("button");
                                                                                                                                                                                                    salvarBotao.textContent = "♧";
                                                                                                                                                                                                        salvarBotao.className = "salvar";
                                                                                                                                                                                                            salvarBotao.onclick = () => salvar(salvarBotao);

                                                                                                                                                                                                                acoes.append(like, salvarBotao);
                                                                                                                                                                                                                    post.append(usuario, imagem, acoes, texto);

                                                                                                                                                                                                                        document.getElementById("feed").prepend(post);
                                                                                                                                                                                                                          } catch {
                                                                                                                                                                                                                              alert("Esse link não é válido.");
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                function pesquisar() {
                                                                                                                                                                                                                                  const nome = prompt("O que deseja pesquisar?");
                                                                                                                                                                                                                                    if (!nome) return;

                                                                                                                                                                                                                                      const posts = document.querySelectorAll(".post");

                                                                                                                                                                                                                                        posts.forEach(post => {
                                                                                                                                                                                                                                            post.style.display =
                                                                                                                                                                                                                                                  post.textContent.toLowerCase().includes(nome.toLowerCase())
                                                                                                                                                                                                                                                          ? "block" : "none";
                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                            
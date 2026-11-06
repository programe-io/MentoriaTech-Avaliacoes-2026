
function curtir(botao) {

  let post = botao.closest(".post");
    let likes = post.querySelector(".likes");

      let quantidade = Number(
          likes.dataset.count ||
              likes.textContent.replace(/\D/g, "")
                );

                  if (botao.textContent === "♡") {
                      botao.textContent = "♥";
                          botao.style.color = "red";
                              quantidade++;
                                } else {
                                    botao.textContent = "♡";
                                        botao.style.color = "#f07836";
                                            quantidade--;
                                              }

                                                likes.dataset.count = quantidade;
                                                  likes.textContent = quantidade + " curtidas";
                                                  }

                                                  function comentar(botao) {

                                                    let post = botao.closest(".post");
                                                      let mensagem = prompt("Escreva seu comentário:");

                                                        if (mensagem && mensagem.trim()) {

                                                            let comentario = document.createElement("p");
                                                                comentario.textContent = "Você: " + mensagem;

                                                                    post.querySelector(".comentarios")
                                                                          .appendChild(comentario);
                                                                            }
                                                                            }

                                                                            function compartilhar() {
                                                                              alert("Publicação compartilhada!");
                                                                              }

                                                                              function criarPost() {

                                                                                let legenda = prompt("Digite a legenda:");

                                                                                  if (!legenda || !legenda.trim()) {
                                                                                      return;
                                                                                        }

                                                                                          let post = document.createElement("article");
                                                                                            post.className = "post";

                                                                                              let perfil = document.createElement("div");
                                                                                                perfil.className = "perfil";

                                                                                                  let nome = document.createElement("strong");
                                                                                                    nome.textContent = "meu.perfil";
                                                                                                      perfil.appendChild(nome);

                                                                                                        let acoes = document.createElement("div");
                                                                                                          acoes.className = "acoes";

                                                                                                            let botao = document.createElement("button");
                                                                                                              botao.textContent = "♡";
                                                                                                                botao.onclick = function() {
                                                                                                                    curtir(this);
                                                                                                                      };

                                                                                                                        acoes.appendChild(botao);

                                                                                                                          let likes = document.createElement("p");
                                                                                                                            likes.className = "likes";
                                                                                                                              likes.textContent = "0 curtidas";

                                                                                                                                let texto = document.createElement("p");
                                                                                                                                  texto.className = "legenda";

                                                                                                                                    let usuario = document.createElement("b");
                                                                                                                                      usuario.textContent = "meu.perfil ";

                                                                                                                                        texto.appendChild(usuario);
                                                                                                                                          texto.appendChild(document.createTextNode(legenda));

                                                                                                                                            let comentarios = document.createElement("div");
                                                                                                                                              comentarios.className = "comentarios";

                                                                                                                                                post.appendChild(perfil);
                                                                                                                                                  post.appendChild(acoes);
                                                                                                                                                    post.appendChild(likes);
                                                                                                                                                      post.appendChild(texto);
                                                                                                                                                        post.appendChild(comentarios);

                                                                                                                                                          document.getElementById("feed").prepend(post);

                                                                                                                                                            alert("Publicação criada!");
                                                                                                                                                            }
                                                                                                                                                            
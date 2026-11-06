
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
                                        botao.style.color = "#1877f2";
                                            quantidade--;
                                              }

                                                likes.dataset.count = quantidade;
                                                  likes.textContent = quantidade + " curtidas";
                                                  }

                                                  function comentar() {

                                                    let comentario = prompt("Digite seu comentário:");

                                                      if (comentario && comentario.trim()) {
                                                          alert("Comentário enviado!");
                                                            }

                                                            }

                                                            function novoPost() {

                                                              let legenda = prompt("Escreva sua publicação:");

                                                                if (!legenda || !legenda.trim()) {
                                                                    return;
                                                                      }

                                                                        let post = document.createElement("article");

                                                                          post.className = "post";

                                                                            let perfil = document.createElement("div");
                                                                              perfil.className = "perfil";
                                                                                perfil.innerHTML = "<strong>meu.perfil</strong>";

                                                                                  let texto = document.createElement("p");
                                                                                    texto.className = "legenda";

                                                                                      let nome = document.createElement("b");
                                                                                        nome.textContent = "meu.perfil ";

                                                                                          texto.appendChild(nome);
                                                                                            texto.appendChild(
                                                                                                document.createTextNode(legenda)
                                                                                                  );

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

                                                                                                                            post.appendChild(perfil);
                                                                                                                              post.appendChild(acoes);
                                                                                                                                post.appendChild(likes);
                                                                                                                                  post.appendChild(texto);

                                                                                                                                    document.getElementById("feed").prepend(post);

                                                                                                                                      alert("Publicação criada!");
                                                                                                                                      }
                                                                                                                                      
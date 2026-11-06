
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
                                        botao.style.color = "#d4af37";
                                            quantidade--;

                                              }

                                                likes.dataset.count = quantidade;
                                                  likes.textContent = quantidade + " curtidas";
                                                  }

                                                  function comentar() {

                                                    let mensagem = prompt("Digite seu comentário:");

                                                      if (mensagem && mensagem.trim()) {
                                                          alert("Comentário enviado com sucesso!");
                                                            }

                                                            }

                                                            function criarPost() {

                                                              let legenda = prompt("Escreva sua publicação:");

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

                                                                                                                  let identificacao = document.createElement("b");
                                                                                                                    identificacao.textContent = "meu.perfil ";

                                                                                                                      texto.appendChild(identificacao);
                                                                                                                        texto.appendChild(document.createTextNode(legenda));

                                                                                                                          post.appendChild(perfil);
                                                                                                                            post.appendChild(acoes);
                                                                                                                              post.appendChild(likes);
                                                                                                                                post.appendChild(texto);

                                                                                                                                  document.getElementById("feed").prepend(post);

                                                                                                                                    alert("Publicação criada!");
                                                                                                                                    }
                                                                                                                                    
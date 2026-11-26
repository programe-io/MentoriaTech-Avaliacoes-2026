
function publicar() {
  const campo = document.getElementById("texto");
    const texto = campo.value.trim();

      if (texto === "") {
          alert("Escreva algo antes de publicar!");
              return;
                }

                  const feed = document.getElementById("feed");

                    const publicacao = document.createElement("div");
                      publicacao.className = "card";

                        const nome = document.createElement("h3");
                          nome.textContent = "Felipe apelão";

                            const mensagem = document.createElement("p");
                              mensagem.textContent = texto;

                                const botaoCurtir = document.createElement("button");
                                  botaoCurtir.textContent = "👍 Curtir";
                                    botaoCurtir.onclick = function() {
                                        curtir(botaoCurtir);
                                          };

                                            const botaoComentar = document.createElement("button");
                                              botaoComentar.textContent = "💬 Comentar";
                                                botaoComentar.onclick = comentar;

                                                  publicacao.appendChild(nome);
                                                    publicacao.appendChild(mensagem);
                                                      publicacao.appendChild(botaoCurtir);
                                                        publicacao.appendChild(botaoComentar);

                                                          feed.prepend(publicacao);

                                                            campo.value = "";
                                                            }

                                                            function curtir(botao) {
                                                              if (botao.textContent === "👍 Curtir") {
                                                                  botao.textContent = "👍 Curtido";
                                                                      botao.style.color = "#2477e8";
                                                                        } else {
                                                                            botao.textContent = "👍 Curtir";
                                                                                botao.style.color = "black";
                                                                                  }
                                                                                  }

                                                                                  function comentar() {
                                                                                    const comentario = prompt("Digite seu comentário:");

                                                                                      if (comentario && comentario.trim() !== "") {
                                                                                          alert("Comentário publicado: " + comentario);
                                                                                            }
                                                                                            }
                                                                                            
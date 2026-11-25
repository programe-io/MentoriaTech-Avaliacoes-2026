
function curtir(botao) {
  const post = botao.closest(".post");
    const contador = post.querySelector(".curtidas");

      if (botao.classList.contains("curtido")) {
          botao.classList.remove("curtido");
              botao.textContent = "♡";
                  contador.textContent = "0 curtidas";
                    } else {
                        botao.classList.add("curtido");
                            botao.textContent = "❤️";
                                contador.textContent = "1 curtida";
                                  }
                                  }

                                  function salvar(botao) {
                                    if (botao.textContent === "♧") {
                                        botao.textContent = "🔖";
                                            alert("Publicação salva!");
                                              } else {
                                                  botao.textContent = "♧";
                                                      alert("Publicação removida dos salvos!");
                                                        }
                                                        }

                                                        function comentar() {
                                                          const comentario = prompt("Escreva seu comentário:");

                                                            if (comentario && comentario.trim() !== "") {
                                                                alert("Comentário enviado: " + comentario);
                                                                  }
                                                                  }

                                                                  function compartilhar() {
                                                                    alert("Publicação compartilhada!");
                                                                    }

                                                                    function mostrarBusca() {
                                                                      const busca = prompt("O que você deseja procurar?");

                                                                        if (busca) {
                                                                            alert("Você pesquisou: " + busca);
                                                                              }
                                                                              }

                                                                              function mostrarMensagem() {
                                                                                alert("Suas mensagens aparecerão aqui!");
                                                                                }

                                                                                function mostrarPerfil() {
                                                                                  alert("Perfil do Instabolo 👑");
                                                                                  }

                                                                                  function publicar() {
                                                                                    const legenda = prompt("Qual será a legenda da publicação?");

                                                                                      if (legenda && legenda.trim() !== "") {
                                                                                          alert("Publicação criada: " + legenda);
                                                                                            }
                                                                                            }
                                                                                            
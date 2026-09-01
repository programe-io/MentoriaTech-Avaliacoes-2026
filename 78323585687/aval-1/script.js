function mostrarMensagem() {

      const mensagem = document.getElementById("mensagem");

        mensagem.innerHTML = "🎮 Prepare-se para explorar o mundo dos jogos!";

          mensagem.style.display = "block";

            setTimeout(function() {
                mensagem.style.display = "none";
                  }, 3000);

                  }


                  function jogar(tipoJogo) {

                    const mensagem = document.getElementById("mensagem");

                      mensagem.innerHTML = "🎮 Você escolheu o jogo: " + tipoJogo;

                        mensagem.style.display = "block";

                          setTimeout(function() {
                              mensagem.style.display = "none";
                                }, 3000);

                                }
}
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;

function verificarChute() {
  let chute = parseInt(document.getElementById("chute").value);
    let mensagem = document.getElementById("mensagem");
      tentativas++;
        document.getElementById("contador").textContent = tentativas;

          if (chute === numeroSecreto) {
              mensagem.textContent = `🎉 Parabéns! Acertou em ${tentativas} tentativas!`;
                  mensagem.style.color = "green";
                    } else if (chute < numeroSecreto) {
                        mensagem.textContent = "📈 Tente um número MAIOR!";
                            mensagem.style.color = "blue";
                              } else {
                                  mensagem.textContent = "📉 Tente um número MENOR!";
                                      mensagem.style.color = "red";
                                        }
                                        }

                                        function reiniciarJogo() {
                                          numeroSecreto = Math.floor(Math.random() * 100) + 1;
                                            tentativas = 0;
                                              document.getElementById("contador").textContent = tentativas;
                                                document.getElementById("mensagem").textContent = "";
                                                  document.getElementById("chute").value = "";
                                                  }
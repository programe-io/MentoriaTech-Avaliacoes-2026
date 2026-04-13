const senhaCorreta = "1234";
let tentativas = 3;

function verificarSenha() {
  let mensagem = document.getElementById("mensagem");
    let input = document.getElementById("senha");

      // Simulando lógica de repetição (como do/while)
        if (tentativas > 0) {
            let senhaDigitada = input.value;

                if (senhaDigitada === senhaCorreta) {
                      mensagem.style.color = "green";
                            mensagem.textContent = "Bem-vindo! Acesso permitido.";
                                  bloquearSistema();
                                      } else {
                                            tentativas--;

                                                  if (tentativas > 0) {
                                                          mensagem.style.color = "orange";
                                                                  mensagem.textContent = `Senha incorreta! Restam ${tentativas} tentativa(s).`;
                                                                        } else {
                                                                                mensagem.style.color = "red";
                                                                                        mensagem.textContent = "Acesso bloqueado!";
                                                                                                bloquearSistema();
                                                                                                      }
                                                                                                          }
                                                                                                            }

                                                                                                              input.value = "";
                                                                                                                input.focus();
                                                                                                                }

                                                                                                                function bloquearSistema() {
                                                                                                                  document.querySelector("button").disabled = true;
                                                                                                                    document.getElementById("senha").disabled = true;
                                                                                                                    }
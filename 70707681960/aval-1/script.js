const SENHA_CORRETA = "5346";
let tentativasRestantes = 3;

function validarAcesso() {
    const input = document.getElementById('senhaInput');
        const display = document.getElementById('mensagem');
            
                // Simulação do comportamento de tentativas
                    if (tentativasRestantes > 0) {
                            let senhaDigitada = input.value;

                                    if (senhaDigitada === SENHA_CORRETA) {
                                                display.innerHTML = "<p class='sucesso'>Acesso Permitido! Bem-vindo ao seu banco.</p>";
                                                            input.disabled = true;
                                                                        tentativasRestantes = 0; // Finaliza lógica
                                                                                } else {
                                                                                            tentativasRestantes--;
                                                                                                        
                                                                                                                    if (tentativasRestantes > 0) {
                                                                                                                                    display.innerHTML = `<p class='erro'>Senha incorreta!<br>Você ainda tem ${tentativasRestantes} tentativa(s).</p>`;
                                                                                                                                                    input.value = ""; // Limpa o campo para a próxima tentativa
                                                                                                                                                                } else {
                                                                                                                                                                                display.innerHTML = "<p class='erro'>ACESSO BLOQUEADO!<br>As 3 tentativas foram esgotadas. Procure seu gerente.</p>";
                                                                                                                                                                                                input.disabled = true;
                                                                                                                                                                                                            }
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                        }

                                                                                                                                                                                                                        /* Nota técnica: Em um script puramente de console (sem HTML), 
                                                                                                                                                                                                                           o loop do/while ficaria assim:

                                                                                                                                                                                                                              let senha;
                                                                                                                                                                                                                                 let tentativas = 3;
                                                                                                                                                                                                                                    do {
                                                                                                                                                                                                                                           senha = prompt("Digite sua senha:");
                                                                                                                                                                                                                                                  if (senha === "5346") {
                                                                                                                                                                                                                                                             console.log("Bem-vindo!");
                                                                                                                                                                                                                                                                        break;
                                                                                                                                                                                                                                                                               }
                                                                                                                                                                                                                                                                                      tentativas--;
                                                                                                                                                                                                                                                                                             if (tentativas > 0) console.log(`Incorreta. Restam ${tentativas}`);
                                                                                                                                                                                                                                                                                                    else console.log("Acesso Bloqueado.");
                                                                                                                                                                                                                                                                                                       } while (tentativas > 0);
                                                                                                                                                                                                                                                                                                       */
                                                                                                                                                                                                                                                                                                       
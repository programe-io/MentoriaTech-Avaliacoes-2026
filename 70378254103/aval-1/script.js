const SENHA_CORRETA = "4321";
let tentativasRestantes = 3;

function verificarSenha() {
    const input = document.getElementById('senhaInput');
        const msgDiv = document.getElementById('mensagem');
            const senhaDigitada = input.value;

                // Lógica principal
                    if (tentativasRestantes > 0) {
                            if (senhaDigitada === SENHA_CORRETA) {
                                        msgDiv.innerHTML = "<span class='sucesso'>Acesso Permitido. Bem-vindo!</span>";
                                                    input.disabled = true;
                                                                tentativasRestantes = 0; // Finaliza o ciclo
                                                                        } else {
                                                                                    tentativasRestantes--;
                                                                                                
                                                                                                            if (tentativasRestantes > 0) {
                                                                                                                            msgDiv.innerHTML = `<span class='erro'>Senha incorreta! <br> Você tem mais ${tentativasRestantes} tentativa(s).</span>`;
                                                                                                                                        } else {
                                                                                                                                                        msgDiv.innerHTML = "<span class='erro'>ACESSO BLOQUEADO! <br> Limite de tentativas excedido.</span>";
                                                                                                                                                                        input.disabled = true;
                                                                                                                                                                                    }
                                                                                                                                                                                            }
                                                                                                                                                                                                }
                                                                                                                                                                                                    input.value = ""; // Limpa o campo para a próxima tentativa
                                                                                                                                                                                                        input.focus();
                                                                                                                                                                                                        }
                                                                                                                                                                                                        
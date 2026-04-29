const senhaCorreta = "1234";
let tentativa;
let tentativasRestantes = 3;

do {
    tentativa = prompt("Digite a senha:");

        if (tentativa === senhaCorreta) {
                alert("Bem-vindo! Acesso liberado.");
                        break;
                            } else {
                                    tentativasRestantes--;

                                            if (tentativasRestantes > 0) {
                                                        alert("Senha incorreta! Tentativas restantes: " + tentativasRestantes);
                                                                } else {
                                                                            alert("Acesso bloqueado! Número máximo de tentativas excedido.");
                                                                                    }
                                                                                        }

                                                                                        } while (tentativasRestantes > 0);
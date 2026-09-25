function mostrarMensagem() {
        document.getElementById("mensagem").textContent =
                "Olá! O JavaScript está funcionando!";
                }

                function enviarNome() {
                    const nome = document.getElementById("nome").value;

                        if (nome === "") {
                                document.getElementById("resultado").textContent =
                                            "Digite seu nome primeiro.";
                                                } else {
                                                        document.getElementById("resultado").textContent =
                                                                    "Olá, " + nome + "! Seja bem-vindo ao meu projeto.";
                                                                        }
                                                                        }
}
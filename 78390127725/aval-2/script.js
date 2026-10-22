function mostrarMensagem() {
        alert("Bem-vindo ao Meu Blog de Games! 🎮");
        }

        function enviarMensagem() {
            const nome = document.getElementById("nome").value;
                const resposta = document.getElementById("resposta");

                    if (nome.trim() === "") {
                            resposta.textContent = "Por favor, digite seu nome!";
                                } else {
                                        resposta.textContent = "Olá, " + nome +
                                                    "! Obrigado por visitar nosso blog!";
                                                        }
                                                        }
}
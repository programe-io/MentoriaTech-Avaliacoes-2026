
function mostrarMensagem() {
    const nome = document.getElementById("nome").value.trim();
        const resultado = document.getElementById("resultado");

            if (nome === "") {
                    resultado.textContent = "Digite seu nome primeiro!";
                        } else {
                                resultado.textContent =
                                            "Olá, " + nome +
                                                        "! Seja bem-vindo(a) ao mundo da programação!";
                                                            }
                                                            }
                                                            
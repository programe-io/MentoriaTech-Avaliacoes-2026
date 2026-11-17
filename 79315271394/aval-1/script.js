
function mostrarMensagem() {
    alert("Bem-vinda ao Fashion Blog! Descubra as novidades da moda.");
    }

    function enviarMensagem() {
        let nome = document.getElementById("nome").value;

            if (nome === "") {
                    alert("Digite seu nome!");
                        } else {
                                document.getElementById("resultado").innerHTML =
                                            "Olá, " + nome + "! Seja bem-vinda ao nosso blog!";
                                                }
                                                }
                                                
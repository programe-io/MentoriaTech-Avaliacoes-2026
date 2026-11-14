function enviar() {
        let nome = document.getElementById("nome").value;

            if (nome === "") {
                    document.getElementById("resultado").innerHTML =
                                "Por favor, digite seu nome!";
                                    } else {
                                            document.getElementById("resultado").innerHTML =
                                                        "Olá, " + nome + "! Seja bem-vindo ao TechWorld!";
                                                            }
                                                            }
}
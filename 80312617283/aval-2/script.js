let numeroSecreto;

function iniciarJogo() {

    numeroSecreto = Math.floor(Math.random() * 10) + 1;

        document.getElementById("resultado").innerText =
                "Jogo iniciado! Boa sorte 🎮";

                    document.getElementById("numero").value = "";
                    }


                    function verificarNumero() {

                        let tentativa = Number(
                                document.getElementById("numero").value
                                    );

                                        let resultado = document.getElementById("resultado");

                                            if (!numeroSecreto) {
                                                    resultado.innerText =
                                                                "Clique em Jogar primeiro! 🎮";
                                                                        return;
                                                                            }

                                                                                if (tentativa === numeroSecreto) {

                                                                                        resultado.innerText =
                                                                                                    "🎉 Acertou! Você é brabo!";

                                                                                                            numeroSecreto = null;

                                                                                                                } else if (tentativa < numeroSecreto) {

                                                                                                                        resultado.innerText =
                                                                                                                                    "⬆️ O número é maior!";

                                                                                                                                        } else {

                                                                                                                                                resultado.innerText =
                                                                                                                                                            "⬇️ O número é menor!";
                                                                                                                                                                }
                                                                                                                                                                }


                                                                                                                                                                function mensagem(jogo) {

                                                                                                                                                                    alert(
                                                                                                                                                                            "🎮 Você escolheu o jogo: " + jogo
                                                                                                                                                                                );
                                                                                                                                                                                }
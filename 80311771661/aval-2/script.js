function mostrarMensagem() {
        const mensagem = document.getElementById("mensagem");

            mensagem.innerHTML =
                    "💜 Bem-vinda ao ARMY Universe! Que bom ter você aqui! ✨";

                        mensagem.style.color = "#d39aff";
                        }


                        function tocarMusica(nome) {
                            const mensagem = document.getElementById("music-message");

                                mensagem.innerHTML =
                                        "🎧 Você escolheu: <strong>" + nome + "</strong> 💜";

                                            mensagem.style.color = "#d39aff";
                                            }


                                            const frases = [
                                                "💜 Continue acreditando em você.",
                                                    "🌙 Você é importante e sua história também.",
                                                        "✨ Pequenos passos também levam a grandes sonhos.",
                                                            "💜 Que a música sempre traga bons momentos.",
                                                                "🌌 Nunca deixe de acreditar nos seus sonhos."
                                                                ];


                                                                function novaFrase() {

                                                                    const numero = Math.floor(Math.random() * frases.length);

                                                                        document.getElementById("frase").innerHTML =
                                                                                frases[numero];
                                                                                }
}
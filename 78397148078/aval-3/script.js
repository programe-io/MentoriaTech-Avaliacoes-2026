
function curtir(botao) {
    const post = botao.closest(".post");
        const curtidas = post.querySelector(".likes");

            let numero = parseInt(
                    curtidas.textContent.replace(/\D/g, "")
                        );

                            if (botao.textContent === "🤍") {
                                    botao.textContent = "❤️";
                                            numero++;
                                                } else {
                                                        botao.textContent = "🤍";
                                                                numero--;
                                                                    }

                                                                        curtidas.textContent = numero.toLocaleString("pt-BR")
                                                                                + " curtidas";
                                                                                }

                                                                                function comentar(botao) {
                                                                                    const post = botao.closest(".post");
                                                                                        const campo = post.querySelector("input");

                                                                                            campo.focus();
                                                                                            }
                                                                                            
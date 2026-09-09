function irParaPartidas() {
        document.getElementById("partidas")
                .scrollIntoView({ behavior: "smooth" });
                }

                function favorito(botao) {
                    if (botao.innerText.includes("♡")) {
                            botao.innerText = "♥ Favoritado";
                                    botao.style.background = "#ef4444";
                                            botao.style.color = "white";
                                                } else {
                                                        botao.innerText = "♡ Favoritar";
                                                                botao.style.background = "#22c55e";
                                                                        botao.style.color = "black";
                                                                            }
                                                                            }
}
function verPartidas() {
        document.getElementById("partidas")
                .scrollIntoView({ behavior: "smooth" });
                }

                function favoritar(botao) {

                    if (botao.innerText.includes("♡")) {

                            botao.innerText = "♥ Favoritado";
                                    botao.style.background = "#ef4444";
                                            botao.style.color = "white";

                                                } else {

                                                        botao.innerText = "♡ Favoritar";
                                                                botao.style.background = "#38bdf8";
                                                                        botao.style.color = "black";

                                                                            }
                                                                            }
}
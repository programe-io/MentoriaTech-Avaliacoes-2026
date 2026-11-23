
const botoes = document.querySelectorAll(".curtir");

botoes.forEach(function(botao) {

    botao.addEventListener("click", function() {

            if (botao.innerHTML === "❤️ Curtir") {
                        botao.innerHTML = "💖 Curtido!";
                                } else {
                                            botao.innerHTML = "❤️ Curtir";
                                                    }

                                                        });

                                                        });
                                                        
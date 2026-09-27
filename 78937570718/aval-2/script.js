document.addEventListener("DOMContentLoaded", function () {
        // 1. Cria o botão dinamicamente na tela
            const botaoTopo = document.createElement("button");
                botaoTopo.innerHTML = "↑";
                    botaoTopo.id = "btnVoltarTopo";
                        document.body.appendChild(botaoTopo);

                            // 2. Mostra o botão apenas se o usuário rolar a página para baixo
                                window.onscroll = function () {
                                        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                                                    botaoTopo.style.display = "block";
                                                            } else {
                                                                        botaoTopo.style.display = "none";
                                                                                }
                                                                                    };

                                                                                        // 3. Faz a página subir suavemente ao clicar
                                                                                            botaoTopo.addEventListener("click", function () {
                                                                                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                                                                                        });
                                                                                                        });
})
function mostrarMensagem() {
        alert("Olá! Obrigado por visitar nosso projeto!");
        }

        document.addEventListener("DOMContentLoaded", function () {
            console.log("Página carregada com sucesso!");

                const botao = document.querySelector("button");

                    if (botao) {
                            botao.addEventListener("mouseover", function () {
                                        botao.style.transform = "scale(1.05)";
                                                });

                                                        botao.addEventListener("mouseout", function () {
                                                                    botao.style.transform = "scale(1)";
                                                                            });
                                                                                }
                                                                                });
}
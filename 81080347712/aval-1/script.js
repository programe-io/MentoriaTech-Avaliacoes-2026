function mostrarMensagem() {
        const mensagem = document.getElementById("mensagem");

            mensagem.textContent =
                    "✨ A evolução acontece quando usamos o conhecimento para transformar o mundo!";

                        mensagem.style.animation = "aparecer 1s ease";
                        }

                        function mudarTema() {
                            document.body.classList.toggle("tema-claro");

                                const botao = document.querySelector(".futuro button");

                                    if (document.body.classList.contains("tema-claro")) {
                                            botao.textContent = "Voltar ao tema escuro";
                                                } else {
                                                        botao.textContent = "Mudar as cores";
                                                            }
                                                            }
}

// Botão de curtir
const botoesCurtir = document.querySelectorAll(".post-actions button:first-child");

botoesCurtir.forEach(botao => {
    botao.addEventListener("click", () => {
            if (botao.textContent === "Curtir") {
                        botao.textContent = "Curtido ❤️";
                                } else {
                                            botao.textContent = "Curtir";
                                                    }
                                                        });
                                                        });

                                                        // Botão de comentar
                                                        const botoesComentar = document.querySelectorAll(".post-actions button:last-child");

                                                        botoesComentar.forEach(botao => {
                                                            botao.addEventListener("click", () => {
                                                                    alert("Você clicou em comentar!");
                                                                        });
                                                                        });

                                                                        // Botão publicar
                                                                        const botaoPublicar = document.querySelector(".new-post button");

                                                                        botaoPublicar.addEventListener("click", () => {
                                                                            alert("Publicação enviada com sucesso!");
                                                                            });
                                                                            
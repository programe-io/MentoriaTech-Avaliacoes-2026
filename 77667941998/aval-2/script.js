
// Sistema de curtidas
const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(botao => {
    botao.addEventListener("click", () => {
            const contador = botao.querySelector("span");
                    let curtidas = Number(contador.textContent);

                            if (botao.classList.contains("curtido")) {
                                        curtidas--;
                                                    botao.classList.remove("curtido");
                                                            } else {
                                                                        curtidas++;
                                                                                    botao.classList.add("curtido");
                                                                                            }

                                                                                                    contador.textContent = curtidas;
                                                                                                        });
                                                                                                        });

                                                                                                        // Botões de comentário
                                                                                                        document.querySelectorAll(".comentar").forEach(botao => {
                                                                                                            botao.addEventListener("click", () => {
                                                                                                                    const comentario = prompt("Digite seu comentário:");

                                                                                                                            if (comentario && comentario.trim() !== "") {
                                                                                                                                        alert("Comentário enviado: " + comentario);
                                                                                                                                                }
                                                                                                                                                    });
                                                                                                                                                    });

                                                                                                                                                    // Botões de compartilhar
                                                                                                                                                    document.querySelectorAll(".compartilhar").forEach(botao => {
                                                                                                                                                        botao.addEventListener("click", () => {
                                                                                                                                                                alert("Você compartilhou esta publicação!");
                                                                                                                                                                    });
                                                                                                                                                                    });
                                                                                                                                                                    
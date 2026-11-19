
// Botão curtir
document.querySelectorAll(".post").forEach(post => {
    const botaoCurtir = post.querySelector("button");

        botaoCurtir.addEventListener("click", () => {
                if (botaoCurtir.textContent === "Curtir") {
                            botaoCurtir.textContent = "Curtido ❤️";
                                    } else {
                                                botaoCurtir.textContent = "Curtir";
                                                        }
                                                            });
                                                            });

                                                            // Botão comentar
                                                            document.querySelectorAll(".post").forEach(post => {
                                                                const botoes = post.querySelectorAll("button");
                                                                    const botaoComentar = botoes[1];

                                                                        botaoComentar.addEventListener("click", () => {
                                                                                const comentario = prompt("Digite seu comentário:");

                                                                                        if (comentario) {
                                                                                                    alert("Comentário enviado: " + comentario);
                                                                                                            }
                                                                                                                });
                                                                                                                });

                                                                                                                // Botão publicar
                                                                                                                document.querySelector(".new-post button").addEventListener("click", () => {
                                                                                                                    const texto = prompt("O que você está pensando?");

                                                                                                                        if (texto) {
                                                                                                                                alert("Sua publicação foi feita: " + texto);
                                                                                                                                    }
                                                                                                                                    });
                                                                                                                                    

document.addEventListener("DOMContentLoaded", () => {

    // CURTIR PUBLICAÇÕES
        document.querySelectorAll(".curtir").forEach(botao => {
                botao.addEventListener("click", () => {

                            const curtiu = botao.classList.toggle("curtiu");

                                        botao.textContent = curtiu ? "♥" : "♡";

                                                });
                                                    });

                                                        // SEGUIR PERFIL
                                                            const seguir = document.getElementById("seguir");

                                                                seguir.addEventListener("click", () => {

                                                                        const seguindo = seguir.classList.toggle("seguindo");

                                                                                seguir.textContent = seguindo ? "Seguindo" : "Seguir";

                                                                                    });

                                                                                        // COMENTÁRIOS
                                                                                            document.querySelectorAll(".comentar").forEach(botao => {

                                                                                                    botao.addEventListener("click", () => {

                                                                                                                const texto = prompt("Escreva seu comentário:");

                                                                                                                            if (texto && texto.trim() !== "") {

                                                                                                                                            const post = botao.closest(".post");

                                                                                                                                                            const comentario = document.createElement("p");

                                                                                                                                                                            comentario.className = "comentario-novo";

                                                                                                                                                                                            const nome = document.createElement("strong");
                                                                                                                                                                                                            nome.textContent = "Você: ";

                                                                                                                                                                                                                            comentario.appendChild(nome);
                                                                                                                                                                                                                                            comentario.appendChild(
                                                                                                                                                                                                                                                                document.createTextNode(texto)
                                                                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                                                                                post.appendChild(comentario);
                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                            // STORIES
                                                                                                                                                                                                                                                                                                                                document.querySelectorAll(".story").forEach(story => {

                                                                                                                                                                                                                                                                                                                                        story.addEventListener("click", () => {

                                                                                                                                                                                                                                                                                                                                                    const imagem = story.querySelector("img").src;

                                                                                                                                                                                                                                                                                                                                                                const visualizador = document.createElement("div");

                                                                                                                                                                                                                                                                                                                                                                            visualizador.className = "visualizador";

                                                                                                                                                                                                                                                                                                                                                                                        const foto = document.createElement("img");
                                                                                                                                                                                                                                                                                                                                                                                                    foto.src = imagem;

                                                                                                                                                                                                                                                                                                                                                                                                                const fechar = document.createElement("button");
                                                                                                                                                                                                                                                                                                                                                                                                                            fechar.textContent = "×";

                                                                                                                                                                                                                                                                                                                                                                                                                                        fechar.addEventListener("click", () => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                        visualizador.remove();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                visualizador.appendChild(foto);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            visualizador.appendChild(fechar);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        visualizador.addEventListener("click", event => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        if (event.target === visualizador) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            visualizador.remove();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    document.body.appendChild(visualizador);

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

document.querySelectorAll(".curtir").forEach(function(botao) {
    let curtidas = 0;

        botao.addEventListener("click", function() {
                if (botao.classList.contains("curtido")) {
                            curtidas--;
                                        botao.classList.remove("curtido");
                                                    botao.innerHTML = '💙 Curtir (<span>' + curtidas + '</span>)';
                                                            } else {
                                                                        curtidas++;
                                                                                    botao.classList.add("curtido");
                                                                                                botao.innerHTML = '💙 Curtido (<span>' + curtidas + '</span>)';
                                                                                                        }
                                                                                                            });
                                                                                                            });

                                                                                                            document.querySelectorAll(".comentar").forEach(function(botao) {
                                                                                                                botao.addEventListener("click", function() {
                                                                                                                        const post = botao.closest(".post");
                                                                                                                                const areaComentarios = post.querySelector(".comentarios");

                                                                                                                                        const texto = prompt("Escreva seu comentário:");

                                                                                                                                                if (texto && texto.trim() !== "") {
                                                                                                                                                            const comentario = document.createElement("p");

                                                                                                                                                                        comentario.className = "comentario";
                                                                                                                                                                                    comentario.textContent = "💬 " + texto.trim();

                                                                                                                                                                                                areaComentarios.appendChild(comentario);
                                                                                                                                                                                                        }
                                                                                                                                                                                                            });
                                                                                                                                                                                                            });
                                                                                                                                                                                                            
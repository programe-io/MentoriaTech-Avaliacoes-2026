
function seguirPerfil() {
    const botao = document.getElementById("seguir");

        if (botao.innerText === "Seguir") {
                botao.innerText = "Seguindo ✓";
                        botao.style.background = "#f4e3ed";
                                botao.style.color = "#87516d";
                                        mostrarMensagem("Você começou a seguir Giselly! 💗");
                                            } else {
                                                    botao.innerText = "Seguir";
                                                            botao.style.background = "#d77fa8";
                                                                    botao.style.color = "white";
                                                                            mostrarMensagem("Você deixou de seguir Giselly.");
                                                                                }
                                                                                }

                                                                                function curtir(post) {
                                                                                    post.classList.toggle("curtido");

                                                                                        if (post.classList.contains("curtido")) {
                                                                                                post.querySelector(".coracao").innerText = "♥";
                                                                                                    } else {
                                                                                                            post.querySelector(".coracao").innerText = "♡";
                                                                                                                }
                                                                                                                }

                                                                                                                function mudarAba(aba, botao) {
                                                                                                                    document.getElementById("posts").style.display =
                                                                                                                            aba === "posts" ? "grid" : "none";

                                                                                                                                document.getElementById("marcados").style.display =
                                                                                                                                        aba === "marcados" ? "block" : "none";

                                                                                                                                            document.querySelectorAll(".aba").forEach(item => {
                                                                                                                                                    item.classList.remove("ativa");
                                                                                                                                                        });

                                                                                                                                                            botao.classList.add("ativa");
                                                                                                                                                            }

                                                                                                                                                            let temporizador;

                                                                                                                                                            function mostrarMensagem(texto) {
                                                                                                                                                                const mensagem = document.getElementById("mensagem");

                                                                                                                                                                    mensagem.innerText = texto;
                                                                                                                                                                        mensagem.classList.add("visivel");

                                                                                                                                                                            clearTimeout(temporizador);

                                                                                                                                                                                temporizador = setTimeout(() => {
                                                                                                                                                                                        mensagem.classList.remove("visivel");
                                                                                                                                                                                            }, 2500);
                                                                                                                                                                                            }
                                                                                                                                                                                            
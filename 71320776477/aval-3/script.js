document.querySelectorAll(".post").forEach(function(post) {

        let curtidas = 0;
            let curtido = false;

                const botao = post.querySelector(".like");
                    const contador = post.querySelector(".contador");

                        botao.addEventListener("click", function() {

                                if (curtido) {
                                            curtidas--;
                                                        botao.textContent = "♡ Curtir";
                                                                } else {
                                                                            curtidas++;
                                                                                        botao.textContent = "❤️ Curtido";
                                                                                                }

                                                                                                        curtido = !curtido;
                                                                                                                contador.textContent = curtidas + " curtidas";
                                                                                                                    });

                                                                                                                        const enviar = post.querySelector(".enviar");
                                                                                                                            const campo = post.querySelector(".comentario");
                                                                                                                                const lista = post.querySelector(".lista");

                                                                                                                                    enviar.addEventListener("click", function() {

                                                                                                                                            if (campo.value.trim() === "") {
                                                                                                                                                        alert("Digite um comentário!");
                                                                                                                                                                    return;
                                                                                                                                                                            }

                                                                                                                                                                                    const comentario = document.createElement("p");
                                                                                                                                                                                            comentario.textContent = "💬 " + campo.value;

                                                                                                                                                                                                    lista.appendChild(comentario);
                                                                                                                                                                                                            campo.value = "";
                                                                                                                                                                                                                });

                                                                                                                                                                                                                });
})
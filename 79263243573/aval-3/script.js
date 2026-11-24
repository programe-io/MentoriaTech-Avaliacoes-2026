
function curtir(botao) {
    const post = botao.closest(".post");
        const contador = post.querySelector(".curtidas");

            let quantidade = Number(
                    contador.dataset.quantidade || 0
                        );

                            const jaCurtiu = botao.dataset.curtido === "true";

                                if (jaCurtiu) {
                                        quantidade--;
                                                botao.dataset.curtido = "false";
                                                        botao.textContent = "♡ Curtir";
                                                            } else {
                                                                    quantidade++;
                                                                            botao.dataset.curtido = "true";
                                                                                    botao.textContent = "❤️ Curtido";
                                                                                        }

                                                                                            contador.dataset.quantidade = quantidade;
                                                                                                contador.textContent = quantidade + " curtidas";
                                                                                                }

                                                                                                function focarComentario(botao) {
                                                                                                    const post = botao.closest(".post");
                                                                                                        post.querySelector(".novo-comentario input").focus();
                                                                                                        }

                                                                                                        function comentar(botao) {
                                                                                                            const post = botao.closest(".post");
                                                                                                                const campo = post.querySelector(".novo-comentario input");
                                                                                                                    const lista = post.querySelector(".comentarios");

                                                                                                                        const texto = campo.value.trim();

                                                                                                                            if (texto === "") {
                                                                                                                                    alert("Digite um comentário!");
                                                                                                                                            return;
                                                                                                                                                }

                                                                                                                                                    const comentario = document.createElement("p");
                                                                                                                                                        comentario.textContent = "Você: " + texto;

                                                                                                                                                            lista.appendChild(comentario);
                                                                                                                                                                campo.value = "";
                                                                                                                                                                }
                                                                                                                                                                
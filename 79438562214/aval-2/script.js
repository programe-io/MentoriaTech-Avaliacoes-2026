
function curtir(botao) {
    const post = botao.closest(".post");
        const curtidas = post.querySelector(".curtidas");

            let quantidade = Number(curtidas.dataset.total || 0);

                if (botao.dataset.curtido === "true") {
                        quantidade--;
                                botao.dataset.curtido = "false";
                                        botao.innerHTML = "♡";
                                            } else {
                                                    quantidade++;
                                                            botao.dataset.curtido = "true";
                                                                    botao.innerHTML = "❤️";
                                                                        }

                                                                            curtidas.dataset.total = quantidade;
                                                                                curtidas.textContent = quantidade + " curtidas";
                                                                                }

                                                                                function comentar(botao) {
                                                                                    const post = botao.closest(".post");
                                                                                        const campo = post.querySelector(".comentario");

                                                                                            campo.focus();

                                                                                                campo.onkeydown = function(event) {
                                                                                                        if (event.key === "Enter") {
                                                                                                                    if (campo.value.trim() !== "") {
                                                                                                                                    const novoComentario = document.createElement("p");
                                                                                                                                                    novoComentario.textContent =
                                                                                                                                                                        "Você: " + campo.value;

                                                                                                                                                                                        post.appendChild(novoComentario);
                                                                                                                                                                                                        campo.value = "";
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                };
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                
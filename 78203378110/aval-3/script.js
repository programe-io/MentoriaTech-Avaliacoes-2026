
document.addEventListener("DOMContentLoaded", function () {

    // Função de curtir
        window.curtir = function (botao) {
                const post = botao.closest(".post");
                        const contador = post.querySelector(".likes");

                                if (!contador) return;

                                        let quantidade = Number(contador.textContent);

                                                if (botao.classList.contains("curtido")) {
                                                            quantidade--;
                                                                        botao.classList.remove("curtido");
                                                                                    botao.textContent = "♡";
                                                                                            } else {
                                                                                                        quantidade++;
                                                                                                                    botao.classList.add("curtido");
                                                                                                                                botao.textContent = "♥";
                                                                                                                                        }

                                                                                                                                                contador.textContent = quantidade;
                                                                                                                                                    };

                                                                                                                                                        // Função de comentar
                                                                                                                                                            window.comentar = function (botao) {
                                                                                                                                                                    const post = botao.closest(".post");

                                                                                                                                                                            const campo = post.querySelector("input");
                                                                                                                                                                                    const comentarios = post.querySelector(".comentarios");

                                                                                                                                                                                            if (!campo || !comentarios) return;

                                                                                                                                                                                                    const texto = campo.value.trim();

                                                                                                                                                                                                            if (texto === "") {
                                                                                                                                                                                                                        alert("Digite um comentário!");
                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                    const novoComentario = document.createElement("p");

                                                                                                                                                                                                                                                            novoComentario.textContent = "💬 " + texto;

                                                                                                                                                                                                                                                                    comentarios.appendChild(novoComentario);

                                                                                                                                                                                                                                                                            campo.value = "";
                                                                                                                                                                                                                                                                                };

                                                                                                                                                                                                                                                                                    // Focar no campo de comentário
                                                                                                                                                                                                                                                                                        window.focarComentario = function (botao) {
                                                                                                                                                                                                                                                                                                const post = botao.closest(".post");
                                                                                                                                                                                                                                                                                                        const campo = post.querySelector("input");

                                                                                                                                                                                                                                                                                                                if (campo) {
                                                                                                                                                                                                                                                                                                                            campo.focus();
                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                        };

                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                        
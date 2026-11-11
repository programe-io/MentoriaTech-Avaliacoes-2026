
function curtir(botao) {
    const post = botao.closest(".post");
        const likes = post.querySelector(".likes");

            let quantidade = Number(likes.dataset.quantidade || 0);

                if (botao.innerHTML === "♡") {
                        botao.innerHTML = "❤️";
                                quantidade++;
                                    } else {
                                            botao.innerHTML = "♡";
                                                    quantidade--;
                                                        }

                                                            likes.dataset.quantidade = quantidade;
                                                                likes.innerHTML = quantidade + 
                                                                        (quantidade === 1 ? " curtida" : " curtidas");
                                                                        }

                                                                        function comentar(botao) {
                                                                            const post = botao.closest(".post");
                                                                                const comentarios = post.querySelector(".comments");

                                                                                    const texto = prompt("Digite seu comentário:");

                                                                                        if (texto && texto.trim() !== "") {
                                                                                                const novoComentario = document.createElement("p");
                                                                                                        novoComentario.textContent = "Você: " + texto;

                                                                                                                comentarios.appendChild(novoComentario);
                                                                                                                    }
                                                                                                                    }
                                                                                                                    
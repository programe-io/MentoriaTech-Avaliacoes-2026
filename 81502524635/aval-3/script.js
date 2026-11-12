
// Curtir e descurtir publicações
function curtir(botao) {
    if (botao.textContent === "♡ Curtir") {
            botao.textContent = "♥ Curtido";
                    botao.style.color = "red";
                        } else {
                                botao.textContent = "♡ Curtir";
                                        botao.style.color = "";
                                            }
                                            }

                                            // Seguir perfil
                                            function seguir() {
                                                const botao = document.getElementById("seguir");

                                                    if (botao.textContent === "Seguir") {
                                                            botao.textContent = "Seguindo";
                                                                } else {
                                                                        botao.textContent = "Seguir";
                                                                            }
                                                                            }

                                                                            // Criar publicação
                                                                            function publicar() {
                                                                                const texto = document.getElementById("novaPublicacao");
                                                                                    const feed = document.getElementById("feed");

                                                                                        if (texto.value.trim() === "") {
                                                                                                alert("Digite alguma coisa antes de publicar!");
                                                                                                        return;
                                                                                                            }

                                                                                                                const postagem = document.createElement("div");
                                                                                                                    postagem.className = "post";

                                                                                                                        const nome = document.createElement("h3");
                                                                                                                            nome.textContent = "Letícia";

                                                                                                                                const conteudo = document.createElement("p");
                                                                                                                                    conteudo.textContent = texto.value;

                                                                                                                                        const botao = document.createElement("button");
                                                                                                                                            botao.textContent = "♡ Curtir";
                                                                                                                                                botao.onclick = function () {
                                                                                                                                                        curtir(botao);
                                                                                                                                                            };

                                                                                                                                                                postagem.appendChild(nome);
                                                                                                                                                                    postagem.appendChild(conteudo);
                                                                                                                                                                        postagem.appendChild(botao);

                                                                                                                                                                            feed.prepend(postagem);

                                                                                                                                                                                texto.value = "";
                                                                                                                                                                                }

                                                                                                                                                                                // Comentar publicação
                                                                                                                                                                                function comentar() {
                                                                                                                                                                                    const comentario = prompt("Digite seu comentário:");

                                                                                                                                                                                        if (comentario && comentario.trim() !== "") {
                                                                                                                                                                                                alert("Comentário adicionado: " + comentario);
                                                                                                                                                                                                    }
                                                                                                                                                                                                    }
                                                                                                                                                                                                    
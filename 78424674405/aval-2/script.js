function publicar() {
        const nome = document.getElementById("nome").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

                if (nome === "" || mensagem === "") {
                        alert("Preencha seu nome e sua publicação!");
                                return;
                                    }

                                        const feed = document.getElementById("feed");

                                            const post = document.createElement("article");
                                                post.className = "post";

                                                    const titulo = document.createElement("h3");
                                                        titulo.textContent = nome;

                                                            const texto = document.createElement("p");
                                                                texto.textContent = mensagem;

                                                                    const botao = document.createElement("button");
                                                                        botao.textContent = "♡ Curtir (0)";
                                                                            botao.onclick = function () {
                                                                                    curtir(botao);
                                                                                        };

                                                                                            post.appendChild(titulo);
                                                                                                post.appendChild(texto);
                                                                                                    post.appendChild(botao);

                                                                                                        feed.prepend(post);

                                                                                                            document.getElementById("nome").value = "";
                                                                                                                document.getElementById("mensagem").value = "";
                                                                                                                }

                                                                                                                function curtir(botao) {
                                                                                                                    let curtidas = Number(
                                                                                                                            botao.textContent.match(/\d+/)[0]
                                                                                                                                );

                                                                                                                                    if (botao.dataset.curtido === "sim") {
                                                                                                                                            curtidas--;
                                                                                                                                                    botao.dataset.curtido = "nao";
                                                                                                                                                            botao.textContent = "♡ Curtir (" + curtidas + ")";
                                                                                                                                                                } else {
                                                                                                                                                                        curtidas++;
                                                                                                                                                                                botao.dataset.curtido = "sim";
                                                                                                                                                                                        botao.textContent = "♥ Curtido (" + curtidas + ")";
                                                                                                                                                                                            }
                                                                                                                                                                                            }
}
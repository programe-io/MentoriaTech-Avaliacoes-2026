
function publicar() {
    let nome = document.getElementById("nome").value.trim();
        let mensagem = document.getElementById("mensagem").value.trim();

            if (nome === "" || mensagem === "") {
                    alert("Preencha seu nome e sua publicação!");
                            return;
                                }

                                    let feed = document.getElementById("publicacoes");

                                        let post = document.createElement("div");
                                            post.className = "post";

                                                let titulo = document.createElement("h3");
                                                    titulo.textContent = nome;

                                                        let texto = document.createElement("p");
                                                            texto.textContent = mensagem;

                                                                let acoes = document.createElement("div");
                                                                    acoes.className = "acoes";

                                                                        let curtidas = 0;

                                                                            let botaoCurtir = document.createElement("button");
                                                                                botaoCurtir.className = "curtir";
                                                                                    botaoCurtir.textContent = "Curtir (0)";

                                                                                        botaoCurtir.onclick = function() {
                                                                                                curtidas++;
                                                                                                        botaoCurtir.textContent = "Curtir (" + curtidas + ")";
                                                                                                            };

                                                                                                                let botaoExcluir = document.createElement("button");
                                                                                                                    botaoExcluir.className = "excluir";
                                                                                                                        botaoExcluir.textContent = "Excluir";

                                                                                                                            botaoExcluir.onclick = function() {
                                                                                                                                    post.remove();
                                                                                                                                        };

                                                                                                                                            acoes.appendChild(botaoCurtir);
                                                                                                                                                acoes.appendChild(botaoExcluir);

                                                                                                                                                    post.appendChild(titulo);
                                                                                                                                                        post.appendChild(texto);
                                                                                                                                                            post.appendChild(acoes);

                                                                                                                                                                feed.prepend(post);

                                                                                                                                                                    document.getElementById("nome").value = "";
                                                                                                                                                                        document.getElementById("mensagem").value = "";
                                                                                                                                                                        }
                                                                                                                                                                        
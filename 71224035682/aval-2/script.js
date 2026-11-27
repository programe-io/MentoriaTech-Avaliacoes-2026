
function publicar() {
    let nome = document.getElementById("nome").value;
        let mensagem = document.getElementById("mensagem").value;

            if (nome.trim() === "" || mensagem.trim() === "") {
                    alert("Preencha seu nome e sua mensagem!");
                            return;
                                }

                                    let postagens = document.getElementById("postagens");

                                        let novoPost = document.createElement("div");
                                            novoPost.className = "post";

                                                let titulo = document.createElement("h3");
                                                    titulo.textContent = nome;

                                                        let texto = document.createElement("p");
                                                            texto.textContent = mensagem;

                                                                let botao = document.createElement("button");
                                                                    botao.textContent = "❤️ Curtir ";

                                                                        let contador = document.createElement("span");
                                                                            contador.textContent = "0";

                                                                                botao.onclick = function() {
                                                                                        curtir(botao);
                                                                                            };

                                                                                                botao.appendChild(contador);

                                                                                                    novoPost.appendChild(titulo);
                                                                                                        novoPost.appendChild(texto);
                                                                                                            novoPost.appendChild(botao);

                                                                                                                postagens.prepend(novoPost);

                                                                                                                    document.getElementById("nome").value = "";
                                                                                                                        document.getElementById("mensagem").value = "";
                                                                                                                        }

                                                                                                                        function curtir(botao) {
                                                                                                                            let contador = botao.querySelector("span");
                                                                                                                                contador.textContent = Number(contador.textContent) + 1;
                                                                                                                                }
                                                                                                                                
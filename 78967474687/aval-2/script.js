
function curtir(botao) {
    let contador = botao.querySelector("span");

        contador.textContent =
                Number(contador.textContent) + 1;
                }

                function publicar() {
                    let nome = document.getElementById("nome").value;
                        let mensagem = document.getElementById("mensagem").value;

                            if (nome.trim() === "" || mensagem.trim() === "") {
                                    alert("Preencha seu nome e sua publicação!");
                                            return;
                                                }

                                                    let post = document.createElement("article");
                                                        post.className = "post";

                                                            let titulo = document.createElement("h3");
                                                                titulo.textContent = nome;

                                                                    let texto = document.createElement("p");
                                                                        texto.textContent = mensagem;

                                                                            let botao = document.createElement("button");
                                                                                botao.innerHTML = '❤️ Curtir <span>0</span>';

                                                                                    botao.onclick = function() {
                                                                                            curtir(botao);
                                                                                                };

                                                                                                    post.appendChild(titulo);
                                                                                                        post.appendChild(texto);
                                                                                                            post.appendChild(botao);

                                                                                                                document.getElementById("feed").prepend(post);

                                                                                                                    document.getElementById("nome").value = "";
                                                                                                                        document.getElementById("mensagem").value = "";

                                                                                                                            alert("Publicação realizada!");
                                                                                                                            }
                                                                                                                            
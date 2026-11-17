
function publicar() {
    const usuario = document.getElementById("usuario").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

            if (usuario === "" || mensagem === "") {
                    alert("Preencha seu nome e sua publicação!");
                            return;
                                }

                                    const publicacoes = document.getElementById("publicacoes");

                                        const post = document.createElement("article");
                                            post.className = "post";

                                                const nome = document.createElement("h3");
                                                    nome.textContent = usuario;

                                                        const texto = document.createElement("p");
                                                            texto.textContent = mensagem;

                                                                const botao = document.createElement("button");
                                                                    botao.innerHTML = '❤️ Curtir <span>0</span>';

                                                                        botao.addEventListener("click", function() {
                                                                                curtir(botao);
                                                                                    });

                                                                                        post.appendChild(nome);
                                                                                            post.appendChild(texto);
                                                                                                post.appendChild(botao);

                                                                                                    publicacoes.prepend(post);

                                                                                                        document.getElementById("usuario").value = "";
                                                                                                            document.getElementById("mensagem").value = "";
                                                                                                            }

                                                                                                            function curtir(botao) {
                                                                                                                const contador = botao.querySelector("span");
                                                                                                                    let curtidas = Number(contador.textContent);

                                                                                                                        curtidas++;

                                                                                                                            contador.textContent = curtidas;
                                                                                                                            }
                                                                                                                            
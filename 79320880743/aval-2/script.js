
let posts = [];

function publicar() {
    const nome = document.getElementById("nome").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

            if (nome === "" || mensagem === "") {
                    alert("Preencha seu nome e sua publicação!");
                            return;
                                }

                                    const novoPost = {
                                            nome: nome,
                                                    mensagem: mensagem,
                                                            curtidas: 0
                                                                };

                                                                    posts.unshift(novoPost);

                                                                        document.getElementById("nome").value = "";
                                                                            document.getElementById("mensagem").value = "";

                                                                                mostrarPosts();
                                                                                }

                                                                                function curtir(index) {
                                                                                    posts[index].curtidas++;
                                                                                        mostrarPosts();
                                                                                        }

                                                                                        function mostrarPosts() {
                                                                                            const publicacoes = document.getElementById("publicacoes");

                                                                                                publicacoes.innerHTML = "";

                                                                                                    posts.forEach((post, index) => {
                                                                                                            const div = document.createElement("div");
                                                                                                                    div.className = "post";

                                                                                                                            const nome = document.createElement("h3");
                                                                                                                                    nome.textContent = post.nome;

                                                                                                                                            const texto = document.createElement("p");
                                                                                                                                                    texto.textContent = post.mensagem;

                                                                                                                                                            const curtidas = document.createElement("small");
                                                                                                                                                                    curtidas.textContent = "❤️ " + post.curtidas + " curtidas";

                                                                                                                                                                            const botao = document.createElement("button");
                                                                                                                                                                                    botao.textContent = "Curtir ❤️";
                                                                                                                                                                                            botao.addEventListener("click", () => curtir(index));

                                                                                                                                                                                                    div.append(nome, texto, curtidas, botao);
                                                                                                                                                                                                            publicacoes.appendChild(div);
                                                                                                                                                                                                                });
                                                                                                                                                                                                                }
                                                                                                                                                                                                                

const feed = document.getElementById("feed");

const nome = document.getElementById("nome");
const texto = document.getElementById("texto");
const publicar = document.getElementById("publicar");

// Criar publicação
publicar.addEventListener("click", () => {

    const usuario = nome.value.trim();
        const mensagem = texto.value.trim();

            if (!usuario || !mensagem) {
                    alert("Preencha seu nome e sua publicação!");
                            return;
                                }

                                    const post = document.createElement("article");
                                        post.className = "post";

                                            const cabecalho = document.createElement("div");
                                                cabecalho.className = "usuario";

                                                    const avatar = document.createElement("div");
                                                        avatar.className = "avatar";
                                                            avatar.textContent = usuario[0].toUpperCase();

                                                                const info = document.createElement("div");

                                                                    const titulo = document.createElement("h3");
                                                                        titulo.textContent = usuario;

                                                                            const horario = document.createElement("small");
                                                                                horario.textContent = "Agora";

                                                                                    info.append(titulo, horario);
                                                                                        cabecalho.append(avatar, info);

                                                                                            const mensagemPost = document.createElement("p");
                                                                                                mensagemPost.textContent = mensagem;

                                                                                                    const acoes = document.createElement("div");
                                                                                                        acoes.className = "acoes";

                                                                                                            const curtir = document.createElement("button");
                                                                                                                curtir.className = "curtir";
                                                                                                                    curtir.innerHTML = "❤️ Curtir <span>0</span>";

                                                                                                                        const comentar = document.createElement("button");
                                                                                                                            comentar.className = "comentar";
                                                                                                                                comentar.textContent = "💬 Comentar";

                                                                                                                                    const comentarios = document.createElement("div");
                                                                                                                                        comentarios.className = "comentarios";

                                                                                                                                            acoes.append(curtir, comentar);

                                                                                                                                                post.append(
                                                                                                                                                        cabecalho,
                                                                                                                                                                mensagemPost,
                                                                                                                                                                        acoes,
                                                                                                                                                                                comentarios
                                                                                                                                                                                    );

                                                                                                                                                                                        feed.prepend(post);

                                                                                                                                                                                            nome.value = "";
                                                                                                                                                                                                texto.value = "";
                                                                                                                                                                                                });

                                                                                                                                                                                                // Curtir e comentar
                                                                                                                                                                                                feed.addEventListener("click", (event) => {

                                                                                                                                                                                                    const botao = event.target.closest("button");

                                                                                                                                                                                                        if (!botao) return;

                                                                                                                                                                                                            // Curtir
                                                                                                                                                                                                                if (botao.classList.contains("curtir")) {

                                                                                                                                                                                                                        const quantidade = botao.querySelector("span");
                                                                                                                                                                                                                                let total = Number(quantidade.textContent);

                                                                                                                                                                                                                                        if (botao.classList.toggle("liked")) {
                                                                                                                                                                                                                                                    total++;
                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                        total--;
                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                        quantidade.textContent = total;
                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                // Comentar
                                                                                                                                                                                                                                                                                                    if (botao.classList.contains("comentar")) {

                                                                                                                                                                                                                                                                                                            const post = botao.closest(".post");
                                                                                                                                                                                                                                                                                                                    const comentarios = post.querySelector(".comentarios");

                                                                                                                                                                                                                                                                                                                            const comentario = prompt("Digite seu comentário:");

                                                                                                                                                                                                                                                                                                                                    if (comentario && comentario.trim()) {

                                                                                                                                                                                                                                                                                                                                                const novoComentario = document.createElement("div");
                                                                                                                                                                                                                                                                                                                                                            novoComentario.className = "comentario";

                                                                                                                                                                                                                                                                                                                                                                        novoComentario.textContent = comentario.trim();

                                                                                                                                                                                                                                                                                                                                                                                    comentarios.appendChild(novoComentario);
                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                
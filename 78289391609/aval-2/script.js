
/* Criar publicação */
function publicar() {
    const nome = document.getElementById("nome").value.trim();
        const texto = document.getElementById("texto").value.trim();

            if (nome === "" || texto === "") {
                    alert("Preencha seu nome e sua publicação!");
                            return;
                                }

                                    const post = document.createElement("article");
                                        post.className = "post";

                                            const titulo = document.createElement("h3");
                                                titulo.textContent = nome;

                                                    const mensagem = document.createElement("p");
                                                        mensagem.textContent = texto;

                                                            const acoes = document.createElement("div");
                                                                acoes.className = "post-actions";

                                                                    const curtirBtn = document.createElement("button");
                                                                        curtirBtn.textContent = "♡ Curtir";
                                                                            curtirBtn.onclick = () => curtir(curtirBtn);

                                                                                const comentarBtn = document.createElement("button");
                                                                                    comentarBtn.textContent = "💬 Comentar";
                                                                                        comentarBtn.onclick = () => mostrarComentario(comentarBtn);

                                                                                            acoes.appendChild(curtirBtn);
                                                                                                acoes.appendChild(comentarBtn);

                                                                                                    const comentarios = document.createElement("div");
                                                                                                        comentarios.className = "comentarios";

                                                                                                            post.appendChild(titulo);
                                                                                                                post.appendChild(mensagem);
                                                                                                                    post.appendChild(acoes);
                                                                                                                        post.appendChild(comentarios);

                                                                                                                            document.getElementById("feed").prepend(post);

                                                                                                                                document.getElementById("nome").value = "";
                                                                                                                                    document.getElementById("texto").value = "";
                                                                                                                                    }

                                                                                                                                    /* Curtir publicação */
                                                                                                                                    function curtir(botao) {
                                                                                                                                        if (botao.dataset.liked === "true") {
                                                                                                                                                botao.dataset.liked = "false";
                                                                                                                                                        botao.textContent = "♡ Curtir";
                                                                                                                                                            } else {
                                                                                                                                                                    botao.dataset.liked = "true";
                                                                                                                                                                            botao.textContent = "♥ Curtido";
                                                                                                                                                                                }
                                                                                                                                                                                }

                                                                                                                                                                                /* Mostrar campo de comentário */
                                                                                                                                                                                function mostrarComentario(botao) {
                                                                                                                                                                                    const post = botao.closest(".post");
                                                                                                                                                                                        const area = post.querySelector(".comentarios");

                                                                                                                                                                                            if (area.querySelector(".comment-input")) {
                                                                                                                                                                                                    return;
                                                                                                                                                                                                        }

                                                                                                                                                                                                            const div = document.createElement("div");
                                                                                                                                                                                                                div.className = "comment-input";

                                                                                                                                                                                                                    const input = document.createElement("input");
                                                                                                                                                                                                                        input.type = "text";
                                                                                                                                                                                                                            input.placeholder = "Escreva um comentário...";

                                                                                                                                                                                                                                const enviar = document.createElement("button");
                                                                                                                                                                                                                                    enviar.textContent = "Enviar";

                                                                                                                                                                                                                                        enviar.onclick = function () {
                                                                                                                                                                                                                                                const texto = input.value.trim();

                                                                                                                                                                                                                                                        if (texto === "") {
                                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                    const comentario = document.createElement("div");
                                                                                                                                                                                                                                                                                            comentario.className = "comentario";

                                                                                                                                                                                                                                                                                                    const nome = document.createElement("strong");
                                                                                                                                                                                                                                                                                                            nome.textContent = "Você: ";

                                                                                                                                                                                                                                                                                                                    const mensagem = document.createElement("span");
                                                                                                                                                                                                                                                                                                                            mensagem.textContent = texto;

                                                                                                                                                                                                                                                                                                                                    comentario.appendChild(nome);
                                                                                                                                                                                                                                                                                                                                            comentario.appendChild(mensagem);

                                                                                                                                                                                                                                                                                                                                                    area.appendChild(comentario);
                                                                                                                                                                                                                                                                                                                                                            div.remove();
                                                                                                                                                                                                                                                                                                                                                                };

                                                                                                                                                                                                                                                                                                                                                                    div.appendChild(input);
                                                                                                                                                                                                                                                                                                                                                                        div.appendChild(enviar);

                                                                                                                                                                                                                                                                                                                                                                            area.appendChild(div);
                                                                                                                                                                                                                                                                                                                                                                                input.focus();
                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                
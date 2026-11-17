
function publicar() {
    const nome = document.getElementById("nome").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

            if (nome === "" || mensagem === "") {
                    alert("Preencha seu nome e sua publicação!");
                            return;
                                }

                                    const post = document.createElement("article");
                                        post.className = "post";

                                            const titulo = document.createElement("h3");
                                                titulo.textContent = nome;

                                                    const texto = document.createElement("p");
                                                        texto.textContent = mensagem;

                                                            const curtirBtn = document.createElement("button");
                                                                curtirBtn.innerHTML = '❤️ Curtir <span>0</span>';
                                                                    curtirBtn.onclick = function() {
                                                                            curtir(this);
                                                                                };

                                                                                    const comentarBtn = document.createElement("button");
                                                                                        comentarBtn.textContent = "💬 Comentar";
                                                                                            comentarBtn.onclick = function() {
                                                                                                    comentar(this);
                                                                                                        };

                                                                                                            const comentarios = document.createElement("div");
                                                                                                                comentarios.className = "comentarios";

                                                                                                                    post.append(titulo, texto, curtirBtn, comentarBtn, comentarios);

                                                                                                                        document.getElementById("posts").prepend(post);

                                                                                                                            document.getElementById("nome").value = "";
                                                                                                                                document.getElementById("mensagem").value = "";
                                                                                                                                }

                                                                                                                                function curtir(botao) {
                                                                                                                                    const contador = botao.querySelector("span");
                                                                                                                                        contador.textContent = Number(contador.textContent) + 1;
                                                                                                                                        }

                                                                                                                                        function comentar(botao) {
                                                                                                                                            const comentario = prompt("Digite seu comentário:");

                                                                                                                                                if (comentario && comentario.trim() !== "") {
                                                                                                                                                        const novoComentario = document.createElement("p");
                                                                                                                                                                novoComentario.textContent = "💬 " + comentario;

                                                                                                                                                                        botao.parentElement
                                                                                                                                                                                    .querySelector(".comentarios")
                                                                                                                                                                                                .appendChild(novoComentario);
                                                                                                                                                                                                    }
                                                                                                                                                                                                    }
                                                                                                                                                                                                    
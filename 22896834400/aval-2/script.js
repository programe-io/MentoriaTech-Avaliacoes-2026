
function publicar() {
    let nome = document.getElementById("nome").value.trim();
        let mensagem = document.getElementById("mensagem").value.trim();

            if (nome === "" || mensagem === "") {
                    alert("Preencha seu nome e sua publicação!");
                            return;
                                }

                                    let post = document.createElement("article");
                                        post.className = "post";

                                            let titulo = document.createElement("h3");
                                                titulo.textContent = "👤 " + nome;

                                                    let texto = document.createElement("p");
                                                        texto.textContent = mensagem;

                                                            let curtir = document.createElement("button");
                                                                curtir.textContent = "❤️ Curtir 0";
                                                                    curtir.onclick = function() {
                                                                            let numero = Number(this.dataset.likes || 0) + 1;
                                                                                    this.dataset.likes = numero;
                                                                                            this.textContent = "❤️ Curtir " + numero;
                                                                                                };

                                                                                                    let campo = document.createElement("input");
                                                                                                        campo.className = "comentario";
                                                                                                            campo.placeholder = "Escreva um comentário...";

                                                                                                                let botao = document.createElement("button");
                                                                                                                    botao.textContent = "Comentar";
                                                                                                                        botao.onclick = function() {
                                                                                                                                let valor = campo.value.trim();

                                                                                                                                        if (valor === "") return;

                                                                                                                                                let comentario = document.createElement("p");
                                                                                                                                                        comentario.textContent = "💬 " + valor;

                                                                                                                                                                lista.appendChild(comentario);
                                                                                                                                                                        campo.value = "";
                                                                                                                                                                            };

                                                                                                                                                                                let lista = document.createElement("div");
                                                                                                                                                                                    lista.className = "comentarios";

                                                                                                                                                                                        post.append(titulo, texto, curtir, campo, botao, lista);

                                                                                                                                                                                            document.getElementById("publicacoes")
                                                                                                                                                                                                    .prepend(post);

                                                                                                                                                                                                        document.getElementById("nome").value = "";
                                                                                                                                                                                                            document.getElementById("mensagem").value = "";
                                                                                                                                                                                                            }

                                                                                                                                                                                                            function curtir(botao) {
                                                                                                                                                                                                                let numero = Number(botao.dataset.likes || 0) + 1;
                                                                                                                                                                                                                    botao.dataset.likes = numero;
                                                                                                                                                                                                                        botao.textContent = "❤️ Curtir " + numero;
                                                                                                                                                                                                                        }

                                                                                                                                                                                                                        function comentar(botao) {
                                                                                                                                                                                                                            let post = botao.closest(".post");
                                                                                                                                                                                                                                let campo = post.querySelector(".comentario");
                                                                                                                                                                                                                                    let lista = post.querySelector(".comentarios");

                                                                                                                                                                                                                                        if (campo.value.trim() === "") return;

                                                                                                                                                                                                                                            let comentario = document.createElement("p");
                                                                                                                                                                                                                                                comentario.textContent = "💬 " + campo.value.trim();

                                                                                                                                                                                                                                                    lista.appendChild(comentario);
                                                                                                                                                                                                                                                        campo.value = "";
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                        
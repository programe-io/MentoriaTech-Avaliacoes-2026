
/* Criar uma nova publicação */
function publicar() {
    const campo = document.getElementById("textoPost");
        const texto = campo.value.trim();

            if (texto === "") {
                    alert("Digite algo antes de publicar!");
                            return;
                                }

                                    const post = document.createElement("article");
                                        post.className = "post";

                                            const autor = document.createElement("p");
                                                autor.className = "autor";
                                                    autor.textContent = "Você";

                                                        const conteudo = document.createElement("p");
                                                            conteudo.textContent = texto;

                                                                const acoes = document.createElement("div");
                                                                    acoes.className = "acoes";

                                                                        const botaoCurtir = document.createElement("button");
                                                                            botaoCurtir.textContent = "♡ Curtir (0)";
                                                                                botaoCurtir.onclick = function() {
                                                                                        curtir(botaoCurtir);
                                                                                            };

                                                                                                const botaoComentar = document.createElement("button");
                                                                                                    botaoComentar.textContent = "Comentar";
                                                                                                        botaoComentar.onclick = function() {
                                                                                                                comentar(botaoComentar);
                                                                                                                    };

                                                                                                                        const comentarios = document.createElement("div");
                                                                                                                            comentarios.className = "comentarios";

                                                                                                                                acoes.append(botaoCurtir, botaoComentar, comentarios);
                                                                                                                                    post.append(autor, conteudo, acoes);

                                                                                                                                        document.getElementById("feed").prepend(post);

                                                                                                                                            campo.value = "";
                                                                                                                                            }

                                                                                                                                            /* Curtir e descurtir publicações */
                                                                                                                                            function curtir(botao) {
                                                                                                                                                let quantidade = Number(
                                                                                                                                                        botao.textContent.match(/\d+/)[0]
                                                                                                                                                            );

                                                                                                                                                                if (botao.dataset.curtido === "sim") {
                                                                                                                                                                        quantidade--;
                                                                                                                                                                                botao.dataset.curtido = "nao";
                                                                                                                                                                                        botao.textContent = "♡ Curtir (" + quantidade + ")";
                                                                                                                                                                                            } else {
                                                                                                                                                                                                    quantidade++;
                                                                                                                                                                                                            botao.dataset.curtido = "sim";
                                                                                                                                                                                                                    botao.textContent = "♥ Curtido (" + quantidade + ")";
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                        }

                                                                                                                                                                                                                        /* Adicionar comentários */
                                                                                                                                                                                                                        function comentar(botao) {
                                                                                                                                                                                                                            const texto = prompt("Digite seu comentário:");

                                                                                                                                                                                                                                if (texto && texto.trim() !== "") {
                                                                                                                                                                                                                                        const comentarios = botao.parentElement
                                                                                                                                                                                                                                                    .querySelector(".comentarios");

                                                                                                                                                                                                                                                            const comentario = document.createElement("div");
                                                                                                                                                                                                                                                                    comentario.className = "comentario";
                                                                                                                                                                                                                                                                            comentario.textContent = "Você: " + texto.trim();

                                                                                                                                                                                                                                                                                    comentarios.appendChild(comentario);
                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                        }
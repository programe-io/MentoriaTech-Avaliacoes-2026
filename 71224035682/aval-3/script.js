
function curtir(botao) {
    let post = botao.closest(".post");
        let curtidas = post.querySelector(".curtidas");

            let quantidade = Number(
                    curtidas.textContent.split(" ")[0]
                        );

                            if (botao.textContent === "♡") {
                                    quantidade++;
                                            botao.textContent = "❤️";
                                                } else {
                                                        quantidade--;
                                                                botao.textContent = "♡";
                                                                    }

                                                                        curtidas.textContent = quantidade + " curtidas";
                                                                        }

                                                                        function comentar(botao) {
                                                                            let post = botao.closest(".post");
                                                                                let comentarios = post.querySelector(".comentarios");

                                                                                    let texto = prompt("Digite seu comentário:");

                                                                                        if (texto && texto.trim() !== "") {
                                                                                                let novoComentario = document.createElement("p");
                                                                                                        novoComentario.textContent = "Você: " + texto;

                                                                                                                comentarios.appendChild(novoComentario);
                                                                                                                    }
                                                                                                                    }

                                                                                                                    function novaPublicacao() {
                                                                                                                        let usuario = document.getElementById("usuario").value;
                                                                                                                            let legenda = document.getElementById("legenda").value;

                                                                                                                                if (usuario.trim() === "" || legenda.trim() === "") {
                                                                                                                                        alert("Preencha todos os campos!");
                                                                                                                                                return;
                                                                                                                                                    }

                                                                                                                                                        let feed = document.querySelector(".feed");

                                                                                                                                                            let post = document.createElement("div");
                                                                                                                                                                post.className = "post";

                                                                                                                                                                    let cabecalho = document.createElement("div");
                                                                                                                                                                        cabecalho.className = "usuario";

                                                                                                                                                                            let nome = document.createElement("strong");
                                                                                                                                                                                nome.textContent = usuario;

                                                                                                                                                                                    cabecalho.appendChild(nome);

                                                                                                                                                                                        let acoes = document.createElement("div");
                                                                                                                                                                                            acoes.className = "acoes";

                                                                                                                                                                                                let curtirBotao = document.createElement("button");
                                                                                                                                                                                                    curtirBotao.textContent = "♡";
                                                                                                                                                                                                        curtirBotao.onclick = function() {
                                                                                                                                                                                                                curtir(curtirBotao);
                                                                                                                                                                                                                    };

                                                                                                                                                                                                                        let comentarBotao = document.createElement("button");
                                                                                                                                                                                                                            comentarBotao.textContent = "💬";
                                                                                                                                                                                                                                comentarBotao.onclick = function() {
                                                                                                                                                                                                                                        comentar(comentarBotao);
                                                                                                                                                                                                                                            };

                                                                                                                                                                                                                                                acoes.appendChild(curtirBotao);
                                                                                                                                                                                                                                                    acoes.appendChild(comentarBotao);

                                                                                                                                                                                                                                                        let curtidas = document.createElement("p");
                                                                                                                                                                                                                                                            curtidas.className = "curtidas";
                                                                                                                                                                                                                                                                curtidas.textContent = "0 curtidas";

                                                                                                                                                                                                                                                                    let descricao = document.createElement("p");
                                                                                                                                                                                                                                                                        descricao.textContent = usuario + ": " + legenda;

                                                                                                                                                                                                                                                                            let comentarios = document.createElement("div");
                                                                                                                                                                                                                                                                                comentarios.className = "comentarios";

                                                                                                                                                                                                                                                                                    post.appendChild(cabecalho);
                                                                                                                                                                                                                                                                                        post.appendChild(acoes);
                                                                                                                                                                                                                                                                                            post.appendChild(curtidas);
                                                                                                                                                                                                                                                                                                post.appendChild(descricao);
                                                                                                                                                                                                                                                                                                    post.appendChild(comentarios);

                                                                                                                                                                                                                                                                                                        feed.prepend(post);

                                                                                                                                                                                                                                                                                                            document.getElementById("usuario").value = "";
                                                                                                                                                                                                                                                                                                                document.getElementById("legenda").value = "";
                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                
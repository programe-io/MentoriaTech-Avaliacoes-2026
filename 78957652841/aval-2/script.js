
function curtir(botao) {
    let contador = botao.nextElementSibling;

        let curtidas = Number(
                contador.dataset.curtidas || 0
                    );

                        curtidas++;

                            contador.dataset.curtidas = curtidas;
                                contador.textContent = curtidas + " curtidas";

                                    botao.textContent = "❤️ Curtido!";
                                    }

                                    function comentar(botao) {
                                        let area = botao.parentElement;
                                            let campo = area.querySelector("input");
                                                let lista = area.querySelector(".lista-comentarios");

                                                    if (campo.value.trim() === "") {
                                                            alert("Escreva um comentário!");
                                                                    return;
                                                                        }

                                                                            let comentario = document.createElement("p");
                                                                                comentario.textContent = campo.value;

                                                                                    lista.appendChild(comentario);
                                                                                        campo.value = "";
                                                                                        }

                                                                                        function publicar() {
                                                                                            let usuario = document.getElementById("usuario").value;
                                                                                                let legenda = document.getElementById("legenda").value;
                                                                                                    let imagem = document.getElementById("imagem").value;

                                                                                                        if (!usuario.trim() || !legenda.trim()) {
                                                                                                                alert("Preencha seu nome e sua publicação!");
                                                                                                                        return;
                                                                                                                            }

                                                                                                                                if (imagem.trim()) {
                                                                                                                                        try {
                                                                                                                                                    let endereco = new URL(imagem);

                                                                                                                                                                if (!["http:", "https:"].includes(endereco.protocol)) {
                                                                                                                                                                                alert("Use um link válido de imagem!");
                                                                                                                                                                                                return;
                                                                                                                                                                                                            }
                                                                                                                                                                                                                    } catch {
                                                                                                                                                                                                                                alert("Digite um link válido de imagem!");
                                                                                                                                                                                                                                            return;
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                            let feed = document.getElementById("feed");

                                                                                                                                                                                                                                                                let post = document.createElement("article");
                                                                                                                                                                                                                                                                    post.className = "post";

                                                                                                                                                                                                                                                                        let titulo = document.createElement("h3");
                                                                                                                                                                                                                                                                            titulo.textContent = usuario;

                                                                                                                                                                                                                                                                                let texto = document.createElement("p");
                                                                                                                                                                                                                                                                                    texto.textContent = legenda;

                                                                                                                                                                                                                                                                                        let botao = document.createElement("button");
                                                                                                                                                                                                                                                                                            botao.textContent = "❤️ Curtir";
                                                                                                                                                                                                                                                                                                botao.onclick = function() {
                                                                                                                                                                                                                                                                                                        curtir(botao);
                                                                                                                                                                                                                                                                                                            };

                                                                                                                                                                                                                                                                                                                let contador = document.createElement("span");
                                                                                                                                                                                                                                                                                                                    contador.textContent = "0 curtidas";
                                                                                                                                                                                                                                                                                                                        contador.dataset.curtidas = 0;

                                                                                                                                                                                                                                                                                                                            let comentarios = document.createElement("div");
                                                                                                                                                                                                                                                                                                                                comentarios.className = "comentarios";

                                                                                                                                                                                                                                                                                                                                    let campo = document.createElement("input");
                                                                                                                                                                                                                                                                                                                                        campo.placeholder = "Escreva um comentário...";

                                                                                                                                                                                                                                                                                                                                            let enviar = document.createElement("button");
                                                                                                                                                                                                                                                                                                                                                enviar.textContent = "Enviar";
                                                                                                                                                                                                                                                                                                                                                    enviar.onclick = function() {
                                                                                                                                                                                                                                                                                                                                                            comentar(enviar);
                                                                                                                                                                                                                                                                                                                                                                };

                                                                                                                                                                                                                                                                                                                                                                    let lista = document.createElement("div");
                                                                                                                                                                                                                                                                                                                                                                        lista.className = "lista-comentarios";

                                                                                                                                                                                                                                                                                                                                                                            comentarios.append(campo, enviar, lista);

                                                                                                                                                                                                                                                                                                                                                                                post.append(titulo);

                                                                                                                                                                                                                                                                                                                                                                                    if (imagem.trim()) {
                                                                                                                                                                                                                                                                                                                                                                                            let foto = document.createElement("img");
                                                                                                                                                                                                                                                                                                                                                                                                    foto.src = imagem;
                                                                                                                                                                                                                                                                                                                                                                                                            foto.alt = "Imagem da publicação";
                                                                                                                                                                                                                                                                                                                                                                                                                    post.appendChild(foto);
                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                            post.append(texto, botao, contador, comentarios);

                                                                                                                                                                                                                                                                                                                                                                                                                                feed.prepend(post);

                                                                                                                                                                                                                                                                                                                                                                                                                                    document.getElementById("usuario").value = "";
                                                                                                                                                                                                                                                                                                                                                                                                                                        document.getElementById("legenda").value = "";
                                                                                                                                                                                                                                                                                                                                                                                                                                            document.getElementById("imagem").value = "";
                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                            
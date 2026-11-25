
function curtir(botao) {
    let numero = botao.querySelector("span");
        let quantidade = Number(numero.textContent);

            if (botao.dataset.curtido === "sim") {
                    quantidade--;
                            botao.dataset.curtido = "nao";
                                } else {
                                        quantidade++;
                                                botao.dataset.curtido = "sim";
                                                    }

                                                        numero.textContent = quantidade;
                                                        }

                                                        function comentar(botao) {
                                                            let post = botao.closest(".post");
                                                                let campo = post.querySelector(".comentario");
                                                                    let lista = post.querySelector(".comentarios");

                                                                        if (!campo.value.trim()) return;

                                                                            let comentario = document.createElement("p");
                                                                                comentario.textContent = "💬 " + campo.value.trim();

                                                                                    lista.appendChild(comentario);
                                                                                        campo.value = "";
                                                                                        }

                                                                                        function focarComentario(botao) {
                                                                                            botao.closest(".post")
                                                                                                    .querySelector(".comentario").focus();
                                                                                                    }

                                                                                                    function publicar() {
                                                                                                        let nome = document.getElementById("nome").value.trim();
                                                                                                            let texto = document.getElementById("texto").value.trim();
                                                                                                                let imagem = document.getElementById("imagem").value.trim();

                                                                                                                    if (!nome || !texto) {
                                                                                                                            alert("Preencha seu nome e sua publicação!");
                                                                                                                                    return;
                                                                                                                                        }

                                                                                                                                            let post = document.createElement("article");
                                                                                                                                                post.className = "post";

                                                                                                                                                    let usuario = document.createElement("div");
                                                                                                                                                        usuario.className = "usuario";
                                                                                                                                                            usuario.textContent = "👤 " + nome;
                                                                                                                                                                post.appendChild(usuario);

                                                                                                                                                                    if (imagem) {
                                                                                                                                                                            try {
                                                                                                                                                                                        let url = new URL(imagem);
                                                                                                                                                                                                    if (url.protocol === "https:" || url.protocol === "http:") {
                                                                                                                                                                                                                    let foto = document.createElement("img");
                                                                                                                                                                                                                                    foto.src = url.href;
                                                                                                                                                                                                                                                    foto.alt = "Imagem da publicação";
                                                                                                                                                                                                                                                                    post.appendChild(foto);
                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                        } catch (e) {
                                                                                                                                                                                                                                                                                                    alert("Digite uma URL de imagem válida.");
                                                                                                                                                                                                                                                                                                                return;
                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                let acoes = document.createElement("div");
                                                                                                                                                                                                                                                                                                                                    acoes.className = "acoes";

                                                                                                                                                                                                                                                                                                                                        let like = document.createElement("button");
                                                                                                                                                                                                                                                                                                                                            like.innerHTML = '❤️ <span>0</span>';
                                                                                                                                                                                                                                                                                                                                                like.onclick = function() { curtir(this); };

                                                                                                                                                                                                                                                                                                                                                    let comment = document.createElement("button");
                                                                                                                                                                                                                                                                                                                                                        comment.textContent = "💬";
                                                                                                                                                                                                                                                                                                                                                            comment.onclick = function() { focarComentario(this); };

                                                                                                                                                                                                                                                                                                                                                                acoes.append(like, comment);
                                                                                                                                                                                                                                                                                                                                                                    post.appendChild(acoes);

                                                                                                                                                                                                                                                                                                                                                                        let legenda = document.createElement("p");
                                                                                                                                                                                                                                                                                                                                                                            let autor = document.createElement("b");
                                                                                                                                                                                                                                                                                                                                                                                autor.textContent = nome + " ";
                                                                                                                                                                                                                                                                                                                                                                                    legenda.append(autor, document.createTextNode(texto));
                                                                                                                                                                                                                                                                                                                                                                                        post.appendChild(legenda);

                                                                                                                                                                                                                                                                                                                                                                                            let lista = document.createElement("div");
                                                                                                                                                                                                                                                                                                                                                                                                lista.className = "comentarios";
                                                                                                                                                                                                                                                                                                                                                                                                    post.appendChild(lista);

                                                                                                                                                                                                                                                                                                                                                                                                        let campo = document.createElement("input");
                                                                                                                                                                                                                                                                                                                                                                                                            campo.className = "comentario";
                                                                                                                                                                                                                                                                                                                                                                                                                campo.placeholder = "Adicionar comentário...";

                                                                                                                                                                                                                                                                                                                                                                                                                    let enviar = document.createElement("button");
                                                                                                                                                                                                                                                                                                                                                                                                                        enviar.textContent = "Enviar";
                                                                                                                                                                                                                                                                                                                                                                                                                            enviar.onclick = function() { comentar(this); };

                                                                                                                                                                                                                                                                                                                                                                                                                                post.append(campo, enviar);

                                                                                                                                                                                                                                                                                                                                                                                                                                    document.getElementById("feed").prepend(post);

                                                                                                                                                                                                                                                                                                                                                                                                                                        document.getElementById("nome").value = "";
                                                                                                                                                                                                                                                                                                                                                                                                                                            document.getElementById("texto").value = "";
                                                                                                                                                                                                                                                                                                                                                                                                                                                document.getElementById("imagem").value = "";
                                                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                                                
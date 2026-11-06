
function publicar() {
    const titulo = document.getElementById("titulo").value.trim();
        const conteudo = document.getElementById("conteudo").value.trim();

            if (titulo === "" || conteudo === "") {
                    alert("Preencha o título e o conteúdo!");
                            return;
                                }

                                    const postagem = document.createElement("article");
                                        postagem.className = "post";

                                            const novoTitulo = document.createElement("h3");
                                                novoTitulo.textContent = titulo;

                                                    const novoConteudo = document.createElement("p");
                                                        novoConteudo.textContent = conteudo;

                                                            postagem.appendChild(novoTitulo);
                                                                postagem.appendChild(novoConteudo);

                                                                    document.getElementById("postagens").prepend(postagem);

                                                                        document.getElementById("titulo").value = "";
                                                                            document.getElementById("conteudo").value = "";

                                                                                alert("Postagem publicada com sucesso!");
                                                                                }
                                                                                
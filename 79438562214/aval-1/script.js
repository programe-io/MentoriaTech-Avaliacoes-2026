
function adicionarPost() {
    const titulo = document.getElementById("titulo").value;
        const conteudo = document.getElementById("conteudo").value;

            if (titulo.trim() === "" || conteudo.trim() === "") {
                    alert("Preencha o título e o conteúdo!");
                            return;
                                }

                                    const novaPostagem = document.createElement("article");
                                        novaPostagem.className = "post";

                                            const novoTitulo = document.createElement("h3");
                                                novoTitulo.textContent = titulo;

                                                    const novoConteudo = document.createElement("p");
                                                        novoConteudo.textContent = conteudo;

                                                            novaPostagem.appendChild(novoTitulo);
                                                                novaPostagem.appendChild(novoConteudo);

                                                                    document.getElementById("lista-postagens")
                                                                            .prepend(novaPostagem);

                                                                                document.getElementById("titulo").value = "";
                                                                                    document.getElementById("conteudo").value = "";

                                                                                        alert("Postagem publicada com sucesso!");
                                                                                        }
                                                                                        
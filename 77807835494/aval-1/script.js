
function mostrarResenha(texto) {
    alert(texto);
    }

    function enviarComentario() {
        const nome = document.getElementById("nome").value.trim();
            const comentario = document.getElementById("comentario").value.trim();

                if (nome === "" || comentario === "") {
                        alert("Preencha seu nome e comentário!");
                                return;
                                    }

                                        const comentarios = document.getElementById("comentarios");

                                            const novoComentario = document.createElement("div");
                                                novoComentario.classList.add("comentario-item");

                                                    const titulo = document.createElement("strong");
                                                        titulo.textContent = nome;

                                                            const texto = document.createElement("p");
                                                                texto.textContent = comentario;

                                                                    novoComentario.appendChild(titulo);
                                                                        novoComentario.appendChild(texto);

                                                                            comentarios.appendChild(novoComentario);

                                                                                document.getElementById("nome").value = "";
                                                                                    document.getElementById("comentario").value = "";

                                                                                        alert("Comentário enviado com sucesso!");
                                                                                        }
                                                                                        
// Função para curtir uma publicação
function curtir(botao) {
    const contador = botao.querySelector("span");

        let quantidade = Number(contador.textContent);

            quantidade++;

                contador.textContent = quantidade;
                    botao.firstChild.textContent = "♥ Curtido ";
                    }

                    // Função para adicionar comentários
                    function comentar(botao) {
                        const conteudo = botao.parentElement;

                            const campo = conteudo.querySelector("input");
                                const comentarios = conteudo.querySelector(".comentarios");

                                    if (campo.value.trim() === "") {
                                            alert("Digite um comentário!");
                                                    return;
                                                        }

                                                            const novoComentario = document.createElement("p");

                                                                novoComentario.textContent = "💬 " + campo.value;

                                                                    comentarios.appendChild(novoComentario);

                                                                        campo.value = "";
                                                                        }
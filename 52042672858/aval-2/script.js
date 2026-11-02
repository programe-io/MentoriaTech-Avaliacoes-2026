// Sistema de curtidas
document.querySelectorAll(".curtir").forEach(function(botao) {

    botao.addEventListener("click", function() {

            if (botao.classList.contains("ativo")) {
                        botao.classList.remove("ativo");
                                    botao.textContent = "♡ Curtir";
                                            } else {
                                                        botao.classList.add("ativo");
                                                                    botao.textContent = "♥ Curtido";
                                                                            }

                                                                                });

                                                                                });

                                                                                // Sistema de comentários
                                                                                function comentar() {

                                                                                    let comentario = prompt("Escreva seu comentário:");

                                                                                        if (comentario) {
                                                                                                alert("Comentário registrado: " + comentario);
                                                                                                    }

                                                                                                    }

                                                                                                    // Compartilhamento
                                                                                                    function compartilhar() {

                                                                                                        alert("Compartilhe seu amor pelos livros! 📚");

                                                                                                        }
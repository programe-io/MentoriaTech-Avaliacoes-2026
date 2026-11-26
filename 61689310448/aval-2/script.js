function curtir(botao) {
        if (botao.classList.contains("curtido")) {
                botao.innerHTML = "♡ Curtir";
                        botao.classList.remove("curtido");
                            } else {
                                    botao.innerHTML = "❤️ Curtido";
                                            botao.classList.add("curtido");
                                                }
                                                }

                                                function comentar() {
                                                    let comentario = prompt("Digite seu comentário:");

                                                        if (comentario !== null && comentario.trim() !== "") {
                                                                alert("Comentário enviado: " + comentario);
                                                                    }
                                                                    }
}
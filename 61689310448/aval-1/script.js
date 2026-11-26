function curtir(botao) {
        if (botao.classList.contains("curtido")) {
                botao.innerHTML = "❤️ Curtir";
                        botao.classList.remove("curtido");
                                alert("Curtida removida!");
                                    } else {
                                            botao.innerHTML = "💜 Curtido!";
                                                    botao.classList.add("curtido");
                                                            alert("Você curtiu esta notícia!");
                                                                }
                                                                }
}
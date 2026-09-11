let pontos = 0;

function escolher(tipo, emoji) {
    document.getElementById(tipo).textContent = emoji;

        pontos += 10;

            document.getElementById("pontos").textContent = pontos;
            }

            function finalizar() {
                let mensagem;

                    if (pontos >= 60) {
                            mensagem = "🌟 Visual incrível! Você arrasou!";
                                } else if (pontos >= 30) {
                                        mensagem = "💖 Muito bonito! Continue tentando!";
                                            } else {
                                                    mensagem = "✨ Escolha mais itens para completar o visual!";
                                                        }

                                                            document.getElementById("resultado").textContent = mensagem;
                                                            }
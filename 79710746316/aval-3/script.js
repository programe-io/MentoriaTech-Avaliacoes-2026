let seguindo = false;

function seguir() {
    seguindo = !seguindo;

        const botao = document.getElementById("seguir");

            if (seguindo) {
                    botao.innerText = "Seguindo ✓";
                            botao.style.background = "#b85c80";
                                } else {
                                        botao.innerText = "Seguir";
                                                botao.style.background = "#ed91b2";
                                                    }
                                                    }
// Objeto contendo as curiosidades de cada jogo
const curiosidades = {
    minecraft: "O Minecraft é o jogo mais vendido da história dos videogames, ultrapassando a marca de 300 milhões de cópias vendidas!",
        subway: "Subway Surfers foi o primeiro jogo do mundo a ultrapassar 1 bilhão de downloads diretamente na Google Play Store.",
            among: "Apesar de ter estourado em 2020, Among Us foi lançado originalmente em 2018 e quase não fez sucesso nos seus primeiros meses."
            };

            // Função para exibir a curiosidade na tela
            function mostrarDica(jogo) {
                const modal = document.getElementById("modal");
                    const texto = document.getElementById("texto-curiosidade");
                        
                            // Altera o texto de acordo com o jogo clicado
                                texto.innerText = curiosidades[jogo];
                                    
                                        // Remove a classe que esconde o modal
                                            modal.classList.remove("escondido");
                                            }

                                            // Função para fechar o modal
                                            function fecharModal() {
                                                const modal = document.getElementById("modal");
                                                    modal.classList.add("escondido");
                                                    }

                                                    // Fecha o modal caso o usuário clique fora dele
                                                    window.onclick = function(event) {
                                                        const modal = document.getElementById("modal");
                                                            if (event.target == modal) {
                                                                    modal.classList.add("escondido");
                                                                        }
                                                                        }
                                                                        
// Placar inicial
let golsFlamengo = 2;
let golsPalmeiras = 1;

// Atualizar placar
function atualizarPlacar() {
    document.getElementById("flamengo").textContent = golsFlamengo;
        document.getElementById("palmeiras").textContent = golsPalmeiras;
        }

        // Adicionar gol
        function simularGol(time) {

            if (time === "flamengo") {
                    golsFlamengo++;
                            alert("GOOOOOOL DO FLAMENGO! 🔴⚫⚽");
                                }

                                    if (time === "palmeiras") {
                                            golsPalmeiras++;
                                                    alert("GOOOOOOL DO PALMEIRAS! 🟢⚪⚽");
                                                        }

                                                            atualizarPlacar();
                                                            }

                                                            // Botão Jogos
                                                            function mostrarJogos() {
                                                                window.scrollTo({
                                                                        top: 0,
                                                                                behavior: "smooth"
                                                                                    });
                                                                                    }

                                                                                    // Botão Tabela
                                                                                    function mostrarTabela() {
                                                                                        document.querySelector(".tabela").scrollIntoView({
                                                                                                behavior: "smooth"
                                                                                                    });
                                                                                                    }

                                                                                                    // Botão Notícias
                                                                                                    function mostrarMensagem() {
                                                                                                        alert("📰 Notícias em breve!");
                                                                                                        }

                                                                                                        // Ver jogo
                                                                                                        function verJogo() {
                                                                                                            alert("⚽ Corinthians 1 x 1 São Paulo");
                                                                                                            }

                                                                                                            // Inicializar
                                                                                                            atualizarPlacar();
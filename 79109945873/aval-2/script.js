
let pontos = 0;
let partidas = 0;

function jogar(nome) {
    partidas++;

        alert(
                "🎮 BEM-VINDO AO GAME CENTER!\n\n" +
                        "🧩 Jogo escolhido: " + nome +
                                "\n🏆 Partida número: " + partidas +
                                        "\n\n🔥 Boa sorte!"
                                            );

                                                const card = document.querySelector(".card");

                                                    card.style.transform = "scale(1.08)";
                                                        card.style.boxShadow = "0 0 30px #00eaff";

                                                            setTimeout(() => {
                                                                    card.style.transform = "scale(1)";
                                                                            card.style.boxShadow = "";
                                                                                }, 500);
                                                                                }

                                                                                // Sistema de pontuação
                                                                                function adicionarPontos(valor) {
                                                                                    pontos += valor;
                                                                                        alert("🏆 Você ganhou " + valor +
                                                                                                  " pontos!\nTotal: " + pontos);
                                                                                                  }

                                                                                                  // Mostrar estatísticas
                                                                                                  function estatisticas() {
                                                                                                      alert(
                                                                                                              "📊 ESTATÍSTICAS\n\n" +
                                                                                                                      "🎮 Partidas: " + partidas +
                                                                                                                              "\n🏆 Pontos: " + pontos
                                                                                                                                  );
                                                                                                                                  }

                                                                                                                                  // Mensagem de boas-vindas
                                                                                                                                  console.log("🔥 GAME CENTER carregado!");
                                                                                                                                  console.log("🧩 Quebra-cabeça disponível!");
                                                                                                                                  
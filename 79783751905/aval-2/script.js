let heroiEscolhido = "";

function escolherHeroi(nome) {
  heroiEscolhido = nome;

    document.getElementById("mensagem").innerHTML =
        "🛡️ Você escolheu: <strong>" + nome + "</strong>!";

          document.getElementById("resultado").innerHTML = "";
          }

          function iniciarBatalha() {

            if (heroiEscolhido === "") {
                document.getElementById("resultado").innerHTML =
                      "⚠️ Primeiro escolha um herói!";
                          return;
                            }

                              const inimigos = [
                                  "Dragão Sombrio 🐉",
                                      "Cavaleiro das Trevas 🗡️",
                                          "Monstro de Gelo 👹"
                                            ];

                                              const inimigo =
                                                  inimigos[Math.floor(Math.random() * inimigos.length)];

                                                    const venceu = Math.random() > 0.4;

                                                      if (venceu) {
                                                          document.getElementById("resultado").innerHTML =
                                                                "🏆 " + heroiEscolhido +
                                                                      " derrotou o " + inimigo + "! Você venceu a batalha!";
                                                                        } else {
                                                                            document.getElementById("resultado").innerHTML =
                                                                                  "💥 O " + inimigo +
                                                                                        " foi mais forte desta vez. Tente novamente!";
                                                                                          }
                                                                                          }
const perguntas = [
      {
          pergunta: "Qual é o planeta conhecido como Planeta Vermelho?",
              opcoes: ["Terra", "Marte", "Júpiter", "Saturno"],
                  resposta: "Marte"
                    },

                      {
                          pergunta: "Quanto é 8 × 7?",
                              opcoes: ["48", "54", "56", "64"],
                                  resposta: "56"
                                    },

                                      {
                                          pergunta: "Qual é o maior oceano do planeta?",
                                              opcoes: [
                                                    "Oceano Atlântico",
                                                          "Oceano Índico",
                                                                "Oceano Pacífico",
                                                                      "Oceano Ártico"
                                                                          ],
                                                                              resposta: "Oceano Pacífico"
                                                                                },

                                                                                  {
                                                                                      pergunta: "Qual linguagem é usada para criar a estrutura de uma página web?",
                                                                                          opcoes: ["HTML", "CSS", "JavaScript", "Python"],
                                                                                              resposta: "HTML"
                                                                                                },

                                                                                                  {
                                                                                                      pergunta: "Quantos dias existem em uma semana?",
                                                                                                          opcoes: ["5", "6", "7", "8"],
                                                                                                              resposta: "7"
                                                                                                                }
                                                                                                                ];

                                                                                                                let perguntaAtual = 0;
                                                                                                                let pontos = 0;
                                                                                                                let respondeu = false;

                                                                                                                function carregarPergunta() {
                                                                                                                  const pergunta = perguntas[perguntaAtual];

                                                                                                                    document.getElementById("numero").innerText =
                                                                                                                        "Pergunta " + (perguntaAtual + 1) + " de " + perguntas.length;

                                                                                                                          document.getElementById("pontos").innerText =
                                                                                                                              "Pontos: " + pontos;

                                                                                                                                document.getElementById("pergunta").innerText =
                                                                                                                                    pergunta.pergunta;

                                                                                                                                      const opcoes = document.getElementById("opcoes");

                                                                                                                                        opcoes.innerHTML = "";

                                                                                                                                          pergunta.opcoes.forEach(function(opcao) {

                                                                                                                                              const botao = document.createElement("button");

                                                                                                                                                  botao.innerText = opcao;
                                                                                                                                                      botao.classList.add("opcao");

                                                                                                                                                          botao.onclick = function() {
                                                                                                                                                                verificarResposta(botao, opcao);
                                                                                                                                                                    };

                                                                                                                                                                        opcoes.appendChild(botao);
                                                                                                                                                                          });

                                                                                                                                                                            document.getElementById("proximo").disabled = true;
                                                                                                                                                                              document.getElementById("resultado").innerText = "";

                                                                                                                                                                                respondeu = false;
                                                                                                                                                                                }

                                                                                                                                                                                function verificarResposta(botao, resposta) {

                                                                                                                                                                                  if (respondeu) {
                                                                                                                                                                                      return;
                                                                                                                                                                                        }

                                                                                                                                                                                          respondeu = true;

                                                                                                                                                                                            const correta = perguntas[perguntaAtual].resposta;

                                                                                                                                                                                              if (resposta === correta) {
                                                                                                                                                                                                  botao.classList.add("correta");
                                                                                                                                                                                                      pontos++;

                                                                                                                                                                                                          document.getElementById("resultado").innerText =
                                                                                                                                                                                                                "🎉 Resposta correta!";
                                                                                                                                                                                                                  } else {
                                                                                                                                                                                                                      botao.classList.add("errada");

                                                                                                                                                                                                                          document.getElementById("resultado").innerText =
                                                                                                                                                                                                                                "❌ Resposta incorreta!";
                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                    document.getElementById("pontos").innerText =
                                                                                                                                                                                                                                        "Pontos: " + pontos;

                                                                                                                                                                                                                                          document.getElementById("proximo").disabled = false;
                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                          function proximaPergunta() {

                                                                                                                                                                                                                                            perguntaAtual++;

                                                                                                                                                                                                                                              if (perguntaAtual < perguntas.length) {
                                                                                                                                                                                                                                                  carregarPergunta();
                                                                                                                                                                                                                                                    } else {

                                                                                                                                                                                                                                                        document.getElementById("pergunta").innerText =
                                                                                                                                                                                                                                                              "🏆 Quiz terminado!";

                                                                                                                                                                                                                                                                  document.getElementById("opcoes").innerHTML = "";

                                                                                                                                                                                                                                                                      document.getElementById("numero").innerText =
                                                                                                                                                                                                                                                                            "Fim do jogo";

                                                                                                                                                                                                                                                                                document.getElementById("resultado").innerText =
                                                                                                                                                                                                                                                                                      "Você fez " + pontos + " de " + perguntas.length + " pontos!";

                                                                                                                                                                                                                                                                                          document.getElementById("proximo").innerText =
                                                                                                                                                                                                                                                                                                "🔄 Jogar novamente";

                                                                                                                                                                                                                                                                                                    document.getElementById("proximo").disabled = false;

                                                                                                                                                                                                                                                                                                        document.getElementById("proximo").onclick = reiniciarJogo;
                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                          function reiniciarJogo() {
                                                                                                                                                                                                                                                                                                            perguntaAtual = 0;
                                                                                                                                                                                                                                                                                                              pontos = 0;
                                                                                                                                                                                                                                                                                                                document.getElementById("proximo").innerText = "Próxima ➡️";
                                                                                                                                                                                                                                                                                                                  document.getElementById("proximo").onclick = proximaPergunta;

                                                                                                                                                                                                                                                                                                                    carregarPergunta();
                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                    carregarPergunta();
]
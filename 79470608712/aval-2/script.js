
const perguntas = [
  {
      pergunta: "Qual é a capital do Brasil?",
          alternativas: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"],
              correta: 1
                },
                  {
                      pergunta: "Qual linguagem é usada para estilizar páginas?",
                          alternativas: ["HTML", "JavaScript", "CSS", "Python"],
                              correta: 2
                                },
                                  {
                                      pergunta: "Qual planeta é conhecido como Planeta Vermelho?",
                                          alternativas: ["Marte", "Vênus", "Júpiter", "Saturno"],
                                              correta: 0
                                                },
                                                  {
                                                      pergunta: "O que significa HTML?",
                                                          alternativas: [
                                                                "HyperText Markup Language",
                                                                      "High Technology Machine Language",
                                                                            "Home Tool Markup Language",
                                                                                  "Hyper Transfer Main Link"
                                                                                      ],
                                                                                          correta: 0
                                                                                            },
                                                                                              {
                                                                                                  pergunta: "Qual linguagem adiciona interatividade aos sites?",
                                                                                                      alternativas: ["CSS", "JavaScript", "HTML", "SQL"],
                                                                                                          correta: 1
                                                                                                            }
                                                                                                            ];

                                                                                                            let numero = 0;
                                                                                                            let pontos = 0;

                                                                                                            const pergunta = document.getElementById("pergunta");
                                                                                                            const alternativas = document.getElementById("alternativas");
                                                                                                            const mensagem = document.getElementById("mensagem");
                                                                                                            const progresso = document.getElementById("progresso");
                                                                                                            const pontosTexto = document.getElementById("pontos");
                                                                                                            const proxima = document.getElementById("proxima");

                                                                                                            function mostrarPergunta() {
                                                                                                              if (numero >= perguntas.length) {
                                                                                                                  finalizarJogo();
                                                                                                                      return;
                                                                                                                        }

                                                                                                                          const atual = perguntas[numero];

                                                                                                                            pergunta.textContent = atual.pergunta;
                                                                                                                              progresso.textContent = `Pergunta ${numero + 1} de 5`;
                                                                                                                                pontosTexto.textContent = `Pontos: ${pontos}`;

                                                                                                                                  document.getElementById("preenchimento").style.width =
                                                                                                                                      `${numero / perguntas.length * 100}%`;

                                                                                                                                        alternativas.innerHTML = "";
                                                                                                                                          mensagem.textContent = "";
                                                                                                                                            proxima.hidden = true;

                                                                                                                                              atual.alternativas.forEach((opcao, indice) => {
                                                                                                                                                  const botao = document.createElement("button");

                                                                                                                                                      botao.textContent = opcao;
                                                                                                                                                          botao.className = "alternativa";

                                                                                                                                                              botao.addEventListener("click", () => {
                                                                                                                                                                    verificarResposta(indice, botao);
                                                                                                                                                                        });

                                                                                                                                                                            alternativas.appendChild(botao);
                                                                                                                                                                              });
                                                                                                                                                                              }

                                                                                                                                                                              function verificarResposta(escolha, escolhido) {
                                                                                                                                                                                const correta = perguntas[numero].correta;

                                                                                                                                                                                  const botoes = alternativas.querySelectorAll("button");

                                                                                                                                                                                    botoes.forEach((botao, indice) => {
                                                                                                                                                                                        botao.disabled = true;

                                                                                                                                                                                            if (indice === correta) {
                                                                                                                                                                                                  botao.classList.add("correta");
                                                                                                                                                                                                      }
                                                                                                                                                                                                        });

                                                                                                                                                                                                          if (escolha === correta) {
                                                                                                                                                                                                              pontos += 10;
                                                                                                                                                                                                                  mensagem.textContent = "🎉 Resposta correta!";
                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                        escolhido.classList.add("errada");
                                                                                                                                                                                                                            mensagem.textContent = "❌ Resposta incorreta!";
                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                pontosTexto.textContent = `Pontos: ${pontos}`;

                                                                                                                                                                                                                                  proxima.textContent =
                                                                                                                                                                                                                                      numero === 4 ? "Ver resultado" : "Próxima pergunta";

                                                                                                                                                                                                                                        proxima.hidden = false;
                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                        proxima.addEventListener("click", () => {
                                                                                                                                                                                                                                          numero++;
                                                                                                                                                                                                                                            mostrarPergunta();
                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                            function finalizarJogo() {
                                                                                                                                                                                                                                              document.getElementById("jogo").hidden = true;
                                                                                                                                                                                                                                                document.getElementById("resultado").hidden = false;

                                                                                                                                                                                                                                                  document.getElementById("preenchimento").style.width = "100%";

                                                                                                                                                                                                                                                    document.getElementById("pontuacaoFinal").textContent =
                                                                                                                                                                                                                                                        `Você conseguiu ${pontos} de 50 pontos!`;
                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                        function reiniciar() {
                                                                                                                                                                                                                                                          numero = 0;
                                                                                                                                                                                                                                                            pontos = 0;

                                                                                                                                                                                                                                                              document.getElementById("jogo").hidden = false;
                                                                                                                                                                                                                                                                document.getElementById("resultado").hidden = true;

                                                                                                                                                                                                                                                                  mostrarPergunta();
                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                  mostrarPergunta();
                                                                                                                                                                                                                                                                  
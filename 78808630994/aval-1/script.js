
let acertos = 0;
let respondidas = [];

function iniciarAula() {
  document.getElementById("aulas").scrollIntoView({
      behavior: "smooth"
        });
        }

        function responder(numero, resposta) {
          if (respondidas.includes(numero)) {
              alert("Você já respondeu essa questão!");
                  return;
                    }

                      respondidas.push(numero);

                        const corretas = {
                            1: "Cauã",
                                2: "Robson",
                                    3: "Deu"
                                      };

                                        if (resposta === corretas[numero]) {
                                            acertos++;
                                                alert("Resposta correta! Você conhece a história do caneco.");
                                                  } else {
                                                      alert("Resposta errada! A gramática está decepcionada.");
                                                        }

                                                          if (respondidas.length === 3) {
                                                              document.getElementById("resultado").textContent =
                                                                    "Resultado: " + acertos + "/3 acertos. " +
                                                                          (acertos === 3
                                                                                  ? "Você está oficialmente formado!"
                                                                                          : "Recomendamos estudar mais o caso Cauã.");
                                                                                            }
                                                                                            }

                                                                                            function revelarSegredo() {
                                                                                              document.getElementById("revelacao").innerHTML =
                                                                                                  "🚨 INFORMAÇÃO CONFIDENCIAL 🚨<br>" +
                                                                                                      "Cauã entregou o caneco para Robson.<br>" +
                                                                                                          "Robson não comentou o assunto até o fechamento desta edição.<br>" +
                                                                                                              "A investigação continua...";
                                                                                                              }
                                                                                                              
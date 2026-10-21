
function comecar() {
  document.getElementById("mensagem").textContent =
      "💪 Sua jornada começa hoje! Vamos com tudo!";
      }

      function calcularIMC() {
        const peso = Number(document.getElementById("peso").value);
          const altura = Number(document.getElementById("altura").value);
            const resultado = document.getElementById("resultado");

              if (
                  !Number.isFinite(peso) ||
                      !Number.isFinite(altura) ||
                          peso <= 0 ||
                              altura < 0.5 ||
                                  altura > 2.5
                                    ) {
                                        resultado.textContent =
                                              "Digite um peso e uma altura válidos.";
                                                  return;
                                                    }

                                                      const imc = peso / (altura * altura);

                                                        resultado.textContent =
                                                            "Seu IMC é: " + imc.toFixed(1);
                                                            }
                                                            
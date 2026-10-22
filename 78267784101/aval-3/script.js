
let golsA = 0;
let golsB = 0;

function explorar() {
  document.getElementById("mensagem").textContent =
      "🏆 Escolha sua modalidade favorita e entre em ação!";
        
          document.getElementById("modalidades").scrollIntoView({
              behavior: "smooth"
                });
                }

                function atualizarPlacar() {
                  document.getElementById("golsA").textContent = golsA;
                    document.getElementById("golsB").textContent = golsB;
                    }

                    function marcarGol(time) {
                      if (time === "A") {
                          golsA++;
                            } else {
                                golsB++;
                                  }

                                    atualizarPlacar();
                                    }

                                    function reiniciar() {
                                      golsA = 0;
                                        golsB = 0;
                                          atualizarPlacar();
                                          }
                                          
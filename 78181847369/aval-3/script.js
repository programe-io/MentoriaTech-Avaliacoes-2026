
let golsA = 0;
let golsB = 0;

function atualizarPlacar() {
  document.getElementById("golsA").textContent = golsA;
    document.getElementById("golsB").textContent = golsB;
    }

    function golA() {
      golsA++;
        atualizarPlacar();
        }

        function golB() {
          golsB++;
            atualizarPlacar();
            }

            function reiniciar() {
              golsA = 0;
                golsB = 0;
                  atualizarPlacar();
                  }

                  function mostrarMensagem() {
                    document.getElementById("mensagem").textContent =
                        "⚽ Prepare-se! A bola vai rolar!";
                        }
                        
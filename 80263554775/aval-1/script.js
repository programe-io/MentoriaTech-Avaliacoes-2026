let pontos = 0;
let intervalo;

function iniciarJogo() {
  pontos = 0;
    document.getElementById("pontos").innerText = pontos;

      intervalo = setInterval(moverAlvo, 1000);
      }

      function moverAlvo() {
        let alvo = document.getElementById("alvo");

          let x = Math.random() * 250;
            let y = Math.random() * 250;

              alvo.style.left = x + "px";
                alvo.style.top = y + "px";
                  alvo.style.display = "block";
                  }

                  function ganharPonto() {
                    pontos++;
                      document.getElementById("pontos").innerText = pontos;
                      }
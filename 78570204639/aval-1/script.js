const alvo = document.getElementById("alvo");
const pontosTexto = document.getElementById("pontos");

let pontos = 0;

function moverAlvo() {
  const x = Math.random() * 250;
    const y = Math.random() * 250;

      alvo.style.left = x + "px";
        alvo.style.top = y + "px";
        }

        alvo.addEventListener("click", () => {
          pontos++;
            pontosTexto.innerText = pontos;
              moverAlvo();
              });

              // começa o jogo
              moverAlvo();
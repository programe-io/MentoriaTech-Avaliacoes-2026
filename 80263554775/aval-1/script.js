let numero = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;

function verificar() {
  const palpite = Number(document.getElementById("palpite").value);
    const dica = document.getElementById("dica");

      tentativas++;
        document.getElementById("tentativas").innerText = tentativas;

          if (palpite === numero) {
              dica.innerText = "🎉 Acertou!";
                } else if (palpite > numero) {
                    dica.innerText = "📉 Muito alto!";
                      } else {
                          dica.innerText = "📈 Muito baixo!";
                            }
                            }
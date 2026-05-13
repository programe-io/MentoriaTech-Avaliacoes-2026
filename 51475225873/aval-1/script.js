let secretNumber = Math.floor(Math.random() * 10) + 1;

function checkGuess() {
  let guess = Number(document.getElementById("guess").value);
    let message = document.getElementById("message");

      if (guess === secretNumber) {
          message.textContent = "Parabéns! Você acertou 🎉";
              secretNumber = Math.floor(Math.random() * 10) + 1; // reinicia o jogo
                } else if (guess > secretNumber) {
                    message.textContent = "Muito alto!";
                      } else {
                          message.textContent = "Muito baixo!";
                            }
                            }
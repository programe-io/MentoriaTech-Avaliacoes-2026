
<!DOCTYPE html>
<html>
<head>
    <title>Jogo de Adivinhação</title>
    </head>
    <body>
        <h1>🎮 Adivinhe o Número!</h1>
            <p>Escolhi um número de 1 a 10. Tente adivinhar!</p>

                <input type="number" id="palpite" placeholder="Digite seu número">
                    <button onclick="adivinhar()">Tentar</button>

                        <p id="resultado"></p>

                            <script>
                                    let numeroSecreto = Math.floor(Math.random() * 10) + 1;

                                            function adivinhar() {
                                                        let palpite = Number(document.getElementById("palpite").value);
                                                                    let resultado = document.getElementById("resultado");

                                                                                if (palpite === numeroSecreto) {
                                                                                                resultado.innerHTML = "🎉 Parabéns! Você acertou!";
                                                                                                            } else if (palpite < numeroSecreto) {
                                                                                                                            resultado.innerHTML = "⬆️ Tente um número maior!";
                                                                                                                                        } else {
                                                                                                                                                        resultado.innerHTML = "⬇️ Tente um número menor!";
                                                                                                                                                                    }
                                                                                                                                                                            }
                                                                                                                                                                                </script>
                                                                                                                                                                                </body>
                                                                                                                                                                                </html>
                                                                                                                                                                                

const form = document.getElementById("formIMC");

form.addEventListener("submit", function(event) {
    event.preventDefault();

        // Receber os dados do paciente
            const nome = document.getElementById("nome").value.trim();
                const peso = Number(document.getElementById("peso").value);
                    const altura = Number(document.getElementById("altura").value);

                        // Validar os dados
                            if (
                                    nome === "" ||
                                            !Number.isFinite(peso) ||
                                                    !Number.isFinite(altura) ||
                                                            peso <= 0 ||
                                                                    altura <= 0
                                                                        ) {
                                                                                alert("Digite dados válidos!");
                                                                                        return;
                                                                                            }

                                                                                                // Calcular o IMC
                                                                                                    const imc = peso / (altura * altura);

                                                                                                        // Classificar o IMC
                                                                                                            let classificacao;

                                                                                                                if (imc < 18.5) {
                                                                                                                        classificacao = "Abaixo do peso";
                                                                                                                            } else if (imc < 25) {
                                                                                                                                    classificacao = "Peso adequado";
                                                                                                                                        } else if (imc < 30) {
                                                                                                                                                classificacao = "Sobrepeso";
                                                                                                                                                    } else if (imc < 35) {
                                                                                                                                                            classificacao = "Obesidade grau I";
                                                                                                                                                                } else if (imc < 40) {
                                                                                                                                                                        classificacao = "Obesidade grau II";
                                                                                                                                                                            } else {
                                                                                                                                                                                    classificacao = "Obesidade grau III";
                                                                                                                                                                                        }

                                                                                                                                                                                            // Exibir as informações
                                                                                                                                                                                                document.getElementById("informacoes").innerHTML = `
                                                                                                                                                                                                        Paciente: <strong>${nome}</strong><br>
                                                                                                                                                                                                                Peso: ${peso.toFixed(2)} kg<br>
                                                                                                                                                                                                                        Altura: ${altura.toFixed(2)} m<br>
                                                                                                                                                                                                                                IMC: <strong>${imc.toFixed(2)}</strong><br>
                                                                                                                                                                                                                                        Classificação: <strong>${classificacao}</strong>
                                                                                                                                                                                                                                            `;
                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                            
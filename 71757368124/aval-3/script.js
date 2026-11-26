event.preventDefault();

// Receber os dados do paciente
let nome = document.getElementById("nome").value;
let peso = parseFloat(document.getElementById("peso").value);
let altura = parseFloat(document.getElementById("altura").value);

// Verificar os dados
if (!nome.trim() || !Number.isFinite(peso) ||
    !Number.isFinite(altura) || peso <= 0 || altura <= 0) {
        document.getElementById("resultado").innerHTML =
                "Por favor, informe dados válidos.";
                    return;
                    }

                    // Calcular o IMC
                    let imc = peso / (altura * altura);

                    let classificacao = "";

                    // Classificar o IMC
                    if (imc < 18.5) {
                        classificacao = "Abaixo do peso";
                        } else if (imc < 25) {
                            classificacao = "Peso normal";
                            } else if (imc < 30) {
                                classificacao = "Sobrepeso";
                                } else if (imc < 35) {
                                    classificacao = "Obesidade grau I";
                                    } else if (imc < 40) {
                                        classificacao = "Obesidade grau II";
                                        } else {
                                            classificacao = "Obesidade grau III";
                                            }

                                            // Exibir o resultado
                                            document.getElementById("resultado").innerHTML = `
                                                <h3>Resultado do Paciente</h3>
                                                    Nome: ${nome.replace(/[&<>"']/g, function(c) {
                                                            return {
                                                                        '&': '&amp;',
                                                                                    '<': '&lt;',
                                                                                                '>': '&gt;',
                                                                                                            '"': '&quot;',
                                                                                                                        "'": '&#39;'
                                                                                                                                }[c];
                                                                                                                                    })}<br>
                                                                                                                                        Peso: ${peso.toFixed(1)} kg<br>
                                                                                                                                            Altura: ${altura.toFixed(2)} m<br>
                                                                                                                                                IMC: ${imc.toFixed(2)}<br>
                                                                                                                                                    Classificação: ${classificacao}
                                                                                                                                                    `;
                                                                                                                                                    
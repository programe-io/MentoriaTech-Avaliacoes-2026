function calcularIMC() {

        let nome = document.getElementById("nome").value;
            let peso = parseFloat(document.getElementById("peso").value);
                let altura = parseFloat(document.getElementById("altura").value);

                    let resultado = document.getElementById("resultado");

                        // Validar os dados
                            if (nome.trim() === "" || isNaN(peso) ||
                                    isNaN(altura) || peso <= 0 || altura <= 0) {

                                            resultado.innerHTML = "Preencha todos os campos corretamente!";
                                                    resultado.style.color = "red";
                                                            return;
                                                                }

                                                                    // Calcular o IMC
                                                                        let imc = peso / (altura * altura);

                                                                            let classificacao = "";

                                                                                // Classificação do IMC para adultos
                                                                                    if (imc < 18.5) {
                                                                                            classificacao = "Abaixo do peso";
                                                                                                } 
                                                                                                    else if (imc < 25) {
                                                                                                            classificacao = "Peso normal";
                                                                                                                } 
                                                                                                                    else if (imc < 30) {
                                                                                                                            classificacao = "Sobrepeso";
                                                                                                                                } 
                                                                                                                                    else if (imc < 35) {
                                                                                                                                            classificacao = "Obesidade grau I";
                                                                                                                                                } 
                                                                                                                                                    else if (imc < 40) {
                                                                                                                                                            classificacao = "Obesidade grau II";
                                                                                                                                                                } 
                                                                                                                                                                    else {
                                                                                                                                                                            classificacao = "Obesidade grau III";
                                                                                                                                                                                }

                                                                                                                                                                                    // Mostrar resultado
                                                                                                                                                                                        resultado.style.color = "#2193b0";

                                                                                                                                                                                            resultado.innerHTML =
                                                                                                                                                                                                    "Olá, " + nome + "!<br>" +
                                                                                                                                                                                                            "Seu IMC é: " + imc.toFixed(2) + "<br>" +
                                                                                                                                                                                                                    "Classificação: " + classificacao;
                                                                                                                                                                                                                    }
}
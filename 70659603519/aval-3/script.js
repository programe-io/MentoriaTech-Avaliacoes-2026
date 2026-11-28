// Controle de IMC

let nome = prompt("Digite o nome do paciente:");
let peso = parseFloat(prompt("Digite o peso do paciente (kg):"));
let altura = parseFloat(prompt("Digite a altura do paciente (m):"));

// Calculando o IMC
let imc = peso / (altura * altura);

// Classificação do IMC
let classificacao;

if (imc < 18.5) {
    classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Peso normal";
        } else if (imc < 30) {
            classificacao = "Sobrepeso";
            } else {
                classificacao = "Obesidade";
                }

                // Exibindo as informações
                alert(
                    "Paciente: " + nome +
                        "\nPeso: " + peso + " kg" +
                            "\nAltura: " + altura + " m" +
                                "\nIMC: " + imc.toFixed(2) +
                                    "\nClassificação: " + classificacao
                                    );
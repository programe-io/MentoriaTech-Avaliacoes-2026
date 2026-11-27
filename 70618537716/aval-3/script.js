
function calcularIMC() {

    let nome = prompt("Digite o nome do paciente:");
    let peso = parseFloat(prompt("Digite o peso em kg:"));
    let altura = parseFloat(prompt("Digite a altura em metros:"));

    // Verificar os dados
    if (nome === null || nome.trim() === "" ||
        !Number.isFinite(peso) || !Number.isFinite(altura) ||
        peso <= 0 || altura <= 0) {

        alert("Preencha os dados corretamente!");
        return;
    }

    // Calcular IMC
    let imc = peso / (altura * altura);

    // Classificação
    let classificacao;

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

    // Exibir resultado
    alert(
        "Paciente: " + nome +
        "\nPeso: " + peso + " kg" +
        "\nAltura: " + altura + " m" +
        "\nIMC: " + imc.toFixed(2) +
        "\nClassificação: " + classificacao
    );
}

calcularIMC();


// SISTEMA DE CONTROLE DE IMC

// Receber os dados do paciente
let nome = prompt("Digite o nome do paciente:");
let peso = Number(prompt("Digite o peso em kg:"));
let altura = Number(prompt("Digite a altura em metros:"));

// Validar os dados
if (
    nome === null ||
    nome.trim() === "" ||
    !Number.isFinite(peso) ||
    !Number.isFinite(altura) ||
    peso <= 0 ||
    altura <= 0
) {
    alert("Erro: informe nome, peso e altura válidos!");
} else {

    // Calcular o IMC
    let imc = peso / (altura * altura);

    // Classificar o resultado
    let classificacao;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Faixa de peso considerada adequada";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
    } else {
        classificacao = "Obesidade";
    }

    // Exibir as informações
    alert(
        "CONTROLE DE IMC\n\n" +
        "Paciente: " + nome +
        "\nPeso: " + peso + " kg" +
        "\nAltura: " + altura + " m" +
        "\nIMC: " + imc.toFixed(2) +
        "\nClassificação: " + classificacao
    );
}

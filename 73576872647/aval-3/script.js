
function calcularIMC() {

    // Receber os dados
    let nome = document.getElementById("nome").value;
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    // Validar os dados
    if (nome.trim() === "" || !Number.isFinite(peso) ||
        !Number.isFinite(altura) || peso <= 0 || altura <= 0) {

        document.getElementById("resultado").innerHTML =
            "Preencha todos os campos corretamente.";

        return;
    }

    // Calcular o IMC
    let imc = peso / (altura * altura);

    // Classificar o IMC (adultos)
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

    // Exibir resultado
    document.getElementById("resultado").innerHTML =
        "Paciente: " + nome +
        "<br>IMC: " + imc.toFixed(2) +
        "<br>Classificação: " + classificacao;
}

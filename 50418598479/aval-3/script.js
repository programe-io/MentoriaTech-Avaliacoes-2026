
function calcularIMC() {

    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    let resultado = document.getElementById("resultado");

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0 || altura >= 3) {
        resultado.innerHTML = "Digite valores válidos!";
        return;
    }

    let imc = peso / (altura * altura);

    let classificacao = "";

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

    resultado.innerHTML =
        "Seu IMC é: " + imc.toFixed(2) +
        "<br>Classificação: " + classificacao;
}

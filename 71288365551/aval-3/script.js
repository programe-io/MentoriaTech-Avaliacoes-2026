
function CalcularIMC() {

    const nome = document.getElementById("nome").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    if (nome.trim() === "" || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const imc = peso / (altura * altura);

    let classificacao;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Faixa de peso considerada adequada";
    } else if (imc < 30) {
        classificacao = "Acima da faixa de peso adequada";
    } else {
        classificacao = "IMC elevado";
    }

    document.getElementById("resultado").innerHTML =
        "<h3>Informações do Paciente</h3>" +
        "<p>Nome: " + nome + "</p>" +
        "<p>IMC: " + imc.toFixed(2) + "</p>" +
        "<p>Classificação: " + classificacao + "</p>";
}

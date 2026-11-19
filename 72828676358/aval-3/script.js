
function calcularIMC() {

    let nome = document.getElementById("nome").value;
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    let resultado = document.getElementById("resultado");

    if (nome === "" || isNaN(peso) || isNaN(altura) ||
        peso <= 0 || altura <= 0) {

        resultado.innerHTML = "Preencha todos os campos corretamente!";
        return;
    }

    let imc = peso / (altura * altura);

    resultado.innerHTML =
        "<h3>Resultado do Paciente</h3>" +
        "<p>Nome: " + nome + "</p>" +
        "<p>IMC: " + imc.toFixed(2) + "</p>" +
        "<p>O IMC é um indicador de referência e não fornece um diagnóstico.</p>";
}

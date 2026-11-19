
function calcularIMC() {

    let nome = document.getElementById("nome").value;
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    if (nome === "" || isNaN(peso) || isNaN(altura)
        || peso <= 0 || altura <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let imc = peso / (altura * altura);
    let classificacao = "";
    let cor = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        cor = "orange";
    } 
    else if (imc < 25) {
        classificacao = "Peso adequado";
        cor = "green";
    } 
    else if (imc < 30) {
        classificacao = "Sobrepeso";
        cor = "orange";
    } 
    else if (imc < 35) {
        classificacao = "Obesidade grau I";
        cor = "red";
    } 
    else if (imc < 40) {
        classificacao = "Obesidade grau II";
        cor = "red";
    } 
    else {
        classificacao = "Obesidade grau III";
        cor = "darkred";
    }

    document.getElementById("resultado").innerHTML =
        "<h3>Resultado do Paciente</h3>" +
        "Nome: " + nome + "<br>" +
        "Peso: " + peso + " kg<br>" +
        "Altura: " + altura + " m<br>" +
        "IMC: " + imc.toFixed(2) + "<br>" +
        "Classificação: <span style='color:" + cor + "'>" +
        classificacao + "</span>";
}

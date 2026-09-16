function calcularIMC() {

    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;

    if (peso === "" || altura === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let imc = peso / (altura * altura);

    imc = imc.toFixed(2);

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
    else {
        classificacao = "Obesidade";
    }

    document.getElementById("resultado").innerHTML =
        "Seu IMC é: " + imc + "<br>" +
        "Classificação: " + classificacao;
}

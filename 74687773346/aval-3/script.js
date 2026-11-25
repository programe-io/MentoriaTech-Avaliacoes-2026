
function calcularIMC() {
    let nome = document.getElementById("nome").value;
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    if (nome === "" || peso <= 0 || altura <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let imc = peso / (altura * altura);
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

    document.getElementById("resultado").innerHTML =
        "<h2>Resultado do Paciente</h2>" +
        "<p>Nome: " + nome + "</p>" +
        "<p>Peso: " + peso + " kg</p>" +
        "<p>Altura: " + altura + " m</p>" +
        "<p>IMC: " + imc.toFixed(2) + "</p>" +
        "<p>Classificação: " + classificacao + "</p>";
}


document.getElementById("formIMC").addEventListener("submit",
function(event) {

    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    if (!nome.trim() || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {

        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Calculando o IMC
    let imc = peso / (altura * altura);

    let classificacao = "";

    // Classificação do IMC
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

    // Exibindo os resultados
    document.getElementById("rNome").textContent = nome;

    document.getElementById("rPeso").textContent = peso;

    document.getElementById("rAltura").textContent = altura;

    document.getElementById("rIMC").textContent = imc.toFixed(2);

    document.getElementById("classificacao").textContent = classificacao;

    document.getElementById("resultado").style.display = "block";

});

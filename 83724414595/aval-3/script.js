
// CAPTURAR O FORMULÁRIO

document.getElementById("imcForm").addEventListener("submit", function(event) {

    event.preventDefault();

    // RECEBER OS DADOS DO PACIENTE

    const nome = document.getElementById("nome").value.trim();

    const peso = Number(document.getElementById("peso").value);

    const altura = Number(document.getElementById("altura").value);

    // VALIDAR OS DADOS

    if (nome.length === 0) {
        alert("Digite o nome do paciente!");
        return;
    }

    if (!Number.isFinite(peso) || peso <= 0) {
        alert("Digite um peso válido!");
        return;
    }

    if (!Number.isFinite(altura) || altura <= 0) {
        alert("Digite uma altura válida!");
        return;
    }

    // CALCULAR O IMC

    const imc = peso / (altura * altura);

    // CLASSIFICAR O IMC

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

    // EXIBIR O RESULTADO

    document.getElementById("mensagem").textContent =
        "Resultado calculado para o paciente: " + nome;

    document.getElementById("valorIMC").textContent =
        imc.toFixed(2);

    document.getElementById("classificacao").textContent =
        classificacao;

});

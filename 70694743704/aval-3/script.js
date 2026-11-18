
const formulario = document.getElementById("formIMC");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    // Validar os dados
    if (!nome || !Number.isFinite(peso) ||
        !Number.isFinite(altura) || peso <= 0 || altura <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    let classificacao = "";
    let orientacao = "";

    // Classificar o IMC
    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        orientacao = "Procure orientação de um profissional de saúde.";
    }
    else if (imc < 25) {
        classificacao = "Peso adequado";
        orientacao = "Continue mantendo hábitos saudáveis.";
    }
    else if (imc < 30) {
        classificacao = "Sobrepeso";
        orientacao = "Recomenda-se avaliação dos hábitos de saúde.";
    }
    else if (imc < 35) {
        classificacao = "Obesidade grau I";
        orientacao = "Recomenda-se acompanhamento profissional.";
    }
    else if (imc < 40) {
        classificacao = "Obesidade grau II";
        orientacao = "Procure acompanhamento de saúde.";
    }
    else {
        classificacao = "Obesidade grau III";
        orientacao = "É importante buscar acompanhamento profissional.";
    }

    // Exibir os resultados
    document.getElementById("nomeResultado").textContent =
        "Paciente: " + nome;

    document.getElementById("imcResultado").textContent =
        "IMC: " + imc.toFixed(2);

    document.getElementById("classificacao").textContent =
        "Classificação: " + classificacao;

    document.getElementById("orientacao").textContent =
        "Orientação: " + orientacao;

    document.getElementById("resultado").style.display = "block";

});


const formulario = document.getElementById("formIMC");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const alturaCM = Number(document.getElementById("altura").value);

    // Validar os dados
    if (!nome || peso <= 0 || alturaCM <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(alturaCM)) {

        alert("Por favor, informe todos os dados corretamente.");
        return;
    }

    // Converter altura de centímetros para metros
    const altura = alturaCM / 100;

    // Calcular IMC
    const imc = peso / (altura * altura);

    // Definir classificação
    let classificacao = "";
    let descricao = "";

    if (imc < 18.5) {

        classificacao = "Abaixo do peso";
        descricao = "Seu IMC está abaixo da faixa de referência para adultos.";

    } else if (imc < 25) {

        classificacao = "Peso normal";
        descricao = "Seu IMC está na faixa de referência para adultos.";

    } else if (imc < 30) {

        classificacao = "Sobrepeso";
        descricao = "Seu IMC está acima da faixa de referência para adultos.";

    } else if (imc < 35) {

        classificacao = "Obesidade grau I";
        descricao = "Seu IMC está na faixa de obesidade grau I.";

    } else if (imc < 40) {

        classificacao = "Obesidade grau II";
        descricao = "Seu IMC está na faixa de obesidade grau II.";

    } else {

        classificacao = "Obesidade grau III";
        descricao = "Seu IMC está na faixa de obesidade grau III.";

    }

    // Exibir resultado
    document.getElementById("mensagem").textContent =
        "Cálculo realizado com sucesso!";

    document.getElementById("nomeResultado").textContent =
        "Paciente: " + nome;

    document.getElementById("valorIMC").textContent =
        imc.toFixed(2);

    document.getElementById("classificacao").textContent =
        classificacao;

    document.getElementById("descricao").textContent =
        descricao;

});

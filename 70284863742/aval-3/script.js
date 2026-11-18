
const formulario = document.getElementById("formIMC");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validar os dados
    if (!nome || !Number.isFinite(peso) ||
        !Number.isFinite(altura) || peso <= 0 || altura <= 0) {

        alert("Por favor, informe dados válidos.");
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    let classificacao = "";
    let descricao = "";

    // Identificar a classificação do IMC
    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        descricao = "O resultado está abaixo da faixa de referência. "
                  + "É recomendável avaliar o estado nutricional "
                  + "com um profissional de saúde.";

    } else if (imc < 25) {
        classificacao = "Peso adequado";
        descricao = "O resultado está dentro da faixa de referência "
                  + "de IMC para adultos. Mantenha hábitos saudáveis.";

    } else if (imc < 30) {
        classificacao = "Sobrepeso";
        descricao = "O resultado indica sobrepeso. "
                  + "Uma avaliação profissional pode ajudar "
                  + "a analisar sua saúde e seus hábitos.";

    } else if (imc < 35) {
        classificacao = "Obesidade grau I";
        descricao = "O resultado está na faixa de obesidade grau I. "
                  + "Procure orientação de um profissional de saúde.";

    } else if (imc < 40) {
        classificacao = "Obesidade grau II";
        descricao = "O resultado está na faixa de obesidade grau II. "
                  + "É importante realizar acompanhamento profissional.";

    } else {
        classificacao = "Obesidade grau III";
        descricao = "O resultado está na faixa de obesidade grau III. "
                  + "Procure acompanhamento de uma equipe de saúde.";
    }

    // Exibir os resultados
    document.getElementById("resNome").textContent = nome;

    document.getElementById("resIMC").textContent =
        imc.toFixed(2);

    document.getElementById("classificacao").textContent =
        classificacao;

    document.getElementById("descricao").textContent =
        descricao;

    document.getElementById("resultado").hidden = false;

});

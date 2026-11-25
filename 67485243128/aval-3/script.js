document.getElementById("formIMC").addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    // Validar os dados
    if (
        nome === "" ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 ||
        altura <= 0
    ) {
        alert("Por favor, informe todos os dados corretamente!");
        return;
    }

    // Calcular IMC
    const imc = peso / (altura * altura);

    let classificacao = "";
    let orientacao = "";

    // Classificação do IMC
    if (imc < 18.5) {

        classificacao = "Abaixo do peso";
        orientacao = "O paciente está abaixo do peso recomendado. Recomenda-se avaliação nutricional.";

    } else if (imc < 25) {

        classificacao = "Peso normal";
        orientacao = "O paciente está dentro da faixa de peso considerada adequada.";

    } else if (imc < 30) {

        classificacao = "Sobrepeso";
        orientacao = "O paciente apresenta sobrepeso. Recomenda-se atenção à alimentação e atividade física.";

    } else if (imc < 35) {

        classificacao = "Obesidade grau I";
        orientacao = "Recomenda-se acompanhamento médico e nutricional.";

    } else if (imc < 40) {

        classificacao = "Obesidade grau II";
        orientacao = "É importante procurar acompanhamento profissional.";

    } else {

        classificacao = "Obesidade grau III";
        orientacao = "Recomenda-se avaliação médica especializada.";

    }

    // Exibir os dados do paciente
    document.getElementById("resNome").textContent = nome;

    document.getElementById("resPeso").textContent =
        peso.toFixed(2);

    document.getElementById("resAltura").textContent =
        altura.toFixed(2);

    document.getElementById("resIMC").textContent =
        imc.toFixed(2);

    document.getElementById("resClassificacao").textContent =
        classificacao;

    document.getElementById("orientacao").textContent =
        orientacao;

    // Mostrar resultado
    document.getElementById("resultado").style.display = "block";

});
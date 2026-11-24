function calcularIMC() {

    // Receber os dados do paciente
    let nome = document.getElementById("nome").value.trim();
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    // Verificar se os campos foram preenchidos
    if (nome === "") {
        alert("Digite o nome do paciente.");
        return;
    }

    if (isNaN(peso) || peso <= 0) {
        alert("Digite um peso válido.");
        return;
    }

    if (isNaN(altura) || altura <= 0) {
        alert("Digite uma altura válida.");
        return;
    }

    // Calcular o IMC
    let imc = peso / (altura * altura);

    // Variáveis para classificação e informação
    let classificacao;
    let mensagem;

    // Classificar o IMC
    if (imc < 18.5) {

        classificacao = "Abaixo do peso";

        mensagem =
            "O resultado indica que o IMC está abaixo da faixa considerada adequada. " +
            "É importante avaliar a alimentação e os hábitos de saúde com um profissional.";

    } else if (imc < 25) {

        classificacao = "Peso normal";

        mensagem =
            "O resultado está dentro da faixa de peso considerada adequada para o IMC. " +
            "Manter uma alimentação equilibrada e hábitos saudáveis é importante.";

    } else if (imc < 30) {

        classificacao = "Sobrepeso";

        mensagem =
            "O resultado indica sobrepeso. É recomendado manter uma alimentação equilibrada " +
            "e praticar atividades físicas regularmente.";

    } else if (imc < 35) {

        classificacao = "Obesidade grau I";

        mensagem =
            "O resultado indica obesidade grau I. É importante buscar orientação de um " +
            "profissional de saúde para avaliação individual.";

    } else if (imc < 40) {

        classificacao = "Obesidade grau II";

        mensagem =
            "O resultado indica obesidade grau II. Recomenda-se acompanhamento com " +
            "profissionais de saúde para avaliação e orientação adequada.";

    } else {

        classificacao = "Obesidade grau III";

        mensagem =
            "O resultado indica obesidade grau III. É importante procurar orientação " +
            "profissional para uma avaliação completa e acompanhamento adequado.";
    }

    // Exibir os dados do paciente
    document.getElementById("resultadoNome").textContent = nome;

    document.getElementById("resultadoPeso").textContent =
        peso.toFixed(2) + " kg";

    document.getElementById("resultadoAltura").textContent =
        altura.toFixed(2) + " m";

    document.getElementById("resultadoIMC").textContent =
        imc.toFixed(2);

    document.getElementById("classificacao").textContent =
        classificacao;

    document.getElementById("mensagem").textContent =
        mensagem;

    // Mostrar o resultado
    document.getElementById("resultado").scrollIntoView({
        behavior: "smooth"
    });
}
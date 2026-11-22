
const formulario = document.getElementById("formIMC");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Recebendo os dados
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validando os dados
    if (!nome || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura)) {

        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Calculando o IMC
    const imc = peso / (altura * altura);

    let classificacao;
    let informacao;

    // Classificação para adultos
    if (imc < 18.5) {

        classificacao = "Abaixo do peso";
        informacao = "O resultado está abaixo da faixa de referência para adultos.";

    } else if (imc < 25) {

        classificacao = "Peso adequado";
        informacao = "O resultado está dentro da faixa de referência para adultos.";

    } else if (imc < 30) {

        classificacao = "Sobrepeso";
        informacao = "O resultado está acima da faixa de referência para adultos.";

    } else if (imc < 35) {

        classificacao = "Obesidade grau I";
        informacao = "O resultado indica obesidade grau I pela classificação de IMC adulto.";

    } else if (imc < 40) {

        classificacao = "Obesidade grau II";
        informacao = "O resultado indica obesidade grau II pela classificação de IMC adulto.";

    } else {

        classificacao = "Obesidade grau III";
        informacao = "O resultado indica obesidade grau III pela classificação de IMC adulto.";

    }

    // Exibindo os resultados
    document.getElementById("paciente").textContent =
        "Paciente: " + nome;

    document.getElementById("imc").textContent =
        imc.toFixed(2);

    document.getElementById("classificacao").textContent =
        classificacao;

    document.getElementById("informacao").textContent =
        informacao;

    document.getElementById("resultado").hidden = false;

});

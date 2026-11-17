
const formulario = document.getElementById("formIMC");

const resultado = document.getElementById("resultado");
const resultadoInicial = document.getElementById("resultadoInicial");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    if (!nome || !Number.isFinite(peso) ||
        !Number.isFinite(altura) || peso <= 0 ||
        altura < 0.5 || altura > 2.8) {

        alert("Verifique os dados informados!");
        return;
    }

    // Cálculo do IMC
    const imc = peso / (altura * altura);

    let classificacao = "";
    let mensagem = "";
    let cor = "";

    // Classificação
    if (imc < 18.5) {

        classificacao = "Abaixo do peso";
        mensagem = "O resultado está abaixo da faixa de referência. Procure orientação profissional.";
        cor = "#278bc9";

    } else if (imc < 25) {

        classificacao = "Peso adequado";
        mensagem = "Seu resultado está na faixa de referência considerada adequada para adultos.";
        cor = "#159c69";

    } else if (imc < 30) {

        classificacao = "Sobrepeso";
        mensagem = "O resultado está acima da faixa de referência. Converse com um profissional de saúde.";
        cor = "#d99a19";

    } else if (imc < 35) {

        classificacao = "Obesidade grau I";
        mensagem = "O resultado indica uma faixa de obesidade grau I. Procure acompanhamento profissional.";
        cor = "#e47b36";

    } else if (imc < 40) {

        classificacao = "Obesidade grau II";
        mensagem = "O resultado indica uma faixa de obesidade grau II. Procure acompanhamento profissional.";
        cor = "#df5b4c";

    } else {

        classificacao = "Obesidade grau III";
        mensagem = "O resultado indica uma faixa de obesidade grau III. Procure acompanhamento profissional.";
        cor = "#c83e52";

    }

    // Mostrar resultado
    resultadoInicial.style.display = "none";
    resultado.hidden = false;

    document.getElementById("nomeResultado").textContent =
        "Paciente: " + nome;

    document.getElementById("valorIMC").textContent =
        imc.toFixed(2);

    document.getElementById("classificacao").textContent =
        classificacao;

    document.getElementById("classificacao").style.color = cor;

    document.getElementById("classificacao").style.background =
        cor + "20";

    document.getElementById("mensagem").textContent =
        mensagem;

});

// Limpar formulário
formulario.addEventListener("reset", function() {

    resultado.hidden = true;
    resultadoInicial.style.display = "block";

});


// CAPTURAR O ENVIO DO FORMULÁRIO

document.getElementById("formIMC")
.addEventListener("submit", function(event) {

    event.preventDefault();

    // RECEBER OS DADOS DO PACIENTE

    const nome = document.getElementById("nome").value.trim();

    const peso = Number(document.getElementById("peso").value);

    const altura = Number(document.getElementById("altura").value);

    // VALIDAR OS DADOS

    if (
        !nome ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 ||
        altura <= 0
    ) {

        alert("Preencha todos os campos corretamente!");

        return;

    }

    // CALCULAR O IMC

    const imc = peso / (altura * altura);

    // IDENTIFICAR A CLASSIFICAÇÃO

    let classificacao = "";

    let mensagem = "";

    if (imc < 18.5) {

        classificacao = "Abaixo do peso";

        mensagem = "O IMC está abaixo da faixa de referência.";

    }

    else if (imc < 25) {

        classificacao = "Peso adequado";

        mensagem = "O IMC está na faixa de referência.";

    }

    else if (imc < 30) {

        classificacao = "Sobrepeso";

        mensagem = "O IMC está na faixa de sobrepeso.";

    }

    else if (imc < 35) {

        classificacao = "Obesidade grau I";

        mensagem = "O IMC está na faixa de obesidade grau I.";

    }

    else if (imc < 40) {

        classificacao = "Obesidade grau II";

        mensagem = "O IMC está na faixa de obesidade grau II.";

    }

    else {

        classificacao = "Obesidade grau III";

        mensagem = "O IMC está na faixa de obesidade grau III.";

    }

    // EXIBIR OS DADOS DO PACIENTE

    document.getElementById("resultadoNome")
        .textContent = nome;

    document.getElementById("resultadoPeso")
        .textContent = peso.toFixed(2) + " kg";

    document.getElementById("resultadoAltura")
        .textContent = altura.toFixed(2) + " m";

    document.getElementById("resultadoIMC")
        .textContent = imc.toFixed(2);

    document.getElementById("classificacao")
        .textContent = classificacao;

    document.getElementById("mensagem")
        .textContent = mensagem;

    // MOSTRAR O RESULTADO

    document.getElementById("resultado")
        .style.display = "block";

});


// LIMPAR OS RESULTADOS

function limparResultado() {

    document.getElementById("resultado")
        .style.display = "none";

}

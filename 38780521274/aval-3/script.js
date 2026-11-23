
/* =====================================
   SISTEMA DE CONTROLE DE IMC
===================================== */


/* =====================================
   FUNÇÃO PRINCIPAL: CALCULAR IMC
===================================== */

function calcularIMC() {

    // Receber dados do paciente

    const nome = document
        .getElementById("nome")
        .value.trim();

    const peso = parseFloat(
        document.getElementById("peso").value
    );

    const altura = parseFloat(
        document.getElementById("altura").value
    );


    // Validar informações

    if (
        nome === "" ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 ||
        altura <= 0
    ) {

        alert("Preencha todos os campos corretamente!");

        return;
    }


    // Calcular o IMC

    const imc = peso / (altura * altura);


    // Variáveis para classificação

    let classificacao = "";

    let classe = "";

    let mensagem = "";


    // Identificar classificação do IMC

    if (imc < 18.5) {

        classificacao = "Abaixo do peso";

        classe = "baixo";

        mensagem =
            "O resultado está abaixo da faixa de referência para adultos.";

    }

    else if (imc < 25) {

        classificacao = "Peso adequado";

        classe = "normal";

        mensagem =
            "O resultado está dentro da faixa de referência para adultos.";

    }

    else if (imc < 30) {

        classificacao = "Sobrepeso";

        classe = "sobrepeso";

        mensagem =
            "O resultado está na faixa de sobrepeso para adultos.";

    }

    else {

        classificacao = "Obesidade";

        classe = "obesidade";

        mensagem =
            "O resultado está na faixa de obesidade para adultos.";

    }


    // Exibir nome do paciente

    document.getElementById("resultadoNome").textContent =
        nome;


    // Exibir peso

    document.getElementById("resultadoPeso").textContent =
        peso.toFixed(1);


    // Exibir altura

    document.getElementById("resultadoAltura").textContent =
        altura.toFixed(2);


    // Exibir valor do IMC

    document.getElementById("valorIMC").textContent =
        imc.toFixed(2);


    // Exibir classificação

    const elementoClassificacao =
        document.getElementById("classificacao");

    elementoClassificacao.textContent =
        classificacao;

    elementoClassificacao.className =
        "classificacao " + classe;


    // Exibir mensagem

    document.getElementById("mensagem").textContent =
        mensagem;


    // Mostrar painel de resultado

    document.getElementById("resultado").style.display =
        "block";

}


/* =====================================
   LIMPAR FORMULÁRIO
===================================== */

function limparFormulario() {

    document.getElementById("nome").value = "";

    document.getElementById("peso").value = "";

    document.getElementById("altura").value = "";

    document.getElementById("resultado").style.display =
        "none";

}

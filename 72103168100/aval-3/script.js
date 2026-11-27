
// =====================================
// CALCULADORA DE IMC
// =====================================

// Capturar o formulário
const formulario = document.getElementById("formulario");

// Capturar o evento de envio
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // =====================================
    // 1. RECEBER OS DADOS DO PACIENTE
    // =====================================

    const nome = document.getElementById("nome").value.trim();

    const peso = parseFloat(
        document.getElementById("peso").value
    );

    const altura = parseFloat(
        document.getElementById("altura").value
    );

    // =====================================
    // 2. VALIDAR OS DADOS
    // =====================================

    if (
        nome === "" ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 ||
        altura <= 0 ||
        altura >= 3
    ) {
        alert("Por favor, informe dados válidos!");
        return;
    }

    // =====================================
    // 3. CALCULAR O IMC
    // =====================================

    const imc = peso / (altura * altura);

    // Variáveis para classificação
    let classificacao = "";
    let informacao = "";

    // =====================================
    // 4. CLASSIFICAR O IMC
    // =====================================

    if (imc < 18.5) {

        classificacao = "Abaixo do peso";

        informacao =
            "Seu IMC está abaixo da faixa de referência. " +
            "Recomenda-se avaliação nutricional.";

    } else if (imc < 25) {

        classificacao = "Peso normal";

        informacao =
            "Seu IMC está dentro da faixa de referência. " +
            "Continue mantendo hábitos saudáveis.";

    } else if (imc < 30) {

        classificacao = "Sobrepeso";

        informacao =
            "Seu IMC indica sobrepeso. " +
            "Procure manter uma alimentação equilibrada " +
            "e praticar atividades físicas.";

    } else if (imc < 35) {

        classificacao = "Obesidade grau I";

        informacao =
            "Seu IMC indica obesidade grau I. " +
            "Recomenda-se acompanhamento profissional.";

    } else if (imc < 40) {

        classificacao = "Obesidade grau II";

        informacao =
            "Seu IMC indica obesidade grau II. " +
            "É importante buscar acompanhamento médico.";

    } else {

        classificacao = "Obesidade grau III";

        informacao =
            "Seu IMC indica obesidade grau III. " +
            "Recomenda-se acompanhamento multiprofissional.";

    }

    // =====================================
    // 5. EXIBIR OS RESULTADOS
    // =====================================

    document.getElementById("resNome").textContent = nome;

    document.getElementById("resPeso").textContent =
        peso.toFixed(1);

    document.getElementById("resAltura").textContent =
        altura.toFixed(2);

    document.getElementById("resIMC").textContent =
        imc.toFixed(2);

    document.getElementById("resClassificacao").textContent =
        classificacao;

    document.getElementById("resInformacao").textContent =
        informacao;

    // Mostrar a área de resultado
    document.getElementById("resultado").style.display = "block";

});

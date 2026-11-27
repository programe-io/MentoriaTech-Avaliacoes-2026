
// ==========================================
// SISTEMA DE CÁLCULO DO IMC DO PACIENTE
// ==========================================

// Capturar o formulário
const formulario = document.getElementById("formulario");

// Evento para calcular o IMC
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // ======================================
    // 1. RECEBER OS DADOS DO PACIENTE
    // ======================================

    const nome = document.getElementById("nome").value.trim();

    const peso = parseFloat(
        document.getElementById("peso").value
    );

    const altura = parseFloat(
        document.getElementById("altura").value
    );

    // ======================================
    // 2. VALIDAR OS DADOS
    // ======================================

    if (
        nome === "" ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 ||
        altura <= 0 ||
        altura >= 3
    ) {

        alert("Por favor, informe todos os dados corretamente!");

        return;
    }

    // ======================================
    // 3. CALCULAR O IMC
    // ======================================

    const imc = peso / (altura * altura);

    // Criar variáveis
    let classificacao = "";
    let informacao = "";

    // ======================================
    // 4. CLASSIFICAR O IMC
    // ======================================

    if (imc < 18.5) {

        classificacao = "Abaixo do peso";

        informacao =
            "O paciente apresenta IMC abaixo da faixa de referência. " +
            "Recomenda-se avaliação nutricional.";

    } else if (imc < 25) {

        classificacao = "Peso normal";

        informacao =
            "O paciente apresenta IMC dentro da faixa de referência. " +
            "É importante manter hábitos saudáveis.";

    } else if (imc < 30) {

        classificacao = "Sobrepeso";

        informacao =
            "O paciente apresenta sobrepeso. " +
            "Recomenda-se atenção à alimentação e atividade física.";

    } else if (imc < 35) {

        classificacao = "Obesidade grau I";

        informacao =
            "O paciente apresenta obesidade grau I. " +
            "Recomenda-se acompanhamento profissional.";

    } else if (imc < 40) {

        classificacao = "Obesidade grau II";

        informacao =
            "O paciente apresenta obesidade grau II. " +
            "É importante procurar acompanhamento médico.";

    } else {

        classificacao = "Obesidade grau III";

        informacao =
            "O paciente apresenta obesidade grau III. " +
            "Recomenda-se acompanhamento multiprofissional.";

    }

    // ======================================
    // 5. EXIBIR OS DADOS DO PACIENTE
    // ======================================

    document.getElementById("resNome").textContent = nome;

    document.getElementById("resPeso").textContent =
        peso.toFixed(1);

    document.getElementById("resAltura").textContent =
        altura.toFixed(2);

    // ======================================
    // 6. EXIBIR O RESULTADO DO IMC
    // ======================================

    document.getElementById("resIMC").textContent =
        imc.toFixed(2);

    document.getElementById("resClassificacao").textContent =
        classificacao;

    document.getElementById("resInformacao").textContent =
        informacao;

    // ======================================
    // 7. MOSTRAR RESULTADO NA TELA
    // ======================================

    document.getElementById("resultado").style.display = "block";

});

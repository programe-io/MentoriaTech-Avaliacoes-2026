// ==========================================
// PROJETO PRÁTICO - CONTROLE DE IMC
// ==========================================


// Função responsável por calcular o IMC
function calcularIMC() {

    // ==========================================
    // 1. RECEBER OS DADOS DO PACIENTE
    // ==========================================

    const nome = document.getElementById("nome").value.trim();

    const peso = parseFloat(
        document.getElementById("peso").value
    );

    const altura = parseFloat(
        document.getElementById("altura").value
    );


    // ==========================================
    // 2. VALIDAR OS DADOS
    // ==========================================

    if (nome === "") {
        alert("Por favor, informe o nome do paciente.");
        return;
    }

    if (isNaN(peso) || peso <= 0) {
        alert("Por favor, informe um peso válido.");
        return;
    }

    if (isNaN(altura) || altura <= 0) {
        alert("Por favor, informe uma altura válida.");
        return;
    }


    // ==========================================
    // 3. CALCULAR O IMC
    // ==========================================

    // Fórmula:
    // IMC = peso / (altura × altura)

    const imc = peso / (altura * altura);


    // ==========================================
    // 4. DEFINIR A CLASSIFICAÇÃO
    // ==========================================

    let classificacao;
    let mensagem;


    if (imc < 18.5) {

        classificacao = "Abaixo do peso";

        mensagem =
            "O IMC está abaixo de 18,5. " +
            "Esse resultado pode indicar baixo peso. " +
            "Uma avaliação profissional pode ajudar a entender melhor a situação.";

    }

    else if (imc < 25) {

        classificacao = "Peso normal";

        mensagem =
            "O IMC está entre 18,5 e 24,9. " +
            "Essa faixa é considerada adequada para o IMC. " +
            "É importante manter hábitos de vida saudáveis.";

    }

    else if (imc < 30) {

        classificacao = "Sobrepeso";

        mensagem =
            "O IMC está entre 25 e 29,9. " +
            "Esse resultado é classificado como sobrepeso. " +
            "Uma alimentação equilibrada e atividade física podem contribuir para a saúde.";

    }

    else if (imc < 35) {

        classificacao = "Obesidade grau I";

        mensagem =
            "O IMC está entre 30 e 34,9. " +
            "Esse resultado é classificado como obesidade grau I. " +
            "É recomendado buscar orientação de um profissional de saúde.";

    }

    else if (imc < 40) {

        classificacao = "Obesidade grau II";

        mensagem =
            "O IMC está entre 35 e 39,9. " +
            "Esse resultado é classificado como obesidade grau II. " +
            "É importante procurar orientação profissional para uma avaliação adequada.";

    }

    else {

        classificacao = "Obesidade grau III";

        mensagem =
            "O IMC é igual ou superior a 40. " +
            "Esse resultado é classificado como obesidade grau III. " +
            "Recomenda-se acompanhamento com profissionais de saúde.";

    }


    // ==========================================
    // 5. EXIBIR OS DADOS DO PACIENTE
    // ==========================================

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


    // ==========================================
    // 6. MOSTRAR O RESULTADO
    // ==========================================

    document.getElementById("resultado").style.display = "block";


    // Rolar automaticamente até o resultado
    document.getElementById("resultado").scrollIntoView({
        behavior: "smooth"
    });
}
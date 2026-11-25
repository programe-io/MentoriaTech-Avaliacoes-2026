
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validar dados
    if (!nome || !Number.isFinite(peso) ||
        !Number.isFinite(altura) || peso <= 0 || altura <= 0) {
        alert("Informe corretamente todos os dados!");
        return;
    }

    // Calcular IMC
    const imc = peso / (altura * altura);

    let classificacao = "";
    let informacao = "";

    // Classificação do IMC para adultos
    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        informacao = "IMC abaixo da faixa adequada. Recomenda-se avaliação nutricional.";

    } else if (imc < 25) {
        classificacao = "Peso adequado";
        informacao = "IMC dentro da faixa adequada para adultos. Mantenha hábitos saudáveis.";

    } else if (imc < 30) {
        classificacao = "Sobrepeso";
        informacao = "Indica excesso de peso. Recomenda-se atenção à alimentação e exercícios.";

    } else if (imc < 35) {
        classificacao = "Obesidade grau I";
        informacao = "Recomenda-se acompanhamento de profissionais de saúde.";

    } else if (imc < 40) {
        classificacao = "Obesidade grau II";
        informacao = "Recomenda-se acompanhamento médico e nutricional.";

    } else {
        classificacao = "Obesidade grau III";
        informacao = "Recomenda-se acompanhamento multiprofissional.";
    }

    // Exibir resultados
    document.getElementById("resNome").textContent = nome;

    document.getElementById("resIMC").textContent =
        "IMC: " + imc.toFixed(2) + " kg/m²";

    document.getElementById("classificacao").textContent =
        classificacao;

    document.getElementById("informacao").textContent =
        informacao;

    document.getElementById("resultado").style.display = "block";
});

// Nova avaliação
function novaConsulta() {
    formulario.reset();

    document.getElementById("resultado").style.display = "none";
}

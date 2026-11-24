
function calcularIMC() {

    // Receber os dados do paciente
    let nome = document.getElementById("nome").value.trim();
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    // Validar os campos
    if (
        nome === "" ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 ||
        altura <= 0
    ) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }

    // Calcular o IMC
    let imc = peso / (altura * altura);

    let classificacao = "";
    let informacao = "";

    // Verificar a classificação do IMC
    if (imc < 18.5) {

        classificacao = "Abaixo do peso";
        informacao = "O paciente está abaixo do peso considerado adequado. Recomenda-se avaliação profissional.";

    } else if (imc < 25) {

        classificacao = "Peso normal";
        informacao = "O paciente está dentro da faixa de peso considerada adequada para adultos. Continue mantendo hábitos saudáveis.";

    } else if (imc < 30) {

        classificacao = "Sobrepeso";
        informacao = "O paciente apresenta sobrepeso. Recomenda-se atenção à alimentação e prática de atividades físicas.";

    } else if (imc < 35) {

        classificacao = "Obesidade Grau I";
        informacao = "O paciente apresenta obesidade grau I. Recomenda-se acompanhamento profissional.";

    } else if (imc < 40) {

        classificacao = "Obesidade Grau II";
        informacao = "O paciente apresenta obesidade grau II. É importante buscar acompanhamento médico.";

    } else {

        classificacao = "Obesidade Grau III";
        informacao = "O paciente apresenta obesidade grau III. Recomenda-se acompanhamento especializado.";

    }

    // Exibir os resultados na tela
    document.getElementById("nomeResultado").textContent = nome;

    document.getElementById("valorIMC").textContent =
        "IMC: " + imc.toFixed(2).replace(".", ",");

    document.getElementById("classificacao").textContent =
        classificacao;

    document.getElementById("informacao").textContent =
        informacao;

    document.getElementById("resultado").style.display = "block";

}

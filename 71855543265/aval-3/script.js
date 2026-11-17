
const formulario = document.getElementById("formIMC");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    // Verificar os dados
    if (!nome || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {

        alert("Por favor, informe dados válidos!");
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Classificar o IMC
    let classificacao;
    let mensagem;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        mensagem = "Procure orientação de um profissional de saúde.";
    }
    else if (imc < 25) {
        classificacao = "Peso adequado";
        mensagem = "Seu IMC está na faixa considerada adequada.";
    }
    else if (imc < 30) {
        classificacao = "Sobrepeso";
        mensagem = "Procure orientação para avaliar sua saúde.";
    }
    else if (imc < 35) {
        classificacao = "Obesidade grau I";
        mensagem = "É recomendado procurar acompanhamento profissional.";
    }
    else if (imc < 40) {
        classificacao = "Obesidade grau II";
        mensagem = "É importante buscar acompanhamento profissional.";
    }
    else {
        classificacao = "Obesidade grau III";
        mensagem = "Procure acompanhamento de um profissional de saúde.";
    }

    // Exibir o resultado
    resultado.style.display = "block";

    resultado.innerHTML = `
        <h3>Resultado do Paciente</h3>

        <p><strong>Nome:</strong> ${nome.replace(/[&<>"']/g, function(c) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[c];
        })}</p>

        <p><strong>Peso:</strong> ${peso.toFixed(1)} kg</p>

        <p><strong>Altura:</strong> ${altura.toFixed(2)} m</p>

        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>

        <p><strong>Classificação:</strong> ${classificacao}</p>

        <p>${mensagem}</p>
    `;

});

// Limpar resultado quando clicar em limpar
formulario.addEventListener("reset", function() {
    resultado.style.display = "none";
    resultado.innerHTML = "";
});

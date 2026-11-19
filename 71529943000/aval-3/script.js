
const formulario = document.getElementById("formIMC");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validar os dados
    if (!nome || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {

        alert("Por favor, informe todos os dados corretamente!");
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Identificar a classificação
    let classificacao;
    let mensagem;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        mensagem = "O IMC está abaixo da faixa considerada normal.";
    }
    else if (imc < 25) {
        classificacao = "Peso normal";
        mensagem = "O IMC está dentro da faixa considerada normal.";
    }
    else if (imc < 30) {
        classificacao = "Sobrepeso";
        mensagem = "O IMC está acima da faixa considerada normal.";
    }
    else if (imc < 35) {
        classificacao = "Obesidade grau I";
        mensagem = "O resultado indica obesidade grau I.";
    }
    else if (imc < 40) {
        classificacao = "Obesidade grau II";
        mensagem = "O resultado indica obesidade grau II.";
    }
    else {
        classificacao = "Obesidade grau III";
        mensagem = "O resultado indica obesidade grau III.";
    }

    // Exibir as informações
    resultado.style.display = "block";

    resultado.innerHTML = `
        <h2>Resultado do paciente</h2>

        <p><strong>Nome:</strong> ${nome.replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char])}</p>

        <p><strong>Peso:</strong> ${peso.toFixed(1)} kg</p>

        <p><strong>Altura:</strong> ${altura.toFixed(2)} m</p>

        <p><strong>IMC:</strong></p>

        <p class="valor-imc">${imc.toFixed(2)}</p>

        <p><strong>Classificação:</strong> ${classificacao}</p>

        <p>${mensagem}</p>
    `;

});

// Limpar os dados
formulario.addEventListener("reset", function() {
    resultado.style.display = "none";
    resultado.innerHTML = "";
});

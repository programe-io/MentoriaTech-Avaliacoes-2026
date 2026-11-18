
const form = document.getElementById("formIMC");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    // Validar os dados
    if (!nome || !Number.isFinite(peso) ||
        !Number.isFinite(altura) || peso <= 0 || altura <= 0) {

        alert("Informe dados válidos para calcular o IMC!");
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    let classificacao = "";
    let informacao = "";
    let cor = "";

    // Classificar o IMC (adultos)
    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        informacao = "O IMC está abaixo da faixa considerada adequada. Procure orientação profissional.";
        cor = "#fff3cd";

    } else if (imc < 25) {
        classificacao = "Peso adequado";
        informacao = "O IMC está dentro da faixa de referência para adultos.";
        cor = "#d4edda";

    } else if (imc < 30) {
        classificacao = "Sobrepeso";
        informacao = "O IMC está acima da faixa de referência. Procure orientação profissional.";
        cor = "#fff3cd";

    } else if (imc < 35) {
        classificacao = "Obesidade grau I";
        informacao = "O resultado indica obesidade grau I. É recomendável acompanhamento profissional.";
        cor = "#f8d7da";

    } else if (imc < 40) {
        classificacao = "Obesidade grau II";
        informacao = "O resultado indica obesidade grau II. Procure acompanhamento de saúde.";
        cor = "#f8d7da";

    } else {
        classificacao = "Obesidade grau III";
        informacao = "O resultado indica obesidade grau III. É importante buscar acompanhamento de saúde.";
        cor = "#f8d7da";
    }

    // Exibir resultado
    resultado.style.display = "block";
    resultado.style.backgroundColor = cor;

    resultado.innerHTML = `
        <h2>Resultado do Paciente</h2>

        <p><strong>Nome:</strong> ${nome.replace(/[&<>"']/g, c =>
            ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}</p>

        <p><strong>Peso:</strong> ${peso.toFixed(1)} kg</p>

        <p><strong>Altura:</strong> ${altura.toFixed(2)} m</p>

        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>

        <p><strong>Classificação:</strong> ${classificacao}</p>

        <p>${informacao}</p>
    `;
});

// Limpar resultado ao limpar formulário
form.addEventListener("reset", function() {
    resultado.style.display = "none";
    resultado.innerHTML = "";
});

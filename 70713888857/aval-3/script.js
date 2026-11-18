
document.getElementById("formIMC").addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById("nome").value.trim();
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    // Validar informações
    if (!nome || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Classificar o IMC (adultos)
    let classificacao = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Peso normal";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
    } else if (imc < 35) {
        classificacao = "Obesidade grau I";
    } else if (imc < 40) {
        classificacao = "Obesidade grau II";
    } else {
        classificacao = "Obesidade grau III";
    }

    // Exibir resultado
    const resultado = document.getElementById("resultado");

    resultado.style.display = "block";

    resultado.innerHTML = `
        <h2>Resultado do Paciente</h2>

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
    `;

});

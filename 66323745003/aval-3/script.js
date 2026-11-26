
function calcularIMC() {

    // Receber os dados do paciente
    let nome = document.getElementById("nome").value.trim();
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    // Validar os campos
    if (nome === "" || !Number.isFinite(peso) ||
        !Number.isFinite(altura) || peso <= 0 || altura <= 0) {

        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }

    // Calcular o IMC
    let imc = peso / (altura * altura);

    // Identificar a classificação
    let classificacao = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    }
    else if (imc < 25) {
        classificacao = "Peso normal";
    }
    else if (imc < 30) {
        classificacao = "Sobrepeso";
    }
    else if (imc < 35) {
        classificacao = "Obesidade grau I";
    }
    else if (imc < 40) {
        classificacao = "Obesidade grau II";
    }
    else {
        classificacao = "Obesidade grau III";
    }

    // Exibir os resultados
    let resultado = document.getElementById("resultado");

    resultado.style.display = "block";

    resultado.innerHTML = `
        <h3>Resultado do Paciente</h3>

        <p><strong>Nome:</strong> ${nome
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</p>

        <p><strong>Peso:</strong> ${peso} kg</p>

        <p><strong>Altura:</strong> ${altura} m</p>

        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>

        <p><strong>Classificação:</strong> ${classificacao}</p>
    `;
}

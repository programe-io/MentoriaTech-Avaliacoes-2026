function calcularIMC() {
    const nome = document.getElementById('nome').value.trim();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const divResultado = document.getElementById('resultado');

    if (!nome || isNaN(peso) || isNaN(altura) || altura <= 0 || peso <= 0) {
        alert("Por favor, preencha todos os campos com valores válidos!");
        return;
    }

    const imc = peso / (altura * altura);
    let classificacao = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25.0) {
        classificacao = "Peso normal";
    } else if (imc < 30.0) {
        classificacao = "Sobrepeso";
    } else if (imc < 35.0) {
        classificacao = "Obesidade Grau I";
    } else if (imc < 40.0) {
        classificacao = "Obesidade Grau II";
    } else {
        classificacao = "Obesidade Grau III (Mórbida)";
    }

    divResultado.style.display = "block";
    divResultado.innerHTML = `
        <p><strong>Paciente:</strong> ${nome}</p>
        <p><strong>Peso:</strong> ${peso.toFixed(1)} kg | <strong>Altura:</strong> ${altura.toFixed(2)} m</p>
        <p><strong>IMC Calculado:</strong> ${imc.toFixed(2)}</p>
        <p><strong>Classificação:</strong> ${classificacao}</p>
    `;
}

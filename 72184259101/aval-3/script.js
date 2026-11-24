function calcularIMC() {
    // 1. Receber os dados do formulário
    const nome = document.getElementById('nome').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const divResultado = document.getElementById('resultado');

    // Validação simples dos campos
    if (!nome || isNaN(peso) || isNaN(altura) || altura <= 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // 2. Calcular o IMC
    const imc = peso / (altura * altura);
    
    // Classificação de acordo com a OMS
    let classificacao = "";
    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 25) {
        classificacao = "Peso normal";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
    } else if (imc < 35) {
        classificacao = "Obesidade Grau I";
    } else if (imc < 40) {
        classificacao = "Obesidade Grau II";
    } else {
        classificacao = "Obesidade Grau III";
    }

    // 3. Exibir as informações na tela
    divResultado.style.display = "block";
    divResultado.innerHTML = `
        <h3>Ficha do Paciente</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
        <p><strong>Classificação:</strong> ${classificacao}</p>
    `;
}
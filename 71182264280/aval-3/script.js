document.getElementById('formIMC').addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Receber os dados do paciente
    const nome = document.getElementById('nome').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // 2. Calcular o IMC
    const imc = peso / (altura * altura);

    // 3. Classificar o IMC
    let classificacao = '';
    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
    } else if (imc < 25) {
        classificacao = 'Peso normal';
    } else if (imc < 30) {
        classificacao = 'Sobrepeso';
    } else if (imc < 35) {
        classificacao = 'Obesidade Grau I';
    } else if (imc < 40) {
        classificacao = 'Obesidade Grau II';
    } else {
        classificacao = 'Obesidade Grau III (Mórbida)';
    }

    // 4. Exibir informações acerca do IMC do paciente
    const divResultado = document.getElementById('resultado');
    divResultado.style.display = 'block';
    divResultado.innerHTML = `
        <strong>Paciente:</strong> ${nome}<br>
        <strong>IMC calculado:</strong> ${imc.toFixed(2)}<br>
        <strong>Classificação:</strong> ${classificacao}
    `;
});

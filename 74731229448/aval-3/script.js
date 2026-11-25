const botaoCalcular = document.getElementById('btn-calcular');
const divResultado = document.getElementById('resultado');

botaoCalcular.addEventListener('click', function() {
    // 1. Pegar os valores dos inputs
    const nome = document.getElementById('nome').value.trim();
    const pesoTexto = document.getElementById('peso').value.replace(',', '.');
    const alturaTexto = document.getElementById('altura').value.replace(',', '.');

    const peso = parseFloat(pesoTexto);
    const altura = parseFloat(alturaTexto);

    // 2. Validar se os dados são válidos
    if (!nome || isNaN(peso) || isNaN(altura) || altura <= 0) {
        alert('Preencha o nome, o peso e a altura corretamente.');
        return;
    }

    // 3. Calcular o IMC
    const imc = peso / (altura * altura);

    // 4. Definir a classificação
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

    // 5. Mostrar o resultado na tela
    divResultado.innerHTML = `
        <strong>Paciente:</strong> ${nome} <br>
        <strong>IMC:</strong> ${imc.toFixed(2)} <br>
        <strong>Classificação:</strong> ${classificacao}
    `;

    divResultado.classList.remove('oculto');
});

const form = document.getElementById('imc-form');

form.addEventListener('submit', function(evento) {

    evento.preventDefault();

    // Receber os dados do paciente
    const nome = document.getElementById('nome').value.trim();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    // Verificar se os dados são válidos
    if (!nome || !Number.isFinite(peso) ||
        !Number.isFinite(altura) || peso <= 0 || altura <= 0) {

        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    let classificacao = '';

    // Classificação do IMC para adultos
    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';

    } else if (imc < 25) {
        classificacao = 'Faixa de peso normal';

    } else if (imc < 30) {
        classificacao = 'Sobrepeso';

    } else if (imc < 35) {
        classificacao = 'Obesidade Grau I';

    } else if (imc < 40) {
        classificacao = 'Obesidade Grau II';

    } else {
        classificacao = 'Obesidade Grau III';
    }

    // Exibir os dados do paciente
    document.getElementById('nome-paciente').textContent = nome;

    document.getElementById('peso-paciente').textContent =
        peso + ' kg';

    document.getElementById('altura-paciente').textContent =
        altura + ' m';

    document.getElementById('valor-imc').textContent =
        imc.toFixed(2);

    document.getElementById('classificacao-imc').textContent =
        classificacao;

    // Informar se está na faixa de sobrepeso
    const situacao = document.getElementById('situacao-peso');

    if (imc >= 25) {
        situacao.textContent =
            'O IMC está na faixa de sobrepeso ou acima.';
    } else {
        situacao.textContent =
            'O IMC está abaixo da faixa de sobrepeso.';
    }

    // Mostrar resultado
    document.getElementById('resultado')
        .classList.remove('oculto');

});

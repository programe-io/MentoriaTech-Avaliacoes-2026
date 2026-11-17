
const formulario = document.getElementById('form-pessoa');

const resultado = document.getElementById('resultado');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const peso = Number(document.getElementById('peso').value);
    const altura = Number(document.getElementById('altura').value);

    if (!nome || peso <= 0 || altura <= 0) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    // Calcular o IMC
    const imc = peso / (altura * altura);

    // Classificar o IMC
    let classificacao;

    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
    } else if (imc < 25) {
        classificacao = 'Peso normal';
    } else if (imc < 30) {
        classificacao = 'Sobrepeso';
    } else if (imc < 35) {
        classificacao = 'Obesidade grau I';
    } else if (imc < 40) {
        classificacao = 'Obesidade grau II';
    } else {
        classificacao = 'Obesidade grau III';
    }

    // Exibir os resultados
    document.getElementById('nome-resultado').textContent =
        'Nome: ' + nome;

    document.getElementById('peso-resultado').textContent =
        'Peso: ' + peso.toLocaleString('pt-BR') + ' kg';

    document.getElementById('altura-resultado').textContent =
        'Altura: ' + altura.toLocaleString('pt-BR') + ' m';

    document.getElementById('imc-resultado').textContent =
        'IMC: ' + imc.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    document.getElementById('classificacao').textContent =
        'Classificação: ' + classificacao;

    resultado.hidden = false;
});

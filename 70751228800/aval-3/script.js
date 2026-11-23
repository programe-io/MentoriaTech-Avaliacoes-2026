const form = document.getElementById('formImc');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', function(evento) {
    evento.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    const imc = peso / (altura * altura);
    let classificacao = '';

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

    resultado.style.display = 'block';
    resultado.innerHTML = `
        <p><strong>Paciente:</strong> ${nome}</p>
        <p><strong>Peso:</strong> ${peso.toFixed(1)} kg</p>
        <p><strong>Altura:</strong> ${altura.toFixed(2)} m</p>
        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
        <p><strong>Classificação:</strong> ${classificacao}</p>
    `;
});
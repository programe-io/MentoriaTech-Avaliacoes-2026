function calcularIMC() {
  const nome = document.getElementById('nome').value;
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const caixaResultado = document.getElementById('resultado');

  if (!nome || isNaN(peso) || isNaN(altura) || altura <= 0) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  const imc = peso / (altura * altura);
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
    classificacao = 'Obesidade Grau III';
  }

  caixaResultado.innerHTML = `
    <p><strong>Paciente:</strong> ${nome}</p>
    <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
    <p><strong>Classificação:</strong> ${classificacao}</p>
  `;
  caixaResultado.classList.add('ativo');
}

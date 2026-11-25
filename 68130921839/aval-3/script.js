function calcularIMC() {
  const divResultado = document.getElementById('resultado');

  // 1. Receber dados e trocar vírgula por ponto automaticamente
  const nome = document.getElementById('nome').value.trim();
  const pesoTexto = document.getElementById('peso').value.replace(',', '.');
  const alturaTexto = document.getElementById('altura').value.replace(',', '.');

  const peso = parseFloat(pesoTexto);
  const altura = parseFloat(alturaTexto);

  // Validação
  if (!nome || isNaN(peso) || isNaN(altura) || altura <= 0 || peso <= 0) {
    alert('Por favor, preencha todos os campos com valores válidos.');
    return;
  }

  // 2. Calcular o IMC
  const imc = peso / (altura * altura);

  // Classificação
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

  // 3. Exibir informações na tela
  divResultado.innerHTML = `
    <p><strong>Paciente:</strong> ${nome}</p>
    <p><strong>IMC Calculado:</strong> ${imc.toFixed(2)}</p>
    <p><strong>Classificação:</strong> ${classificacao}</p>
  `;
  divResultado.classList.remove('oculto');
}

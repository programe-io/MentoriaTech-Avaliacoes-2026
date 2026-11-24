// Selecionando os elementos do DOM
const form = document.getElementById('form-imc');
const caixaResultado = document.getElementById('resultado');

// Evento de envio do formulário
form.addEventListener('submit', function(evento) {
  // Evita que a página recarregue ao enviar o formulário
  evento.preventDefault();

  // 1. Receber o Nome, Peso e Altura
  const nome = document.getElementById('nome').value.trim();
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);

  // Validação simples para evitar divisão por zero ou valores negativos
  if (!nome || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    alert('Por favor, preencha todos os campos com valores válidos.');
    return;
  }

  // 2. Calcular o IMC
  const imc = peso / (altura * altura);

  // 3. Definir classificação e cor de destaque
  let classificacao = '';
  let classeCor = '';

  if (imc < 18.5) {
    classificacao = 'Abaixo do peso';
    classeCor = 'atencao';
  } else if (imc < 25) {
    classificacao = 'Peso normal';
    classeCor = 'normal';
  } else if (imc < 30) {
    classificacao = 'Sobrepeso';
    classeCor = 'atencao';
  } else if (imc < 35) {
    classificacao = 'Obesidade Grau I';
    classeCor = 'alerta';
  } else if (imc < 40) {
    classificacao = 'Obesidade Grau II';
    classeCor = 'alerta';
  } else {
    classificacao = 'Obesidade Grau III';
    classeCor = 'alerta';
  }

  // 4. Exibir informações acerca do IMC do Paciente
  caixaResultado.className = `resultado ${classeCor}`;
  caixaResultado.innerHTML = `
    <h2>Resultado de ${nome}</h2>
    <p><strong>Peso:</strong> ${peso.toFixed(1)} kg | <strong>Altura:</strong> ${altura.toFixed(2)} m</p>
    <p><strong>IMC Calculado:</strong> ${imc.toFixed(2)}</p>
    <p><strong>Classificação:</strong> ${classificacao}</p>
  `;
});

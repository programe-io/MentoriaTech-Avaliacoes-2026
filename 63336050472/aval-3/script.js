const form = document.getElementById('form-imc');
const divResultado = document.getElementById('resultado');

form.addEventListener('submit', function(evento) {
  evento.preventDefault(); // Evita o recarregamento da página

  const nome = document.getElementById('nome').value.trim();
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);

  if (!nome || isNaN(peso) || isNaN(altura) || altura <= 0 || peso <= 0) {
    alert('Por favor, preencha todos os campos com valores válidos.');
    return;
  }

  const imc = peso / (altura * altura);
  const classificacao = obterClassificacao(imc);

  divResultado.innerHTML = `
    <strong>Paciente:</strong> ${nome}<br>
    <strong>IMC:</strong> ${imc.toFixed(2)}<br>
    <strong>Classificação:</strong> ${classificacao}
  `;
  divResultado.classList.remove('oculto');
});

function obterClassificacao(imc) {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidade Grau I';
  if (imc < 40) return 'Obesidade Grau II';
  return 'Obesidade Grau III';
}

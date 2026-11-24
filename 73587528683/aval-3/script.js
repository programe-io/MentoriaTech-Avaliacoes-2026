const form = document.getElementById('imc-form');
const inputPeso = document.getElementById('peso');
const inputAltura = document.getElementById('altura');
const btnLimpar = document.getElementById('btn-limpar');

const boxResultado = document.getElementById('resultado');
const valorImcEl = document.getElementById('valor-imc');
const classificacaoEl = document.getElementById('classificacao');

form.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const peso = parseFloat(inputPeso.value);
  let altura = parseFloat(inputAltura.value);

  // Validação básica
  if (!peso || !altura || peso <= 0 || altura <= 0) {
    alert('Por favor, insira valores válidos para peso e altura.');
    return;
  }

  // Converte automaticamente se o usuário digitar em centímetros (ex: 175 -> 1.75)
  if (altura > 3) {
    altura = altura / 100;
  }

  // Cálculo do IMC: peso / altura²
  const imc = peso / (altura * altura);

  exibirResultado(imc);
});

function exibirResultado(imc) {
  valorImcEl.textContent = imc.toFixed(1).replace('.', ',');

  // Remove classes anteriores
  classificacaoEl.className = 'badge';

  if (imc < 18.5) {
    classificacaoEl.textContent = 'Abaixo do peso';
    classificacaoEl.classList.add('baixo');
  } else if (imc < 25) {
    classificacaoEl.textContent = 'Peso normal';
    classificacaoEl.classList.add('normal');
  } else if (imc < 30) {
    classificacaoEl.textContent = 'Sobrepeso';
    classificacaoEl.classList.add('sobrepeso');
  } else if (imc < 35) {
    classificacaoEl.textContent = 'Obesidade Grau I';
    classificacaoEl.classList.add('obesidade');
  } else if (imc < 40) {
    classificacaoEl.textContent = 'Obesidade Grau II';
    classificacaoEl.classList.add('obesidade');
  } else {
    classificacaoEl.textContent = 'Obesidade Grau III';
    classificacaoEl.classList.add('obesidade');
  }

  boxResultado.classList.remove('oculto');
}

btnLimpar.addEventListener('click', function () {
  inputPeso.value = '';
  inputAltura.value = '';
  boxResultado.classList.add('oculto');
  inputPeso.focus();
});
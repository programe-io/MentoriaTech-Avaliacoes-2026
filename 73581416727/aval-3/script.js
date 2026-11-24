const form = document.getElementById('imc-form');
const resultadoDiv = document.getElementById('resultado');
const valorNumero = document.getElementById('valor-numero');
const classificacaoTexto = document.getElementById('classificacao');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const peso = parseFloat(document.getElementById('peso').value);
  let altura = parseFloat(document.getElementById('altura').value);

  // Converte centímetros para metros caso o usuário digite Ex: 175
  if (altura > 3) {
    altura = altura / 100;
  }

  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    alert('Por favor, insira valores válidos.');
    return;
  }

  const imc = peso / (altura * altura);
  exibirResultado(imc);
});

function exibirResultado(imc) {
  let texto = '';
  let classeCss = '';

  if (imc < 18.5) {
    texto = 'Abaixo do peso';
    classeCss = 'abaixo';
  } else if (imc < 25) {
    texto = 'Peso normal';
    classeCss = 'normal';
  } else if (imc < 30) {
    texto = 'Sobrepeso';
    classeCss = 'sobrepeso';
  } else if (imc < 35) {
    texto = 'Obesidade Grau I';
    classeCss = 'obesidade';
  } else if (imc < 40) {
    texto = 'Obesidade Grau II';
    classeCss = 'obesidade';
  } else {
    texto = 'Obesidade Grau III';
    classeCss = 'obesidade';
  }

  valorNumero.textContent = imc.toFixed(1).replace('.', ',');
  classificacaoTexto.textContent = texto;
  
  // Reseta classes anteriores e aplica a cor correspondente
  classificacaoTexto.className = `classificacao ${classeCss}`;
  resultadoDiv.classList.remove('oculto');
}
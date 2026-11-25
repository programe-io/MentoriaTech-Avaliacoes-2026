const form = document.getElementById('form-imc');
const inputPeso = document.getElementById('peso');
const inputAltura = document.getElementById('altura');
const divResultado = document.getElementById('resultado');
const btnLimpar = document.getElementById('btn-limpar');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const peso = parseFloat(inputPeso.value);
  let altura = parseFloat(inputAltura.value);

  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    exibirResultado('Valores inválidos', 'Por favor, informe peso e altura maiores que zero.', 'erro');
    return;
  }

  if (altura > 3) {
    altura = altura / 100;
  }

  const imc = peso / (altura * altura);
  const { classificacao, classeCss } = classificarIMC(imc);

  exibirResultado(`IMC: ${imc.toFixed(2)}`, `Classificação: ${classificacao}`, classeCss);
});

btnLimpar.addEventListener('click', function () {
  inputPeso.value = '';
  inputAltura.value = '';
  divResultado.style.display = 'none';
  inputPeso.focus();
});

function classificarIMC(imc) {
  if (imc < 18.5) {
    return { classificacao: 'Abaixo do peso', classeCss: 'baixo' };
  } else if (imc < 25) {
    return { classificacao: 'Peso normal', classeCss: 'normal' };
  } else if (imc < 30) {
    return { classificacao: 'Sobrepeso', classeCss: 'sobrepeso' };
  } else if (imc < 35) {
    return { classificacao: 'Obesidade Grau I', classeCss: 'obesidade' };
  } else if (imc < 40) {
    return { classificacao: 'Obesidade Grau II', classeCss: 'obesidade' };
  } else {
    return { classificacao: 'Obesidade Grau III', classeCss: 'obesidade' };
  }
}

function exibirResultado(titulo, mensagem, classeCss) {
  divResultado.className = classeCss;
  divResultado.innerHTML = `<h2>${titulo}</h2><p>${mensagem}</p>`;
  divResultado.style.display = 'block';
}
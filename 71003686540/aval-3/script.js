const form = document.getElementById('form-imc');
const inputPeso = document.getElementById('peso');
const inputAltura = document.getElementById('altura');
const btnLimpar = document.getElementById('btn-limpar');
const caixaResultado = document.getElementById('caixa-resultado');
const valorImcEl = document.getElementById('valor-imc');
const classificacaoImcEl = document.getElementById('classificacao-imc');
const caixaHistorico = document.getElementById('caixa-historico');
const listaHistorico = document.getElementById('lista-historico');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const peso = parseFloat(inputPeso.value);
  const altura = parseFloat(inputAltura.value);

  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    alert('Por favor, insira valores válidos para peso e altura.');
    return;
  }

  const imc = peso / (altura * altura);
  const resultado = obterClassificacao(imc);

  valorImcEl.textContent = `IMC: ${imc.toFixed(2)}`;
  classificacaoImcEl.textContent = resultado.texto;

  caixaResultado.className = 'resultado ' + resultado.classe;
  caixaResultado.style.display = 'block';

  adicionarAoHistorico(peso, altura, imc.toFixed(2), resultado.texto);
});

btnLimpar.addEventListener('click', function() {
  form.reset();
  caixaResultado.style.display = 'none';
  inputPeso.focus();
});

function obterClassificacao(imc) {
  if (imc < 18.5) {
    return { texto: 'Abaixo do peso', classe: 'baixo-peso' };
  } else if (imc < 25) {
    return { texto: 'Peso normal', classe: 'normal' };
  } else if (imc < 30) {
    return { texto: 'Sobrepeso', classe: 'sobrepeso' };
  } else if (imc < 35) {
    return { texto: 'Obesidade Grau I', classe: 'obesidade' };
  } else if (imc < 40) {
    return { texto: 'Obesidade Grau II', classe: 'obesidade' };
  } else {
    return { texto: 'Obesidade Grau III', classe: 'obesidade' };
  }
}

function adicionarAoHistorico(peso, altura, imc, classificacao) {
  caixaHistorico.style.display = 'block';
  const item = document.createElement('li');
  item.innerHTML = `<span>${peso}kg / ${altura}m</span> <strong>${imc} (${classificacao})</strong>`;
  listaHistorico.prepend(item);
}
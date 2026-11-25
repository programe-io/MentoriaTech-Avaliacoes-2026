const form = document.getElementById('form-imc');
const inputNome = document.getElementById('nome');
const inputPeso = document.getElementById('peso');
const inputAltura = document.getElementById('altura');
const divResultado = document.getElementById('resultado');
const btnLimpar = document.getElementById('btn-limpar');
const listaHistorico = document.getElementById('lista-historico');
const btnLimparHistorico = document.getElementById('btn-limpar-historico');

let historico = JSON.parse(localStorage.getItem('historicoIMC')) || [];
renderizarHistorico();

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const nome = inputNome.value.trim() || 'Usuário';
  const peso = parseFloat(inputPeso.value);
  let altura = parseFloat(inputAltura.value);

  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    exibirResultado('Valores inválidos', 'Informe peso e altura maiores que zero.', '', 'erro');
    return;
  }

  if (altura > 3) {
    altura = altura / 100;
  }

  const imc = peso / (altura * altura);
  const { classificacao, classeCss } = classificarIMC(imc);

  // Calcula faixa de peso ideal (IMC entre 18.5 e 24.9)
  const pesoMin = (18.5 * altura * altura).toFixed(1);
  const pesoMax = (24.9 * altura * altura).toFixed(1);
  const infoPesoIdeal = `Peso ideal estimado: ${pesoMin} kg a ${pesoMax} kg`;

  exibirResultado(`IMC: ${imc.toFixed(2)}`, `Classificação: ${classificacao}`, infoPesoIdeal, classeCss);

  salvarNoHistorico({
    nome,
    peso: peso.toFixed(1),
    altura: altura.toFixed(2),
    imc: imc.toFixed(2),
    classificacao,
    data: new Date().toLocaleDateString('pt-BR')
  });
});

btnLimpar.addEventListener('click', function () {
  inputNome.value = '';
  inputPeso.value = '';
  inputAltura.value = '';
  divResultado.style.display = 'none';
  inputPeso.focus();
});

btnLimparHistorico.addEventListener('click', function () {
  historico = [];
  localStorage.removeItem('historicoIMC');
  renderizarHistorico();
});

function classificarIMC(imc) {
  if (imc < 18.5) return { classificacao: 'Abaixo do peso', classeCss: 'baixo' };
  if (imc < 25) return { classificacao: 'Peso normal', classeCss: 'normal' };
  if (imc < 30) return { classificacao: 'Sobrepeso', classeCss: 'sobrepeso' };
  if (imc < 35) return { classificacao: 'Obesidade Grau I', classeCss: 'obesidade' };
  if (imc < 40) return { classificacao: 'Obesidade Grau II', classeCss: 'obesidade' };
  return { classificacao: 'Obesidade Grau III', classeCss: 'obesidade' };
}

function exibirResultado(titulo, mensagem, extra, classeCss) {
  divResultado.className = `resultado ${classeCss}`;
  divResultado.innerHTML = `<h2>${titulo}</h2><p><strong>${mensagem}</strong></p><p>${extra}</p>`;
  divResultado.style.display = 'block';
}

function salvarNoHistorico(registro) {
  historico.unshift(registro);
  if (historico.length > 10) historico.pop(); // Mantém os 10 últimos
  localStorage.setItem('historicoIMC', JSON.stringify(historico));
  renderizarHistorico();
}

function renderizarHistorico() {
  if (historico.length === 0) {
    listaHistorico.innerHTML = '<li>Nenhum cálculo registrado ainda.</li>';
    return;
  }

  listaHistorico.innerHTML = historico
    .map(item => `<li><strong>${item.nome}</strong> (${item.data}) — ${item.peso}kg / ${item.altura}m → <strong>IMC ${item.imc}</strong> (${item.classificacao})</li>`)
    .join('');

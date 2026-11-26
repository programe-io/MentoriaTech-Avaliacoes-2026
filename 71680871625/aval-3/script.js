// Seleção dos elementos do DOM
const form = document.getElementById('imc-form');
const inputNome = document.getElementById('nome');
const inputPeso = document.getElementById('peso');
const inputAltura = document.getElementById('altura');

const boxResultado = document.getElementById('resultado');
const mensagemPaciente = document.getElementById('mensagem-paciente');
const valorImcEl = document.getElementById('valor-imc');
const badgeClassificacao = document.getElementById('classificacao-badge');

// Função pura: apenas calcula o IMC
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

// Função pura: retorna a classificação e a classe CSS correspondente
function obterClassificacaoIMC(imc) {
  if (imc < 18.5) {
    return { texto: 'Abaixo do peso', classeCor: 'bg-alerta' };
  }
  if (imc < 25) {
    return { texto: 'Peso normal', classeCor: 'bg-normal' };
  }
  if (imc < 30) {
    return { texto: 'Sobrepeso', classeCor: 'bg-alerta' };
  }
  if (imc < 35) {
    return { texto: 'Obesidade Grau I', classeCor: 'bg-perigo' };
  }
  if (imc < 40) {
    return { texto: 'Obesidade Grau II', classeCor: 'bg-perigo' };
  }
  return { texto: 'Obesidade Grau III', classeCor: 'bg-perigo' };
}

// Função de interface: atualiza o HTML com os dados processados
function exibirResultado(nome, imc, classificacao) {
  mensagemPaciente.textContent = `Paciente: ${nome}`;
  valorImcEl.textContent = imc.toFixed(2);
  
  badgeClassificacao.textContent = classificacao.texto;
  badgeClassificacao.className = `badge ${classificacao.classeCor}`;
  
  boxResultado.classList.remove('hidden');
}

// Evento principal do formulário
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita o recarregamento da página

  const nome = inputNome.value.trim();
  const peso = parseFloat(inputPeso.value);
  const altura = parseFloat(inputAltura.value);

  // Validação defensiva
  if (!nome || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    alert('Por favor, preencha todos os campos com valores válidos.');
    return;
  }

  const imc = calcularIMC(peso, altura);
  const classificacao = obterClassificacaoIMC(imc);

  exibirResultado(nome, imc, classificacao);
});

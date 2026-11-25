// Elementos do DOM
const imcForm = document.getElementById('imcForm');
const nomeInput = document.getElementById('nomePaciente');
const pesoInput = document.getElementById('pesoPaciente');
const alturaInput = document.getElementById('alturaPaciente');
const unidadeAltura = document.getElementById('unidadeAltura');
const btnLimpar = document.getElementById('btnLimpar');

// Mensagens de erro
const erroNome = document.getElementById('erroNome');
const erroPeso = document.getElementById('erroPeso');
const erroAltura = document.getElementById('erroAltura');

// Elementos de Resultado
const emptyState = document.getElementById('emptyState');
const resultContent = document.getElementById('resultContent');
const resNome = document.getElementById('resNome');
const resPeso = document.getElementById('resPeso');
const resAltura = document.getElementById('resAltura');
const resImcValor = document.getElementById('resImcValor');
const resClassificacao = document.getElementById('resClassificacao');
const resRisco = document.getElementById('resRisco');
const resPesoIdeal = document.getElementById('resPesoIdeal');
const resOrientacao = document.getElementById('resOrientacao');
const imcBox = document.getElementById('imcBox');
const scalePointer = document.getElementById('scalePointer');

// Histórico e Estatísticas
const historicoLista = document.getElementById('historicoLista');
const btnLimparHistorico = document.getElementById('btnLimparHistorico');
const totalPacientesEl = document.getElementById('totalPacientes');

let historicoPacientes = [];

// Atualiza visualmente a unidade da altura (m ou cm) conforme o usuário digita
alturaInput.addEventListener('input', () => {
  const val = parseFloat(alturaInput.value);
  if (!isNaN(val) && val > 3) {
    unidadeAltura.textContent = 'cm';
  } else {
    unidadeAltura.textContent = 'm';
  }
});

// Função principal de classificação do IMC segundo a OMS
function obterInformacoesIMC(imc) {
  if (imc < 18.5) {
    return {
      faixa: 'abaixo',
      classificacao: 'Abaixo do peso',
      risco: 'Risco de comorbidades: Baixo (atenção a carências nutricionais)',
      cor: '#0284C7',
      orientacao:
        'O índice indica magreza. Recomenda-se avaliação nutricional para investigar causas metabólicas e estruturar um plano alimentar hipercalórico saudável.'
    };
  } else if (imc < 25) {
    return {
      faixa: 'normal',
      classificacao: 'Peso normal',
      risco: 'Risco de comorbidades: Normal / Ideal',
      cor: '#00B87C',
      orientacao:
        'Parabéns! O paciente encontra-se na faixa considerada saudável pela Organização Mundial da Saúde. Manter alimentação equilibrada e prática regular de atividade física.'
    };
  } else if (imc < 30) {
    return {
      faixa: 'sobrepeso',
      classificacao: 'Sobrepeso',
      risco: 'Risco de comorbidades: Levemente aumentado',
      cor: '#D97706',
      orientacao:
        'Faixa de pré-obesidade. Ajustes na rotina alimentar e aumento do gasto calórico semanal ajudam a prevenir a progressão para obesidade e alterações metabólicas.'
    };
  } else if (imc < 35) {
    return {
      faixa: 'obesidade1',
      classificacao: 'Obesidade Grau I',
      risco: 'Risco de comorbidades: Moderado',
      cor: '#EA580C',
      orientacao:
        'Sinal de alerta clínico. É recomendado acompanhamento multidisciplinar (médico e nutricionista) para controle de peso e monitoramento de pressão arterial e glicemia.'
    };
  } else if (imc < 40) {
    return {
      faixa: 'obesidade2',
      classificacao: 'Obesidade Grau II',
      risco: 'Risco de comorbidades: Grave',
      cor: '#DC2626',
      orientacao:
        'Obesidade severa com risco elevado para doenças cardiovasculares e diabetes tipo 2. Acompanhamento médico estruturado é fundamental.'
    };
  } else {
    return {
      faixa: 'obesidade3',
      classificacao: 'Obesidade Grau III',
      risco: 'Risco de comorbidades: Muito grave',
      cor: '#991B1B',
      orientacao:
        'Obesidade mórbida. Necessita de acompanhamento médico especializado contínuo para redução segura de peso e prevenção de complicações severas.'
    };
  }
}

// Calcula a posição percentual do marcador na barra de escala (15 a 40 kg/m²)
function calcularPosicaoEscala(imc) {
  const min = 15;
  const max = 40;
  const clamped = Math.max(min, Math.min(max, imc));
  return ((clamped - min) / (max - min)) * 100;
}

// Validação dos campos de entrada
function validarFormulario() {
  let valido = true;

  const nome = nomeInput.value.trim();
  const peso = parseFloat(pesoInput.value);
  const altura = parseFloat(alturaInput.value);

  // Limpa erros anteriores
  erroNome.textContent = '';
  erroPeso.textContent = '';
  erroAltura.textContent = '';
  nomeInput.classList.remove('input-error');
  pesoInput.classList.remove('input-error');
  alturaInput.classList.remove('input-error');

  if (nome.length < 2) {
    erroNome.textContent = 'Informe o nome completo do paciente.';
    nomeInput.classList.add('input-error');
    valido = false;
  }

  if (isNaN(peso) || peso <= 0 || peso > 500) {
    erroPeso.textContent = 'Informe um peso válido (ex.: 70.5).';
    pesoInput.classList.add('input-error');
    valido = false;
  }

  if (isNaN(altura) || altura <= 0 || altura > 300) {
    erroAltura.textContent = 'Informe uma altura válida (ex.: 1.75 ou 175).';
    alturaInput.classList.add('input-error');
    valido = false;
  }

  return valido;
}

// Exibe os dados do paciente na tela
function exibirResultado(registro) {
  emptyState.classList.add('hidden');
  resultContent.classList.remove('hidden');

  resNome.textContent = registro.nome;
  resPeso.textContent = `${registro.peso.toFixed(1).replace('.', ',')} kg`;
  resAltura.textContent = `${registro.alturaMetros.toFixed(2).replace('.', ',')} m`;
  resImcValor.textContent = registro.imc.toFixed(1).replace('.', ',');

  resClassificacao.textContent = registro.info.classificacao;
  resClassificacao.style.backgroundColor = registro.info.cor;
  imcBox.style.borderLeftColor = registro.info.cor;
  resRisco.textContent = registro.info.risco;

  // Cálculo da faixa de peso ideal (IMC entre 18,5 e 24,9)
  const pesoMinIdeal = 18.5 * (registro.alturaMetros * registro.alturaMetros);
  const pesoMaxIdeal = 24.9 * (registro.alturaMetros * registro.alturaMetros);

  let diferencaTexto = '';
  if (registro.peso < pesoMinIdeal) {
    const falta = pesoMinIdeal - registro.peso;
    diferencaTexto = ` (${falta.toFixed(1).replace('.', ',')} kg abaixo do mínimo ideal)`;
  } else if (registro.peso > pesoMaxIdeal) {
    const excesso = registro.peso - pesoMaxIdeal;
    diferencaTexto = ` (${excesso.toFixed(1).replace('.', ',')} kg acima do máximo ideal)`;
  } else {
    diferencaTexto = ' (Dentro da faixa ideal!)';
  }

  resPesoIdeal.textContent = `Entre ${pesoMinIdeal.toFixed(1).replace('.', ',')} kg e ${pesoMaxIdeal.toFixed(1).replace('.', ',')} kg${diferencaTexto}`;
  resOrientacao.textContent = registro.info.orientacao;

  // Atualiza ponteiro na barra
  scalePointer.style.left = `${calcularPosicaoEscala(registro.imc)}%`;

  // Destaca a linha correspondente na tabela de referência
  document.querySelectorAll('#tabelaReferencia tr').forEach((row) => {
    row.classList.remove('active-row');
    if (row.dataset.faixa === registro.info.faixa) {
      row.classList.add('active-row');
    }
  });
}

// Renderiza a lista de histórico
function atualizarHistorico() {
  totalPacientesEl.textContent = historicoPacientes.length;

  if (historicoPacientes.length === 0) {
    btnLimparHistorico.classList.add('hidden');
    historicoLista.innerHTML =
      '<p class="history-empty">Nenhum paciente registrado nesta sessão ainda.</p>';
    return;
  }

  btnLimparHistorico.classList.remove('hidden');
  historicoLista.innerHTML = '';

  historicoPacientes.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.title = 'Clique para rever os detalhes deste paciente';
    div.innerHTML = `
      <div class="history-info">
        <strong>${item.nome}</strong>
        <span>${item.peso.toFixed(1).replace('.', ',')} kg • ${item.alturaMetros.toFixed(2).replace('.', ',')} m • ${item.hora}</span>
      </div>
      <div class="history-badge">
        <span class="imc-val">${item.imc.toFixed(1).replace('.', ',')} kg/m²</span>
        <span class="imc-cat" style="color: ${item.info.cor}">${item.info.classificacao}</span>
      </div>
    `;

    div.addEventListener('click', () => exibirResultado(historicoPacientes[index]));
    historicoLista.appendChild(div);
  });
}

// Evento de envio do formulário
imcForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validarFormulario()) return;

  const nome = nomeInput.value.trim();
  const peso = parseFloat(pesoInput.value);
  let altura = parseFloat(alturaInput.value);

  // Converte automaticamente centímetros para metros se usuário digitar ex: 175
  if (altura > 3) {
    altura = altura / 100;
  }

  const imc = peso / (altura * altura);
  const info = obterInformacoesIMC(imc);
  const agora = new Date();
  const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const registro = {
    nome,
    peso,
    alturaMetros: altura,
    imc,
    info,
    hora
  };

  historicoPacientes.unshift(registro);
  exibirResultado(registro);
  atualizarHistorico();
});

// Limpar campos do formulário
btnLimpar.addEventListener('click', () => {
  imcForm.reset();
  unidadeAltura.textContent = 'm';
  erroNome.textContent = '';
  erroPeso.textContent = '';
  erroAltura.textContent = '';
  nomeInput.classList.remove('input-error');
  pesoInput.classList.remove('input-error');
  alturaInput.classList.remove('input-error');
  nomeInput.focus();
});

// Limpar histórico
btnLimparHistorico.addEventListener('click', () => {
  historicoPacientes = [];
  atualizarHistorico();
  emptyState.classList.remove('hidden');
  resultContent.classList.add('hidden');
  document.querySelectorAll('#tabelaReferencia tr').forEach((row) => row.classList.remove('active-row'));
});
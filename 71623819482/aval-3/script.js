const STORAGE_IMC = 'historico_imc_v1';

// Referências do DOM
const formImc = document.getElementById('formImc');
const inputPeso = document.getElementById('inputPeso');
const inputAltura = document.getElementById('inputAltura');
const unidadeAltura = document.getElementById('unidadeAltura');
const mensagemErro = document.getElementById('mensagemErro');
const areaResultado = document.getElementById('areaResultado');
const listaHistorico = document.getElementById('listaHistorico');

let historico = JSON.parse(localStorage.getItem(STORAGE_IMC)) || [];

// Detectar automaticamente se o usuário digita altura em metros (ex: 1.75) ou centímetros (ex: 175)
inputAltura.addEventListener('input', () => {
  const val = parseFloat(inputAltura.value);
  if (!val) {
    unidadeAltura.textContent = 'cm/m';
  } else if (val > 3) {
    unidadeAltura.textContent = 'cm';
  } else {
    unidadeAltura.textContent = 'm';
  }
});

// Classificar resultado conforme padrão OMS
function classificarImc(imc) {
  if (imc < 18.5) {
    return {
      chave: 'abaixo',
      titulo: 'Abaixo do peso',
      cor: 'var(--cor-abaixo)',
      orientacao: 'Seu IMC está abaixo da faixa recomendada. Considere buscar orientação nutricional para ganhar massa de forma saudável.'
    };
  }
  if (imc < 25) {
    return {
      chave: 'normal',
      titulo: 'Peso normal',
      cor: 'var(--cor-normal)',
      orientacao: 'Parabéns! Seu peso está dentro da faixa considerada saudável para a sua altura. Mantenha hábitos equilibrados.'
    };
  }
  if (imc < 30) {
    return {
      chave: 'sobrepeso',
      titulo: 'Sobrepeso',
      cor: 'var(--cor-sobrepeso)',
      orientacao: 'Atenção: você está ligeiramente acima do peso ideal. Pequenos ajustes na alimentação e exercícios regulares ajudam bastante.'
    };
  }
  if (imc < 35) {
    return {
      chave: 'obesidade1',
      titulo: 'Obesidade Grau I',
      cor: 'var(--cor-obesidade1)',
      orientacao: 'Sinal de alerta para a saúde metabólica e cardiovascular. O acompanhamento com médico ou nutricionista é recomendado.'
    };
  }
  if (imc < 40) {
    return {
      chave: 'obesidade2',
      titulo: 'Obesidade Grau II',
      cor: 'var(--cor-obesidade2)',
      orientacao: 'Risco elevado para condições associadas ao excesso de peso. Procure orientação médica especializada.'
    };
  }
  return {
    chave: 'obesidade3',
    titulo: 'Obesidade Grau III',
    cor: 'var(--cor-obesidade3)',
    orientacao: 'Risco muito elevado. É fundamental buscar acompanhamento médico multidisciplinar.'
  };
}

// Calcular posição percentual do ponteiro na régua (escala de 12 a 42)
function calcularPosicaoPonteiro(imc) {
  const min = 12;
  const max = 42;
  const limitado = Math.max(min, Math.min(max, imc));
  return ((limitado - min) / (max - min)) * 100;
}

// Exibir resultado na tela
function exibirResultado(imc, alturaMetros) {
  const info = classificarImc(imc);

  // Peso ideal (IMC entre 18.5 e 24.9)
  const pesoMin = (18.5 * alturaMetros * alturaMetros).toFixed(1).replace('.', ',');
  const pesoMax = (24.9 * alturaMetros * alturaMetros).toFixed(1).replace('.', ',');

  document.getElementById('valorImc').textContent = imc.toFixed(1).replace('.', ',');
  const badge = document.getElementById('badgeClassificacao');
  badge.textContent = info.titulo;
  badge.style.backgroundColor = info.cor;

  document.getElementById('faixaPesoIdeal').textContent = `${pesoMin} kg a ${pesoMax} kg`;
  document.getElementById('textoOrientacao').textContent = info.orientacao;

  // Mover ponteiro
  const ponteiro = document.getElementById('ponteiroImc');
  ponteiro.style.left = `${calcularPosicaoPonteiro(imc)}%`;

  // Destacar linha correspondente na tabela OMS
  document.querySelectorAll('.tabela-referencia tbody tr').forEach(tr => {
    tr.classList.toggle('linha-ativa', tr.dataset.faixa === info.chave);
  });

  areaResultado.classList.remove('oculto');
}

// Renderizar histórico lateral
function renderizarHistorico() {
  listaHistorico.innerHTML = '';

  if (historico.length === 0) {
    listaHistorico.innerHTML = '<li style="color:#64748b; font-size:0.85rem;">Nenhum cálculo realizado ainda.</li>';
    return;
  }

  historico.forEach(item => {
    const li = document.createElement('li');
    li.className = 'item-historico';
    li.innerHTML = `
      <div>
        <strong>IMC ${item.imc}</strong>
        <small>${item.peso} kg • ${item.altura} m • ${item.data}</small>
      </div>
      <span class="badge" style="background:${item.cor}">${item.titulo}</span>
    `;
    listaHistorico.appendChild(li);
  });
}

// Evento principal de cálculo
formImc.addEventListener('submit', (e) => {
  e.preventDefault();
  mensagemErro.classList.add('oculto');

  const peso = parseFloat(inputPeso.value);
  let altura = parseFloat(inputAltura.value);

  // Converte centímetros para metros automaticamente caso usuário digite ex: 175
  if (altura > 3) {
    altura = altura / 100;
  }

  if (!peso || !altura || peso <= 0 || altura < 0.5 || altura > 2.6) {
    mensagemErro.textContent = 'Por favor, insira valores válidos para peso e altura.';
    mensagemErro.classList.remove('oculto');
    return;
  }

  const imc = peso / (altura * altura);
  const info = classificarImc(imc);

  exibirResultado(imc, altura);

  // Salvar no histórico (máximo 8 registros)
  historico.unshift({
    imc: imc.toFixed(1).replace('.', ','),
    peso: peso.toFixed(1).replace('.', ','),
    altura: altura.toFixed(2).replace('.', ','),
    titulo: info.titulo,
    cor: info.cor,
    data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  });

  historico = historico.slice(0, 8);
  localStorage.setItem(STORAGE_IMC, JSON.stringify(historico));
  renderizarHistorico();
});

// Botão Limpar campos
document.getElementById('btnLimpar').addEventListener('click', () => {
  formImc.reset();
  unidadeAltura.textContent = 'cm/m';
  mensagemErro.classList.add('oculto');
  areaResultado.classList.add('oculto');
});

// Botão Limpar histórico
document.getElementById('btnLimparHistorico').addEventListener('click', () => {
  historico = [];
  localStorage.removeItem(STORAGE_IMC);
  renderizarHistorico();
});

// Inicializar histórico salvo
renderizarHistorico();
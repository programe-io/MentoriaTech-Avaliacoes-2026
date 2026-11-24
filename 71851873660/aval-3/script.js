// Seleciona os elementos do visor, botões e histórico
const visor = document.getElementById('visor');
const expressaoAnterior = document.getElementById('expressao-anterior');
const botoesNumero = document.querySelectorAll('.numero');
const botoesOperador = document.querySelectorAll('.operador');
const btnLimpar = document.getElementById('btn-limpar');
const btnApagar = document.getElementById('btn-apagar');
const btnSinal = document.getElementById('btn-sinal');
const btnIgual = document.getElementById('btn-igual');
const listaHistorico = document.getElementById('lista-historico');
const btnLimparHistorico = document.getElementById('btn-limpar-historico');

let numeroAtual = '';
let numeroAnterior = '';
let operadorAtual = null;
let reiniciarVisor = false;

// Formata os símbolos matemáticos para exibição amigável no visor
function simboloBonito(op) {
  const mapa = { '+': '+', '-': '−', '*': '×', '/': '÷' };
  return mapa[op] || op;
}

// Atualiza os dois níveis do visor
function atualizarVisor() {
  visor.value = numeroAtual !== '' ? numeroAtual.replace('.', ',') : '0';

  if (operadorAtual && numeroAnterior !== '') {
    expressaoAnterior.textContent = `${numeroAnterior.replace('.', ',')} ${simboloBonito(operadorAtual)}`;
  } else {
    expressaoAnterior.textContent = '';
  }
}

// Clique nos números e vírgula decimal
botoesNumero.forEach(botao => {
  botao.addEventListener('click', () => {
    const valor = botao.getAttribute('data-valor');

    if (reiniciarVisor) {
      numeroAtual = '';
      reiniciarVisor = false;
    }

    if (valor === '.' && numeroAtual.includes('.')) return;
    if (valor === '.' && numeroAtual === '') {
      numeroAtual = '0.';
    } else if (valor === '0' && numeroAtual === '0') {
      return;
    } else {
      numeroAtual += valor;
    }

    atualizarVisor();
  });
});

// Clique nos operadores (+, -, *, /, %)
botoesOperador.forEach(botao => {
  botao.addEventListener('click', () => {
    const op = botao.getAttribute('data-valor');

    // Tratamento especial para porcentagem (%)
    if (op === '%') {
      if (numeroAtual === '') return;
      const valor = parseFloat(numeroAtual);
      if (numeroAnterior !== '' && operadorAtual) {
        // Ex: 200 + 10% -> calcula 10% de 200 (20)
        numeroAtual = ((parseFloat(numeroAnterior) * valor) / 100).toString();
      } else {
        numeroAtual = (valor / 100).toString();
      }
      atualizarVisor();
      return;
    }

    if (numeroAtual === '' && numeroAnterior === '') return;

    // Se já houver uma operação pendente, calcula antes de encadear a próxima
    if (numeroAnterior !== '' && numeroAtual !== '' && operadorAtual) {
      calcular(false);
    }

    if (numeroAtual !== '') {
      numeroAnterior = numeroAtual;
      numeroAtual = '';
    }

    operadorAtual = op;
    reiniciarVisor = false;
    atualizarVisor();
  });
});

// Botão Inverter Sinal (+/-)
btnSinal.addEventListener('click', () => {
  if (numeroAtual === '' || numeroAtual === '0') return;
  numeroAtual = (parseFloat(numeroAtual) * -1).toString();
  atualizarVisor();
});

// Botão AC (Limpar tudo)
btnLimpar.addEventListener('click', () => {
  numeroAtual = '';
  numeroAnterior = '';
  operadorAtual = null;
  reiniciarVisor = false;
  atualizarVisor();
});

// Botão Apagar último dígito (⌫)
btnApagar.addEventListener('click', () => {
  if (reiniciarVisor) return;
  numeroAtual = numeroAtual.slice(0, -1);
  atualizarVisor();
});

// Realiza o cálculo e registra no painel lateral de histórico
function calcular(registrarHistorico
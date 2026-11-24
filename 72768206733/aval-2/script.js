const tela = document.getElementById('tela');
const historico = document.getElementById('historico');
let expressao = '';

// Adiciona números ou operadores na tela
function adicionar(valor) {
  if (tela.textContent === 'Erro') {
    expressao = '';
  }

  // Evita dois operadores seguidos (ex: ++ ou *+)
  const operadores = ['+', '-', '*', '/', '%'];
  const ultimoCaractere = expressao.slice(-1);

  if (operadores.includes(valor) && operadores.includes(ultimoCaractere)) {
    expressao = expressao.slice(0, -1) + valor;
  } else {
    expressao += valor;
  }

  atualizarTela();
}

// Limpa todo o visor e o histórico
function limparTudo() {
  expressao = '';
  historico.textContent = '';
  tela.textContent = '0';
}

// Apaga o último dígito digitado
function apagarUltimo() {
  if (tela.textContent === 'Erro') {
    limparTudo();
    return;
  }
  expressao = expressao.slice(0, -1);
  atualizarTela();
}

// Exibe a expressão formatada no visor
function atualizarTela() {
  if (expressao === '') {
    tela.textContent = '0';
  } else {
    tela.textContent = expressao.replace(/\*/g, '×').replace(/\//g, '÷');
  }
}

// Calcula o resultado final
function calcular() {
  if (expressao === '') return;

  try {
    historico.textContent = expressao.replace(/\*/g, '×').replace(/\//g, '÷') + ' =';
    
    // Converte porcentagem simples (ex: 50% -> (50/100)) antes de calcular
    const contaFormatada = expressao.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
    const resultado = eval(contaFormatada);

    if (!isFinite(resultado)) {
      tela.textContent = 'Erro';
      expressao = '';
    } else {
      expressao = String(Number(resultado.toFixed(8)));
      tela.textContent = expressao;
    }
  } catch {
    tela.textContent = 'Erro';
    expressao = '';
  }
}

// Suporte para digitar direto pelo teclado físico
document.addEventListener('keydown', function (event) {
  const tecla = event.key;

  if ((tecla >= '0' && tecla <= '9') || ['+', '-', '*', '/', '.', '%'].includes(tecla)) {
    adicionar(tecla);
  } else if (tecla === 'Enter' || tecla === '=') {
    event.preventDefault();
    calcular();
  } else if (tecla === 'Backspace') {
    apagarUltimo();
  } else if (tecla === 'Escape') {
    limparTudo();
  }
});
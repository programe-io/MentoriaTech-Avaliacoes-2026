// Seleciona o visor e os grupos de botões do HTML
const tela = document.getElementById('tela');
const botoesNumero = document.querySelectorAll('.numero');
const botoesOperador = document.querySelectorAll('.operador');
const botaoLimpar = document.getElementById('limpar');
const botaoApagar = document.getElementById('apagar');
const botaoIgual = document.getElementById('igual');

let expressaoAtual = '';
let resultadoExibido = false;

// Atualiza o texto do visor
function atualizarTela(valor) {
  tela.value = valor || '0';
}

// Adiciona números e ponto decimal
botoesNumero.forEach(botao => {
  botao.addEventListener('click', () => {
    const valor = botao.getAttribute('data-valor');

    // Se acabou de calcular um resultado e clicou em um número, começa nova conta
    if (resultadoExibido) {
      expressaoAtual = '';
      resultadoExibido = false;
    }

    // Evita múltiplos pontos no mesmo número
    const partes = expressaoAtual.split(/[\+\-\*\/]/);
    const numeroAtual = partes[partes.length - 1];
    if (valor === '.' && numeroAtual.includes('.')) return;

    // Se começar com ponto, coloca "0."
    if (valor === '.' && numeroAtual === '') {
      expressaoAtual += '0.';
    } else {
      expressaoAtual += valor;
    }

    atualizarTela(expressaoAtual);
  });
});

// Adiciona operadores (+, -, *, /)
botoesOperador.forEach(botao => {
  botao.addEventListener('click', () => {
    const operador = botao.getAttribute('data-valor');

    if (expressaoAtual === '') return;

    resultadoExibido = false;

    // Se o último caractere já for um operador, substitui pelo novo
    const ultimoCaractere = expressaoAtual.slice(-1);
    if (['+', '-', '*', '/'].includes(ultimoCaractere)) {
      expressaoAtual = expressaoAtual.slice(0, -1) + operador;
    } else {
      expressaoAtual += operador;
    }

    atualizarTela(expressaoAtual);
  });
});

// Botão Limpar (C)
botaoLimpar.addEventListener('click', () => {
  expressaoAtual = '';
  resultadoExibido = false;
  atualizarTela('');
});

// Botão Apagar último caractere (⌫)
botaoApagar.addEventListener('click', () => {
  if (resultadoExibido) {
    expressaoAtual = '';
    resultadoExibido = false;
  } else {
    expressaoAtual = expressaoAtual.slice(0, -1);
  }
  atualizarTela(expressaoAtual);
});

// Botão Igual (=) - calcula o resultado
function calcularResultado() {
  if (expressaoAtual === '') return;

  // Remove operador solto no final antes de calcular
  const ultimoCaractere = expressaoAtual.slice(-1);
  if (['+', '-', '*', '/'].includes(ultimoCaractere)) {
    expressaoAtual = expressaoAtual.slice(0, -1);
  }

  try {
    // Avalia a expressão matemática de forma segura
    const resultado = Function('"use strict";return (' + expressaoAtual + ')')();

    if (!isFinite(resultado)) {
      atualizarTela('Erro');
      expressaoAtual = '';
    } else {
      // Arredonda para evitar dízimas de ponto flutuante (ex: 0.1 + 0.2)
      const resultadoLimpo = Number(resultado.toFixed(8)).toString();
      atualizarTela(resultadoLimpo);
      expressaoAtual = resultadoLimpo;
    }
    resultadoExibido = true;
  } catch {
    atualizarTela('Erro');
    expressaoAtual = '';
  }
}

botaoIgual.addEventListener('click', calcularResultado);

// Bônus: suporte ao teclado físico (números, operadores, Enter, Backspace e Esc)
document.addEventListener('keydown', (evento) => {
  const tecla = evento.key;

  if ((tecla >= '0' && tecla <= '9') || tecla === '.') {
    const btn = document.querySelector(`.numero[data-valor="${tecla}"]`);
    if (btn) btn.click();
  } else if (['+', '-', '*', '/'].includes(tecla)) {
    const btn = document.querySelector(`.operador[data-valor="${tecla}"]`);
    if (btn) btn.click();
  } else if (tecla === 'Enter' || tecla === '=') {
    evento.preventDefault();
    calcularResultado();
  } else if (tecla === 'Backspace') {
    botaoApagar.click();
  } else if (tecla === 'Escape') {
    botaoLimpar.click();
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-imc');
  const inputPeso = document.getElementById('peso');
  const inputAltura = document.getElementById('altura');
  const valorImcEl = document.getElementById('valor-imc');
  const classificacaoImcEl = document.getElementById('classificacao-imc');
  const linhasTabela = document.querySelectorAll('tbody tr');

  const obterClassificacao = (imc) => {
    if (imc < 18.5) return { texto: 'Abaixo do peso', indice: 0, cor: '#2563eb' };
    if (imc < 25) return { texto: 'Peso normal', indice: 1, cor: '#16a34a' };
    if (imc < 30) return { texto: 'Sobrepeso', indice: 2, cor: '#d97706' };
    if (imc < 35) return { texto: 'Obesidade Grau I', indice: 3, cor: '#ea580c' };
    if (imc < 40) return { texto: 'Obesidade Grau II', indice: 4, cor: '#dc2626' };
    return { texto: 'Obesidade Grau III', indice: 5, cor: '#991b1b' };
  };

  const limparDestaqueTabela = () => {
    linhasTabela.forEach((tr) => {
      tr.style.backgroundColor = '';
      tr.style.fontWeight = '';
    });
  };

  const calcularIMC = (e) => {
    e.preventDefault();

    const peso = parseFloat(inputPeso.value);
    const altura = parseFloat(inputAltura.value);

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
      valorImcEl.textContent = '--';
      classificacaoImcEl.textContent = 'Insira valores válidos para peso e altura.';
      classificacaoImcEl.style.color = '#dc2626';
      limparDestaqueTabela();
      return;
    }

    const imc = peso / (altura * altura);
    const resultado = obterClassificacao(imc);

    valorImcEl.textContent = imc.toFixed(2).replace('.', ',');
    valorImcEl.style.color = resultado.cor;

    classificacaoImcEl.textContent = resultado.texto;
    classificacaoImcEl.style.color = resultado.cor;

    limparDestaqueTabela();
    if (linhasTabela[resultado.indice]) {
      linhasTabela[resultado.indice].style.backgroundColor = '#eff6ff';
      linhasTabela[resultado.indice].style.fontWeight = '600';
    }
  };

  const limparFormulario = () => {
    valorImcEl.textContent = '--';
    valorImcEl.style.color = '';
    classificacaoImcEl.textContent = 'Aguardando cálculo...';
    classificacaoImcEl.style.color = '';
    limparDestaqueTabela();
    inputPeso.focus();
  };

  form.addEventListener('submit', calcularIMC);
  form.addEventListener('reset', limparFormulario);
});
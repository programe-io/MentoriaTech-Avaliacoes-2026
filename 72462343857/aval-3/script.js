// 7. Captura dos elementos no JavaScript
const N1 = document.getElementById('N1');
const N2 = document.getElementById('N2');
const resultado = document.getElementById('resultado');
const info = document.getElementById('info');
const btnSomar = document.getElementById('btnSomar');
const btnLimpar = document.getElementById('btnLimpar');

// 8. Lógica do botão somar
btnSomar.addEventListener('click', () => {
  if (N1.value === '' || N2.value === '') {
    resultado.textContent = 'Preencha os dois valores';
    resultado.removeAttribute('data-paridade');
    info.textContent = '';
    return;
  }

  const soma = Number(N1.value) + Number(N2.value);
  resultado.textContent = 'Resultado: ' + soma;

  // 9. Verificação de paridade e uso do setAttribute
  if (soma % 2 === 0) {
    resultado.setAttribute('data-paridade', 'par');
  } else {
    resultado.setAttribute('data-paridade', 'ímpar');
  }

  // 10. Exibição da informação do atributo
  info.textContent = 'Valor de data-paridade: ' + resultado.getAttribute('data-paridade');
});

// 11. Lógica do botão limpar
btnLimpar.addEventListener('click', () => {
  N1.value = '';
  N2.value = '';
  resultado.textContent = '';
  resultado.removeAttribute('data-paridade');
  info.textContent = 'Valor de data-paridade: ' + resultado.getAttribute('data-paridade');
});

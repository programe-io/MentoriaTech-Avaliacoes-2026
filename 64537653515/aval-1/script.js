// Seleção dos elementos do DOM
const valorElemento = document.getElementById('valor');
const btnAumentar = document.getElementById('btnAumentar');
const btnDiminuir = document.getElementById('btnDiminuir');
const btnZerar = document.getElementById('btnZerar');

// Variável de estado
let contador = 0;

// Função para atualizar o valor na tela e mudar a cor
function atualizarTela() {
  valorElemento.textContent = contador;

  if (contador > 0) {
    valorElemento.style.color = '#52c41a'; // Verde para positivos
  } else if (contador < 0) {
    valorElemento.style.color = '#ff4d4f'; // Vermelho para negativos
  } else {
    valorElemento.style.color = '#222222'; // Cor padrão para zero
  }
}

// Eventos dos botões
btnAumentar.addEventListener('click', () => {
  contador++;
  atualizarTela();
});

btnDiminuir.addEventListener('click', () => {
  contador--;
  atualizarTela();
});

btnZerar.addEventListener('click', () => {
  contador = 0;
  atualizarTela();
});
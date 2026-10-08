// Seleciona os elementos do HTML
let valorAtual = 0;
const contadorTexto = document.getElementById('contador');
const btnDiminuir = document.getElementById('diminuir');
const btnResetar = document.getElementById('resetar');
const btnAumentar = document.getElementById('aumentar');

// Função para atualizar o número na tela
function atualizarContador() {
  contadorTexto.textContent = valorAtual;
}

// Adiciona eventos de clique nos botões
btnAumentar.addEventListener('click', () => {
  valorAtual++;
  atualizarContador();
});

btnDiminuir.addEventListener('click', () => {
  valorAtual--;
  atualizarContador();
});

btnResetar.addEventListener('click', () => {
  valorAtual = 0;
  atualizarContador();
});

// ===== 1. PEGAR OS ELEMENTOS =====
const container = document.querySelector('.container');
const cards = document.querySelectorAll('.card');
const btnGradiente = document.querySelector('#btn-gradiente');
const btnBorda = document.querySelector('#btn-borda');
const btnSombra = document.querySelector('#btn-sombra');
const btnFlex = document.querySelector('#btn-flex');

// ===== 2. MUDAR GRADIENTE =====
let gradienteAtual = 0;
const gradientes = [
  'linear-gradient(to bottom, #3b82f6, #ef4444)', // azul -> vermelho
  'linear-gradient(to right, #a855f7, #ec4899)', // roxo -> rosa
  'radial-gradient(circle at center, #fde047, #f97316)' // radial amarelo -> laranja
];

btnGradiente.addEventListener('click', () => {
  gradienteAtual++;
  if (gradienteAtual >= gradientes.length) {
    gradienteAtual = 0;
  }
  cards[0].style.background = gradientes[gradienteAtual];
  console.log('Gradiente trocado!');
});

// ===== 3. MUDAR BORDA =====
const bordas = [
  '2px dashed white',
  '4px dotted black',
  '4px double #ec4899',
  '4px solid #22c55e'
];
let bordaAtual = 0;

btnBorda.addEventListener('click', () => {
  bordaAtual++;
  if (bordaAtual >= bordas.length) bordaAtual = 0;

  cards[1].style.border = bordas[bordaAtual];
  alert('Borda mudada para: ' + bordas
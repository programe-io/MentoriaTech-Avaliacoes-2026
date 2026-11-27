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
  alert('Borda mudada para: ' + bordas[bordaAtual]);
});

// ===== 4. MUDAR SOMBRA =====
let sombraLigada = true;

btnSombra.addEventListener('click', () => {
  if (sombraLigada) {
    // Tira a sombra
    cards.forEach(card => card.style.boxShadow = 'none');
    btnSombra.textContent = 'Ligar Sombra';
    sombraLigada = false;
  } else {
    // Volta a sombra colorida
    cards[0].style.boxShadow = '0 10px 15px rgba(239,68,68,0.5)';
    cards[1].style.boxShadow = '0 20px 25px rgba(236,72,153,0.3)';
    cards[2].style.boxShadow = '0 4px 6px rgba(249,115,22,0.5)';
    btnSombra.textContent = 'Desligar Sombra';
    sombraLigada = true;
  }
});

// ===== 5. MUDAR FLEXBOX - LINHA / COLUNA =====
let emColuna = false;

btnFlex.addEventListener('click', () => {
  if (emColuna) {
    container.style.flexDirection = 'row'; // lado a lado
    container.style.justifyContent = 'space-evenly';
    emColuna = false;
  } else {
    container.style.flexDirection = 'column'; // empilhado
    container.style.justifyContent = 'center';
    emColuna = true;
  }
});

// ===== 6. MUDAR ARREDONDAMENTO AO CLICAR NO CARD =====
cards.forEach(card => {
  card.addEventListener('click', () => {
    // Se já for círculo, volta ao normal
    if (card.style.borderRadius === '9999px') {
      card.style.borderRadius = '16px';
    } else {
      card.style.borderRadius = '9999px'; // rounded-full
    }
  });
});

console.log('JS carregado! Clique nos botões.');
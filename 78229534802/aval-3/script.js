const canvas = document.getElementById('quadro');
const ctx = canvas.getContext('2d');
const selectorCor = document.getElementById('cor');
const btnLimpar = document.getElementById('limpar');

let desenhando = false;

// Configuração inicial do pincel
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.strokeStyle = selectorCor.value;

// Atualiza a cor quando o usuário muda o seletor
selectorCor.addEventListener('input', (e) => {
  ctx.strokeStyle = e.target.value;
});

// Funções de desenho
function iniciarDesenho(e) {
  desenhando = true;
  desenhar(e);
}

function pararDesenho() {
  desenhando = false;
  ctx.beginPath(); // Reseta o caminho para não ligar linhas soltas
}

function desenhar(e) {
  if (!desenhando) return;

  // Pega a posição correta do mouse dentro do canvas
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Eventos do Mouse
canvas.addEventListener('mousedown', iniciarDesenho);
canvas.addEventListener('mouseup', pararDesenho);
canvas.addEventListener('mousemove', desenhar);
canvas.addEventListener('mouseleave', pararDesenho);

// Limpar tela
btnLimpar.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

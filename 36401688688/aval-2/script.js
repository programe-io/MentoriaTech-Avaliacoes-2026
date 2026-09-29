const emojis = ['🚀', '👾', '🔥', '💎', '🎨', '🍕', '🐱', '🎧'];
const baralhoDuplo = [...emojis, ...emojis];

const tabuleiro = document.getElementById('tabuleiro');
const textoStatus = document.getElementById('status-jogo');
const elMovimentos = document.getElementById('movimentos');
const elTempo = document.getElementById('tempo');
const btnReiniciar = document.getElementById('btn-reiniciar');

let primeiraCarta = null;
let segundaCarta = null;
let bloqTabuleiro = false;
let movimentos = 0;
let paresEncontrados = 0;
let tempoSegundos = 0;
let intervaloTempo = null;
let jogoIniciado = false;

// Embaralha a lista usando o algoritmo Fisher-Yates
function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Cria a estrutura HTML de cada carta
function criarTabuleiro() {
  tabuleiro.innerHTML = "";
  const cartasEmbaralhadas = embaralhar([...baralhoDuplo]);

  cartasEmbaralhadas.forEach(emoji => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.emoji = emoji;

    carta.innerHTML = `
      <div class="face frente"></div>
      <div class="face verso">${emoji}</div>
    `;

    carta.addEventListener('click', virarCarta);
    tabuleiro.appendChild(carta);
  });
}

function iniciarCronometro() {
  intervaloTempo = setInterval(() => {
    tempoSegundos++;
    const mins = String(Math.floor(tempoSegundos / 60)).padStart(2, '0');
    const segs = String(tempoSegundos % 60).padStart(2, '0');
    elTempo.textContent = `${mins}:${segs}`;
  }, 1000);
}

function virarCarta() {
  if (bloqTabuleiro) return;
  if (this === primeiraCarta) return;

  if (!jogoIniciado) {
    jogoIniciado = true;
    iniciarCronometro();
    textoStatus.textContent = "Boa sorte!";
  }

  this.classList.add('virada');

  if (!primeiraCarta) {
    primeiraCarta = this;
    return;
  }

  segundaCarta = this;
  incrementarMovimentos();
  checarPar();
}

function incrementarMovimentos() {
  movimentos++;
  elMovimentos.textContent = movimentos;
}

function checarPar() {
  const eIgual = primeiraCarta.dataset.emoji === segundaCarta.dataset.emoji;
  eIgual ? desativarCartas() : desvirarCartas();
}

function desativarCartas() {
  primeiraCarta.classList.add('encontrada');
  segundaCarta.classList.add('encontrada');

  primeiraCarta.removeEventListener('click', virarCarta);
  segundaCarta.removeEventListener('click', virarCarta);

  paresEncontrados++;
  resetarJogada();

  if (paresEncontrados === emojis.length) {
    finalizarJogo();
  }
}

function desvirarCartas() {
  bloqTabuleiro = true;

  setTimeout(() => {
    primeiraCarta.classList.remove('virada');
    segundaCarta.classList.remove('virada');
    resetarJogada();
  }, 1000);
}

function resetarJogada() {
  [primeiraCarta, segundaCarta] = [null, null];
  [bloqTabuleiro] = [false];
}

function finalizarJogo() {
  clearInterval(intervaloTempo);
  textoStatus.textContent = `🎉 Parabéns! Você venceu em ${tempoSegundos}s com ${movimentos} movimentos!`;
}

function reiniciarJogo() {
  clearInterval(intervaloTempo);
  tempoSegundos = 0;
  movimentos = 0;
  paresEncontrados = 0;
  jogoIniciado = false;
  bloqTabuleiro = false;
  primeiraCarta = null;
  segundaCarta = null;

  elTempo.textContent = "00:00";
  elMovimentos.textContent = "0";
  textoStatus.textContent = "Clique em uma carta para começar!";

  criarTabuleiro();
}

btnReiniciar.addEventListener('click', reiniciarJogo);

// Inicializa o jogo ao carregar
criarTabuleiro();
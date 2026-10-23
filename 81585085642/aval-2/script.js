// Gera um número aleatório entre 1 e 50
let numeroSecreto = Math.floor(Math.random() * 50) + 1;
let tentativas = 0;

const palpiteInput = document.getElementById('palpiteInput');
const btnChutar = document.getElementById('btnChutar');
const mensagem = document.getElementById('mensagem');
const btnReiniciar = document.getElementById('btnReiniciar');

function verificarPalpite() {
  const palpite = Number(palpiteInput.value);
  tentativas++;

  if (!palpite || palpite < 1 || palpite > 50) {
    mensagem.textContent = 'Por favor, digite um número entre 1 e 50!';
    mensagem.style.color = '#f0ad4e';
    return;
  }

  if (palpite === numeroSecreto) {
    mensagem.textContent = `Parabéns! Você acertou o número ${numeroSecreto} em ${tentativas} tentativas!`;
    mensagem.style.color = '#5cb85c';
    fimDeJogo();
  } else if (palpite < numeroSecreto) {
    mensagem.textContent = 'O número secreto é maior! Tente novamente.';
    mensagem.style.color = '#d9534f';
  } else {
    mensagem.textContent = 'O número secreto é menor! Tente novamente.';
    mensagem.style.color = '#d9534f';
  }

  palpiteInput.value = '';
  palpiteInput.focus();
}

function fimDeJogo() {
  palpiteInput.disabled = true;
  btnChutar.disabled = true;
  btnReiniciar.classList.remove('escondido');
}

function reiniciarJogo() {
  numeroSecreto = Math.floor(Math.random() * 50) + 1;
  tentativas = 0;
  palpiteInput.disabled = false;
  btnChutar.disabled = false;
  palpiteInput.value = '';
  mensagem.textContent = '';
  btnReiniciar.classList.add('escondido');
  palpiteInput.focus();
}

// Eventos de clique e tecla Enter
btnChutar.addEventListener('click', verificarPalpite);
palpiteInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    verificarPalpite();
  }
});
btnReiniciar.addEventListener('click', reiniciarJogo);

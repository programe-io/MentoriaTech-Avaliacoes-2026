const pista = document.getElementById('pista');
const jogador = document.getElementById('carro-jogador');
const placarEl = document.getElementById('placar');
const telaFim = document.getElementById('tela-fim');
const pontuacaoFinalEl = document.getElementById('pontuacao-final');

let posicaoJogador = 130;
let pontos = 0;
let velocidade = 5;
let jogoAtivo = true;
let intervaloObstaculos;
let animacaoFrame;

// Controles do teclado (Setas Esquerda e Direita)
document.addEventListener('keydown', (evento) => {
  if (!jogoAtivo) return;

  if (evento.key === 'ArrowLeft' && posicaoJogador > 10) {
    posicaoJogador -= 30;
  } else if (evento.key === 'ArrowRight' && posicaoJogador < 240) {
    posicaoJogador += 30;
  }
  jogador.style.left = posicaoJogador + 'px';
});

// Cria os carros vermelhos (obstáculos)
function criarObstaculo() {
  if (!jogoAtivo) return;

  const obstaculo = document.createElement('div');
  obstaculo.classList.add('obstaculo');
  
  // Escolhe uma posição horizontal aleatória na pista
  const posX = Math.floor(Math.random() * 240) + 10;
  obstaculo.style.left = posX + 'px';
  
  pista.appendChild(obstaculo);
}

// Atualiza a movimentação e verifica batidas
function atualizarJogo() {
  if (!jogoAtivo) return;

  const obstaculos = document.querySelectorAll('.obstaculo');
  const rectJogador = jogador.getBoundingClientRect();

  obstaculos.forEach((obs) => {
    let topAtual = parseInt(window.getComputedStyle(obs).getPropertyValue('top'));
    obs.style.top = (topAtual + velocidade) + 'px';

    // Verifica colisão entre o jogador e o obstáculo
    const rectObs = obs.getBoundingClientRect();
    if (
      rectJogador.left < rectObs.right &&
      rectJogador.right > rectObs.left &&
      rectJogador.top < rectObs.bottom &&
      rectJogador.bottom > rectObs.top
    ) {
      encerrarJogo();
    }

    // Remove o obstáculo que saiu da tela e soma pontos
    if (topAtual > 500) {
      obs.remove();
      pontos += 10;
      placarEl.innerText = 'Pontos: ' + pontos;
      
      // Aumenta a dificuldade aos poucos
      if (pontos % 50 === 0) {
        velocidade += 1;
      }
    }
  });

  animacaoFrame = requestAnimationFrame(atualizarJogo);
}

function encerrarJogo() {
  jogoAtivo = false;
  clearInterval(intervaloObstaculos);
  cancelAnimationFrame(animacaoFrame);
  pontuacaoFinalEl.innerText = 'Pontos: ' + pontos;
  telaFim.classList.remove('escondido');
}

function reiniciarJogo() {
  // Limpa os obstáculos antigos
  document.querySelectorAll('.obstaculo').forEach(obs => obs.remove());
  
  // Reseta as variáveis
  posicaoJogador = 130;
  jogador.style.left = posicaoJogador + 'px';
  pontos = 0;
  velocidade = 5;
  placarEl.innerText = 'Pontos: 0';
  jogoAtivo = true;
  
  telaFim.classList.add('escondido');
  iniciarJogo();
}

function iniciarJogo() {
  intervaloObstaculos = setInterval(criarObstaculo, 1200);
  atualizarJogo();
}

// Começa o jogo automaticamente
iniciarJogo();
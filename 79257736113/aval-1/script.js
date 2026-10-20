const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let jogadorAtual = 'X';
let jogoAtivo = true;

// Todas as combinações possíveis para vencer no Jogo da Velha
const combinacoesVencedoras = [, [3, 4, 5], [6, 7, 8], // Linhas, [1, 4, 7], [2, 5, 8], // Colunas, [2, 4, 6]             // Diagonais
];

function lidarComClique(e) {
  const index = e.target.getAttribute('data-index');

  // Se a célula já estiver ocupada ou o jogo acabou, ignora o clique
  if (tabuleiro[index] !== '' || !jogoAtivo) return;

  // Atualiza o estado lógico e o visual da tela
  tabuleiro[index] = jogadorAtual;
  e.target.textContent = jogadorAtual;

  verificarResultado();
}

function verificarResultado() {
  let rodadaVencedora = false;

  // Verifica cada combinação para ver se alguém ganhou
  for (let i = 0; i < combinacoesVencedoras.length; i++) {
    const [a, b, c] = combinacoesVencedoras[i];
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
      rodadaVencedora = true;
      break;
    }
  }

  if (rodadaVencedora) {
    statusText.textContent = `Jogador ${jogadorAtual} venceu!`;
    jogoAtivo = false;
    return;
  }

  // Se não houver espaços vazios e ninguém ganhou, dá empate
  if (!tabuleiro.includes('')) {
    statusText.textContent = 'Empate!';
    jogoAtivo = false;
    return;
  }

  // Alterna o jogador ativo
  jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
  statusText.textContent = `Vez do jogador: ${jogadorAtual}`;
}

function reiniciarJogo() {
  tabuleiro = ['', '', '', '', '', '', '', '', ''];
  jogoAtivo = true;
  jogadorAtual = 'X';
  statusText.textContent = `Vez do jogador: ${jogadorAtual}`;
  cells.forEach(cell => cell.textContent = '');
}

// Ouvintes de eventos para cliques nas células e no botão de reiniciar
cells.forEach(cell => cell.addEventListener('click', lidarComClique));
resetBtn.addEventListener('click', reiniciarJogo);

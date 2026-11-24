// Seleciona os elementos do HTML
const botaoExplorar = document.querySelector('.btn');
const tituloCard = document.querySelector('.card h2');
const textoCard = document.querySelector('.card p');

// Estado inicial
let cliques = 0;

// Função para atualizar o conteúdo ao clicar
botaoExplorar.addEventListener('click', (evento) => {
  evento.preventDefault(); // Evita que a página recarregue pelo link "#"
  cliques++;

  tituloCard.textContent = `Interação #${cliques}`;
  textoCard.textContent = `Você clicou no botão ${cliques} ${cliques === 1 ? 'vez' : 'vezes'}.`;
  
  // Muda a cor de destaque dinamicamente
  const cores = ['#38bdf8', '#4ade80', '#f472b6', '#fbbf24'];
  const corAleatoria = cores[cliques % cores.length];
  document.documentElement.style.setProperty('--cor-destaque', corAleatoria);
});

// Exemplo extra: Saudação automática baseada no horário atual
const definirSaudacao = () => {
  const hora = new Date().getHours();
  if (hora < 12) return 'Bom dia!';
  if (hora < 18) return 'Boa tarde!';
  return 'Boa noite!';
};

console.log(`${definirSaudacao()} Script carregado com sucesso.`);
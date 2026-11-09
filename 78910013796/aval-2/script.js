// --- DATABASE EXPANDIDA COM ATUALIZAÇÃO DA CATEGORIA INDIES ---
const postsIniciais = [
  {
    id: 1,
    title: "Review: The Witcher 4 promete revolucionar os RPGs de nova geração",
    category: "RPG",
    date: "09 de Nov, 2026",
    content: "A nova saga da CD Projekt Red utilizando a Unreal Engine 5 traz cenários ultra realistas. O sistema de combate foi totalmente refeito e promete ditar o novo padrão para a indústria dos RPGs de mundo aberto."
  },
  {
    id: 2,
    title: "Hollow Knight Silksong recebe classificação indicativa e anima fãs",
    category: "Indies",
    date: "08 de Nov, 2026",
    content: "A espera está quase no fim! O jogo apareceu listado nos órgãos de classificação oficiais, indicando que o lançamento surpresa da Hornet pode acontecer a qualquer momento deste trimestre."
  },
  {
    id: 3,
    title: "Cyberpunk 2: Sequência entra em produção total na América do Norte",
    category: "RPG",
    date: "07 de Nov, 2026",
    content: "Codinome Orion, o próximo jogo no universo Cyberpunk, começou sua fase de desenvolvimento ativo. Detalhes vazados sugerem uma exploração vertical ainda maior em Night City e novos implantes cibernéticos revolucionários."
  },
  {
    id: 4,
    title: "Hades II quebra recordes de jogadores simultâneos no lançamento da versão 1.0",
    category: "Indies",
    date: "05 de Nov, 2026",
    content: "Melinoë conquistou a comunidade. Com o lançamento da versão final, o roguelike mitológico da Supergiant Games ultrapassou a marca de 200 mil jogadores simultâneos apenas no PC, superando o primeiro jogo."
  },
  {
    id: 5,
    title: "Monster Hunter Wilds: Novas mecânicas de montaria mudam a dinâmica das caçadas",
    category: "Ação",
    date: "03 de Nov, 2026",
    content: "Testamos a versão demo! O foco em ecossistemas vivos e clima dinâmico transforma cada caçada em um evento imprevisível. As tempestades de areia mudam os monstros ativos no mapa em tempo real."
  },
  {
    id: 6,
    title: "Sea of Stars anuncia nova DLC gratuita focada em mistérios náuticos",
    category: "Indies",
    date: "31 de Out, 2026",
    content: "Batizada de 'Throes of the Watchmaker', a expansão traz novas classes de personagens, quebra-cabeças mecânicos complexos e mais da trilha sonora espetacular inspirada nos clássicos do Chrono Trigger."
  },
  {
    id: 7,
    title: "Elden Ring: Expansão Shadow of the Erdtree é eleita o melhor conteúdo extra do ano",
    category: "RPG",
    date: "28 de Out, 2026",
    content: "A crítica especializada foi unânime em colocar a jornada pela Terra das Sombras no topo. O nível de dificuldade elevado e o design do mapa interconectado provaram que a FromSoftware continua imbatível."
  },
  {
    id: 8,
    title: "Ghost of Yotei: Novo protagonista e Japão feudal de 1603 trazem novos Ares",
    category: "Ação",
    date: "24 de Out, 2026",
    content: "Dizendo adeus a Jin Sakai, a Sucker Punch nos leva para as terras ao redor do Monte Yotei com Atsu. O jogo promete focar em armas de fogo iniciais da época e uma história de vingança visceral."
  }
];

// --- GERENCIAMENTO DE ESTADO (LOCALSTORAGE) ---
let blogPosts = JSON.parse(localStorage.getItem('posts')) || postsIniciais;
let enqueteVotos = JSON.parse(localStorage.getItem('votos')) || { game1: 142, game2: 118 };
let currentTheme = localStorage.getItem('theme') || 'dark';

// --- ELEMENTOS DO DOM ---
const postsFeed = document.getElementById('postsFeed');
const postForm = document.getElementById('postForm');
const toggleThemeBtn = document.getElementById('toggleTheme');
const filterButtons = document.querySelectorAll('.filter-btn');

// --- INICIALIZAÇÃO ---
document.documentElement.setAttribute('data-theme', currentTheme);
atualizarFeed('all');
atualizarEnquete();

// --- RECURSO 1: ALTERNADOR DE TEMA (DARK/LIGHT MODE) ---
toggleThemeBtn.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
});

// --- RECURSO 2: FILTRO DINÂMICO DE CATEGORIAS (MENU) ---
filterButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const categoria = e.target.getAttribute('data-filter');
    ativarFiltroVisual(categoria);
    atualizarFeed(categoria);
  });
});

function ativarFiltroVisual(categoria) {
  filterButtons.forEach(btn => btn.classList.remove('active'));
  const botaoAlvo = document.querySelector(`[data-filter="${categoria}"]`);
  if (botaoAlvo) botaoAlvo.classList.add('active');
}

// --- RECURSO 3: RENDERIZAR FEED DINAMICAMENTE ---
function atualizarFeed(filtro) {
  postsFeed.innerHTML = '';
  
  const postsFiltrados = filtro === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === filtro);

  if (postsFiltrados.length === 0) {
    postsFeed.innerHTML = `<p style="color: var(--text-muted); padding: 1rem;">Nenhum artigo encontrado nesta categoria.</p>`;
    return;
  }

  postsFiltrados.slice().reverse().forEach(post => {
    const article = document.createElement('article');
    article.className = 'card post-card';
    article.innerHTML = `
      <h2>${post.title}</h2>
      <div class="post-meta">
        <span class="badge">${post.category}</span>
        <span>${post.date}</span>
      </div>
      <p>${post.content}</p>
      <button class="btn-card-category" onclick="entrarNaCategoria('${post.category}')">
        Entrar em ${post.category} ➔
      </button>
    `;
    postsFeed.appendChild(article);
  });
}

// --- FUNÇÃO PARA O BOTÃO INTERNO DO CARD ---
function entrarNaCategoria(categoria) {
  ativarFiltroVisual(categoria);
  atualizarFeed(categoria);
  
  // Rola a página suavemente de volta para a barra de navegação/topo do feed
  document.getElementById('topNav').scrollIntoView({ behavior: 'smooth' });
}

// --- RECURSO 4: ADICIONAR NOVO POST ---
postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const novoPost = {
    id: Date.now(),
    title: document.getElementById('postTitle').value,
    category: document.getElementById('postCategory').value,
    date: obterDataAtual(),
    content: document.getElementById('postBody').value
  };

  blogPosts.push(novoPost);
  localStorage.setItem('posts', JSON.stringify(blogPosts));
  
  atualizarFeed('all');
  postForm.reset();
  ativarFiltroVisual('all');
});

// --- RECURSO 5: SISTEMA DE ENQUETE GAMER ---
document.querySelectorAll('.btn-poll').forEach(button => {
  button.addEventListener('click', (e) => {
    const gameKey = e.currentTarget.getAttribute('data-game');
    enqueteVotos[gameKey]++;
    localStorage.setItem('votos', JSON.stringify(enqueteVotos));
    atualizarEnquete();
  });
});

function atualizarEnquete() {
  document.getElementById('votes-game1').textContent = enqueteVotos.game1;
  document.getElementById('votes-game2').textContent = enqueteVotos.game2;
}

// --- FUNÇÃO AUXILIAR DE DATA ---
function obterDataAtual() {
  const opcoes = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date().toLocaleDateString('pt-BR', opcoes);
}

// --- NEWSLETTER ---
document.getElementById('btnSubscribe').addEventListener('click', () => {
  const email = document.getElementById('newsEmail');
  const status = document.getElementById('newsStatus');
  if (email.value.includes('@')) {
    status.style.color = '#2ecc71';
    status.textContent = 'Inscrição realizada!';
    email.value = '';
  } else {
    status.style.color = '#e74c3c';
    status.textContent = 'E-mail inválido.';
  }
});

// =========================================================
// SCRIPT.JS — BLOG PESSOAL DE MÚSICA: FORRÓ & RAIZ
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Banco de dados de artigos sobre Forró
  const postsForro = [
    {
      id: 1,
      titulo: 'A evolução da sanfona de 8 baixos ao forró eletrônico',
      categoria: 'História',
      data: '12 Nov 2026',
      resumo: 'Como o fole de Luiz Gonzaga e Dominguinhos atravessou gerações e ganhou sintetizadores nos anos 90.',
      destaque: true
    },
    {
      id: 2,
      titulo: '5 discos essenciais de forró pé-de-serra para ouvir no São João',
      categoria: 'Pé-de-Serra',
      data: '05 Nov 2026',
      resumo: 'Uma seleção comentada com Trio Nordestino, Jackson do Pandeiro e Marinês para animar qualquer arrasta-pé.',
      destaque: false
    },
    {
      id: 3,
      titulo: 'O reinado das bandas nos anos 90 e 2000',
      categoria: 'Eletrônico',
      data: '28 Out 2026',
      resumo: 'Relembrando os grandes sucessos de Mastruz com Leite, Magníficos e Limão com Mel que marcaram época.',
      destaque: false
    },
    {
      id: 4,
      titulo: 'A força da zabumba e do triângulo na marcação do xote',
      categoria: 'Instrumentos',
      data: '19 Out 2026',
      resumo: 'Entenda a célula rítmica que faz o xote ser mais cadenciado que o baião tradicional.',
      destaque: false
    }
  ];

  // 2. Playlist da barra lateral ("Tocando no Fole")
  const playlistForro = [
    { titulo: 'Asa Branca', artista: 'Luiz Gonzaga', duracao: '02:54' },
    { titulo: 'Eu Só Quero Um Xodó', artista: 'Dominguinhos', duracao: '03:12' },
    { titulo: 'Meu Vaqueiro, Meu Peão', artista: 'Mastruz com Leite', duracao: '04:05' },
    { titulo: 'Frevo Mulher', artista: 'Amelinha', duracao: '03:48' },
    { titulo: 'Sebastiana', artista: 'Jackson do Pandeiro', duracao: '02:21' }
  ];

  // Referências aos elementos do HTML
  const postsContainer = document.querySelector('.posts');
  const categoriesContainer = document.querySelector('.categories');
  const trackListContainer = document.querySelector('.track-list');
  const heroTitle = document.querySelector('.hero h1');
  const heroDesc = document.querySelector('.hero p');

  // 3. Atualiza o destaque principal com o post marcado como destaque
  const postDestaque = postsForro.find(post => post.destaque);
  if (postDestaque && heroTitle && heroDesc) {
    heroTitle.textContent = postDestaque.titulo;
    heroDesc.textContent = postDestaque.resumo;
  }

  // 4. Renderiza os cartões de postagens
  function renderizarPosts(filtroCategoria = 'Todos') {
    if (!postsContainer) return;

    const filtrados = filtroCategoria === 'Todos'
      ? postsForro
      : postsForro.filter(post => post.categoria === filtroCategoria);

    postsContainer.innerHTML = filtrados.map(post => `
      <article class="post-card" data-id="${post.id}">
        <div class="post-meta">${post.data} • ${post.categoria}</div>
        <h2><a href="#post-${post.id}" class="post-link" data-id="${post.id}">${post.titulo}</a></h2>
        <p>${post.resumo}</p>
        <a href="#post-${post.id}" class="read-more" data-id="${post.id}">Ler prosa completa →</a>
      </article>
    `).join('');
  }

  // 5. Renderiza categorias dinâmicas e ativa o filtro por clique
  function renderizarCategorias() {
    if (!categoriesContainer) return;

    const categorias = ['Todos', ...new Set(postsForro.map(p => p.categoria))];

    categoriesContainer.innerHTML = categorias.map(cat => `
      <a href="#" class="cat-filter" data-cat="${cat}">${cat}</a>
    `).join('');

    categoriesContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('cat-filter')) {
        e.preventDefault();
        const categoriaEscolhida = e.target.dataset.cat;
        renderizarPosts(categoriaEscolhida);
      }
    });
  }

  // 6. Renderiza a playlist interativa na barra lateral
  let faixaAtual = null;

  function renderizarPlaylist() {
    if (!trackListContainer) return;

    trackListContainer.innerHTML = playlistForro.map((faixa, index) => `
      <li class="track-item" data-index="${index}" style="cursor: pointer;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong>▶ ${faixa.titulo}</strong>
          <small>${faixa.duracao}</small>
        </div>
        <span class="track-artist">${faixa.artista}</span>
      </li>
    `).join('');

    trackListContainer.addEventListener('click', (e) => {
      const item = e.target.closest('.track-item');
      if (!item) return;

      const idx = Number(item.dataset.index);
      const musica = playlistForro[idx];

      // Destaca a faixa clicada como "Tocando agora"
      document.querySelectorAll('.track-item strong').forEach((el, i) => {
        el.textContent = (i === idx && faixaAtual !== idx ? '⏸ ' : '▶ ') + playlistForro[i].titulo;
      });

      faixaAtual = faixaAtual === idx ? null : idx;
      if (faixaAtual !== null) {
        console.log(`Tocando agora no fole: ${musica.titulo} - ${musica.artista}`);
      }
    });
  }

  // 7. Interação rápida ao clicar para ler um artigo
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('read-more') || e.target.classList.contains('post-link')) {
      e.preventDefault();
      const id = Number(e.target.dataset.id);
      const artigo = postsForro.find(p => p.id === id);
      if (artigo) {
        alert(`🪗 ${artigo.titulo}\n\nCategoria: ${artigo.categoria} (${artigo.data})\n\n${artigo.resumo}`);
      }
    }
  });

  // Inicializa todas as seções
  renderizarPosts();
  renderizarCategorias();
  renderizarPlaylist();
});

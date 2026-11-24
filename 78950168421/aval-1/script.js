// Banco de dados simulado com as postagens do blog
const posts = [
  {
    id: 1,
    titulo: "Melhor Sensibilidade para Subir Capa na Nova Atualização",
    categoria: "dicas",
    categoriaNome: "Dicas & Capa",
    data: "22 de Novembro, 2026",
    autor: "Gabriel Booyah",
    resumo: "Ajuste sua mira geral, ponto vermelho e 2x para grudar mais capa tanto em celulares Android quanto iOS.",
    conteudo: `
      <p>Encontrar a sensibilidade ideal faz toda a diferença nas trocas de tiro de curta e média distância. Após os últimos ajustes na mecânica das armas de SMG e rifles, a puxada de capa exige um equilíbrio maior entre velocidade e estabilidade.</p>
      <p><strong>Configuração recomendada:</strong></p>
      <p>• Geral: 96<br>• Ponto Vermelho: 92<br>• Mira 2x: 95<br>• Mira 4x: 88<br>• Mira AWM: 50</p>
      <p>Lembre-se de testar na Ilha de Treinamento por 10 minutos antes de ir para a ranqueada e ajustar o tamanho do botão de atirar entre 45% e 52%.</p>
    `
  },
  {
    id: 2,
    titulo: "Notas da Atualização: Mudanças no Mapa Bermuda e Buff em Personagens",
    categoria: "atualizacoes",
    categoriaNome: "Atualizações",
    data: "19 de Novembro, 2026",
    autor: "Redação Zona Safe",
    resumo: "Confira tudo o que mudou no balanceamento de habilidades ativas e nas áreas de loot de Peak e Clock Tower.",
    conteudo: `
      <p>A Garena liberou o novo patch trazendo mudanças significativas no ritmo das partidas ranqueadas. O objetivo principal foi incentivar rotações mais rápidas no início do jogo.</p>
      <p><strong>Principais novidades:</strong></p>
      <p>• <strong>Tatsuya:</strong> Tempo de recarga reduzido em 5 segundos no nível máximo.<br>• <strong>Peak:</strong> Novos pontos de cobertura adicionados na área aberta central.<br>• <strong>M4A1:</strong> Aumento de 6% no dano mínimo a longa distância.</p>
    `
  },
  {
    id: 3,
    titulo: "Guia de Rotação: Como Sobreviver até a Última Safe no Modo Ranqueado",
    categoria: "dicas",
    categoriaNome: "Dicas & Capa",
    data: "15 de Novembro, 2026",
    autor: "Gabriel Booyah",
    resumo: "Aprenda a ler o fechamento do gás, escolher o melhor posicionamento de high ground e economizar paredes de gelo.",
    conteudo: `
      <p>Muitos jogadores perdem pontos valiosos por entrarem em trocações desnecessárias no meio da segunda zona segura. Jogar pelo posicionamento garante abates fáceis no final da partida.</p>
      <p>Priorize sempre pegar o <strong>high ground</strong> (terreno elevado) antes do terceiro fechamento da safe e mantenha pelo menos 4 paredes de gelo reservadas para a transição final.</p>
    `
  },
  {
    id: 4,
    titulo: "Resumo da Rodada: Equipes Brasileiras Dominam a Tabela no Mundial",
    categoria: "esports",
    categoriaNome: "LBFF / E-sports",
    data: "10 de Novembro, 2026",
    autor: "Lucas Rush",
    resumo: "Com três Booyahs seguidos, os times do Brasil assumem a liderança isolada da fase de grupos.",
    conteudo: `
      <p>O cenário competitivo brasileiro mostrou mais uma vez por que é referência mundial no Free Fire. Apostando em composições agressivas de rush com habilidades de mobilidade, as equipes garantiram pontuação máxima em abates.</p>
      <p>A grande final acontece neste domingo, com transmissão oficial nos canais do jogo.</p>
    `
  }
];

// Elementos do DOM
const postsContainer = document.getElementById("posts-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");

// Elementos do Modal
const modal = document.getElementById("article-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalCategory = document.getElementById("modal-category");
const modalTitle = document.getElementById("modal-title");
const modalDate = document.getElementById("modal-date");
const modalContent = document.getElementById("modal-content");

let currentCategory = "todos";

// Renderiza os cards na tela
function renderPosts(listaPosts) {
  postsContainer.innerHTML = "";

  if (listaPosts.length === 0) {
    postsContainer.innerHTML = `<p style="color: #9aa0a6;">Nenhuma postagem encontrada para esse filtro.</p>`;
    return;
  }

  listaPosts.forEach((post) => {
    const card = document.createElement("article");
    card.classList.add("post-card");

    card.innerHTML = `
      <span class="post-tag">${post.categoriaNome}</span>
      <h2>${post.titulo}</h2>
      <p class="post-meta">Por ${post.autor} • ${post.data}</p>
      <p class="post-excerpt">${post.resumo}</p>
      <button class="read-more-btn" onclick="openArticle(${post.id})">Ler artigo completo</button>
    `;

    postsContainer.appendChild(card);
  });
}

// Filtra por categoria e texto digitado na busca
function filterPosts() {
  const searchTerm = searchInput.value.toLowerCase();

  const filtered = posts.filter((post) => {
    const matchesCategory = currentCategory === "todos" || post.categoria === currentCategory;
    const matchesSearch =
      post.titulo.toLowerCase().includes(searchTerm) ||
      post.resumo.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  renderPosts(filtered);
}

// Eventos dos botões de categoria
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    currentCategory = btn.getAttribute("data-category");
    filterPosts();
  });
});

// Evento da barra de busca
searchInput.addEventListener("input", filterPosts);

// Abre o modal com o conteúdo completo
function openArticle(id) {
  const post = posts.find((item) => item.id === id);
  if (!post) return;

  modalCategory.textContent = post.categoriaNome;
  modalTitle.textContent = post.titulo;
  modalDate.textContent = `Por ${post.autor} • ${post.data}`;
  modalContent.innerHTML = post.conteudo;

  modal.classList.add("open");
}

// Fecha o modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("open");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("open");
  }
});

// Inicializa o blog
renderPosts(posts);
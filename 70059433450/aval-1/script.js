// Ilustrações SVG exclusivas para os artigos
const artworks = {
  cyberpunk: `
    <svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e1b4b"/>
          <stop offset="50%" stop-color="#581c87"/>
          <stop offset="100%" stop-color="#0891b2"/>
        </linearGradient>
      </defs>
      <rect width="600" height="320" fill="url(#g1)"/>
      <circle cx="460" cy="95" r="55" fill="#06b6d4" opacity="0.35"/>
      <polygon points="80,320 150,140 220,320" fill="#0f172a" opacity="0.85"/>
      <polygon points="190,320 280,100 370,320" fill="#1e293b" opacity="0.9"/>
      <polygon points="330,320 430,130 530,320" fill="#0f172a" opacity="0.85"/>
      <line x1="0" y1="265" x2="600" y2="265" stroke="#22d3ee" stroke-width="3"/>
    </svg>`,
  fantasy: `
    <svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#064e3b"/>
          <stop offset="100%" stop-color="#1e3a8a"/>
        </linearGradient>
      </defs>
      <rect width="600" height="320" fill="url(#g2)"/>
      <circle cx="300" cy="110" r="65" fill="#fbbf24" opacity="0.3"/>
      <path d="M0 280 Q150 180 300 250 T600 220 L600 320 L0 320 Z" fill="#065f46"/>
      <polygon points="275,230 300,115 325,230" fill="#f8fafc" opacity="0.8"/>
    </svg>`,
  esports: `
    <svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4c0519"/>
          <stop offset="100%" stop-color="#311042"/>
        </linearGradient>
      </defs>
      <rect width="600" height="320" fill="url(#g3)"/>
      <circle cx="300" cy="160" r="95" fill="none" stroke="#f43f5e" stroke-width="6" opacity="0.6"/>
      <circle cx="300" cy="160" r="55" fill="none" stroke="#38bdf8" stroke-width="4" opacity="0.8"/>
      <polygon points="285,130 330,160 285,190" fill="#ffffff"/>
    </svg>`,
  racing: `
    <svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#7c2d12"/>
        </linearGradient>
      </defs>
      <rect width="600" height="320" fill="url(#g4)"/>
      <line x1="40" y1="220" x2="560" y2="120" stroke="#fb923c" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="255" x2="520" y2="175" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
      <circle cx="450" cy="90" r="40" fill="#f97316" opacity="0.4"/>
    </svg>`
};

// Banco de dados de postagens
const articles = [
  {
    id: 0,
    title: "Chrono Eclipse: O RPG Cyberpunk que Redefine Escolhas Narrativas",
    category: "Reviews",
    score: "9.6",
    author: "Lucas Andrade",
    date: "23 Nov 2026",
    readTime: "8 min",
    excerpt: "Exploramos cada distrito neon de Neo-Vespera por 65 horas. Veja como o sistema temporal transforma o gênero.",
    content: "Chrono Eclipse entrega uma das campanhas mais reativas da geração. Ao permitir que o jogador retroceda decisões-chave pagando um custo energético raro, o jogo transforma dilemas morais em mecânicas tangíveis. O combate tático em tempo real brilha nos chefes, e a trilha synthwave reage dinamicamente ao nível de alerta policial.",
    art: artworks.cyberpunk,
    pros: ["Narrativa ramificada com impacto real", "Direção de arte e trilha sonora impecáveis", "Combate fluido com dezenas de implantes"],
    cons: ["Pequenas quedas de FPS no distrito industrial", "Interface de inventário densa nas primeiras horas"],
    likes: 142,
    liked: false,
    comments: [
      { user: "CyberValkyrie", text: "Zerei ontem e o final secreto me deixou sem palavras!" },
      { user: "RafaTech", text: "A trilha sonora desse jogo merece prêmio." }
    ]
  },
  {
    id: 1,
    title: "Guia Definitivo: Como Dominar as Builds Elementais em Valhalla Tactics IV",
    category: "Guias",
    score: null,
    author: "Marina Costa",
    date: "22 Nov 2026",
    readTime: "6 min",
    excerpt: "Aprenda a combinar runas de gelo e relâmpago para limpar masmorras de nível máximo sem sofrer dano.",
    content: "O novo patch de balanceamento de Valhalla Tactics IV alterou profundamente o multiplicador de sobrecarga elétrica. Para extrair o máximo de dano em área, priorize o atributo Maestria Rúnica até o patamar 45 antes de investir em velocidade de conjuração. Equipe o Amuleto de Skadi no slot secundário para congelar inimigos antes da detonação.",
    art: artworks.fantasy,
    pros: [],
    cons: [],
    likes: 89,
    liked: false,
    comments: [
      { user: "OdinSon_BR", text: "Testei essa build na fenda 80 e funcionou perfeitamente." }
    ]
  },
  {
    id: 2,
    title: "Final Mundial de Strikers Arena Bate Recorde com 4,2 Milhões de Espectadores",
    category: "E-Sports",
    score: null,
    author: "Tiago Mendes",
    date: "21 Nov 2026",
    readTime: "4 min",
    excerpt: "Em série melhor de cinco histórica, a equipe sul-americana garantiu o troféu na prorrogação do último mapa.",
    content: "A arena lotada em São Paulo testemunhou uma virada histórica neste domingo. Depois de estar perdendo por 2 a 0 na série, a equipe brasileira ajustou sua composição defensiva e venceu três mapas consecutivos, consolidando a maior audiência simultânea da história do torneio.",
    art: artworks.esports,
    pros: [],
    cons: [],
    likes: 215,
    liked: false,
    comments: [
      { user: "gg_ez", text: "Aquele clutch no 11x11 vai entrar para a história!" }
    ]
  },
  {
    id: 3,
    title: "Apex Drift Zero: Velocidade Pura e Física Refinada no Asfalto Molhado",
    category: "Reviews",
    score: "8.9",
    author: "Lucas Andrade",
    date: "20 Nov 2026",
    readTime: "7 min",
    excerpt: "Testamos o novo simulador arcade com volante e controle. A sensação de aderência impressiona.",
    content: "Apex Drift Zero encontra o ponto ideal entre acessibilidade arcade e precisão técnica. Cada mudança climática exige adaptação imediata nas frenagens, enquanto o modo carreira online oferece campeonatos semanais dinâmicos sem microtransações abusivas.",
    art: artworks.racing,
    pros: ["Física de pista molhada extremamente convincente", "Modo carreira online sem pay-to-win", "Ótimo suporte a volantes"],
    cons: ["Poucas pistas urbanas no lançamento"],
    likes: 64,
    liked: false,
    comments: []
  },
  {
    id: 4,
    title: "Expansão 'Ecos do Abismo' Ganha Data de Lançamento e Novo Mapa Subterrâneo",
    category: "Notícias",
    score: null,
    author: "Marina Costa",
    date: "19 Nov 2026",
    readTime: "3 min",
    excerpt: "Conteúdo chega gratuitamente para todos os jogadores no próximo mês trazendo modo cooperativo para 4 pessoas.",
    content: "Durante transmissão oficial, os desenvolvedores revelaram que 'Ecos do Abismo' adicionará 15 horas de missões inéditas, três novas classes de armas pesadas e biomas bioluminescentes totalmente exploráveis em modo cooperativo.",
    art: artworks.fantasy,
    pros: [],
    cons: [],
    likes: 97,
    liked: false,
    comments: []
  },
  {
    id: 5,
    title: "Como Otimizar Latência e Taxa de Quadros em Jogos Competitivos",
    category: "Guias",
    score: null,
    author: "Tiago Mendes",
    date: "18 Nov 2026",
    readTime: "5 min",
    excerpt: "Ajustes essenciais de rede, painel da placa de vídeo e configurações internas para reduzir o input lag.",
    content: "Reduzir o atraso entre o clique e a resposta na tela faz toda a diferença em partidas ranqueadas. Ative o modo de baixa latência no driver gráfico, utilize conexão cabeada Cat6 e limite a taxa de quadros 3 FPS abaixo da taxa de atualização do seu monitor.",
    art: artworks.esports,
    pros: [],
    cons: [],
    likes: 130,
    liked: false,
    comments: []
  }
];

// Estado atual de filtro e busca
let currentCategory = "todos";
let currentSearch = "";

// Renderizar arte do Hero
document.getElementById("heroArtwork").innerHTML = artworks.cyberpunk;

// Renderizar grade de artigos
function renderArticles() {
  const grid = document.getElementById("articlesGrid");
  const filtered = articles.filter((item) => {
    const matchCat = currentCategory === "todos" || item.category === currentCategory;
    const term = currentSearch.toLowerCase();
    const matchSearch =
      item.title.toLowerCase().includes(term) ||
      item.excerpt.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color: var(--text-secondary);">Nenhuma matéria encontrada para essa busca.</p>`;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (art) => `
      <article class="card">
        <div class="card-art">
          ${art.art}
          <span class="card-cat">${art.category}</span>
          ${art.score ? `<span class="card-score">★ ${art.score}</span>` : ""}
        </div>
        <div class="card-body">
          <h3>${art.title}</h3>
          <p>${art.excerpt}</p>
          <div class="card-footer">
            <span>${art.date} • ${art.readTime}</span>
            <button class="read-link" onclick="openArticle(${art.id})">Ler mais →</button>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

// Filtros por categoria (navbar e pills)
function setCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll("[data-filter]").forEach((el) => {
    el.classList.toggle("active", el.dataset.filter === cat);
  });
  renderArticles();
}

document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    setCategory(btn.dataset.filter);
    document.getElementById("navLinks").classList.remove("show");
  });
});

// Busca em tempo real
document.getElementById("searchInput").addEventListener("input", (e) => {
  currentSearch = e.target.value;
  renderArticles();
});

// Alternar Tema Claro / Escuro
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
  themeToggle.textContent = isDark ? "🌙" : "☀️";
});

// Menu Mobile
document.getElementById("mobileMenuBtn").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("show");
});

// Modal de Leitura
const modal = document.getElementById("articleModal");
const modalBody = document.getElementById("modalBody");

function openArticle(id) {
  const art = articles.find((a) => a.id === id);
  if (!art) return;

  const prosConsHTML =
    art.pros.length > 0
      ? `
      <div class="pros-cons">
        <div class="pros-box">
          <h4>✔ Pontos Positivos</h4>
          <ul>${art.pros.map((p) => `<li>${p}</li>`).join("")}</ul>
        </div>
        <div class="cons-box">
          <h4>✖ Pontos Negativos</h4>
          <ul>${art.cons.map((c) => `<li>${c}</li>`).join("")}</ul>
        </div>
      </div>`
      : "";

  modalBody.innerHTML = `
    <span class="badge badge-review">${art.category}${art.score ? ` • NOTA ${art.score}` : ""}</span>
    <h2>${art.title}</h2>
    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 6px;">
      Por <strong>${art.author}</strong> • ${art.date} • ${art.readTime} de leitura
    </p>
    <div class="modal-art">${art.art}</div>
    <p style="font-size: 1.02rem; line-height: 1.75;">${art.content}</p>
    ${prosConsHTML}
    <div class="interaction-bar">
      <button class="like-btn ${art.liked ? "liked" : ""}" onclick="toggleLike(${art.id})">
        ❤️ Curtir (${art.likes})
      </button>
      <span style="color: var(--text-secondary); font-size: 0.9rem;">
        💬 ${art.comments.length} comentário(s)
      </span>
    </div>
    <div>
      <h4 style="margin-bottom: 10px;">Comentários da Comunidade</h4>
      <form class="comment-form" onsubmit="addComment(event, ${art.id})">
        <input type="text" id="commentInput" placeholder="Escreva sua opinião sobre o jogo..." required />
        <button type="submit" class="btn-primary">Enviar</button>
      </form>
      <div id="commentsList">
        ${art.comments
          .map((c) => `<div class="comment-item"><strong>${c.user}:</strong> ${c.text}</div>`)
          .join("")}
      </div>
    </div>
  `;

  modal.classList.add("open");
}

function toggleLike(id) {
  const art = articles.find((a) => a.id === id);
  art.liked = !art.liked;
  art.likes += art.liked ? 1 : -1;
  openArticle(id);
}

function addComment(event, id) {
  event.preventDefault();
  const input = document.getElementById("commentInput");
  const text = input.value.trim();
  if (!text) return;

  const art = articles.find((a) => a.id === id);
  art.comments.unshift({ user: "VisitanteGamer", text });
  openArticle(id);
}

document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.remove("open");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("open");
});

// Contagem Regressiva ao Vivo (14 dias a partir de agora)
const launchDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = Math.max(0, launchDate - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Newsletter
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("newsletterEmail").value;
  document.getElementById("newsletterFeedback").textContent = `✔ Inscrição confirmada para ${email}!`;
  e.target.reset();
});

// Inicializar feed
renderArticles();
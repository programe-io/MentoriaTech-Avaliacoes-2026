// Base de Dados dos Artigos
const articlesData = [
  {
    id: 1,
    title: "Exossomos e PDRN: A Revolução da Estética Regenerativa Celular",
    category: "Estética Regenerativa",
    date: "12 Nov 2026",
    readTime: "5 min de leitura",
    author: "Dra. Camila Monteiro • Dermatologia",
    likes: 42,
    liked: false,
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=85",
    excerpt: "Esqueça apenas preencher rugas: a nova fronteira utiliza mensageiros celulares e fragmentos de DNA de salmão para reprogramar a regeneração tecidual.",
    content: `
      <p>A estética passou por uma mudança definitiva de paradigma: saímos da era da simples volumização para entrar na era da <strong>bio-regeneração</strong>. No centro dessa transformação estão os exossomos e o PDRN (polidesoxirribonucleotídeo).</p>
      <h4>Como funcionam os Exossomos?</h4>
      <p>Exossomos são nanovesículas extracelulares responsáveis pela comunicação entre células. Quando aplicados após microagulhamento ou lasers fracionados, eles entregam fatores de crescimento, peptídeos e lipídios diretamente aos fibroblastos, acelerando a síntese de colágeno tipo I e elastina em até 3 vezes.</p>
      <h4>O papel do PDRN</h4>
      <p>Extraído de forma altamente purificada, o PDRN atua nos receptores de adenosina A2A, reduzindo inflamações crônicas silenciosas (o chamado <em>inflammaging</em>) e devolvendo luminosidade e espessura saudável à derme sem alterar os traços naturais do rosto.</p>
    `,
    comments: [
      { author: "Mariana Silva", time: "Há 2 horas", text: "Fiz protocolo de PDRN associado ao microagulhamento mês passado e a textura dos poros mudou completamente!" },
      { author: "Dr. Rafael Costa", time: "Ontem", text: "Excelente resumo. A redução do tempo de recuperação pós-laser com exossomos é impressionante na prática clínica." }
    ]
  },
  {
    id: 2,
    title: "Lasers Não Ablativos e Lavieen: O Efeito 'BB Glow' Real",
    category: "Tecnologias",
    date: "08 Nov 2026",
    readTime: "4 min de leitura",
    author: "Lucas Andrade • Engenharia Biomédica",
    likes: 37,
    liked: false,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=85",
    excerpt: "Tecnologias de Thulium 1927nm entregam uniformização de tom, fechamento de poros e viço imediato sem descamação agressiva ou afastamento social.",
    content: `
      <p>Pacientes modernos buscam resultados visíveis sem precisar passar sete dias longe do trabalho ou com a pele sensibilizada. É exatamente nesse cenário que os lasers sub-ablativos de Thulium (como o Lavieen) conquistaram protagonismo.</p>
      <h4>Por que o comprimento de onda 1927nm é especial?</h4>
      <p>Ele possui afinidade moderada pela água, concentrando sua energia na junção dermo-epidérmica — exatamente onde se alojam manchas solares, melasma superficial e irregularidades de textura. O resultado é uma microcoagulação controlada que preserva a camada córnea intacta.</p>
      <h4>Drug Delivery Potencializado</h4>
      <p>Logo após a sessão, microcanais invisíveis permanecem abertos por algumas horas, permitindo a infusão profunda de antioxidantes como vitamina C pura, ácido tranexâmico e niacinamida.</p>
    `,
    comments: [
      { author: "Beatriz Nogueira", time: "Há 5 horas", text: "Amo fazer antes de eventos importantes, a pele fica com viço de porcelana no dia seguinte." }
    ]
  },
  {
    id: 3,
    title: "Skinimalismo Inteligente & Neurocosmética: Menos Passos, Mais Ciência",
    category: "Skincare & Biohacking",
    date: "03 Nov 2026",
    readTime: "6 min de leitura",
    author: "Fernanda Rocha • Cosmetóloga",
    likes: 58,
    liked: false,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=85",
    excerpt: "Rotinas de 12 etapas ficaram no passado. A tendência agora combina fórmulas multifuncionais com ativos que reduzem o cortisol cutâneo.",
    content: `
      <p>O excesso de ácidos e camadas de produtos gerou uma epidemia de barreiras cutâneas sensibilizadas. A resposta da indústria cosmética em 2026 é o <strong>Skinimalismo Inteligente</strong> aliado à neurocosmética.</p>
      <h4>A conexão Cérebro-Pele</h4>
      <p>A pele e o sistema nervoso compartilham a mesma origem embrionária. Picos de estresse liberam cortisol e substância P, degradando colágeno e desencadeando rosácea e acne. Novos ativos neurocosméticos — como peptídeos biomiméticos e extratos adaptógenos — bloqueiam esses sinais inflamatórios diretamente nos receptores cutâneos.</p>
      <h4>A rotina ideal em 3 passos</h4>
      <p>Limpeza suave respeitando o pH fisiológico (4.7–5.5), um sérum multifuncional reparador com ceramidas + peptídeos e fotoproteção híbrida com proteção contra luz visível.</p>
    `,
    comments: []
  },
  {
    id: 4,
    title: "Bioestimuladores Híbridos: Sustentação Natural sem Aspecto Pesado",
    category: "Estética Regenerativa",
    date: "28 Out 2026",
    readTime: "5 min de leitura",
    author: "Dra. Camila Monteiro • Dermatologia",
    likes: 29,
    liked: false,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=85",
    excerpt: "A combinação estratégica de ácido hialurônico de baixa reticulação com hidroxiapatita de cálcio redefine o contorno facial preservando a mímica.",
    content: `
      <p>O fenômeno da "fadiga de preenchimento" levou especialistas a repensarem o planejamento facial. Em vez de criar volume artificial, o foco atual é restaurar a arquitetura de sustentação da pele.</p>
      <h4>O conceito de Hibridização</h4>
      <p>Ao combinar ácido hialurônico fluido (que hidrata e cria um arcabouço imediato) com microesferas de hidroxiapatita de cálcio ou ácido poli-L-lático, estimula-se uma rede densa de neocolagênese ao longo de 90 a 180 dias.</p>
      <h4>Mapeamento por Ultrassom</h4>
      <p>Outra tendência indispensável é o uso de ultrassom dermatológico guiado em tempo real durante a aplicação, garantindo segurança vascular máxima e precisão milimétrica nas camadas anatômicas.</p>
    `,
    comments: [
      { author: "Carla Mendes", time: "Há 3 dias", text: "O mapeamento com ultrassom traz muita tranquilidade para quem tem receio de procedimentos injetáveis." }
    ]
  },
  {
    id: 5,
    title: "Fotobiomodulação LED & Terapia Térmica no Pós-Procedimento",
    category: "Bem-Estar Holístico",
    date: "21 Out 2026",
    readTime: "4 min de leitura",
    author: "Renata Vasconcelos • Estética Integrativa",
    likes: 34,
    liked: false,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85",
    excerpt: "Luz vermelha (630nm) e infravermelho próximo (830nm) aceleram a produção de ATP mitocondrial e elevam a experiência sensorial nas clínicas.",
    content: `
      <p>Clínicas de estética estão se transformando em verdadeiros santuários de longevidade e recuperação celular, unindo alta tecnologia ao bem-estar sensorial.</p>
      <h4>Energia Mitocondrial</h4>
      <p>A fotobiomodulação por LEDs de grau médico estimula a enzima citocromo c oxidase nas mitocôndrias, aumentando a produção de ATP (energia celular). Isso acelera a cicatrização, acalma eritemas e melhora a microcirculação linfática.</p>
      <h4>Drenagem Linfática Facial Esculpida</h4>
      <p>Associada a manobras miofasciais profundas, a terapia reduz o inchaço matinal e redefine os ângulos da mandíbula de forma totalmente não invasiva.</p>
    `,
    comments: []
  },
  {
    id: 6,
    title: "Ultrassom Microfocado de Nova Geração: Lifting 3D Sem Cortes",
    category: "Tecnologias",
    date: "15 Out 2026",
    readTime: "5 min de leitura",
    author: "Lucas Andrade • Engenharia Biomédica",
    likes: 46,
    liked: false,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=85",
    excerpt: "Ponteiras ultrarrápidas e pontos de coagulação lineares tornaram o tratamento da flacidez muscular e dérmica praticamente indolor.",
    content: `
      <p>O ultrassom microfocado sempre foi padrão-ouro para atingir o SMAS (Sistema Músculo Aponeurótico Superficial) — a mesma camada tratada em cirurgias de lifting. Porém, o desconforto era uma barreira.</p>
      <h4>Velocidade e Conforto</h4>
      <p>Os novos equipamentos disparam pulsos até 3 vezes mais rápidos com dispersão térmica homogênea, reduzindo drasticamente a sensibilidade durante a sessão e permitindo tratar áreas delicadas como pálpebras e pescoço com total conforto.</p>
    `,
    comments: []
  }
];

// Estado da Aplicação
let activeCategory = "Todos";
let searchQuery = "";
let currentModalArticleId = null;

// Elementos do DOM
const articlesGrid = document.getElementById("articlesGrid");
const emptyState = document.getElementById("emptyState");
const categoryFilters = document.getElementById("categoryFilters");
const searchInput = document.getElementById("searchInput");
const articleModal = document.getElementById("articleModal");
const themeToggle = document.getElementById("themeToggle");

// Renderizar Cards de Artigos
function renderArticles() {
  const filtered = articlesData.filter(article => {
    const matchesCategory = activeCategory === "Todos" || article.category === activeCategory;
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(term) ||
      article.excerpt.toLowerCase().includes(term) ||
      article.category.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    articlesGrid.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  articlesGrid.innerHTML = filtered.map(article => `
    <article class="article-card">
      <div class="card-img-wrap">
        <img src="${article.image}" alt="${article.title}" loading="lazy" />
        <span class="card-category">${article.category}</span>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span>${article.date}</span>
          <span>•</span>
          <span>${article.readTime}</span>
        </div>
        <h3 class="card-title" onclick="openArticle(${article.id})">${article.title}</h3>
        <p class="card-excerpt">${article.excerpt}</p>
        <div class="card-footer">
          <button class="read-more-btn" onclick="openArticle(${article.id})">
            Ler artigo <span>→</span>
          </button>
          <div class="card-actions">
            <span class="comment-badge" title="Comentários">💬 ${article.comments.length}</span>
            <button class="like-btn ${article.liked ? 'liked' : ''}" onclick="toggleLike(${article.id}, event)">
              <span>${article.liked ? '❤️' : '🤍'}</span>
              <span>${article.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

// Alternar Curtida
function toggleLike(id, event) {
  if (event) event.stopPropagation();
  const article = articlesData.find(a => a.id === id);
  if (!article) return;

  article.liked = !article.liked;
  article.likes += article.liked ? 1 : -1;

  renderArticles();
  if (currentModalArticleId === id) {
    updateModalLikeUI(article);
  }
}

function updateModalLikeUI(article) {
  const btn = document.getElementById("modalLikeBtn");
  document.getElementById("modalLikeIcon").textContent = article.liked ? "❤️" : "🤍";
  document.getElementById("modalLikeCount").textContent = article.likes;
  btn.classList.toggle("liked", article.liked);
}

// Abrir Modal do Artigo
function openArticle(id) {
  const article = articlesData.find(a => a.id === id);
  if (!article) return;

  currentModalArticleId = id;
  document.getElementById("modalImg").src = article.image;
  document.getElementById("modalImg").alt = article.title;
  document.getElementById("modalCategory").textContent = article.category;
  document.getElementById("modalDate").textContent = article.date;
  document.getElementById("modalReadTime").textContent = article.readTime;
  document.getElementById("modalTitle").textContent = article.title;
  document.getElementById("modalText").innerHTML = article.content;
  document.getElementById("modalAuthor").textContent = article.author;

  updateModalLikeUI(article);
  renderComments(article);

  articleModal.classList.add("open");
  articleModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeArticle() {
  articleModal.classList.remove("open");
  articleModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  currentModalArticleId = null;
}

// Renderizar Comentários
function renderComments(article) {
  const list = document.getElementById("commentList");
  document.getElementById("commentCount").textContent = article.comments.length;

  if (article.comments.length === 0) {
    list.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem;">Seja o primeiro a comentar sobre esta tendência.</p>`;
    return;
  }

  list.innerHTML = article.comments.map(c => `
    <div class="comment-item">
      <div class="comment-item-header">
        <strong>${c.author}</strong>
        <span>${c.time}</span>
      </div>
      <p>${c.text}</p>
    </div>
  `).join("");
}

// Eventos de Filtro por Categoria
categoryFilters.addEventListener("click", (e) => {
  if (!e.target.classList.contains("pill")) return;
  document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
  e.target.classList.add("active");
  activeCategory = e.target.dataset.category;
  renderArticles();
});

// Links rápidos no menu superior
document.querySelectorAll("[data-quick-cat]").forEach(link => {
  link.addEventListener("click", () => {
    const cat = link.dataset.quickCat;
    activeCategory = cat;
    document.querySelectorAll(".pill").forEach(p => {
      p.classList.toggle("active", p.dataset.category === cat);
    });
    renderArticles();
  });
});

// Busca em Tempo Real
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderArticles();
});

// Eventos do Modal
document.getElementById("closeModalBtn").addEventListener("click", closeArticle);
articleModal.addEventListener("click", (e) => {
  if (e.target === articleModal) closeArticle();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && articleModal.classList.contains("open")) closeArticle();
});

document.getElementById("modalLikeBtn").addEventListener("click", () => {
  if (currentModalArticleId) toggleLike(currentModalArticleId);
});

document.getElementById("openFeaturedBtn").addEventListener("click", () => openArticle(1));

// Novo Comentário
document.getElementById("commentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentModalArticleId) return;

  const authorInput = document.getElementById("commentAuthor");
  const textInput = document.getElementById("commentInput");
  const article = articlesData.find(a => a.id === currentModalArticleId);

  article.comments.unshift({
    author: authorInput.value.trim(),
    time: "Agora mesmo",
    text: textInput.value.trim()
  });

  authorInput.value = "";
  textInput.value = "";
  renderComments(article);
  renderArticles();
});

// Newsletter
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("newsletterEmail");
  const feedback = document.getElementById("newsletterFeedback");
  feedback.textContent = `✨ Inscrição confirmada para ${emailInput.value}! Bem-vindo(a) à Aesthetica Journal.`;
  emailInput.value = "";
});

// Alternar Tema Claro / Escuro
themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  document.getElementById("themeIcon").textContent = isDark ? "☀️" : "🌙";
  document.getElementById("themeText").textContent = isDark ? "Modo Claro" : "Modo Escuro";
});

// Barra de Progresso de Scroll
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  document.getElementById("readingProgress").style.width = `${progress}%`;
});

// Inicialização
renderArticles();
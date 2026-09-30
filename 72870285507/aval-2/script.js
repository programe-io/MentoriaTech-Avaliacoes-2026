// ==========================================================================
// 1. DATASET DOS UNIVERSOS ALTERNATIVOS DE UNDERTALE (AUs)
// ==========================================================================
const undertaleAUs = [
  {
    id: "underswap",
    title: "Underswap",
    creator: "Popcross Studios / Hatsune Miku (Comunidade)",
    releaseDate: "2015-11-01",
    category: "swap",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80",
    synopsis: "Uma das AUs mais famosas, onde os papéis e personalidades de pares de personagens são trocados mantendo suas essências originais (ex: Sans troca com Papyrus, Toriel com Asgore, Alphys com Undyne).",
    curiosities: [
      "A versão de Sans em Underswap é carinhosamente apelidada pela comunidade de 'Blueberry'.",
      "Foi uma das primeiras grandes AUs criadas logo após o lançamento do jogo original em 2015.",
      "Apesar das trocas de papéis, as relações fundamentais de parentesco e amizade permanecem intactas."
    ]
  },
  {
    id: "underfell",
    title: "Underfell",
    creator: "Vic the Slick",
    releaseDate: "2015-10-25",
    category: "dark",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    synopsis: "Um universo sombrio e opressivo onde a regra do Subsolo é 'matar ou morrer'. Todos os monstros tornaram-se cruéis e violentos, vestindo preto e vermelho, enquanto Flowey/Frisk tentam guiar todos para a redenção.",
    curiosities: [
      "Flowey é o único personagem verdadeiramente bondoso desde o início nesta AU, agindo como companheiro de Frisk.",
      "O design marcante focado nas cores preta, vermelha e dourada tornou-se um padrão estético de referência no fandom.",
      "Inspirou dezenas de animações e fangames independentes no Game Jolt."
    ]
  },
  {
    id: "ink-sans",
    title: "Ink!Sans (Inktale)",
    creator: "Comet-Milt / Comyet",
    releaseDate: "2016-01-15",
    category: "multiverse",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80",
    synopsis: "Ink!Sans não possui uma AU própria completa; ele existe no Void para proteger e apoiar a criação de novas AUs do Multiverso de Undertale, utilizando um pincel gigante chamado Broomie.",
    curiosities: [
      "Ink precisa beber tintas coloridas de frascos em seu peito para conseguir sentir emoções.",
      "Ele não tem uma alma própria e esquece das coisas rapidamente quando fica sem suprimento de tinta.",
      "É o líder e fundador defensivo do grupo comunitário 'The Star Sanes'."
    ]
  },
  {
    id: "error-sans",
    title: "Error!Sans (Errortale)",
    creator: "Crayon Queen (Loverofpiggies)",
    releaseDate: "2016-02-05",
    category: "multiverse",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",
    synopsis: "Nascido de um glitch no código do jogo, Error considera todas as AUs como 'anomalias imundas' e dedica sua existência a destruí-las uma a uma usando cordas mágicas azuis.",
    curiosities: [
      "Error!Sans sofre de afefobia (medo extremo de ser tocado).",
      "Possui uma rivalidade eterna e icônica contra Ink!Sans pelo destino das AUs.",
      "Ele adora assistir novelas em sua dimensão vazia chamada 'Anti-Void'."
    ]
  },
  {
    id: "horrortale",
    title: "Horrortale",
    creator: "Sour-Apple-Studio",
    releaseDate: "2016-04-12",
    category: "horror",
    image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&q=80",
    synopsis: "Anos após uma Rota Neutra sem saída, a Rainha Undyne governa com mão de ferro. Os monstros do Subsolo estão famintos, enlouquecidos e recorrem ao canibalismo para sobreviver.",
    curiosities: [
      "A AU ganhou uma webcomic de grande sucesso e um jogo em formato Point-and-Click feito pelo criador.",
      "Sans possui uma enorme rachadura no crânio causada por um confronto contra Undyne.",
      "Frisk é substituído por uma garota humana com um vestido roxo chamada Aliza."
    ]
  },
  {
    id: "epictale",
    title: "Epictale",
    creator: "Yugobyte (Yugo)",
    releaseDate: "2016-02-21",
    category: "action",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80",
    synopsis: "Uma versão focada em ação de grande escala e batalhas estilo anime Shonen. Epic!Sans é o cientista real com poder desmedido que enfrenta ameaças colossais junto de seu melhor amigo Epic!Papyrus.",
    curiosities: [
      "Famoso pelo bordão 'Bruh' dito por Epic!Sans em quase todas as frases.",
      "Possui animações com qualidade cinematográfica produzidas pelo criador no YouTube.",
      "O olho esquerdo de Epic!Sans brilha em uma cor roxa intensa alimentada por poder concentrado."
    ]
  },
  {
    id: "deltarune",
    title: "Deltarune (Canon Alternate Universe)",
    creator: "Toby Fox",
    releaseDate: "2018-10-31",
    category: "canon",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80",
    synopsis: "O jogo e universo paralelo oficial criado por Toby Fox. Kris, Susie e Ralsei viajam pelos Mundos das Sombras para selar as Fontes das Trevas e manter o equilíbrio entre Luz e Sombra.",
    curiosities: [
      "É um anagrama direto da palavra UNDERTALE.",
      "Embora use vários personagens de Undertale em papéis diferentes, Toby Fox confirmou que é um universo à parte.",
      "A ideia de Deltarune veio a Toby Fox em um sonho em 2011, antes mesmo de criar Undertale."
    ]
  },
  {
    id: "outertale",
    title: "Outertale",
    creator: "2pi (Mimi)",
    releaseDate: "2015-12-10",
    category: "sci-fi",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    synopsis: "Neste universo de ficção científica, os monstros foram banidos não para o fundo de uma montanha, mas para o Cinturão de Asteroides Ebott no espaço sideral.",
    curiosities: [
      "Possui uma das trilhas sonoras rearranged (remixadas) mais admiradas da comunidade.",
      "Os trajes dos personagens possuem estética de astronautas estilizados em tons de azul e dourado estelar.",
      "A história segue os mesmos eventos da Rota Pacifista do jogo original, porém com temática cósmica."
    ]
  },
  {
    id: "aftertale",
    title: "Aftertale (Geno!Sans)",
    creator: "Crayon Queen (Loverofpiggies)",
    releaseDate: "2015-12-28",
    category: "story",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    synopsis: "Geno!Sans é um Sans que injetou Determinação para sobreviver ao golpe final da Rota Genocida, ficando preso no Menu do Jogo (Save Screen) enquanto tenta impedir futuros massacres.",
    curiosities: [
      "Deu origem a um dos quadrinhos em estilo mangá mais lidos do fandom de Undertale.",
      "Geno!Sans usa o cachecol vermelho de seu falecido irmão Papyrus em sinal de luto constante.",
      "Foi um elemento chave para a expansão da história do Multiverso."
    ]
  },
  {
    id: "dusttale",
    title: "Dusttale (Murder!Sans)",
    creator: "Osteophile / Ask-DustTale",
    releaseDate: "2016-02-28",
    category: "dark",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80",
    synopsis: "Após presenciar centenas de Rotas Genocidas seguidas sem conseguir impedir o humano, Sans ganha determinação para matar todos os monstros do Subsolo e acumular LV para vencer o humano.",
    curiosities: [
      "Sans é acompanhado pelo fantasma assustador de Papyrus, que só ele consegue ver e ouvir.",
      "Seus olhos mudam para uma combinação de vermelho (Determinação) e azul (Magia).",
      "É uma das AUs mais famosas e adaptadas em batalhas customizadas de jogos no estilo Fan Game."
    ]
  }
];

// ==========================================================================
// 2. ELEMENTOS DO DOM
// ==========================================================================
const ausGrid = document.getElementById("aus-grid");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const sortOrder = document.getElementById("sort-order");
const noResults = document.getElementById("no-results");

// Modal
const modal = document.getElementById("au-modal");
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalCreator = document.getElementById("modal-creator");
const modalDate = document.getElementById("modal-date");
const modalSynopsis = document.getElementById("modal-synopsis");
const modalCuriosities = document.getElementById("modal-curiosities");
const modalCategoryBadge = document.getElementById("modal-category-badge");

// ==========================================================================
// 3. FUNÇÕES AUXILIARES
// ==========================================================================

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function getCategoryLabel(category) {
  switch (category) {
    case "swap": return "Swap";
    case "dark": return "Sombria";
    case "horror": return "Horror";
    case "multiverse": return "Multiverso";
    case "action": return "Ação";
    case "sci-fi": return "Sci-Fi";
    case "story": return "História";
    case "canon": return "Oficial";
    default: return category;
  }
}

// ==========================================================================
// 4. RENDERIZAÇÃO E FILTRAGEM
// ==========================================================================

function renderAUs(auList) {
  ausGrid.innerHTML = "";

  if (auList.length === 0) {
    noResults.classList.remove("hidden");
    return;
  } else {
    noResults.classList.add("hidden");
  }

  auList.forEach(au => {
    const card = document.createElement("article");
    card.className = "au-card";
    card.setAttribute("data-id", au.id);

    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${au.image}" alt="Arte representativa da AU ${au.title}" loading="lazy">
        <span class="category-badge cat-${au.category}">${getCategoryLabel(au.category)}</span>
      </div>
      <div class="card-content">
        <h2 class="card-title">${au.title}</h2>
        <p class="card-meta">Por ${au.creator} (${formatDate(au.releaseDate)})</p>
        <p class="card-synopsis-preview">${au.synopsis}</p>
        <span class="card-footer">Explorar AU &rarr;</span>
      </div>
    `;

    card.addEventListener("click", () => openModal(au.id));
    ausGrid.appendChild(card);
  });
}

function filterAndSortAUs() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;
  const selectedSort = sortOrder.value;

  // Filtragem
  let filtered = undertaleAUs.filter(au => {
    const matchesSearch = au.title.toLowerCase().includes(searchTerm) ||
                          au.creator.toLowerCase().includes(searchTerm) ||
                          au.curiosities.some(c => c.toLowerCase().includes(searchTerm));
    
    const matchesCategory = selectedCategory === "all" || au.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Ordenação
  filtered.sort((a, b) => {
    if (selectedSort === "oldest") {
      return new Date(a.releaseDate) - new Date(b.releaseDate);
    } else if (selectedSort === "newest") {
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    } else if (selectedSort === "alpha") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  renderAUs(filtered);
}

// ==========================================================================
// 5. GERENCIAMENTO DO MODAL
// ==========================================================================

function openModal(auId) {
  const au = undertaleAUs.find(item => item.id === auId);
  if (!au) return;

  modalTitle.textContent = au.title;
  modalImage.src = au.image;
  modalImage.alt = `Imagem detalhada de ${au.title}`;
  modalCreator.textContent = au.creator;
  modalDate.textContent = formatDate(au.releaseDate);
  modalSynopsis.textContent = au.synopsis;

  modalCategoryBadge.textContent = getCategoryLabel(au.category);
  modalCategoryBadge.className = `category-badge cat-${au.category}`;

  // Curiosidades
  modalCuriosities.innerHTML = "";
  au.curiosities.forEach(curiosity => {
    const li = document.createElement("li");
    li.textContent = curiosity;
    modalCuriosities.appendChild(li);
  });

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";
}

// ==========================================================================
// 6. INICIALIZAÇÃO
// ==========================================================================

function init() {
  searchInput.addEventListener("input", filterAndSortAUs);
  categoryFilter.addEventListener("change", filterAndSortAUs);
  sortOrder.addEventListener("change", filterAndSortAUs);

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  filterAndSortAUs();
}

document.addEventListener("DOMContentLoaded", init);
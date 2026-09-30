// ==========================================================================
// 1. DATASET COMPLETO DOS JOGOS DO SONIC
// ==========================================================================
const sonicGames = [
  {
    id: "sonic-1",
    title: "Sonic the Hedgehog",
    releaseDate: "1991-06-23",
    platform: "Mega Drive / Genesis",
    era: "classic",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
    synopsis: "O jogo que iniciou tudo. O ouriço azul corre pela Ilha do Sul para salvar seus amigos animais das garras do maligno Dr. Robotnik e coletar as Seis Esmeraldas do Caos.",
    curiosities: [
      "Sonic foi criado para ser o mascote oficial da SEGA e rivalizar com o Mario da Nintendo.",
      "A cor azul de Sonic foi escolhida para combinar com o logotipo corporativo da SEGA.",
      "Originalmente, Sonic tinha uma namorada humana chamada Madonna, mas a ideia foi descartada."
    ]
  },
  {
    id: "sonic-2",
    title: "Sonic the Hedgehog 2",
    releaseDate: "1992-11-21",
    platform: "Mega Drive / Genesis",
    era: "classic",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&q=80",
    synopsis: "Sonic se une ao seu novo amigo de duas caudas, Miles 'Tails' Prower, para deter a construção do Ovo da Morte (Death Egg) pelo Dr. Robotnik.",
    curiosities: [
      "Introduziu a famosa mecânica 'Spin Dash' e a transformação Super Sonic.",
      "O jogo gerou o evento comercial 'Sonic 2sday', lançando globalmente em uma terça-feira.",
      "Foi o primeiro jogo a apresentar Tails."
    ]
  },
  {
    id: "sonic-cd",
    title: "Sonic the Hedgehog CD",
    releaseDate: "1993-09-23",
    platform: "Sega CD",
    era: "classic",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&q=80",
    synopsis: "Viajando no tempo no Little Planet, Sonic deve impedir que Robotnik controle as Pedras do Tempo enquanto enfrenta o temível Metal Sonic e resgata Amy Rose.",
    curiosities: [
      "Primeiro jogo da série a utilizar áudio em formato CD e vídeos animados de abertura.",
      "Apresenta mecânicas de viagem no tempo entre Passado, Presente, Futuro Bom e Futuro Mau.",
      "A trilha sonora americana foi completamente alterada em relação à versão nipo-européia."
    ]
  },
  {
    id: "sonic-3-knuckles",
    title: "Sonic 3 & Knuckles",
    releaseDate: "1994-02-02",
    platform: "Mega Drive / Genesis",
    era: "classic",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80",
    synopsis: "Na Ilha do Anjo, Sonic e Tails enfrentam o iludido Knuckles the Echidna, guardião da Esmeralda Mestre, manipulado por Robotnik.",
    curiosities: [
      "Originalmente planejado como um único jogo, mas dividido devido a custos de cartucho e prazos.",
      "A tecnologia Lock-On permitia encaixar o cartucho do Sonic 3 no de Sonic & Knuckles.",
      "Michael Jackson participou da composição de partes da trilha sonora, embora não tenha sido creditado oficialmente."
    ]
  },
  {
    id: "sonic-adventure",
    title: "Sonic Adventure",
    releaseDate: "1998-12-23",
    platform: "Sega Dreamcast",
    era: "dreamcast",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
    synopsis: "A estreia de Sonic no mundo 3D totalmente explorável. Sonic e seus amigos lutam contra Chaos, um deus antigo da destruição libertado pelo Dr. Eggman.",
    curiosities: [
      "Foi o jogo mais vendido do Sega Dreamcast.",
      "Trouxe o redesenho dos personagens feito por Yuji Uekawa com proporções mais modernas.",
      "Introduziu os Caos (bichinhos virtuais) jogáveis com integração ao VMU do Dreamcast."
    ]
  },
  {
    id: "sonic-adventure-2",
    title: "Sonic Adventure 2",
    releaseDate: "2001-06-18",
    platform: "Sega Dreamcast",
    era: "dreamcast",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&q=80",
    synopsis: "Com duas campanhas (Hero e Dark), o jogo introduz Shadow the Hedgehog e Rouge the Bat em uma corrida contra o tempo para salvar ou dominar a Terra.",
    curiosities: [
      "Último jogo do Sonic lançado para um console fabricado pela própria SEGA.",
      "A famosa música de abertura 'Live & Learn' da banda Crush 40 tornou-se um dos hinos da franquia.",
      "Introduziu o sistema de rivalidade icônico entre Sonic e Shadow."
    ]
  },
  {
    id: "sonic-heroes",
    title: "Sonic Heroes",
    releaseDate: "2003-12-30",
    platform: "PS2, GameCube, Xbox, PC",
    era: "modern",
    image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&q=80",
    synopsis: "Lide com equipes de três personagens trocando dinamicamente entre as habilidades de Speed, Fly e Power para deter a ameaça de Metal Sonic Overlord.",
    curiosities: [
      "Primeiro jogo principal do Sonic lançado nativamente para múltiplos consoles concorrentes.",
      "Resgatou o time Chaotix (Espio, Vector, Charmy), que não aparecia desde o 32X.",
      "Desenvolvido na engine RenderWare."
    ]
  },
  {
    id: "sonic-unleashed",
    title: "Sonic Unleashed",
    releaseDate: "2008-11-18",
    platform: "PS3, Xbox 360, Wii, PS2",
    era: "modern",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    synopsis: "Após a Terra ser partida em pedaços por Eggman, Sonic ganha a capacidade de se transformar em 'Werehog' à noite e precisa restaurar os continentes com o amuleto de Chip.",
    curiosities: [
      "Estreou a 'Hedgehog Engine', criada especialmente para renderizar iluminação ultra-realista em alta velocidade.",
      "Dividiu opiniões devido às fases de combate lento no modo Werehog versus a velocidade frenética em 2.5D/3D no dia.",
      "Inspirou diretamente o estilo de câmera 'Boost' adotado nos jogos seguintes."
    ]
  },
  {
    id: "sonic-generations",
    title: "Sonic Generations",
    releaseDate: "2011-11-01",
    platform: "PS3, Xbox 360, PC, 3DS",
    era: "modern",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&q=80",
    synopsis: "Para comemorar os 20 anos da franquia, o Sonic Moderno e o Sonic Clássico se unem através de fendas temporais para revisitar fases históricas da série.",
    curiosities: [
      "Permitiu jogar com a física original 2D do Sonic clássico e a velocidade 3D do Sonic moderno no mesmo título.",
      "Reuniu fases rearranjadas de três eras: Clássica, Dreamcast e Moderna.",
      "O visual do Sonic Clássico foi baseado estritamente na era 16-bits do Mega Drive."
    ]
  },
  {
    id: "sonic-mania",
    title: "Sonic Mania",
    releaseDate: "2017-08-15",
    platform: "PS4, Xbox One, Nintendo Switch, PC",
    era: "modern",
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&q=80",
    synopsis: "Desenvolvido por fãs renomados da comunidade hacker/modder liderados por Christian Whitehead, é uma celebração em pixels 16-bits dos jogos clássicos com novas mecânicas.",
    curiosities: [
      "Primeiro jogo 2D do Sonic em décadas a alcançar aclamação crítica universal rápida.",
      "Começou como um protótipo feito por fãs antes da SEGA oficializar o projeto.",
      "Trouxe de volta Mighty the Armadillo e Ray the Flying Squirrel na expansão Mania Plus."
    ]
  },
  {
    id: "sonic-frontiers",
    title: "Sonic Frontiers",
    releaseDate: "2022-11-08",
    platform: "PS5, Xbox Series X/S, Switch, PC",
    era: "modern",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    synopsis: "Uma evolução da franquia para o estilo 'Zona Aberta'. Sonic explora as misteriosas Ilhas Starfall para resgatar seus amigos e descobrir a civilização ancestral.",
    curiosities: [
      "Revolucionou a estrutura da franquia ao implementar mecânicas de RPG e exploração em mundo aberto.",
      "A trilha sonora mescla música orquestral melancólica nas explorações com Metalcore pesado nas batalhas de Titãs.",
      "Foi o jogo Sonic 3D com vendas mais rápidas da história recente da SEGA."
    ]
  }
];

// ==========================================================================
// 2. REFERÊNCIAS DO DOM
// ==========================================================================
const gamesGrid = document.getElementById("games-grid");
const searchInput = document.getElementById("search-input");
const eraFilter = document.getElementById("era-filter");
const sortOrder = document.getElementById("sort-order");
const noResults = document.getElementById("no-results");

// Modal
const modal = document.getElementById("game-modal");
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalDate = document.getElementById("modal-date");
const modalPlatform = document.getElementById("modal-platform");
const modalSynopsis = document.getElementById("modal-synopsis");
const modalCuriosities = document.getElementById("modal-curiosities");
const modalEraBadge = document.getElementById("modal-era-badge");

// ==========================================================================
// 3. FUNÇÕES AUXILIARES
// ==========================================================================

// Formata data ISO (AAAA-MM-DD) para PT-BR (DD/MM/AAAA)
function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

// Retorna o rótulo formatado da Era
function getEraLabel(era) {
  switch (era) {
    case "classic": return "Era Clássica";
    case "dreamcast": return "Era Dreamcast";
    case "modern": return "Era Moderna";
    default: return era;
  }
}

// ==========================================================================
// 4. LÓGICA DE RENDERIZAÇÃO E FILTRAGEM
// ==========================================================================

// Renderiza a lista de cards no Grid
function renderGames(games) {
  gamesGrid.innerHTML = "";

  if (games.length === 0) {
    noResults.classList.remove("hidden");
    return;
  } else {
    noResults.classList.add("hidden");
  }

  games.forEach(game => {
    const card = document.createElement("article");
    card.className = "game-card";
    card.setAttribute("data-id", game.id);

    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${game.image}" alt="Capa de ${game.title}" loading="lazy">
        <span class="era-badge era-${game.era}">${getEraLabel(game.era)}</span>
      </div>
      <div class="card-content">
        <h2 class="card-title">${game.title}</h2>
        <p class="card-meta">${formatDate(game.releaseDate)} | ${game.platform}</p>
        <p class="card-synopsis-preview">${game.synopsis}</p>
        <span class="card-footer">Clique para ver mais detalhes &rarr;</span>
      </div>
    `;

    // Evento de clique para abrir o modal
    card.addEventListener("click", () => openModal(game.id));

    gamesGrid.appendChild(card);
  });
}

// Filtra e ordena o dataset
function filterAndSortGames() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedEra = eraFilter.value;
  const selectedSort = sortOrder.value;

  // 1. Filtrar
  let filtered = sonicGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm) ||
                          game.curiosities.some(c => c.toLowerCase().includes(searchTerm));
    
    const matchesEra = selectedEra === "all" || game.era === selectedEra;

    return matchesSearch && matchesEra;
  });

  // 2. Ordenar
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

  // 3. Renderizar
  renderGames(filtered);
}

// ==========================================================================
// 5. LÓGICA DO MODAL
// ==========================================================================

function openModal(gameId) {
  const game = sonicGames.find(g => g.id === gameId);
  if (!game) return;

  modalTitle.textContent = game.title;
  modalImage.src = game.image;
  modalImage.alt = `Capa ampliada de ${game.title}`;
  modalDate.textContent = formatDate(game.releaseDate);
  modalPlatform.textContent = game.platform;
  modalSynopsis.textContent = game.synopsis;

  modalEraBadge.textContent = getEraLabel(game.era);
  modalEraBadge.className = `era-badge era-${game.era}`;

  // Preencher Curiosidades
  modalCuriosities.innerHTML = "";
  game.curiosities.forEach(curiosity => {
    const li = document.createElement("li");
    li.textContent = curiosity;
    modalCuriosities.appendChild(li);
  });

  // Exibir Modal
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Bloqueia rolagem do fundo
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto"; // Restaura rolagem
}

// ==========================================================================
// 6. EVENT LISTENERS E INICIALIZAÇÃO
// ==========================================================================

function init() {
  // Listeners para filtros e busca
  searchInput.addEventListener("input", filterAndSortGames);
  eraFilter.addEventListener("change", filterAndSortGames);
  sortOrder.addEventListener("change", filterAndSortGames);

  // Listeners para o Modal
  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);

  // Fechar modal com a tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // Renderização inicial (padrão: mais antigos primeiro)
  filterAndSortGames();
}

// Executar ao carregar o DOM
document.addEventListener("DOMContentLoaded", init);

const animes = [
    {
        id: 1,
        title: "Naruto Shippuden",
        year: 2007,
        rating: 8.7,
        episodes: "500 episódios",
        genre: ["Ação", "Aventura"],
        emoji: "🍥",
        colors: ["#e87531", "#792c32"],
        description: "A jornada de um ninja que sonha em se tornar Hokage."
    },
    {
        id: 2,
        title: "One Piece",
        year: 1999,
        rating: 9.0,
        episodes: "Em andamento",
        genre: ["Ação", "Aventura"],
        emoji: "🏴‍☠️",
        colors: ["#247eae", "#18335e"],
        description: "Luffy e sua tripulação partem em busca do maior tesouro."
    },
    {
        id: 3,
        title: "Demon Slayer",
        year: 2019,
        rating: 8.6,
        episodes: "Série",
        genre: ["Ação", "Fantasia"],
        emoji: "⚔️",
        colors: ["#318b83", "#183b59"],
        description: "Tanjiro luta contra demônios para salvar sua irmã."
    },
    {
        id: 4,
        title: "Attack on Titan",
        year: 2013,
        rating: 9.1,
        episodes: "94 episódios",
        genre: ["Ação", "Drama"],
        emoji: "🛡️",
        colors: ["#8b4d36", "#302b3b"],
        description: "A humanidade luta pela sobrevivência contra os titãs."
    },
    {
        id: 5,
        title: "Jujutsu Kaisen",
        year: 2020,
        rating: 8.6,
        episodes: "Série",
        genre: ["Ação", "Fantasia"],
        emoji: "👊",
        colors: ["#7e4dba", "#27234f"],
        description: "Yuji entra no mundo das maldições e do sobrenatural."
    },
    {
        id: 6,
        title: "Your Name",
        year: 2016,
        rating: 8.4,
        episodes: "Filme",
        genre: ["Romance", "Drama"],
        emoji: "🌠",
        colors: ["#db718c", "#5345a2"],
        description: "Dois jovens descobrem uma conexão misteriosa entre si."
    },
    {
        id: 7,
        title: "Spy x Family",
        year: 2022,
        rating: 8.3,
        episodes: "Série",
        genre: ["Ação", "Aventura"],
        emoji: "🕵️",
        colors: ["#9a7a46", "#493a65"],
        description: "Uma família incomum esconde segredos surpreendentes."
    },
    {
        id: 8,
        title: "Haikyuu!!",
        year: 2014,
        rating: 8.7,
        episodes: "85 episódios",
        genre: ["Esporte", "Drama"],
        emoji: "🏐",
        colors: ["#e17a36", "#533b58"],
        description: "Um time de vôlei luta para alcançar o topo."
    },
    {
        id: 9,
        title: "My Hero Academia",
        year: 2016,
        rating: 8.2,
        episodes: "Série",
        genre: ["Ação", "Aventura"],
        emoji: "💥",
        colors: ["#4e9d80", "#23425c"],
        description: "Izuku busca se tornar um grande herói em um mundo de poderes."
    },
    {
        id: 10,
        title: "Sailor Moon",
        year: 1992,
        rating: 7.8,
        episodes: "200 episódios",
        genre: ["Fantasia", "Romance"],
        emoji: "🌙",
        colors: ["#d66dba", "#493c8b"],
        description: "Uma jovem descobre seu destino como guerreira da Lua."
    },
    {
        id: 11,
        title: "Death Note",
        year: 2006,
        rating: 8.9,
        episodes: "37 episódios",
        genre: ["Drama", "Fantasia"],
        emoji: "📓",
        colors: ["#6c587c", "#1c1b29"],
        description: "Um caderno misterioso inicia um jogo de inteligência."
    },
    {
        id: 12,
        title: "Fullmetal Alchemist",
        year: 2009,
        rating: 9.1,
        episodes: "64 episódios",
        genre: ["Ação", "Aventura"],
        emoji: "⚗️",
        colors: ["#b17d48", "#493044"],
        description: "Dois irmãos percorrem um mundo de alquimia em busca de respostas."
    }
];

const animeGrid = document.getElementById("animeGrid");
const favoritesGrid = document.getElementById("favoritesGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const resultsCount = document.getElementById("resultsCount");
const catalogLabel = document.getElementById("catalogLabel");
const emptyState = document.getElementById("emptyState");
const favoritesEmpty = document.getElementById("favoritesEmpty");
const toast = document.getElementById("toast");

let selectedGenre = "Todos";
let searchTerm = "";
let toastTimer;

document.getElementById("totalAnimes").textContent = animes.length;

// Recupera favoritos salvos no navegador.
function loadFavorites() {
    try {
        const saved = JSON.parse(localStorage.getItem("animeVerseFavorites"));
        if (!Array.isArray(saved)) return [];
        return saved.filter(id =>
            Number.isInteger(id) && animes.some(anime => anime.id === id)
        );
    } catch {
        return [];
    }
}

let favorites = loadFavorites();

function saveFavorites() {
    try {
        localStorage.setItem(
            "animeVerseFavorites",
            JSON.stringify(favorites)
        );
    } catch {
        showToast("Não foi possível salvar no navegador.");
    }
}

function createAnimeCard(anime) {
    const isFavorite = favorites.includes(anime.id);

    const card = document.createElement("article");
    card.className = "anime-card";

    const poster = document.createElement("div");
    poster.className = "anime-poster";
    poster.style.setProperty("--poster-a", anime.colors[0]);
    poster.style.setProperty("--poster-b", anime.colors[1]);

    const label = document.createElement("span");
    label.className = "poster-label";
    label.textContent = anime.year;

    const emoji = document.createElement("span");
    emoji.className = "poster-emoji";
    emoji.textContent = anime.emoji;
    emoji.setAttribute("aria-hidden", "true");

    const favoriteBtn = document.createElement("button");
    favoriteBtn.className = "favorite-btn";
    favoriteBtn.classList.toggle("is-favorite", isFavorite);
    favoriteBtn.textContent = isFavorite ? "♥" : "♡";
    favoriteBtn.setAttribute(
        "aria-label",
        isFavorite
            ? `Remover ${anime.title} dos favoritos`
            : `Adicionar ${anime.title} aos favoritos`
    );
    favoriteBtn.setAttribute("aria-pressed", String(isFavorite));

    favoriteBtn.addEventListener("click", () => {
        toggleFavorite(anime.id);
    });

    poster.append(label, emoji, favoriteBtn);

    const info = document.createElement("div");
    info.className = "anime-info";

    const title = document.createElement("h3");
    title.textContent = anime.title;
    title.title = anime.title;

    const meta = document.createElement("div");
    meta.className = "anime-meta";

    const episodes = document.createElement("span");
    episodes.textContent = anime.episodes;

    const rating = document.createElement("span");
    rating.className = "rating";
    rating.textContent = `★ ${anime.rating.toFixed(1)}`;

    meta.append(episodes, rating);

    const description = document.createElement("p");
    description.textContent = anime.description;

    const genres = document.createElement("div");

    anime.genre.forEach(genre => {
        const tag = document.createElement("span");
        tag.className = "genre-tag";
        tag.textContent = genre;
        tag.style.marginRight = "5px";
        genres.appendChild(tag);
    });

    info.append(title, meta, description, genres);
    card.append(poster, info);

    return card;
}

function getFilteredAnimes() {
    let filtered = animes.filter(anime => {
        const matchesGenre =
            selectedGenre === "Todos" ||
            anime.genre.includes(selectedGenre);

        const searchableText = [
            anime.title,
            ...anime.genre,
            anime.description
        ].join(" ").toLocaleLowerCase("pt-BR");

        const matchesSearch = searchableText.includes(searchTerm);

        return matchesGenre && matchesSearch;
    });

    if (sortSelect.value === "az") {
        filtered.sort((a, b) =>
            a.title.localeCompare(b.title, "pt-BR")
        );
    } else if (sortSelect.value === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
}

function renderAnimes() {
    const filtered = getFilteredAnimes();

    animeGrid.replaceChildren();

    filtered.forEach(anime => {
        animeGrid.appendChild(createAnimeCard(anime));
    });

    resultsCount.textContent =
        `${filtered.length} ${filtered.length === 1 ? "título" : "títulos"}`;

    catalogLabel.textContent =
        selectedGenre === "Todos"
            ? "Todos os animes"
            : `Animes de ${selectedGenre}`;

    emptyState.hidden = filtered.length !== 0;
    animeGrid.hidden = filtered.length === 0;

    renderFavorites();
}

function renderFavorites() {
    const favoriteAnimes = favorites
        .map(id => animes.find(anime => anime.id === id))
        .filter(Boolean);

    favoritesGrid.replaceChildren();

    favoriteAnimes.forEach(anime => {
        favoritesGrid.appendChild(createAnimeCard(anime));
    });

    favoritesEmpty.hidden = favoriteAnimes.length !== 0;
    favoritesGrid.hidden = favoriteAnimes.length === 0;
}

function toggleFavorite(id) {
    const anime = animes.find(item => item.id === id);
    if (!anime) return;

    if (favorites.includes(id)) {
        favorites = favorites.filter(favoriteId => favoriteId !== id);
        showToast(`${anime.title} removido dos favoritos.`);
    } else {
        favorites.push(id);
        showToast(`${anime.title} adicionado aos favoritos! ♥`);
    }

    saveFavorites();
    renderAnimes();
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// Pesquisa em tempo real.
searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value.trim().toLocaleLowerCase("pt-BR");
    renderAnimes();
});

// Limpar a pesquisa.
document.getElementById("clearSearch").addEventListener("click", () => {
    searchInput.value = "";
    searchTerm = "";
    renderAnimes();
    searchInput.focus();
});

// Filtrar por gênero.
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        selectedGenre = button.dataset.genre;

        document.querySelectorAll(".filter-btn").forEach(btn => {
            const active = btn === button;
            btn.classList.toggle("active", active);
            btn.setAttribute("aria-pressed", String(active));
        });

        renderAnimes();
    });
});

// Ordenação.
sortSelect.addEventListener("change", renderAnimes);

// Restaurar filtros.
document.getElementById("resetFilters").addEventListener("click", () => {
    searchInput.value = "";
    searchTerm = "";
    selectedGenre = "Todos";
    sortSelect.value = "default";

    document.querySelectorAll(".filter-btn").forEach(button => {
        const active = button.dataset.genre === "Todos";
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });

    renderAnimes();
});

// Menu para celulares.
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".navbar nav");

menuBtn.setAttribute("aria-expanded", "false");

menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );
    menuBtn.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Abrir menu");
        menuBtn.textContent = "☰";
    });
});

// Inicializa o catálogo.
document.querySelectorAll(".filter-btn").forEach(button => {
    button.setAttribute(
        "aria-pressed",
        String(button.dataset.genre === "Todos")
    );
});

renderAnimes();

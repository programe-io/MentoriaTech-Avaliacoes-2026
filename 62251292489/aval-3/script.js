
const games = [
    {
        id: 1,
        name: "Cyberpunk 2077",
        category: "acao",
        genre: "Ação",
        platform: ["PC", "PlayStation", "Xbox"],
        description: "Explore uma cidade futurista.",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg"
    },
    {
        id: 2,
        name: "Elden Ring",
        category: "rpg",
        genre: "RPG",
        platform: ["PC", "PlayStation", "Xbox"],
        description: "Explore um mundo de fantasia.",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg"
    },
    {
        id: 3,
        name: "Minecraft",
        category: "aventura",
        genre: "Aventura",
        platform: ["PC", "PlayStation", "Xbox", "Nintendo"],
        description: "Construa e explore seu mundo.",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/header.jpg"
    },
    {
        id: 4,
        name: "Stardew Valley",
        category: "simulacao",
        genre: "Simulação",
        platform: ["PC", "PlayStation", "Xbox", "Nintendo"],
        description: "Crie sua própria fazenda.",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg"
    },
    {
        id: 5,
        name: "EA SPORTS FC 25",
        category: "esporte",
        genre: "Esporte",
        platform: ["PC", "PlayStation", "Xbox", "Nintendo"],
        description: "Entre em campo e dispute partidas.",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/header.jpg"
    },
    {
        id: 6,
        name: "Red Dead Redemption 2",
        category: "aventura",
        genre: "Aventura",
        platform: ["PC", "PlayStation", "Xbox"],
        description: "Uma aventura no Velho Oeste.",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg"
    },
    {
        id: 7,
        name: "Grand Theft Auto V",
        category: "acao",
        genre: "Ação",
        platform: ["PC", "PlayStation", "Xbox"],
        description: "Explore uma cidade cheia de ação.",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg"
    },
    {
        id: 8,
        name: "The Witcher 3",
        category: "rpg",
        genre: "RPG",
        platform: ["PC", "PlayStation", "Xbox", "Nintendo"],
        description: "Embarque em uma aventura épica.",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg"
    }
];

const searchInput = document.getElementById("searchInput");
const platformFilter = document.getElementById("platformFilter");
const gamesGrid = document.getElementById("gamesGrid");
const favoritesGrid = document.getElementById("favoritesGrid");
const gameCount = document.getElementById("gameCount");
const emptyGames = document.getElementById("emptyGames");
const emptyFavorites = document.getElementById("emptyFavorites");
const filters = document.querySelectorAll(".filter");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const loginButton = document.getElementById("loginButton");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const toast = document.getElementById("toast");

let activeCategory = "todos";
let favorites = loadFavorites();
let toastTimeout;

function loadFavorites() {
    try {
        const saved = JSON.parse(
            localStorage.getItem("bngames-favorites") || "[]"
        );

        return Array.isArray(saved)
            ? saved.filter(id => Number.isInteger(id))
            : [];
    } catch {
        return [];
    }
}

function saveFavorites() {
    try {
        localStorage.setItem(
            "bngames-favorites",
            JSON.stringify(favorites)
        );
    } catch {
        showToast("Não foi possível salvar os favoritos neste navegador.");
    }
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function createGameCard(game) {
    const card = document.createElement("article");
    card.className = "game-card";

    const image = document.createElement("img");
    image.className = "game-image";
    image.src = game.image;
    image.alt = `Capa de ${game.name}`;
    image.loading = "lazy";

    image.addEventListener("error", () => {
        image.style.display = "none";
    }, { once: true });

    const details = document.createElement("div");
    details.className = "game-details";

    const title = document.createElement("h3");
    title.textContent = game.name;

    const description = document.createElement("p");
    description.textContent = game.description;

    const meta = document.createElement("div");
    meta.className = "game-meta";

    const tag = document.createElement("span");
    tag.className = "category-tag";
    tag.textContent = game.genre;

    const favoriteButton = document.createElement("button");
    const isFavorite = favorites.includes(game.id);

    favoriteButton.className = "favorite-button";
    favoriteButton.classList.toggle("is-favorite", isFavorite);
    favoriteButton.textContent = isFavorite ? "♥" : "♡";
    favoriteButton.setAttribute(
        "aria-label",
        isFavorite
            ? `Remover ${game.name} dos favoritos`
            : `Adicionar ${game.name} aos favoritos`
    );
    favoriteButton.setAttribute("aria-pressed", String(isFavorite));

    favoriteButton.addEventListener("click", () => {
        toggleFavorite(game.id);
    });

    meta.append(tag, favoriteButton);
    details.append(title, description, meta);
    card.append(image, details);

    return card;
}

function renderGames() {
    const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
    const selectedPlatform = platformFilter.value;

    const filteredGames = games.filter(game => {
        const matchesName = game.name
            .toLocaleLowerCase("pt-BR")
            .includes(query);

        const matchesCategory =
            activeCategory === "todos" ||
            game.category === activeCategory;

        const matchesPlatform =
            selectedPlatform === "todos" ||
            game.platform.includes(selectedPlatform);

        return matchesName && matchesCategory && matchesPlatform;
    });

    gamesGrid.replaceChildren(
        ...filteredGames.map(createGameCard)
    );

    gameCount.textContent =
        `${filteredGames.length} ${filteredGames.length === 1 ? "jogo" : "jogos"}`;

    emptyGames.hidden = filteredGames.length > 0;

    renderFavorites();
}

function renderFavorites() {
    const favoriteGames = games.filter(game =>
        favorites.includes(game.id)
    );

    favoritesGrid.replaceChildren(
        ...favoriteGames.map(createGameCard)
    );

    emptyFavorites.hidden = favoriteGames.length > 0;
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favoriteId => favoriteId !== id);
        showToast("Jogo removido dos favoritos.");
    } else {
        favorites.push(id);
        showToast("Jogo adicionado aos favoritos!");
    }

    saveFavorites();
    renderGames();
}

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        activeCategory = filter.dataset.filter;

        filters.forEach(item => {
            const isActive = item === filter;
            item.classList.toggle("active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
        });

        renderGames();
    });
});

searchInput.addEventListener("input", renderGames);
platformFilter.addEventListener("change", renderGames);

menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menu");
    });
});

loginButton.addEventListener("click", () => {
    if (typeof loginModal.showModal === "function") {
        loginModal.showModal();
    } else {
        loginModal.setAttribute("open", "");
    }
});

closeModal.addEventListener("click", () => {
    loginModal.close();
});

loginModal.addEventListener("click", event => {
    if (event.target === loginModal) {
        loginModal.close();
    }
});

loginForm.addEventListener("submit", event => {
    event.preventDefault();

    const username = usernameInput.value.trim();

    if (!username) {
        showToast("Digite seu nome para continuar.");
        return;
    }

    try {
        localStorage.setItem("bngames-demo-user", username);
    } catch {
        // A demonstração continua mesmo se o navegador bloquear o armazenamento.
    }

    loginModal.close();
    loginButton.textContent = username;
    showToast(`Bem-vindo à BNGAMES, ${username}!`);
});

try {
    const savedUsername = localStorage.getItem("bngames-demo-user");

    if (savedUsername) {
        loginButton.textContent = savedUsername;
    }
} catch {
    // O site continua funcionando sem armazenamento local.
}

document.getElementById("year").textContent = new Date().getFullYear();

renderGames();

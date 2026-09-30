
/* ==============================
   BANCO DE DADOS DOS FILMES
================================ */

const movies = [
    {
        id: 1,
        title: "Homem-Aranha",
        originalTitle: "Spider-Man",
        year: 2002,
        type: "Live-action",
        director: "Sam Raimi",
        poster: "https://image.tmdb.org/t/p/w500/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg",
        description:
            "Peter Parker ganha habilidades extraordinárias após ser picado por uma aranha geneticamente modificada. Enquanto aprende a lidar com seus poderes, ele enfrenta o Duende Verde."
    },
    {
        id: 2,
        title: "Homem-Aranha 2",
        originalTitle: "Spider-Man 2",
        year: 2004,
        type: "Live-action",
        director: "Sam Raimi",
        poster: "https://image.tmdb.org/t/p/w500/olxpyq9kJAZ2NU1siLshhhXEPR7.jpg",
        description:
            "Peter tenta equilibrar sua vida pessoal com a responsabilidade de ser um herói. A chegada do Doutor Octopus torna tudo ainda mais complicado."
    },
    {
        id: 3,
        title: "Homem-Aranha 3",
        originalTitle: "Spider-Man 3",
        year: 2007,
        type: "Live-action",
        director: "Sam Raimi",
        poster: "https://image.tmdb.org/t/p/w500/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
        description:
            "Peter enfrenta novos inimigos e precisa lidar com a influência de uma misteriosa substância alienígena que altera seu comportamento."
    },
    {
        id: 4,
        title: "O Espetacular Homem-Aranha",
        originalTitle: "The Amazing Spider-Man",
        year: 2012,
        type: "Live-action",
        director: "Marc Webb",
        poster: "https://image.tmdb.org/t/p/w500/fSbqPbqXa7ePo8bcnZYN9AHv6zA.jpg",
        description:
            "Peter Parker investiga o passado de seus pais e descobre segredos que o colocam no caminho do perigoso Lagarto."
    },
    {
        id: 5,
        title: "O Espetacular Homem-Aranha 2",
        originalTitle: "The Amazing Spider-Man 2",
        year: 2014,
        type: "Live-action",
        director: "Marc Webb",
        poster: "https://image.tmdb.org/t/p/w500/c3e9e18SSlvFd1cQaGmUj5tqL5P.jpg",
        description:
            "Peter Parker enfrenta Electro e outros desafios enquanto tenta compreender seu papel como protetor de Nova York."
    },
    {
        id: 6,
        title: "Homem-Aranha: De Volta ao Lar",
        originalTitle: "Spider-Man: Homecoming",
        year: 2017,
        type: "Live-action",
        director: "Jon Watts",
        poster: "https://image.tmdb.org/t/p/w500/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
        description:
            "Depois de conhecer os Vingadores, Peter Parker tenta provar que está preparado para enfrentar ameaças maiores enquanto continua sendo um estudante."
    },
    {
        id: 7,
        title: "Homem-Aranha: Longe de Casa",
        originalTitle: "Spider-Man: Far From Home",
        year: 2019,
        type: "Live-action",
        director: "Jon Watts",
        poster: "https://image.tmdb.org/t/p/w500/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg",
        description:
            "Durante uma viagem escolar pela Europa, Peter tenta descansar, mas acaba envolvido em uma nova ameaça ao lado de Mysterio."
    },
    {
        id: 8,
        title: "Homem-Aranha: Sem Volta Para Casa",
        originalTitle: "Spider-Man: No Way Home",
        year: 2021,
        type: "Live-action",
        director: "Jon Watts",
        poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        description:
            "Após sua identidade ser revelada, Peter procura uma solução mágica. O resultado coloca em risco a realidade e abre as portas para o multiverso."
    },
    {
        id: 9,
        title: "Homem-Aranha no Aranhaverso",
        originalTitle: "Spider-Man: Into the Spider-Verse",
        year: 2018,
        type: "Animação",
        director: "Bob Persichetti, Peter Ramsey e Rodney Rothman",
        poster: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
        description:
            "Miles Morales descobre seus poderes e conhece versões do Homem-Aranha vindas de diferentes dimensões."
    },
    {
        id: 10,
        title: "Homem-Aranha: Através do Aranhaverso",
        originalTitle: "Spider-Man: Across the Spider-Verse",
        year: 2023,
        type: "Animação",
        director: "Joaquim Dos Santos, Kemp Powers e Justin K. Thompson",
        poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        description:
            "Miles Morales reencontra Gwen Stacy e viaja pelo multiverso, onde conhece diferentes versões do herói e enfrenta novos conflitos."
    }
];

/* ==============================
   ELEMENTOS DO HTML
================================ */

const moviesGrid = document.getElementById("moviesGrid");
const searchInput = document.getElementById("searchInput");
const yearFilter = document.getElementById("yearFilter");
const clearFilters = document.getElementById("clearFilters");
const emptyMessage = document.getElementById("emptyMessage");
const movieTotal = document.getElementById("movieTotal");

const favoritesButton =
    document.getElementById("favoritesButton");

const favoriteCount =
    document.getElementById("favoriteCount");

const movieDialog = document.getElementById("movieDialog");
const dialogContent = document.getElementById("dialogContent");
const closeDialog = document.getElementById("closeDialog");

/* ==============================
   FAVORITOS
================================ */

let favorites = [];

try {
    const savedFavorites = JSON.parse(
        localStorage.getItem("spiderVerseFavorites") || "[]"
    );

    if (Array.isArray(savedFavorites)) {
        favorites = savedFavorites.filter(
            id => Number.isInteger(id) &&
            movies.some(movie => movie.id === id)
        );
    }
} catch (error) {
    favorites = [];
}

let showingFavorites = false;

function saveFavorites() {
    try {
        localStorage.setItem(
            "spiderVerseFavorites",
            JSON.stringify(favorites)
        );
    } catch (error) {
        console.warn("Não foi possível salvar os favoritos.");
    }
}

function updateFavoriteCount() {
    favoriteCount.textContent = favorites.length;

    favoritesButton.setAttribute(
        "aria-pressed",
        String(showingFavorites)
    );
}

/* ==============================
   PREENCHER FILTRO DE ANOS
================================ */

function populateYears() {
    const years = [...new Set(
        movies.map(movie => movie.year)
    )].sort((a, b) => b - a);

    years.forEach(year => {
        const option = document.createElement("option");

        option.value = String(year);
        option.textContent = year;

        yearFilter.appendChild(option);
    });
}

/* ==============================
   EXIBIR OS FILMES
================================ */

function renderMovies() {
    const searchTerm = searchInput.value
        .trim()
        .toLocaleLowerCase("pt-BR");

    const selectedYear = yearFilter.value;

    const filteredMovies = movies.filter(movie => {
        const matchesSearch =
            movie.title.toLocaleLowerCase("pt-BR")
                .includes(searchTerm) ||
            movie.originalTitle.toLowerCase()
                .includes(searchTerm);

        const matchesYear =
            selectedYear === "todos" ||
            String(movie.year) === selectedYear;

        const matchesFavorites =
            !showingFavorites ||
            favorites.includes(movie.id);

        return matchesSearch &&
            matchesYear &&
            matchesFavorites;
    });

    moviesGrid.innerHTML = "";

    filteredMovies.forEach(movie => {
        const isFavorite = favorites.includes(movie.id);

        const card = document.createElement("article");
        card.className = "movie-card";

        const posterWrapper = document.createElement("div");
        posterWrapper.className = "poster-wrapper";

        const poster = document.createElement("img");
        poster.className = "poster";
        poster.src = movie.poster;
        poster.alt = `Pôster de ${movie.title}`;
        poster.loading = "lazy";

        poster.addEventListener("error", () => {
            poster.alt = `Pôster indisponível: ${movie.title}`;
            poster.removeAttribute("src");
            poster.style.display = "none";

            posterWrapper.style.background =
                "linear-gradient(135deg, #301016, #14141c)";
        }, { once: true });

        const year = document.createElement("span");
        year.className = "movie-year";
        year.textContent = movie.year;

        const favorite = document.createElement("button");
        favorite.className = "favorite-button";

        if (isFavorite) {
            favorite.classList.add("active");
        }

        favorite.textContent = isFavorite ? "♥" : "♡";
        favorite.setAttribute(
            "aria-label",
            isFavorite
                ? `Remover ${movie.title} dos favoritos`
                : `Adicionar ${movie.title} aos favoritos`
        );

        favorite.setAttribute(
            "aria-pressed",
            String(isFavorite)
        );

        favorite.addEventListener("click", () => {
            toggleFavorite(movie.id);
        });

        posterWrapper.append(poster, year, favorite);

        const info = document.createElement("div");
        info.className = "movie-info";

        const title = document.createElement("h3");
        title.textContent = movie.title;

        const director = document.createElement("p");
        director.textContent = `Direção: ${movie.director}`;

        const type = document.createElement("span");
        type.className = "movie-type";
        type.textContent = movie.type;

        const detailsButton = document.createElement("button");
        detailsButton.className = "details-button";
        detailsButton.textContent = "Ver detalhes";

        detailsButton.addEventListener("click", () => {
            openMovieDetails(movie.id);
        });

        info.append(
            title,
            director,
            type,
            detailsButton
        );

        card.append(posterWrapper, info);
        moviesGrid.appendChild(card);
    });

    movieTotal.textContent =
        `${filteredMovies.length} filme(s)`;

    emptyMessage.hidden = filteredMovies.length !== 0;
}

/* ==============================
   ADICIONAR OU REMOVER FAVORITOS
================================ */

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(
            favoriteId => favoriteId !== id
        );
    } else {
        favorites.push(id);
    }

    saveFavorites();
    updateFavoriteCount();
    renderMovies();
}

favoritesButton.addEventListener("click", () => {
    showingFavorites = !showingFavorites;

    favoritesButton.innerHTML = showingFavorites
        ? '♥ Ver todos <span id="favoriteCount">0</span>'
        : '♥ Favoritos <span id="favoriteCount">0</span>';

    // Recupera a referência após atualizar o botão.
    const newCount = document.getElementById("favoriteCount");
    newCount.textContent = favorites.length;

    renderMovies();
});

/* ==============================
   DETALHES DO FILME
================================ */

function openMovieDetails(id) {
    const movie = movies.find(item => item.id === id);

    if (!movie) return;

    dialogContent.innerHTML = "";

    const layout = document.createElement("div");
    layout.className = "dialog-layout";

    const poster = document.createElement("img");
    poster.className = "dialog-poster";
    poster.src = movie.poster;
    poster.alt = `Pôster de ${movie.title}`;

    poster.addEventListener("error", () => {
        poster.style.display = "none";
    }, { once: true });

    const info = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = movie.title;

    const meta = document.createElement("p");
    meta.className = "dialog-meta";
    meta.textContent =
        `${movie.year} • ${movie.type} • ${movie.director}`;

    const description = document.createElement("p");
    description.className = "dialog-description";
    description.textContent = movie.description;

    const originalTitle = document.createElement("p");
    originalTitle.textContent =
        `Título original: ${movie.originalTitle}`;

    const favorite = document.createElement("button");
    favorite.className = "primary-button";
    favorite.style.border = "none";
    favorite.style.marginTop = "20px";

    function updateDialogFavorite() {
        favorite.textContent = favorites.includes(movie.id)
            ? "♥ Remover dos favoritos"
            : "♡ Adicionar aos favoritos";
    }

    updateDialogFavorite();

    favorite.addEventListener("click", () => {
        toggleFavorite(movie.id);
        updateDialogFavorite();
    });

    info.append(
        title,
        meta,
        description,
        originalTitle,
        favorite
    );

    layout.append(poster, info);
    dialogContent.appendChild(layout);

    movieDialog.showModal();
}

closeDialog.addEventListener("click", () => {
    movieDialog.close();
});

movieDialog.addEventListener("click", event => {
    if (event.target === movieDialog) {
        movieDialog.close();
    }
});

/* ==============================
   PESQUISA E FILTROS
================================ */

searchInput.addEventListener("input", renderMovies);
yearFilter.addEventListener("change", renderMovies);

clearFilters.addEventListener("click", () => {
    searchInput.value = "";
    yearFilter.value = "todos";
    showingFavorites = false;

    favoritesButton.innerHTML =
        '♥ Favoritos <span id="favoriteCount">0</span>';

    updateFavoriteCount();
    renderMovies();
});

/* ==============================
   INICIALIZAÇÃO DO SITE
================================ */

populateYears();
updateFavoriteCount();
renderMovies();
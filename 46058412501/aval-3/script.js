
/* =========================================
   CINEVERSE — JAVASCRIPT
   Arquivo: script.js
========================================= */

"use strict";

// ---------- CATÁLOGO DE FILMES ----------

const movies = [
    {
        title: "Interestelar",
        year: 2014,
        genre: "Ficção científica",
        rating: "8.7",
        duration: "2h 49min",
        description: "Uma equipe de exploradores atravessa o espaço em busca de um futuro para a humanidade.",
        image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
    },
    {
        title: "Duna: Parte Dois",
        year: 2024,
        genre: "Aventura",
        rating: "8.5",
        duration: "2h 46min",
        description: "Paul Atreides une forças com os Fremen enquanto seu destino se aproxima.",
        image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg"
    },
    {
        title: "Homem-Aranha: Através do Aranhaverso",
        year: 2023,
        genre: "Animação",
        rating: "8.6",
        duration: "2h 20min",
        description: "Miles Morales encontra outras versões do Homem-Aranha em uma aventura pelo multiverso.",
        image: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
    },
    {
        title: "Oppenheimer",
        year: 2023,
        genre: "Drama",
        rating: "8.3",
        duration: "3h",
        description: "A trajetória do físico J. Robert Oppenheimer durante o desenvolvimento da bomba atômica.",
        image: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg"
    },
    {
        title: "John Wick 4: Baba Yaga",
        year: 2023,
        genre: "Ação",
        rating: "7.6",
        duration: "2h 49min",
        description: "John Wick enfrenta novos inimigos em uma jornada de ação ao redor do mundo.",
        image: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
    },
    {
        title: "A Origem",
        year: 2010,
        genre: "Ficção científica",
        rating: "8.8",
        duration: "2h 28min",
        description: "Um especialista em invadir sonhos recebe uma missão quase impossível.",
        image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
    },
    {
        title: "Toy Story",
        year: 1995,
        genre: "Animação",
        rating: "8.3",
        duration: "1h 21min",
        description: "Brinquedos ganham vida quando os humanos não estão por perto.",
        image: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg"
    },
    {
        title: "Invocação do Mal",
        year: 2013,
        genre: "Terror",
        rating: "7.5",
        duration: "1h 52min",
        description: "Investigadores paranormais ajudam uma família que enfrenta acontecimentos assustadores.",
        image: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg"
    },
    {
        title: "Jurassic Park",
        year: 1993,
        genre: "Aventura",
        rating: "8.2",
        duration: "2h 7min",
        description: "Um parque com dinossauros recriados por engenharia genética se transforma em uma aventura perigosa.",
        image: "https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg"
    },
    {
        title: "Vingadores: Ultimato",
        year: 2019,
        genre: "Ação",
        rating: "8.4",
        duration: "3h 1min",
        description: "Os heróis restantes se unem para tentar reverter as consequências de uma grande batalha.",
        image: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"
    },
    {
        title: "Titanic",
        year: 1997,
        genre: "Drama",
        rating: "7.9",
        duration: "3h 14min",
        description: "Uma história de amor acontece a bordo do famoso transatlântico Titanic.",
        image: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
    },
    {
        title: "Batman",
        year: 2022,
        genre: "Ação",
        rating: "7.8",
        duration: "2h 56min",
        description: "Batman investiga uma série de crimes que revelam segredos sombrios de Gotham City.",
        image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
    }
];

// ---------- ELEMENTOS DO HTML ----------

const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-button");
const resultsCount = document.getElementById("resultsCount");
const emptyMessage = document.getElementById("emptyMessage");

// ---------- ESTADO DO SITE ----------

let selectedGenre = "Todos";
let searchText = "";
const favorites = new Set();

// ---------- CRIAR UM CARD ----------

function createMovieCard(movie, index) {
    const card = document.createElement("article");
    card.className = "movie-card";
    card.style.animationDelay = `${Math.min(index * 45, 400)}ms`;

    const isFavorite = favorites.has(movie.title);

    // A imagem tem texto alternativo e uma imagem substituta
    // caso o endereço do cartaz não funcione.
    const poster = document.createElement("div");
    poster.className = "movie-poster";

    const img = document.createElement("img");
    img.src = movie.image;
    img.alt = `Cartaz do filme ${movie.title}`;
    img.loading = "lazy";

    img.addEventListener("error", () => {
        img.style.display = "none";
        poster.classList.add("poster-fallback");

        const fallback = document.createElement("div");
        fallback.className = "poster-fallback-content";
        fallback.textContent = movie.title;

        poster.appendChild(fallback);
    }, { once: true });

    const overlay = document.createElement("div");
    overlay.className = "poster-overlay";
    overlay.setAttribute("aria-hidden", "true");

    const rating = document.createElement("span");
    rating.className = "movie-rating";
    rating.textContent = `★ ${movie.rating}`;

    const tag = document.createElement("span");
    tag.className = "movie-tag";
    tag.textContent = movie.genre.toUpperCase();

    poster.append(img, overlay, rating, tag);

    const info = document.createElement("div");
    info.className = "movie-info";

    const meta = document.createElement("div");
    meta.className = "movie-meta";

    const year = document.createElement("span");
    year.textContent = movie.year;

    const dot = document.createElement("span");
    dot.className = "meta-dot";
    dot.textContent = "•";

    const duration = document.createElement("span");
    duration.textContent = movie.duration;

    meta.append(year, dot, duration);

    const title = document.createElement("h3");
    title.textContent = movie.title;

    const description = document.createElement("p");
    description.textContent = movie.description;

    const footer = document.createElement("div");
    footer.className = "movie-footer";

    const genre = document.createElement("span");
    genre.textContent = movie.genre;

    const favoriteButton = document.createElement("button");
    favoriteButton.type = "button";
    favoriteButton.textContent = isFavorite ? "♥" : "♡";
    favoriteButton.setAttribute(
        "aria-label",
        isFavorite
            ? `Remover ${movie.title} dos favoritos`
            : `Adicionar ${movie.title} aos favoritos`
    );
    favoriteButton.setAttribute("aria-pressed", String(isFavorite));
    favoriteButton.title = isFavorite
        ? "Remover dos favoritos"
        : "Adicionar aos favoritos";

    if (isFavorite) {
        favoriteButton.classList.add("is-favorite");
    }

    favoriteButton.addEventListener("click", () => {
        toggleFavorite(movie.title);
        favoriteButton.textContent = favorites.has(movie.title) ? "♥" : "♡";

        const nowFavorite = favorites.has(movie.title);

        favoriteButton.classList.toggle("is-favorite", nowFavorite);
        favoriteButton.setAttribute("aria-pressed", String(nowFavorite));
        favoriteButton.setAttribute(
            "aria-label",
            nowFavorite
                ? `Remover ${movie.title} dos favoritos`
                : `Adicionar ${movie.title} aos favoritos`
        );
        favoriteButton.title = nowFavorite
            ? "Remover dos favoritos"
            : "Adicionar aos favoritos";
    });

    footer.append(genre, favoriteButton);
    info.append(meta, title, description, footer);
    card.append(poster, info);

    return card;
}

// ---------- FAVORITOS ----------

function toggleFavorite(title) {
    if (favorites.has(title)) {
        favorites.delete(title);
    } else {
        favorites.add(title);
    }
}

// ---------- PESQUISA E FILTROS ----------

function getFilteredMovies() {
    return movies.filter(movie => {
        const matchesGenre =
            selectedGenre === "Todos" ||
            movie.genre === selectedGenre;

        const searchableText = [
            movie.title,
            movie.genre,
            movie.description,
            String(movie.year)
        ].join(" ").toLocaleLowerCase("pt-BR");

        const matchesSearch = searchableText.includes(
            searchText.toLocaleLowerCase("pt-BR")
        );

        return matchesGenre && matchesSearch;
    });
}

// ---------- ATUALIZAR CATÁLOGO ----------

function renderMovies() {
    const filteredMovies = getFilteredMovies();

    movieGrid.replaceChildren();

    filteredMovies.forEach((movie, index) => {
        movieGrid.appendChild(createMovieCard(movie, index));
    });

    const count = filteredMovies.length;
    resultsCount.textContent =
        `${count} ${count === 1 ? "filme encontrado" : "filmes encontrados"}`;

    emptyMessage.hidden = count !== 0;
    movieGrid.hidden = count === 0;
}

// ---------- EVENTOS DOS FILTROS ----------

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedGenre = button.dataset.genre || "Todos";

        filterButtons.forEach(filter => {
            const isActive = filter === button;
            filter.classList.toggle("active", isActive);
            filter.setAttribute("aria-pressed", String(isActive));
        });

        renderMovies();
    });

    button.setAttribute(
        "aria-pressed",
        String(button.classList.contains("active"))
    );
});

// ---------- EVENTO DA PESQUISA ----------

searchInput.addEventListener("input", event => {
    searchText = event.target.value.trim();
    renderMovies();
});

// ---------- INICIALIZAÇÃO ----------

function initCineverse() {
    if (!movieGrid || !searchInput || !resultsCount || !emptyMessage) {
        console.error(
            "CINEVERSE: confira se o HTML contém movieGrid, searchInput, resultsCount e emptyMessage."
        );
        return;
    }

    renderMovies();
}

initCineverse();

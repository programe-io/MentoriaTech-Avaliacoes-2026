// ==========================================
// BANCO DE DADOS DOS ANIMES
// ==========================================

const animes = [
    {
        id: 1,
        name: "Demon Slayer",
        genre: "Ação",
        year: 2019,
        image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=600&q=80",
        description: "Tanjiro embarca em uma jornada para salvar sua irmã e enfrentar demônios."
    },

    {
        id: 2,
        name: "One Piece",
        genre: "Aventura",
        year: 1999,
        image: "https://images.unsplash.com/photo-1606918801925-e2c914c4b503?auto=format&fit=crop&w=600&q=80",
        description: "Luffy e sua tripulação viajam pelos mares em busca do lendário One Piece."
    },

    {
        id: 3,
        name: "Jujutsu Kaisen",
        genre: "Ação",
        year: 2020,
        image: "https://images.unsplash.com/photo-1578632749014-ca77efd052eb?auto=format&fit=crop&w=600&q=80",
        description: "Yuji Itadori entra no mundo dos feiticeiros para combater maldições."
    },

    {
        id: 4,
        name: "Sword Art Online",
        genre: "Fantasia",
        year: 2012,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
        description: "Jogadores ficam presos dentro de um mundo virtual e precisam lutar pela sobrevivência."
    },

    {
        id: 5,
        name: "Attack on Titan",
        genre: "Ação",
        year: 2013,
        image: "https://images.unsplash.com/photo-1541560052-77ec1bbc09f7?auto=format&fit=crop&w=600&q=80",
        description: "A humanidade luta pela sobrevivência contra criaturas gigantes conhecidas como Titãs."
    },

    {
        id: 6,
        name: "My Hero Academia",
        genre: "Aventura",
        year: 2016,
        image: "https://images.unsplash.com/photo-1607604276583-eef5a0765f7c?auto=format&fit=crop&w=600&q=80",
        description: "Izuku sonha em se tornar um herói mesmo tendo nascido sem poderes."
    },

    {
        id: 7,
        name: "Your Name",
        genre: "Romance",
        year: 2016,
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
        description: "Dois jovens descobrem que misteriosamente conseguem trocar de corpo."
    },

    {
        id: 8,
        name: "Naruto",
        genre: "Aventura",
        year: 2002,
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
        description: "Naruto busca reconhecimento e sonha em se tornar o maior ninja de sua vila."
    }
];


// ==========================================
// ELEMENTOS
// ==========================================

const animeGrid = document.getElementById("animeGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.querySelectorAll(".filter");
const animeCount = document.getElementById("animeCount");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const themeButton = document.getElementById("themeButton");


// ==========================================
// FAVORITOS
// ==========================================

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];


// ==========================================
// RENDERIZAR ANIMES
// ==========================================

function renderAnimes(list) {

    animeGrid.innerHTML = "";

    animeCount.textContent = `${list.length} anime(s)`;

    if (list.length === 0) {

        animeGrid.innerHTML = `
            <div style="
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px;
                color: #a6a9b7;
            ">
                <h2>Nenhum anime encontrado 😢</h2>
                <p>Tente pesquisar outro nome.</p>
            </div>
        `;

        return;
    }

    list.forEach(anime => {

        const isFavorite = favorites.includes(anime.id);

        const card = document.createElement("article");

        card.className = "anime-card";

        card.innerHTML = `
            <div
                class="anime-image"
                style="background-image: url('${anime.image}')"
            >

                <button
                    class="favorite ${isFavorite ? "active" : ""}"
                    data-id="${anime.id}"
                    title="Favoritar"
                >
                    ${isFavorite ? "♥" : "♡"}
                </button>

            </div>

            <div class="anime-info">

                <span class="genre">
                    ${anime.genre} • ${anime.year}
                </span>

                <h3>${anime.name}</h3>

                <p class="description">
                    ${anime.description}
                </p>

            </div>
        `;

        // Abrir detalhes
        card.addEventListener("click", (event) => {

            if (event.target.classList.contains("favorite")) {
                return;
            }

            openModal(anime);
        });

        // Favoritar
        const favoriteButton = card.querySelector(".favorite");

        favoriteButton.addEventListener("click", (event) => {

            event.stopPropagation();

            toggleFavorite(anime.id);
        });

        animeGrid.appendChild(card);
    });
}


// ==========================================
// FAVORITAR
// ==========================================

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites = favorites.filter(
            favoriteId => favoriteId !== id
        );

    } else {

        favorites.push(id);
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    filterAnimes();
}


// ==========================================
// PESQUISA E FILTRO
// ==========================================

let currentGenre = "Todos";

function filterAnimes() {

    const search = searchInput.value.toLowerCase();

    const filtered = animes.filter(anime => {

        const matchesSearch =
            anime.name.toLowerCase().includes(search);

        const matchesGenre =
            currentGenre === "Todos" ||
            anime.genre === currentGenre;

        return matchesSearch && matchesGenre;
    });

    renderAnimes(filtered);
}


// ==========================================
// BOTÕES DE GÊNERO
// ==========================================

filters.forEach(button => {

    button.addEventListener("click", () => {

        filters.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentGenre = button.dataset.genre;

        filterAnimes();
    });

});


// ==========================================
// PESQUISA
// ==========================================

searchInput.addEventListener(
    "input",
    filterAnimes
);


// ==========================================
// MODAL
// ==========================================

function openModal(anime) {

    modalBody.innerHTML = `

        <span class="small-title">
            ${anime.genre.toUpperCase()}
        </span>

        <h2>${anime.name}</h2>

        <p>
            ${anime.description}
        </p>

        <br>

        <p>
            <strong>Ano:</strong> ${anime.year}
        </p>

        <br>

        <p>
            Este anime faz parte do catálogo do AnimeVerse.
            Adicione aos favoritos para encontrá-lo novamente.
        </p>
    `;

    modal.classList.add("show");
}


closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});


modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        modal.classList.remove("show");
    }

});


// ==========================================
// MODO ESCURO / CLARO
// ==========================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");
    themeButton.textContent = "☀️";

}


themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    themeButton.textContent =
        isLight ? "☀️" : "🌙";

    localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
    );

});


// ==========================================
// INICIALIZAÇÃO
// ==========================================

renderAnimes(animes);

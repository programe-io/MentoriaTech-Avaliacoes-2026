/* =========================================
   CONFIGURAÇÃO
========================================= */

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const pokemonGrid = document.getElementById("pokemonGrid");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");

const loading = document.getElementById("loading");
const noResults = document.getElementById("noResults");

const modal = document.getElementById("pokemonModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

let allPokemon = [];


/* =========================================
   CARREGAR POKÉMON
========================================= */

async function loadPokemon() {

    showLoading();

    try {

        const response = await fetch(
            `${API_URL}?limit=151`
        );

        if (!response.ok) {
            throw new Error("Erro ao acessar a PokéAPI.");
        }

        const data = await response.json();

        const pokemonDetails = await Promise.all(
            data.results.map(pokemon =>
                fetch(pokemon.url).then(response =>
                    response.json()
                )
            )
        );

        allPokemon = pokemonDetails;

        renderPokemon(allPokemon);

    } catch (error) {

        console.error(error);

        pokemonGrid.innerHTML = `
            <div class="no-results">
                <span>⚠️</span>
                <h3>Não foi possível carregar a Pokédex.</h3>
                <p>
                    Verifique sua conexão com a internet
                    e tente novamente.
                </p>
            </div>
        `;

    } finally {

        hideLoading();

    }
}


/* =========================================
   RENDERIZAR POKÉMON
========================================= */

function renderPokemon(pokemonList) {

    pokemonGrid.innerHTML = "";

    if (pokemonList.length === 0) {

        noResults.classList.remove("hidden");

        return;
    }

    noResults.classList.add("hidden");

    pokemonList.forEach(pokemon => {

        const card = createPokemonCard(pokemon);

        pokemonGrid.appendChild(card);

    });
}


/* =========================================
   CRIAR CARD
========================================= */

function createPokemonCard(pokemon) {

    const card = document.createElement("article");

    card.className = "pokemon-card";

    const number = String(pokemon.id).padStart(3, "0");

    const types = pokemon.types
        .map(item => item.type.name)
        .map(type => `
            <span class="type type-${type}">
                ${translateType(type)}
            </span>
        `)
        .join("");

    card.innerHTML = `
        <span class="pokemon-number">
            #${number}
        </span>

        <img
            class="pokemon-image"
            src="${pokemon.sprites.other["official-artwork"].front_default}"
            alt="${pokemon.name}"
            loading="lazy"
        >

        <h3 class="pokemon-name">
            ${pokemon.name}
        </h3>

        <div class="types">
            ${types}
        </div>
    `;

    card.addEventListener("click", () => {
        openModal(pokemon);
    });

    return card;
}


/* =========================================
   PESQUISA E FILTRO
========================================= */

function filterPokemon() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();

    const selectedType =
        typeFilter.value;

    const filtered = allPokemon.filter(pokemon => {

        const matchesName =
            pokemon.name
                .toLowerCase()
                .includes(searchTerm);

        const matchesType =
            selectedType === "all" ||
            pokemon.types.some(
                item => item.type.name === selectedType
            );

        return matchesName && matchesType;
    });

    renderPokemon(filtered);
}

searchInput.addEventListener(
    "input",
    filterPokemon
);

typeFilter.addEventListener(
    "change",
    filterPokemon
);


/* =========================================
   MODAL
========================================= */

function openModal(pokemon) {

    const number = String(pokemon.id).padStart(3, "0");

    const types = pokemon.types
        .map(item => item.type.name)
        .map(type => `
            <span class="type type-${type}">
                ${translateType(type)}
            </span>
        `)
        .join("");

    const abilities = pokemon.abilities
        .map(item =>
            item.ability.name
        )
        .join(", ");

    const height =
        (pokemon.height / 10).toFixed(1);

    const weight =
        (pokemon.weight / 10).toFixed(1);

    modalBody.innerHTML = `
        <img
            class="modal-pokemon-image"
            src="${pokemon.sprites.other["official-artwork"].front_default}"
            alt="${pokemon.name}"
        >

        <h2 class="modal-title">
            ${pokemon.name}
        </h2>

        <p style="
            text-align:center;
            color:#8992a2;
            margin-top:5px;
        ">
            #${number}
        </p>

        <div class="types"
             style="
                justify-content:center;
                margin-top:15px;
             ">
            ${types}
        </div>

        <div class="modal-info">

            <div class="info-box">
                <span>Altura</span>
                <strong>${height} m</strong>
            </div>

            <div class="info-box">
                <span>Peso</span>
                <strong>${weight} kg</strong>
            </div>

            <div class="info-box">
                <span>Experiência base</span>
                <strong>
                    ${pokemon.base_experience}
                </strong>
            </div>

            <div class="info-box">
                <span>Habilidades</span>
                <strong>
                    ${abilities}
                </strong>
            </div>

        </div>
    `;

    modal.classList.remove("hidden");

    document.body.style.overflow = "hidden";
}


/* =========================================
   FECHAR MODAL
========================================= */

function closePokemonModal() {

    modal.classList.add("hidden");

    document.body.style.overflow = "";
}

closeModal.addEventListener(
    "click",
    closePokemonModal
);

document
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closePokemonModal
    );

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            !modal.classList.contains("hidden")
        ) {
            closePokemonModal();
        }

    }
);


/* =========================================
   TRADUÇÃO DOS TIPOS
========================================= */

function translateType(type) {

    const types = {

        normal: "Normal",
        fire: "Fogo",
        water: "Água",
        electric: "Elétrico",
        grass: "Planta",
        ice: "Gelo",
        fighting: "Lutador",
        poison: "Veneno",
        ground: "Terrestre",
        flying: "Voador",
        psychic: "Psíquico",
        bug: "Inseto",
        rock: "Pedra",
        ghost: "Fantasma",
        dragon: "Dragão",
        dark: "Sombrio",
        steel: "Aço",
        fairy: "Fada"

    };

    return types[type] || type;
}


/* =========================================
   LOADING
========================================= */

function showLoading() {

    loading.classList.remove("hidden");

}

function hideLoading() {

    loading.classList.add("hidden");

}


/* =========================================
   INICIALIZAÇÃO
========================================= */

loadPokemon();
const recipes = [
  {
    id: 1,
    title: "Bolo de Cenoura com Cobertura",
    category: "Sobremesa",
    time: "45 min",
    image: "https://unsplash.com",
    ingredients: ["3 cenouras médias", "3 ovos", "2 xícaras de farinha de trigo", "1 xícara de óleo", "1 xícara de açúcar", "1 colher de fermento"],
    steps: ["Bata no liquidificador a cenoura, os ovos e o óleo.", "Misture com o açúcar, a farinha e, por último, o fermento.", "Asse a 180 °C por cerca de 35 a 40 minutos."]
  },
  {
    id: 2,
    title: "Torta Salgada de Frango Cremosa",
    category: "Salgado",
    time: "50 min",
    image: "https://unsplash.com",
    ingredients: ["500 g de frango desfiado", "1 requeijão cremoso", "2 xícaras de farinha", "2 ovos", "1 xícara de leite", "Tempero a gosto"],
    steps: ["Refogue o frango e misture com o requeijão.", "Bata os ingredientes da massa e despeje metade em uma forma untada.", "Adicione o recheio, cubra com o restante da massa e asse até dourar."]
  },
  {
    id: 3,
    title: "Tapioca Recheada com Queijo e Coco",
    category: "Lanche",
    time: "10 min",
    image: "https://unsplash.com",
    ingredients: ["4 colheres de goma de tapioca", "Queijo coalho ou mussarela", "Coco ralado a gosto"],
    steps: ["Espalhe a goma em uma frigideira quente em fogo baixo por 1 a 2 minutos.", "Adicione o recheio em metade do disco e dobre ao meio.", "Sirva ainda morna."]
  }
];

const state = {
  search: "",
  category: "Todas",
  favorites: JSON.parse(localStorage.getItem("favoriteRecipes") || "[]")
};

const feedEl = document.getElementById("recipeFeed");
const searchInput = document.getElementById("searchInput");
const categoryFilters = document.getElementById("categoryFilters");
const modal = document.getElementById("recipeModal");
const modalContent = document.getElementById("modalContent");

function saveFavorites() {
  localStorage.setItem("favoriteRecipes", JSON.stringify(state.favorites));
}

function toggleFavorite(id) {
  const index = state.favorites.indexOf(id);
  if (index > -1) {
    state.favorites.splice(index, 1);
  } else {
    state.favorites.push(id);
  }
  saveFavorites();
  renderFeed();
}

function openRecipeModal(id) {
  const recipe = recipes.find((item) => item.id === id);
  if (!recipe) return;

  modalContent.innerHTML = `
    <h2>${recipe.title}</h2>
    <p><strong>Categoria:</strong> ${recipe.category} • <strong>Tempo:</strong> ${recipe.time}</p>
    <h3>Ingredientes</h3>
    <ul>${recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("")}</ul>
    <h3>Modo de preparo</h3>
    <ol>${recipe.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
    <button class="btn-close" id="closeModalBtn">Fechar</button>
  `;

  modal.showModal();
  document.getElementById("closeModalBtn").addEventListener("click", () => modal.close());
}

function getFilteredRecipes() {
  const term = state.search.trim().toLowerCase();
  return recipes.filter((recipe) => {
    const matchesCategory = state.category === "Todas" || recipe.category === state.category;
    const matchesSearch =
      !term ||
      recipe.title.toLowerCase().includes(term) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  });
}

function renderFeed() {
  const filtered = getFilteredRecipes();

  if (filtered.length === 0) {
    feedEl.innerHTML = "<p>Nenhuma receita encontrada para esse filtro.</p>";
    return;
  }

  feedEl.innerHTML = filtered
    .map((recipe) => {
      const isFav = state.favorites.includes(recipe.id);
      return `
        <article class="card">
          <img src="${recipe.image}" alt="${recipe.title}" />
          <div class="card-body">
            <div class="card-meta">
              <span>${recipe.category}</span>
              <span>${recipe.time}</span>
            </div>
            <h2>${recipe.title}</h2>
            <div class="card-actions">
              <button class="btn-primary" data-open="${recipe.id}">Ver receita</button>
              <button class="btn-fav ${isFav ? "active" : ""}" data-fav="${recipe.id}" aria-label="Favoritar">
                ${isFav ? "♥ Salvo" : "♡ Salvar"}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

searchInput.addEventListener("input", (e) => {
  state.search = e.target.value;
  renderFeed();
});

categoryFilters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  state.category = btn.dataset.category;
  renderFeed();
});

feedEl.addEventListener("click", (e) => {
  const openBtn = e.target.closest("[data-open]");
  if (openBtn) {
    openRecipeModal(Number(openBtn.dataset.open));
    return;
  }

  const favBtn = e.target.closest("[data-fav]");
  if (favBtn) {
    toggleFavorite(Number(favBtn.dataset.fav));
  }
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close();
});

renderFeed();

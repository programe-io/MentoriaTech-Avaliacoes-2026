
const recipes = [
    {
        id: 1,
        name: "Macarrão ao molho especial",
        category: "Almoço",
        time: "30 min",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700",
        description: "Um delicioso macarrão com molho cremoso e ervas.",
        ingredients: [
            "250g de macarrão",
            "1 caixa de creme de leite",
            "2 tomates",
            "Alho e cebola",
            "Queijo ralado",
            "Sal e temperos a gosto"
        ],
        preparation: [
            "Cozinhe o macarrão em água com sal.",
            "Refogue o alho, a cebola e os tomates.",
            "Adicione o creme de leite e misture.",
            "Junte o macarrão ao molho.",
            "Finalize com queijo ralado e sirva."
        ]
    },
    {
        id: 2,
        name: "Bolo de chocolate",
        category: "Sobremesa",
        time: "45 min",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700",
        description: "Bolo fofinho com cobertura de chocolate irresistível.",
        ingredients: [
            "2 xícaras de farinha",
            "1 xícara de açúcar",
            "1 xícara de chocolate em pó",
            "3 ovos",
            "1 xícara de leite",
            "1 colher de fermento"
        ],
        preparation: [
            "Misture os ovos e o açúcar.",
            "Adicione o leite, a farinha e o chocolate.",
            "Acrescente o fermento delicadamente.",
            "Coloque em uma forma untada.",
            "Asse por aproximadamente 35 minutos."
        ]
    },
    {
        id: 3,
        name: "Salada tropical",
        category: "Saudável",
        time: "15 min",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700",
        description: "Uma combinação refrescante de vegetais e frutas.",
        ingredients: [
            "Alface",
            "Tomate cereja",
            "Manga picada",
            "Cenoura ralada",
            "Azeite",
            "Limão e sal"
        ],
        preparation: [
            "Lave bem todos os vegetais.",
            "Corte a manga e os tomates.",
            "Misture todos os ingredientes.",
            "Tempere com azeite, limão e sal.",
            "Sirva fresca."
        ]
    },
    {
        id: 4,
        name: "Hambúrguer artesanal",
        category: "Lanches",
        time: "25 min",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700",
        description: "Hambúrguer suculento com queijo e ingredientes frescos.",
        ingredients: [
            "Pão de hambúrguer",
            "150g de carne moída",
            "Queijo cheddar",
            "Alface e tomate",
            "Molho de sua preferência"
        ],
        preparation: [
            "Modele a carne em formato de hambúrguer.",
            "Tempere e grelhe até atingir o ponto desejado.",
            "Adicione o queijo para derreter.",
            "Monte o pão com os vegetais e a carne.",
            "Finalize com o molho."
        ]
    },
    {
        id: 5,
        name: "Panquecas doces",
        category: "Sobremesa",
        time: "20 min",
        image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=700",
        description: "Panquecas macias perfeitas para o café da manhã.",
        ingredients: [
            "1 xícara de farinha",
            "1 ovo",
            "1 xícara de leite",
            "2 colheres de açúcar",
            "1 colher de fermento"
        ],
        preparation: [
            "Misture todos os ingredientes.",
            "Aqueça uma frigideira untada.",
            "Coloque pequenas porções da massa.",
            "Doure os dois lados.",
            "Sirva com frutas ou mel."
        ]
    },
    {
        id: 6,
        name: "Frango grelhado",
        category: "Almoço",
        time: "35 min",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=700",
        description: "Frango temperado acompanhado de vegetais frescos.",
        ingredients: [
            "2 filés de frango",
            "Alho",
            "Limão",
            "Azeite",
            "Sal e pimenta",
            "Legumes para acompanhar"
        ],
        preparation: [
            "Tempere o frango com alho, limão e sal.",
            "Deixe descansar por 15 minutos.",
            "Aqueça uma frigideira com azeite.",
            "Grelhe os filés até estarem completamente cozidos.",
            "Sirva com os legumes."
        ]
    }
];

const grid = document.getElementById("recipeGrid");
const search = document.getElementById("search");
const categories = document.querySelectorAll(".category");

let currentCategory = "Todas";
let favorites = [];

function renderRecipes() {
    const term = search.value.toLowerCase();

    const filtered = recipes.filter(recipe => {
        const matchesCategory =
            currentCategory === "Todas" ||
            recipe.category === currentCategory;

        const matchesSearch =
            recipe.name.toLowerCase().includes(term) ||
            recipe.description.toLowerCase().includes(term);

        return matchesCategory && matchesSearch;
    });

    grid.innerHTML = "";

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-message">
                <h3>Nenhuma receita encontrada 😕</h3>
                <p>Tente pesquisar outro nome ou categoria.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(recipe => {
        const isFavorite = favorites.includes(recipe.id);

        const card = document.createElement("article");
        card.className = "recipe-card";

        card.innerHTML = `
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.name}">
                <button
                    class="favorite ${isFavorite ? "active" : ""}"
                    data-id="${recipe.id}"
                    aria-label="Favoritar ${recipe.name}"
                >
                    ${isFavorite ? "♥" : "♡"}
                </button>
            </div>

            <div class="recipe-info">
                <span class="recipe-category">${recipe.category}</span>
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>

                <div class="recipe-bottom">
                    <span>◷ ${recipe.time}</span>
                    <button data-recipe="${recipe.id}">
                        Ver receita →
                    </button>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    grid.querySelectorAll("[data-id]").forEach(button => {
        button.addEventListener("click", () => {
            toggleFavorite(Number(button.dataset.id));
        });
    });

    grid.querySelectorAll("[data-recipe]").forEach(button => {
        button.addEventListener("click", () => {
            openRecipe(Number(button.dataset.recipe));
        });
    });
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
    } else {
        favorites.push(id);
    }

    renderRecipes();
}

categories.forEach(button => {
    button.addEventListener("click", () => {
        categories.forEach(item => item.classList.remove("active"));

        button.classList.add("active");
        currentCategory = button.dataset.category;

        renderRecipes();
    });
});

search.addEventListener("input", renderRecipes);

const modal = document.getElementById("recipeModal");
const modalDetails = document.getElementById("modalDetails");

function openRecipe(id) {
    const recipe = recipes.find(item => item.id === id);

    if (!recipe) return;

    modalDetails.innerHTML = `
        <h2>${recipe.name}</h2>
        <p>⏱ Tempo de preparo: ${recipe.time}</p>

        <h3>🛒 Ingredientes</h3>
        <ul>
            ${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}
        </ul>

        <h3>👨‍🍳 Modo de preparo</h3>
        <ol>
            ${recipe.preparation.map(step => `<li>${step}</li>`).join("")}
        </ol>
    `;

    modal.classList.add("show");
}

document.getElementById("closeModal").addEventListener("click", () => {
    modal.classList.remove("show");
});

modal.addEventListener("click", event => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        modal.classList.remove("show");
    }
});

renderRecipes();

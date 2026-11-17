
// MODO ESCURO

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }
});


// PESQUISA DE ARTIGOS

const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");
const noResults = document.getElementById("noResults");

function filterCards() {
    const search = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector(".filter.active")
        .dataset.category;

    let visibleCards = 0;

    cards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const description = card.querySelector(".card-content p").textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch =
            title.includes(search) || description.includes(search);

        const matchesCategory =
            activeCategory === "Todos" || category === activeCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
            visibleCards++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.hidden = visibleCards !== 0;
}

searchInput.addEventListener("input", filterCards);


// FILTRO POR CATEGORIA

const filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterCards();
    });
});


// BOTÃO LER MAIS

const readButtons = document.querySelectorAll(".readMore");

readButtons.forEach(button => {
    button.addEventListener("click", () => {
        const extraText = button.nextElementSibling;

        extraText.classList.toggle("show");

        if (extraText.classList.contains("show")) {
            button.textContent = "Ler menos ↑";
        } else {
            button.textContent = "Ler mais →";
        }
    });
});


const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".art-card");
const categories = document.querySelectorAll(".category");
const emptyMessage = document.getElementById("emptyMessage");

let selectedCategory = "Todos";

// Pesquisa de desenhos
function filterGallery() {
    const search = searchInput.value.toLowerCase();
    let visibleCards = 0;

    cards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch = title.includes(search) ||
            category.toLowerCase().includes(search);

        const matchesCategory =
            selectedCategory === "Todos" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "inline-block";
            visibleCards++;
        } else {
            card.style.display = "none";
        }
    });

    emptyMessage.hidden = visibleCards > 0;
}

// Evento de pesquisa
searchInput.addEventListener("input", filterGallery);

// Filtro por categoria
categories.forEach(button => {
    button.addEventListener("click", () => {
        categories.forEach(item =>
            item.classList.remove("selected")
        );

        button.classList.add("selected");

        selectedCategory = button.dataset.category;

        filterGallery();
    });
});

// Sistema de curtidas
document.querySelectorAll(".like").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {
            button.textContent = "♥";
        } else {
            button.textContent = "♡";
        }
    });
});

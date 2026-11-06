
// MENU PARA CELULARES

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

// FECHAR MENU AO CLICAR EM UM LINK

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});

// PESQUISA E FILTROS

const filterButtons = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

let selectedCategory = "todos";

function filterCards() {

    const searchText = searchInput.value
        .toLowerCase()
        .trim();

    let visibleCards = 0;

    cards.forEach(card => {

        const category = card.dataset.category;
        const content = card.innerText.toLowerCase();

        const matchesCategory =
            selectedCategory === "todos" ||
            category === selectedCategory;

        const matchesSearch =
            content.includes(searchText);

        if (matchesCategory && matchesSearch) {
            card.style.display = "block";
            visibleCards++;
        } else {
            card.style.display = "none";
        }

    });

    noResults.hidden = visibleCards !== 0;
}

// ATIVAR CATEGORIAS

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterCards();

    });

});

// CAMPO DE PESQUISA

searchInput.addEventListener("input", filterCards);

// SISTEMA DE FAVORITOS

document.querySelectorAll(".favorite").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        const isLiked = button.classList.contains("liked");

        button.textContent = isLiked ? "♥" : "♡";

        button.setAttribute(
            "aria-pressed",
            String(isLiked)
        );

    });

});

// NEWSLETTER

const newsletterForm =
    document.getElementById("newsletterForm");

const message =
    document.getElementById("message");

newsletterForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const email =
        document.getElementById("email").value;

    if (email.trim() === "") {
        message.textContent = "Digite um e-mail válido!";
        return;
    }

    message.textContent =
        "🎉 Inscrição realizada com sucesso! Bem-vindo ao World Explorer!";

    newsletterForm.reset();

});

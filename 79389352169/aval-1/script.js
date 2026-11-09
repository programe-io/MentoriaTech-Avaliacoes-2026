
const searchInput = document.getElementById("searchInput");
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");
const noResults = document.getElementById("noResults");

let selectedCategory = "todos";

function filterArticles() {
    const search = searchInput.value.toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
        const category = card.dataset.category;
        const text = card.innerText.toLowerCase();

        const matchesCategory =
            selectedCategory === "todos" ||
            category === selectedCategory;

        const matchesSearch = text.includes(search);

        if (matchesCategory && matchesSearch) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.style.display =
        visibleCount === 0 ? "block" : "none";
}

filters.forEach(button => {
    button.addEventListener("click", () => {
        filters.forEach(filter =>
            filter.classList.remove("active")
        );

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        filterArticles();
    });
});

searchInput.addEventListener("input", filterArticles);

// Menu para celular
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});

// Modal dos artigos
const modal = document.getElementById("articleModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".read-more").forEach(button => {
    button.addEventListener("click", () => {
        modalTitle.textContent = button.dataset.title;
        modalText.textContent = button.dataset.text;
        modal.style.display = "flex";
    });
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", event => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Newsletter
const newsletterForm = document.getElementById("newsletterForm");
const message = document.getElementById("message");

newsletterForm.addEventListener("submit", event => {
    event.preventDefault();

    const email = document.getElementById("email").value;

    message.textContent =
        "Inscrição recebida! Obrigado por participar.";

    message.style.color = "#4ade80";

    newsletterForm.reset();
});

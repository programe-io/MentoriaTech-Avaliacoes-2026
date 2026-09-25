// Menu mobile
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// Modal
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".read-btn").forEach(button => {

    button.addEventListener("click", () => {

        modalTitle.textContent = button.dataset.title;
        modalContent.textContent = button.dataset.content;

        modal.classList.add("active");
    });

});

closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        modal.classList.remove("active");
    }

});

// Pesquisa de artigos
const search = document.getElementById("search");
const articles = document.querySelectorAll(".article-card");

search.addEventListener("input", () => {

    const term = search.value.toLowerCase();

    articles.forEach(article => {

        const text = article.textContent.toLowerCase();

        if (text.includes(term)) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }

    });

});

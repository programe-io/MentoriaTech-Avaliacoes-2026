document.addEventListener("DOMContentLoaded", () => {
    // Alternar exibição do Menu Mobile
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navMenu = document.getElementById("navMenu");

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Filtro simples de pesquisa de artigos na página
    const searchInput = document.getElementById("searchInput");
    const postCards = document.querySelectorAll(".post-card");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            postCards.forEach((card) => {
                const title = card.querySelector("h2").textContent.toLowerCase();
                const excerpt = card.querySelector(".post-excerpt").textContent.toLowerCase();

                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const skinCards = document.querySelectorAll(".skin-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove a classe ativa de todos os botões e adiciona no clicado
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            skinCards.forEach(card => {
                // Se "Todas" for selecionado ou o card tiver a classe correspondente
                if (filterValue === "all" || card.classList.contains(filterValue)) {
                    card.classList.remove("hide");
                } else {
                    card.classList.add("hide");
                }
            });
        });
    });
});

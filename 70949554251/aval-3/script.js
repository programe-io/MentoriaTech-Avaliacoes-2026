
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".moto-card");
    const searchInput = document.getElementById("searchInput");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const favoriteButtons = document.querySelectorAll(".favorite-btn");
    const detailButtons = document.querySelectorAll(".details-btn");
    const favoriteCount = document.getElementById("favoriteCount");
    const modelCount = document.getElementById("modelCount");
    const emptyMessage = document.getElementById("emptyMessage");
    const profileBtn = document.getElementById("profileBtn");
    const navLinks = document.querySelectorAll(".nav-link");

    let selectedCategory = "Todas";
    let favorites = 0;

    // ATUALIZAR CONTADORES
    function updateCounters() {
        favorites = document.querySelectorAll(
            ".favorite-btn.is-favorite"
        ).length;

        favoriteCount.textContent = favorites;

        const visibleCards = [...cards].filter(
            card => !card.hidden
        ).length;

        modelCount.textContent = visibleCards;
        emptyMessage.hidden = visibleCards !== 0;
    }

    // PESQUISAR E FILTRAR MOTOS
    function filterMotorcycles() {
        const search = searchInput.value
            .trim()
            .toLowerCase();

        cards.forEach(card => {
            const name = card.dataset.name.toLowerCase();
            const category = card.dataset.category;

            const matchesName = name.includes(search);

            const matchesCategory =
                selectedCategory === "Todas" ||
                category === selectedCategory;

            card.hidden = !(matchesName && matchesCategory);
        });

        updateCounters();
    }

    searchInput.addEventListener("input", filterMotorcycles);

    // FILTROS DE CATEGORIA
    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedCategory = button.dataset.category;

            categoryButtons.forEach(item => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            filterMotorcycles();
        });
    });

    // FAVORITAR E DESFAVORITAR
    favoriteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const isFavorite =
                button.classList.toggle("is-favorite");

            button.setAttribute(
                "aria-pressed",
                String(isFavorite)
            );

            const icon = button.querySelector("i");

            icon.className = isFavorite
                ? "bx bxs-heart"
                : "bx bx-heart";

            updateCounters();
        });
    });

    // DETALHES DA MOTO
    detailButtons.forEach(button => {
        button.addEventListener("click", () => {
            const moto = button.dataset.moto;

            alert(
                "Modelo: " + moto +
                "\n\nEste é um catálogo demonstrativo." +
                "\nConsulte um revendedor para informações " +
                "sobre preço, versão e disponibilidade."
            );
        });
    });

    // PERFIL
    profileBtn.addEventListener("click", () => {
        alert(
            "Bem-vindo ao MotoHub!\n\n" +
            "Explore as motos e adicione seus modelos favoritos."
        );
    });

    // DESTAQUE DO MENU
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

            // Ao abrir Favoritas, mostrar somente as favoritas.
            if (link.getAttribute("href") === "#favoritas") {
                selectedCategory = "Todas";
                searchInput.value = "";

                categoryButtons.forEach(item => {
                    item.classList.toggle(
                        "selected",
                        item.dataset.category === "Todas"
                    );
                });

                cards.forEach(card => {
                    card.hidden = !card.querySelector(
                        ".favorite-btn.is-favorite"
                    );
                });

                updateCounters();
            } else {
                filterMotorcycles();
            }
        });
    });

    // INICIALIZAÇÃO
    updateCounters();

    console.log("MotoHub iniciado com sucesso!");
});

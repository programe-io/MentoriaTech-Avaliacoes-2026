
document.addEventListener("DOMContentLoaded", () => {
    // ELEMENTOS DO SITE
    const filterButtons = document.querySelectorAll(".filter-btn");
    const carCards = document.querySelectorAll(".car-card");
    const carCount = document.getElementById("carCount");

    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");

    const dialog = document.getElementById("detailsDialog");
    const dialogTitle = document.getElementById("dialogTitle");
    const closeDialog = document.getElementById("closeDialog");
    const dialogOk = document.getElementById("dialogOk");

    // 1. FILTRAR OS CARROS
    function filterCars(category) {
        let visibleCars = 0;

        carCards.forEach((card) => {
            const matches =
                category === "todos" ||
                card.dataset.category === category;

            card.hidden = !matches;

            if (matches) {
                visibleCars++;
            }
        });

        carCount.textContent =
            `${visibleCars} ${visibleCars === 1
                ? "modelo disponível"
                : "modelos disponíveis"}`;
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            filterCars(button.dataset.filter);
        });
    });

    // 2. FAVORITAR CARROS
    const favoriteButtons = document.querySelectorAll(".favorite-btn");

    favoriteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const isFavorite =
                button.getAttribute("aria-pressed") === "true";

            button.setAttribute(
                "aria-pressed",
                String(!isFavorite)
            );

            button.classList.toggle("is-favorite", !isFavorite);

            const icon = button.querySelector("i");

            icon.classList.toggle("fa-solid", !isFavorite);
            icon.classList.toggle("fa-regular", isFavorite);

            button.setAttribute(
                "aria-label",
                isFavorite
                    ? "Adicionar aos favoritos"
                    : "Remover dos favoritos"
            );
        });
    });

    // 3. ABRIR DETALHES DO CARRO
    const detailButtons = document.querySelectorAll(".details-btn");

    detailButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const carName = button.dataset.car;

            dialogTitle.textContent = carName;

            if (typeof dialog.showModal === "function") {
                dialog.showModal();
            } else {
                alert(`Modelo selecionado: ${carName}`);
            }
        });
    });

    // FECHAR A JANELA
    function closeDetails() {
        if (dialog.open) {
            dialog.close();
        }
    }

    closeDialog.addEventListener("click", closeDetails);
    dialogOk.addEventListener("click", closeDetails);

    // Fechar clicando fora do conteúdo da janela
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            closeDetails();
        }
    });

    // 4. MENU PARA CELULARES
    menuToggle.addEventListener("click", () => {
        const isOpen = sidebar.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );

        const icon = menuToggle.querySelector("i");

        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
    });

    // Fechar o menu após escolher uma seção
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");

            sidebar.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        });
    });

    // 5. MENSAGEM DE INICIALIZAÇÃO
    console.log("Velocity carregado com sucesso!");

    filterCars("todos");
});

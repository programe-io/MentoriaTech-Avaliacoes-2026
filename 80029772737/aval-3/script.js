
// ==========================================
// ANIME WORLD 3.0
// SISTEMA PRINCIPAL
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    initializeSearch();
    initializeFavorites();
    initializeNotifications();
    initializeScroll();
    initializeAnimations();
    initializeCategories();

    console.log("Anime World iniciado!");
});

// ==========================================
// 1. SISTEMA DE PESQUISA
// ==========================================

function initializeSearch() {
    const searchInput = document.getElementById("animeSearch");

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
        const search = searchInput.value.toLowerCase();

        document.querySelectorAll(".anime-grid .card").forEach(card => {
            const name = card.textContent.toLowerCase();

            card.style.display = name.includes(search)
                ? ""
                : "none";
        });
    });
}

// ==========================================
// 2. SISTEMA DE FAVORITOS
// ==========================================

function initializeFavorites() {
    const cards = document.querySelectorAll(".anime-grid .card");

    let favorites = JSON.parse(
        localStorage.getItem("animeFavorites") || "[]"
    );

    cards.forEach(card => {
        const title = card.querySelector("h3");

        if (!title) return;

        const name = title.textContent.trim();

        const content = card.querySelector(".card-content");

        if (!content || content.querySelector(".favorite-btn")) return;

        const button = document.createElement("button");

        button.className = "favorite-btn";

        button.textContent = favorites.includes(name) ? "♥" : "♡";

        button.addEventListener("click", () => {
            if (favorites.includes(name)) {
                favorites = favorites.filter(item => item !== name);
                button.textContent = "♡";

                showNotification(name + " removido dos favoritos!");
            } else {
                favorites.push(name);
                button.textContent = "♥";

                showNotification(name + " adicionado aos favoritos!");
            }

            localStorage.setItem(
                "animeFavorites",
                JSON.stringify(favorites)
            );
        });

        content.appendChild(button);
    });
}

// ==========================================
// 3. NOTIFICAÇÕES
// ==========================================

function showNotification(message) {
    const old = document.querySelector(".anime-notification");

    if (old) old.remove();

    const notification = document.createElement("div");

    notification.className = "anime-notification";
    notification.textContent = message;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.classList.add("show");
    });

    setTimeout(() => {
        notification.classList.remove("show");

        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Compatibilidade com os botões do HTML
function animeNotification(message) {
    showNotification(message);
}

// ==========================================
// 4. VOLTAR AO TOPO
// ==========================================

function initializeScroll() {
    const button = document.createElement("button");

    button.className = "back-top";
    button.textContent = "↑";
    button.setAttribute("aria-label", "Voltar ao topo");

    document.body.appendChild(button);

    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", () => {
        button.classList.toggle(
            "visible",
            window.scrollY > 300
        );
    });
}

// ==========================================
// 5. ANIMAÇÕES DOS CARDS
// ==========================================

function initializeAnimations() {
    const cards = document.querySelectorAll(".card");

    if (!("IntersectionObserver" in window)) {
        cards.forEach(card => card.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.classList.add("reveal");
        observer.observe(card);
    });
}

// ==========================================
// 6. FILTRO POR CATEGORIAS
// ==========================================

function initializeCategories() {
    const buttons = document.querySelectorAll(
        ".category-grid button"
    );

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.textContent
                .replace(/[^\p{L}\p{N}\s]/gu, "")
                .trim()
                .toLowerCase();

            const cards = document.querySelectorAll(
                ".anime-grid .card"
            );

            cards.forEach(card => {
                const description = card.textContent.toLowerCase();

                card.style.display =
                    description.includes(category) ||
                    category === ""
                        ? ""
                        : "none";
            });

            showNotification("Categoria: " + category);
        });
    });
}

// ==========================================
// 7. ESTILOS ADICIONAIS
// ==========================================

const additionalStyles = document.createElement("style");

additionalStyles.textContent = `

.favorite-btn {
    margin-top: 12px;
    background: #241329;
    color: #ff2e74;
    border: 1px solid #ff2e7444;
    font-size: 20px;
    padding: 7px 14px;
}

.favorite-btn:hover {
    background: #ff2e74;
    color: white;
}

.anime-notification {
    position: fixed;
    bottom: 25px;
    right: 25px;
    background: #17132b;
    border: 1px solid #a855f7;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    opacity: 0;
    transform: translateX(30px);
    transition: .3s;
    z-index: 9999;
    box-shadow: 0 0 20px #a855f744;
}

.anime-notification.show {
    opacity: 1;
    transform: translateX(0);
}

.back-top {
    position: fixed;
    bottom: 25px;
    left: 25px;
    width: 45px;
    height: 45px;
    padding: 0;
    border-radius: 50%;
    display: none;
    z-index: 999;
    font-size: 22px;
}

.back-top.visible {
    display: block;
}

.reveal {
    opacity: 0;
    transform: translateY(25px);
    transition: opacity .6s ease, transform .6s ease;
}

.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}

`;

document.head.appendChild(additionalStyles);

v
// ========================================
// ANIME WORLD - JAVASCRIPT
// ========================================

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
    console.log("Anime World carregado!");

    animateCards();
    setupFavorites();
});

// ========================================
// ANIMAÇÃO DOS CARDS
// ========================================

function animateCards() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";

        setTimeout(() => {
            card.style.transition = "0.6s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 120);
    });
}

// ========================================
// PESQUISA DE ANIMES
// ========================================

function searchAnime() {
    const input = document.getElementById("animeSearch");

    if (!input) return;

    const search = input.value.toLowerCase();

    const cards = document.querySelectorAll(".anime-grid .card");

    cards.forEach(card => {
        const name = card.textContent.toLowerCase();

        card.style.display = name.includes(search)
            ? "block"
            : "none";
    });
}

// ========================================
// NOTIFICAÇÕES
// ========================================

function animeNotification(message) {
    const oldNotification = document.querySelector(".anime-notification");

    if (oldNotification) {
        oldNotification.remove();
    }

    const notification = document.createElement("div");

    notification.className = "anime-notification";
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("show");
    }, 10);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ========================================
// SISTEMA DE FAVORITOS
// ========================================

function setupFavorites() {
    const cards = document.querySelectorAll(".anime-grid .card");

    cards.forEach(card => {
        if (card.querySelector(".favorite-btn")) return;

        const button = document.createElement("button");

        button.className = "favorite-btn";
        button.textContent = "♡";

        button.addEventListener("click", () => {
            button.classList.toggle("active");

            button.textContent = button.classList.contains("active")
                ? "♥"
                : "♡";

            const name = card.querySelector("h3")?.textContent || "Anime";

            animeNotification(
                button.classList.contains("active")
                    ? name + " adicionado aos favoritos!"
                    : name + " removido dos favoritos!"
            );
        });

        card.querySelector(".card-content")?.appendChild(button);
    });
}

// ========================================
// BOTÃO DE VOLTAR AO TOPO
// ========================================

const topButton = document.createElement("button");

topButton.textContent = "↑";
topButton.className = "back-top";

document.body.appendChild(topButton);

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", () => {
    topButton.style.display =
        window.scrollY > 300 ? "block" : "none";
});

// ========================================
// EFEITO DE CLIQUE
// ========================================

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        button.style.transform = "scale(0.95)";

        setTimeout(() => {
            button.style.transform = "";
        }, 150);
    });
});

// ========================================
// ANIMAÇÃO DE TÍTULOS
// ========================================

document.querySelectorAll("h1, h2").forEach(title => {
    title.addEventListener("mouseenter", () => {
        title.style.textShadow = "0 0 20px #a855f7";
    });

    title.addEventListener("mouseleave", () => {
        title.style.textShadow = "";
    });
});

// ========================================
// ESTILOS ADICIONAIS
// ========================================

const style = document.createElement("style");

style.textContent = `
.anime-notification {
    position: fixed;
    bottom: 25px;
    right: 25px;
    background: #17132b;
    border: 1px solid #a855f7;
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    opacity: 0;
    transform: translateX(30px);
    transition: .3s;
    z-index: 9999;
}

.anime-notification.show {
    opacity: 1;
    transform: translateX(0);
}

.favorite-btn {
    margin-top: 12px;
    background: transparent;
    color: #ff2e74;
    font-size: 25px;
    padding: 5px 12px;
}

.favorite-btn.active {
    color: #ff2e74;
}

.back-top {
    position: fixed;
    bottom: 25px;
    left: 25px;
    display: none;
    z-index: 1000;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    padding: 0;
    font-size: 22px;
}
`;

document.head.appendChild(style);

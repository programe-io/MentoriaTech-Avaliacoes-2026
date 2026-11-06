document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const feedCards = document.querySelectorAll(".feed-card");
    const likeButtons = document.querySelectorAll(".like-btn");

    // 1. Lógica do Sistema de Filtros Moderno
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove classe ativa de todos e adiciona no clicado
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            // Exibe ou oculta os cards com base na categoria
            feedCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.style.display = "block";
                    // Pequeno efeito de animação de entrada
                    card.style.animation = "fadeIn 0.4s ease forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 2. Sistema Dinâmico de Curtidas (Likes)
    likeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const likeCountSpan = button.querySelector(".like-count");
            let currentLikes = parseInt(likeCountSpan.textContent);

            if (button.classList.contains("liked")) {
                button.classList.remove("liked");
                likeCountSpan.textContent = currentLikes - 1;
            } else {
                button.classList.add("liked");
                likeCountSpan.textContent = currentLikes + 1;
                
                // Pequeno efeito de clique físico
                button.style.transform = "scale(1.15)";
                setTimeout(() => button.style.transform = "scale(1)", 100);
            }
        });
    });
});

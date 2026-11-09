document.addEventListener("DOMContentLoaded", () => {
    
    // Seleciona todos os artigos de postagem do feed
    const posts = document.querySelectorAll("article");

    posts.forEach(post => {
        // Seleção dos elementos internos de cada post individual
        const likeBtn = post.querySelector(".flex.items-center.gap-4 button:first-child i");
        const bookmarkBtn = post.querySelector("button.text-2xl:last-child i");
        const postImageContainer = post.querySelector(".relative.bg-gray-100");

        if (likeBtn) {
            // 1. Interação do Botão Curtir (Clique Único)
            likeBtn.parentElement.addEventListener("click", () => {
                toggleLike(likeBtn);
            });
        }

        if (bookmarkBtn) {
            // 2. Interação do Botão Salvar/Bookmark
            bookmarkBtn.parentElement.addEventListener("click", () => {
                bookmarkBtn.classList.toggle("bx-bookmark");
                bookmarkBtn.classList.toggle("bxs-bookmark"); // Ícone preenchido do Boxicons
                bookmarkBtn.parentElement.classList.toggle("text-black");
            });
        }

        if (postImageContainer && likeBtn) {
            // 3. Efeito de Clique Duplo na Imagem (Double Tap to Like)
            postImageContainer.addEventListener("dblclick", () => {
                // Força o curtir caso ainda não esteja curtido
                if (likeBtn.classList.contains("bx-heart")) {
                    toggleLike(likeBtn);
                }

                // Cria a animação do coração flutuante no meio da tela
                createHeartAnimation(postImageContainer);
            });
        }
    });

    // Função auxiliar para alternar o estado do Curtir
    function toggleLike(icon) {
        icon.classList.toggle("bx-heart");
        icon.classList.toggle("bxs-heart"); // Ícone de coração preenchido
        
        if (icon.classList.contains("bxs-heart")) {
            icon.style.color = "#ed4956"; // Vermelho característico do Instagram
            icon.classList.add("scale-125"); // Pequeno efeito de pulso
            setTimeout(() => icon.classList.remove("scale-125"), 150);
        } else {
            icon.style.color = ""; // Volta para a cor padrão do CSS
        }
    }

    // Função para gerar o coração flutuante no double click
    function createHeartAnimation(container) {
        const heart = document.createElement("i");
        // Classes do Boxicons e do Tailwind para estilizar e animar o elemento no centro
        heart.className = "bx bxs-heart absolute text-white text-7xl opacity-0 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 ease-out";
        heart.style.left = "50%";
        heart.style.top = "50%";
        heart.style.textShadow = "0 0 15px rgba(0, 0, 0, 0.3)";

        container.appendChild(heart);

        // Dispara a animação (Surgir -> Crescer -> Desaparecer)
        setTimeout(() => {
            heart.style.opacity = "0.9";
            heart.style.transform = "translate(-50%, -50%) scale(1.2)";
        }, 10);

        setTimeout(() => {
            heart.style.opacity = "0";
            heart.style.transform = "translate(-50%, -50%) scale(0.5)";
        }, 500);

        // Remove o elemento do HTML após o fim da animação para manter o código limpo
        setTimeout(() => {
            heart.remove();
        }, 800);
    }
});

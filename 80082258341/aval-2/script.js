document.addEventListener("DOMContentLoaded", () => {
    
    // Sistema Interativo de Likes para o Feed
    const likeButtons = document.querySelectorAll(".like-btn");

    likeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const likeCountSpan = button.querySelector(".like-count");
            let currentLikes = parseInt(likeCountSpan.textContent);

            // Alterna o estado do botão (curtido / não curtido)
            if (button.classList.contains("liked")) {
                button.classList.remove("liked");
                button.innerHTML = `🖤 <span class="like-count">${currentLikes - 1}</span>`;
            } else {
                button.classList.add("liked");
                // Atualiza o emoji para um coração ativo e incrementa o contador
                button.innerHTML = `💚 <span class="like-count">${currentLikes + 1}</span>`;
            }
        });
    });

    // Animação sutil ao rolar o feed (revela posts conforme entram na tela)
    const posts = document.querySelectorAll(".feed-post");
    
    const observeFeed = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    posts.forEach(post => {
        // Estado inicial para animação
        post.style.opacity = "0";
        post.style.transform = "translateY(15px)";
        post.style.transition = "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        observeFeed.observe(post);
    });
});

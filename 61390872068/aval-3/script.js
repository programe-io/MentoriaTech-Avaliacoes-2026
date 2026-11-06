document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mecanismo de Curtir do Instagram (Double click na imagem ou clique no coração)
    const likeButtons = document.querySelectorAll(".btn-like");
    const cardsMedia = document.querySelectorAll(".card-media");

    // Função interna para computar a curtida
    const toggleLike = (button) => {
        const isLiked = button.classList.contains("liked");
        const card = button.closest(".insta-card");
        const counterDisplay = card.querySelector(".like-counter");
        let initialCount = parseInt(button.getAttribute("data-count"), 10);

        if (!isLiked) {
            button.classList.add("liked");
            button.innerText = "❤️";
            initialCount += 1;
            counterDisplay.innerText = initialCount.toLocaleString("pt-BR") + " pessoas";
        } else {
            button.classList.remove("liked");
            initialCount -= 1;
            counterDisplay.innerText = initialCount.toLocaleString("pt-BR") + " pessoas";
        }
        button.setAttribute("data-count", initialCount);
    };

    // Evento de clique no ícone do coração
    likeButtons.forEach(btn => {
        btn.addEventListener("click", () => toggleLike(btn));
    });

    // Evento de Double Click sobre o corpo da foto do post
    cardsMedia.forEach(media => {
        media.addEventListener("dblclick", () => {
            const card = media.closest(".insta-card");
            const likeBtn = card.querySelector(".btn-like");
            
            // Só executa o duplo clique se ainda não estiver curtido
            if (!likeBtn.classList.contains("liked")) {
                toggleLike(likeBtn);
            }
        });
    });

    // 2. Ação Real de Publicar Comentários Inline no Card
    const postCommentButtons = document.querySelectorAll(".post-comment-btn");

    postCommentButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".insta-card");
            const input = card.querySelector(".comment-input");
            const commentText = input.value.trim();

            if (commentText !== "") {
                alert(`⚽ Comentário postado com sucesso!\n"dev_ousado: ${commentText}"`);
                input.value = ""; // Limpa a caixa de texto
            }
        });
    });
});

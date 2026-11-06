document.addEventListener("DOMContentLoaded", () => {
    
    // Captura todos os botões de curtida do Feed
    const likeButtons = document.querySelectorAll(".like-btn");

    likeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Verifica se o post já foi curtido
            const isLiked = btn.classList.contains("liked");
            const countSpan = btn.querySelector(".like-count");
            // Captura o número base armazenado no atributo customizado
            let currentLikes = parseInt(btn.getAttribute("data-likes"), 10);

            if (!isLiked) {
                // Adiciona curtida
                btn.classList.add("liked");
                currentLikes += 1;
                countSpan.innerText = currentLikes.toLocaleString("pt-BR");
            } else {
                // Remove curtida
                btn.classList.remove("liked");
                currentLikes -= 1;
                countSpan.innerText = currentLikes.toLocaleString("pt-BR");
            }
            
            // Atualiza o estado do dado
            btn.setAttribute("data-likes", currentLikes);
        });
    });

    // Simulação sutil de clique nos botões de comentário
    const commentButtons = document.querySelectorAll(".comment-trigger");
    commentButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            alert("⚽ Área de Comentários Privada: Disponível apenas para assinantes do Lab!");
        });
    });
});

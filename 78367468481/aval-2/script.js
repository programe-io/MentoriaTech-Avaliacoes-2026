document.addEventListener("DOMContentLoaded", () => {
    const publishBtn = document.getElementById("publishBtn");
    const postText = document.getElementById("postText");
    const postsContainer = document.getElementById("posts");
    const searchInput = document.getElementById("searchInput");
    const profilePostsCount = document.getElementById("profilePostsCount");

    // 1. Publicar nova postagem como Miguel Arrais
    publishBtn.addEventListener("click", () => {
        const text = postText.value.trim();
        if (!text) return;

        const article = document.createElement("article");
        article.className = "post";
        article.innerHTML = `
            <div class="post-header">
                <img src="https://i.pravatar.cc/150?img=11" alt="Miguel Arrais">
                <div class="user-info">
                    <strong>Miguel Arrais</strong>
                    <span>Agora mesmo</span>
                </div>
                <button class="more">•••</button>
            </div>
            <p class="post-text">${escapeHTML(text)}</p>
            <div class="post-stats">
                <span class="like-count" data-likes="0">❤️ 0 curtidas</span>
                <span class="comment-count">0 comentários</span>
            </div>
            <div class="post-actions">
                <button class="like-btn">♡ Curtir</button>
                <button class="comment-focus">💬 Comentar</button>
                <button class="share-btn">↗ Compartilhar</button>
            </div>
            <div class="comment-area">
                <input type="text" placeholder="Escreva um comentário...">
                <button class="comment-btn">Enviar</button>
            </div>
            <div class="comments-list"></div>
        `;

        postsContainer.prepend(article);
        postText.value = "";
        profilePostsCount.textContent = parseInt(profilePostsCount.textContent) + 1;
    });

    // 2. Delegação de eventos para Curtir, Comentar, Compartilhar e Seguir
    document.addEventListener("click", (e) => {
        // Curtir post
        if (e.target.classList.contains("like-btn")) {
            const btn = e.target;
            const post = btn.closest(".post");
            const likeCountEl = post.querySelector(".like-count");
            let likes = parseInt(likeCountEl.dataset.likes);

            if (btn.classList.contains("liked")) {
                likes--;
                btn.classList.remove("liked");
                btn.textContent = "♡ Curtir";
            } else {
                likes++;
                btn.classList.add("liked");
                btn.textContent = "❤️ Curtido";
            }

            likeCountEl.dataset.likes = likes;
            likeCountEl.textContent = `❤️ ${likes} ${likes === 1 ? "curtida" : "curtidas"}`;
        }

        // Focar no campo de comentário
        if (e.target.classList.contains("comment-focus")) {
            const post = e.target.closest(".post");
            post.querySelector(".comment-area input").focus();
        }

        // Enviar comentário como Miguel Arrais
        if (e.target.classList.contains("comment-btn")) {
            const post = e.target.closest(".post");
            const input = post.querySelector(".comment-area input");
            const commentText = input.value.trim();
            if (!commentText) return;

            const list = post.querySelector(".comments-list");
            const item = document.createElement("div");
            item.className = "comment-item";
            item.innerHTML = `<strong>Miguel Arrais: </strong><span>${escapeHTML(commentText)}</span>`;
            list.appendChild(item);

            const totalComments = list.children.length;
            post.querySelector(".comment-count").textContent =
                `${totalComments} ${totalComments === 1 ? "comentário" : "comentários"}`;

            input.value = "";
        }

        // Compartilhar post
        if (e.target.classList.contains("share-btn")) {
            const originalText = e.target.textContent;
            e.target.textContent = "✓ Link copiado!";
            setTimeout(() => {
                e.target.textContent = originalText;
            }, 1800);
        }

        // Botões de seguir na barra direita
        if (e.target.classList.contains("follow-btn")) {
            const btn = e.target;
            btn.classList.toggle("following");
            btn.textContent = btn.classList.contains("following") ? "✓" : "+";
        }
    });

    // 3. Pesquisa em tempo real
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll(".post").forEach((post) => {
            const content = post.textContent.toLowerCase();
            post.style.display = content.includes(query) ? "block" : "none";
        });
    });

    function escapeHTML(str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }
});
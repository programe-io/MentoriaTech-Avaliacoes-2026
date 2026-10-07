const publishBtn = document.getElementById("publishBtn");
const postText = document.getElementById("postText");
const feed = document.getElementById("feed");

// Publicar novo post
publishBtn.addEventListener("click", () => {

    const text = postText.value.trim();

    if (text === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");

    post.classList.add("post");

    post.innerHTML = `
        <div class="post-header">
            <div class="avatar">EU</div>

            <div>
                <strong>Você</strong>
                <small>@usuario · agora</small>
            </div>
        </div>

        <p>${text}</p>

        <div class="post-actions">

            <button class="like-btn">
                ❤️ <span>0</span>
            </button>

            <button>
                💬 <span>0</span>
            </button>

            <button>
                ↗️ Compartilhar
            </button>

        </div>

        <div class="comments"></div>

        <div class="comment-form">

            <input
                type="text"
                placeholder="Escreva um comentário..."
            >

            <button class="send-comment">
                Enviar
            </button>

        </div>
    `;

    feed.prepend(post);

    postText.value = "";

    configurarPost(post);
});


// Configura curtidas e comentários
function configurarPost(post) {

    const likeBtn = post.querySelector(".like-btn");

    if (likeBtn) {

        likeBtn.addEventListener("click", () => {

            const contador = likeBtn.querySelector("span");

            let likes = Number(contador.textContent);

            if (likeBtn.classList.contains("liked")) {
                likes--;
                likeBtn.classList.remove("liked");
            } else {
                likes++;
                likeBtn.classList.add("liked");
            }

            contador.textContent = likes;
        });
    }


    const sendComment = post.querySelector(".send-comment");

    if (sendComment) {

        sendComment.addEventListener("click", () => {

            const input = post.querySelector(".comment-form input");
            const comments = post.querySelector(".comments");

            const text = input.value.trim();

            if (text === "") {
                return;
            }

            const comment = document.createElement("div");

            comment.classList.add("comment");

            comment.innerHTML = `
                <strong>Você</strong>
                <span>${text}</span>
            `;

            comments.appendChild(comment);

            input.value = "";

            atualizarComentarios(post);
        });
    }
}


// Atualiza contador de comentários
function atualizarComentarios(post) {

    const comments = post.querySelectorAll(".comment");
    const commentButton = post.querySelector(".post-actions button:nth-child(2)");

    if (commentButton) {
        const contador = commentButton.querySelector("span");

        if (contador) {
            contador.textContent = comments.length;
        }
    }
}


// Ativa as funções nos posts que já existem
document.querySelectorAll(".post").forEach(post => {
    configurarPost(post);
});

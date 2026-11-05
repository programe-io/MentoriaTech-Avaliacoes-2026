
const postText = document.getElementById("postText");
const publishButton = document.getElementById("publishButton");
const postsContainer = document.getElementById("posts");

// PUBLICAR UMA NOVA MENSAGEM

publishButton.addEventListener("click", () => {
    const text = postText.value.trim();

    if (text === "") {
        alert("Digite uma mensagem antes de publicar!");
        return;
    }

    const post = document.createElement("article");

    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <div class="avatar">J</div>

            <div class="user-info">
                <h3>Você</h3>
                <span>Agora</span>
            </div>

            <button class="more">•••</button>
        </div>

        <div class="post-content">
            <p></p>
        </div>

        <div class="post-footer">
            <button class="like-button">
                🤍 Curtir <span class="like-count">0</span>
            </button>

            <button class="comment-button">
                💬 Comentários
            </button>
        </div>

        <div class="comments">
            <input
                type="text"
                class="comment-input"
                placeholder="Escreva um comentário..."
            >

            <button class="send-comment">Enviar</button>

            <div class="comment-list"></div>
        </div>
    `;

    // Adicionar o texto da publicação
    post.querySelector(".post-content p").textContent = text;

    // Colocar a publicação no início do feed
    postsContainer.prepend(post);

    // Limpar o campo de texto
    postText.value = "";
});

// CURTIR PUBLICAÇÕES

postsContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".like-button");

    if (!button) return;

    const countElement = button.querySelector(".like-count");

    let count = Number(countElement.textContent);

    const liked = button.classList.toggle("liked");

    if (liked) {
        count++;
        button.firstChild.textContent = "❤️ Curtido ";
    } else {
        count--;
        button.firstChild.textContent = "🤍 Curtir ";
    }

    countElement.textContent = count;
});

// ADICIONAR COMENTÁRIOS

postsContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".send-comment");

    if (!button) return;

    const post = button.closest(".post");

    const input = post.querySelector(".comment-input");
    const commentList = post.querySelector(".comment-list");

    const text = input.value.trim();

    if (text === "") {
        alert("Digite um comentário!");
        return;
    }

    const comment = document.createElement("div");

    comment.className = "comment-item";

    comment.textContent = "Você: " + text;

    commentList.appendChild(comment);

    input.value = "";
});

// MOSTRAR E OCULTAR COMENTÁRIOS

postsContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".comment-button");

    if (!button) return;

    const post = button.closest(".post");

    const comments = post.querySelector(".comments");

    if (comments.style.display === "none") {
        comments.style.display = "flex";
    } else {
        comments.style.display = "none";
    }
});

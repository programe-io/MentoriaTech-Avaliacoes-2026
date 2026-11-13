
const postForm = document.querySelector("#postForm");
const postText = document.querySelector("#postText");
const posts = document.querySelector("#posts");
const charCount = document.querySelector("#charCount");

// CONTADOR DE CARACTERES
postText.addEventListener("input", () => {
    charCount.textContent =
        `${postText.value.length}/280`;

    postText.style.height = "auto";
    postText.style.height =
        `${postText.scrollHeight}px`;
});

// CONFIGURAR FUNCIONALIDADES DE CADA PUBLICAÇÃO
function configurarPost(post) {

    // CURTIR PUBLICAÇÃO
    const likeButton = post.querySelector(".like-btn");
    const likeCount = likeButton.querySelector("b");

    let liked = false;

    likeButton.addEventListener("click", () => {
        liked = !liked;

        const total = Number(likeCount.textContent)
            + (liked ? 1 : -1);

        likeCount.textContent = total;

        likeButton.classList.toggle("liked", liked);

        likeButton.setAttribute(
            "aria-pressed",
            String(liked)
        );

        likeButton.querySelector("span").textContent =
            liked ? "Curtido" : "Curtir";

        likeButton.firstChild.textContent =
            liked ? "♥ " : "♡ ";
    });

    // ABRIR COMENTÁRIOS
    const comments = post.querySelector(".comments");

    post.querySelector(".comment-toggle")
        .addEventListener("click", () => {

            comments.classList.toggle("open");

            if (comments.classList.contains("open")) {
                comments.querySelector("input").focus();
            }
        });

    // ENVIAR COMENTÁRIO
    post.querySelector(".comment-form")
        .addEventListener("submit", (event) => {

            event.preventDefault();

            const input = event.currentTarget
                .querySelector("input");

            const message = input.value.trim();

            if (!message) return;

            const comment = document.createElement("div");
            comment.className = "comment";

            const author = document.createElement("strong");
            author.textContent = "Você";

            const text = document.createTextNode(message);

            comment.append(author, text);

            comments.querySelector(".comment-list")
                .append(comment);

            input.value = "";
        });
}

// ATIVAR FUNCIONALIDADES DAS PUBLICAÇÕES INICIAIS
document.querySelectorAll(".post")
    .forEach(configurarPost);


// PUBLICAR NOVA POSTAGEM
postForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const message = postText.value.trim();

    if (!message) return;

    const article = document.createElement("article");

    article.className = "post card";

    article.innerHTML = `
        <div class="post-header">

            <div class="avatar avatar-purple">J</div>

            <div class="author">
                <strong>Jonathan</strong>
                <time>Agora</time>
            </div>

            <button class="more-btn">•••</button>

        </div>

        <p class="post-text"></p>

        <div class="post-actions">

            <button class="action-btn like-btn"
                type="button"
                aria-pressed="false">

                ♡ <span>Curtir</span> <b>0</b>

            </button>

            <button class="action-btn comment-toggle"
                type="button">

                ▢ <span>Comentar</span>

            </button>

        </div>

        <div class="comments">

            <div class="comment-list"></div>

            <form class="comment-form">

                <input
                    type="text"
                    maxlength="160"
                    placeholder="Escreva um comentário..."
                    required>

                <button type="submit">Enviar</button>

            </form>

        </div>
    `;

    article.querySelector(".post-text").textContent = message;

    // COLOCAR PUBLICAÇÃO NO TOPO DO FEED
    posts.prepend(article);

    // ATIVAR CURTIDAS E COMENTÁRIOS
    configurarPost(article);

    // LIMPAR CAMPO
    postForm.reset();

    charCount.textContent = "0/280";

    postText.style.height = "auto";
});

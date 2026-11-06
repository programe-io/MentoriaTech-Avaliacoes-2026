
const addButton = document.querySelector(
    ".menu span:nth-child(3)"
);

addButton.addEventListener("click", () => {
    const imageUrl = prompt(
        "Cole o link da foto do seu animal:"
    );

    if (!imageUrl) return;

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100">
            <strong>seu_pet 🐾</strong>
        </div>

        <img class="post-image" src="${imageUrl}">

        <div class="post-actions">
            <button class="like">♡</button>
            <button>💬</button>
            <button>➤</button>
        </div>

        <p class="likes">0 curtidas</p>
        <p><strong>seu_pet</strong> Olha que fofura! ❤️</p>
        <div class="comments"></div>

        <form class="comment-form">
            <input type="text"
            placeholder="Adicione um comentário...">
            <button type="submit">Publicar</button>
        </form>
    `;

    document.querySelector("#feed").prepend(post);

    let likes = 0;
    let liked = false;

    const likeButton = post.querySelector(".like");
    const likesText = post.querySelector(".likes");

    likeButton.addEventListener("click", () => {
        liked = !liked;
        likes += liked ? 1 : -1;

        likeButton.textContent = liked ? "♥" : "♡";
        likeButton.classList.toggle("active", liked);
        likesText.textContent = likes + " curtidas";
    });

    const form = post.querySelector(".comment-form");

    form.addEventListener("submit", event => {
        event.preventDefault();

        const input = form.querySelector("input");
        const message = input.value.trim();

        if (!message) return;

        const comment = document.createElement("p");
        comment.textContent = "Você: " + message;

        post.querySelector(".comments").appendChild(comment);

        input.value = "";
    });
});

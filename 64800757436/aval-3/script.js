const posts = [
    {
        id: 1,
        user: "mariana",
        avatar: "https://i.pravatar.cc/100?img=5",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900",
        likes: 1250,
        caption: "Vivendo a vida e aproveitando cada momento! ❤️",
        liked: false,
        comments: []
    },
    {
        id: 2,
        user: "pedro",
        avatar: "https://i.pravatar.cc/100?img=12",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
        likes: 845,
        caption: "Que lugar incrível! 🌎",
        liked: false,
        comments: []
    },
    {
        id: 3,
        user: "julia",
        avatar: "https://i.pravatar.cc/100?img=9",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900",
        likes: 2300,
        caption: "Espalhando coisas boas! 🌸",
        liked: false,
        comments: []
    }
];

const feed = document.querySelector("#feed");

function renderPosts() {
    feed.innerHTML = "";

    posts.forEach(post => {
        const article = document.createElement("article");
        article.className = "post";

        article.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}">
                <strong>${post.user}</strong>
                <span style="margin-left:auto">•••</span>
            </div>

            <img class="post-image" src="${post.image}">

            <div class="post-actions">
                <button class="like-btn ${post.liked ? "liked" : ""}"
                    data-action="like" data-id="${post.id}">
                    ${post.liked ? "♥" : "♡"}
                </button>

                <button data-action="focus" data-id="${post.id}">♡</button>
                <button data-action="share" data-id="${post.id}">➤</button>
                <button style="margin-left:auto">♧</button>
            </div>

            <div class="post-info">
                <strong>${post.likes.toLocaleString("pt-BR")} curtidas</strong>
                <p><strong>${post.user}</strong> ${post.caption}</p>
                <p class="comments">
                    ${post.comments.length} comentários
                </p>

                <div class="comment-list">
                    ${post.comments.map(comment =>
                        `<p><strong>${escapeHTML(comment.user)}</strong> ${escapeHTML(comment.text)}</p>`
                    ).join("")}
                </div>
            </div>

            <div class="comment-area">
                <input type="text" placeholder="Adicione um comentário..."
                    id="comment-${post.id}">
                <button data-action="comment" data-id="${post.id}">
                    Publicar
                </button>
            </div>
        `;

        feed.appendChild(article);
    });
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// INTERAÇÕES

feed.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const id = Number(button.dataset.id);
    const post = posts.find(item => item.id === id);

    if (!post) return;

    switch (button.dataset.action) {

        case "like":
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            renderPosts();
            break;

        case "comment":
            addComment(id);
            break;

        case "focus":
            document.querySelector(`#comment-${id}`).focus();
            break;

        case "share":
            if (navigator.share) {
                navigator.share({
                    title: "Publicação",
                    text: post.caption,
                    url: location.href
                }).catch(() => {});
            } else {
                navigator.clipboard?.writeText(location.href);
            }
            break;
    }
});

function addComment(id) {
    const input = document.querySelector(`#comment-${id}`);
    const text = input.value.trim();

    if (!text) return;

    const post = posts.find(item => item.id === id);

    post.comments.push({
        user: "meu_usuario",
        text: text
    });

    renderPosts();
}

// STORIES

document.querySelectorAll(".story").forEach(story => {
    story.addEventListener("click", () => {
        alert("Você abriu um Story!");
    });
});

// MENU

document.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".menu-item")
            .forEach(menu => menu.classList.remove("active"));

        item.classList.add("active");
    });
});

// INICIAR

renderPosts();
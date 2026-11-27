
/* CURTIR PUBLICAÇÃO */

function likePost(button) {
    const post = button.closest(".post");
    const count = post.querySelector(".like-count");

    if (button.classList.contains("liked")) {
        button.classList.remove("liked");
        count.textContent = Number(count.textContent) - 1;
        button.textContent = "👍 Curtir";
    } else {
        button.classList.add("liked");
        count.textContent = Number(count.textContent) + 1;
        button.textContent = "👍 Curtido";
    }
}

/* CRIAR PUBLICAÇÃO */

function createPost() {
    const input = document.getElementById("postText");
    const text = input.value.trim();

    if (!text) {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "P";

    const info = document.createElement("div");

    const name = document.createElement("strong");
    name.textContent = "Pedro";

    const date = document.createElement("small");
    date.textContent = "Agora mesmo · 🌎";

    info.append(name, date);
    header.append(avatar, info);

    const content = document.createElement("div");
    content.className = "post-content";
    content.textContent = text;

    const stats = document.createElement("div");
    stats.className = "post-stats";
    stats.innerHTML = `
        <span>👍 <span class="like-count">0</span> curtidas</span>
        <span>0 comentários</span>
    `;

    const actions = document.createElement("div");
    actions.className = "actions";

    actions.innerHTML = `
        <button onclick="likePost(this)">👍 Curtir</button>
        <button onclick="toggleComments(this)">💬 Comentar</button>
        <button onclick="sharePost()">↗ Compartilhar</button>
    `;

    const comments = document.createElement("div");
    comments.className = "comments";

    comments.innerHTML = `
        <div class="comment-list"></div>
        <input
            type="text"
            placeholder="Escreva um comentário..."
            onkeydown="if(event.key==='Enter') addComment(this)"
        >
    `;

    post.append(header, content, stats, actions, comments);

    document.getElementById("feed").prepend(post);

    input.value = "";
}

/* ABRIR COMENTÁRIOS */

function toggleComments(button) {
    const post = button.closest(".post");
    const comments = post.querySelector(".comments");

    comments.style.display =
        comments.style.display === "block" ? "none" : "block";
}

/* ADICIONAR COMENTÁRIO */

function addComment(input) {
    const text = input.value.trim();

    if (!text) return;

    const post = input.closest(".post");
    const list = post.querySelector(".comment-list");

    const comment = document.createElement("div");
    comment.className = "comment";
    comment.textContent = "Pedro: " + text;

    list.appendChild(comment);

    input.value = "";

    const stats = post.querySelector(".post-stats span:last-child");
    stats.textContent = list.children.length + " comentários";
}

/* COMPARTILHAR PUBLICAÇÃO */

function sharePost() {
    const url = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: "FaceConnect",
            text: "Confira esta publicação!",
            url: url
        }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url)
            .then(() => alert("Link copiado!"))
            .catch(() => alert("Não foi possível copiar o link."));
    } else {
        alert("Compartilhamento não disponível.");
    }
}

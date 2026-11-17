
function createPost() {
    const input = document.getElementById("postText");
    const text = input.value.trim();

    if (!text) {
        alert("Digite algo para publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "JD";

    const info = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = "João da Silva";

    const time = document.createElement("small");
    time.textContent = "Agora · 🌎";

    info.append(name, time);
    header.append(avatar, info);

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    const stats = document.createElement("div");
    stats.className = "post-stats";
    stats.innerHTML = '<span>👍 <b class="likes">0</b> curtidas</span><span>0 comentários</span>';

    const buttons = document.createElement("div");
    buttons.className = "post-buttons";

    buttons.innerHTML = `
        <button onclick="likePost(this)">👍 Curtir</button>
        <button onclick="commentPost(this)">💬 Comentar</button>
        <button onclick="sharePost()">↗ Compartilhar</button>
    `;

    const comments = document.createElement("div");
    comments.className = "comments";

    post.append(header, paragraph, stats, buttons, comments);

    document.getElementById("posts").prepend(post);

    input.value = "";
}

function likePost(button) {
    const post = button.closest(".post");
    const likes = post.querySelector(".likes");

    let count = Number(likes.textContent);

    if (button.dataset.liked === "true") {
        count--;
        button.dataset.liked = "false";
        button.style.color = "#65676b";
    } else {
        count++;
        button.dataset.liked = "true";
        button.style.color = "#1877f2";
    }

    likes.textContent = count;
}

function commentPost(button) {
    const post = button.closest(".post");
    const comments = post.querySelector(".comments");

    const text = prompt("Digite seu comentário:");

    if (!text || !text.trim()) return;

    const comment = document.createElement("div");
    comment.className = "comment";

    const author = document.createElement("strong");
    author.textContent = "João da Silva: ";

    comment.append(author, document.createTextNode(text.trim()));

    comments.appendChild(comment);
}

function sharePost() {
    if (navigator.share) {
        navigator.share({
            title: "SocialConnect",
            text: "Confira esta publicação!"
        }).catch(() => {});
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}

// Pesquisa de publicações
document.getElementById("search").addEventListener("input", function() {
    const search = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        post.style.display = post.textContent.toLowerCase().includes(search)
            ? "block"
            : "none";
    });
});

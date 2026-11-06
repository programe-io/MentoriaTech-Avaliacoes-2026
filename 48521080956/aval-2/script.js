const postText = document.getElementById("postText");
const photoInput = document.getElementById("photoInput");
const posts = document.getElementById("posts");
const photoPreview = document.getElementById("photoPreview");

let selectedPhoto = "";

// ÍCONES SVG
function icon(name) {
    const icons = {
        heart: '<svg><use href="#i-heart"></use></svg>',
        comment: '<svg><use href="#i-comment"></use></svg>',
        share: '<svg><use href="#i-share"></use></svg>'
    };

    return icons[name] || "";
}

// SELECIONAR FOTO
photoInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Selecione um arquivo de imagem.");
        return;
    }

    if (selectedPhoto) {
        URL.revokeObjectURL(selectedPhoto);
    }

    selectedPhoto = URL.createObjectURL(file);

    photoPreview.innerHTML = `
        <img src="${selectedPhoto}" alt="Prévia da publicação">
    `;
});

// CRIAR PUBLICAÇÃO
function createPost() {

    const text = postText.value.trim();

    if (!text && !selectedPhoto) {
        alert("Escreva algo ou escolha uma foto!");
        return;
    }

    const article = document.createElement("article");
    article.className = "post";

    const imageHTML = selectedPhoto
        ? `<img src="${selectedPhoto}" class="post-image" alt="Foto publicada">`
        : "";

    article.innerHTML = `
        <div class="post-header">

            <img
                src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Jonathan"
                class="avatar"
                alt="Jonathan"
            >

            <div>
                <strong>Jonathan</strong>
                <p>Agora mesmo · Overworld</p>
            </div>

            <span class="online-dot"></span>

        </div>

        <p class="post-text">${escapeHTML(text)}</p>

        ${imageHTML}

        <div class="post-stats">
            <span class="likes-count" data-likes="0">0 curtidas</span>
            <span>0 comentários</span>
        </div>

        <div class="post-buttons">

            <button class="like-button" onclick="likePost(this)">
                ${icon("heart")}
                Curtir
            </button>

            <button onclick="commentPost(this)">
                ${icon("comment")}
                Comentar
            </button>

            <button onclick="sharePost(this)">
                ${icon("share")}
                Compartilhar
            </button>

        </div>

        <div class="comment-area"></div>
    `;

    posts.prepend(article);

    postText.value = "";
    photoInput.value = "";
    photoPreview.innerHTML = "";

    if (selectedPhoto) {
        // A imagem continua disponível enquanto estiver na publicação.
        selectedPhoto = "";
    }
}

// PROTEGER TEXTO
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// CURTIR
function likePost(button) {

    const post = button.closest(".post");
    const count = post.querySelector(".likes-count");

    let likes = Number(count.dataset.likes || 0);

    const liked = button.classList.toggle("liked");

    likes += liked ? 1 : -1;

    count.dataset.likes = likes;
    count.textContent = `${likes} curtidas`;

    button.innerHTML = `
        ${icon("heart")}
        ${liked ? "Curtido" : "Curtir"}
    `;
}

// COMENTAR
function commentPost(button) {

    const area = button.closest(".post").querySelector(".comment-area");

    if (area.querySelector("input")) {
        area.querySelector("input").focus();
        return;
    }

    area.innerHTML = `
        <input
            class="comment-input"
            placeholder="Escreva um comentário..."
            maxlength="300"
        >

        <button class="comment-send" onclick="sendComment(this)">
            Enviar comentário
        </button>
    `;

    area.querySelector("input").focus();
}

// ENVIAR COMENTÁRIO
function sendComment(button) {

    const area = button.closest(".comment-area");
    const input = area.querySelector("input");

    const text = input.value.trim();

    if (!text) return;

    const comment = document.createElement("div");

    comment.className = "comment-item";
    comment.textContent = "Jonathan: " + text;

    area.appendChild(comment);

    input.remove();
    button.remove();

    const stats = area.closest(".post").querySelector(".post-stats span:last-child");

    let total = Number(stats.dataset.comments || 0);

    total++;

    stats.dataset.comments = total;
    stats.textContent = `${total} comentários`;
}

// COMPARTILHAR
function sharePost(button) {

    const post = button.closest(".post");
    const text = post.querySelector(".post-text").textContent;

    if (navigator.share) {

        navigator.share({
            title: "CraftFeed",
            text: text
        }).catch(() => {});

    } else if (navigator.clipboard) {

        navigator.clipboard.writeText(text)
            .then(() => alert("Publicação copiada!"))
            .catch(() => alert("Não foi possível copiar."));

    } else {

        alert("Compartilhamento indisponível neste navegador.");

    }
}

// INICIALIZAR CONTAGEM DE COMENTÁRIOS
document.querySelectorAll(".post-stats span:last-child").forEach(item => {
    item.dataset.comments = parseInt(item.textContent) || 0;
});

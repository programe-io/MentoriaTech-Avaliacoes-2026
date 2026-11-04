
const posts = document.getElementById("posts");
const publishButton = document.getElementById("publishButton");
const postText = document.getElementById("postText");
const postImage = document.getElementById("postImage");
const search = document.getElementById("search");

// Criar publicação
publishButton.addEventListener("click", () => {
    const text = postText.value.trim();
    const image = postImage.value.trim();

    if (!text) {
        alert("Escreva algo antes de publicar!");
        return;
    }

    // Aceita apenas URLs HTTP ou HTTPS
    let validImage = "";

    try {
        const url = new URL(image);
        if (["http:", "https:"].includes(url.protocol)) {
            validImage = url.href;
        }
    } catch {
        validImage = "";
    }

    const article = document.createElement("article");
    article.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Meu perfil";

    const info = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = "Meu perfil";

    const time = document.createElement("small");
    time.textContent = "Agora";

    info.append(name, time);
    header.append(avatar, info);

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    article.append(header, paragraph);

    if (validImage) {
        const img = document.createElement("img");
        img.className = "post-image";
        img.src = validImage;
        img.alt = "Imagem da publicação";
        img.referrerPolicy = "no-referrer";
        article.append(img);
    }

    const actions = document.createElement("div");
    actions.className = "post-actions";

    actions.innerHTML = `
        <button class="like-button">🤍 Curtir <span>0</span></button>
        <button class="comment-toggle">💬 Comentar</button>
        <button class="share-button">↗ Compartilhar</button>
    `;

    const comments = document.createElement("div");
    comments.className = "comments";
    comments.innerHTML = `
        <div class="comment-list"></div>
        <form class="comment-form">
            <input type="text" placeholder="Escreva um comentário..." required>
            <button type="submit">Enviar</button>
        </form>
    `;

    article.append(actions, comments);
    posts.prepend(article);

    postText.value = "";
    postImage.value = "";
});

// Interações do feed
posts.addEventListener("click", async (event) => {
    const button = event.target.closest("button");

    if (!button) return;

    // Curtidas
    if (button.classList.contains("like-button")) {
        const count = button.querySelector("span");
        let total = Number(count.textContent);

        if (button.classList.toggle("liked")) {
            count.textContent = total + 1;
            button.firstChild.textContent = "❤️ Curtido ";
        } else {
            count.textContent = Math.max(0, total - 1);
            button.firstChild.textContent = "🤍 Curtir ";
        }
    }

    // Mostrar comentários
    if (button.classList.contains("comment-toggle")) {
        const post = button.closest(".post");
        post.querySelector(".comments").classList.toggle("show");
    }

    // Compartilhar
    if (button.classList.contains("share-button")) {
        const post = button.closest(".post");
        const text = post.querySelector("p").textContent;

        try {
            if (navigator.share) {
                await navigator.share({ text });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                alert("Texto copiado para compartilhar!");
            } else {
                alert("Compartilhamento indisponível neste navegador.");
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                alert("Não foi possível compartilhar.");
            }
        }
    }
});

// Adicionar comentários
posts.addEventListener("submit", (event) => {
    if (!event.target.classList.contains("comment-form")) return;

    event.preventDefault();

    const input = event.target.querySelector("input");
    const text = input.value.trim();

    if (!text) return;

    const comment = document.createElement("div");
    comment.className = "comment-item";
    comment.textContent = "Você: " + text;

    const list = event.target.parentElement.querySelector(".comment-list");
    list.append(comment);

    input.value = "";
});

// Pesquisar publicações
search.addEventListener("input", () => {
    const term = search.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        post.style.display = post.textContent.toLowerCase().includes(term)
            ? "block"
            : "none";
    });
});

// Seguir usuários
document.querySelectorAll(".follow-button").forEach(button => {
    button.addEventListener("click", () => {
        const following = button.textContent === "Seguindo";

        button.textContent = following ? "Seguir" : "Seguindo";
        button.style.background = following ? "#635bff" : "#777";
    });
});

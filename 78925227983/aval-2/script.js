
const postForm = document.getElementById("postForm");
const postText = document.getElementById("postText");
const postImage = document.getElementById("postImage");
const feed = document.getElementById("feed");

// Criar publicação
postForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = postText.value.trim();
    const image = postImage.value.trim();

    if (!text) return;

    const post = document.createElement("article");
    post.className = "post";

    // Cabeçalho
    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Seu perfil";

    const user = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = "Você";

    const time = document.createElement("small");
    time.textContent = "Agora";

    user.append(name, time);
    header.append(avatar, user);

    // Texto
    const description = document.createElement("p");
    description.className = "post-text";
    description.textContent = text;

    post.append(header, description);

    // Imagem opcional
    if (image) {
        try {
            const parsedUrl = new URL(image);

            if (!["https:", "http:"].includes(parsedUrl.protocol)) {
                throw new Error("URL inválida");
            }

            const photo = document.createElement("img");
            photo.className = "post-image";
            photo.src = parsedUrl.href;
            photo.alt = "Imagem da publicação";
            post.appendChild(photo);
        } catch {
            alert("Digite uma URL de imagem válida.");
            return;
        }
    }

    // Botões de interação
    const actions = document.createElement("div");
    actions.className = "post-actions";

    const like = document.createElement("button");
    like.className = "like-button";
    like.textContent = "♡ Curtir";

    const commentButton = document.createElement("button");
    commentButton.className = "comment-button";
    commentButton.textContent = "💬 Comentar";

    const share = document.createElement("button");
    share.className = "share-button";
    share.textContent = "↗ Compartilhar";

    actions.append(like, commentButton, share);

    // Curtidas
    const count = document.createElement("p");
    count.className = "like-count";
    count.textContent = "0 curtidas";

    // Comentários
    const comments = document.createElement("div");
    comments.className = "comments";

    const commentForm = document.createElement("form");
    commentForm.className = "comment-form";

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Escreva um comentário...";
    commentInput.required = true;

    const send = document.createElement("button");
    send.type = "submit";
    send.textContent = "Enviar";

    commentForm.append(commentInput, send);

    post.append(actions, count, comments, commentForm);

    // Adicionar publicação ao início do feed
    feed.prepend(post);

    postText.value = "";
    postImage.value = "";
});

// Curtir publicações
feed.addEventListener("click", function(event) {
    if (event.target.classList.contains("like-button")) {
        const button = event.target;
        const post = button.closest(".post");
        const count = post.querySelector(".like-count");

        let likes = Number(count.dataset.likes || 0);

        if (button.classList.contains("liked")) {
            likes--;
            button.classList.remove("liked");
            button.textContent = "♡ Curtir";
        } else {
            likes++;
            button.classList.add("liked");
            button.textContent = "♥ Curtido";
        }

        count.dataset.likes = likes;
        count.textContent = likes + " curtidas";
    }
});

// Adicionar comentários
feed.addEventListener("submit", function(event) {
    if (!event.target.classList.contains("comment-form")) return;

    event.preventDefault();

    const form = event.target;
    const input = form.querySelector("input");
    const comments = form.closest(".post").querySelector(".comments");

    const text = input.value.trim();

    if (!text) return;

    const comment = document.createElement("p");
    const username = document.createElement("strong");

    username.textContent = "Você: ";
    comment.append(username, document.createTextNode(text));

    comments.appendChild(comment);

    input.value = "";
});

// Compartilhar publicação
feed.addEventListener("click", async function(event) {
    if (!event.target.classList.contains("share-button")) return;

    const post = event.target.closest(".post");
    const text = post.querySelector(".post-text").textContent;

    try {
        if (navigator.share) {
            await navigator.share({
                title: "Publicação SocialFeed",
                text: text
            });
        } else {
            await navigator.clipboard.writeText(text);
            alert("Texto da publicação copiado!");
        }
    } catch (error) {
        if (error.name !== "AbortError") {
            alert("Não foi possível compartilhar.");
        }
    }
});

// Botões seguir
document.querySelectorAll(".follow-button").forEach(button => {
    button.addEventListener("click", function() {
        const following = this.textContent === "Seguindo";

        this.textContent = following ? "Seguir" : "Seguindo";
    });
});

// Botão editar perfil
document.querySelector(".edit-profile").addEventListener("click", () => {
    const newName = prompt("Digite seu novo nome:");

    if (newName && newName.trim()) {
        document.querySelector(".profile-card h3").textContent =
            newName.trim();
    }
});

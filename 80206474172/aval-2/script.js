
const modal = document.getElementById("postModal");

const openPost = document.getElementById("openPost");
const closeModal = document.getElementById("closeModal");
const publishBtn = document.getElementById("publishBtn");

const feed = document.getElementById("feed");

// ABRIR MODAL

openPost.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("show");
});

// FECHAR MODAL

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

// PUBLICAR

publishBtn.addEventListener("click", () => {

    const user = document.getElementById("postUser").value.trim();
    const image = document.getElementById("postImage").value.trim();
    const caption = document.getElementById("postCaption").value.trim();

    if (!user || !image) {
        alert("Preencha seu nome e o link da imagem!");
        return;
    }

    try {
        const url = new URL(image);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }

        const post = document.createElement("article");
        post.className = "post";

        const header = document.createElement("div");
        header.className = "post-header";

        const profile = document.createElement("div");
        profile.className = "profile";

        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = user.charAt(0).toUpperCase();

        const details = document.createElement("div");

        const username = document.createElement("strong");
        username.textContent = user;

        const location = document.createElement("small");
        location.textContent = "Nova publicação";

        details.append(username, location);
        profile.append(avatar, details);
        header.append(profile);

        const img = document.createElement("img");
        img.className = "post-image";
        img.src = url.href;
        img.alt = "Imagem publicada por " + user;

        const actions = document.createElement("div");
        actions.className = "post-actions";

        actions.innerHTML = `
            <button class="like-btn">♡</button>
            <button class="comment-btn">💬</button>
            <button>➤</button>
            <button class="save-btn">♧</button>
        `;

        const info = document.createElement("div");
        info.className = "post-info";

        const likes = document.createElement("strong");
        likes.className = "likes";
        likes.textContent = "0 curtidas";

        const description = document.createElement("p");

        const author = document.createElement("strong");
        author.textContent = user;

        description.append(author, document.createTextNode(" " + caption));

        info.append(likes, description);

        post.append(header, img, actions, info);

        feed.prepend(post);

        modal.classList.remove("show");

        document.getElementById("postUser").value = "";
        document.getElementById("postImage").value = "";
        document.getElementById("postCaption").value = "";

    } catch (error) {
        alert("Digite um link válido de imagem!");
    }
});

// CURTIDAS E SALVAMENTOS

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("like-btn")) {

        const button = e.target;
        const post = button.closest(".post");
        const likes = post.querySelector(".likes");

        button.classList.toggle("liked");

        const total = Number(likes.dataset.count || 0);
        const novoTotal = total + (button.classList.contains("liked") ? 1 : -1);

        likes.dataset.count = novoTotal;
        likes.textContent = novoTotal + " curtidas";

        button.textContent = button.classList.contains("liked") ? "♥" : "♡";
    }

    if (e.target.classList.contains("save-btn")) {
        e.target.classList.toggle("saved");
        e.target.textContent =
            e.target.classList.contains("saved") ? "▣" : "♧";
    }

    if (e.target.classList.contains("follow-btn")) {
        const seguindo = e.target.textContent === "Seguindo";
        e.target.textContent = seguindo ? "Seguir" : "Seguindo";
    }

});

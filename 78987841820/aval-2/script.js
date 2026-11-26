
// ==============================
// CURTIDAS
// ==============================

function updateLikes(post, increment) {

    const likesElement = post.querySelector(".likes-count");

    let count = Number(post.dataset.likes || 0);

    count += increment;

    post.dataset.likes = count;

    likesElement.textContent =
        count.toLocaleString("pt-BR") + " curtidas";
}

document.querySelectorAll(".post").forEach(post => {

    const button = post.querySelector(".like-button");
    const image = post.querySelector(".post-image");

    // Curtir pelo botão
    button.addEventListener("click", () => {

        const liked = button.classList.toggle("liked");

        button.textContent = liked ? "♥" : "♡";

        updateLikes(post, liked ? 1 : -1);
    });

    // Curtir com duplo clique
    image.addEventListener("dblclick", () => {

        if (!button.classList.contains("liked")) {

            button.classList.add("liked");
            button.textContent = "♥";

            updateLikes(post, 1);
        }

        const heart = document.createElement("div");

        heart.className = "double-heart";
        heart.textContent = "♥";

        post.querySelector(".post-media").appendChild(heart);

        setTimeout(() => heart.remove(), 750);
    });

});

// Inicializar quantidade de curtidas
document.querySelectorAll(".post").forEach(post => {

    const likes = post.querySelector(".likes-count").textContent;

    post.dataset.likes = likes.replace(/\D/g, "");

});


// ==============================
// COMENTÁRIOS
// ==============================

document.querySelectorAll(".comment-form").forEach(form => {

    form.addEventListener("submit", event => {

        event.preventDefault();

        const input = form.querySelector("input");
        const text = input.value.trim();

        if (!text) return;

        const post = form.closest(".post");
        const list = post.querySelector(".comments-list");

        const comment = document.createElement("p");

        comment.className = "comment";

        const username = document.createElement("strong");
        username.textContent = "seu_usuario ";

        const message = document.createElement("span");
        message.textContent = text;

        comment.append(username, message);

        list.appendChild(comment);

        input.value = "";

    });

});


// Focar no campo de comentário

document.querySelectorAll(".comment-focus").forEach(button => {

    button.addEventListener("click", () => {

        const input = button.closest(".post")
            .querySelector(".comment-form input");

        input.focus();

    });

});


// Mostrar ou esconder comentários

document.querySelectorAll(".view-comments").forEach(button => {

    button.addEventListener("click", () => {

        const list = button.nextElementSibling;

        list.hidden = !list.hidden;

        button.textContent = list.hidden
            ? "Ver todos os comentários"
            : "Ocultar comentários";

    });

});


// ==============================
// SALVAR PUBLICAÇÕES
// ==============================

document.querySelectorAll(".save-button").forEach(button => {

    button.addEventListener("click", () => {

        const saved = button.classList.toggle("saved");

        button.textContent = saved ? "▣" : "♧";

    });

});


// ==============================
// SEGUIR USUÁRIOS
// ==============================

document.querySelectorAll(".follow-button").forEach(button => {

    button.addEventListener("click", () => {

        const following = button.textContent === "Seguir";

        button.textContent = following
            ? "Seguindo"
            : "Seguir";

        button.style.color = following
            ? "var(--secondary)"
            : "var(--blue)";

    });

});


// ==============================
// TEMA ESCURO
// ==============================

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark = document.body.classList.contains("dark");

    themeToggle.textContent = dark
        ? "☀ Tema claro"
        : "☼ Alternar tema";

});


// ==============================
// CARREGAR MAIS PUBLICAÇÕES
// ==============================

const newPosts = [

    {
        user: "gabriel.dev",
        location: "São Paulo, Brasil",
        avatar: 30,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
        description: "Aprendendo, evoluindo e construindo o futuro! 🚀",
        likes: 1540
    },

    {
        user: "carolina.m",
        location: "Rio de Janeiro",
        avatar: 40,
        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900",
        description: "A vida acontece nos pequenos momentos. 🌸",
        likes: 2300
    },

    {
        user: "rafael.tech",
        location: "Curitiba, Brasil",
        avatar: 45,
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900",
        description: "Mais um projeto saindo do papel! 💻",
        likes: 875
    }

];

const feed = document.getElementById("feed");
const loadMore = document.getElementById("loadMore");

function createPost(data) {

    const post = document.createElement("article");

    post.className = "post";
    post.dataset.likes = data.likes;

    const header = document.createElement("header");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = `https://i.pravatar.cc/100?img=${data.avatar}`;
    avatar.className = "profile-picture";

    const user = document.createElement("div");
    user.className = "post-user";

    const username = document.createElement("strong");
    username.textContent = data.user;

    const location = document.createElement("span");
    location.textContent = data.location;

    user.append(username, location);

    const options = document.createElement("button");
    options.className = "options-button";
    options.textContent = "•••";

    header.append(avatar, user, options);

    const media = document.createElement("div");
    media.className = "post-media";

    const image = document.createElement("img");
    image.src = data.image;
    image.alt = "Fotografia publicada";
    image.className = "post-image";

    media.appendChild(image);

    const details = document.createElement("div");
    details.className = "post-details";

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const like = document.createElement("button");
    like.className = "like-button";
    like.textContent = "♡";

    const commentButton = document.createElement("button");
    commentButton.className = "comment-focus";
    commentButton.textContent = "▢";

    const share = document.createElement("button");
    share.textContent = "➤";

    const save = document.createElement("button");
    save.className = "save-button";
    save.textContent = "♧";

    actions.append(like, commentButton, share, save);

    const likes = document.createElement("strong");
    likes.className = "likes-count";
    likes.textContent =
        data.likes.toLocaleString("pt-BR") + " curtidas";

    const caption = document.createElement("p");
    caption.className = "caption";

    const captionUser = document.createElement("strong");
    captionUser.textContent = data.user;

    const captionText = document.createTextNode(
        " " + data.description
    );

    caption.append(captionUser, captionText);

    const commentsButton = document.createElement("button");
    commentsButton.className = "view-comments";
    commentsButton.textContent = "Ver todos os comentários";

    const comments = document.createElement("div");
    comments.className = "comments-list";

    const date = document.createElement("span");
    date.className = "post-date";
    date.textContent = "AGORA";

    const form = document.createElement("form");
    form.className = "comment-form";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Adicione um comentário...";
    input.maxLength = 300;

    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Publicar";

    form.append(input, submit);

    details.append(
        actions,
        likes,
        caption,
        commentsButton,
        comments,
        date,
        form
    );

    post.append(header, media, details);

    return post;
}

let currentPost = 0;

loadMore.addEventListener("click", () => {

    if (currentPost >= newPosts.length) {

        loadMore.textContent = "Você viu todas as publicações";
        loadMore.disabled = true;

        return;
    }

    const post = createPost(newPosts[currentPost]);

    feed.appendChild(post);

    currentPost++;

    loadMore.textContent = currentPost >= newPosts.length
        ? "Todas as publicações carregadas"
        : "Carregar mais publicações";

    if (currentPost >= newPosts.length) {
        loadMore.disabled = true;
    }

    // Inicializar interações dos novos posts
    initializePost(post);

});


// ==============================
// INTERAÇÕES DOS NOVOS POSTS
// ==============================

function initializePost(post) {

    const like = post.querySelector(".like-button");
    const image = post.querySelector(".post-image");

    like.addEventListener("click", () => {

        const liked = like.classList.toggle("liked");

        like.textContent = liked ? "♥" : "♡";

        updateLikes(post, liked ? 1 : -1);

    });

    image.addEventListener("dblclick", () => {

        if (!like.classList.contains("liked")) {

            like.classList.add("liked");
            like.textContent = "♥";

            updateLikes(post, 1);

        }

        const heart = document.createElement("div");

        heart.className = "double-heart";
        heart.textContent = "♥";

        post.querySelector(".post-media").appendChild(heart);

        setTimeout(() => heart.remove(), 750);

    });

    post.querySelector(".comment-form").addEventListener("submit", event => {

        event.preventDefault();

        const input = event.currentTarget.querySelector("input");
        const text = input.value.trim();

        if (!text) return;

        const comment = document.createElement("p");
        comment.className = "comment";

        const username = document.createElement("strong");
        username.textContent = "seu_usuario ";

        const message = document.createElement("span");
        message.textContent = text;

        comment.append(username, message);

        post.querySelector(".comments-list").appendChild(comment);

        input.value = "";

    });

    post.querySelector(".comment-focus").addEventListener("click", () => {
        post.querySelector(".comment-form input").focus();
    });

    post.querySelector(".save-button").addEventListener("click", event => {

        const button = event.currentTarget;

        const saved = button.classList.toggle("saved");

        button.textContent = saved ? "▣" : "♧";

    });

    post.querySelector(".view-comments").addEventListener("click", event => {

        const button = event.currentTarget;
        const list = post.querySelector(".comments-list");

        list.hidden = !list.hidden;

        button.textContent = list.hidden
            ? "Ver todos os comentários"
            : "Ocultar comentários";

    });

}

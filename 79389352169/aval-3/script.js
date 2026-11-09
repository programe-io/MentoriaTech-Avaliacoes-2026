
const postsContainer = document.getElementById("posts");
const createModal = document.getElementById("createModal");

// ABRIR E FECHAR MODAL
document.getElementById("openCreate").addEventListener("click", (e) => {
    e.preventDefault();
    createModal.style.display = "flex";
});

document.getElementById("closeModal").addEventListener("click", () => {
    createModal.style.display = "none";
});

createModal.addEventListener("click", (e) => {
    if (e.target === createModal) {
        createModal.style.display = "none";
    }
});

// CRIAR PUBLICAÇÃO
document.getElementById("publishPost").addEventListener("click", () => {
    const username = document.getElementById("newUsername").value.trim();
    const caption = document.getElementById("newCaption").value.trim();
    const imageUrl = document.getElementById("newImage").value.trim();

    if (!username || !caption || !imageUrl) {
        alert("Preencha todos os campos!");
        return;
    }

    let url;

    try {
        url = new URL(imageUrl);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }
    } catch {
        alert("Digite uma URL de imagem válida!");
        return;
    }

    const post = {
        id: Date.now(),
        username,
        caption,
        image: url.href,
        likes: 0,
        liked: false,
        saved: false,
        comments: [],
        date: "AGORA"
    };

    const posts = getPosts();
    posts.unshift(post);

    savePosts(posts);
    renderPosts();

    document.getElementById("newUsername").value = "";
    document.getElementById("newCaption").value = "";
    document.getElementById("newImage").value = "";

    createModal.style.display = "none";
});

// ARMAZENAMENTO
function getPosts() {
    try {
        return JSON.parse(localStorage.getItem("instagramPosts")) || [];
    } catch {
        return [];
    }
}

function savePosts(posts) {
    localStorage.setItem("instagramPosts", JSON.stringify(posts));
}

// RENDERIZAR PUBLICAÇÕES
function renderPosts() {
    const savedPosts = getPosts();

    postsContainer.querySelectorAll(".user-post").forEach(post => post.remove());

    savedPosts.forEach(post => {
        const article = document.createElement("article");
        article.className = "post user-post";
        article.dataset.id = post.id;

        const header = document.createElement("div");
        header.className = "post-header";

        const avatar = document.createElement("img");
        avatar.src = `https://i.pravatar.cc/150?u=${encodeURIComponent(post.username)}`;
        avatar.alt = "Foto de perfil";

        const userInfo = document.createElement("div");
        userInfo.className = "user-info";

        const name = document.createElement("strong");
        name.textContent = post.username;

        const location = document.createElement("small");
        location.textContent = "Publicação original";

        userInfo.append(name, location);

        const more = document.createElement("button");
        more.className = "more-btn";
        more.textContent = "•••";

        header.append(avatar, userInfo, more);

        const image = document.createElement("img");
        image.className = "post-image";
        image.src = post.image;
        image.alt = "Imagem publicada";

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const actionGroup = document.createElement("div");

        const like = document.createElement("button");
        like.className = "like-btn";
        like.textContent = post.liked ? "♥" : "♡";
        if (post.liked) like.classList.add("liked");

        const comment = document.createElement("button");
        comment.className = "comment-focus";
        comment.textContent = "💬";

        const share = document.createElement("button");
        share.textContent = "➤";

        actionGroup.append(like, comment, share);

        const save = document.createElement("button");
        save.className = "save-btn";
        save.textContent = post.saved ? "▣" : "♧";

        if (post.saved) save.classList.add("saved");

        actions.append(actionGroup, save);

        const description = document.createElement("div");
        description.className = "post-description";

        const likes = document.createElement("strong");
        likes.className = "likes";
        likes.textContent = `${post.likes} curtidas`;

        const caption = document.createElement("p");

        const boldName = document.createElement("strong");
        boldName.textContent = post.username + " ";

        caption.append(boldName, document.createTextNode(post.caption));

        const viewComments = document.createElement("button");
        viewComments.className = "view-comments";
        viewComments.textContent = "Ver todos os comentários";

        const date = document.createElement("small");
        date.textContent = post.date;

        description.append(likes, caption, viewComments, date);

        const commentArea = document.createElement("div");
        commentArea.className = "comment-area";

        const commentList = document.createElement("div");
        commentList.className = "comment-list";

        post.comments.forEach(text => {
            const item = document.createElement("p");
            item.className = "comment-item";
            item.textContent = text;
            commentList.append(item);
        });

        const form = document.createElement("form");
        form.className = "comment-form";

        const input = document.createElement("input");
        input.placeholder = "Adicione um comentário...";

        const submit = document.createElement("button");
        submit.type = "submit";
        submit.textContent = "Publicar";

        form.append(input, submit);
        commentArea.append(commentList, form);

        article.append(header, image, actions, description, commentArea);

        // Adiciona a publicação criada ao início do feed
        postsContainer.prepend(article);
    });
}

// CURTIR, SALVAR E COMENTAR
postsContainer.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const post = button.closest(".user-post");
    if (!post) return;

    const posts = getPosts();
    const postData = posts.find(p => String(p.id) === post.dataset.id);

    if (!postData) return;

    if (button.classList.contains("like-btn")) {
        postData.liked = !postData.liked;
        postData.likes += postData.liked ? 1 : -1;
        savePosts(posts);
        renderPosts();
    }

    if (button.classList.contains("save-btn")) {
        postData.saved = !postData.saved;
        savePosts(posts);
        renderPosts();
    }

    if (
        button.classList.contains("comment-focus") ||
        button.classList.contains("view-comments")
    ) {
        const area = post.querySelector(".comment-area");
        area.classList.toggle("show");

        if (button.classList.contains("comment-focus")) {
            area.querySelector("input").focus();
        }
    }
});

// ENVIAR COMENTÁRIOS
postsContainer.addEventListener("submit", (event) => {
    if (!event.target.classList.contains("comment-form")) return;

    event.preventDefault();

    const form = event.target;
    const input = form.querySelector("input");
    const text = input.value.trim();

    if (!text) return;

    const post = form.closest(".user-post");
    const posts = getPosts();

    const postData = posts.find(p => String(p.id) === post.dataset.id);

    if (!postData) return;

    postData.comments.push("Você: " + text);

    savePosts(posts);
    renderPosts();

    const updatedPost = postsContainer.querySelector(
        `[data-id="${postData.id}"]`
    );

    updatedPost.querySelector(".comment-area").classList.add("show");
});

// STORIES
const storyModal = document.getElementById("storyModal");

document.querySelectorAll(".story[data-user]").forEach(story => {
    story.addEventListener("click", () => {
        const username = story.dataset.user;
        const image = story.querySelector("img");

        document.getElementById("storyImage").src = image.src;
        document.getElementById("storyName").textContent = username;

        storyModal.style.display = "flex";
    });
});

document.getElementById("closeStory").addEventListener("click", () => {
    storyModal.style.display = "none";
});

storyModal.addEventListener("click", (event) => {
    if (event.target === storyModal) {
        storyModal.style.display = "none";
    }
});

// BOTÃO SEGUIR
document.querySelectorAll(".suggestion button").forEach(button => {
    button.addEventListener("click", () => {
        const following = button.textContent === "Seguindo";

        button.textContent = following ? "Seguir" : "Seguindo";
    });
});

// PUBLICAÇÕES INICIAIS
renderPosts();

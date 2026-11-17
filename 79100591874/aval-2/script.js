
const feed = document.querySelector("#feed");
const postForm = document.querySelector("#postForm");

// CURTIR PUBLICAÇÕES
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("like-button")) {
        const button = event.target;
        const post = button.closest(".post");
        const count = post.querySelector(".like-count");

        let likes = Number(count.dataset.likes);

        if (!Number.isFinite(likes)) {
            likes = Number.parseInt(count.textContent, 10) || 0;
        }

        if (button.classList.contains("liked")) {
            button.classList.remove("liked");
            button.textContent = "♡";
            likes--;
        } else {
            button.classList.add("liked");
            button.textContent = "♥";
            likes++;
        }

        count.dataset.likes = likes;
        count.textContent = likes.toLocaleString("pt-BR") + " curtidas";
    }
});

// CRIAR PUBLICAÇÃO
postForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const imageUrl = document.querySelector("#imageUrl").value.trim();
    const caption = document.querySelector("#caption").value.trim();

    let url;

    try {
        url = new URL(imageUrl);
    } catch {
        alert("Digite um link de imagem válido.");
        return;
    }

    if (!["https:", "http:"].includes(url.protocol)) {
        alert("Use um link de imagem válido.");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const user = document.createElement("div");
    user.className = "post-user";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Foto do usuário";

    const userInfo = document.createElement("div");
    const username = document.createElement("strong");
    username.textContent = "seu_usuario";

    const location = document.createElement("small");
    location.textContent = "Publicado agora";

    userInfo.append(username, location);
    user.append(avatar, userInfo);

    const more = document.createElement("button");
    more.className = "more-button";
    more.textContent = "•••";
    more.setAttribute("aria-label", "Mais opções");

    header.append(user, more);

    const image = document.createElement("img");
    image.className = "post-image";
    image.src = url.href;
    image.alt = "Imagem da publicação";

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const actionGroup = document.createElement("div");

    const like = document.createElement("button");
    like.className = "like-button";
    like.textContent = "♡";
    like.setAttribute("aria-label", "Curtir");

    const comment = document.createElement("button");
    comment.className = "comment-focus";
    comment.textContent = "♧";
    comment.setAttribute("aria-label", "Comentar");

    const share = document.createElement("button");
    share.textContent = "➤";
    share.setAttribute("aria-label", "Compartilhar");

    actionGroup.append(like, comment, share);

    const save = document.createElement("button");
    save.className = "save-button";
    save.textContent = "♧";
    save.setAttribute("aria-label", "Salvar");

    actions.append(actionGroup, save);

    const info = document.createElement("div");
    info.className = "post-info";

    const likes = document.createElement("strong");
    likes.className = "like-count";
    likes.dataset.likes = "0";
    likes.textContent = "0 curtidas";

    const description = document.createElement("p");
    const name = document.createElement("strong");
    name.textContent = "seu_usuario";
    description.append(name, document.createTextNode(" " + caption));

    const comments = document.createElement("button");
    comments.className = "show-comments";
    comments.textContent = "Ver comentários";

    const time = document.createElement("small");
    time.textContent = "AGORA";

    info.append(likes, description, comments, time);

    const commentForm = document.createElement("form");
    commentForm.className = "comment-form";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Adicione um comentário...";
    input.maxLength = 150;

    const publishComment = document.createElement("button");
    publishComment.type = "submit";
    publishComment.textContent = "Publicar";

    commentForm.append(input, publishComment);

    post.append(header, image, actions, info, commentForm);
    feed.prepend(post);

    postForm.reset();
    alert("Sua publicação foi criada!");
});

// PUBLICAR COMENTÁRIOS
document.addEventListener("submit", function(event) {
    if (!event.target.classList.contains("comment-form")) return;

    event.preventDefault();

    const form = event.target;
    const input = form.querySelector("input");
    const text = input.value.trim();

    if (text === "") return;

    const post = form.closest(".post");
    const info = post.querySelector(".post-info");

    const comment = document.createElement("p");
    const username = document.createElement("strong");

    username.textContent = "seu_usuario";
    comment.append(username, document.createTextNode(" " + text));

    info.insertBefore(comment, info.querySelector("small"));

    input.value = "";
});

// BOTÕES DE SEGUIR
document.querySelectorAll(".follow-button").forEach(function(button) {
    button.addEventListener("click", function() {
        if (button.textContent === "Seguir") {
            button.textContent = "Seguindo";
            button.style.color = "#888";
        } else {
            button.textContent = "Seguir";
            button.style.color = "#0095f6";
        }
    });
});

// LEVAR O FOCO PARA O CAMPO DE COMENTÁRIO
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("comment-focus")) {
        const post = event.target.closest(".post");
        post.querySelector(".comment-form input").focus();
    }
});

// MENU ATIVO
document.querySelectorAll(".menu-item").forEach(function(item) {
    item.addEventListener("click", function() {
        document.querySelectorAll(".menu-item").forEach(function(link) {
            link.classList.remove("ativo");
        });

        item.classList.add("ativo");
    });
});

// STORIES
document.querySelectorAll(".story").forEach(function(story) {
    story.addEventListener("click", function() {
        const nome = story.querySelector("p").textContent;
        alert("Você abriu o story de " + nome);
    });
});

// BOTÃO DE COMENTÁRIOS
document.querySelectorAll(".show-comments").forEach(function(button) {
    button.addEventListener("click", function() {
        const post = button.closest(".post");
        post.querySelector(".comment-form input").focus();
    });
});

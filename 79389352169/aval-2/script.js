
const publishBtn = document.getElementById("publishBtn");
const postsContainer = document.getElementById("posts");

// Criar publicação
publishBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const text = document.getElementById("postText").value.trim();
    const imageUrl = document.getElementById("imageUrl").value.trim();

    if (!username || !text) {
        alert("Digite seu nome e escreva uma publicação!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = username.charAt(0).toUpperCase();

    const header = document.createElement("div");
    header.className = "post-header";

    const userInfo = document.createElement("div");
    const name = document.createElement("h3");
    name.textContent = username;

    const time = document.createElement("small");
    time.textContent = "Agora";

    userInfo.append(name, time);
    header.append(avatar, userInfo);

    const postText = document.createElement("p");
    postText.className = "post-text";
    postText.textContent = text;

    post.append(header, postText);

    if (imageUrl) {
        try {
            const url = new URL(imageUrl);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error("URL inválida");
            }

            const image = document.createElement("img");
            image.className = "post-image";
            image.src = url.href;
            image.alt = "Imagem da publicação";
            image.onerror = () => image.remove();

            post.append(image);
        } catch {
            alert("Digite uma URL de imagem válida.");
            return;
        }
    }

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const like = document.createElement("button");
    like.className = "like-btn";
    like.innerHTML = "♡ Curtir <span>0</span>";

    const commentButton = document.createElement("button");
    commentButton.className = "comment-toggle";
    commentButton.textContent = "💬 Comentar";

    actions.append(like, commentButton);

    const comments = document.createElement("div");
    comments.className = "comments";

    const commentList = document.createElement("div");
    commentList.className = "comment-list";

    const commentForm = document.createElement("div");
    commentForm.className = "comment-form";

    const input = document.createElement("input");
    input.placeholder = "Escreva um comentário...";

    const send = document.createElement("button");
    send.className = "send-comment";
    send.textContent = "Enviar";

    commentForm.append(input, send);
    comments.append(commentList, commentForm);

    post.append(actions, comments);

    postsContainer.prepend(post);

    document.getElementById("username").value = "";
    document.getElementById("postText").value = "";
    document.getElementById("imageUrl").value = "";
});

// Curtidas, comentários e abertura do campo de comentários
postsContainer.addEventListener("click", event => {

    const button = event.target.closest("button");

    if (!button) return;

    const post = button.closest(".post");

    if (button.classList.contains("like-btn")) {
        const count = button.querySelector("span");
        const liked = button.classList.toggle("liked");

        let total = Number(count.textContent);

        total += liked ? 1 : -1;
        count.textContent = total;

        button.firstChild.textContent = liked
            ? "♥ Curtido "
            : "♡ Curtir ";

    }

    if (button.classList.contains("comment-toggle")) {
        post.querySelector(".comments").classList.toggle("show");
    }

    if (button.classList.contains("send-comment")) {
        const input = post.querySelector(".comment-form input");
        const commentList = post.querySelector(".comment-list");

        const text = input.value.trim();

        if (!text) {
            alert("Digite um comentário!");
            return;
        }

        const comment = document.createElement("div");
        comment.className = "comment";
        comment.textContent = text;

        commentList.appendChild(comment);
        input.value = "";
    }
});

// CURTIR PUBLICAÇÕES
document.querySelectorAll(".like-button").forEach(button => {
    button.addEventListener("click", () => {
        const icon = button.querySelector("i");
        const post = button.closest(".post");
        const likes = post.querySelector(".likes");

        if (button.classList.contains("liked")) {
            button.classList.remove("liked");
            icon.classList.replace("fa-solid", "fa-regular");
            likes.textContent = "1.245 curtidas";
        } else {
            button.classList.add("liked");
            icon.classList.replace("fa-regular", "fa-solid");
            likes.textContent = "1.246 curtidas";
        }
    });
});


// ADICIONAR COMENTÁRIOS
document.querySelectorAll(".comment-form").forEach(form => {
    form.addEventListener("submit", event => {
        event.preventDefault();

        const input = form.querySelector("input");
        const comment = input.value.trim();

        if (comment === "") {
            return;
        }

        const comments = form.closest(".post").querySelector(".comments");
        const newComment = document.createElement("p");

        const username = document.createElement("strong");
        username.textContent = "seu_usuario";

        newComment.appendChild(username);
        newComment.append(" " + comment);

        comments.appendChild(newComment);

        input.value = "";
    });
});


// PUBLICAR UMA NOVA POSTAGEM
const publishButton = document.getElementById("publish-button");

publishButton.addEventListener("click", () => {
    const captionInput = document.getElementById("post-caption");
    const imageInput = document.getElementById("post-image");

    const caption = captionInput.value.trim();
    const imageUrl = imageInput.value.trim();

    if (imageUrl === "") {
        alert("Adicione o link de uma imagem.");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    header.innerHTML = `
        <div class="user-info">
            <img src="https://i.pravatar.cc/100?img=12" alt="Perfil">
            <strong>seu_usuario</strong>
            <span>• agora</span>
        </div>
        <i class="fa-solid fa-ellipsis"></i>
    `;

    const image = document.createElement("img");
    image.className = "post-image";
    image.src = imageUrl;
    image.alt = "Publicação";

    const actions = document.createElement("div");
    actions.className = "post-actions";

    actions.innerHTML = `
        <button class="like-button">
            <i class="fa-regular fa-heart"></i>
        </button>
        <button>
            <i class="fa-regular fa-comment"></i>
        </button>
        <button>
            <i class="fa-regular fa-paper-plane"></i>
        </button>
        <button class="save-button">
            <i class="fa-regular fa-bookmark"></i>
        </button>
    `;

    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    const captionElement = document.createElement("p");
    captionElement.className = "caption";

    const username = document.createElement("strong");
    username.textContent = "seu_usuario";

    captionElement.appendChild(username);
    captionElement.append(" " + caption);

    const comments = document.createElement("div");
    comments.className = "comments";

    const commentForm = document.createElement("form");
    commentForm.className = "comment-form";

    commentForm.innerHTML = `
        <input type="text" placeholder="Adicione um comentário...">
        <button type="submit">Publicar</button>
    `;

    post.append(
        header,
        image,
        actions,
        likes,
        captionElement,
        comments,
        commentForm
    );

    document.getElementById("feed").prepend(post);

    captionInput.value = "";
    imageInput.value = "";

    // Curtida da nova publicação
    const likeButton = post.querySelector(".like-button");

    likeButton.addEventListener("click", () => {
        const icon = likeButton.querySelector("i");

        likeButton.classList.toggle("liked");

        if (likeButton.classList.contains("liked")) {
            icon.classList.replace("fa-regular", "fa-solid");
            likes.textContent = "1 curtida";
        } else {
            icon.classList.replace("fa-solid", "fa-regular");
            likes.textContent = "0 curtidas";
        }
    });

    // Comentários da nova publicação
    commentForm.addEventListener("submit", event => {
        event.preventDefault();

        const input = commentForm.querySelector("input");
        const comment = input.value.trim();

        if (comment === "") {
            return;
        }

        const newComment = document.createElement("p");
        const commentUsername = document.createElement("strong");

        commentUsername.textContent = "seu_usuario";

        newComment.appendChild(commentUsername);
        newComment.append(" " + comment);

        comments.appendChild(newComment);

        input.value = "";
    });
});


// SEGUIR E DEIXAR DE SEGUIR PERFIS
document.querySelectorAll(".follow-button").forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent === "Seguir") {
            button.textContent = "Seguindo";
        } else {
            button.textContent = "Seguir";
        }
    });
});


// SALVAR PUBLICAÇÕES
document.querySelectorAll(".save-button").forEach(button => {
    button.addEventListener("click", () => {
        const icon = button.querySelector("i");

        if (icon.classList.contains("fa-regular")) {
            icon.classList.replace("fa-regular", "fa-solid");
        } else {
            icon.classList.replace("fa-solid", "fa-regular");
        }
    });
});

const modal = document.getElementById("createModal");

document.getElementById("openCreate").onclick = (e) => {
    e.preventDefault();
    modal.style.display = "flex";
};

document.getElementById("closeModal").onclick = () => {
    modal.style.display = "none";
};

// Curtir e salvar publicações
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-icon")) {
        const icon = e.target;
        icon.classList.toggle("active");

        if (icon.classList.contains("active")) {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
        } else {
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
        }
    }

    if (e.target.classList.contains("save-icon")) {
        const icon = e.target;
        icon.classList.toggle("active");

        icon.classList.toggle("fa-solid");
        icon.classList.toggle("fa-regular");
    }
});

// Comentar
document.addEventListener("click", (e) => {
    if (e.target.textContent === "Publicar" &&
        e.target.closest(".comment-box")) {

        const box = e.target.closest(".comment-box");
        const input = box.querySelector("input");
        const post = box.closest(".post");

        if (!input.value.trim()) return;

        const comment = document.createElement("p");
        comment.className = "user-comment";

        const strong = document.createElement("strong");
        strong.textContent = "seu_usuario ";

        comment.append(strong, document.createTextNode(input.value));

        const info = post.querySelector(".post-info");
        info.appendChild(comment);

        input.value = "";
    }
});

// Criar publicação
document.getElementById("publishBtn").onclick = () => {
    const caption = document.getElementById("caption").value.trim();
    const image = document.getElementById("imageInput").files[0];

    if (!image) {
        alert("Selecione uma imagem!");
        return;
    }

    if (!image.type.startsWith("image/")) {
        alert("Selecione um arquivo de imagem válido!");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const post = document.createElement("article");
        post.className = "post";

        const header = document.createElement("div");
        header.className = "post-header";

        const avatar = document.createElement("img");
        avatar.src = "https://i.pravatar.cc/100?img=12";

        const name = document.createElement("strong");
        name.textContent = "seu_usuario";

        header.append(avatar, name);

        const photo = document.createElement("img");
        photo.className = "post-image";
        photo.src = event.target.result;

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const left = document.createElement("div");

        const heart = document.createElement("i");
        heart.className = "fa-regular fa-heart like-icon";

        const commentIcon = document.createElement("i");
        commentIcon.className = "fa-regular fa-comment";

        const send = document.createElement("i");
        send.className = "fa-regular fa-paper-plane";

        left.append(heart, commentIcon, send);

        const bookmark = document.createElement("i");
        bookmark.className = "fa-regular fa-bookmark save-icon";

        actions.append(left, bookmark);

        const info = document.createElement("div");
        info.className = "post-info";

        const likes = document.createElement("strong");
        likes.className = "likes";
        likes.textContent = "0 curtidas";

        const description = document.createElement("p");

        const username = document.createElement("strong");
        username.textContent = "seu_usuario ";

        description.append(
            username,
            document.createTextNode(caption)
        );

        info.append(likes, description);

        const comments = document.createElement("div");
        comments.className = "comment-box";

        const input = document.createElement("input");
        input.placeholder = "Adicione um comentário...";

        const button = document.createElement("button");
        button.textContent = "Publicar";

        comments.append(input, button);

        post.append(header, photo, actions, info, comments);

        document.getElementById("posts").prepend(post);

        modal.style.display = "none";
        document.getElementById("caption").value = "";
        document.getElementById("imageInput").value = "";
    };

    reader.readAsDataURL(image);
};


// SISTEMA DE CURTIDAS

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("like")) {
        const post = e.target.closest(".post");
        const likes = post.querySelector(".likes");

        let count = Number(likes.dataset.count || 120);

        if (e.target.classList.toggle("liked")) {
            count++;
            e.target.textContent = "♥";
        } else {
            count--;
            e.target.textContent = "♡";
        }

        likes.dataset.count = count;
        likes.textContent = count + " curtidas";
    }

    // FOCAR NO CAMPO DE COMENTÁRIO
    if (e.target.classList.contains("comment-focus")) {
        const post = e.target.closest(".post");
        post.querySelector(".comment-form input").focus();
    }
});

// SISTEMA DE COMENTÁRIOS

document.addEventListener("submit", function(e) {
    if (e.target.classList.contains("comment-form")) {
        e.preventDefault();

        const input = e.target.querySelector("input");
        const post = e.target.closest(".post");
        const comments = post.querySelector(".comments");

        if (!input.value.trim()) return;

        const comment = document.createElement("p");
        const username = document.createElement("strong");

        username.textContent = "Você ";
        comment.appendChild(username);
        comment.appendChild(document.createTextNode(input.value));

        comments.appendChild(comment);

        input.value = "";
    }
});

// CRIAR PUBLICAÇÃO COM FOTO

const publishButton = document.getElementById("publishButton");

publishButton.addEventListener("click", function() {
    const imageInput = document.getElementById("imageInput");
    const captionInput = document.getElementById("captionInput");

    const file = imageInput.files[0];
    const caption = captionInput.value.trim();

    if (!file) {
        alert("Selecione uma imagem!");
        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("Selecione um arquivo de imagem válido!");
        return;
    }

    const imageURL = URL.createObjectURL(file);

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";

    const username = document.createElement("strong");
    username.textContent = "Você";

    header.append(avatar, username);

    const image = document.createElement("img");
    image.className = "post-image";
    image.src = imageURL;

    const actions = document.createElement("div");
    actions.className = "actions";

    const like = document.createElement("button");
    like.className = "like";
    like.textContent = "♡";

    const commentButton = document.createElement("button");
    commentButton.className = "comment-focus";
    commentButton.textContent = "💬";

    const share = document.createElement("button");
    share.textContent = "➤";

    actions.append(like, commentButton, share);

    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "0 curtidas";
    likes.dataset.count = "0";

    const captionElement = document.createElement("p");
    captionElement.className = "caption";

    const bold = document.createElement("strong");
    bold.textContent = "Você ";

    captionElement.append(bold, document.createTextNode(caption));

    const comments = document.createElement("div");
    comments.className = "comments";

    const form = document.createElement("form");
    form.className = "comment-form";

    const input = document.createElement("input");
    input.placeholder = "Adicione um comentário...";

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Publicar";

    form.append(input, button);

    post.append(
        header,
        image,
        actions,
        likes,
        captionElement,
        comments,
        form
    );

    document.getElementById("feed").prepend(post);

    imageInput.value = "";
    captionInput.value = "";

    alert("Publicação criada com sucesso!");
});
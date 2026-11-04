
function openCreate(event) {
    if (event) event.preventDefault();

    document.getElementById("createModal").style.display = "flex";
}

function closeCreate() {
    document.getElementById("createModal").style.display = "none";
}

// CURTIR PUBLICAÇÃO

function likePost(button) {
    const post = button.closest(".post");
    const likes = post.querySelector(".likes");

    let count = Number(likes.dataset.count || 128);

    const liked = button.classList.toggle("liked");

    count += liked ? 1 : -1;

    likes.dataset.count = count;
    likes.textContent = count + " curtidas";

    button.textContent = liked ? "♥" : "♡";
}

// FOCAR COMENTÁRIO

function focusComment(button) {
    const post = button.closest(".post");

    post.querySelector(".comment-box input").focus();
}

// ADICIONAR COMENTÁRIO

function addComment(button) {
    const post = button.closest(".post");
    const input = post.querySelector(".comment-box input");
    const comments = post.querySelector(".comments");

    const text = input.value.trim();

    if (!text) return;

    const comment = document.createElement("div");
    comment.className = "comment";

    const user = document.createElement("strong");
    user.textContent = "seu_usuario ";

    comment.append(user, document.createTextNode(text));

    comments.appendChild(comment);

    input.value = "";
}

// CRIAR PUBLICAÇÃO

function createPost() {
    const caption = document.getElementById("newCaption").value.trim();
    const image = document.getElementById("newImage").value.trim();

    if (!caption && !image) {
        alert("Adicione uma legenda ou uma imagem!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";

    const username = document.createElement("strong");
    username.textContent = "seu_usuario";

    const time = document.createElement("span");
    time.textContent = "• agora";

    header.append(avatar, username, time);

    const content = document.createElement("div");

    if (image) {
        try {
            const url = new URL(image);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error("URL inválida");
            }

            const img = document.createElement("img");
            img.className = "post-image";
            img.src = url.href;
            img.alt = "Imagem da publicação";
            content.appendChild(img);
        } catch {
            alert("Informe uma URL válida de imagem.");
            return;
        }
    }

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const like = document.createElement("button");
    like.textContent = "♡";
    like.onclick = function() {
        likePost(this);
    };

    const commentButton = document.createElement("button");
    commentButton.textContent = "💬";
    commentButton.onclick = function() {
        focusComment(this);
    };

    const share = document.createElement("button");
    share.textContent = "➤";

    const save = document.createElement("button");
    save.textContent = "♧";
    save.className = "save";

    actions.append(like, commentButton, share, save);

    const likes = document.createElement("div");
    likes.className = "likes";
    likes.dataset.count = "0";
    likes.textContent = "0 curtidas";

    const description = document.createElement("div");
    description.className = "caption";

    const name = document.createElement("strong");
    name.textContent = "seu_usuario ";

    description.append(name, document.createTextNode(caption));

    const comments = document.createElement("div");
    comments.className = "comments";

    const commentBox = document.createElement("div");
    commentBox.className = "comment-box";

    const input = document.createElement("input");
    input.placeholder = "Adicione um comentário...";

    const publish = document.createElement("button");
    publish.textContent = "Publicar";
    publish.onclick = function() {
        addComment(this);
    };

    commentBox.append(input, publish);

    post.append(
        header,
        content,
        actions,
        likes,
        description,
        comments,
        commentBox
    );

    document.getElementById("posts").prepend(post);

    document.getElementById("newCaption").value = "";
    document.getElementById("newImage").value = "";

    closeCreate();
}

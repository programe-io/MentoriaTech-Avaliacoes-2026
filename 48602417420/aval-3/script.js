
function likePost(button) {
    const post = button.closest(".post");
    const likes = post.querySelector(".likes");

    let count = Number(likes.dataset.count || 0);
    const liked = button.classList.contains("liked");

    if (liked) {
        count--;
        button.classList.remove("liked");
        button.textContent = "♡";
    } else {
        count++;
        button.classList.add("liked");
        button.textContent = "♥";
    }

    likes.dataset.count = count;
    likes.textContent = count + " curtidas";
}

function focusComment(button) {
    const input = button.closest(".post").querySelector(".comments input");
    input.focus();
}

function sendComment(button) {
    const area = button.closest(".comments");
    const input = area.querySelector("input");
    const text = input.value.trim();

    if (!text) return;

    const comment = document.createElement("p");
    const bold = document.createElement("strong");

    bold.textContent = "Você: ";
    comment.append(bold, document.createTextNode(text));

    area.before(comment);
    input.value = "";
}

function openCreate() {
    const box = document.getElementById("createBox");

    box.style.display =
        box.style.display === "block" ? "none" : "block";

    box.scrollIntoView({ behavior: "smooth" });
}

function createPost() {
    const text = document.getElementById("postText");
    const image = document.getElementById("postImage");

    const content = text.value.trim();
    const imageUrl = image.value.trim();

    if (!content && !imageUrl) {
        alert("Escreva algo ou coloque uma imagem!");
        return;
    }

    if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
        alert("Digite uma URL válida começando com http:// ou https://");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const user = document.createElement("div");
    user.className = "post-user";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";

    const name = document.createElement("strong");
    name.textContent = "seu_usuario";

    const menu = document.createElement("span");
    menu.textContent = "•••";

    user.append(avatar, name, menu);

    post.appendChild(user);

    if (imageUrl) {
        const photo = document.createElement("img");
        photo.className = "post-photo";
        photo.src = imageUrl;
        photo.alt = "Imagem da publicação";
        post.appendChild(photo);
    }

    if (content) {
        const caption = document.createElement("p");
        caption.textContent = content;
        post.appendChild(caption);
    }

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const like = document.createElement("button");
    like.textContent = "♡";
    like.onclick = () => likePost(like);

    const comment = document.createElement("button");
    comment.textContent = "💬";
    comment.onclick = () => focusComment(comment);

    const share = document.createElement("button");
    share.textContent = "↗";

    actions.append(like, comment, share);

    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    const comments = document.createElement("div");
    comments.className = "comments";

    const input = document.createElement("input");
    input.placeholder = "Adicione um comentário...";

    const send = document.createElement("button");
    send.textContent = "Publicar";
    send.onclick = () => sendComment(send);

    comments.append(input, send);

    post.append(actions, likes, comments);

    document.getElementById("feed").prepend(post);

    text.value = "";
    image.value = "";

    document.getElementById("createBox").style.display = "none";
}

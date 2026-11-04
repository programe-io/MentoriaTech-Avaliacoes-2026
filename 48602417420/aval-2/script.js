
function createPost() {
    const input = document.getElementById("postText");
    const text = input.value.trim();

    if (!text) {
        alert("Escreva algo antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const user = document.createElement("div");
    user.className = "user";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";

    const info = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = "Você";

    const date = document.createElement("small");
    date.textContent = "@usuario · agora";

    info.append(name, date);
    user.append(avatar, info);

    const message = document.createElement("p");
    message.textContent = text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const like = document.createElement("button");
    like.textContent = "❤️ Curtir";
    like.onclick = () => likePost(like);

    const comment = document.createElement("button");
    comment.textContent = "💬 Comentar";
    comment.onclick = () => commentPost(comment);

    actions.append(like, comment);

    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    const comments = document.createElement("div");
    comments.className = "comments";

    post.append(user, message, actions, likes, comments);

    document.getElementById("feed").prepend(post);

    input.value = "";
}

function likePost(button) {
    const post = button.closest(".post");
    const likes = post.querySelector(".likes");

    let count = Number(likes.dataset.count || 0);
    const liked = button.dataset.liked === "true";

    count += liked ? -1 : 1;

    button.dataset.liked = liked ? "false" : "true";
    button.textContent = liked ? "❤️ Curtir" : "❤️ Curtido";

    likes.dataset.count = count;
    likes.textContent = count + " curtidas";
}

function commentPost(button) {
    const post = button.closest(".post");
    const area = post.querySelector(".comments");

    if (area.querySelector("input")) return;

    const input = document.createElement("input");
    input.placeholder = "Escreva um comentário...";

    const send = document.createElement("button");
    send.textContent = "Enviar";

    send.onclick = function() {
        const text = input.value.trim();

        if (!text) return;

        const comment = document.createElement("p");
        comment.textContent = "Você: " + text;

        area.appendChild(comment);

        input.remove();
        send.remove();
    };

    area.append(input, send);
}


function createPost() {
    const input = document.getElementById("postText");
    const text = input.value.trim();

    if (text === "") {
        alert("Escreva algo antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "card post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.className = "avatar";
    avatar.src = "https://i.pravatar.cc/150?img=12";

    const info = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = "Alex Silva";

    const time = document.createElement("p");
    time.className = "muted";
    time.textContent = "Agora";

    info.append(name, time);
    header.append(avatar, info);

    const content = document.createElement("p");
    content.textContent = text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const like = document.createElement("button");
    like.innerHTML = '❤️ Curtir <span>0</span>';
    like.onclick = function() {
        likePost(this);
    };

    const comment = document.createElement("button");
    comment.textContent = "💬 Comentar";
    comment.onclick = function() {
        focusComment(this);
    };

    const share = document.createElement("button");
    share.textContent = "🔗 Compartilhar";
    share.onclick = function() {
        sharePost(this);
    };

    actions.append(like, comment, share);

    const comments = document.createElement("div");
    comments.className = "comments";

    const commentBox = document.createElement("div");
    commentBox.className = "comment-box";

    const commentInput = document.createElement("input");
    commentInput.placeholder = "Escreva um comentário...";

    const send = document.createElement("button");
    send.className = "btn";
    send.textContent = "Enviar";
    send.onclick = function() {
        addComment(this);
    };

    commentBox.append(commentInput, send);

    post.append(
        header,
        content,
        actions,
        comments,
        commentBox
    );

    document.getElementById("feed").prepend(post);

    input.value = "";
}

function likePost(button) {
    const count = button.querySelector("span");
    let likes = Number(count.textContent);

    if (button.classList.contains("liked")) {
        likes--;
        button.classList.remove("liked");
    } else {
        likes++;
        button.classList.add("liked");
    }

    count.textContent = likes;
}

function focusComment(button) {
    const box = button.closest(".post")
    .querySelector(".comment-box input");

    box.focus();
}

function addComment(button) {
    const box = button.parentElement;
    const input = box.querySelector("input");
    const text = input.value.trim();

    if (!text) return;

    const comment = document.createElement("p");
    comment.textContent = "💬 " + text;

    const comments = button.closest(".post")
    .querySelector(".comments");

    comments.appendChild(comment);

    input.value = "";
}

function sharePost(button) {
    const post = button.closest(".post");
    const text = post.querySelector("p").textContent;

    if (navigator.share) {
        navigator.share({
            title: "VIBE - Publicação",
            text: text
        }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
        .then(() => alert("Publicação copiada!"))
        .catch(() => alert("Não foi possível copiar."));
    } else {
        alert("Compartilhamento não disponível.");
    }
}

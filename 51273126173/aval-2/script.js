
function createPost() {
    const input = document.getElementById("postText");
    const text = input.value.trim();

    if (!text) {
        alert("Digite algo antes de publicar!");
        return;
    }

    const post = document.createElement("div");
    post.className = "post";

    const user = document.createElement("div");
    user.className = "user";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "EU";

    const info = document.createElement("div");
    info.className = "user-info";

    const name = document.createElement("strong");
    name.textContent = "Você";

    const date = document.createElement("small");
    date.textContent = "Agora";

    info.append(name, date);
    user.append(avatar, info);

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const like = document.createElement("button");
    like.innerHTML = '♡ Curtir <span>0</span>';
    like.onclick = function() {
        likePost(this);
    };

    const commentButton = document.createElement("button");
    commentButton.textContent = "💬 Comentar";
    commentButton.onclick = function() {
        focusComment(this);
    };

    actions.append(like, commentButton);

    const comments = document.createElement("div");
    comments.className = "comments";

    const commentArea = document.createElement("div");
    commentArea.className = "comment-area";

    const commentInput = document.createElement("input");
    commentInput.placeholder = "Escreva um comentário...";

    const send = document.createElement("button");
    send.textContent = "Enviar";
    send.onclick = function() {
        addComment(this);
    };

    commentArea.append(commentInput, send);

    post.append(
        user,
        paragraph,
        actions,
        comments,
        commentArea
    );

    document.getElementById("feed").prepend(post);

    input.value = "";
}

function likePost(button) {
    const count = button.querySelector("span");
    const liked = button.classList.toggle("liked");

    count.textContent =
        Number(count.textContent) + (liked ? 1 : -1);

    button.firstChild.textContent =
        liked ? "♥ Curtido " : "♡ Curtir ";
}

function focusComment(button) {
    const area = button.closest(".post")
        .querySelector(".comment-area input");

    area.focus();
}

function addComment(button) {
    const area = button.closest(".comment-area");
    const input = area.querySelector("input");
    const text = input.value.trim();

    if (!text) return;

    const comment = document.createElement("div");
    comment.className = "comment";

    const strong = document.createElement("strong");
    strong.textContent = "Você: ";

    comment.append(
        strong,
        document.createTextNode(text)
    );

    area.parentElement
        .querySelector(".comments")
        .append(comment);

    input.value = "";
}

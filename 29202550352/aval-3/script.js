
// CURTIR PUBLICAÇÃO
function likePost(button) {
    const post = button.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = Number(
        likes.textContent.match(/\d+/)?.[0] || 0
    );

    const curtido = button.classList.toggle("liked");

    quantidade += curtido ? 1 : -1;

    likes.textContent = quantidade + " curtidas";

    button.style.color = curtido ? "red" : "";
}

// CRIAR PUBLICAÇÃO
function createPost() {
    const text = document.getElementById("postText");
    const image = document.getElementById("postImage");

    if (!text.value.trim()) {
        alert("Escreva uma legenda!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";

    const username = document.createElement("strong");
    username.textContent = "voce";

    header.append(avatar, username);

    const caption = document.createElement("p");
    caption.className = "caption";

    const bold = document.createElement("strong");
    bold.textContent = "voce ";

    caption.append(bold, document.createTextNode(text.value));

    post.append(header);

    // IMAGEM OPCIONAL
    if (image.value.trim()) {
        try {
            const url = new URL(image.value);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error("URL inválida");
            }

            const photo = document.createElement("img");
            photo.className = "post-image";
            photo.src = url.href;
            photo.alt = "Imagem da publicação";
            post.append(photo);
        } catch {
            alert("Digite uma URL de imagem válida!");
            return;
        }
    }

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const like = document.createElement("button");
    like.textContent = "❤️";
    like.onclick = function () {
        likePost(this);
    };

    const comment = document.createElement("button");
    comment.textContent = "💬";
    comment.onclick = function () {
        focusComment(this);
    };

    const share = document.createElement("button");
    share.textContent = "➤";

    const save = document.createElement("button");
    save.textContent = "🔖";
    save.className = "save";

    actions.append(like, comment, share, save);

    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    const comments = document.createElement("div");
    comments.className = "comments";

    const input = document.createElement("input");
    input.className = "comment-input";
    input.placeholder = "Adicione um comentário...";

    input.onkeydown = function (event) {
        if (event.key === "Enter") {
            addComment(this);
        }
    };

    post.append(actions, likes, caption, comments, input);

    document.getElementById("feed").prepend(post);

    text.value = "";
    image.value = "";
}

// COMENTAR
function addComment(input) {
    const texto = input.value.trim();

    if (!texto) return;

    const post = input.closest(".post");
    const comments = post.querySelector(".comments");

    const comentario = document.createElement("p");
    comentario.textContent = "Você: " + texto;

    comments.append(comentario);

    input.value = "";
}

// FOCO NO COMENTÁRIO
function focusComment(button) {
    const post = button.closest(".post");
    post.querySelector(".comment-input").focus();
}

// SEGUIR USUÁRIO
function follow(button) {
    button.textContent =
        button.textContent === "Seguir"
            ? "Seguindo"
            : "Seguir";
}

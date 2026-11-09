
function likePost(button) {
    const post = button.closest(".post");
    const likes = post.querySelector(".likes");

    let count = Number(likes.dataset.count || 0);

    if (button.dataset.liked === "true") {
        count--;
        button.dataset.liked = "false";
        button.textContent = "♡ Curtir";
    } else {
        count++;
        button.dataset.liked = "true";
        button.textContent = "❤️ Curtido";
    }

    likes.dataset.count = count;
    likes.textContent = count + " curtidas";
}

function createPost() {
    const username = document.getElementById("username").value.trim() || "seu_usuario";
    const caption = document.getElementById("caption").value.trim();
    const imageUrl = document.getElementById("imageUrl").value.trim();

    if (!caption) {
        alert("Digite uma legenda!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";

    const name = document.createElement("strong");
    name.textContent = username;

    header.append(avatar, name);
    post.appendChild(header);

    if (imageUrl) {
        try {
            const url = new URL(imageUrl);

            if (!["http:", "https:"].includes(url.protocol)) {
                alert("Use um link de imagem válido.");
                return;
            }

            const img = document.createElement("img");
            img.className = "post-image";
            img.src = url.href;
            img.alt = "Imagem da publicação";
            post.appendChild(img);
        } catch {
            alert("Link da imagem inválido!");
            return;
        }
    }

    const actions = document.createElement("div");
    actions.className = "actions";
    actions.innerHTML = `
        <button onclick="likePost(this)">♡ Curtir</button>
        <button onclick="focusComment(this)">💬 Comentar</button>
    `;

    post.appendChild(actions);

    const text = document.createElement("p");
    text.className = "caption";

    const strong = document.createElement("strong");
    strong.textContent = username;

    text.append(strong, document.createTextNode(" " + caption));
    post.appendChild(text);

    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "0 curtidas";
    post.appendChild(likes);

    const comments = document.createElement("div");
    comments.className = "comments";
    post.appendChild(comments);

    const form = document.createElement("form");
    form.className = "comment-form";
    form.onsubmit = addComment;

    form.innerHTML = `
        <input placeholder="Adicione um comentário..." required>
        <button>Enviar</button>
    `;

    post.appendChild(form);

    document.getElementById("feed").prepend(post);

    document.getElementById("username").value = "";
    document.getElementById("caption").value = "";
    document.getElementById("imageUrl").value = "";
}

function addComment(event) {
    event.preventDefault();

    const input = event.target.querySelector("input");
    const text = input.value.trim();

    if (!text) return;

    const comments = event.target.closest(".post").querySelector(".comments");

    const comment = document.createElement("p");
    comment.textContent = "Você: " + text;

    comments.appendChild(comment);
    input.value = "";
}

function focusComment(button) {
    button.closest(".post").querySelector(".comment-form input").focus();
}

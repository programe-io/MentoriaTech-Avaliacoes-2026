
function likePost(button) {
    const counter = button.querySelector("span");
    let likes = Number(counter.textContent);

    if (button.classList.contains("liked")) {
        likes--;
        button.classList.remove("liked");
    } else {
        likes++;
        button.classList.add("liked");
    }

    counter.textContent = likes;
}

function focusComment(button) {
    const post = button.closest(".post");
    post.querySelector(".comments input").focus();
}

function addComment(button) {
    const comments = button.parentElement;
    const input = comments.querySelector("input");
    const list = comments.querySelector(".comment-list");

    const text = input.value.trim();

    if (text === "") {
        alert("Digite um comentário!");
        return;
    }

    const comment = document.createElement("div");
    comment.className = "comment-item";

    const name = document.createElement("strong");
    name.textContent = "Você: ";

    const message = document.createElement("span");
    message.textContent = text;

    comment.append(name, message);
    list.appendChild(comment);

    input.value = "";
}

function createPost() {
    const text = document.getElementById("postText");
    const image = document.getElementById("postImage");

    if (text.value.trim() === "") {
        alert("Escreva algo antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Minha foto";

    const info = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = "Você";

    const date = document.createElement("small");
    date.textContent = "Agora";

    info.append(title, date);
    header.append(avatar, info);

    const paragraph = document.createElement("p");
    paragraph.textContent = text.value;

    post.append(header, paragraph);

    if (image.value.trim()) {
        try {
            const url = new URL(image.value);

            if (url.protocol !== "https:" && url.protocol !== "http:") {
                throw new Error("URL inválida");
            }

            const photo = document.createElement("img");
            photo.className = "post-image";
            photo.src = url.href;
            photo.alt = "Imagem da publicação";
            post.appendChild(photo);
        } catch {
            alert("Digite um link de imagem válido.");
            return;
        }
    }

    const actions = document.createElement("div");
    actions.className = "post-actions";

    actions.innerHTML = `
        <button onclick="likePost(this)">❤️ <span>0</span></button>
        <button onclick="focusComment(this)">💬 Comentar</button>
        <button onclick="sharePost()">↗ Compartilhar</button>
    `;

    const comments = document.createElement("div");
    comments.className = "comments";

    comments.innerHTML = `
        <input type="text" placeholder="Escreva um comentário...">
        <button onclick="addComment(this)">Enviar</button>
        <div class="comment-list"></div>
    `;

    post.append(actions, comments);

    document.getElementById("feed").prepend(post);

    text.value = "";
    image.value = "";
}

function sharePost() {
    if (navigator.share) {
        navigator.share({
            title: "Social Feed",
            text: "Confira esta publicação!"
        }).catch(() => {});
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}

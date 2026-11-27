
function likePost(button) {
    const post = button.closest(".post");
    const likes = post.querySelector(".likes b");

    let count = Number(likes.textContent);

    if (button.dataset.liked === "true") {
        count--;
        button.dataset.liked = "false";
        button.textContent = "♡";
    } else {
        count++;
        button.dataset.liked = "true";
        button.textContent = "♥";
        button.style.color = "#ff3155";
    }

    likes.textContent = count;
}

function commentPost(button) {
    const post = button.closest(".post");
    const comments = post.querySelector(".comments");

    const message = prompt("Digite seu comentário:");

    if (message && message.trim() !== "") {
        const comment = document.createElement("p");
        comment.textContent = "💬 Você: " + message;
        comments.appendChild(comment);
    }
}

function addPost() {
    const input = document.getElementById("imageInput");

    if (!input.files.length) {
        alert("Escolha uma imagem primeiro!");
        return;
    }

    const file = input.files[0];

    if (!file.type.startsWith("image/")) {
        alert("Selecione um arquivo de imagem!");
        return;
    }

    const imageURL = URL.createObjectURL(file);

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <span>👤 SAGAZ</span>
            <span>•••</span>
        </div>

        <img class="post-image" alt="Nova publicação">

        <div class="actions">
            <button onclick="likePost(this)">♡</button>
            <button onclick="commentPost(this)">💬</button>
        </div>

        <p class="likes">❤️ <b>0</b> curtidas</p>
        <p><b>SAGAZ</b> Nova publicação! 📸</p>
        <div class="comments"></div>
    `;

    post.querySelector(".post-image").src = imageURL;

    const posts = document.getElementById("posts");
    posts.prepend(post);

    document.getElementById("postCount").textContent =
        posts.children.length;

    input.value = "";
    alert("Imagem publicada com sucesso!");
}

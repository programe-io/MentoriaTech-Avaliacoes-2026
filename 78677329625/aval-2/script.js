
// Adicionar nova publicação
function addPost() {
    const text = document.getElementById("postText").value.trim();
    const imageUrl = document.getElementById("imageUrl").value.trim();

    if (text === "") {
        alert("Digite algo antes de publicar!");
        return;
    }

    const posts = document.getElementById("posts");

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=12"
                alt="Perfil">
            <div>
                <h3>Você</h3>
                <small>Agora mesmo</small>
            </div>
        </div>

        <p></p>

        ${imageUrl ? `
            <img class="post-image" alt="Imagem da publicação">
        ` : ""}

        <div class="actions">
            <button onclick="likePost(this)">❤️ Curtir</button>
            <button onclick="commentPost(this)">💬 Comentar</button>
            <button onclick="sharePost()">↗ Compartilhar</button>
        </div>

        <span class="likes">0 curtidas</span>
    `;

    post.querySelector("p").textContent = text;

    if (imageUrl) {
        const img = post.querySelector(".post-image");
        img.src = imageUrl;
    }

    posts.prepend(post);

    document.getElementById("postText").value = "";
    document.getElementById("imageUrl").value = "";
}

// Curtir publicação
function likePost(button) {
    const post = button.closest(".post");
    const likes = post.querySelector(".likes");

    let count = Number(likes.dataset.count || 0);

    if (button.dataset.liked === "true") {
        count--;
        button.dataset.liked = "false";
        button.innerHTML = "❤️ Curtir";
    } else {
        count++;
        button.dataset.liked = "true";
        button.innerHTML = "💙 Curtido";
    }

    likes.dataset.count = count;
    likes.textContent = count + (count === 1 ? " curtida" : " curtidas");
}

// Comentar publicação
function commentPost(button) {
    const comment = prompt("Digite seu comentário:");

    if (comment && comment.trim() !== "") {
        const post = button.closest(".post");

        const commentElement = document.createElement("p");
        commentElement.className = "comment";
        commentElement.style.marginTop = "12px";
        commentElement.style.padding = "10px";
        commentElement.style.background = "#f0f2f5";
        commentElement.style.borderRadius = "8px";

        commentElement.textContent = "Você: " + comment.trim();

        post.appendChild(commentElement);
    }
}

// Compartilhar publicação
function sharePost() {
    if (navigator.share) {
        navigator.share({
            title: "MiniFeed",
            text: "Confira esta publicação!"
        }).catch(() => {});
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}

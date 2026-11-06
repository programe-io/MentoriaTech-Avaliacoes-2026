
const feed = document.getElementById("feed");

// CURTIR PUBLICAÇÃO

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("like")) {
        const button = event.target;
        const post = button.closest(".post");
        const likes = post.querySelector(".likes");

        let count = parseInt(likes.textContent);

        if (button.classList.contains("liked")) {
            button.classList.remove("liked");
            button.textContent = "♡";
            count--;
        } else {
            button.classList.add("liked");
            button.textContent = "♥";
            count++;
        }

        likes.textContent = count + " curtidas";
    }
});

// ADICIONAR COMENTÁRIO

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("send-comment")) {
        const post = event.target.closest(".post");
        const input = post.querySelector(".comment-box input");
        const comments = post.querySelector(".comments");

        const text = input.value.trim();

        if (text === "") {
            alert("Digite um comentário!");
            return;
        }

        const comment = document.createElement("p");
        const username = document.createElement("strong");

        username.textContent = "voce ";
        comment.appendChild(username);
        comment.appendChild(document.createTextNode(text));

        comments.appendChild(comment);

        input.value = "";
    }
});

// CURTIR COM DOIS CLIQUES NA FOTO

document.addEventListener("dblclick", function(event) {
    if (event.target.classList.contains("post-image")) {
        const post = event.target.closest(".post");
        const likeButton = post.querySelector(".like");

        if (!likeButton.classList.contains("liked")) {
            likeButton.click();
        }
    }
});

// CRIAR PUBLICAÇÃO

document.getElementById("newPost").addEventListener("click", function(event) {
    event.preventDefault();

    const imageUrl = prompt("Cole o link da imagem:");

    if (!imageUrl || !imageUrl.trim()) return;

    try {
        const url = new URL(imageUrl.trim());

        if (!["http:", "https:"].includes(url.protocol)) {
            alert("Insira um link HTTP ou HTTPS válido!");
            return;
        }

        const post = document.createElement("article");
        post.className = "post";

        post.innerHTML = `
            <div class="post-header">
                <img src="https://i.pravatar.cc/100?img=12">
                <strong>voce</strong>
                <span>•••</span>
            </div>

            <img class="post-image" alt="Nova publicação">

            <div class="post-actions">
                <button class="like">♡</button>
                <button>💬</button>
                <button>➤</button>
                <button class="save">♧</button>
            </div>

            <div class="post-info">
                <strong class="likes">0 curtidas</strong>
                <p><strong>voce</strong> Minha nova publicação! 📸</p>
                <div class="comments"></div>
                <small>AGORA</small>
            </div>

            <div class="comment-box">
                <input type="text" placeholder="Adicione um comentário...">
                <button class="send-comment">Publicar</button>
            </div>
        `;

        post.querySelector(".post-image").src = url.href;

        feed.prepend(post);

    } catch {
        alert("Link de imagem inválido!");
    }
});

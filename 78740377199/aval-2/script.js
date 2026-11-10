
// Função para curtir publicação
function likePost(button) {
    const counter = button.querySelector("span");

    let likes = Number(counter.textContent);

    likes++;

    counter.textContent = likes;
}

// Função para criar publicação
function createPost() {
    const text = document.getElementById("postText").value;
    const imageUrl = document.getElementById("imageUrl").value;

    if (text.trim() === "") {
        alert("Digite algo antes de publicar!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.classList.add("post");

    post.innerHTML = `
        <div class="post-header">
            <div class="avatar">V</div>
            <div>
                <h3>Você</h3>
                <small>Agora mesmo</small>
            </div>
        </div>

        <p>${escapeHTML(text)}</p>

        ${imageUrl.trim() !== "" ? `
            <img
                class="post-image"
                src="${escapeHTML(imageUrl)}"
                alt="Imagem da publicação"
                onerror="this.style.display='none'"
            >
        ` : ""}

        <div class="actions">
            <button onclick="likePost(this)">
                ❤️ Curtir <span>0</span>
            </button>

            <button onclick="commentPost()">
                💬 Comentar
            </button>

            <button onclick="sharePost()">
                🔗 Compartilhar
            </button>
        </div>
    `;

    feed.prepend(post);

    document.getElementById("postText").value = "";
    document.getElementById("imageUrl").value = "";
}

// Protege o conteúdo de texto inserido pelo usuário
function escapeHTML(value) {
    return value.replace(/[&<>"']/g, function(char) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];
    });
}

// Função de comentário
function commentPost() {
    const comment = prompt("Digite seu comentário:");

    if (comment && comment.trim() !== "") {
        alert("Comentário enviado: " + comment);
    }
}

// Função de compartilhamento
function sharePost() {
    alert("Publicação compartilhada com sucesso!");
}

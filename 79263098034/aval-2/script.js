
// Adicionar uma nova publicação
function addPost() {
    const textArea = document.getElementById("postText");
    const feed = document.getElementById("feed");

    const text = textArea.value.trim();

    if (text === "") {
        alert("Digite algo antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="user">
            <img src="https://i.pravatar.cc/100?img=11"
                 alt="Foto do usuário">
            <div>
                <h3>Você</h3>
                <small>Agora mesmo</small>
            </div>
        </div>

        <p></p>

        <div class="actions">
            <button onclick="likePost(this)">
                ❤️ Curtir <span>0</span>
            </button>
            <button onclick="commentPost()">💬 Comentar</button>
            <button onclick="sharePost()">🔗 Compartilhar</button>
        </div>
    `;

    // Insere o texto com segurança
    post.querySelector("p").textContent = text;

    // Coloca a publicação no início do feed
    feed.prepend(post);

    textArea.value = "";
}

// Curtir publicação
function likePost(button) {
    const counter = button.querySelector("span");
    let likes = Number(counter.textContent);

    likes++;
    counter.textContent = likes;

    button.style.color = "#1877f2";
}

// Comentar
function commentPost() {
    const comment = prompt("Digite seu comentário:");

    if (comment && comment.trim() !== "") {
        alert("Comentário enviado: " + comment);
    }
}

// Compartilhar
function sharePost() {
    if (navigator.share) {
        navigator.share({
            title: "MiniFeed",
            text: "Confira esta publicação no MiniFeed!"
        }).catch(() => {});
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}

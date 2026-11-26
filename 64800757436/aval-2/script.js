
// CURTIR PUBLICAÇÃO
function likePost(button) {
    button.classList.toggle("liked");

    button.textContent =
        button.classList.contains("liked")
        ? "👍 Curtido"
        : "👍 Curtir";
}

// ADICIONAR COMENTÁRIO
function addComment(button) {
    const box = button.parentElement;
    const input = box.querySelector("input");
    const texto = input.value.trim();

    if (!texto) return;

    const comments = box.previousElementSibling;

    const comment = document.createElement("div");
    comment.className = "comment";
    comment.textContent = "👤 Você: " + texto;

    comments.appendChild(comment);
    input.value = "";
}

// ABRIR CAMPO DE COMENTÁRIO
function focusComment(button) {
    const post = button.closest(".card");
    post.querySelector(".comment-box input").focus();
}

// CRIAR PUBLICAÇÃO
function createPost() {
    const input = document.getElementById("postInput");
    const texto = input.value.trim();

    if (!texto) {
        alert("Escreva algo antes de publicar!");
        return;
    }

    const post = document.createElement("div");
    post.className = "card";

    post.innerHTML = `
        <div class="post-header">
            <div class="avatar">EU</div>
            <div>
                <strong>Você</strong><br>
                <small>Agora · 🌎</small>
            </div>
        </div>

        <div class="post-text"></div>

        <div class="actions">
            <button onclick="likePost(this)">👍 Curtir</button>
            <button onclick="focusComment(this)">💬 Comentar</button>
            <button onclick="sharePost()">↗ Compartilhar</button>
        </div>

        <div class="comments"></div>

        <div class="comment-box">
            <input placeholder="Escreva um comentário...">
            <button onclick="addComment(this)">Enviar</button>
        </div>
    `;

    post.querySelector(".post-text").textContent = texto;

    document.getElementById("feed").prepend(post);

    input.value = "";
}

// COMPARTILHAR
function sharePost() {
    alert("Compartilhamento demonstrativo!");
}

// PESQUISAR
document.querySelector(".search").addEventListener("input", function() {
    const pesquisa = this.value.toLowerCase();

    document.querySelectorAll("#feed .card").forEach(post => {
        post.style.display =
            post.textContent.toLowerCase().includes(pesquisa)
            ? "block"
            : "none";
    });
});
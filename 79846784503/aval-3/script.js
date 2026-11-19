
const feed = document.getElementById("feed");

// Sistema de curtidas
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("like")) {
        const button = event.target;
        const post = button.closest(".post");
        const likes = post.querySelector(".likes");

        let count = parseInt(likes.textContent);

        if (button.classList.contains("active")) {
            button.classList.remove("active");
            button.textContent = "♡";
            count--;
        } else {
            button.classList.add("active");
            button.textContent = "♥";
            count++;
        }

        likes.textContent = count + " curtidas";
    }
});

// Criar publicação
document.getElementById("createBtn").addEventListener("click", function(event) {
    event.preventDefault();

    const image = prompt("Digite o link da imagem:");
    
    if (!image) return;

    const caption = prompt("Digite a legenda da publicação:") || "";

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=12">
            <strong>seu_perfil</strong>
            <span>•••</span>
        </div>

        <img class="post-image" src="${escapeHTML(image)}"
             onerror="this.alt='Não foi possível carregar a imagem'">

        <div class="actions">
            <button class="like">♡</button>
            <button>💬</button>
            <button>➤</button>
            <button class="save">♧</button>
        </div>

        <div class="post-info">
            <strong class="likes">0 curtidas</strong>
            <p><strong>seu_perfil</strong> ${escapeHTML(caption)}</p>
        </div>
    `;

    feed.prepend(post);
});

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

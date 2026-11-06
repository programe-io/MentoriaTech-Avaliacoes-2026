
const posts = document.querySelector("#posts");

// CURTIR PUBLICAÇÕES
posts.addEventListener("click", function(event) {
    if (event.target.classList.contains("like-btn")) {
        const button = event.target;
        const post = button.closest(".post");
        const likes = post.querySelector(".likes");

        let quantidade = parseInt(
            likes.textContent.replace(/\D/g, "")
        );

        if (button.classList.contains("liked")) {
            button.classList.remove("liked");
            button.textContent = "♡";
            quantidade--;
        } else {
            button.classList.add("liked");
            button.textContent = "♥";
            quantidade++;
        }

        likes.textContent = quantidade + " curtidas";
    }
});

// COMENTAR
posts.addEventListener("submit", function(event) {
    if (event.target.classList.contains("comment-form")) {
        event.preventDefault();

        const form = event.target;
        const input = form.querySelector("input");
        const texto = input.value.trim();

        if (texto === "") {
            return;
        }

        const post = form.closest(".post");
        const comments = post.querySelector(".comments");

        const novoComentario = document.createElement("p");
        novoComentario.classList.add("comment");

        const usuario = document.createElement("strong");
        usuario.textContent = "gabriel.dev ";

        novoComentario.appendChild(usuario);
        novoComentario.appendChild(
            document.createTextNode(texto)
        );

        comments.appendChild(novoComentario);

        input.value = "";
    }
});

// SEGUIR PERFIS
document.querySelectorAll(".follow-btn").forEach(button => {
    button.addEventListener("click", function() {
        if (button.textContent === "Seguir") {
            button.textContent = "Seguindo";
            button.style.color = "#262626";
        } else {
            button.textContent = "Seguir";
            button.style.color = "#0095f6";
        }
    });
});

// CRIAR PUBLICAÇÃO
document.querySelector("#createBtn").addEventListener("click", function(event) {
    event.preventDefault();

    const url = prompt("Cole o link da imagem:");
    const legenda = prompt("Digite a legenda:");

    if (!url || !url.trim()) {
        return;
    }

    const post = document.createElement("article");
    post.classList.add("post");

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=12">
            <strong>gabriel.dev</strong>
            <span>•••</span>
        </div>

        <img class="post-image" src="${url}">

        <div class="post-actions">
            <button class="like-btn">♡</button>
            <button class="comment-btn">💬</button>
            <button>➤</button>
            <button class="save-btn">♧</button>
        </div>

        <div class="post-content">
            <strong class="likes">0 curtidas</strong>

            <p>
                <strong>gabriel.dev</strong>
                ${legenda || ""}
            </p>

            <div class="comments"></div>

            <form class="comment-form">
                <input type="text"
                    placeholder="Adicione um comentário...">

                <button type="submit">Publicar</button>
            </form>
        </div>
    `;

    posts.prepend(post);
});

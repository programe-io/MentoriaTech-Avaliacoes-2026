
// Sistema de curtidas
document.querySelectorAll(".like").forEach(button => {
    button.addEventListener("click", () => {
        const post = button.closest(".post");
        const likes = post.querySelector(".likes");

        let quantidade = parseInt(likes.textContent.replace(/\D/g, ""));

        if (button.classList.contains("active")) {
            button.classList.remove("active");
            button.textContent = "♡";
            quantidade--;
        } else {
            button.classList.add("active");
            button.textContent = "♥";
            quantidade++;
        }

        likes.textContent = quantidade.toLocaleString("pt-BR") + " curtidas";
    });
});

// Sistema de comentários
document.querySelectorAll(".comment-form").forEach(form => {
    form.addEventListener("submit", event => {
        event.preventDefault();

        const input = form.querySelector("input");
        const comentario = input.value.trim();

        if (comentario === "") return;

        const novoComentario = document.createElement("p");
        novoComentario.textContent = comentario;

        form.before(novoComentario);

        input.value = "";
    });
});

// Criar publicação
document.getElementById("createPost").addEventListener("click", event => {
    event.preventDefault();

    const imagem = prompt("Digite o endereço da imagem:");
    if (!imagem) return;

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=1">
            <strong>seu_perfil</strong>
            <span>•••</span>
        </div>

        <img class="post-image">

        <div class="post-actions">
            <button class="like">♡</button>
            <button>💬</button>
            <button>➤</button>
            <button class="save">♧</button>
        </div>

        <div class="post-info">
            <strong class="likes">0 curtidas</strong>
            <p><strong>seu_perfil</strong> Minha nova publicação!</p>
        </div>
    `;

    post.querySelector(".post-image").src = imagem;

    post.querySelector(".like").addEventListener("click", () => {
        const button = post.querySelector(".like");
        const likes = post.querySelector(".likes");
        const active = button.classList.toggle("active");

        button.textContent = active ? "♥" : "♡";
        likes.textContent = (active ? 1 : 0) + " curtidas";
    });

    document.getElementById("feed").prepend(post);
});

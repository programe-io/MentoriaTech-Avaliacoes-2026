
// CRIAR PUBLICAÇÃO
function publishPost() {
    const input = document.getElementById("newPost");
    const text = input.value.trim();

    if (!text) {
        alert("Escreva algo antes de publicar!");
        return;
    }

    const post = document.createElement("div");
    post.className = "card";

    // Perfil
    const profile = document.createElement("div");
    profile.className = "profile";

    profile.innerHTML = `
        <img class="avatar"
        src="https://i.pravatar.cc/100?img=11">

        <div>
            <div class="name">Você</div>
            <div class="time">Agora</div>
        </div>
    `;

    // Texto
    const paragraph = document.createElement("p");
    paragraph.className = "post-text";
    paragraph.textContent = text;

    // Botões
    const actions = document.createElement("div");
    actions.className = "actions";

    actions.innerHTML = `
        <button onclick="likePost(this)">
            ❤️ Curtir <span>0</span>
        </button>

        <button onclick="toggleComments(this)">
            💬 Comentar
        </button>

        <button onclick="sharePost(this)">
            ↗ Compartilhar
        </button>
    `;

    // Área de comentários
    const comments = document.createElement("div");
    comments.className = "comments";

    comments.innerHTML = `
        <input
            placeholder="Escreva um comentário..."
            onkeydown="addComment(event, this)"
        >

        <div class="comment-list"></div>
    `;

    // Montar publicação
    post.appendChild(profile);
    post.appendChild(paragraph);
    post.appendChild(actions);
    post.appendChild(comments);

    document.getElementById("feed")
        .prepend(post);

    input.value = "";
}


// CURTIR PUBLICAÇÃO
function likePost(button) {
    const count = button.querySelector("span");

    if (button.classList.contains("liked")) {
        button.classList.remove("liked");

        count.textContent =
            Number(count.textContent) - 1;

    } else {
        button.classList.add("liked");

        count.textContent =
            Number(count.textContent) + 1;
    }
}


// MOSTRAR COMENTÁRIOS
function toggleComments(button) {
    const card = button.closest(".card");

    const comments =
        card.querySelector(".comments");

    comments.style.display =
        comments.style.display === "block"
        ? "none"
        : "block";
}


// ADICIONAR COMENTÁRIO
function addComment(event, input) {
    if (
        event.key === "Enter" &&
        input.value.trim() !== ""
    ) {
        const comment =
            document.createElement("p");

        comment.textContent =
            "👤 Você: " + input.value.trim();

        comment.style.marginBottom = "10px";

        const list =
            input.nextElementSibling;

        list.appendChild(comment);

        input.value = "";
    }
}


// COMPARTILHAR PUBLICAÇÃO
function sharePost(button) {
    const card = button.closest(".card");

    const text =
        card.querySelector(".post-text").textContent;

    if (navigator.share) {
        navigator.share({
            title: "Meu Social",
            text: text
        }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert("Publicação copiada!");
            })
            .catch(() => {
                alert("Não foi possível copiar.");
            });
    } else {
        alert("Compartilhamento não disponível.");
    }
}

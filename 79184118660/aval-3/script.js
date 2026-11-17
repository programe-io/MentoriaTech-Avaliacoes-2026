
// MODO ESCURO

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    themeButton.textContent =
        document.body.classList.contains("dark")
        ? "☀️ Modo claro"
        : "🌙 Modo escuro";
});


// CURTIR PUBLICAÇÃO

function activateLike(button) {
    button.classList.toggle("liked");

    button.textContent =
        button.classList.contains("liked") ? "♥" : "♡";
}

document.querySelectorAll(".like").forEach(button => {
    button.addEventListener("click", () => {
        activateLike(button);
    });
});


// COMENTÁRIOS

document.querySelectorAll(".comment-input").forEach(input => {

    input.addEventListener("keydown", event => {

        if (event.key === "Enter" && input.value.trim() !== "") {

            const commentArea =
                input.parentElement.querySelector(".comments");

            const comment = document.createElement("p");

            const username = document.createElement("strong");
            username.textContent = "seu_usuario ";

            comment.appendChild(username);
            comment.appendChild(
                document.createTextNode(input.value.trim())
            );

            commentArea.appendChild(comment);

            input.value = "";
        }

    });

});


// ABRIR MODAL DE PUBLICAÇÃO

const modal = document.getElementById("postModal");

document.getElementById("createPost").addEventListener("click", event => {
    event.preventDefault();
    modal.style.display = "flex";
});

document.getElementById("closeModal").addEventListener("click", () => {
    modal.style.display = "none";
});


// CRIAR PUBLICAÇÃO

document.getElementById("publishButton").addEventListener("click", () => {

    const imageUrl = document.getElementById("imageUrl").value.trim();
    const caption = document.getElementById("caption").value.trim();

    if (!imageUrl || !caption) {
        alert("Adicione uma imagem e uma legenda!");
        return;
    }

    try {
        const url = new URL(imageUrl);

        if (!["https:", "http:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }

        const feed = document.getElementById("feed");

        const post = document.createElement("article");
        post.className = "post";

        const header = document.createElement("div");
        header.className = "post-header";

        const avatar = document.createElement("img");
        avatar.src = "https://i.pravatar.cc/100?img=12";
        avatar.alt = "Foto de perfil";

        const username = document.createElement("strong");
        username.textContent = "seu_usuario";

        header.append(avatar, username);

        const image = document.createElement("img");
        image.className = "post-image";
        image.src = url.href;
        image.alt = "Imagem da publicação";

        image.onerror = () => {
            alert("Não foi possível carregar a imagem.");
            post.remove();
        };

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const like = document.createElement("button");
        like.className = "like";
        like.textContent = "♡";

        like.addEventListener("click", () => {
            activateLike(like);
        });

        actions.append(like);

        const info = document.createElement("div");
        info.className = "post-info";

        const text = document.createElement("p");

        const author = document.createElement("strong");
        author.textContent = "seu_usuario ";

        text.append(author, document.createTextNode(caption));

        const comments = document.createElement("div");
        comments.className = "comments";

        const input = document.createElement("input");
        input.className = "comment-input";
        input.placeholder = "Adicione um comentário...";

        input.addEventListener("keydown", event => {
            if (event.key === "Enter" && input.value.trim()) {
                const comment = document.createElement("p");
                const name = document.createElement("strong");
                name.textContent = "seu_usuario ";

                comment.append(name, document.createTextNode(input.value.trim()));
                comments.appendChild(comment);
                input.value = "";
            }
        });

        info.append(text, comments, input);
        post.append(header, image, actions, info);

        feed.prepend(post);

        document.getElementById("imageUrl").value = "";
        document.getElementById("caption").value = "";

        modal.style.display = "none";

    } catch {
        alert("Digite um link válido de imagem!");
    }

});

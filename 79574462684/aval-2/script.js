
// CURTIDAS
document.querySelectorAll(".like").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("liked");

        button.textContent = button.classList.contains("liked")
            ? "♥ Curtido"
            : "♡ Curtir";
    });
});

// COMENTÁRIOS, EDIÇÃO E EXCLUSÃO
document.querySelectorAll(".post").forEach(post => {
    const input = post.querySelector(".comment-box input");
    const send = post.querySelector(".send");
    const comments = post.querySelector(".comments");

    function addComment() {
        const value = input.value.trim();

        if (!value) {
            alert("Escreva um comentário! ♡");
            return;
        }

        const comment = document.createElement("div");
        comment.className = "comment";

        const name = document.createElement("strong");
        name.textContent = "Você ♡";

        const text = document.createElement("p");
        text.textContent = value;

        const edit = document.createElement("button");
        edit.textContent = "✏️ Editar";

        const remove = document.createElement("button");
        remove.textContent = "🗑️ Excluir";

        edit.addEventListener("click", () => {
            const updated = prompt("Edite seu comentário:", text.textContent);

            if (updated !== null && updated.trim()) {
                text.textContent = updated.trim();
            }
        });

        remove.addEventListener("click", () => {
            if (confirm("Deseja excluir este comentário?")) {
                comment.remove();
            }
        });

        comment.append(name, text, edit, remove);
        comments.appendChild(comment);

        input.value = "";
    }

    send.addEventListener("click", addComment);

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") addComment();
    });

    post.querySelector(".focus").addEventListener("click", () => {
        input.focus();
    });
});

// COMPARTILHAR
document.querySelectorAll(".share").forEach(button => {
    button.addEventListener("click", async () => {
        const post = button.closest(".post");
        const title = post.querySelector("h3").textContent;
        const description = post.querySelector(".post-body p").textContent;

        try {
            await navigator.clipboard.writeText(
                title + "\n" + description + "\nMy Window ♡"
            );

            alert("Publicação copiada para compartilhar!");
        } catch {
            alert("Não foi possível copiar o texto.");
        }
    });
});

// CRIAR PUBLICAÇÕES
document.querySelector("#publish").addEventListener("click", () => {
    const title = document.querySelector("#post-title").value.trim();
    const description = document.querySelector("#post-description").value.trim();
    const image = document.querySelector("#post-image").value.trim();

    if (!title || !description) {
        alert("Preencha o título e a descrição!");
        return;
    }

    if (image && !/^https?:\/\/\S+$/i.test(image)) {
        alert("Informe um link de imagem válido.");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "V";

    const user = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = "Visitante";

    const username = document.createElement("small");
    username.textContent = "@mywindow";

    user.append(name, username);
    header.append(avatar, user);

    if (image) {
        const img = document.createElement("img");
        img.className = "post-img";
        img.src = image;
        img.alt = "Imagem da publicação";
        post.append(header, img);
    } else {
        post.append(header);
    }

    const body = document.createElement("div");
    body.className = "post-body";

    const heading = document.createElement("h3");
    heading.textContent = title;

    const paragraph = document.createElement("p");
    paragraph.textContent = description;

    const actions = document.createElement("div");
    actions.className = "actions";

    const like = document.createElement("button");
    like.className = "like";
    like.textContent = "♡ Curtir";

    const focus = document.createElement("button");
    focus.className = "focus";
    focus.textContent = "💬 Comentar";

    const share = document.createElement("button");
    share.className = "share";
    share.textContent = "↗ Compartilhar";

    actions.append(like, focus, share);

    const comments = document.createElement("div");
    comments.className = "comments";

    const box = document.createElement("div");
    box.className = "comment-box";

    const input = document.createElement("input");
    input.placeholder = "Deixe seu comentário...";

    const send = document.createElement("button");
    send.className = "send";
    send.textContent = "Enviar";

    box.append(input, send);
    body.append(heading, paragraph, actions, comments, box);
    post.append(body);

    document.querySelector(".feed").prepend(post);

    // EVENTOS DA NOVA PUBLICAÇÃO
    like.addEventListener("click", () => {
        like.classList.toggle("liked");
        like.textContent = like.classList.contains("liked")
            ? "♥ Curtido"
            : "♡ Curtir";
    });

    function addNewComment() {
        const value = input.value.trim();
        if (!value) return;

        const comment = document.createElement("div");
        comment.className = "comment";

        const commentName = document.createElement("strong");
        commentName.textContent = "Você ♡";

        const commentText = document.createElement("p");
        commentText.textContent = value;

        const edit = document.createElement("button");
        edit.textContent = "✏️ Editar";
        edit.addEventListener("click", () => {
            const updated = prompt("Edite:", commentText.textContent);
            if (updated !== null && updated.trim()) {
                commentText.textContent = updated.trim();
            }
        });

        const remove = document.createElement("button");
        remove.textContent = "🗑️ Excluir";
        remove.addEventListener("click", () => comment.remove());

        comment.append(commentName, commentText, edit, remove);
        comments.appendChild(comment);
        input.value = "";
    }

    send.addEventListener("click", addNewComment);

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") addNewComment();
    });

    focus.addEventListener("click", () => input.focus());

    share.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(title + "\n" + description);
            alert("Publicação copiada!");
        } catch {
            alert("Não foi possível copiar.");
        }
    });

    document.querySelector("#post-title").value = "";
    document.querySelector("#post-description").value = "";
    document.querySelector("#post-image").value = "";

    alert("Sua publicação foi criada! ♡");

    document.querySelector("#feed").scrollIntoView({
        behavior: "smooth"
    });
});

console.log("♡ My Window Social iniciado!");

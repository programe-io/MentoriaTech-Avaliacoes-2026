
document.querySelectorAll(".post").forEach(post => {

    // Sistema de curtidas
    const likeButton = post.querySelector(".like");

    likeButton.addEventListener("click", () => {
        const count = likeButton.querySelector("span");
        let likes = Number(count.textContent);

        if (likeButton.classList.toggle("active")) {
            likes++;
            likeButton.firstChild.textContent = "♥ Curtido ";
        } else {
            likes--;
            likeButton.firstChild.textContent = "♡ Curtir ";
        }

        count.textContent = likes;
    });

    // Abrir campo de comentários
    const input = post.querySelector("input");
    post.querySelector(".comment-focus").addEventListener("click", () => {
        input.focus();
    });

    // Adicionar comentários
    const sendButton = post.querySelector(".send-comment");
    const commentList = post.querySelector(".comment-list");

    function addComment() {
        const message = input.value.trim();

        if (!message) {
            alert("Digite um comentário primeiro!");
            return;
        }

        const comment = document.createElement("div");
        comment.className = "comment-item";

        const author = document.createElement("strong");
        author.textContent = "Você";

        const paragraph = document.createElement("p");
        paragraph.textContent = message;

        const edit = document.createElement("button");
        edit.textContent = "✏️ Editar";

        const remove = document.createElement("button");
        remove.textContent = "🗑️ Excluir";

        edit.addEventListener("click", () => {
            const newMessage = prompt("Edite seu comentário:", paragraph.textContent);

            if (newMessage && newMessage.trim()) {
                paragraph.textContent = newMessage.trim();
            }
        });

        remove.addEventListener("click", () => {
            comment.remove();
        });

        comment.append(author, paragraph, edit, remove);
        commentList.appendChild(comment);

        input.value = "";
    }

    sendButton.addEventListener("click", addComment);

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            addComment();
        }
    });

    // Compartilhamento
    post.querySelector(".share").addEventListener("click", async () => {
        const title = post.querySelector("h3").textContent;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: "Economia Connect",
                    text: title,
                    url: location.href
                });
            } else {
                await navigator.clipboard.writeText(
                    title + " - Economia Connect"
                );
                alert("Publicação copiada!");
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                alert("Não foi possível compartilhar.");
            }
        }
    });

});

document.querySelectorAll(".post").forEach(post => {

    // Sistema de curtidas
    const likeButton = post.querySelector(".like");

    likeButton.addEventListener("click", () => {
        const count = likeButton.querySelector("span");
        let likes = Number(count.textContent);

        if (likeButton.classList.toggle("active")) {
            likes++;
            likeButton.firstChild.textContent = "♥ Curtido ";
        } else {
            likes--;
            likeButton.firstChild.textContent = "♡ Curtir ";
        }

        count.textContent = likes;
    });

    // Abrir campo de comentários
    const input = post.querySelector("input");
    post.querySelector(".comment-focus").addEventListener("click", () => {
        input.focus();
    });

    // Adicionar comentários
    const sendButton = post.querySelector(".send-comment");
    const commentList = post.querySelector(".comment-list");

    function addComment() {
        const message = input.value.trim();

        if (!message) {
            alert("Digite um comentário primeiro!");
            return;
        }

        const comment = document.createElement("div");
        comment.className = "comment-item";

        const author = document.createElement("strong");
        author.textContent = "Você";

        const paragraph = document.createElement("p");
        paragraph.textContent = message;

        const edit = document.createElement("button");
        edit.textContent = "✏️ Editar";

        const remove = document.createElement("button");
        remove.textContent = "🗑️ Excluir";

        edit.addEventListener("click", () => {
            const newMessage = prompt("Edite seu comentário:", paragraph.textContent);

            if (newMessage && newMessage.trim()) {
                paragraph.textContent = newMessage.trim();
            }
        });

        remove.addEventListener("click", () => {
            comment.remove();
        });

        comment.append(author, paragraph, edit, remove);
        commentList.appendChild(comment);

        input.value = "";
    }

    sendButton.addEventListener("click", addComment);

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            addComment();
        }
    });

    // Compartilhamento
    post.querySelector(".share").addEventListener("click", async () => {
        const title = post.querySelector("h3").textContent;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: "Economia Connect",
                    text: title,
                    url: location.href
                });
            } else {
                await navigator.clipboard.writeText(
                    title + " - Economia Connect"
                );
                alert("Publicação copiada!");
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                alert("Não foi possível compartilhar.");
            }
        }
    });

});

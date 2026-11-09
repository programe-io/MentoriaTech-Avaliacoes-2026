
// CURTIR PUBLICAÇÕES
document.querySelectorAll(".like-btn").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {
            button.innerHTML = "♥ <span> Curtido</span>";
        } else {
            button.innerHTML = "♡ <span> Curtir</span>";
        }
    });
});

// ADICIONAR COMENTÁRIOS
document.querySelectorAll(".post").forEach(post => {
    const input = post.querySelector(".comment-box input");
    const sendButton = post.querySelector(".send-comment");
    const commentsArea = post.querySelector(".comments");

    function addComment() {
        const text = input.value.trim();

        if (text === "") {
            alert("Digite um comentário primeiro!");
            return;
        }

        const comment = document.createElement("div");
        comment.className = "comment";

        const name = document.createElement("strong");
        name.textContent = "Você";

        const paragraph = document.createElement("p");
        paragraph.textContent = text;

        const editButton = document.createElement("button");
        editButton.textContent = "✏️ Editar";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️ Excluir";

        // EDITAR COMENTÁRIO
        editButton.addEventListener("click", () => {
            const newText = prompt("Edite seu comentário:", paragraph.textContent);

            if (newText !== null && newText.trim() !== "") {
                paragraph.textContent = newText.trim();
            }
        });

        // EXCLUIR COMENTÁRIO
        deleteButton.addEventListener("click", () => {
            if (confirm("Deseja excluir este comentário?")) {
                comment.remove();
            }
        });

        comment.append(name, paragraph, editButton, deleteButton);
        commentsArea.appendChild(comment);

        input.value = "";
    }

    sendButton.addEventListener("click", addComment);

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            addComment();
        }
    });

    // FOCAR NO CAMPO DE COMENTÁRIO
    post.querySelector(".comment-focus").addEventListener("click", () => {
        input.focus();
    });
});

// COMPARTILHAR PUBLICAÇÕES
document.querySelectorAll(".share-btn").forEach(button => {
    button.addEventListener("click", async () => {
        const post = button.closest(".post");
        const title = post.querySelector("h3").textContent;

        try {
            await navigator.clipboard.writeText(
                title + " — Confira no iPhone Social!"
            );

            alert("Publicação copiada para compartilhar!");
        } catch (error) {
            alert("Não foi possível copiar. Verifique a permissão do navegador.");
        }
    });
});

console.log("🍎 iPhone Social iniciado com sucesso!");

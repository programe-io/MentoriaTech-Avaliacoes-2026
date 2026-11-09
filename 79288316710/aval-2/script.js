
// SISTEMA DE CURTIDAS
document.querySelectorAll(".like").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("liked");

        button.textContent = button.classList.contains("liked")
            ? "♥ Curtido!"
            : "♡ Curtir";
    });
});

// SISTEMA DE COMENTÁRIOS
document.querySelectorAll(".post").forEach(post => {
    const input = post.querySelector(".comment-box input");
    const send = post.querySelector(".send");
    const comments = post.querySelector(".comments");

    function addComment() {
        const value = input.value.trim();

        if (!value) {
            alert("Escreva um comentário! 💗");
            return;
        }

        const comment = document.createElement("div");
        comment.className = "comment";

        const name = document.createElement("strong");
        name.textContent = "🌸 Você";

        const text = document.createElement("p");
        text.textContent = value;

        const edit = document.createElement("button");
        edit.textContent = "✏️ Editar";

        const remove = document.createElement("button");
        remove.textContent = "🗑️ Excluir";

        edit.addEventListener("click", () => {
            const newValue = prompt(
                "Edite seu comentário:",
                text.textContent
            );

            if (newValue !== null && newValue.trim()) {
                text.textContent = newValue.trim();
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
        if (event.key === "Enter") {
            addComment();
        }
    });

    post.querySelector(".focus").addEventListener("click", () => {
        input.focus();
    });
});

// COMPARTILHAR PUBLICAÇÕES
document.querySelectorAll(".share").forEach(button => {
    button.addEventListener("click", async () => {
        const post = button.closest(".post");
        const title = post.querySelector("h3").textContent;

        try {
            await navigator.clipboard.writeText(
                title + " 🦄 - Pony Social"
            );
            alert("Publicação copiada! Compartilhe com seus amigos! 🌈");
        } catch {
            alert("Não foi possível copiar o texto.");
        }
    });
});

console.log("🦄 Pony Social carregado com sucesso!");

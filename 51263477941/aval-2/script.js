// ===============================
// CURTIDAS
// ===============================

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const counter = button.querySelector("span");

        let likes = Number(counter.textContent);

        if (button.classList.contains("liked")) {

            likes--;

            button.classList.remove("liked");

            button.firstChild.textContent = "♡ Curtir ";

        } else {

            likes++;

            button.classList.add("liked");

            button.firstChild.textContent = "♥ Curtido ";

        }

        counter.textContent = likes;
    });

});


// ===============================
// COMENTÁRIOS
// ===============================

const commentButtons = document.querySelectorAll(".comment-btn");

commentButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const post = button.closest(".post");

        const commentsArea = post.querySelector(".comments");

        // Evita criar vários campos
        if (commentsArea.querySelector(".comment-box")) {
            return;
        }

        const commentBox = document.createElement("div");

        commentBox.classList.add("comment-box");

        commentBox.innerHTML = `
            <input 
                type="text" 
                placeholder="Escreva um comentário..."
            >

            <button>Enviar</button>
        `;

        commentsArea.appendChild(commentBox);

        const input = commentBox.querySelector("input");

        const sendButton = commentBox.querySelector("button");

        // Foca automaticamente no campo
        input.focus();

        sendButton.addEventListener("click", () => {

            const text = input.value.trim();

            if (text === "") {
                alert("Digite um comentário antes de enviar.");
                return;
            }

            const comment = document.createElement("div");

            comment.classList.add("comment-item");

            comment.innerHTML = `<strong>Você:</strong> ${text}`;

            commentsArea.appendChild(comment);

            commentBox.remove();
        });

        // Permite enviar pressionando Enter
        input.addEventListener("keypress", (event) => {

            if (event.key === "Enter") {
                sendButton.click();
            }

        });

    });

});


// ===============================
// BOTÃO PUBLICAR
// ===============================

const publishButton = document.getElementById("publishBtn");

publishButton.addEventListener("click", () => {

    const message = prompt(
        "O que você gostaria de publicar?"
    );

    if (message === null) {
        return;
    }

    if (message.trim() === "") {
        alert("Digite alguma coisa para publicar.");
        return;
    }

    alert(
        "Publicação criada com sucesso! 🚀\n\n" +
        message
    );

});
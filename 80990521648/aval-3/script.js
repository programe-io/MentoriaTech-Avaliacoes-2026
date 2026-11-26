// Curtir publicação
const likeButton = document.querySelector(".like");
const likesElement = document.getElementById("likes");

let liked = false;
let likes = 1234;

likeButton.addEventListener("click", () => {
    liked = !liked;

    if (liked) {
        likes++;
        likeButton.textContent = "❤️";
    } else {
        likes--;
        likeButton.textContent = "🤍";
    }

    likesElement.textContent = likes.toLocaleString("pt-BR");
});

// Botões de seguir
const followButtons = document.querySelectorAll(".suggestion button");

followButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent === "Seguir") {
            button.textContent = "Seguindo";
            button.style.color = "#888";
        } else {
            button.textContent = "Seguir";
            button.style.color = "#0095f6";
        }
    });
});

// Publicar comentário
const commentInput = document.querySelector(".comment-box input");
const publishButton = document.querySelector(".comment-box button");
const commentsArea = document.querySelector(".comments");

publishButton.addEventListener("click", () => {
    const text = commentInput.value.trim();

    if (text !== "") {
        const newComment = document.createElement("p");
        newComment.textContent = text;
        newComment.style.padding = "8px 12px";

        commentsArea.insertAdjacentElement("afterend", newComment);
        commentInput.value = "";
    }
});

document.querySelectorAll(".card").forEach(card => {

    // CURTIDAS

    const likeBtn = card.querySelector(".like-btn");
    const likeCount = card.querySelector(".like-count");

    let likes = Number(likeCount.textContent);
    let liked = false;

    likeBtn.addEventListener("click", () => {

        liked = !liked;

        if (liked) {
            likes++;
            likeBtn.textContent = "♥";
            likeBtn.classList.add("liked");
        } else {
            likes--;
            likeBtn.textContent = "♡";
            likeBtn.classList.remove("liked");
        }

        likeCount.textContent = likes.toLocaleString("pt-BR");
    });


    // COMENTÁRIOS

    const commentBtn = card.querySelector(".comment-btn");
    const showComments = card.querySelector(".show-comments");
    const commentArea = card.querySelector(".comment-area");

    function toggleComments() {
        commentArea.classList.toggle("active");
    }

    commentBtn.addEventListener("click", toggleComments);
    showComments.addEventListener("click", toggleComments);


    // ENVIAR COMENTÁRIOS

    const commentForm = card.querySelector(".comment-form");
    const commentInput = commentForm.querySelector("input");
    const commentList = card.querySelector(".comment-list");

    commentForm.addEventListener("submit", event => {

        event.preventDefault();

        const message = commentInput.value.trim();

        if (message === "") return;

        const comment = document.createElement("div");

        comment.classList.add("comment-item");

        const username = document.createElement("strong");
        username.textContent = "@visitante: ";

        const text = document.createTextNode(message);

        comment.append(username, text);

        commentList.appendChild(comment);

        commentInput.value = "";
    });


    // SALVAR PUBLICAÇÃO

    const saveBtn = card.querySelector(".save-btn");

    saveBtn.addEventListener("click", () => {

        saveBtn.classList.toggle("saved");

        if (saveBtn.classList.contains("saved")) {
            saveBtn.textContent = "⚑";
            saveBtn.title = "Publicação salva";
        } else {
            saveBtn.textContent = "⚐";
            saveBtn.title = "Salvar publicação";
        }

    });

});

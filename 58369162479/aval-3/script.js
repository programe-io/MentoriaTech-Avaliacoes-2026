
// Sistema de curtidas
document.querySelectorAll(".post").forEach(post => {

    const likeButton = post.querySelector(".like");
    const likesText = post.querySelector(".likes");

    let likes = parseInt(likesText.textContent);

    likeButton.addEventListener("click", () => {

        likeButton.classList.toggle("active");

        if (likeButton.classList.contains("active")) {
            likeButton.textContent = "♥";
            likes++;
        } else {
            likeButton.textContent = "♡";
            likes--;
        }

        likesText.textContent = likes + " curtidas";
    });

});

// Sistema de comentários
document.querySelectorAll(".comment-form").forEach(form => {

    form.addEventListener("submit", event => {
        event.preventDefault();

        const input = form.querySelector("input");
        const comments = form.parentElement.querySelector(".comments");

        if (input.value.trim() === "") return;

        const comment = document.createElement("p");

        const username = document.createElement("strong");
        username.textContent = "Você ";

        comment.appendChild(username);
        comment.appendChild(
            document.createTextNode(input.value.trim())
        );

        comments.appendChild(comment);

        input.value = "";
    });

});

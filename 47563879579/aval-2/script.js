
const posts = document.querySelectorAll(".post");

// CURTIR PUBLICAÇÃO
posts.forEach(post => {

    const likeButton = post.querySelector(".like-btn");
    const likes = post.querySelector(".likes");

    let count = 0;
    let liked = false;

    likeButton.addEventListener("click", () => {

        if (!liked) {
            count++;
            liked = true;
            likeButton.textContent = "❤️ Curtido";
        } else {
            count--;
            liked = false;
            likeButton.textContent = "❤️ Curtir";
        }

        likes.textContent = count +
            (count === 1 ? " curtida" : " curtidas");
    });

    // COMENTÁRIOS
    const sendButton = post.querySelector(".send-btn");
    const input = post.querySelector(".comment-box input");
    const comments = post.querySelector(".comments");

    sendButton.addEventListener("click", () => {

        const text = input.value.trim();

        if (text === "") {
            alert("Digite um comentário!");
            return;
        }

        const newComment = document.createElement("p");

        newComment.textContent = "👤 Você: " + text;

        comments.appendChild(newComment);

        input.value = "";
    });

    // COMENTAR
    const commentButton = post.querySelector(".comment-btn");

    commentButton.addEventListener("click", () => {
        input.focus();
    });

});

// PESQUISAR PUBLICAÇÕES
const search = document.querySelector("#search");

search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    posts.forEach(post => {

        const content = post.textContent.toLowerCase();

        post.style.display = content.includes(value)
            ? "block"
            : "none";

    });

});

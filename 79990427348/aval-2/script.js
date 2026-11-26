const publishBtn = document.getElementById("publishBtn");
const postInput = document.getElementById("postInput");
const feed = document.getElementById("feed");

publishBtn.addEventListener("click", function() {
    const text = postInput.value.trim();

    if (text === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <div class="avatar">D</div>
            <div>
                <strong>Davi</strong>
                <span>Agora mesmo</span>
            </div>
        </div>

        <div class="post-text">
            ${text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}
        </div>

        <div class="post-actions">
            <button class="like-btn">Curtir</button>
            <button class="comment-btn">Comentar</button>
        </div>
    `;

    feed.prepend(post);
    postInput.value = "";
});

feed.addEventListener("click", function(event) {
    if (event.target.classList.contains("like-btn")) {
        event.target.textContent =
            event.target.textContent === "Curtir" ? "Curtido!" : "Curtir";
    }

    if (event.target.classList.contains("comment-btn")) {
        const comment = prompt("Digite seu comentário:");

        if (comment && comment.trim() !== "") {
            alert("Comentário enviado: " + comment);
        }
    }
});
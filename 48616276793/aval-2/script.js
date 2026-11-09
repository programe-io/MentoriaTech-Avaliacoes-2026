
/* SISTEMA DE CURTIDAS */

document.addEventListener("click", function(event) {

    if (event.target.closest(".like-button")) {

        const button = event.target.closest(".like-button");
        const count = button.querySelector(".like-count");

        let likes = Number(count.textContent);

        if (button.classList.contains("liked")) {
            likes--;
            button.classList.remove("liked");
            button.firstChild.textContent = "♡ Curtir ";
        } else {
            likes++;
            button.classList.add("liked");
            button.firstChild.textContent = "♥ Curtido ";
        }

        count.textContent = likes;
    }

});

/* ABRIR COMENTÁRIOS */

document.addEventListener("click", function(event) {

    if (event.target.closest(".comment-button")) {

        const post = event.target.closest(".post");

        const area = post.querySelector(".comment-area");

        area.classList.toggle("active");
    }

});

/* ENVIAR COMENTÁRIOS */

document.addEventListener("click", function(event) {

    if (event.target.closest(".send-comment")) {

        const post = event.target.closest(".post");

        const input = post.querySelector(".comment-area input");

        const list = post.querySelector(".comments-list");

        const message = input.value.trim();

        if (message === "") {
            alert("Digite um comentário primeiro!");
            return;
        }

        const comment = document.createElement("div");

        comment.classList.add("comment-item");

        comment.textContent = "💜 ARMY: " + message;

        list.appendChild(comment);

        input.value = "";
    }

});

/* CRIAR PUBLICAÇÕES */

const publishButton = document.getElementById("publish-button");

publishButton.addEventListener("click", function() {

    const input = document.getElementById("post-input");

    const message = input.value.trim();

    if (message === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");

    post.classList.add("post");

    post.innerHTML = `
        <div class="post-header">
            <div class="avatar small">💜</div>
            <div>
                <h3>ARMY</h3>
                <span>Agora mesmo</span>
            </div>
        </div>

        <p class="post-text"></p>

        <div class="post-actions">
            <button class="like-button">
                ♡ Curtir <span class="like-count">0</span>
            </button>

            <button class="comment-button">
                💬 Comentar
            </button>
        </div>

        <div class="comment-area">
            <input type="text" placeholder="Escreva um comentário...">
            <button class="send-comment">Enviar</button>
            <div class="comments-list"></div>
        </div>
    `;

    post.querySelector(".post-text").textContent = message;

    const feed = document.getElementById("posts-container");

    feed.prepend(post);

    input.value = "";

    alert("Sua publicação foi criada! 💜");

});

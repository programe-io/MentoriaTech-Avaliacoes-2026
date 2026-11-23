
const postInput = document.getElementById("postInput");
const publishButton = document.getElementById("publishButton");
const feed = document.getElementById("feed");

// PUBLICAR POSTAGEM
publishButton.addEventListener("click", function () {

    const texto = postInput.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const postagem = document.createElement("article");
    postagem.classList.add("post");

    postagem.innerHTML = `
        <div class="post-header">
            <div class="avatar">W</div>

            <div>
                <strong>Wellyton Costa</strong>
                <span>Agora mesmo</span>
            </div>
        </div>

        <div class="post-text">
            <p></p>
        </div>

        <div class="post-actions">
            <button class="like-button">
                Curtir <span class="like-count">0</span>
            </button>

            <button class="comment-button">Comentar</button>
        </div>

        <div class="comments"></div>
    `;

    postagem.querySelector(".post-text p").textContent = texto;

    feed.prepend(postagem);

    postInput.value = "";

});

// CURTIR E ABRIR COMENTÁRIOS
feed.addEventListener("click", function (event) {

    const likeButton = event.target.closest(".like-button");

    if (likeButton) {

        const contador = likeButton.querySelector(".like-count");

        let curtidas = Number(contador.textContent);

        if (likeButton.classList.contains("liked")) {

            curtidas--;

            likeButton.classList.remove("liked");

            likeButton.firstChild.textContent = "Curtir ";

        } else {

            curtidas++;

            likeButton.classList.add("liked");

            likeButton.firstChild.textContent = "Curtido ";

        }

        contador.textContent = curtidas;
    }

    const commentButton = event.target.closest(".comment-button");

    if (commentButton) {

        const post = commentButton.closest(".post");

        const comments = post.querySelector(".comments");

        if (comments.querySelector(".comment-form")) {
            return;
        }

        const form = document.createElement("form");

        form.classList.add("comment-form");

        form.innerHTML = `
            <input
                type="text"
                placeholder="Escreva um comentário..."
                aria-label="Escreva um comentário"
                required
            >

            <button type="submit">Enviar</button>
        `;

        comments.appendChild(form);

        form.querySelector("input").focus();
    }

});

// ENVIAR COMENTÁRIOS
feed.addEventListener("submit", function (event) {

    if (!event.target.matches(".comment-form")) {
        return;
    }

    event.preventDefault();

    const form = event.target;

    const input = form.querySelector("input");

    const texto = input.value.trim();

    if (texto === "") {
        return;
    }

    const comentario = document.createElement("div");

    comentario.classList.add("comment");

    comentario.textContent = "Wellyton Costa: " + texto;

    const comments = form.parentElement;

    comments.insertBefore(comentario, form);

    input.value = "";

});

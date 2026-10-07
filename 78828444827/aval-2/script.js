// ==========================
// CURTIR POSTS
// ==========================

document.addEventListener("click", function (event) {

    if (event.target.classList.contains("like-button")) {

        const button = event.target;

        const post = button.closest(".post");

        const count = post.querySelector(".like-count");

        let likes = Number(count.textContent);

        if (button.classList.contains("liked")) {

            button.classList.remove("liked");

            button.textContent = "♡";

            likes--;

        } else {

            button.classList.add("liked");

            button.textContent = "♥";

            likes++;

        }

        count.textContent = likes;
    }

});


// ==========================
// COMENTÁRIOS
// ==========================

document.addEventListener("click", function (event) {

    if (event.target.classList.contains("comment-button")) {

        const comentario = prompt("Digite seu comentário:");

        if (comentario && comentario.trim() !== "") {

            alert("Comentário publicado: " + comentario);

        }

    }

});


// ==========================
// PUBLICAR POST
// ==========================

const publishButton = document.getElementById("publishButton");

publishButton.addEventListener("click", function () {

    const input = document.getElementById("postInput");

    const texto = input.value.trim();

    if (texto === "") {

        alert("Digite alguma coisa antes de publicar!");

        return;
    }


    const novoPost = document.createElement("article");

    novoPost.classList.add("post");

    novoPost.innerHTML = `

        <div class="post-header">

            <img
                class="avatar"
                src="https://static.wikia.nocookie.net/dublagem/images/6/6e/Homem-Aranha_Cl%C3%A1ssico.png/revision/latest?cb=20231224151143&path-prefix=pt-br"
            >

            <div>

                <strong>Homem-Aranha</strong>

                <small>agora</small>

            </div>

        </div>

        <p>${texto}</p>

        <div class="post-actions">

            <button class="like-button">
                ♡
            </button>

            <span class="like-count">
                0
            </span>

            <button class="comment-button">
                💬
            </button>

        </div>
    `;


    // Coloca o novo post no começo do feed
    const feed = document.querySelector(".feed");

    const newPostBox = document.querySelector(".new-post");

    feed.insertBefore(novoPost, newPostBox.nextSibling);


    // Limpa o campo
    input.value = "";

});


// ==========================
// BOTÕES SEGUIR
// ==========================

document.addEventListener("click", function (event) {

    if (event.target.classList.contains("follow-button")) {

        const button = event.target;

        if (button.textContent === "Seguir") {

            button.textContent = "Seguindo";

        } else {

            button.textContent = "Seguir";

        }

    }

});
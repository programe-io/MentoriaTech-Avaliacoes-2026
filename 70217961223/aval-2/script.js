// ===============================
// MODO ESCURO
// ===============================

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }

});


// ===============================
// CURTIDAS
// ===============================

const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach(button => {

    button.addEventListener("click", function () {

        const post = button.closest(".post");
        const likes = post.querySelector(".likes-count");

        let quantidade = Number(likes.textContent);

        if (button.classList.contains("liked")) {

            quantidade--;

            button.classList.remove("liked");
            button.innerHTML = "♡ Curtir";

        } else {

            quantidade++;

            button.classList.add("liked");
            button.innerHTML = "♥ Curtido";

        }

        likes.textContent = quantidade;

    });

});


// ===============================
// MOSTRAR COMENTÁRIOS
// ===============================

const commentButtons =
    document.querySelectorAll(".comment-button");

commentButtons.forEach(button => {

    button.addEventListener("click", function () {

        const post = button.closest(".post");

        const commentArea =
            post.querySelector(".comment-area");

        commentArea.classList.toggle("show");

    });

});


// ===============================
// ENVIAR COMENTÁRIO
// ===============================

const commentAreas =
    document.querySelectorAll(".comment-area");

commentAreas.forEach(area => {

    const input = area.querySelector("input");
    const button = area.querySelector("button");

    button.addEventListener("click", function () {

        const comentario = input.value.trim();

        if (comentario === "") {

            alert("Digite um comentário!");

            return;
        }

        alert(
            "Comentário publicado! 💬"
        );

        input.value = "";

    });

});


// ===============================
// COMPARTILHAR
// ===============================

const shareButtons =
    document.querySelectorAll(".share-button");

shareButtons.forEach(button => {

    button.addEventListener("click", function () {

        navigator.clipboard.writeText(
            window.location.href
        );

        alert(
            "Publicação compartilhada! 🔗"
        );

    });

});


// ===============================
// CRIAR NOVA PUBLICAÇÃO
// ===============================

const postInput =
    document.getElementById("postInput");

const postButton =
    document.getElementById("postButton");

postButton.addEventListener("click", function () {

    const texto = postInput.value.trim();

    if (texto === "") {

        alert("Escreva alguma coisa antes de publicar!");

        return;
    }

    const feed = document.querySelector(".feed");

    const novoPost = document.createElement("article");

    novoPost.classList.add("post");

    novoPost.innerHTML = `

        <div class="post-header">

            <div class="profile-photo">
                R
            </div>

            <div>
                <h3>Raquel</h3>
                <span>Agora mesmo</span>
            </div>

        </div>

        <p class="post-text">
            ${texto}
        </p>

        <div class="post-info">

            <span>
                ❤️ <span class="likes-count">0</span> curtidas
            </span>

            <span>
                0 comentários
            </span>

        </div>

        <div class="post-actions">

            <button class="like-button">
                ♡ Curtir
            </button>

            <button class="comment-button">
                💬 Comentar
            </button>

            <button class="share-button">
                ↗️ Compartilhar
            </button>

        </div>

        <div class="comment-area">

            <input
                type="text"
                placeholder="Escreva um comentário..."
            >

            <button>
                Enviar
            </button>

        </div>

    `;

    feed.insertBefore(
        novoPost,
        feed.children[1]
    );

    postInput.value = "";

    alert("Publicação criada com sucesso! 🎉");

});


// ===============================
// CONSOLE
// ===============================

console.log(
    "BlueSocial iniciado. Desenvolvido por Raquel 💙"
);

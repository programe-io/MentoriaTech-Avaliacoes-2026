// MODO ESCURO

const darkMode = document.getElementById("darkMode");

darkMode.addEventListener("click", function () {

    document.body.classList.toggle("dark");

});


// CURTIR

function activateLike(button) {

    button.classList.toggle("liked");

    if (button.classList.contains("liked")) {

        button.innerHTML = "💙 Curtido";

    } else {

        button.innerHTML = "❤️ Curtir";

    }
}


// COMENTÁRIOS

function activateComments(button) {

    const post = button.closest(".post");

    const comments = post.querySelector(".comments");

    if (comments.style.display === "block") {

        comments.style.display = "none";

    } else {

        comments.style.display = "block";

    }
}


// ADICIONAR COMENTÁRIO

function addComment(input) {

    if (event.key !== "Enter") {
        return;
    }

    const text = input.value.trim();

    if (text === "") {
        return;
    }

    const post = input.closest(".post");

    const list = post.querySelector(".comment-list");

    const comment = document.createElement("div");

    comment.className = "comment";

    comment.innerHTML = `
        <strong>Você</strong>
        <br>
        ${text}
    `;

    list.appendChild(comment);

    input.value = "";
}


// ATIVAR BOTÕES DOS POSTS

document.querySelectorAll(".like").forEach(button => {

    button.addEventListener("click", function () {

        activateLike(this);

    });

});


document.querySelectorAll(".comment-button").forEach(button => {

    button.addEventListener("click", function () {

        activateComments(this);

    });

});


document.querySelectorAll(".comment-input").forEach(input => {

    input.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            addComment(this);

        }

    });

});


// CRIAR PUBLICAÇÃO

const publish = document.getElementById("publish");

publish.addEventListener("click", function () {

    const input = document.getElementById("newPost");

    const text = input.value.trim();

    if (text === "") {

        alert("Digite alguma coisa para publicar!");

        return;

    }

    const post = document.createElement("article");

    post.className = "post";

    post.innerHTML = `

        <div class="post-header">

            <img src="https://i.pravatar.cc/150?img=12">

            <div>
                <strong>João Silva</strong>
                <small>Agora</small>
            </div>

        </div>

        <p>${text}</p>

        <div class="actions">

            <button class="like">
                ❤️ Curtir
            </button>

            <button class="comment-button">
                💬 Comentar
            </button>

            <button>
                ↗️ Compartilhar
            </button>

        </div>

        <div class="comments">

            <input
                type="text"
                class="comment-input"
                placeholder="Escreva um comentário..."
            >

            <div class="comment-list"></div>

        </div>
    `;

    document.querySelector("main").appendChild(post);

    input.value = "";

    // Ativar curtida do novo post

    const likeButton = post.querySelector(".like");

    likeButton.addEventListener("click", function () {

        activateLike(this);

    });


    // Ativar comentários do novo post

    const commentButton = post.querySelector(".comment-button");

    commentButton.addEventListener("click", function () {

        activateComments(this);

    });


    // Ativar campo de comentário

    const commentInput = post.querySelector(".comment-input");

    commentInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            addComment(this);

        }

    });

});


// PESQUISA

const search = document.getElementById("search");

search.addEventListener("input", function () {

    const searchText = this.value.toLowerCase();

    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {

        const content = post.innerText.toLowerCase();

        if (content.includes(searchText)) {

            post.style.display = "block";

        } else {

            post.style.display = "none";

        }

    });

});
// CURTIR PUBLICAÇÃO

function likePost(button) {

    const post = button.closest(".post");
    const count = post.querySelector(".like-count");

    let likes = Number(count.dataset.likes);
    const liked = button.dataset.liked === "true";

    if (liked) {

        likes--;

        button.innerHTML = "♡";
        button.style.color = "#262626";
        button.dataset.liked = "false";

    } else {

        likes++;

        button.innerHTML = "♥";
        button.style.color = "red";
        button.dataset.liked = "true";
    }

    count.dataset.likes = likes;
    count.innerText = likes + " curtidas";
}


// FOCAR NO CAMPO DE COMENTÁRIO

function focusComment(button) {

    const input = button.closest(".post")
        .querySelector(".comment-box input");

    input.focus();
}


// ADICIONAR COMENTÁRIO

function addComment(button) {

    const post = button.closest(".post");

    const input = post.querySelector(
        ".comment-box input"
    );

    const comments = post.querySelector(".comments");

    if (input.value.trim() === "") {
        return;
    }

    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = "meu_perfil ";

    p.appendChild(strong);

    p.appendChild(
        document.createTextNode(input.value)
    );

    comments.appendChild(p);

    input.value = "";
}


// COMPARTILHAR PUBLICAÇÃO

function sharePost() {

    alert("Publicação pronta para compartilhar! 🚀");

}


// PROTEGER TEXTO HTML

function escapeHTML(value) {

    return value.replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);

}


// CRIAR NOVA PUBLICAÇÃO

function createPost() {

    const image = document.getElementById(
        "imageUrl"
    ).value.trim();

    const caption = document.getElementById(
        "captionInput"
    ).value.trim();

    if (!image) {

        alert("Insira o endereço de uma imagem!");

        return;
    }

    const post = document.createElement("article");

    post.className = "post";

    post.innerHTML = `
        <div class="post-header">

            <img src="https://i.pravatar.cc/100?img=12">

            <strong>meu_perfil</strong>

            <span>•••</span>

        </div>

        <img class="post-image"
             src="${escapeHTML(image)}">

        <div class="post-actions">

            <button onclick="likePost(this)">♡</button>

            <button onclick="focusComment(this)">💬</button>

            <button onclick="sharePost()">↗</button>

        </div>

        <p class="like-count" data-likes="0">
            0 curtidas
        </p>

        <p class="caption">

            <strong>meu_perfil</strong>

            ${escapeHTML(caption)}

        </p>

        <div class="comments"></div>

        <div class="comment-box">

            <input placeholder="Adicione um comentário...">

            <button onclick="addComment(this)">
                Publicar
            </button>

        </div>
    `;

    document.getElementById("feed")
        .prepend(post);

    document.getElementById("imageUrl").value = "";

    document.getElementById("captionInput").value = "";

}

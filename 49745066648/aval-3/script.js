function likePost(button) {

    const icon = button.querySelector("i");
    const post = button.closest(".post");
    const likes = post.querySelector(".likes");

    let liked = button.classList.contains("liked");

    if (!liked) {

        button.classList.add("liked");

        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");

        let number = parseInt(likes.innerText.replace(/\D/g, ""));

        likes.innerText = (number + 1).toLocaleString("pt-BR") + " curtidas";

    } else {

        button.classList.remove("liked");

        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");

        let number = parseInt(likes.innerText.replace(/\D/g, ""));

        likes.innerText = (number - 1).toLocaleString("pt-BR") + " curtidas";

    }

}


function commentPost() {

    let comment = prompt("Digite seu comentário:");

    if (comment && comment.trim() !== "") {

        alert("Comentário enviado: " + comment);

    }

}


function createPost(event) {

    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Selecione uma imagem válida.");
        return;
    }

    const imageURL = URL.createObjectURL(file);

    const post = document.createElement("article");

    post.className = "post";

    post.innerHTML = `

        <div class="post-header">

            <img src="https://i.pravatar.cc/100?img=12">

            <strong>seu_usuario</strong>

        </div>

        <img class="post-image" src="${imageURL}">

        <div class="post-actions">

            <button onclick="likePost(this)">

                <i class="fa-regular fa-heart"></i>

            </button>

            <button onclick="commentPost()">

                <i class="fa-regular fa-comment"></i>

            </button>

        </div>

        <div class="post-info">

            <strong class="likes">0 curtidas</strong>

            <p><strong>seu_usuario</strong> Nova publicação! ✨</p>

        </div>

    `;

    document.getElementById("feed").prepend(post);

    event.target.value = "";

}
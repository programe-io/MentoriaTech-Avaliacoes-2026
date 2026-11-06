
// SISTEMA DE CURTIDAS

document.querySelectorAll(".post").forEach(post => {

    const likeButton = post.querySelector(".like-button");
    const likesText = post.querySelector(".likes");

    let curtidas = parseInt(likesText.textContent.replace(/\D/g, ""));
    let curtiu = false;

    likeButton.addEventListener("click", function() {

        curtiu = !curtiu;

        if (curtiu) {
            curtidas++;
            likeButton.classList.add("liked");
            likeButton.innerHTML = '<i class="fa-solid fa-heart"></i>';
        } else {
            curtidas--;
            likeButton.classList.remove("liked");
            likeButton.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }

        likesText.textContent = curtidas.toLocaleString("pt-BR") + " curtidas";
    });

});

// SISTEMA DE SALVAR PUBLICAÇÃO

document.querySelectorAll(".save-button").forEach(button => {

    button.addEventListener("click", function() {

        button.classList.toggle("saved");

        if (button.classList.contains("saved")) {
            button.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
        } else {
            button.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
        }

    });

});

// SISTEMA DE COMENTÁRIOS

document.querySelectorAll(".comment-form").forEach(form => {

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const input = form.querySelector("input");
        const texto = input.value.trim();

        if (texto === "") {
            return;
        }

        const comments = form.parentElement.querySelector(".comments");

        const novoComentario = document.createElement("p");

        const usuario = document.createElement("strong");
        usuario.textContent = "seu_usuario ";

        const mensagem = document.createTextNode(texto);

        novoComentario.appendChild(usuario);
        novoComentario.appendChild(mensagem);

        comments.appendChild(novoComentario);

        input.value = "";

    });

});

// SISTEMA DE SEGUIR

document.querySelectorAll(".follow-button").forEach(button => {

    button.addEventListener("click", function() {

        if (button.textContent === "Seguir") {
            button.textContent = "Seguindo";
            button.style.color = "#888";
        } else {
            button.textContent = "Seguir";
            button.style.color = "#0095f6";
        }

    });

});

// ABRIR MODAL

const modal = document.getElementById("postModal");

document.getElementById("createButton").addEventListener("click", function(event) {
    event.preventDefault();
    modal.style.display = "flex";
});

// FECHAR MODAL

document.getElementById("closeModal").addEventListener("click", function() {
    modal.style.display = "none";
});

// CRIAR PUBLICAÇÃO

document.getElementById("publishButton").addEventListener("click", function() {

    const imageUrl = document.getElementById("imageUrl").value.trim();
    const caption = document.getElementById("caption").value.trim();

    if (imageUrl === "") {
        alert("Adicione o link de uma imagem!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=12">
            <strong>seu_usuario</strong>
            <span>• agora</span>
        </div>

        <img class="post-image" src="${imageUrl}" alt="Nova publicação">

        <div class="post-actions">
            <button class="like-button">
                <i class="fa-regular fa-heart"></i>
            </button>
            <button>
                <i class="fa-regular fa-comment"></i>
            </button>
            <button>
                <i class="fa-regular fa-paper-plane"></i>
            </button>
            <button class="save-button">
                <i class="fa-regular fa-bookmark"></i>
            </button>
        </div>

        <div class="post-info">
            <strong class="likes">0 curtidas</strong>
            <p><strong>seu_usuario</strong> ${caption}</p>
            <div class="comments"></div>
            <form class="comment-form">
                <input type="text" placeholder="Adicione um comentário..." required>
                <button type="submit">Publicar</button>
            </form>
        </div>
    `;

    document.getElementById("feed").prepend(post);

    // Ativa os botões da nova publicação
    ativarFuncoes(post);

    document.getElementById("imageUrl").value = "";
    document.getElementById("caption").value = "";

    modal.style.display = "none";

    alert("Publicação criada com sucesso!");

});

// ATIVAR FUNÇÕES NAS NOVAS PUBLICAÇÕES

function ativarFuncoes(post) {

    const likeButton = post.querySelector(".like-button");
    const likesText = post.querySelector(".likes");

    let curtidas = 0;
    let curtiu = false;

    likeButton.addEventListener("click", function() {

        curtiu = !curtiu;

        if (curtiu) {
            curtidas++;
            likeButton.classList.add("liked");
            likeButton.innerHTML = '<i class="fa-solid fa-heart"></i>';
        } else {
            curtidas--;
            likeButton.classList.remove("liked");
            likeButton.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }

        likesText.textContent = curtidas + " curtidas";

    });

    const saveButton = post.querySelector(".save-button");

    saveButton.addEventListener("click", function() {

        saveButton.classList.toggle("saved");

        saveButton.innerHTML = saveButton.classList.contains("saved")
            ? '<i class="fa-solid fa-bookmark"></i>'
            : '<i class="fa-regular fa-bookmark"></i>';

    });

    const form = post.querySelector(".comment-form");

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const input = form.querySelector("input");
        const texto = input.value.trim();

        if (texto === "") return;

        const comentario = document.createElement("p");
        const usuario = document.createElement("strong");

        usuario.textContent = "seu_usuario ";
        comentario.appendChild(usuario);
        comentario.appendChild(document.createTextNode(texto));

        post.querySelector(".comments").appendChild(comentario);

        input.value = "";

    });

}

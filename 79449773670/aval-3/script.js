
// ABRIR ÁREA DE NOVA PUBLICAÇÃO

const newPost = document.getElementById("newPost");
const createBox = document.getElementById("createBox");

newPost.addEventListener("click", function(event) {
    event.preventDefault();

    createBox.classList.toggle("hidden");
});

// PUBLICAR NOVA FOTO

const publishBtn = document.getElementById("publishBtn");

publishBtn.addEventListener("click", function() {

    const image = document.getElementById("postImage").value;
    const text = document.getElementById("postText").value;

    if (image.trim() === "") {
        alert("Digite o link de uma imagem!");
        return;
    }

    const post = document.createElement("article");

    post.className = "post bg-white rounded-xl shadow-sm";

    post.innerHTML = `
        <div class="flex items-center gap-3 p-4">
            <img src="https://i.pravatar.cc/100?img=11"
                 class="avatar">
            <strong>meu_perfil</strong>
        </div>

        <img src="${image}" class="post-image">

        <div class="p-4">
            <div class="flex gap-5 text-2xl mb-3">
                <button class="like-btn">♡</button>
                <button class="comment-btn">💬</button>
                <button>➤</button>
            </div>

            <p class="likes font-bold">0 curtidas</p>

            <p class="mt-2">
                <strong>meu_perfil</strong> ${text}
            </p>

            <p class="text-gray-400 text-xs mt-3">
                AGORA
            </p>
        </div>
    `;

    document.getElementById("feed").prepend(post);

    document.getElementById("postImage").value = "";
    document.getElementById("postText").value = "";

    createBox.classList.add("hidden");

});

// CURTIR PUBLICAÇÕES

document.addEventListener("click", function(event) {

    if (event.target.classList.contains("like-btn")) {

        const button = event.target;
        const post = button.closest(".post");
        const likes = post.querySelector(".likes");

        let quantidade = Number(
            likes.textContent.match(/\d+/)?.[0] || 0
        );

        if (button.classList.contains("liked")) {

            button.classList.remove("liked");
            button.textContent = "♡";
            quantidade--;

        } else {

            button.classList.add("liked");
            button.textContent = "♥";
            quantidade++;

        }

        likes.textContent = quantidade.toLocaleString("pt-BR") + " curtidas";

    }

});

// ABRIR COMENTÁRIOS

document.addEventListener("click", function(event) {

    if (event.target.classList.contains("comment-btn")) {

        const post = event.target.closest(".post");
        const area = post.querySelector(".comment-area");

        if (area) {
            area.classList.toggle("hidden");
        } else {
            const comment = document.createElement("div");

            comment.className = "mt-3";

            comment.innerHTML = `
                <input
                    class="comment-input border p-2 rounded w-full"
                    placeholder="Adicione um comentário...">
            `;

            post.querySelector(".p-4").appendChild(comment);
        }

    }

});

// ENVIAR COMENTÁRIOS

document.addEventListener("keydown", function(event) {

    if (
        event.key === "Enter" &&
        event.target.classList.contains("comment-input")
    ) {

        const texto = event.target.value.trim();

        if (texto === "") return;

        const comentario = document.createElement("p");

        comentario.className = "text-sm mt-2";

        const usuario = document.createElement("strong");
        usuario.textContent = "meu_perfil ";

        comentario.appendChild(usuario);
        comentario.appendChild(document.createTextNode(texto));

        const post = event.target.closest(".post");

        post.querySelector(".p-4").appendChild(comentario);

        event.target.value = "";

    }

});

// SEGUIR USUÁRIOS

document.addEventListener("click", function(event) {

    if (event.target.classList.contains("follow-btn")) {

        const button = event.target;

        if (button.textContent === "Seguir") {
            button.textContent = "Seguindo";
            button.style.color = "#777";
        } else {
            button.textContent = "Seguir";
            button.style.color = "#0095f6";
        }

    }

});

// MENU DE NAVEGAÇÃO

document.querySelectorAll(".menu-item[data-page]").forEach(item => {

    item.addEventListener("click", function(event) {

        event.preventDefault();

        const pagina = this.dataset.page;

        if (pagina !== "Início") {
            alert("Você selecionou: " + pagina);
        }

    });

});

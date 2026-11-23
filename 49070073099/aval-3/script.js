
const feed = document.getElementById("feed");
const postInput = document.getElementById("postInput");
const publishButton = document.getElementById("publishButton");

// PUBLICAR POSTAGEM
publishButton.addEventListener("click", function () {
    const texto = postInput.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post bg-white border border-gray-200 rounded-lg mb-4";

    post.innerHTML = `
        <header class="flex items-center justify-between p-3">
            <div class="flex items-center gap-3">
                <div class="profile-gradient">
                    <img src="https://i.pravatar.cc/150?img=12" alt="Wellyton">
                </div>
                <div>
                    <p class="text-sm font-semibold">Wellyton Costa</p>
                    <p class="text-xs text-gray-500">Agora mesmo</p>
                </div>
            </div>
            <button><i class="bx bx-dots-horizontal-rounded text-xl"></i></button>
        </header>

        <div class="p-3">
            <p class="text-sm"></p>
            <div class="flex items-center justify-between mt-4">
                <div class="flex items-center gap-4">
                    <button class="like-button">
                        <i class="bx bx-heart text-2xl"></i>
                    </button>
                    <button class="comment-button">
                        <i class="bx bx-message-rounded text-2xl"></i>
                    </button>
                    <button>
                        <i class="bx bx-send text-2xl"></i>
                    </button>
                </div>
                <button><i class="bx bx-bookmark text-2xl"></i></button>
            </div>
            <p class="font-semibold text-sm mt-2">
                <span class="like-count">0</span> curtidas
            </p>
            <div class="comments"></div>
        </div>
    `;

    post.querySelector(".text-sm").textContent = texto;
    feed.prepend(post);
    postInput.value = "";
});

// CURTIR, DESCURTIR E ABRIR COMENTÁRIOS
feed.addEventListener("click", function (event) {
    const likeButton = event.target.closest(".like-button");

    if (likeButton) {
        const post = likeButton.closest(".post");
        const count = post.querySelector(".like-count");
        let likes = Number(count.textContent);

        if (likeButton.classList.contains("liked")) {
            likes--;
            likeButton.classList.remove("liked");
        } else {
            likes++;
            likeButton.classList.add("liked");
        }

        count.textContent = likes;
    }

    const commentButton = event.target.closest(".comment-button");

    if (commentButton) {
        const post = commentButton.closest(".post");
        const comments = post.querySelector(".comments");

        if (comments.querySelector(".comment-form")) return;

        const form = document.createElement("form");
        form.className = "comment-form";

        form.innerHTML = `
            <input type="text" placeholder="Escreva um comentário..." required>
            <button type="submit">Enviar</button>
        `;

        comments.appendChild(form);
        form.querySelector("input").focus();
    }
});

// ENVIAR COMENTÁRIOS
feed.addEventListener("submit", function (event) {
    if (!event.target.matches(".comment-form")) return;

    event.preventDefault();

    const form = event.target;
    const input = form.querySelector("input");
    const texto = input.value.trim();

    if (texto === "") return;

    const comentario = document.createElement("div");
    comentario.className = "comment";

    comentario.textContent = "Wellyton Costa: " + texto;

    form.parentElement.insertBefore(comentario, form);
    input.value = "";
});

// BOTÃO SEGUIR
document.querySelectorAll(".suggestion button").forEach(function (button) {
    button.addEventListener("click", function () {
        if (button.textContent === "Seguir") {
            button.textContent = "Seguindo";
        } else {
            button.textContent = "Seguir";
        }
    });
});

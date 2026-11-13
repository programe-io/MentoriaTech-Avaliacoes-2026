
/* =================================
   CLONE INSTAGRAM - JAVASCRIPT
================================= */


/* 1. CURTIR E DESCURTIR PUBLICAÇÕES */

document.querySelectorAll(".post").forEach(post => {

    const likeButton = post.querySelector(".like-button");
    const likeCount = post.querySelector(".likes");

    if (!likeButton || !likeCount) return;

    let liked = false;
    let totalLikes = 1234;

    likeButton.addEventListener("click", () => {

        liked = !liked;

        if (liked) {
            totalLikes++;
            likeButton.innerHTML = '<i class="bx bxs-heart"></i>';
            likeButton.style.color = "red";
        } else {
            totalLikes--;
            likeButton.innerHTML = '<i class="bx bx-heart"></i>';
            likeButton.style.color = "";
        }

        likeCount.textContent = totalLikes.toLocaleString("pt-BR") + " curtidas";

    });

});


/* 2. SALVAR PUBLICAÇÕES */

document.querySelectorAll(".save-button").forEach(button => {

    let saved = false;

    button.addEventListener("click", () => {

        saved = !saved;

        if (saved) {
            button.innerHTML = '<i class="bx bxs-bookmark"></i>';
        } else {
            button.innerHTML = '<i class="bx bx-bookmark"></i>';
        }

    });

});


/* 3. SEGUIR E DEIXAR DE SEGUIR */

document.querySelectorAll(".follow-button").forEach(button => {

    button.addEventListener("click", () => {

        if (button.textContent.trim() === "Seguir") {

            button.textContent = "Seguindo";
            button.style.color = "#6b7280";

        } else {

            button.textContent = "Seguir";
            button.style.color = "#3b82f6";

        }

    });

});


/* 4. PESQUISAR PUBLICAÇÕES */

const searchInput = document.querySelector(".search-input");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const search = searchInput.value.toLowerCase();

        document.querySelectorAll(".post").forEach(post => {

            const content = post.textContent.toLowerCase();

            post.style.display = content.includes(search)
                ? ""
                : "none";

        });

    });

}


/* 5. ADICIONAR COMENTÁRIOS */

document.querySelectorAll(".comment-button").forEach(button => {

    button.addEventListener("click", () => {

        const post = button.closest(".post");

        let commentInput = post.querySelector(".comment-input");

        if (!commentInput) {

            commentInput = document.createElement("input");

            commentInput.className =
                "comment-input w-full border rounded-lg p-2 mt-3 text-sm";

            commentInput.placeholder = "Escreva um comentário...";

            const content = post.querySelector(".post-content");

            content.appendChild(commentInput);

            const sendButton = document.createElement("button");

            sendButton.textContent = "Publicar";

            sendButton.className =
                "text-blue-500 font-semibold text-sm mt-2";

            content.appendChild(sendButton);

            sendButton.addEventListener("click", () => {

                const value = commentInput.value.trim();

                if (value === "") return;

                const comment = document.createElement("p");

                comment.className = "text-sm mt-2";

                const username = document.createElement("strong");
                username.textContent = "Você ";

                comment.appendChild(username);
                comment.appendChild(document.createTextNode(value));

                content.insertBefore(comment, commentInput);

                commentInput.value = "";

            });

        }

        commentInput.focus();

    });

});


/* 6. MENU DE OPÇÕES */

document.querySelectorAll(".options-button").forEach(button => {

    button.addEventListener("click", () => {

        alert("Opções da publicação");

    });

});


/* 7. CRIAR NOVA PUBLICAÇÃO */

const newPostButtons = document.querySelectorAll(".new-post-button");

newPostButtons.forEach(button => {

    button.addEventListener("click", () => {

        const imageUrl = prompt("Digite o endereço da imagem:");

        if (!imageUrl) return;

        try {

            const url = new URL(imageUrl);

            if (!["http:", "https:"].includes(url.protocol)) {
                alert("Informe um endereço de imagem válido.");
                return;
            }

            const post = document.createElement("article");

            post.className =
                "post bg-white border border-gray-200 rounded-lg mb-4";

            post.innerHTML = `
                <div class="post-header flex items-center gap-3">

                    <img
                        src="https://i.pravatar.cc/100?img=12"
                        class="w-10 h-10 rounded-full"
                        alt="Seu perfil"
                    >

                    <strong>frojo_dev</strong>

                </div>

                <img
                    src="${url.href}"
                    class="post-image"
                    alt="Nova publicação"
                >

                <div class="post-content p-3">

                    <div class="post-actions flex justify-between">

                        <div class="flex gap-4">

                            <button class="like-button">
                                <i class="bx bx-heart"></i>
                            </button>

                            <button class="comment-button">
                                <i class="bx bx-message-rounded"></i>
                            </button>

                        </div>

                        <button class="save-button">
                            <i class="bx bx-bookmark"></i>
                        </button>

                    </div>

                    <p class="likes">0 curtidas</p>

                    <p class="description">
                        <strong>frojo_dev</strong>
                        Nova publicação! 📸
                    </p>

                </div>
            `;

            const feed = document.querySelector(".feed");

            if (feed) {
                feed.prepend(post);
                initializePost(post);
            }

        } catch (error) {

            alert("Endereço inválido.");

        }

    });

});


/* 8. INICIALIZAR INTERAÇÕES DE UMA PUBLICAÇÃO */

function initializePost(post) {

    const likeButton = post.querySelector(".like-button");
    const likeCount = post.querySelector(".likes");
    const saveButton = post.querySelector(".save-button");
    const commentButton = post.querySelector(".comment-button");

    let liked = false;
    let saved = false;
    let likes = 0;

    if (likeButton) {

        likeButton.addEventListener("click", () => {

            liked = !liked;
            likes += liked ? 1 : -1;

            likeButton.innerHTML = liked
                ? '<i class="bx bxs-heart"></i>'
                : '<i class="bx bx-heart"></i>';

            likeButton.style.color = liked ? "red" : "";

            likeCount.textContent = likes + " curtidas";

        });

    }

    if (saveButton) {

        saveButton.addEventListener("click", () => {

            saved = !saved;

            saveButton.innerHTML = saved
                ? '<i class="bx bxs-bookmark"></i>'
                : '<i class="bx bx-bookmark"></i>';

        });

    }

    if (commentButton) {

        commentButton.addEventListener("click", () => {

            const input = document.createElement("input");

            input.placeholder = "Escreva um comentário...";
            input.className = "w-full border p-2 mt-3 rounded-lg";

            post.querySelector(".post-content").appendChild(input);

            input.focus();

        });

    }

}

console.log("Clone do Instagram carregado com sucesso!");
    \}

\}

console.log("Clone do Instagram carregado com sucesso!");
282function initializePost(post) {
Pré-visualização do Código
$0
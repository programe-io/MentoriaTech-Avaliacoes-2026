// ELEMENTOS PRINCIPAIS
const postsContainer = document.querySelector("#posts");
const postDialog = document.querySelector("#postDialog");


// ABRIR NOVA PUBLICAÇÃO
function openNewPost() {
    postDialog.showModal();
}

document.querySelector("#newPostTop")
    .addEventListener("click", openNewPost);

document.querySelector("#newPostMobile")
    .addEventListener("click", openNewPost);


// FUNÇÃO DE CURTIR
document.querySelectorAll(".like-button").forEach(button => {

    button.addEventListener("click", () => {

        const post = button.closest(".post");
        const count = post.querySelector(".like-count");

        const liked = button.classList.toggle("liked");

        const current = Number(
            count.textContent.replace(/\D/g, "")
        );

        count.textContent = (
            current + (liked ? 1 : -1)
        ).toLocaleString("pt-BR");

        button.setAttribute(
            "aria-label",
            liked ? "Descurtir" : "Curtir"
        );

    });

});


// FUNÇÃO DE SALVAR PUBLICAÇÃO
document.querySelectorAll(".save-button").forEach(button => {

    button.addEventListener("click", () => {

        const saved = button.classList.toggle("saved");

        button.setAttribute(
            "aria-label",
            saved ? "Remover dos salvos" : "Salvar"
        );

    });

});


// ABRIR CAMPO DE COMENTÁRIO
document.querySelectorAll(
    ".comment-button, .comments-link"
).forEach(button => {

    button.addEventListener("click", () => {

        const input = button
            .closest(".post")
            .querySelector(".comment-form input");

        input.focus();

    });

});


// PUBLICAR COMENTÁRIOS
document.querySelectorAll(".comment-form").forEach(form => {

    form.addEventListener("submit", event => {

        event.preventDefault();

        const input = form.querySelector("input");
        const message = input.value.trim();

        if (!message) return;

        const comment = document.createElement("p");

        comment.className = "caption new-comment";

        const name = document.createElement("strong");
        name.textContent = "joaquim_dev";

        comment.appendChild(name);
        comment.appendChild(
            document.createTextNode(" " + message)
        );

        form.before(comment);

        input.value = "";

    });

});


// SEGUIR USUÁRIOS
document.querySelectorAll(".follow-button").forEach(button => {

    button.addEventListener("click", () => {

        const following =
            button.textContent.trim() === "Seguindo";

        button.textContent = following
            ? "Seguir"
            : "Seguindo";

    });

});


// COMPARTILHAR PUBLICAÇÃO
document.querySelectorAll(".share-button").forEach(button => {

    button.addEventListener("click", async () => {

        const shareData = {
            title: "Instagram Clone",
            text: "Veja esta publicação!"
        };

        if (navigator.share) {

            try {
                await navigator.share(shareData);
            } catch (error) {
                console.log("Compartilhamento cancelado.");
            }

        } else {

            alert(
                "Compartilhamento não disponível neste navegador."
            );

        }

    });

});


// PESQUISAR PUBLICAÇÕES
document.querySelector("#searchInput")
    .addEventListener("input", event => {

        const query = event.target.value
            .toLowerCase()
            .trim();

        document.querySelectorAll(".post").forEach(post => {

            const username = post.dataset.user.toLowerCase();

            const content = post.textContent.toLowerCase();

            post.hidden =
                !username.includes(query) &&
                !content.includes(query);

        });

    });


// PESQUISA NO MOBILE
document.querySelector("#mobileSearch")
    .addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


// CRIAR NOVA PUBLICAÇÃO
document.querySelector("#newPostForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        const caption = document.querySelector("#newCaption")
            .value.trim();

        const imageUrl = document.querySelector("#newImage")
            .value.trim() ||
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000";

        if (!caption) return;

        const article = document.createElement("article");

        article.className = "post panel";
        article.dataset.user = "joaquim_dev";

        article.innerHTML = `

            <header class="post-header">

                <div class="user-line">

                    <div class="avatar">JM</div>

                    <div>
                        <strong>joaquim_dev</strong>
                        <span>Publicado agora</span>
                    </div>

                </div>

                <button class="icon-button more-button">
                    <i class="bx bx-dots-horizontal-rounded"></i>
                </button>

            </header>

            <img class="post-image"
                src="${escapeHTML(imageUrl)}"
                alt="Imagem da publicação">

            <div class="post-content">

                <div class="post-actions">

                    <div class="action-group">

                        <button class="icon-button like-button">
                            <i class="bx bx-heart"></i>
                        </button>

                        <button class="icon-button comment-button">
                            <i class="bx bx-message-rounded"></i>
                        </button>

                        <button class="icon-button share-button">
                            <i class="bx bx-send"></i>
                        </button>

                    </div>

                    <button class="icon-button save-button">
                        <i class="bx bx-bookmark"></i>
                    </button>

                </div>

                <p class="likes">
                    <span class="like-count">0</span> curtidas
                </p>

                <p class="caption">
                    <strong>joaquim_dev</strong>
                    ${escapeHTML(caption)}
                </p>

                <button class="comments-link">
                    Ver comentários
                </button>

                <form class="comment-form">

                    <input type="text"
                        placeholder="Adicione um comentário...">

                    <button type="submit">
                        Publicar
                    </button>

                </form>

                <p class="post-time">AGORA</p>

            </div>

        `;

        postsContainer.prepend(article);

        postDialog.close();

        document.querySelector("#newCaption").value = "";
        document.querySelector("#newImage").value = "";

        attachPostEvents(article);

    });


// ADICIONAR EVENTOS ÀS NOVAS PUBLICAÇÕES
function attachPostEvents(root) {

    // Curtir
    root.querySelector(".like-button")
        .addEventListener("click", () => {

            const button = root.querySelector(".like-button");
            const count = root.querySelector(".like-count");

            const liked = button.classList.toggle("liked");

            count.textContent =
                Number(count.textContent) + (liked ? 1 : -1);

        });


    // Salvar
    root.querySelector(".save-button")
        .addEventListener("click", event => {

            event.currentTarget.classList.toggle("saved");

        });


    // Comentar
    root.querySelector(".comment-button")
        .addEventListener("click", () => {

            root.querySelector(".comment-form input").focus();

        });


    root.querySelector(".comments-link")
        .addEventListener("click", () => {

            root.querySelector(".comment-form input").focus();

        });


    // Publicar comentário
    root.querySelector(".comment-form")
        .addEventListener("submit", event => {

            event.preventDefault();

            const input = root.querySelector(
                ".comment-form input"
            );

            const message = input.value.trim();

            if (!message) return;

            const comment = document.createElement("p");

            comment.className = "caption";

            const name = document.createElement("strong");
            name.textContent = "joaquim_dev";

            comment.appendChild(name);
            comment.appendChild(
                document.createTextNode(" " + message)
            );

            root.querySelector(".comment-form")
                .before(comment);

            input.value = "";

        });


    // Compartilhar
    root.querySelector(".share-button")
        .addEventListener("click", () => {

            alert("Link da publicação pronto para compartilhar!");

        });

}


// PROTEGER TEXTOS INSERIDOS PELO USUÁRIO
function escapeHTML(value) {

    return value.replace(/[&<>"']/g, char => ({

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"

    }[char]));

}

document.addEventListener("DOMContentLoaded", function () {

    const postsContainer = document.getElementById("postsContainer");
    const createModal = document.getElementById("createModal");
    const openCreate = document.getElementById("openCreate");
    const closeModal = document.getElementById("closeModal");
    const imageUpload = document.getElementById("imageUpload");
    const previewContainer = document.getElementById("previewContainer");
    const postCaption = document.getElementById("postCaption");
    const sharePost = document.getElementById("sharePost");
    const toast = document.getElementById("toast");

    let selectedImage = "";
    let toastTimer;

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(function () {
            toast.classList.remove("show");
        }, 2500);
    }


    // CURTIR

    document.addEventListener("click", function (event) {

        const likeButton = event.target.closest(".like-btn");

        if (!likeButton) return;

        likeButton.classList.toggle("liked");

        const post = likeButton.closest(".post");
        const likesElement = post.querySelector(".likes-count");

        let likes = parseInt(likesElement.textContent.replace(/\D/g, "")) || 0;

        if (likeButton.classList.contains("liked")) {
            likes++;
            likeButton.textContent = "♥";
        } else {
            likes--;
            likeButton.textContent = "♡";
        }

        likesElement.textContent = likes.toLocaleString("pt-BR") + " curtidas";
    });


    // SALVAR POST

    document.addEventListener("click", function (event) {

        const saveButton = event.target.closest(".save-btn");

        if (!saveButton) return;

        saveButton.classList.toggle("saved");

        saveButton.textContent = saveButton.classList.contains("saved") ? "▣" : "♧";

        showToast(saveButton.classList.contains("saved")
            ? "Publicação salva!"
            : "Publicação removida dos salvos");
    });


    // COMENTÁRIOS

    document.addEventListener("click", function (event) {

        const publishButton = event.target.closest(".publish-comment");

        if (!publishButton) return;

        const post = publishButton.closest(".post");
        const input = post.querySelector(".comment-input");
        const commentsList = post.querySelector(".comments-list");

        const text = input.value.trim();

        if (!text) return;

        const comment = document.createElement("div");
        comment.className = "comment";

        const username = document.createElement("strong");
        username.textContent = "seu_perfil";

        const commentText = document.createElement("span");
        commentText.textContent = text;

        comment.appendChild(username);
        comment.appendChild(commentText);

        commentsList.appendChild(comment);

        input.value = "";

        showToast("Comentário publicado!");
    });


    // ABRIR MODAL

    openCreate.addEventListener("click", function () {
        createModal.classList.add("show");
    });


    // FECHAR MODAL

    closeModal.addEventListener("click", function () {
        createModal.classList.remove("show");
        resetModal();
    });


    createModal.addEventListener("click", function (event) {
        if (event.target === createModal) {
            createModal.classList.remove("show");
            resetModal();
        }
    });


    // SELECIONAR IMAGEM

    imageUpload.addEventListener("change", function () {

        const file = imageUpload.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            showToast("Selecione um arquivo de imagem.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {

            selectedImage = event.target.result;

            previewContainer.innerHTML = "";

            const image = document.createElement("img");
            image.src = selectedImage;

            previewContainer.appendChild(image);
        };

        reader.readAsDataURL(file);
    });


    // CRIAR PUBLICAÇÃO

    sharePost.addEventListener("click", function () {

        if (!selectedImage) {
            showToast("Selecione uma imagem primeiro.");
            return;
        }

        const captionText = postCaption.value.trim();

        const post = document.createElement("article");
        post.className = "post";

        post.innerHTML = `
            <header class="post-header">
                <div class="user-info">
                    <img class="avatar"
                         src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                         alt="Perfil">
                    <div>
                        <strong>seu_perfil</strong>
                        <span class="location">Compartilhado agora</span>
                    </div>
                </div>
                <button class="post-menu">•••</button>
            </header>

            <div class="post-image">
                <img src="${selectedImage}" alt="Nova publicação">
            </div>

            <div class="post-actions">
                <div class="left-actions">
                    <button class="like-btn" aria-label="Curtir">♡</button>
                    <button class="comment-btn" aria-label="Comentar">♧</button>
                    <button class="share-btn" aria-label="Compartilhar">➤</button>
                </div>
                <button class="save-btn" aria-label="Salvar">♧</button>
            </div>

            <div class="post-details">
                <strong class="likes-count">0 curtidas</strong>

                <p class="caption">
                    <strong>seu_perfil</strong>
                    ${captionText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                </p>

                <button class="view-comments">Ver comentários</button>

                <div class="comments-list"></div>

                <span class="post-date">AGORA</span>

                <div class="comment-input-area">
                <input type="text" placeholder="Adicione um comentário..." class="comment-input">
                <button class="publish-comment">Publicar</button>
                </div>
            </div>
        `;

        postsContainer.prepend(post);

        createModal.classList.remove("show");

        resetModal();

        showToast("Sua publicação foi compartilhada!");
    });


    function resetModal() {
        selectedImage = "";
        imageUpload.value = "";
        previewContainer.innerHTML = "";
        postCaption.value = "";
    }


    // SEGUIR

    document.addEventListener("click", function (event) {

        const followButton = event.target.closest(".follow-btn");

        if (!followButton) return;

        if (followButton.textContent === "Seguir") {
            followButton.textContent = "Seguindo";
            followButton.style.color = "#777";
            showToast("Você começou a seguir este perfil!");
        } else {
            followButton.textContent = "Seguir";
            followButton.style.color = "#398bd8";
            showToast("Você deixou de seguir este perfil.");
        }
    });


    // STORIES

    const stories = document.querySelectorAll(".story:not(.own-story)");
    const storyModal = document.getElementById("storyModal");
    const storyDisplay = document.getElementById("storyDisplay");
    const closeStory = document.getElementById("closeStory");

    stories.forEach(function (story) {

        story.addEventListener("click", function () {

            const image = story.querySelector("img");

            if (!image) return;

            storyDisplay.src = image.src;
            storyModal.classList.add("show");
        });

    });


    closeStory.addEventListener("click", function () {
        storyModal.classList.remove("show");
    });


    storyModal.addEventListener("click", function (event) {
        if (event.target === storyModal) {
            storyModal.classList.remove("show");
        }
    });


    // ADICIONAR STORY

    document.getElementById("addStory").addEventListener("click", function () {
        showToast("Em breve você poderá adicionar seus stories!");
    });


    // MENU

    document.querySelectorAll(".menu-item[data-page]").forEach(function (button) {

        button.addEventListener("click", function () {

            document.querySelectorAll(".menu-item").forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const page = button.dataset.page;

            if (page === "home") {
                showToast("Você está na página inicial.");
            }

            if (page === "search") {
                const search = prompt("O que você deseja pesquisar?");
                if (search) showToast("Pesquisa: " + search);
            }

            if (page === "explore") {
                showToast("Você está explorando novas publicações.");
            }

            if (page === "messages") {
                showToast("Área de mensagens em desenvolvimento.");
            }

            if (page === "notifications") {
                showToast("Você não possui novas notificações.");
            }

            if (page === "profile") {
                showToast("Perfil de seu_perfil");
            }
        });
    });


    // MAIS

    document.getElementById("moreBtn").addEventListener("click", function () {
        showToast("Menu de opções");
    });


    // BOTÕES DOS POSTS

    document.addEventListener("click", function (event) {

        const commentButton = event.target.closest(".comment-btn");

        if (commentButton) {
            const post = commentButton.closest(".post");
            const input = post.querySelector(".comment-input");

            input.focus();
        }

        const shareButton = event.target.closest(".share-btn");

        if (shareButton) {
            const post = shareButton.closest(".post");
            const image = post.querySelector(".post-image img");

            if (navigator.clipboard && image) {
                navigator.clipboard.writeText(image.src)
                    .then(function () {
                        showToast("Link da imagem copiado!");
                    })
                    .catch(function () {
                        showToast("Não foi possível copiar o link.");
                    });
            } else {
                showToast("Compartilhamento indisponível.");
            }
        }

    });


    // VER COMENTÁRIOS

    document.querySelectorAll(".view-comments").forEach(function (button) {

        button.addEventListener("click", function () {

            const post = button.closest(".post");
            const comments = post.querySelector(".comments-list");

            comments.style.display =
                comments.style.display === "none" ? "flex" : "none";

        });

    });


    // BOTÃO ALTERNAR PERFIL

    document.querySelector(".switch-btn").addEventListener("click", function () {
        showToast("Alternância de contas em breve.");
    });


});

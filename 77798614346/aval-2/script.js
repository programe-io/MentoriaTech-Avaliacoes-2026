// ========================================
// PINKFEED - SCRIPT.JS
// ========================================


// ========================================
// TOAST
// ========================================

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


// ========================================
// MODAL
// ========================================

const modal = document.getElementById("modal");

const openCreate = document.getElementById("openCreate");

const closeModal = document.getElementById("closeModal");


openCreate.addEventListener("click", () => {

    modal.classList.add("show");

});


closeModal.addEventListener("click", () => {

    modal.classList.remove("show");

});


modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.classList.remove("show");

    }

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        modal.classList.remove("show");

    }

});


// ========================================
// CURTIDAS
// ========================================

function activateLike(button) {

    button.addEventListener("click", () => {

        const post = button.closest(".post");

        const likesElement = post.querySelector(".likes");

        let likes = parseInt(
            likesElement.textContent.replace(/\D/g, "")
        );

        if (!button.classList.contains("active")) {

            button.classList.add("active");

            button.textContent = "♥";

            likes++;

        } else {

            button.classList.remove("active");

            button.textContent = "♡";

            likes--;

        }

        likesElement.textContent = likes + " curtidas";

    });

}


// ========================================
// SALVAR PUBLICAÇÃO
// ========================================

function activateSave(button) {

    button.addEventListener("click", () => {

        if (!button.classList.contains("active")) {

            button.classList.add("active");

            button.textContent = "♥";

            showToast("Publicação salva 💗");

        } else {

            button.classList.remove("active");

            button.textContent = "♡";

            showToast("Publicação removida dos salvos");

        }

    });

}


// ========================================
// COMENTÁRIOS
// ========================================

function activateComments(button) {

    button.addEventListener("click", () => {

        const post = button.closest(".post");

        const comments = post.querySelector(".comments");

        comments.classList.toggle("show");

        if (comments.classList.contains("show")) {

            button.textContent = "Ocultar comentários";

        } else {

            button.textContent = "Ver comentários";

        }

    });

}


// ========================================
// FORMULÁRIO DE COMENTÁRIO
// ========================================

function activateCommentForm(form) {

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const input = form.querySelector("input");

        const text = input.value.trim();

        if (text === "") {

            showToast("Digite um comentário 💗");

            return;

        }

        const post = form.closest(".post");

        const comments = post.querySelector(".comments");


        // Criar comentário
        const comment = document.createElement("div");

        comment.classList.add("comment");


        const username = document.createElement("strong");

        username.textContent = "Você";


        const commentText = document.createTextNode(
            " " + text
        );


        comment.appendChild(username);

        comment.appendChild(commentText);


        comments.appendChild(comment);


        // Mostrar comentários
        comments.classList.add("show");


        const commentsButton =
            post.querySelector(".comments-button");

        commentsButton.textContent =
            "Ocultar comentários";


        // Limpar campo
        input.value = "";


        showToast("Comentário publicado 💕");

    });

}


// ========================================
// COMPARTILHAR
// ========================================

function activateShare(button) {

    button.addEventListener("click", async () => {

        const post = button.closest(".post");

        const username =
            post.querySelector(".post-user strong").textContent;


        const text =
            `Confira esta publicação de ${username} no PinkFeed 💗`;


        try {

            if (navigator.share) {

                await navigator.share({
                    title: "PinkFeed",
                    text: text
                });

            } else {

                await navigator.clipboard.writeText(text);

                showToast("Texto copiado! 💗");

            }

        } catch (error) {

            console.log("Compartilhamento cancelado.");

        }

    });

}


// ========================================
// ATIVAR FUNÇÕES DAS PUBLICAÇÕES
// ========================================

function activatePost(post) {

    const likeButton =
        post.querySelector(".like-button");

    const saveButton =
        post.querySelector(".save-button");

    const commentsButton =
        post.querySelector(".comments-button");

    const commentForm =
        post.querySelector(".comment-form");

    const shareButton =
        post.querySelector(".share-button");


    if (likeButton) {
        activateLike(likeButton);
    }

    if (saveButton) {
        activateSave(saveButton);
    }

    if (commentsButton) {
        activateComments(commentsButton);
    }

    if (commentForm) {
        activateCommentForm(commentForm);
    }

    if (shareButton) {
        activateShare(shareButton);
    }

}


// ========================================
// ATIVAR POSTS EXISTENTES
// ========================================

document.querySelectorAll(".post").forEach((post) => {

    activatePost(post);

});


// ========================================
// PESQUISA
// ========================================

const searchInput =
    document.getElementById("searchInput");


searchInput.addEventListener("input", () => {

    const search =
        searchInput.value.toLowerCase().trim();


    document.querySelectorAll(".post").forEach((post) => {

        const text =
            post.textContent.toLowerCase();


        if (text.includes(search)) {

            post.style.display = "";

        } else {

            post.style.display = "none";

        }

    });

});


// ========================================
// MODO ESCURO
// ========================================

const themeButton =
    document.getElementById("themeButton");


const savedTheme =
    localStorage.getItem("pinkfeed-theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeButton.textContent = "☀️";

}


themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        localStorage.setItem(
            "pinkfeed-theme",
            "dark"
        );

        themeButton.textContent = "☀️";

        showToast("Modo escuro ativado 🌙");

    } else {

        localStorage.setItem(
            "pinkfeed-theme",
            "light"
        );

        themeButton.textContent = "🌙";

        showToast("Modo claro ativado ☀️");

    }

});


// ========================================
// CRIAR NOVA PUBLICAÇÃO
// ========================================

const postForm =
    document.getElementById("postForm");


postForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const username =
        document.getElementById("postUser").value.trim();


    const image =
        document.getElementById("postImage").value;


    const caption =
        document.getElementById("postCaption").value.trim();


    if (!username || !caption) {

        showToast("Preencha todos os campos 💗");

        return;

    }


    // ====================================
    // CRIAR ELEMENTOS
    // ====================================

    const post =
        document.createElement("article");

    post.classList.add("post");


    // HEADER
    const header =
        document.createElement("div");

    header.classList.add("post-header");


    const user =
        document.createElement("div");

    user.classList.add("post-user");


    const avatar =
        document.createElement("div");

    avatar.classList.add("small-avatar");

    avatar.textContent =
        username.charAt(0).toUpperCase();


    const userInfo =
        document.createElement("div");


    const strong =
        document.createElement("strong");

    strong.textContent = username;


    const time =
        document.createElement("span");

    time.textContent = "Agora";


    userInfo.appendChild(strong);

    userInfo.appendChild(time);


    user.appendChild(avatar);

    user.appendChild(userInfo);


    const more =
        document.createElement("button");

    more.classList.add("more-button");

    more.textContent = "•••";


    header.appendChild(user);

    header.appendChild(more);


    // IMAGEM
    const imageContainer =
        document.createElement("div");

    imageContainer.classList.add("post-image");


    const img =
        document.createElement("img");

    img.src = image;

    img.alt = "Nova publicação";


    imageContainer.appendChild(img);


    // AÇÕES
    const actions =
        document.createElement("div");

    actions.classList.add("post-actions");


    const leftActions =
        document.createElement("div");


    const like =
        document.createElement("button");

    like.classList.add("like-button");

    like.textContent = "♡";


    const comment =
        document.createElement("button");

    comment.classList.add("comment-button");

    comment.textContent = "💬";


    const share =
        document.createElement("button");

    share.classList.add("share-button");

    share.textContent = "➤";


    leftActions.appendChild(like);

    leftActions.appendChild(comment);

    leftActions.appendChild(share);


    const save =
        document.createElement("button");

    save.classList.add("save-button");

    save.textContent = "♡";


    actions.appendChild(leftActions);

    actions.appendChild(save);


    // CONTEÚDO
    const content =
        document.createElement("div");

    content.classList.add("post-content");


    const likes =
        document.createElement("strong");

    likes.classList.add("likes");

    likes.textContent = "0 curtidas";


    const paragraph =
        document.createElement("p");


    const captionUser =
        document.createElement("strong");

    captionUser.textContent = username;


    paragraph.appendChild(captionUser);

    paragraph.appendChild(
        document.createTextNode(" " + caption)
    );


    const commentsButton =
        document.createElement("button");

    commentsButton.classList.add(
        "comments-button"
    );

    commentsButton.textContent =
        "Ver comentários";


    const comments =
        document.createElement("div");

    comments.classList.add("comments");


    const form =
        document.createElement("form");

    form.classList.add("comment-form");


    const input =
        document.createElement("input");

    input.type = "text";

    input.placeholder =
        "Adicione um comentário...";


    const publish =
        document.createElement("button");

    publish.type = "submit";

    publish.textContent = "Publicar";


    form.appendChild(input);

    form.appendChild(publish);


    content.appendChild(likes);

    content.appendChild(paragraph);

    content.appendChild(commentsButton);

    content.appendChild(comments);

    content.appendChild(form);


    // MONTAR POST
    post.appendChild(header);

    post.appendChild(imageContainer);

    post.appendChild(actions);

    post.appendChild(content);


    // COLOCAR NO COMEÇO DO FEED
    const feed =
        document.getElementById("feed");


    feed.prepend(post);


    // ATIVAR BOTÕES
    activatePost(post);


    // FECHAR MODAL
    modal.classList.remove("show");


    // LIMPAR FORMULÁRIO
    postForm.reset();


    showToast("Publicação criada com sucesso! 💗");

});


// ========================================
// BOTÃO DE COMENTÁRIO
// ========================================

document.querySelectorAll(".comment-button").forEach((button) => {

    button.addEventListener("click", () => {

        const post =
            button.closest(".post");

        const comments =
            post.querySelector(".comments");

        comments.classList.add("show");

        const commentsButton =
            post.querySelector(".comments-button");

        commentsButton.textContent =
            "Ocultar comentários";

        commentsButton.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});


// ========================================
// MENSAGEM INICIAL
// ========================================

console.log("💗 PinkFeed carregado com sucesso!");
document.addEventListener("DOMContentLoaded", () => {

    const feed = document.getElementById("feed");
    const postInput = document.getElementById("post-input");
    const publicarBtn = document.getElementById("btn-publicar");


    // =========================================
    // CURTIR
    // =========================================

    feed.addEventListener("click", (event) => {

        const button =
            event.target.closest(".btn-curtir");

        if (!button) return;

        const post =
            button.closest(".post");

        const likesNumber =
            post.querySelector(".likes-number");

        const icon =
            button.querySelector(".action-icon");

        let likes =
            Number(likesNumber.textContent);

        if (button.classList.contains("liked")) {

            likes--;

            button.classList.remove("liked");

            icon.textContent = "♡";

        } else {

            likes++;

            button.classList.add("liked");

            icon.textContent = "♥";
        }

        likesNumber.textContent = likes;
    });


    // =========================================
    // COMENTAR
    // =========================================

    feed.addEventListener("click", (event) => {

        const button =
            event.target.closest(".btn-comentar");

        if (!button) return;

        const post =
            button.closest(".post");

        const comments =
            post.querySelector(".comments-section");

        comments.classList.toggle("active");

        if (comments.classList.contains("active")) {

            const input =
                comments.querySelector(".comment-input");

            setTimeout(() => {
                input.focus();
            }, 100);
        }
    });


    // =========================================
    // ENVIAR COMENTÁRIO
    // =========================================

    feed.addEventListener("click", (event) => {

        const button =
            event.target.closest(".btn-enviar-comentario");

        if (!button) return;

        const comments =
            button.closest(".comments-section");

        adicionarComentario(comments);
    });


    // =========================================
    // ENTER NO COMENTÁRIO
    // =========================================

    feed.addEventListener("keydown", (event) => {

        if (
            !event.target.classList.contains(
                "comment-input"
            )
        ) {
            return;
        }

        if (event.key !== "Enter") return;

        event.preventDefault();

        const comments =
            event.target.closest(".comments-section");

        adicionarComentario(comments);
    });


    // =========================================
    // ADICIONAR COMENTÁRIO
    // =========================================

    function adicionarComentario(comments) {

        const input =
            comments.querySelector(".comment-input");

        const list =
            comments.querySelector(".comments-list");

        const post =
            comments.closest(".post");

        const texto =
            input.value.trim();

        if (!texto) {

            input.focus();

            return;
        }


        const comment =
            document.createElement("div");

        comment.className =
            "comment-item";


        const name =
            document.createElement("strong");

        name.textContent =
            "Você:";


        const text =
            document.createElement("span");

        text.textContent =
            texto;


        comment.appendChild(name);
        comment.appendChild(text);

        list.appendChild(comment);


        // Atualiza contador

        const counter =
            post.querySelector(".comments-info");

        const quantidade =
            list.querySelectorAll(
                ".comment-item"
            ).length;

        counter.textContent =
            `${quantidade} comentário${quantidade !== 1 ? "s" : ""}`;


        input.value = "";

        input.focus();
    }


    // =========================================
    // COMPARTILHAR
    // =========================================

    feed.addEventListener("click", async (event) => {

        const button =
            event.target.closest(".btn-compartilhar");

        if (!button) return;

        const post =
            button.closest(".post");

        const texto =
            post.querySelector(".post-text").innerText;


        if (navigator.share) {

            try {

                await navigator.share({
                    title: "MidiFeed",
                    text: texto
                });

            } catch (error) {
                // Usuário cancelou
            }

        } else {

            try {

                await navigator.clipboard.writeText(texto);

                const original =
                    button.innerHTML;

                button.innerHTML =
                    "✓ Copiado!";

                setTimeout(() => {

                    button.innerHTML =
                        original;

                }, 1500);

            } catch (error) {

                alert(
                    "Não foi possível copiar o post."
                );

            }
        }
    });


    // =========================================
    // PUBLICAR POST
    // =========================================

    publicarBtn.addEventListener(
        "click",
        publicarPost
    );


    postInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Enter") return;

            event.preventDefault();

            publicarPost();
        }
    );


    function publicarPost() {

        const texto =
            postInput.value.trim();

        if (!texto) {

            postInput.focus();

            return;
        }


        // Cria post

        const post =
            document.createElement("article");

        post.className =
            "post";


        // =====================================
        // CABEÇALHO
        // =====================================

        const header =
            document.createElement("div");

        header.className =
            "post-header";


        const avatar =
            document.createElement("div");

        avatar.className =
            "avatar avatar-purple";

        avatar.textContent =
            "M";


        const user =
            document.createElement("div");

        user.className =
            "post-user";


        const name =
            document.createElement("strong");

        name.textContent =
            "Mathias";


        const time =
            document.createElement("span");

        time.textContent =
            "agora mesmo · 🌎";


        user.appendChild(name);
        user.appendChild(time);


        const menu =
            document.createElement("button");

        menu.className =
            "post-menu";

        menu.textContent =
            "⋯";


        header.appendChild(avatar);
        header.appendChild(user);
        header.appendChild(menu);


        // =====================================
        // TEXTO
        // =====================================

        const postText =
            document.createElement("div");

        postText.className =
            "post-text";

        postText.textContent =
            texto;


        // =====================================
        // INFORMAÇÕES
        // =====================================

        const info =
            document.createElement("div");

        info.className =
            "post-info";


        const likes =
            document.createElement("span");

        likes.className =
            "likes-info";

        likes.innerHTML =
            '❤️ <span class="likes-number">0</span>';


        const comments =
            document.createElement("span");

        comments.className =
            "comments-info";

        comments.textContent =
            "0 comentários";


        info.appendChild(likes);
        info.appendChild(comments);


        // =====================================
        // AÇÕES
        // =====================================

        const actions =
            document.createElement("div");

        actions.className =
            "post-actions";


        const likeButton =
            document.createElement("button");

        likeButton.className =
            "btn-curtir";

        likeButton.innerHTML =
            '<span class="action-icon">♡</span> Curtir';


        const commentButton =
            document.createElement("button");

        commentButton.className =
            "btn-comentar";

        commentButton.innerHTML =
            '<span class="action-icon">💬</span> Comentar';


        const shareButton =
            document.createElement("button");

        shareButton.className =
            "btn-compartilhar";

        shareButton.innerHTML =
            '<span class="action-icon">↗</span> Compartilhar';


        actions.appendChild(likeButton);
        actions.appendChild(commentButton);
        actions.appendChild(shareButton);


        // =====================================
        // COMENTÁRIOS
        // =====================================

        const commentsSection =
            document.createElement("div");

        commentsSection.className =
            "comments-section";


        const commentsList =
            document.createElement("div");

        commentsList.className =
            "comments-list";


        const commentBox =
            document.createElement("div");

        commentBox.className =
            "comment-box";


        const commentAvatar =
            document.createElement("div");

        commentAvatar.className =
            "avatar avatar-purple small";

        commentAvatar.textContent =
            "M";


        const commentInput =
            document.createElement("input");

        commentInput.className =
            "comment-input";

        commentInput.type =
            "text";

        commentInput.maxLength =
            300;

        commentInput.placeholder =
            "Escreva um comentário...";


        const sendButton =
            document.createElement("button");

        sendButton.className =
            "btn-enviar-comentario";

        sendButton.textContent =
            "➤";


        commentBox.appendChild(commentAvatar);
        commentBox.appendChild(commentInput);
        commentBox.appendChild(sendButton);


        commentsSection.appendChild(
            commentsList
        );

        commentsSection.appendChild(
            commentBox
        );


        // =====================================
        // MONTAR POST
        // =====================================

        post.appendChild(header);
        post.appendChild(postText);
        post.appendChild(info);
        post.appendChild(actions);
        post.appendChild(commentsSection);


        // =====================================
        // COLOCAR NO TOPO
        // =====================================

        feed.prepend(post);


        // Limpar

        postInput.value = "";

        postInput.focus();


        // Feedback

        publicarBtn.textContent =
            "Publicado ✓";


        setTimeout(() => {

            publicarBtn.textContent =
                "Publicar";

        }, 1200);
    }

});
const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("image-preview");
const previewImg = document.getElementById("preview-img");
const removeImage = document.getElementById("remove-image");

let imagemSelecionada = null;
// =========================================
// SELECIONAR FOTO
// =========================================

imageInput.addEventListener("change", () => {

    const arquivo = imageInput.files[0];

    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
        alert("Escolha uma imagem válida.");
        return;
    }

    imagemSelecionada = arquivo;

    const url = URL.createObjectURL(arquivo);

    previewImg.src = url;

    imagePreview.classList.add("active");
});
// =========================================
// REMOVER FOTO
// =========================================

removeImage.addEventListener("click", () => {

    imagemSelecionada = null;

    imageInput.value = "";

    previewImg.src = "";

    imagePreview.classList.remove("active");
});
let postImage = null;

if (imagemSelecionada) {

    postImage = document.createElement("img");

    postImage.className = "post-image";

    postImage.src =
        URL.createObjectURL(imagemSelecionada);

    postImage.alt =
        "Imagem publicada por Mathias";
}
post.appendChild(header);
post.appendChild(postText);

if (postImage) {
    post.appendChild(postImage);
}

post.appendChild(info);
post.appendChild(actions);
post.appendChild(commentsSection);
imagemSelecionada = null;

imageInput.value = "";

previewImg.src = "";

imagePreview.classList.remove("active");

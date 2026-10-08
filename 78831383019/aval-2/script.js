// ==========================================
// CURTIDAS
// ==========================================

const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const post = button.closest(".post");

        const likesElement =
            post.querySelector(".likes-count");

        let likes = Number(
            likesElement.textContent
                .replace(".", "")
                .replace(",", "")
        );


        const isLiked =
            button.classList.toggle("liked");


        if (isLiked) {

            likes++;

            button.textContent = "♥";

        } else {

            likes--;

            button.textContent = "♡";

        }


        likesElement.textContent =
            likes.toLocaleString("pt-BR");

    });

});


// ==========================================
// SALVAR PUBLICAÇÃO
// ==========================================

const saveButtons =
    document.querySelectorAll(".save-button");


saveButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const saved =
            button.classList.toggle("saved");


        if (saved) {

            button.textContent = "♣";

        } else {

            button.textContent = "♧";

        }

    });

});


// ==========================================
// COMENTÁRIOS
// ==========================================

const commentForms =
    document.querySelectorAll(".comment-form");


commentForms.forEach((form) => {

    const input =
        form.querySelector(".comment-input");

    const button =
        form.querySelector(".comment-button");


    // Ativa o botão Publicar
    input.addEventListener("input", () => {

        const hasText =
            input.value.trim().length > 0;

        button.classList.toggle(
            "active",
            hasText
        );

    });


    // Envia comentário
    form.addEventListener("submit", (event) => {

        event.preventDefault();


        const text =
            input.value.trim();


        if (!text) {
            return;
        }


        const post =
            form.closest(".post");


        const comments =
            post.querySelector(".comments");


        comments.textContent =
            `Você: ${text}`;


        input.value = "";

        button.classList.remove("active");

    });

});


// ==========================================
// SEGUIR USUÁRIOS
// ==========================================

const followButtons =
    document.querySelectorAll(".follow-button");


followButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const following =
            button.classList.toggle("following");


        if (following) {

            button.textContent = "Seguindo";

            button.style.color = "#737373";

        } else {

            button.textContent = "Seguir";

            button.style.color = "#0095f6";

        }

    });

});


// ==========================================
// PESQUISA
// ==========================================

const search =
    document.querySelector(".search");


search.addEventListener("keydown", (event) => {

    if (event.key !== "Enter") {
        return;
    }


    const value =
        search.value.trim();


    if (!value) {
        return;
    }


    alert(`Pesquisando por: ${value}`);

});


// ==========================================
// BOTÃO DE COMENTÁRIOS
// ==========================================

const commentLinks =
    document.querySelectorAll(".comments");


commentLinks.forEach((button) => {

    button.addEventListener("click", () => {

        const post =
            button.closest(".post");


        const input =
            post.querySelector(".comment-input");


        input.focus();

    });

});
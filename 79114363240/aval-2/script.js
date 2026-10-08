// =====================================
// CURTIR PUBLICAÇÃO
// =====================================

const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const post = button.closest(".post");
        const likes = post.querySelector(".likes");

        let number = parseInt(
            likes.textContent.replace(/\D/g, "")
        );

        if (button.classList.contains("liked")) {

            button.classList.remove("liked");
            button.textContent = "♡";

            number--;

        } else {

            button.classList.add("liked");
            button.textContent = "♥";

            number++;
        }

        likes.textContent = `${number.toLocaleString("pt-BR")} curtidas`;

    });

});


// =====================================
// COMENTÁRIOS
// =====================================

const commentForms =
    document.querySelectorAll(".comment-form");

commentForms.forEach((form) => {

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const input = form.querySelector("input");
        const text = input.value.trim();

        if (!text) {
            return;
        }

        const comments =
            form.closest(".post-content")
                .querySelector(".comments");

        const comment = document.createElement("p");

        comment.innerHTML = `
            <strong>meu_usuario</strong>
            ${text}
        `;

        comments.appendChild(comment);

        input.value = "";

    });

});


// =====================================
// BOTÃO SEGUIR
// =====================================

const followButtons =
    document.querySelectorAll(".suggestion button");

followButtons.forEach((button) => {

    button.addEventListener("click", () => {

        if (button.textContent === "Seguir") {

            button.textContent = "Seguindo";
            button.style.color = "#777";

        } else {

            button.textContent = "Seguir";
            button.style.color = "#0095f6";
        }

    });

});


// =====================================
// PESQUISA
// =====================================

const searchInput =
    document.querySelector("#searchInput");

const posts =
    document.querySelectorAll(".post");

searchInput.addEventListener("input", () => {

    const search =
        searchInput.value.toLowerCase().trim();

    posts.forEach((post) => {

        const content =
            post.textContent.toLowerCase();

        if (content.includes(search)) {
            post.style.display = "";
        } else {
            post.style.display = "none";
        }

    });

});


// =====================================
// DUPLO CLIQUE PARA CURTIR
// =====================================

const postImages =
    document.querySelectorAll(".post-image img");

postImages.forEach((image) => {

    image.addEventListener("dblclick", () => {

        const post = image.closest(".post");

        const button =
            post.querySelector(".like-button");

        if (!button.classList.contains("liked")) {
            button.click();
        }

    });

});
// ==============================
// CURTIR PUBLICAÇÃO
// ==============================

const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {
            button.textContent = "♥";
            button.setAttribute("aria-label", "Descurtir publicação");
        } else {
            button.textContent = "♡";
            button.setAttribute("aria-label", "Curtir publicação");
        }
    });
});


// ==============================
// SEGUIR USUÁRIO
// ==============================

const followButtons = document.querySelectorAll(".follow-button");

followButtons.forEach((button) => {
    button.addEventListener("click", () => {

        const isFollowing =
            button.classList.toggle("following");

        if (isFollowing) {
            button.textContent = "Seguindo";
        } else {
            button.textContent = "Seguir";
        }
    });
});


// ==============================
// SALVAR PUBLICAÇÃO
// ==============================

const saveButtons = document.querySelectorAll(".save-button");

saveButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const saved = button.classList.toggle("saved");

        if (saved) {
            button.textContent = "♟";
            button.setAttribute(
                "aria-label",
                "Remover publicação dos salvos"
            );
        } else {
            button.textContent = "♧";
            button.setAttribute(
                "aria-label",
                "Salvar publicação"
            );
        }
    });

});


// ==============================
// MODO ESCURO
// ==============================

const themeButton = document.querySelector("#themeButton");

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const darkMode =
        document.body.classList.contains("dark");

    themeButton.textContent = darkMode ? "☀" : "☾";

    themeButton.setAttribute(
        "aria-label",
        darkMode
            ? "Ativar modo claro"
            : "Ativar modo escuro"
    );
});


// ==============================
// BUSCA
// ==============================

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", () => {

    const search = searchInput.value
        .trim()
        .toLowerCase();

    const posts = document.querySelectorAll(".post");

    posts.forEach((post) => {

        const content = post.textContent.toLowerCase();

        post.style.display =
            content.includes(search)
                ? ""
                : "none";
    });
});


// ==============================
// DUPLO CLIQUE PARA CURTIR
// ==============================

const postImages = document.querySelectorAll(".post__image");

postImages.forEach((image) => {

    image.addEventListener("dblclick", () => {

        const likeButton =
            image.closest(".post")
                .querySelector(".like-button");

        if (!likeButton.classList.contains("liked")) {
            likeButton.click();
        }
    });

});
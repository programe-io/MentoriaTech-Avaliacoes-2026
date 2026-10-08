// ==============================
// CURTIR PUBLICAÇÃO
// ==============================

const likeButtons =
    document.querySelectorAll(".like-button");


likeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const liked =
            button.classList.toggle("liked");


        if (liked) {

            button.textContent = "♥";

            button.setAttribute(
                "aria-label",
                "Descurtir publicação"
            );

        } else {

            button.textContent = "♡";

            button.setAttribute(
                "aria-label",
                "Curtir publicação"
            );

        }

    });

});


// ==============================
// SALVAR PUBLICAÇÃO
// ==============================

const saveButtons =
    document.querySelectorAll(".save-button");


saveButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const saved =
            button.classList.toggle("saved");


        if (saved) {

            button.textContent = "🔖";

            button.setAttribute(
                "aria-label",
                "Remover publicação dos salvos"
            );

        } else {

            button.textContent = "♡";

            button.setAttribute(
                "aria-label",
                "Salvar publicação"
            );

        }

    });

});


// ==============================
// SEGUIR USUÁRIO
// ==============================

const followButtons =
    document.querySelectorAll(".follow");


followButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const following =
            button.textContent.trim() === "Seguindo";


        if (following) {

            button.textContent = "Seguir";
            button.style.color = "#0095f6";

        } else {

            button.textContent = "Seguindo";
            button.style.color = "#262626";

        }

    });

});


// ==============================
// PESQUISA
// ==============================

const searchInput =
    document.querySelector("#search");


if (searchInput) {

    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            const value =
                searchInput.value.trim();

            if (value !== "") {

                console.log(
                    "Pesquisando por:",
                    value
                );

            }

        }

    });

}
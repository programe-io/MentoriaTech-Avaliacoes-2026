
// SISTEMA DE CURTIDAS

const likeButtons = document.querySelectorAll(".like");

likeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const post = button.closest(".post");
        const likesText = post.querySelector(".likes");

        let likes = parseInt(
            likesText.textContent.replace(/\D/g, "")
        );

        if (button.classList.contains("liked")) {

            button.classList.remove("liked");
            button.textContent = "♡";
            likes--;

        } else {

            button.classList.add("liked");
            button.textContent = "♥";
            likes++;

        }

        likesText.textContent =
            likes.toLocaleString("pt-BR") + " curtidas";

    });

});


// SISTEMA DE COMENTÁRIOS

const commentInputs = document.querySelectorAll(
    ".post-info input"
);

commentInputs.forEach((input) => {

    input.addEventListener("keydown", (event) => {

        if (
            event.key === "Enter" &&
            input.value.trim() !== ""
        ) {

            const postInfo = input.closest(".post-info");

            const comment = document.createElement("p");
            const username = document.createElement("strong");

            username.textContent = "Você ";

            comment.appendChild(username);

            comment.appendChild(
                document.createTextNode(input.value)
            );

            postInfo.insertBefore(comment, input);

            input.value = "";

        }

    });

});


// SISTEMA DE SALVAR PUBLICAÇÃO

document.querySelectorAll(".save").forEach((button) => {

    button.addEventListener("click", () => {

        if (button.textContent === "♧") {

            button.textContent = "🔖";

        } else {

            button.textContent = "♧";

        }

    });

});

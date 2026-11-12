
// FUNÇÃO DE CURTIR PUBLICAÇÃO

const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const icon = button.querySelector("i");

        const post = button.closest(".post");

        const likes = post.querySelector(".likes-count");

        let total = Number(likes.textContent.replace(".", ""));

        // Verifica se a publicação já foi curtida

        if (button.classList.contains("liked")) {

            button.classList.remove("liked");

            icon.classList.remove("bxs-heart");

            icon.classList.add("bx-heart");

            total--;

        } else {

            button.classList.add("liked");

            icon.classList.remove("bx-heart");

            icon.classList.add("bxs-heart");

            total++;

        }

        // Atualiza a quantidade de curtidas

        likes.textContent = total.toLocaleString("pt-BR");

    });

});


// FUNÇÃO DE SEGUIR USUÁRIOS

const followButtons = document.querySelectorAll(".follow-button");

followButtons.forEach((button) => {

    button.addEventListener("click", () => {

        if (button.textContent.trim() === "Seguir") {

            button.textContent = "Seguindo";

            button.style.color = "#8e8e8e";

        } else {

            button.textContent = "Seguir";

            button.style.color = "#0095f6";

        }

    });

});

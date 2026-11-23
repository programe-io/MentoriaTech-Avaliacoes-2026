
document.addEventListener("DOMContentLoaded", () => {

    // SISTEMA DE CURTIDAS

    document.querySelectorAll(".like-btn").forEach(button => {

        button.addEventListener("click", () => {

            const post = button.closest(".post");
            const likes = post.querySelector(".likes");

            let total = parseInt(likes.dataset.total || "120");

            if (button.classList.contains("liked")) {
                button.classList.remove("liked");
                button.innerHTML = "♡";
                total--;
            } else {
                button.classList.add("liked");
                button.innerHTML = "♥";
                total++;
            }

            likes.dataset.total = total;
            likes.textContent = total + " curtidas";

        });

    });

    // SISTEMA DE COMENTÁRIOS

    document.querySelectorAll(".send-comment").forEach(button => {

        button.addEventListener("click", () => {

            const post = button.closest(".post");
            const input = post.querySelector(".comment-area input");
            const comment = input.value.trim();

            if (comment === "") {
                alert("Digite um comentário!");
                return;
            }

            const newComment = document.createElement("p");

            const username = document.createElement("strong");
            username.textContent = " seu_usuario ";

            newComment.appendChild(username);
            newComment.appendChild(
                document.createTextNode(comment)
            );

            post.querySelector(".post-info").insertBefore(
                newComment,
                post.querySelector(".comment-area")
            );

            input.value = "";

        });

    });

    // SALVAR PUBLICAÇÃO

    document.querySelectorAll(".save-btn").forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("saved");

            if (button.classList.contains("saved")) {
                button.innerHTML = "▣";
                alert("Publicação salva!");
            } else {
                button.innerHTML = "♧";
            }

        });

    });

    // BOTÃO SEGUIR

    document.querySelectorAll(".suggestion button").forEach(button => {

        button.addEventListener("click", () => {

            if (button.textContent === "Seguir") {
                button.textContent = "Seguindo";
                button.style.color = "#888";
            } else {
                button.textContent = "Seguir";
                button.style.color = "#0095f6";
            }

        });

    });

    // BOTÃO DE COMENTÁRIO

    document.querySelectorAll(".comment-btn").forEach(button => {

        button.addEventListener("click", () => {

            const input = button.closest(".post")
                .querySelector(".comment-area input");

            input.focus();

        });

    });

});

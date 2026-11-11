
// SISTEMA DE CURTIDAS

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(button => {

    button.addEventListener("click", function() {

        const post = this.closest(".post");
        const likes = post.querySelector(".likes");

        let quantidade = parseInt(
            likes.textContent
        );

        if (this.classList.contains("liked")) {

            this.classList.remove("liked");
            this.textContent = "♡";

            quantidade--;

        } else {

            this.classList.add("liked");
            this.textContent = "♥";

            quantidade++;

        }

        likes.textContent = quantidade + " curtidas";

    });

});


// SISTEMA DE COMENTÁRIOS

const commentInputs = document.querySelectorAll(
    ".comment-input"
);

commentInputs.forEach(input => {

    input.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            const texto = this.value.trim();

            if (texto !== "") {

                const comentario = document.createElement("p");

                const usuario = document.createElement("strong");
                usuario.textContent = "meu_usuario ";

                comentario.appendChild(usuario);
                comentario.appendChild(
                    document.createTextNode(texto)
                );

                this.before(comentario);

                this.value = "";

            }

        }

    });

});

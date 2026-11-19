
// Sistema de curtidas
document.querySelectorAll(".like-btn").forEach(button => {

    button.addEventListener("click", () => {

        const post = button.closest(".post");
        const likes = post.querySelector(".likes");

        let quantidade = parseInt(likes.textContent);

        if (button.classList.contains("liked")) {

            button.classList.remove("liked");
            button.textContent = "♡";
            quantidade--;

        } else {

            button.classList.add("liked");
            button.textContent = "♥";
            quantidade++;
        }

        likes.textContent = quantidade + " curtidas";
    });

});

// Sistema de comentários
document.querySelectorAll(".comment-form").forEach(form => {

    form.addEventListener("submit", event => {

        event.preventDefault();

        const input = form.querySelector("input");
        const texto = input.value.trim();

        if (texto === "") {
            return;
        }

        const post = form.closest(".post");
        const comentarios = post.querySelector(".comments");

        const comentario = document.createElement("p");
        const usuario = document.createElement("strong");

        usuario.textContent = "voce ";
        comentario.appendChild(usuario);
        comentario.appendChild(document.createTextNode(texto));

        comentarios.appendChild(comentario);

        input.value = "";
    });

});

// Sistema de salvar publicação
document.querySelectorAll(".save-btn").forEach(button => {

    button.addEventListener("click", () => {

        if (button.classList.contains("saved")) {

            button.classList.remove("saved");
            button.textContent = "♧";

        } else {

            button.classList.add("saved");
            button.textContent = "▣";
        }
    });

});

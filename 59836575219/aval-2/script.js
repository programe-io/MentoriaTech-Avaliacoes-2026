
// SISTEMA DE CURTIDAS

document.querySelectorAll(".like").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");

        const post = button.closest(".post");
        const likes = post.querySelector(".likes");

        let quantidade = parseInt(likes.textContent.replace(/\D/g, ""));

        if (button.classList.contains("active")) {
            button.textContent = "♥";
            quantidade++;
        } else {
            button.textContent = "♡";
            quantidade--;
        }

        likes.textContent = quantidade.toLocaleString("pt-BR") + " curtidas";
    });
});

// SISTEMA DE SALVAR PUBLICAÇÃO

document.querySelectorAll(".save").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");

        if (button.classList.contains("active")) {
            button.textContent = "🔖";
        } else {
            button.textContent = "♡";
        }
    });
});

// SISTEMA DE COMENTÁRIOS

document.querySelectorAll(".send-comment").forEach(button => {
    button.addEventListener("click", () => {
        const post = button.closest(".post");
        const input = post.querySelector("input");
        const texto = input.value.trim();

        if (texto === "") {
            alert("Digite um comentário!");
            return;
        }

        const comentario = document.createElement("p");

        comentario.innerHTML = `<strong>Você:</strong> ${
            texto.replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
        }`;

        post.querySelector(".post-info").appendChild(comentario);

        input.value = "";
    });
});

// CURTIR COM DOIS CLIQUES NA FOTO

document.querySelectorAll(".post-image").forEach(image => {
    image.addEventListener("dblclick", () => {
        const post = image.closest(".post");
        const button = post.querySelector(".like");

        if (!button.classList.contains("active")) {
            button.click();
        }
    });
});

// BOTÃO DE COMENTÁRIO

document.querySelectorAll(".comment").forEach(button => {
    button.addEventListener("click", () => {
        const post = button.closest(".post");
        post.querySelector("input").focus();
    });
});

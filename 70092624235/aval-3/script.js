/ ==========================================
// GLOW NAILS
// Desenvolvedora: Maria Eduarda
// ==========================================


// CURTIR POST
const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(button => {

    button.addEventListener("click", function () {

        const post = this.closest(".post");
        const likesElement = post.querySelector(".likes");

        let likes = parseInt(
            likesElement.innerText.replace(/\D/g, "")
        );

        if (!this.classList.contains("liked")) {

            likes++;
            this.classList.add("liked");
            this.innerText = "♥";

        } else {

            likes--;
            this.classList.remove("liked");
            this.innerText = "♡";

        }

        likesElement.innerText =
            likes.toLocaleString("pt-BR") + " curtidas";

    });

});


// PUBLICAR COMENTÁRIO
const commentButtons =
    document.querySelectorAll(".add-comment button");

commentButtons.forEach(button => {

    button.addEventListener("click", function () {

        const container = this.closest(".add-comment");
        const input = container.querySelector("input");

        const comment = input.value.trim();

        if (comment === "") {
            alert("Digite um comentário primeiro! 💗");
            return;
        }

        const post = this.closest(".post");

        const newComment = document.createElement("p");

        newComment.classList.add("new-comment");

        newComment.innerHTML =
            `<strong>Você</strong> ${comment}`;

        const addComment =
            post.querySelector(".add-comment");

        addComment.before(newComment);

        input.value = "";

    });

});


// BOTÕES DE SEGUIR
const followButtons =
    document.querySelectorAll(".suggestion button");

followButtons.forEach(button => {

    button.addEventListener("click", function () {

        if (this.innerText === "Seguir") {

            this.innerText = "Seguindo";
            this.style.color = "#777";

        } else {

            this.innerText = "Seguir";
            this.style.color = "#d94f91";

        }

    });

});


// BOTÃO EDITAR PERFIL
const editProfile =
    document.querySelector(".follow");

editProfile.addEventListener("click", () => {

    alert(
        "Área de edição do perfil 💅\n\n" +
        "Perfil: Maria Eduarda\n" +
        "Especialidade: Nail Designer"
    );

});


// PESQUISA
const searchInput =
    document.querySelector(".search input");

searchInput.addEventListener("keyup", function () {

    const search = this.value.toLowerCase();

    const posts =
        document.querySelectorAll(".post");

    posts.forEach(post => {

        const content =
            post.innerText.toLowerCase();

        if (content.includes(search)) {
            post.style.display = "";
        } else {
            post.style.display = "none";
        }

    });

});


// ANIMAÇÃO AO CARREGAR
window.addEventListener("load", () => {

    const posts =
        document.querySelectorAll(".post");

    posts.forEach((post, index) => {

        post.style.opacity = "0";
        post.style.transform = "translateY(20px)";

        setTimeout(() => {

            post.style.transition =
                "all 0.5s ease";

            post.style.opacity = "1";
            post.style.transform = "translateY(0)";

        }, index * 200);

    });

});
// =========================
// BOTÃO PUBLICAR
// =========================

const publishButton =
    document.getElementById("publishButton");


publishButton.addEventListener("click", function () {

    alert("🎮 Publicação preparada com sucesso!");

});


// =========================
// BOTÕES DE CURTIR
// =========================

const likeButtons =
    document.querySelectorAll(".like-button");


likeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const counter =
            button.querySelector("span");


        let likes =
            Number(counter.textContent);


        if (button.classList.contains("liked")) {

            likes--;

            button.classList.remove("liked");

            button.style.backgroundColor =
                "#292d39";

        } else {

            likes++;

            button.classList.add("liked");

            button.style.backgroundColor =
                "#8b5cf6";
        }


        counter.textContent = likes;

    });

});


// =========================
// BOTÕES DE COMENTÁRIO
// =========================

const commentButtons =
    document.querySelectorAll(".comment-button");


commentButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const post =
            button.closest(".post");


        const comments =
            post.querySelector(".comments");


        comments.classList.toggle("active");

    });

});


// =========================
// ENVIAR COMENTÁRIO
// =========================

const sendButtons =
    document.querySelectorAll(".send-comment");


sendButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const post =
            button.closest(".post");


        const input =
            post.querySelector(".comment-input");


        const comment =
            input.value.trim();


        if (comment === "") {

            alert(
                "Digite um comentário antes de enviar."
            );

            return;
        }


        alert(
            "💬 Comentário enviado: " + comment
        );


        input.value = "";

    });

});
// =========================
// BOTÃO PUBLICAR
// =========================

const publishButton =
    document.getElementById("publishButton");

publishButton.addEventListener("click", function () {

    alert(
        "Sua publicação sobre moda foi enviada com sucesso! 👗✨"
    );

});


// =========================
// CURTIR PUBLICAÇÃO
// =========================

const likeButtons =
    document.querySelectorAll(".like-button");

likeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const count =
            button.querySelector(".like-count");

        let likes =
            Number(count.textContent);


        if (button.classList.contains("liked")) {

            likes--;

            button.classList.remove("liked");

        } else {

            likes++;

            button.classList.add("liked");

        }


        count.textContent = likes;

    });

});


// =========================
// ABRIR COMENTÁRIOS
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

        const comments =
            button.closest(".comments");

        const input =
            comments.querySelector("input");

        const commentList =
            comments.querySelector(".comment-list");

        const text =
            input.value.trim();


        if (text === "") {

            alert(
                "Digite um comentário antes de enviar."
            );

            return;
        }


        const newComment =
            document.createElement("div");

        newComment.classList.add("comment");

        newComment.textContent =
            "💬 " + text;


        commentList.appendChild(newComment);


        input.value = "";

    });

});
// BOTÃO PUBLICAR

const publishButton = document.getElementById("publishButton");

publishButton.addEventListener("click", function () {

    alert(
        "🔮 Sua lenda foi enviada para o arquivo misterioso!"
    );

});


// SISTEMA DE CURTIDAS

const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const counter = button.querySelector("span");

        let likes = Number(counter.textContent);

        if (button.classList.contains("liked")) {

            likes--;

            button.classList.remove("liked");

        } else {

            likes++;

            button.classList.add("liked");

        }

        counter.textContent = likes;

    });

});


// BOTÕES DE COMENTÁRIO

const commentButtons = document.querySelectorAll(".comment-button");

commentButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const comment = prompt(
            "💬 Escreva seu comentário sobre esta lenda:"
        );

        if (comment && comment.trim() !== "") {

            alert(
                "👁️ Seu comentário foi registrado:\n\n" +
                comment
            );

        }

    });

});


// EFEITO AO CLICAR NOS LINKS DO MENU

const links = document.querySelectorAll("nav a");

links.forEach(function (link) {

    link.addEventListener("click", function () {

        console.log(
            "Você entrou em: " + link.textContent
        );

    });

});
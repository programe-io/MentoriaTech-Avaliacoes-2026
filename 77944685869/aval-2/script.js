// BOTÃO PUBLICAR

const publishButton = document.getElementById("publishButton");

publishButton.addEventListener("click", function () {

    alert("⚽ Sua publicação foi enviada!");

});


// BOTÕES DE CURTIR

const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const counter = button.querySelector("span");

        let likes = parseInt(counter.textContent);

        if (button.classList.contains("liked")) {

            likes--;

            button.classList.remove("liked");

            button.innerHTML = `❤️ <span>${likes}</span> Curtir`;

        } else {

            likes++;

            button.classList.add("liked");

            button.innerHTML = `❤️ <span>${likes}</span> Curtido`;

        }

    });

});


// BOTÕES DE COMENTAR

const commentButtons = document.querySelectorAll(".comment-button");

commentButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const comentario = prompt(
            "💬 Digite seu comentário sobre esta publicação:"
        );

        if (comentario !== null && comentario.trim() !== "") {

            alert("Comentário publicado: " + comentario);

        }

    });

});


// EFEITO NO MENU

const links = document.querySelectorAll("nav a");

links.forEach(function (link) {

    link.addEventListener("click", function () {

        console.log("Você acessou: " + link.textContent);

    });

});
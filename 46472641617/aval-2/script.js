/* =================================
   BOTÃO PUBLICAR
================================= */

const publishButton =
    document.getElementById("publishButton");


publishButton.addEventListener("click", function () {

    const texto = prompt(
        "🏁 O que você quer compartilhar sobre o Skyline GT-R R34?"
    );


    if (
        texto !== null &&
        texto.trim() !== ""
    ) {

        alert(
            "✅ Publicação criada!\n\n" +
            texto
        );

    }

});


/* =================================
   BOTÕES DE CURTIR
================================= */

const likeButtons =
    document.querySelectorAll(".like-button");


likeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const counter =
            button.querySelector("span");


        let likes =
            parseInt(counter.textContent);


        if (
            button.classList.contains("liked")
        ) {

            likes--;

            button.classList.remove("liked");

            button.innerHTML =
                `❤️ Curtir <span>${likes}</span>`;

        }

        else {

            likes++;

            button.classList.add("liked");

            button.innerHTML =
                `❤️ Curtido <span>${likes}</span>`;

        }

    });

});


/* =================================
   BOTÕES DE COMENTAR
================================= */

const commentButtons =
    document.querySelectorAll(".comment-button");


commentButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const comentario =
            prompt(
                "💬 Escreva seu comentário sobre o Skyline GT-R R34:"
            );


        if (
            comentario !== null &&
            comentario.trim() !== ""
        ) {

            alert(
                "🏁 Comentário publicado!\n\n" +
                comentario
            );

        }

    });

});


/* =================================
   MENU
================================= */

const links =
    document.querySelectorAll("nav a");


links.forEach(function (link) {

    link.addEventListener("click", function () {

        console.log(
            "Acessando: " +
            link.textContent
        );

    });

});
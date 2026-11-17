
document.addEventListener("DOMContentLoaded", () => {

    // SISTEMA DE CURTIDAS

    const botoesCurtir = document.querySelectorAll(".like-btn");

    botoesCurtir.forEach(botao => {

        botao.addEventListener("click", () => {

            botao.classList.toggle("liked");

            const post = botao.closest(".post");

            const textoCurtidas = post.querySelector(".likes");

            let quantidade = parseInt(
                textoCurtidas.textContent
            );

            if (botao.classList.contains("liked")) {

                quantidade++;

                botao.classList.remove("fa-regular");
                botao.classList.add("fa-solid");

            } else {

                quantidade--;

                botao.classList.remove("fa-solid");
                botao.classList.add("fa-regular");

            }

            textoCurtidas.textContent = quantidade + " curtidas";

        });

    });


    // SISTEMA DE COMENTÁRIOS

    const botoesPublicar = document.querySelectorAll(".publish");

    botoesPublicar.forEach(botao => {

        botao.addEventListener("click", () => {

            const post = botao.closest(".post");

            const input = post.querySelector("input");

            const texto = input.value.trim();

            if (texto === "") {
                alert("Digite um comentário!");
                return;
            }

            const novoComentario = document.createElement("p");

            novoComentario.textContent = "Você: " + texto;

            post.querySelector(".post-info").insertBefore(
                novoComentario,
                post.querySelector(".comment-box")
            );

            input.value = "";

        });

    });

});

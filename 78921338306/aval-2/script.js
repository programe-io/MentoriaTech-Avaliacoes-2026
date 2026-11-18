
// SISTEMA DE CURTIDAS

document.querySelectorAll(".curtir").forEach(botao => {

    botao.addEventListener("click", () => {

        const post = botao.closest(".post");
        const likes = post.querySelector(".likes");

        let quantidade = Number(
            likes.textContent.match(/\d+/)[0]
        );

        if (botao.classList.contains("liked")) {

            botao.classList.remove("liked");
            botao.textContent = "♡";
            quantidade--;

        } else {

            botao.classList.add("liked");
            botao.textContent = "♥";
            quantidade++;

        }

        likes.textContent = quantidade + " curtidas";

    });

});


// SISTEMA DE STORIES

document.querySelectorAll(".story").forEach(story => {

    story.addEventListener("click", () => {

        const nome = story.querySelector("p").textContent;

        alert("Você está vendo o story de " + nome + " ❤️");

    });

});


// SISTEMA DE COMENTÁRIOS

document.querySelectorAll(".comentar").forEach(botao => {

    botao.addEventListener("click", () => {

        const post = botao.closest(".post");

        const comentario = prompt("Escreva seu comentário:");

        if (comentario && comentario.trim() !== "") {

            const novoComentario = document.createElement("p");

            novoComentario.className = "comentario";

            const texto = document.createElement("span");

            texto.textContent = "Fernanda: " + comentario;

            novoComentario.appendChild(texto);

            post.insertBefore(
                novoComentario,
                post.querySelector(".data")
            );

        }

    });

});

console.log("Instagram da Fernanda carregado!");

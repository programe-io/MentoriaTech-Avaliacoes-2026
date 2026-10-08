// Curtir publicação
const botoesCurtir = document.querySelectorAll(".like");

botoesCurtir.forEach(botao => {

    botao.addEventListener("click", () => {

        const post = botao.closest(".post");
        const curtidas = post.querySelector(".curtidas");

        let numero = parseInt(
            curtidas.textContent.replace(/\D/g, "")
        );

        if (!botao.classList.contains("curtido")) {

            numero++;

            botao.textContent = "♥";
            botao.classList.add("curtido");

        } else {

            numero--;

            botao.textContent = "♡";
            botao.classList.remove("curtido");
        }

        curtidas.textContent = numero.toLocaleString("pt-BR") + " curtidas";
    });
});


// Publicar comentário
const botoesPublicar = document.querySelectorAll(".comentario button");

botoesPublicar.forEach(botao => {

    botao.addEventListener("click", () => {

        const comentario = botao.closest(".comentario");
        const input = comentario.querySelector("input");

        if (input.value.trim() === "") {
            alert("Digite um comentário.");
            return;
        }

        alert("Comentário publicado!");

        input.value = "";
    });
});


// Seguir usuários
const botoesSeguir = document.querySelectorAll(".sugestao button");

botoesSeguir.forEach(botao => {

    botao.addEventListener("click", () => {

        if (botao.textContent === "Seguir") {

            botao.textContent = "Seguindo";
            botao.style.color = "#737373";

        } else {

            botao.textContent = "Seguir";
            botao.style.color = "#0095f6";
        }
    });
});
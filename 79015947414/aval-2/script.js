// CURTIR PUBLICAÇÃO

const botoesCurtir = document.querySelectorAll(".btn-like");

botoesCurtir.forEach(botao => {

    botao.addEventListener("click", () => {

        const publicacao = botao.closest(".publicacao");
        const contador = publicacao.querySelector(".likes");

        let curtidas = Number(contador.textContent);

        if (botao.classList.contains("curtido")) {

            curtidas--;

            botao.textContent = "♡";
            botao.classList.remove("curtido");

        } else {

            curtidas++;

            botao.textContent = "♥";
            botao.classList.add("curtido");
        }

        contador.textContent = curtidas;
    });

});


// PUBLICAR COMENTÁRIO

const formularios = document.querySelectorAll(".comentario-form");

formularios.forEach(formulario => {

    formulario.addEventListener("submit", evento => {

        evento.preventDefault();

        const input = formulario.querySelector("input");

        const comentario = input.value.trim();

        if (comentario === "") {
            return;
        }

        const publicacao = formulario.closest(".publicacao");

        const novoComentario = document.createElement("p");

        novoComentario.innerHTML = `
            <strong>meu_perfil</strong> ${comentario}
        `;

        novoComentario.style.padding = "0 15px 10px";

        publicacao
            .querySelector(".informacoes")
            .appendChild(novoComentario);

        input.value = "";

    });

});


// BOTÕES SEGUIR

const botoesSeguir = document.querySelectorAll(".lista-sugestoes button");

botoesSeguir.forEach(botao => {

    botao.addEventListener("click", () => {

        if (botao.textContent === "Seguir") {

            botao.textContent = "Seguindo";
            botao.style.color = "#888";

        } else {

            botao.textContent = "Seguir";
            botao.style.color = "#0095f6";
        }

    });

});
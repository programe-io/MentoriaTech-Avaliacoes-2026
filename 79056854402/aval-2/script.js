// ===============================
// CURTIR PUBLICAÇÃO
// ===============================

const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(botao => {

    botao.addEventListener("click", () => {

        const post = botao.closest(".post");

        const contador = post.querySelector(".numeroCurtidas");

        let curtidas = Number(contador.textContent);


        if (botao.classList.contains("ativo")) {

            // DESCURTIR
            botao.classList.remove("ativo");

            botao.textContent = "♡";

            curtidas--;

        } else {

            // CURTIR
            botao.classList.add("ativo");

            botao.textContent = "♥";

            curtidas++;

        }


        contador.textContent = curtidas;

    });

});



// ===============================
// COMENTÁRIOS
// ===============================

const formularios =
    document.querySelectorAll(".form-comentario");


formularios.forEach(formulario => {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();


        const input =
            formulario.querySelector("input");


        const texto =
            input.value.trim();


        if (texto === "") {
            return;
        }


        const post =
            formulario.closest(".post");


        const comentarios =
            post.querySelector(".comentarios");


        const novoComentario =
            document.createElement("p");


        novoComentario.classList.add("comentario");


        novoComentario.innerHTML = `
            <strong>nayra_style</strong> ${texto}
        `;


        comentarios.appendChild(novoComentario);


        input.value = "";

    });

});



// ===============================
// PESQUISA
// ===============================

const campoPesquisa =
    document.querySelector("#campoPesquisa");


campoPesquisa.addEventListener("input", () => {

    const pesquisa =
        campoPesquisa.value.toLowerCase();


    const posts =
        document.querySelectorAll(".post");


    posts.forEach(post => {

        const texto =
            post.textContent.toLowerCase();


        if (texto.includes(pesquisa)) {

            post.style.display = "block";

        } else {

            post.style.display = "none";

        }

    });

});



// ===============================
// BOTÃO SEGUIR
// ===============================

const botoesSeguir =
    document.querySelectorAll(".sugestao button");


botoesSeguir.forEach(botao => {

    botao.addEventListener("click", () => {

        if (botao.textContent === "Seguir") {

            botao.textContent = "Seguindo";

        } else {

            botao.textContent = "Seguir";

        }

    });

});



// ===============================
// BOTÃO CRIAR PUBLICAÇÃO
// ===============================

const botaoCriar =
    document.querySelector("#botaoCriar");


botaoCriar.addEventListener("click", () => {

    const legenda =
        prompt(
            "Digite a legenda da sua nova publicação:"
        );


    if (
        legenda === null ||
        legenda.trim() === ""
    ) {

        return;

    }


    alert(
        "Publicação criada! 📸"
    );

});
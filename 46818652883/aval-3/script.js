
// CURTIR PUBLICAÇÕES

document.querySelectorAll(".curtir").forEach(botao => {

    botao.addEventListener("click", function() {

        let post = this.closest(".post");
        let contador = post.querySelector(".quantidade");

        let numero = Number(contador.textContent);

        if (this.classList.contains("ativo")) {

            this.classList.remove("ativo");
            this.querySelector("i").className = "bx bx-heart";

            contador.textContent = numero - 1;

        } else {

            this.classList.add("ativo");
            this.querySelector("i").className = "bx bxs-heart";

            contador.textContent = numero + 1;
        }

    });

});


// SALVAR PUBLICAÇÕES

document.querySelectorAll(".salvar").forEach(botao => {

    botao.addEventListener("click", function() {

        let icone = this.querySelector("i");

        if (icone.classList.contains("bxs-bookmark")) {

            icone.className = "bx bx-bookmark";

        } else {

            icone.className = "bx bxs-bookmark";

        }

    });

});


// SEGUIR AMIGOS

document.querySelectorAll(".amigo button").forEach(botao => {

    botao.addEventListener("click", function() {

        if (this.textContent === "Seguir") {

            this.textContent = "Seguindo";

        } else {

            this.textContent = "Seguir";

        }

    });

});


// COMENTÁRIOS

document.querySelectorAll(".form-comentario").forEach(form => {

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        let campo = this.querySelector("input");
        let texto = campo.value.trim();

        if (texto === "") {
            return;
        }

        let novoComentario = document.createElement("p");
        let usuario = document.createElement("strong");

        usuario.textContent = "gabriel.dev: ";

        novoComentario.append(
            usuario,
            document.createTextNode(texto)
        );

        this.parentElement.querySelector(
            ".lista-comentarios"
        ).appendChild(novoComentario);

        campo.value = "";

    });

});


// PESQUISAR PUBLICAÇÕES

document.getElementById("pesquisa").addEventListener("input", function() {

    let texto = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {

        let conteudo = post.textContent.toLowerCase();

        post.style.display = conteudo.includes(texto)
            ? "block"
            : "none";

    });

});


// ABRIR CAMPO DE COMENTÁRIO

document.querySelectorAll(".comentar").forEach(botao => {

    botao.addEventListener("click", function() {

        let post = this.closest(".post");

        post.querySelector(
            ".form-comentario input"
        ).focus();

    });

});


// MOSTRAR COMENTÁRIOS

document.querySelectorAll(".ver-comentarios").forEach(botao => {

    botao.addEventListener("click", function() {

        let lista = this.nextElementSibling;

        lista.hidden = !lista.hidden;

    });

});

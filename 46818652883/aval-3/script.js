// CURTIR PUBLICAÇÕES
document.querySelectorAll(".curtir").forEach(botao => {

    botao.addEventListener("click", function() {

        let post = this.closest(".post");
        let contador = post.querySelector(".contador");

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


// SEGUIR USUÁRIOS
document.querySelectorAll(".sugestao button").forEach(botao => {

    botao.addEventListener("click", function() {

        if (this.textContent === "Seguir") {

            this.textContent = "Seguindo";

        } else {

            this.textContent = "Seguir";
        }

    });

});


// ADICIONAR COMENTÁRIOS
document.querySelectorAll(".form-comentario").forEach(formulario => {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        let campo = this.querySelector("input");
        let comentario = campo.value.trim();

        if (comentario === "") {
            return;
        }

        let novoComentario = document.createElement("p");

        let usuario = document.createElement("strong");
        usuario.textContent = "frojo_dev ";

        novoComentario.append(usuario, document.createTextNode(comentario));

        this.before(novoComentario);

        campo.value = "";

    });

});


// PESQUISAR PUBLICAÇÕES
document.getElementById("pesquisa").addEventListener("input", function() {

    let pesquisa = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {

        let texto = post.textContent.toLowerCase();

        post.style.display = texto.includes(pesquisa) ? "block" : "none";

    });

});
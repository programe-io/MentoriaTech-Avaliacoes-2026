
// SISTEMA DE CURTIDAS

document.querySelectorAll(".like").forEach(button => {

    button.addEventListener("click", function() {

        const icon = this.querySelector("i");
        const post = this.closest(".post");
        const likes = post.querySelector(".likes");

        let total = parseInt(likes.textContent);

        if (icon.classList.contains("fa-regular")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            icon.style.color = "red";

            total++;

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            icon.style.color = "black";

            total--;
        }

        likes.textContent = total + " curtidas";

    });

});


// SISTEMA DE COMENTÁRIOS

document.querySelectorAll(".comment-btn").forEach(button => {

    button.addEventListener("click", function() {

        const post = this.closest(".post");
        const input = post.querySelector(".comment-box input");

        const comentario = input.value.trim();

        if (comentario === "") {
            alert("Digite um comentário!");
            return;
        }

        const novoComentario = document.createElement("p");

        novoComentario.innerHTML =
            "<strong>meu_perfil</strong> " +
            comentario.replace(/[&<>"']/g, char => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[char]);

        post.querySelector(".post-info").appendChild(novoComentario);

        input.value = "";

    });

});


// SALVAR PUBLICAÇÃO

document.querySelectorAll(".save").forEach(button => {

    button.addEventListener("click", function() {

        const icon = this.querySelector("i");

        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");

        alert("Publicação salva!");

    });

});


// CRIAR PUBLICAÇÃO

document.getElementById("createPost")
    .addEventListener("click", function(event) {

        event.preventDefault();

        const legenda = prompt("Digite a legenda da publicação:");

        if (legenda && legenda.trim() !== "") {

            const feed = document.getElementById("feed");

            const novoPost = document.createElement("article");

            novoPost.className = "post";

            const header = document.createElement("div");
            header.className = "post-header";

            const foto = document.createElement("img");
            foto.src = "https://i.pravatar.cc/100?img=12";

            const usuario = document.createElement("strong");
            usuario.textContent = "meu_perfil";

            header.append(foto, usuario);

            const info = document.createElement("div");
            info.className = "post-info";

            const texto = document.createElement("p");
            texto.innerHTML = "<strong>meu_perfil</strong> ";

            const legendaTexto = document.createElement("span");
            legendaTexto.textContent = legenda;

            texto.appendChild(legendaTexto);
            info.appendChild(texto);

            novoPost.append(header, info);

            feed.prepend(novoPost);

            alert("Publicação criada com sucesso!");

        }

    });

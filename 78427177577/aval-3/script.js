
// CURTIR PUBLICAÇÃO

document.querySelectorAll(".like").forEach(button => {
    button.addEventListener("click", () => {
        const post = button.closest(".post");
        const likes = post.querySelector(".likes");

        let quantidade = Number(
            likes.dataset.count || likes.textContent.replace(/\D/g, "")
        );

        const curtido = button.classList.toggle("liked");

        if (curtido) {
            quantidade++;
            button.innerHTML = '<i class="fa-solid fa-heart"></i>';
        } else {
            quantidade--;
            button.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }

        likes.dataset.count = quantidade;
        likes.textContent =
            quantidade.toLocaleString("pt-BR") + " curtidas";
    });
});

// SALVAR PUBLICAÇÃO

document.querySelectorAll(".save").forEach(button => {
    button.addEventListener("click", () => {
        const salvo = button.classList.toggle("saved");

        button.innerHTML = salvo
            ? '<i class="fa-solid fa-bookmark"></i>'
            : '<i class="fa-regular fa-bookmark"></i>';
    });
});

// ADICIONAR COMENTÁRIOS

document.querySelectorAll(".comment-form").forEach(form => {
    form.addEventListener("submit", event => {
        event.preventDefault();

        const input = form.querySelector("input");
        const texto = input.value.trim();

        if (texto === "") {
            return;
        }

        const comentarios =
            form.closest(".post").querySelector(".comments");

        const comentario = document.createElement("p");
        const usuario = document.createElement("strong");

        usuario.textContent = "seu_perfil ";
        comentario.append(usuario, document.createTextNode(texto));

        comentarios.appendChild(comentario);

        input.value = "";
    });
});

// SEGUIR USUÁRIOS

document.querySelectorAll(".follow").forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent === "Seguir") {
            button.textContent = "Seguindo";
            button.style.color = "#777";
        } else {
            button.textContent = "Seguir";
            button.style.color = "#0095f6";
        }
    });
});

// CRIAR PUBLICAÇÃO

document.getElementById("criar").addEventListener("click", event => {
    event.preventDefault();

    const legenda = prompt("Digite a legenda da publicação:");

    if (!legenda || legenda.trim() === "") {
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const imagemPerfil = document.createElement("img");
    imagemPerfil.src = "https://i.pravatar.cc/100?img=12";

    const nome = document.createElement("strong");
    nome.textContent = "seu_perfil";

    header.append(imagemPerfil, nome);

    const texto = document.createElement("p");
    texto.style.padding = "15px";
    
    const usuario = document.createElement("strong");
    usuario.textContent = "seu_perfil ";

    texto.append(usuario, document.createTextNode(legenda));

    post.append(header, texto);
    feed.prepend(post);
    
    alert("Publicação criada com sucesso!");
});

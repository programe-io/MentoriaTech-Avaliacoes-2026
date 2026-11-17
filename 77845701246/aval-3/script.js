
const feed = document.getElementById("feed");

// Sistema de curtidas
feed.addEventListener("click", function(event) {
    const likeButton = event.target.closest(".like");

    if (likeButton) {
        const post = likeButton.closest(".post");
        const likesText = post.querySelector(".likes");

        let likes = Number(
            likesText.textContent.replace(/\D/g, "")
        );

        if (likeButton.classList.contains("liked")) {
            likes--;
            likeButton.classList.remove("liked");
            likeButton.textContent = "♡";
        } else {
            likes++;
            likeButton.classList.add("liked");
            likeButton.textContent = "♥";
        }

        likesText.textContent = likes.toLocaleString("pt-BR") + " curtidas";
    }

    // Salvar publicação
    const saveButton = event.target.closest(".save");

    if (saveButton) {
        saveButton.classList.toggle("saved");
        saveButton.textContent =
            saveButton.classList.contains("saved") ? "♧" : "♧";

        alert("Publicação salva!");
    }
});

// Adicionar comentários
feed.addEventListener("submit", function(event) {
    if (event.target.classList.contains("comment-form")) {
        event.preventDefault();

        const input = event.target.querySelector("input");
        const texto = input.value.trim();

        if (!texto) return;

        const postInfo = event.target.closest(".post-info");

        const novoComentario = document.createElement("p");
        const usuario = document.createElement("strong");

        usuario.textContent = "Você ";
        novoComentario.append(usuario, document.createTextNode(texto));

        postInfo.insertBefore(novoComentario, event.target);

        input.value = "";
    }
});

// Criar publicação
document.getElementById("newPost").addEventListener("click", function(event) {
    event.preventDefault();

    const texto = prompt("O que você deseja publicar?");

    if (!texto || !texto.trim()) return;

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const profile = document.createElement("div");
    profile.className = "profile";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "V";

    const nome = document.createElement("strong");
    nome.textContent = "voce";

    profile.append(avatar, nome);
    header.append(profile);

    const legenda = document.createElement("div");
    legenda.className = "post-info";

    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto.trim();

    const curtidas = document.createElement("strong");
    curtidas.className = "likes";
    curtidas.textContent = "0 curtidas";

    const acoes = document.createElement("div");
    acoes.className = "actions";

    const curtir = document.createElement("button");
    curtir.className = "like";
    curtir.textContent = "♡";

    acoes.append(curtir);
    legenda.append(curtidas, paragrafo);
    post.append(header, legenda, acoes);

    feed.prepend(post);
});


// CURTIR PUBLICAÇÃO
function curtir(botao) {
    const icone = botao.querySelector("i");

    icone.classList.toggle("bxs-heart");
    icone.classList.toggle("bx-heart");

    if (icone.classList.contains("bxs-heart")) {
        icone.style.color = "red";
    } else {
        icone.style.color = "black";
    }
}

// SEGUIR USUÁRIO
function seguir(botao) {
    if (botao.innerText === "Seguir") {
        botao.innerText = "Seguindo";
        botao.style.color = "gray";
    } else {
        botao.innerText = "Seguir";
        botao.style.color = "#0095f6";
    }
}

// SALVAR PUBLICAÇÃO
function salvar(botao) {
    const icone = botao.querySelector("i");

    icone.classList.toggle("bxs-bookmark");
    icone.classList.toggle("bx-bookmark");
}

// COMENTAR
function comentar(botao) {
    const post = botao.closest(".post");
    const campo = post.querySelector(".comentario");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const comentarios = post.querySelector(".comentarios");

    const novoComentario = document.createElement("p");
    novoComentario.innerHTML = `<strong>Você:</strong> ${texto}`;

    comentarios.appendChild(novoComentario);

    campo.value = "";
}

// COMPARTILHAR
function compartilhar() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => alert("Link copiado!"))
        .catch(() => alert("Não foi possível copiar o link."));
}

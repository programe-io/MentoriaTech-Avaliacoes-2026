
function curtir(botao) {
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let numero = parseInt(likes.innerText.replace(/\D/g, ""));

    if (botao.innerText === "♡") {
        botao.innerText = "❤️";
        likes.innerText = (numero + 1) + " curtidas";
    } else {
        botao.innerText = "♡";
        likes.innerText = (numero - 1) + " curtidas";
    }
}

function comentar(botao) {
    const post = botao.closest(".post");
    const comentario = prompt("Escreva seu comentário:");

    if (comentario && comentario.trim()) {
        const novo = document.createElement("p");
        novo.innerHTML = "<b>Você:</b> " +
            comentario.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        post.appendChild(novo);
    }
}

function compartilhar() {
    alert("Publicação compartilhada! ✨");
}

function salvar(botao) {
    if (botao.innerText === "♧") {
        botao.innerText = "🔖";
        alert("Publicação salva!");
    } else {
        botao.innerText = "♧";
        alert("Publicação removida dos salvos!");
    }
}

function novoPost() {
    const texto = prompt("O que deseja publicar?");

    if (texto && texto.trim()) {
        const post = document.createElement("article");
        post.className = "post";

        const titulo = document.createElement("header");
        titulo.innerHTML = "<b>👸 bean_dreamland</b>";

        const legenda = document.createElement("p");
        legenda.textContent = texto;

        post.appendChild(titulo);
        post.appendChild(legenda);

        document.getElementById("feed").prepend(post);

        alert("Nova publicação criada!");
    }
}

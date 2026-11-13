
function curtir(botao) {
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = Number(likes.dataset.total || 0);

    if (botao.dataset.curtido === "true") {
        quantidade--;
        botao.dataset.curtido = "false";
        botao.innerHTML = "🤍 Curtir";
    } else {
        quantidade++;
        botao.dataset.curtido = "true";
        botao.innerHTML = "❤️ Curtido";
    }

    likes.dataset.total = quantidade;
    likes.innerText = quantidade + " curtidas";
}

function comentar(botao) {
    const post = botao.closest(".post");
    const comentarios = post.querySelector(".comentarios");

    const texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {
        const novoComentario = document.createElement("p");
        novoComentario.innerText = "💬 Você: " + texto;
        comentarios.appendChild(novoComentario);
    }
}

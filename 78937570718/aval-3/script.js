
function curtir(botao) {
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = Number(likes.dataset.total || 0);

    if (botao.classList.contains("curtido")) {
        quantidade--;
        botao.classList.remove("curtido");
        botao.innerHTML = "🤍 Curtir";
    } else {
        quantidade++;
        botao.classList.add("curtido");
        botao.innerHTML = "❤️ Curtido";
    }

    likes.dataset.total = quantidade;
    likes.innerHTML = quantidade + " curtidas";
}

function comentar() {
    let comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Comentário publicado: " + comentario);
    }
}

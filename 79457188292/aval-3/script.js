
function curtir(botao) {
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = Number(
        likes.dataset.quantidade || 0
    );

    if (botao.dataset.curtido === "true") {
        quantidade--;
        botao.dataset.curtido = "false";
        botao.innerHTML = "♡";
    } else {
        quantidade++;
        botao.dataset.curtido = "true";
        botao.innerHTML = "❤️";
    }

    likes.dataset.quantidade = quantidade;
    likes.innerText = quantidade + " curtidas";
}

function comentar() {
    const comentario = prompt("Digite seu comentário:");

    if (comentario) {
        alert("Comentário enviado: " + comentario);
    }
}

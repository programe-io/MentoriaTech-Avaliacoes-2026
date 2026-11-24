
function curtir(botao) {
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = Number(likes.dataset.count || 0);

    if (botao.dataset.liked === "true") {
        quantidade--;
        botao.dataset.liked = "false";
        botao.style.color = "black";
    } else {
        quantidade++;
        botao.dataset.liked = "true";
        botao.style.color = "red";
    }

    likes.dataset.count = quantidade;
    likes.innerText = quantidade + " curtidas";
}

function comentar() {
    const comentario = prompt("Digite seu comentário:");

    if (comentario) {
        alert("Comentário publicado: " + comentario);
    }
}


function curtir(botao) {
    let contador = botao.querySelector("span");

    contador.textContent = Number(contador.textContent) + 1;
}

function comentar(botao) {
    let post = botao.closest(".post");
    let comentarios = post.querySelector(".comentarios");

    let texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {
        let novoComentario = document.createElement("p");

        novoComentario.textContent = "💬 " + texto;

        comentarios.appendChild(novoComentario);
    }
}

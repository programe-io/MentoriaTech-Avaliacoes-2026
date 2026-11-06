
function curtir(botao) {
    if (botao.classList.contains("active")) {
        botao.classList.remove("active");
        botao.innerHTML = "♡";
    } else {
        botao.classList.add("active");
        botao.innerHTML = "♥";
    }
}

function comentar() {
    let comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Comentário enviado: " + comentario);
    }
}

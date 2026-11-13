
function curtir(botao) {
    if (botao.classList.contains("curtido")) {
        botao.classList.remove("curtido");
        botao.innerText = "❤️ Curtir";
    } else {
        botao.classList.add("curtido");
        botao.innerText = "💖 Curtido!";
    }
}

function comentar() {
    let comentario = prompt("Digite seu comentário:");

    if (comentario) {
        alert("Comentário enviado: " + comentario);
    }
}

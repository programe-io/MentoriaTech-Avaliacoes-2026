function curtir(botao) {
    if (botao.innerHTML === "♡") {
        botao.innerHTML = "♥";
        botao.style.color = "red";
    } else {
        botao.innerHTML = "♡";
        botao.style.color = "black";
    }
}

function comentar() {
    let comentario = prompt("Digite seu comentário:");

    if (comentario) {
        alert("Comentário publicado! 💬");
    }
}

function compartilhar() {
    alert("Publicação compartilhada! 📤");
}
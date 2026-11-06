function curtir(botao) {
    let post = botao.parentElement;
    let likes = post.querySelector(".likes");
    let numero = Number(likes.textContent.match(/\d+/)[0]);

    if (botao.classList.contains("curtido")) {
        numero--;
        botao.classList.remove("curtido");
        botao.textContent = "♡ Curtir";
    } else {
        numero++;
        botao.classList.add("curtido");
        botao.textContent = "♥ Curtido";
    }

    likes.textContent = "❤️ " + numero + " curtidas";
}

function comentar() {
    let mensagem = prompt("Escreva seu comentário:");

    if (mensagem && mensagem.trim() !== "") {
        alert("Comentário publicado: " + mensagem);
    }
}
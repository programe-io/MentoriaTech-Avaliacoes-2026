
// Função para curtir uma publicação
function curtir(botao) {
    if (botao.innerHTML === "❤️ Curtir") {
        botao.innerHTML = "💖 Curtido";
    } else {
        botao.innerHTML = "❤️ Curtir";
    }
}

// Função para comentar
function comentar() {
    let comentario = prompt("Digite seu comentário:");

    if (comentario !== null && comentario.trim() !== "") {
        alert("Comentário publicado: " + comentario);
    }
}

// Função para compartilhar
function compartilhar() {
    alert("Publicação compartilhada com sucesso!");
}

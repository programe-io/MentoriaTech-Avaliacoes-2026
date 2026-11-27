
// Função de curtir postagem
function curtir(botao) {
    const icone = botao.querySelector("i");

    if (icone.classList.contains("bx-heart")) {
        icone.classList.remove("bx-heart");
        icone.classList.add("bxs-heart");
        icone.style.color = "red";
    } else {
        icone.classList.remove("bxs-heart");
        icone.classList.add("bx-heart");
        icone.style.color = "black";
    }
}

// Função de comentar
function comentar() {
    let comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Comentário enviado: " + comentario);
    }
}

// Função de seguir usuário
function seguir(botao) {
    if (botao.textContent.trim() === "Seguir") {
        botao.textContent = "Seguindo";
        botao.style.color = "gray";
    } else {
        botao.textContent = "Seguir";
        botao.style.color = "#3b82f6";
    }
}

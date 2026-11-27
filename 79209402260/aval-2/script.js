
function curtir(botao) {
    if (botao.textContent === "Curtir") {
        botao.textContent = "Curtido!";
        botao.style.backgroundColor = "green";
    } else {
        botao.textContent = "Curtir";
        botao.style.backgroundColor = "#2874c6";
    }
}

function comentar() {
    let comentario = prompt("Digite seu comentário:");

    if (comentario !== null && comentario.trim() !== "") {
        alert("Comentário enviado: " + comentario);
    }
}

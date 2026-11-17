
function publicar() {
    alert("Área de publicação demonstrativa!");
}

function curtir(botao) {
    if (botao.innerText.includes("♡")) {
        botao.innerText = "♥ Curtido";
    } else {
        botao.innerText = "♡ Curtir";
    }
}

function comentar() {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Comentário enviado: " + comentario);
    }
}


function curtir(botao) {
    const contador = botao.querySelector("span");

    let curtidas = Number(contador.textContent);

    curtidas++;

    contador.textContent = curtidas;
}

function comentar() {
    const comentario = prompt("💬 Escreva seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Comentário publicado: " + comentario);
    }
}

function compartilhar() {
    if (navigator.share) {
        navigator.share({
            title: "Central das Novelas",
            text: "Confira essa fofoca da Central das Novelas!"
        });
    } else {
        alert("Compartilhe a Central das Novelas com seus amigos! 💖");
    }
}

// SISTEMA DE CURTIDAS
function curtir(botao) {
    let numero = botao.querySelector("span");

    numero.textContent = Number(numero.textContent) + 1;
}

// SISTEMA DE COMENTÁRIOS
function comentar() {
    let comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Comentário enviado: " + comentario);
    }
}
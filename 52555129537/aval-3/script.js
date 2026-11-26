
// FUNÇÃO PARA CURTIR PUBLICAÇÃO
function curtir(botao) {

    if (botao.textContent === "Curtir") {

        botao.textContent = "Curtido!";
        botao.style.backgroundColor = "#198754";

    } else {

        botao.textContent = "Curtir";
        botao.style.backgroundColor = "#2563eb";

    }

}

// FUNÇÃO PARA COMENTAR
function comentar() {

    let comentario = prompt("Digite seu comentário:");

    if (comentario !== null && comentario.trim() !== "") {

        alert("Comentário enviado: " + comentario);

    } else {

        alert("Você não digitou nenhum comentário.");

    }

}

// FUNÇÃO PARA PUBLICAR
function publicar() {

    let texto = prompt("O que você está pensando?");

    if (texto !== null && texto.trim() !== "") {

        alert("Sua publicação foi criada: " + texto);

    } else {

        alert("Digite alguma coisa antes de publicar!");

    }

}

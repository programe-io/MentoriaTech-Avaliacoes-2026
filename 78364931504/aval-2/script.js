// SISTEMA DE CURTIDAS

function curtir(botao) {

    let contador = botao.querySelector("span");
    let numero = Number(contador.textContent);

    if (botao.classList.contains("ativo")) {

        contador.textContent = numero - 1;
        botao.classList.remove("ativo");
        botao.innerHTML = "♡ Curtir <span>" + (numero - 1) + "</span>";

    } else {

        contador.textContent = numero + 1;
        botao.classList.add("ativo");
        botao.innerHTML = "❤️ Curtido <span>" + (numero + 1) + "</span>";

    }
}

// SISTEMA DE COMENTÁRIOS

function comentar(botao) {

    let texto = prompt("Escreva seu comentário:");

    if (texto && texto.trim() !== "") {

        let area = botao.parentElement.querySelector(".comentarios");

        let comentario = document.createElement("p");

        comentario.textContent = "💬 " + texto;

        area.appendChild(comentario);

    }
}
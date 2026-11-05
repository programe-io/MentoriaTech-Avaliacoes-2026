// CURTIR PUBLICAÇÃO
function curtir(botao) {
    let contador = botao.querySelector("span");
    let numero = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {
        contador.textContent = numero - 1;
        botao.classList.remove("curtido");
        botao.innerHTML = "❤️ Curtir <span>" + (numero - 1) + "</span>";
    } else {
        contador.textContent = numero + 1;
        botao.classList.add("curtido");
        botao.innerHTML = "❤️ Curtido <span>" + (numero + 1) + "</span>";
    }
}

// COMENTAR PUBLICAÇÃO
function comentar(botao) {
    let comentario = prompt("Escreva seu comentário:");

    if (comentario && comentario.trim() !== "") {
        let area = botao.parentElement.querySelector(".comentarios");

        let novo = document.createElement("p");
        novo.textContent = "💬 " + comentario;

        area.appendChild(novo);
    }
}

function curtir(botao) {
    const contador = botao.querySelector("span");
    let total = Number(contador.textContent);

    if (botao.dataset.curtido === "sim") {
        total--;
        botao.dataset.curtido = "nao";

        botao.firstChild.textContent = "♡ Curtir ";
    } else {
        total++;
        botao.dataset.curtido = "sim";

        botao.firstChild.textContent = "♥ Curtido ";
    }

    contador.textContent = total;
}

function mostrarComentario(botao) {
    const post = botao.closest(".post");
    const area = post.querySelector(".comentarios");

    area.hidden = !area.hidden;

    if (!area.hidden) {
        area.querySelector("input").focus();
    }
}

function comentar(botao) {
    const area = botao.closest(".comentarios");
    const input = area.querySelector("input");
    const lista = area.querySelector(".lista-comentarios");

    const texto = input.value.trim();

    if (texto === "") {
        input.focus();
        return;
    }

    const comentario = document.createElement("p");
    comentario.textContent = "💜 " + texto;

    lista.appendChild(comentario);

    input.value = "";
    input.focus();
}

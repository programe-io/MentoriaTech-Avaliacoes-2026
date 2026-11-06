
function curtir(botao) {
    let numero = botao.querySelector("span");
    let quantidade = Number(numero.textContent);

    if (botao.classList.contains("ativo")) {
        quantidade--;
        botao.classList.remove("ativo");
    } else {
        quantidade++;
        botao.classList.add("ativo");
    }

    numero.textContent = quantidade;
}

function comentar(botao) {
    let post = botao.closest(".post");
    let input = post.querySelector("input");
    let lista = post.querySelector(".lista-comentarios");
    let total = post.querySelector(".total-comentarios");

    let mensagem = input.value.trim();

    if (mensagem === "") {
        alert("Digite um comentário!");
        return;
    }

    let comentario = document.createElement("div");
    comentario.classList.add("comentario");
    comentario.textContent = mensagem;

    lista.appendChild(comentario);

    total.textContent = Number(total.textContent) + 1;

    input.value = "";
}

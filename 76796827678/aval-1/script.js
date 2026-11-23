function curtir(botao) {
    const post = botao.closest(".post");
    const contador = post.querySelector(".acoes span");

    let curtidas = Number(
        contador.textContent.split(" ")[0]
    );

    if (botao.textContent === "🤍") {
        curtidas++;
        botao.textContent = "❤️";
    } else {
        curtidas--;
        botao.textContent = "🤍";
    }

    contador.textContent = curtidas + " curtidas";
}

function comentar(botao) {
    const post = botao.closest(".post");
    const input = post.querySelector("input");
    const comentarios = post.querySelector(".comentarios");

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const novoComentario = document.createElement("p");

    novoComentario.textContent = "Você: " + texto;

    comentarios.appendChild(novoComentario);

    input.value = "";
}
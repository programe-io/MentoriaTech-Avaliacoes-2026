
function curtir(botao) {
    const post = botao.closest(".post");
    const curtidas = post.querySelector(".curtidas");

    let numero = parseInt(curtidas.textContent);

    if (botao.textContent === "🤍") {
        botao.textContent = "❤️";
        numero++;
    } else {
        botao.textContent = "🤍";
        numero--;
    }

    curtidas.textContent = numero + " curtidas";
}

function comentar(botao) {
    const post = botao.closest(".post");
    const comentarios = post.querySelector(".comentarios");

    const texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {
        const novoComentario = document.createElement("p");
        const usuario = document.createElement("strong");

        usuario.textContent = "Você: ";
        novoComentario.appendChild(usuario);
        novoComentario.appendChild(
            document.createTextNode(texto)
        );

        comentarios.appendChild(novoComentario);
    }
}

// Pesquisa de publicações
const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", function() {
    const texto = pesquisa.value.toLowerCase();

    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        const conteudo = post.textContent.toLowerCase();

        post.style.display = conteudo.includes(texto)
            ? "block"
            : "none";
    });
});

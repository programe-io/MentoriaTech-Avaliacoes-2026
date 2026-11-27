
const texto = document.getElementById("texto");
const feed = document.getElementById("feed");

function publicar() {
    const mensagem = texto.value.trim();

    if (!mensagem) {
        alert("Escreva alguma coisa! 💗");
        return;
    }

    const post = document.createElement("div");
    post.className = "post";

    const usuario = document.createElement("p");
    usuario.className = "user";
    usuario.textContent = "🌸 Você";

    const conteudo = document.createElement("p");
    conteudo.className = "post-content";
    conteudo.textContent = mensagem;

    const acoes = document.createElement("div");
    acoes.className = "actions";

    const like = document.createElement("button");
    like.textContent = "♡ Curtir";

    like.addEventListener("click", () => {
        const curtido = like.dataset.liked === "true";

        like.dataset.liked = String(!curtido);
        like.textContent = curtido
            ? "♡ Curtir"
            : "❤️ Curtido";
    });

    const comment = document.createElement("button");
    comment.textContent = "💬 Comentar";

    comment.addEventListener("click", () => {
        const resposta = prompt("Escreva seu comentário 💬");

        if (resposta && resposta.trim()) {
            const comentario = document.createElement("p");
            comentario.className = "comment";
            comentario.textContent = "💗 " + resposta.trim();

            post.appendChild(comentario);
        }
    });

    acoes.append(like, comment);

    post.append(usuario, conteudo, acoes);

    feed.prepend(post);

    texto.value = "";
}

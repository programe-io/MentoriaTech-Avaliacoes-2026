
function publicarPost() {
    const texto = document.getElementById("textoPost");
    const feed = document.getElementById("feed");

    if (texto.value.trim() === "") {
        alert("Digite uma publicação!");
        return;
    }

    // Criar publicação
    const post = document.createElement("div");
    post.className = "post";

    // Nome do usuário
    const usuario = document.createElement("h3");
    usuario.textContent = "👤 João Silva";

    // Texto da publicação
    const mensagem = document.createElement("p");
    mensagem.textContent = texto.value;

    // Botão curtir
    const curtir = document.createElement("button");
    let curtidas = 0;

    curtir.textContent = "❤️ Curtir (0)";

    curtir.onclick = function() {
        curtidas++;
        curtir.textContent = "❤️ Curtir (" + curtidas + ")";
    };

    // Campo de comentário
    const comentario = document.createElement("input");
    comentario.placeholder = "Escreva um comentário...";

    // Botão comentar
    const comentar = document.createElement("button");
    comentar.textContent = "Comentar";

    const listaComentarios = document.createElement("div");

    comentar.onclick = function() {
        if (comentario.value.trim() === "") {
            alert("Digite um comentário!");
            return;
        }

        const novoComentario = document.createElement("p");
        novoComentario.textContent = "💬 " + comentario.value;

        listaComentarios.appendChild(novoComentario);
        comentario.value = "";
    };

    // Adicionar elementos ao post
    post.appendChild(usuario);
    post.appendChild(mensagem);
    post.appendChild(curtir);
    post.appendChild(comentario);
    post.appendChild(comentar);
    post.appendChild(listaComentarios);

    // Adicionar publicação ao início do feed
    feed.prepend(post);

    // Limpar campo
    texto.value = "";
}

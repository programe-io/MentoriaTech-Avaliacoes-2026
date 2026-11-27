function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const legenda = document.getElementById("legenda").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (nome === "" || legenda === "") {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = nome + " ❤️";

    const texto = document.createElement("p");
    texto.textContent = legenda;

    post.appendChild(titulo);

    if (imagem !== "") {
        const foto = document.createElement("img");
        foto.src = imagem;
        foto.alt = "Imagem do dorama publicado";

        post.appendChild(foto);
    }

    post.appendChild(texto);

    const curtir = document.createElement("button");
    curtir.textContent = "❤️ Curtir 0";

    let quantidade = 0;

    curtir.onclick = function() {
        quantidade++;
        curtir.textContent = "❤️ Curtir " + quantidade;
    };

    post.appendChild(curtir);

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    const campo = document.createElement("input");
    campo.placeholder = "Escreva um comentário...";

    const botao = document.createElement("button");
    botao.textContent = "Comentar";

    const lista = document.createElement("div");
    lista.className = "lista-comentarios";

    botao.onclick = function() {
        const comentario = campo.value.trim();

        if (comentario === "") {
            alert("Digite um comentário!");
            return;
        }

        const novoComentario = document.createElement("p");
        novoComentario.textContent = "💬 " + comentario;

        lista.appendChild(novoComentario);
        campo.value = "";
    };

    comentarios.appendChild(campo);
    comentarios.appendChild(botao);
    comentarios.appendChild(lista);

    post.appendChild(comentarios);

    feed.prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("legenda").value = "";
    document.getElementById("imagem").value = "";
}
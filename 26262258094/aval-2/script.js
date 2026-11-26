function publicar() {
    const mensagem = document.getElementById("mensagem");
    const feed = document.getElementById("feed");

    if (mensagem.value.trim() === "") {
        alert("Digite alguma coisa!");
        return;
    }

    const postagem = document.createElement("p");

    postagem.textContent = mensagem.value;

    feed.prepend(postagem);

    mensagem.value = "";
}
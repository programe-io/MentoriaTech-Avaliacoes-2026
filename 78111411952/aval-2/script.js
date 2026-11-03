function publicar() {
    let nome = document.getElementById("nome").value;
    let mensagem = document.getElementById("mensagem").value;

    if (nome.trim() === "" || mensagem.trim() === "") {
        alert("Preencha os campos!");
        return;
    }

    let post = document.createElement("article");
    let autor = document.createElement("b");
    let opiniao = document.createElement("p");

    autor.textContent = nome;
    opiniao.textContent = mensagem;

    post.appendChild(autor);
    post.appendChild(opiniao);

    document.getElementById("feed").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";
}
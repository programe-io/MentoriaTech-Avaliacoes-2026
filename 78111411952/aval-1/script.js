function publicar() {
    let nome = document.getElementById("nome").value.trim();
    let opiniao = document.getElementById("opiniao").value.trim();

    if (nome === "" || opiniao === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let comentario = document.createElement("article");

    let titulo = document.createElement("h3");
    titulo.textContent = "♡ " + nome;

    let texto = document.createElement("p");
    texto.textContent = opiniao;

    comentario.append(titulo, texto);

    document.getElementById("comentarios").prepend(comentario);

    document.getElementById("nome").value = "";
    document.getElementById("opiniao").value = "";
}
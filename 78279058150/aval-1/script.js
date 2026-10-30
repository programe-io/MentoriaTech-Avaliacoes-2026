const formulario = document.getElementById("formComentario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (nome === "" || mensagem === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const comentario = document.createElement("div");
    comentario.classList.add("comentario");

    const autor = document.createElement("strong");
    autor.textContent = nome;

    const texto = document.createElement("p");
    texto.textContent = mensagem;

    comentario.appendChild(autor);
    comentario.appendChild(texto);

    document.getElementById("comentarios").appendChild(comentario);

    formulario.reset();

    alert("Comentário publicado!");
});
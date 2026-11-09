
function lerNoticia(texto) {
    alert(texto);
}

function enviarComentario() {
    let nome = document.getElementById("nome").value.trim();
    let comentario = document.getElementById("comentario").value.trim();

    if (nome === "" || comentario === "") {
        alert("Preencha seu nome e comentário!");
        return;
    }

    let lista = document.getElementById("listaComentarios");

    let novoComentario = document.createElement("div");
    novoComentario.className = "comentario-item";

    let titulo = document.createElement("h3");
    titulo.textContent = nome;

    let texto = document.createElement("p");
    texto.textContent = comentario;

    novoComentario.appendChild(titulo);
    novoComentario.appendChild(texto);

    lista.prepend(novoComentario);

    document.getElementById("nome").value = "";
    document.getElementById("comentario").value = "";

    alert("Comentário publicado com sucesso!");
}

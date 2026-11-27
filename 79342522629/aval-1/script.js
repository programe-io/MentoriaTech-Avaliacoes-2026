
// MODO ESCURO
const darkMode = document.getElementById("darkMode");

darkMode.addEventListener("click", function() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        darkMode.textContent = "☀️";
    } else {
        darkMode.textContent = "🌙";
    }
});

// LER NOTÍCIA
function lerNoticia(titulo) {
    alert("Você selecionou a notícia:\n\n" + titulo);
}

// COMENTÁRIOS
function adicionarComentario() {
    const nome = document.getElementById("nome").value.trim();
    const comentario = document.getElementById("comentario").value.trim();
    const lista = document.getElementById("listaComentarios");

    if (nome === "" || comentario === "") {
        alert("Preencha seu nome e comentário!");
        return;
    }

    const item = document.createElement("div");
    item.className = "comment-item";

    const autor = document.createElement("strong");
    autor.textContent = nome;

    const texto = document.createElement("p");
    texto.textContent = comentario;

    item.appendChild(autor);
    item.appendChild(texto);

    lista.prepend(item);

    document.getElementById("nome").value = "";
    document.getElementById("comentario").value = "";

    alert("Comentário publicado com sucesso!");
}

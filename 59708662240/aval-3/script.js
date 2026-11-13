
const form = document.getElementById("formLivro");
const lista = document.getElementById("listaLivros");

let livros = JSON.parse(localStorage.getItem("livrosBiblioteca")) || [];

function mostrarLivros() {
    lista.innerHTML = "";

    livros.forEach((livro, indice) => {
        const div = document.createElement("div");
        div.className = "item";

        const titulo = document.createElement("h4");
        titulo.textContent = livro.titulo;

        const autor = document.createElement("p");
        autor.textContent = "Autor: " + livro.autor;

        const categoria = document.createElement("p");
        categoria.textContent = "Categoria: " + livro.categoria;

        const quantidade = document.createElement("p");
        quantidade.textContent = "Quantidade: " + livro.quantidade;

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.type = "button";

        excluir.addEventListener("click", () => {
            livros.splice(indice, 1);
            salvar();
            mostrarLivros();
        });

        div.append(titulo, autor, categoria, quantidade, excluir);
        lista.appendChild(div);
    });

    if (livros.length === 0) {
        lista.textContent = "Nenhum livro cadastrado.";
    }
}

function salvar() {
    localStorage.setItem("livrosBiblioteca", JSON.stringify(livros));
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("tituloLivro").value.trim();
    const autor = document.getElementById("autorLivro").value.trim();
    const categoria = document.getElementById("categoriaLivro").value;
    const isbn = document.getElementById("isbnLivro").value.trim();
    const quantidade = Number(document.getElementById("quantidadeLivro").value);

    if (!titulo || !autor || !categoria || !Number.isInteger(quantidade) || quantidade < 1) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    livros.push({
        titulo,
        autor,
        categoria,
        isbn,
        quantidade
    });

    salvar();
    mostrarLivros();
    form.reset();

    document.getElementById("quantidadeLivro").value = 1;

    alert("Livro cadastrado com sucesso!");
});

mostrarLivros();


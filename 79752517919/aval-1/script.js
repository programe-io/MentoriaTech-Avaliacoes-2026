
let livros = [
    {
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        categoria: "Drama",
        imagem: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
        resenha: "Uma história emocionante sobre amizade, amor e a importância de enxergar o mundo com o coração."
    },
    {
        titulo: "Orgulho e Preconceito",
        autor: "Jane Austen",
        categoria: "Romance",
        imagem: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
        resenha: "Um clássico da literatura que apresenta uma história de amor, personalidade e superação de preconceitos."
    },
    {
        titulo: "Alice no País das Maravilhas",
        autor: "Lewis Carroll",
        categoria: "Fantasia",
        imagem: "https://covers.openlibrary.org/b/id/10523343-L.jpg",
        resenha: "Uma aventura fantástica em um mundo cheio de personagens curiosos e acontecimentos inesperados."
    },
    {
        titulo: "Sherlock Holmes",
        autor: "Arthur Conan Doyle",
        categoria: "Suspense",
        imagem: "https://covers.openlibrary.org/b/id/8231996-L.jpg",
        resenha: "Uma narrativa de mistério que acompanha investigações e descobertas surpreendentes."
    }
];

let categoriaAtual = "Todos";

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

function mostrarLivros() {
    const lista = document.getElementById("listaLivros");
    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    lista.innerHTML = "";

    const filtrados = livros.filter(livro => {
        const correspondeCategoria =
            categoriaAtual === "Todos" ||
            livro.categoria === categoriaAtual;

        const correspondePesquisa =
            livro.titulo.toLowerCase().includes(pesquisa) ||
            livro.autor.toLowerCase().includes(pesquisa);

        return correspondeCategoria && correspondePesquisa;
    });

    if (filtrados.length === 0) {
        lista.innerHTML = "<p>Nenhum livro encontrado.</p>";
        return;
    }

    filtrados.forEach((livro) => {
        const card = document.createElement("article");
        card.className = "card";

        card.innerHTML = `
            <img src="${escapar(livro.imagem)}"
                 alt="Capa de ${escapar(livro.titulo)}"
                 onerror="this.src='https://placehold.co/400x500?text=Livro'">

            <div class="card-info">
                <h3>${escapar(livro.titulo)}</h3>
                <p>Autor: ${escapar(livro.autor)}</p>
                <p>Categoria: ${escapar(livro.categoria)}</p>
                <button>Ver resenha</button>
            </div>
        `;

        card.querySelector("button").addEventListener("click", () => {
            abrirModal(livro);
        });

        lista.appendChild(card);
    });
}

function filtrar(categoria) {
    categoriaAtual = categoria;
    mostrarLivros();
}

function abrirModal(livro) {
    document.getElementById("conteudoModal").innerHTML = `
        <h2>${escapar(livro.titulo)}</h2>
        <p><strong>Autor:</strong> ${escapar(livro.autor)}</p>
        <p><strong>Categoria:</strong> ${escapar(livro.categoria)}</p>
        <hr>
        <h3>Resenha</h3>
        <p>${escapar(livro.resenha)}</p>
    `;

    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

document.getElementById("pesquisa")
    .addEventListener("input", mostrarLivros);

document.getElementById("formLivro")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const novoLivro = {
            titulo: document.getElementById("titulo").value.trim(),
            autor: document.getElementById("autor").value.trim(),
            categoria: document.getElementById("categoria").value,
            imagem: document.getElementById("imagem").value.trim() ||
                "https://placehold.co/400x500?text=Livro",
            resenha: document.getElementById("resenha").value.trim()
        };

        livros.unshift(novoLivro);

        categoriaAtual = "Todos";
        this.reset();
        mostrarLivros();

        alert("Resenha publicada com sucesso!");

        document.getElementById("livros")
            .scrollIntoView({ behavior: "smooth" });
    });

document.getElementById("modal").addEventListener("click", function(event) {
    if (event.target === this) {
        fecharModal();
    }
});

mostrarLivros();

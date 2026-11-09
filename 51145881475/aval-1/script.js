
let livros = JSON.parse(localStorage.getItem("livros")) || [];

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function salvarDados() {
    localStorage.setItem("livros", JSON.stringify(livros));
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function mostrarSecao(id) {
    document.querySelectorAll("main section").forEach(secao => {
        secao.classList.add("escondido");
    });

    document.getElementById(id).classList.remove("escondido");
}

function mostrarInicio() {
    mostrarSecao("inicio");
    exibirLivros();
}

function mostrarPublicacao() {
    mostrarSecao("publicar");
}

function publicarLivro() {
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const conteudo = document.getElementById("conteudo").value.trim();

    if (!titulo || !autor || !descricao || !conteudo) {
        alert("Preencha todos os campos!");
        return;
    }

    const livro = {
        id: Date.now(),
        titulo,
        autor,
        descricao,
        conteudo
    };

    livros.push(livro);
    salvarDados();

    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("conteudo").value = "";

    alert("Livro publicado com sucesso!");

    mostrarInicio();
}

function exibirLivros(lista = livros, elemento = "listaLivros") {
    const container = document.getElementById(elemento);
    container.innerHTML = "";

    if (lista.length === 0) {
        container.textContent = "Nenhum livro encontrado.";
        return;
    }

    lista.forEach(livro => {
        const card = document.createElement("div");
        card.className = "livro";

        const titulo = document.createElement("h3");
        titulo.textContent = "📖 " + livro.titulo;

        const autor = document.createElement("p");
        autor.textContent = "Autor: " + livro.autor;

        const descricao = document.createElement("p");
        descricao.textContent = livro.descricao;

        const ler = document.createElement("button");
        ler.textContent = "Ler livro";
        ler.onclick = () => abrirLivro(livro.id);

        const favorito = document.createElement("button");
        favorito.textContent = favoritos.includes(livro.id)
            ? "❤️ Favoritado"
            : "🤍 Favoritar";

        favorito.onclick = () => alternarFavorito(livro.id);

        card.append(titulo, autor, descricao, ler, favorito);
        container.appendChild(card);
    });
}

function abrirLivro(id) {
    const livro = livros.find(l => l.id === id);

    if (!livro) return;

    document.getElementById("tituloLeitura").textContent = livro.titulo;
    document.getElementById("autorLeitura").textContent =
        "Escrito por: " + livro.autor;

    document.getElementById("descricaoLeitura").textContent =
        livro.descricao;

    document.getElementById("conteudoLeitura").textContent =
        livro.conteudo;

    mostrarSecao("leitura");
}

function pesquisarLivros() {
    const termo = document.getElementById("pesquisa")
        .value.toLowerCase();

    const encontrados = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo)
    );

    exibirLivros(encontrados);
}

function alternarFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(f => f !== id);
    } else {
        favoritos.push(id);
    }

    salvarDados();
    exibirLivros();
}

function mostrarFavoritos() {
    mostrarSecao("favoritos");

    const lista = livros.filter(livro =>
        favoritos.includes(livro.id)
    );

    exibirLivros(lista, "listaFavoritos");
}

exibirLivros();

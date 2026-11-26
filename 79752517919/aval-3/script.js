
let artigos = [
    {
        titulo: "Como criar seu primeiro personagem de RPG",
        autor: "Mestre das Crônicas",
        categoria: "Personagens",
        imagem: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
        conteudo: "Criar um personagem é uma das partes mais divertidas do RPG. Comece definindo sua personalidade, história, objetivos e habilidades. Pense no passado do personagem e em como ele chegou ao mundo da aventura. Um bom personagem não precisa ser poderoso, mas precisa ter uma história interessante."
    },
    {
        titulo: "O universo da fantasia medieval",
        autor: "Lorde dos Dados",
        categoria: "Fantasia",
        imagem: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500",
        conteudo: "Mundos medievais são cenários incríveis para aventuras. Castelos, florestas misteriosas, criaturas mágicas e reinos em conflito podem transformar uma campanha em uma experiência inesquecível."
    },
    {
        titulo: "Conhecendo os sistemas de RPG",
        autor: "Guardião do Reino",
        categoria: "Sistemas",
        imagem: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
        conteudo: "Existem diversos sistemas de RPG, cada um com suas próprias regras. Dungeons & Dragons, Tormenta20 e Pathfinder são exemplos de sistemas que oferecem diferentes experiências de jogo."
    },
    {
        titulo: "Como criar uma aventura inesquecível",
        autor: "Mestre dos Mundos",
        categoria: "Aventuras",
        imagem: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500",
        conteudo: "Uma boa aventura precisa de objetivos, desafios e personagens interessantes. Crie mistérios, apresente escolhas importantes e permita que os jogadores influenciem o desenvolvimento da história."
    },
    {
        titulo: "Dicas para ser um bom mestre",
        autor: "Dado de Ouro",
        categoria: "Dicas",
        imagem: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
        conteudo: "Um bom mestre escuta seus jogadores, prepara situações interessantes e mantém a diversão como prioridade. Não tenha medo de improvisar e adaptar a história às escolhas da mesa."
    }
];

let categoriaAtual = "Todos";

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);
}

function mostrarArtigos() {
    const lista = document.getElementById("listaArtigos");

    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase();

    lista.innerHTML = "";

    const filtrados = artigos.filter(artigo => {
        const categoriaCorreta =
            categoriaAtual === "Todos" ||
            artigo.categoria === categoriaAtual;

        const pesquisaCorreta =
            artigo.titulo.toLowerCase().includes(pesquisa) ||
            artigo.autor.toLowerCase().includes(pesquisa) ||
            artigo.conteudo.toLowerCase().includes(pesquisa);

        return categoriaCorreta && pesquisaCorreta;
    });

    if (filtrados.length === 0) {
        lista.innerHTML = "<p>Nenhuma publicação encontrada.</p>";
        return;
    }

    filtrados.forEach((artigo, indice) => {
        const card = document.createElement("article");

        card.className = "card";

        card.innerHTML = `
            <img
                src="${escapar(artigo.imagem)}"
                alt="${escapar(artigo.titulo)}"
                onerror="this.src='https://placehold.co/500x300?text=RPG'"
            >

            <div class="card-info">

                <h3>${escapar(artigo.titulo)}</h3>

                <p>Autor: ${escapar(artigo.autor)}</p>

                <p>Categoria: ${escapar(artigo.categoria)}</p>

                <button class="ler">Ler artigo</button>

            </div>
        `;

        card.querySelector(".ler").addEventListener("click", () => {
            abrirModal(artigo);
        });

        lista.appendChild(card);
    });
}

function filtrar(categoria) {
    categoriaAtual = categoria;
    mostrarArtigos();
}

function abrirModal(artigo) {
    document.getElementById("detalhesArtigo").innerHTML = `
        <h2>${escapar(artigo.titulo)}</h2>

        <p><strong>Autor:</strong> ${escapar(artigo.autor)}</p>

        <p><strong>Categoria:</strong> ${escapar(artigo.categoria)}</p>

        <hr>

        <p>${escapar(artigo.conteudo)}</p>
    `;

    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

document.getElementById("pesquisa")
    .addEventListener("input", mostrarArtigos);

document.getElementById("formArtigo")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const novoArtigo = {
            titulo: document.getElementById("titulo").value.trim(),

            autor: document.getElementById("autor").value.trim(),

            categoria: document.getElementById("categoria").value,

            imagem: document.getElementById("imagem").value.trim() ||
                "https://placehold.co/500x300?text=RPG",

            conteudo: document.getElementById("conteudo").value.trim()
        };

        artigos.unshift(novoArtigo);

        categoriaAtual = "Todos";

        this.reset();

        mostrarArtigos();

        alert("Sua publicação foi adicionada com sucesso!");

        document.getElementById("artigos")
            .scrollIntoView({ behavior: "smooth" });
    });

document.getElementById("modal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            fecharModal();
        }
    });

mostrarArtigos();

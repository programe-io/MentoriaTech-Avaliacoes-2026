
const artigos = [
    {
        titulo: "O mundo da tecnologia",
        categoria: "Tecnologia",
        conteudo: "Descubra como a tecnologia transforma nosso cotidiano.",
        curtidas: 0
    },
    {
        titulo: "Dicas para estudar melhor",
        categoria: "Educação",
        conteudo: "Aprenda a organizar seus estudos e melhorar sua produtividade.",
        curtidas: 0
    },
    {
        titulo: "Como ter uma vida saudável",
        categoria: "Estilo de vida",
        conteudo: "Pequenas mudanças podem melhorar sua rotina.",
        curtidas: 0
    }
];

const listaArtigos = document.getElementById("lista-artigos");
const campoBusca = document.getElementById("busca");
const formulario = document.getElementById("form-artigo");

// Mostrar os artigos na página
function mostrarArtigos(lista = artigos) {
    listaArtigos.innerHTML = "";

    if (lista.length === 0) {
        listaArtigos.textContent = "Nenhum artigo encontrado.";
        return;
    }

    lista.forEach((artigo) => {
        const cartao = document.createElement("article");
        cartao.className = "artigo";

        const titulo = document.createElement("h2");
        titulo.textContent = artigo.titulo;

        const categoria = document.createElement("p");
        categoria.textContent = "Categoria: " + artigo.categoria;

        const conteudo = document.createElement("p");
        conteudo.textContent = artigo.conteudo;

        const botaoCurtir = document.createElement("button");
        botaoCurtir.textContent = `❤️ Curtir (${artigo.curtidas})`;

        botaoCurtir.addEventListener("click", () => {
            artigo.curtidas++;
            mostrarArtigos(buscarArtigos(campoBusca.value));
        });

        cartao.append(titulo, categoria, conteudo, botaoCurtir);
        listaArtigos.appendChild(cartao);
    });
}

// Buscar artigos pelo título ou categoria
function buscarArtigos(termo) {
    termo = termo.toLowerCase().trim();

    return artigos.filter((artigo) =>
        artigo.titulo.toLowerCase().includes(termo) ||
        artigo.categoria.toLowerCase().includes(termo)
    );
}

campoBusca.addEventListener("input", () => {
    mostrarArtigos(buscarArtigos(campoBusca.value));
});

// Adicionar um novo artigo
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const conteudo = document.getElementById("conteudo").value.trim();

    if (!titulo || !categoria || !conteudo) {
        alert("Preencha todos os campos!");
        return;
    }

    artigos.unshift({
        titulo,
        categoria,
        conteudo,
        curtidas: 0
    });

    formulario.reset();
    campoBusca.value = "";
    mostrarArtigos();

    alert("Artigo publicado com sucesso!");
});

// Exibir os artigos iniciais
mostrarArtigos();

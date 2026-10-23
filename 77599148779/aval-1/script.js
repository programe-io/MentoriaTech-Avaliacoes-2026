
/* ============================
   BLOG INTERATIVO
============================ */

// Artigos iniciais do blog
let artigos = [
    {
        id: 1,
        titulo: "O mundo da tecnologia",
        categoria: "Tecnologia",
        autor: "filipe",
        data: "23/10/2026",
        conteudo:
            "Descubra como a tecnologia está transformando nosso cotidiano e criando novas oportunidades.",
        curtidas: 0
    },
    {
        id: 2,
        titulo: "Dicas para estudar melhor",
        categoria: "Educação",
        autor: "filipe",
        data: "22/10/2026",
        conteudo:
            "Organize seu tempo, defina metas e estude um pouco todos os dias para melhorar seus resultados.",
        curtidas: 0
    },
    {
        id: 3,
        titulo: "Curiosidades sobre o universo",
        categoria: "Curiosidades",
        autor: "filipe",
        data: "21/10/2026",
        conteudo:
            "O universo é gigantesco e guarda muitos mistérios que a ciência ainda procura compreender.",
        curtidas: 0
    }
];

// Elementos do HTML
const listaArtigos = document.querySelector("#lista-artigos");
const campoPesquisa = document.querySelector("#pesquisa");
const formulario = document.querySelector("#form-artigo");

// Exibe os artigos na página
function mostrarArtigos(lista = artigos) {
    if (!listaArtigos) return;

    listaArtigos.replaceChildren();

    if (lista.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum artigo encontrado.";
        listaArtigos.appendChild(mensagem);
        return;
    }

    lista.forEach((artigo) => {
        const cartao = document.createElement("article");
        cartao.className = "post";

        const titulo = document.createElement("h2");
        titulo.textContent = artigo.titulo;

        const categoria = document.createElement("p");
        categoria.textContent = `Categoria: ${artigo.categoria}`;

        const detalhes = document.createElement("small");
        detalhes.textContent =
            `Por ${artigo.autor} • ${artigo.data}`;

        const conteudo = document.createElement("p");
        conteudo.textContent = artigo.conteudo;

        const curtidas = document.createElement("p");
        curtidas.textContent = `❤️ ${artigo.curtidas} curtidas`;

        const botaoCurtir = document.createElement("button");
        botaoCurtir.textContent = "Curtir";

        botaoCurtir.addEventListener("click", () => {
            artigo.curtidas++;
            mostrarArtigos(
                filtrarArtigos(campoPesquisa?.value || "")
            );
        });

        cartao.append(
            titulo,
            categoria,
            detalhes,
            conteudo,
            curtidas,
            botaoCurtir
        );

        listaArtigos.appendChild(cartao);
    });
}

// Pesquisa artigos pelo título, texto ou categoria
function filtrarArtigos(termo) {
    const pesquisa = termo.trim().toLowerCase();

    return artigos.filter((artigo) =>
        `${artigo.titulo} ${artigo.conteudo} ${artigo.categoria}`
            .toLowerCase()
            .includes(pesquisa)
    );
}

campoPesquisa?.addEventListener("input", (evento) => {
    mostrarArtigos(filtrarArtigos(evento.target.value));
});

// Adiciona uma nova publicação
formulario?.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const titulo = document.querySelector("#titulo").value.trim();
    const categoria = document.querySelector("#categoria").value.trim();
    const autor = document.querySelector("#autor").value.trim();
    const conteudo = document.querySelector("#conteudo").value.trim();

    if (!titulo || !categoria || !autor || !conteudo) {
        alert("Preencha todos os campos!");
        return;
    }

    const novoArtigo = {
        id: Date.now(),
        titulo,
        categoria,
        autor,
        data: new Date().toLocaleDateString("pt-BR"),
        conteudo,
        curtidas: 0
    };

    artigos.unshift(novoArtigo);

    formulario.reset();
    mostrarArtigos(filtrarArtigos(campoPesquisa?.value || ""));

    alert("Artigo publicado com sucesso!");
});

// Inicializa o blog
mostrarArtigos();

console.log("Blog carregado com sucesso!");

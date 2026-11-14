const noticias = [
    {
        titulo: "Grande duelo de MMA é anunciado",
        texto: "Dois grandes nomes do MMA se preparam para um confronto que promete muita ação.",
        categoria: "MMA",
        data: "14/11/2026",
        imagem: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed"
    },

    {
        titulo: "Boxe mundial ganha novo campeão",
        texto: "Uma nova estrela do boxe conquista o título após uma grande luta.",
        categoria: "Boxe",
        data: "13/11/2026",
        imagem: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed"
    },

    {
        titulo: "Jiu-Jitsu: campeonato reúne grandes atletas",
        texto: "Competição reúne lutadores de diferentes regiões em busca do título.",
        categoria: "Jiu-Jitsu",
        data: "12/11/2026",
        imagem: "https://images.unsplash.com/photo-1555597673-b21d5c935865"
    },

    {
        titulo: "Treinamento intenso antes do próximo combate",
        texto: "Atletas intensificam seus treinamentos para chegar preparados ao próximo desafio.",
        categoria: "MMA",
        data: "11/11/2026",
        imagem: "https://images.unsplash.com/photo-1517438322307-e67111335449"
    },

    {
        titulo: "Nova geração do boxe chama atenção",
        texto: "Jovens talentos começam a ganhar destaque no cenário nacional.",
        categoria: "Boxe",
        data: "10/11/2026",
        imagem: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed"
    },

    {
        titulo: "Técnicas de Jiu-Jitsu impressionam no campeonato",
        texto: "Atletas demonstram técnicas avançadas durante as disputas.",
        categoria: "Jiu-Jitsu",
        data: "09/11/2026",
        imagem: "https://images.unsplash.com/photo-1555597673-b21d5c935865"
    }
];

let categoriaAtual = "todas";
let quantidade = 4;

function mostrarNoticias(lista) {
    const feed = document.getElementById("feed");

    feed.innerHTML = "";

    lista.slice(0, quantidade).forEach(noticia => {

        const card = document.createElement("article");

        card.classList.add("noticia");

        card.innerHTML = `
            <img src="${noticia.imagem}" alt="${noticia.titulo}">

            <div class="conteudo">
                <span class="categoria">${noticia.categoria}</span>

                <h2>${noticia.titulo}</h2>

                <p>${noticia.texto}</p>

                <span class="data">
                    Publicado em ${noticia.data}
                </span>
            </div>
        `;

        feed.appendChild(card);
    });
}

function filtrarNoticias(categoria) {
    categoriaAtual = categoria;

    let resultado = noticias;

    if (categoria !== "todas") {
        resultado = noticias.filter(
            noticia => noticia.categoria === categoria
        );
    }

    mostrarNoticias(resultado);
}

function buscarNoticias() {
    const busca = document
        .getElementById("campoBusca")
        .value
        .toLowerCase();

    let resultado = noticias.filter(noticia =>
        noticia.titulo.toLowerCase().includes(busca) ||
        noticia.texto.toLowerCase().includes(busca)
    );

    if (categoriaAtual !== "todas") {
        resultado = resultado.filter(
            noticia => noticia.categoria === categoriaAtual
        );
    }

    mostrarNoticias(resultado);
}

function carregarMais() {
    quantidade += 2;

    filtrarNoticias(categoriaAtual);
}

// Carregar notícias ao abrir a página
mostrarNoticias(noticias);

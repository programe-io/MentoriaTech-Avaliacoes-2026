
const noticias = [
    {
        titulo: "Novas tecnologias prometem transformar o futuro",
        descricao: "Especialistas apresentam novidades tecnológicas que podem mudar o cotidiano.",
        categoria: "Tecnologia",
        imagem: "https://picsum.photos/id/0/600/400",
        data: "19/11/2026"
    },
    {
        titulo: "Brasil registra novidades importantes na economia",
        descricao: "Indicadores econômicos movimentam o mercado brasileiro.",
        categoria: "Economia",
        imagem: "https://picsum.photos/id/20/600/400",
        data: "19/11/2026"
    },
    {
        titulo: "Seleção brasileira se prepara para novos desafios",
        descricao: "Equipe intensifica os treinamentos para as próximas competições.",
        categoria: "Esportes",
        imagem: "https://picsum.photos/id/1058/600/400",
        data: "19/11/2026"
    },
    {
        titulo: "Novidades movimentam o cenário internacional",
        descricao: "Líderes mundiais discutem assuntos importantes.",
        categoria: "Mundo",
        imagem: "https://picsum.photos/id/1043/600/400",
        data: "19/11/2026"
    },
    {
        titulo: "Novos projetos são anunciados no Brasil",
        descricao: "Iniciativas buscam melhorar a infraestrutura das cidades.",
        categoria: "Brasil",
        imagem: "https://picsum.photos/id/1015/600/400",
        data: "19/11/2026"
    },
    {
        titulo: "Mercado financeiro apresenta novas tendências",
        descricao: "Analistas avaliam as perspectivas para os próximos meses.",
        categoria: "Economia",
        imagem: "https://picsum.photos/id/180/600/400",
        data: "19/11/2026"
    }
];

const grid = document.getElementById("newsGrid");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");

let categoriaAtual = "Todas";

function mostrarNoticias(lista) {
    grid.innerHTML = "";

    emptyMessage.hidden = lista.length > 0;

    lista.forEach((noticia, index) => {
        const card = document.createElement("article");
        card.className = "news-card";

        card.innerHTML = `
            <img src="${noticia.imagem}" alt="Imagem da notícia">

            <div class="news-info">
                <span class="tag">${noticia.categoria}</span>

                <h3>${noticia.titulo}</h3>

                <p>${noticia.descricao}</p>

                <small>${noticia.data}</small>

                <a class="read-more" href="#" data-index="${index}">
                    Ler mais →
                </a>
            </div>
        `;

        grid.appendChild(card);
    });
}

function filtrarNoticias() {
    const termo = searchInput.value.toLowerCase();

    const resultado = noticias.filter(noticia => {
        const correspondeCategoria =
            categoriaAtual === "Todas" ||
            noticia.categoria === categoriaAtual;

        const correspondeBusca =
            noticia.titulo.toLowerCase().includes(termo) ||
            noticia.descricao.toLowerCase().includes(termo);

        return correspondeCategoria && correspondeBusca;
    });

    mostrarNoticias(resultado);
}

// Filtro de categorias
document.querySelectorAll(".categories button").forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelector(".categories button.active")
            ?.classList.remove("active");

        botao.classList.add("active");

        categoriaAtual = botao.dataset.category;

        filtrarNoticias();
    });
});

// Pesquisa
searchInput.addEventListener("input", filtrarNoticias);

document.getElementById("searchBtn")
    .addEventListener("click", filtrarNoticias);

// Inicializar
mostrarNoticias(noticias);

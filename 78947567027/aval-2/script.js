
const noticias = [
    {
        titulo: "O mistério por trás do Titã Fundador",
        categoria: "Anime",
        imagem: "https://placehold.co/900x450/241414/ffffff?text=Titan+Founder",
        descricao: "Descubra como funciona o poder do Titã Fundador e sua ligação com a família real.",
        data: "17/11/2026",
        curtidas: 125
    },
    {
        titulo: "Levi Ackerman: o soldado mais forte",
        categoria: "Personagens",
        imagem: "https://placehold.co/900x450/17202a/ffffff?text=Levi+Ackerman",
        descricao: "Conheça a trajetória, habilidades e momentos mais marcantes do capitão Levi.",
        data: "16/11/2026",
        curtidas: 230
    },
    {
        titulo: "O final de Attack on Titan explicado",
        categoria: "Anime",
        imagem: "https://placehold.co/900x450/302020/ffffff?text=Attack+on+Titan",
        descricao: "Entenda os acontecimentos finais e os principais detalhes da conclusão da história.",
        data: "15/11/2026",
        curtidas: 187
    },
    {
        titulo: "Os nove titãs e seus poderes",
        categoria: "Mangá",
        imagem: "https://placehold.co/900x450/202b35/ffffff?text=The+Nine+Titans",
        descricao: "Uma análise dos nove poderes titânicos e das características de cada um.",
        data: "14/11/2026",
        curtidas: 98
    },
    {
        titulo: "E se Erwin tivesse sobrevivido?",
        categoria: "Teorias",
        imagem: "https://placehold.co/900x450/282019/ffffff?text=Erwin+Smith",
        descricao: "Uma teoria sobre como a história poderia ter mudado com a sobrevivência de Erwin.",
        data: "13/11/2026",
        curtidas: 310
    },
    {
        titulo: "Mikasa e o legado dos Ackerman",
        categoria: "Personagens",
        imagem: "https://placehold.co/900x450/29202a/ffffff?text=Mikasa",
        descricao: "Explore a história do clã Ackerman e sua importância na narrativa.",
        data: "12/11/2026",
        curtidas: 145
    }
];

const feed = document.getElementById("newsFeed");
const search = document.getElementById("search");
const filters = document.querySelectorAll(".filter");

let categoriaAtual = "Todos";

function renderizarNoticias() {
    const termo = search.value.toLowerCase();

    const filtradas = noticias.filter(noticia => {
        const combinaCategoria =
            categoriaAtual === "Todos" ||
            noticia.categoria === categoriaAtual;

        const combinaBusca =
            noticia.titulo.toLowerCase().includes(termo) ||
            noticia.descricao.toLowerCase().includes(termo);

        return combinaCategoria && combinaBusca;
    });

    feed.innerHTML = "";

    if (filtradas.length === 0) {
        feed.innerHTML = `
            <p class="empty">Nenhuma notícia encontrada.</p>
        `;
        return;
    }

    filtradas.forEach(noticia => {
        const card = document.createElement("article");
        card.className = "news-card";

        card.innerHTML = `
            <img src="${noticia.imagem}" alt="${noticia.titulo}">

            <div class="news-content">
                <span class="category">${noticia.categoria}</span>

                <h3>${noticia.titulo}</h3>

                <p>${noticia.descricao}</p>

                <div class="news-info">
                    <span>${noticia.data}</span>

                    <button class="like">
                        ❤️ <span>${noticia.curtidas}</span>
                    </button>
                </div>
            </div>
        `;

        const likeButton = card.querySelector(".like");

        likeButton.addEventListener("click", () => {
            noticia.curtidas++;
            likeButton.classList.add("liked");
            likeButton.querySelector("span").textContent =
                noticia.curtidas;
        });

        feed.appendChild(card);
    });
}

// Pesquisa
search.addEventListener("input", renderizarNoticias);

// Filtros
filters.forEach(button => {
    button.addEventListener("click", () => {
        filters.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        categoriaAtual = button.dataset.category;

        renderizarNoticias();
    });
});

// Inicializar feed
renderizarNoticias();

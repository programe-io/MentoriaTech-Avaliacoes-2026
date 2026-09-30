const filmes = [

    {
        id: 1,

        titulo: "Matilda",

        tipo: "Filme",

        ano: 1996,

        duracao: "1h 38min",

        nota: 7.0,

        generos: "Comédia • Família • Fantasia",

        imagem:
            "https://image.tmdb.org/t/p/w500/8i1x1Qn1kK8Q6R1X2N2N1s5Y7m1.jpg",

        descricao:
            "Uma menina extraordinariamente inteligente descobre que possui poderes especiais."
    },


    {
        id: 2,

        titulo: "Garotas Malvadas",

        tipo: "Filme",

        ano: 2004,

        duracao: "1h 37min",

        nota: 7.1,

        generos: "Comédia • Romance",

        imagem:
            "https://image.tmdb.org/t/p/w500/1i1N1Y1F4Q1J1J1J1J1J1J1J1J.jpg",

        descricao:
            "Uma adolescente precisa se adaptar a uma nova escola e acaba entrando no grupo mais popular."
    },


    {
        id: 3,

        titulo: "Outer Banks",

        tipo: "Série",

        ano: 2020,

        duracao: "4 temporadas",

        nota: 7.5,

        generos: "Aventura • Drama • Mistério",

        imagem:
            "https://image.tmdb.org/t/p/w500/1i1N1Y1F4Q1J1J1J1J1J1J1J1J.jpg",

        descricao:
            "Um grupo de amigos embarca em uma aventura em busca de um tesouro perdido."
    }

];


const movieGrid =
    document.getElementById(
        "movieGrid"
    );


const favoriteGrid =
    document.getElementById(
        "favoriteGrid"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


function obterFavoritos() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "cineverse_favoritos"
            )
        ) || [];

    } catch {

        return [];

    }

}


function salvarFavoritos(favoritos) {

    localStorage.setItem(
        "cineverse_favoritos",
        JSON.stringify(favoritos)
    );

}


function alternarFavorito(id) {

    let favoritos =
        obterFavoritos();


    if (favoritos.includes(id)) {

        favoritos =
            favoritos.filter(
                favorito =>
                    favorito !== id
            );

    } else {

        favoritos.push(id);

    }


    salvarFavoritos(favoritos);

    renderizarFilmes(
        filmes
    );

    renderizarFavoritos();

}


function criarCard(filme) {

    const favoritos =
        obterFavoritos();


    const favorito =
        favoritos.includes(
            filme.id
        );


    return `

        <article class="movie-card">

            <div class="poster">

                <img
                    src="${filme.imagem}"
                    alt="${filme.titulo}"
                    onerror="this.src='https://via.placeholder.com/500x750/222222/ffffff?text=${encodeURIComponent(filme.titulo)}'"
                >


                <button
                    class="favorite ${
                        favorito
                            ? "active"
                            : ""
                    }"
                    onclick="
                        alternarFavorito(
                            ${filme.id}
                        )
                    "
                    aria-label="Favoritar"
                >
                    ${
                        favorito
                            ? "♥"
                            : "♡"
                    }
                </button>

            </div>


            <div class="movie-info">

                <span class="type">
                    ${filme.tipo}
                </span>


                <h3>
                    ${filme.titulo}
                </h3>


                <div class="movie-meta">

                    <span>
                        ${filme.ano}
                    </span>

                    <span>
                        ${filme.duracao}
                    </span>

                    <span class="rating">
                        ★ ${filme.nota}
                    </span>

                </div>


                <p class="movie-description">
                    ${filme.descricao}
                </p>

            </div>

        </article>

    `;

}


function renderizarFilmes(lista) {

    if (!movieGrid) {
        return;
    }


    if (lista.length === 0) {

        movieGrid.innerHTML = `

            <p>
                Nenhum filme encontrado.
            </p>

        `;

        return;

    }


    movieGrid.innerHTML =
        lista
            .map(
                filme =>
                    criarCard(filme)
            )
            .join("");

}


function renderizarFavoritos() {

    if (!favoriteGrid) {
        return;
    }


    const favoritos =
        obterFavoritos();


    const lista =
        filmes.filter(
            filme =>
                favoritos.includes(
                    filme.id
                )
        );


    if (lista.length === 0) {

        favoriteGrid.innerHTML = `

            <p>
                Você ainda não adicionou
                nenhum título à sua lista.
            </p>

        `;

        return;

    }


    favoriteGrid.innerHTML =
        lista
            .map(
                filme =>
                    criarCard(filme)
            )
            .join("");

}


function pesquisar() {

    const termo =
        searchInput.value
            .toLowerCase()
            .trim();


    if (!termo) {

        renderizarFilmes(
            filmes
        );

        return;

    }


    const resultados =
        filmes.filter(
            filme =>
                filme.titulo
                    .toLowerCase()
                    .includes(termo)
                ||

                filme.tipo
                    .toLowerCase()
                    .includes(termo)
                ||

                filme.generos
                    .toLowerCase()
                    .includes(termo)
        );


    renderizarFilmes(
        resultados
    );

}


function scrollToCatalogo() {

    document
        .getElementById("filmes")
        .scrollIntoView({
            behavior: "smooth"
        });

}


document
    .getElementById("themeButton")
    .addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light"
            );

            const modo =
                document.body.classList.contains(
                    "light"
                );

            localStorage.setItem(
                "cineverse_theme",
                modo
                    ? "light"
                    : "dark"
            );

        }
    );


searchInput.addEventListener(
    "input",
    pesquisar
);


const temaSalvo =
    localStorage.getItem(
        "cineverse_theme"
    );


if (temaSalvo === "light") {

    document.body.classList.add(
        "light"
    );

}


renderizarFilmes(
    filmes
);

renderizarFavoritos();

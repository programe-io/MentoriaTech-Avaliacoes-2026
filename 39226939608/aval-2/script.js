/* =========================================
   BANCO DE FILMES
========================================= */

const filmes = [

    {
        id: 1,

        titulo:
            "Horizonte Vermelho",

        genero:
            ["Ação", "Aventura"],

        classificacao:
            "14",

        duracao:
            128,

        avaliacao:
            9.1,

        ano:
            2026,

        diretor:
            "Lucas Almeida",

        descricao:
            "Um grupo de exploradores precisa atravessar uma região desconhecida enquanto enfrenta uma ameaça que pode mudar o destino da humanidade.",

        poster:
            "poster-1",

        destaque:
            true,

        horarios:
            ["14:00", "16:30", "19:00", "21:40"]
    },


    {
        id: 2,

        titulo:
            "Além das Estrelas",

        genero:
            ["Ficção", "Drama"],

        classificacao:
            "12",

        duracao:
            142,

        avaliacao:
            8.8,

        ano:
            2026,

        diretor:
            "Marina Costa",

        descricao:
            "Uma astronauta recebe uma mensagem misteriosa vinda de uma região desconhecida do espaço e precisa decidir se deve seguir a mensagem ou retornar para casa.",

        poster:
            "poster-2",

        destaque:
            true,

        horarios:
            ["13:30", "16:10", "18:50", "21:30"]
    },


    {
        id: 3,

        titulo:
            "O Último Guardião",

        genero:
            ["Aventura", "Ação"],

        classificacao:
            "12",

        duracao:
            119,

        avaliacao:
            8.5,

        ano:
            2026,

        diretor:
            "Rafael Mendes",

        descricao:
            "Um antigo guardião precisa retornar à batalha quando uma força esquecida ameaça destruir seu reino.",

        poster:
            "poster-3",

        destaque:
            false,

        horarios:
            ["14:20", "17:00", "19:40", "22:00"]
    },


    {
        id: 4,

        titulo:
            "Cidade Sombria",

        genero:
            ["Terror", "Drama"],

        classificacao:
            "16",

        duracao:
            104,

        avaliacao:
            8.3,

        ano:
            2026,

        diretor:
            "Fernanda Rocha",

        descricao:
            "Depois de uma série de acontecimentos inexplicáveis, uma jornalista decide investigar os segredos escondidos em uma cidade aparentemente tranquila.",

        poster:
            "poster-4",

        destaque:
            true,

        horarios:
            ["15:00", "17:20", "19:45", "22:15"]
    },


    {
        id: 5,

        titulo:
            "Verão em Paris",

        genero:
            ["Comédia", "Romance"],

        classificacao:
            "12",

        duracao:
            110,

        avaliacao:
            8.1,

        ano:
            2026,

        diretor:
            "Camila Santos",

        descricao:
            "Dois desconhecidos se encontram durante uma viagem e descobrem que algumas histórias de amor começam justamente quando menos esperamos.",

        poster:
            "poster-5",

        destaque:
            false,

        horarios:
            ["13:00", "15:30", "18:00", "20:30"]
    },


    {
        id: 6,

        titulo:
            "Oceano Profundo",

        genero:
            ["Aventura", "Drama"],

        classificacao:
            "10",

        duracao:
            126,

        avaliacao:
            8.7,

        ano:
            2026,

        diretor:
            "André Oliveira",

        descricao:
            "Uma equipe de pesquisadores parte para uma missão nas profundezas do oceano e encontra algo que não deveria existir.",

        poster:
            "poster-6",

        destaque:
            false,

        horarios:
            ["14:10", "16:50", "19:20", "21:50"]
    },


    {
        id: 7,

        titulo:
            "Noite Sem Fim",

        genero:
            ["Terror", "Suspense"],

        classificacao:
            "18",

        duracao:
            98,

        avaliacao:
            8.0,

        ano:
            2026,

        diretor:
            "Bruno Martins",

        descricao:
            "Durante uma noite aparentemente comum, cinco amigos ficam presos em uma casa onde cada hora revela um novo segredo.",

        poster:
            "poster-7",

        destaque:
            false,

        horarios:
            ["18:10", "20:20", "22:30"]
    },


    {
        id: 8,

        titulo:
            "A Grande Aventura",

        genero:
            ["Animação", "Aventura"],

        classificacao:
            "Livre",

        duracao:
            95,

        avaliacao:
            8.9,

        ano:
            2026,

        diretor:
            "Paulo Ferreira",

        descricao:
            "Um pequeno herói embarca em uma grande aventura para encontrar sua família e descobrir o verdadeiro significado da amizade.",

        poster:
            "poster-8",

        destaque:
            false,

        horarios:
            ["12:00", "14:15", "16:30", "18:45"]
    }

];


/* =========================================
   ELEMENTOS
========================================= */

const listaFilmes =
    document.getElementById(
        "listaFilmes"
    );

const campoBusca =
    document.getElementById(
        "campoBusca"
    );

const filtroGenero =
    document.getElementById(
        "filtroGenero"
    );

const filtroClassificacao =
    document.getElementById(
        "filtroClassificacao"
    );

const ordenacao =
    document.getElementById(
        "ordenacao"
    );

const totalFilmes =
    document.getElementById(
        "totalFilmes"
    );

const estatisticaFilmes =
    document.getElementById(
        "estatisticaFilmes"
    );

const semResultados =
    document.getElementById(
        "semResultados"
    );

const modalFilme =
    document.getElementById(
        "modalFilme"
    );

const detalhesFilme =
    document.getElementById(
        "detalhesFilme"
    );

const fecharModal =
    document.getElementById(
        "fecharModal"
    );

const btnTema =
    document.getElementById(
        "btnTema"
    );

const btnFavoritos =
    document.getElementById(
        "btnFavoritos"
    );

const contadorFavoritos =
    document.getElementById(
        "contadorFavoritos"
    );

const modalFavoritos =
    document.getElementById(
        "modalFavoritos"
    );

const listaFavoritos =
    document.getElementById(
        "listaFavoritos"
    );

const fecharFavoritos =
    document.getElementById(
        "fecharFavoritos"
    );


/* =========================================
   FAVORITOS
========================================= */

let favoritos =
    JSON.parse(
        localStorage.getItem(
            "cinemax_favoritos"
        )
    ) || [];


/* =========================================
   RENDERIZAR FILMES
========================================= */

function renderizarFilmes() {

    let resultado =
        [...filmes];


    /* ================================
       BUSCA
    ================================= */

    const busca =
        campoBusca.value
            .toLowerCase()
            .trim();


    if (busca !== "") {

        resultado =
            resultado.filter(
                filme => {

                    return (

                        filme.titulo
                            .toLowerCase()
                            .includes(busca)

                        ||

                        filme.genero
                            .join(" ")
                            .toLowerCase()
                            .includes(busca)

                    );
                }
            );
    }


    /* ================================
       GÊNERO
    ================================= */

    const genero =
        filtroGenero.value;


    if (genero !== "todos") {

        resultado =
            resultado.filter(
                filme =>
                    filme.genero.includes(
                        genero
                    )
            );
    }


    /* ================================
       CLASSIFICAÇÃO
    ================================= */

    const classificacao =
        filtroClassificacao.value;


    if (
        classificacao !==
        "todas"
    ) {

        resultado =
            resultado.filter(
                filme =>
                    filme.classificacao ===
                    classificacao
            );
    }


    /* ================================
       ORDENAÇÃO
    ================================= */

    switch (
        ordenacao.value
    ) {

        case "popular":

            resultado.sort(
                (a, b) =>
                    b.avaliacao -
                    a.avaliacao
            );

            break;


        case "avaliacao":

            resultado.sort(
                (a, b) =>
                    b.avaliacao -
                    a.avaliacao
            );

            break;


        case "titulo":

            resultado.sort(
                (a, b) =>
                    a.titulo
                        .localeCompare(
                            b.titulo
                        )
            );

            break;


        case "duracao":

            resultado.sort(
                (a, b) =>
                    a.duracao -
                    b.duracao
            );

            break;
    }


    /* ================================
       ATUALIZAR CONTADOR
    ================================= */

    totalFilmes.textContent =
        `${resultado.length} ${
            resultado.length === 1
                ? "filme"
                : "filmes"
        }`;


    /* ================================
       LIMPAR
    ================================= */

    listaFilmes.innerHTML = "";


    /* ================================
       SEM RESULTADOS
    ================================= */

    if (
        resultado.length === 0
    ) {

        semResultados.classList.add(
            "show"
        );

        return;

    } else {

        semResultados.classList.remove(
            "show"
        );
    }


    /* ================================
       CRIAR CARDS
    ================================= */

    resultado.forEach(
        filme => {

            listaFilmes.appendChild(
                criarCard(filme)
            );
        }
    );
}


/* =========================================
   CRIAR CARD
========================================= */

function criarCard(filme) {

    const card =
        document.createElement(
            "article"
        );

    card.className =
        "movie-card";


    const favorito =
        favoritos.includes(
            filme.id
        );


    const generos =
        filme.genero
            .map(
                genero =>
                    `<span class="genre">
                        ${genero}
                    </span>`
            )
            .join("");


    card.innerHTML = `

        <div class="poster ${filme.poster}">

            <button
                class="favorite-button ${
                    favorito
                        ? "active"
                        : ""
                }"
                data-action="favorito"
                data-id="${filme.id}"
                title="Adicionar aos favoritos"
            >
                ${
                    favorito
                        ? "❤️"
                        : "♡"
                }
            </button>


            <div class="poster-content">

                <div class="poster-title">
                    ${filme.titulo}
                </div>

                <div class="poster-subtitle">
                    ${filme.ano}
                    •
                    ${filme.duracao} min
                </div>

            </div>

        </div>


        <div class="movie-info">

            <h3>
                ${filme.titulo}
            </h3>


            <div class="movie-meta">

                <span class="rating">
                    ★ ${filme.avaliacao}
                </span>

                <span>
                    ${filme.duracao} min
                </span>

                <span class="classification">
                    ${filme.classificacao}
                </span>

            </div>


            <div class="genres">
                ${generos}
            </div>


            <div class="movie-buttons">

                <button
                    class="details"
                    data-action="detalhes"
                    data-id="${filme.id}"
                >
                    Ver detalhes
                </button>

                <button
                    data-action="ingresso"
                    data-id="${filme.id}"
                >
                    🎟️ Ingresso
                </button>

            </div>

        </div>
    `;


    return card;
}


/* =========================================
   FAVORITAR
========================================= */

function alternarFavorito(id) {

    if (
        favoritos.includes(id)
    ) {

        favoritos =
            favoritos.filter(
                favorito =>
                    favorito !== id
            );

    } else {

        favoritos.push(id);
    }


    localStorage.setItem(
        "cinemax_favoritos",
        JSON.stringify(
            favoritos
        )
    );


    atualizarContadorFavoritos();

    renderizarFilmes();
}


/* =========================================
   CONTADOR FAVORITOS
========================================= */

function atualizarContadorFavoritos() {

    contadorFavoritos.textContent =
        favoritos.length;
}


/* =========================================
   DETALHES DO FILME
========================================= */

function abrirDetalhes(id) {

    const filme =
        filmes.find(
            filme =>
                filme.id === id
        );


    if (!filme) {
        return;
    }


    const sessoes =
        filme.horarios
            .map(
                horario =>
                    `
                    <button
                        class="session"
                        data-horario="${horario}"
                    >
                        ${horario}
                    </button>
                    `
            )
            .join("");


    detalhesFilme.innerHTML = `

        <div class="details-header">

            <div
                class="details-poster ${filme.poster}"
            >
                🎬
            </div>


            <div class="details-info">

                <span class="section-label">
                    EM CARTAZ
                </span>

                <h2>
                    ${filme.titulo}
                </h2>


                <div class="movie-meta">

                    <span class="rating">
                        ★ ${filme.avaliacao}
                    </span>

                    <span>
                        ${filme.ano}
                    </span>

                    <span>
                        ${filme.duracao} min
                    </span>

                    <span class="classification">
                        ${filme.classificacao}
                    </span>

                </div>


                <div class="genres">

                    ${filme.genero
                        .map(
                            genero =>
                                `
                                <span class="genre">
                                    ${genero}
                                </span>
                                `
                        )
                        .join("")}

                </div>


                <p>
                    ${filme.descricao}
                </p>


                <p>
                    <strong>
                        Direção:
                    </strong>

                    ${filme.diretor}
                </p>

            </div>

        </div>


        <div class="sessions">

            <h3>
                🎟️ Escolha um horário
            </h3>

            <div class="session-buttons">

                ${sessoes}

            </div>

        </div>
    `;


    modalFilme.classList.add(
        "show"
    );
}


/* =========================================
   COMPRAR INGRESSO
========================================= */

function comprarIngresso(id) {

    const filme =
        filmes.find(
            filme =>
                filme.id === id
        );


    if (!filme) {
        return;
    }


    abrirDetalhes(id);
}


/* =========================================
   EVENTOS DOS FILMES
========================================= */

listaFilmes.addEventListener(
    "click",
    function(event) {

        const botao =
            event.target.closest(
                "button"
            );


        if (!botao) {
            return;
        }


        const id =
            Number(
                botao.dataset.id
            );

        const action =
            botao.dataset.action;


        if (
            action ===
            "favorito"
        ) {

            alternarFavorito(id);

            return;
        }


        if (
            action ===
            "detalhes"
        ) {

            abrirDetalhes(id);

            return;
        }


        if (
            action ===
            "ingresso"
        ) {

            comprarIngresso(id);
        }
    }
);


/* =========================================
   HORÁRIOS
========================================= */

detalhesFilme.addEventListener(
    "click",
    function(event) {

        const botao =
            event.target.closest(
                ".session"
            );


        if (!botao) {
            return;
        }


        const horario =
            botao.dataset.horario;


        alert(
            `Sessão das ${horario} selecionada!\n\n` +
            `Em uma aplicação real, aqui seria aberta ` +
            `a página de compra dos ingressos.`
        );
    }
);


/* =========================================
   BUSCA
========================================= */

campoBusca.addEventListener(
    "input",
    renderizarFilmes
);


/* =========================================
   FILTRO GÊNERO
========================================= */

filtroGenero.addEventListener(
    "change",
    renderizarFilmes
);


/* =========================================
   FILTRO CLASSIFICAÇÃO
========================================= */

filtroClassificacao.addEventListener(
    "change",
    renderizarFilmes
);


/* =========================================
   ORDENAÇÃO
========================================= */

ordenacao.addEventListener(
    "change",
    renderizarFilmes
);


/* =========================================
   FECHAR MODAL
========================================= */

fecharModal.addEventListener(
    "click",
    function() {

        modalFilme.classList.remove(
            "show"
        );
    }
);


modalFilme.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            modalFilme
        ) {

            modalFilme.classList.remove(
                "show"
            );
        }
    }
);


/* =========================================
   FAVORITOS
========================================= */

btnFavoritos.addEventListener(
    "click",
    function() {

        renderizarFavoritos();

        modalFavoritos.classList.add(
            "show"
        );
    }
);


/* =========================================
   RENDERIZAR FAVORITOS
========================================= */

function renderizarFavoritos() {

    listaFavoritos.innerHTML = "";


    if (
        favoritos.length === 0
    ) {

        listaFavoritos.innerHTML = `

            <div class="no-results"
                 style="display:block; padding:30px 0;">

                <div class="no-results-icon">
                    ❤️
                </div>

                <p>
                    Você ainda não adicionou
                    nenhum filme aos favoritos.
                </p>

            </div>

        `;

        return;
    }


    favoritos.forEach(
        id => {

            const filme =
                filmes.find(
                    filme =>
                        filme.id === id
                );


            if (!filme) {
                return;
            }


            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "favorite-item";


            item.innerHTML = `

                <div
                    class="favorite-mini-poster"
                >
                    🎬
                </div>


                <div
                    class="favorite-item-info"
                >

                    <h3>
                        ${filme.titulo}
                    </h3>

                    <span>
                        ★ ${filme.avaliacao}
                        •
                        ${filme.duracao} min
                    </span>

                </div>


                <button
                    class="icon-button remove-favorite"
                    data-id="${filme.id}"
                >
                    ×
                </button>

            `;


            listaFavoritos.appendChild(
                item
            );
        }
    );
}


/* =========================================
   REMOVER FAVORITO
========================================= */

listaFavoritos.addEventListener(
    "click",
    function(event) {

        const botao =
            event.target.closest(
                ".remove-favorite"
            );


        if (!botao) {
            return;
        }


        const id =
            Number(
                botao.dataset.id
            );


        alternarFavorito(id);

        renderizarFavoritos();
    }
);


/* =========================================
   FECHAR FAVORITOS
========================================= */

fecharFavoritos.addEventListener(
    "click",
    function() {

        modalFavoritos.classList.remove(
            "show"
        );
    }
);


modalFavoritos.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            modalFavoritos
        ) {

            modalFavoritos.classList.remove(
                "show"
            );
        }
    }
);


/* =========================================
   MODO ESCURO / CLARO
========================================= */

btnTema.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "light"
        );


        const modoClaro =
            document.body.classList.contains(
                "light"
            );


        btnTema.textContent =
            modoClaro
                ? "☀️"
                : "🌙";


        localStorage.setItem(
            "cinemax_tema",
            modoClaro
                ? "light"
                : "dark"
        );
    }
);


/* =========================================
   CARREGAR TEMA
========================================= */

function carregarTema() {

    const tema =
        localStorage.getItem(
            "cinemax_tema"
        );


    if (
        tema === "light"
    ) {

        document.body.classList.add(
            "light"
        );

        btnTema.textContent =
            "☀️";
    }
}


/* =========================================
   ESC
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "Escape"
        ) {

            modalFilme.classList.remove(
                "show"
            );

            modalFavoritos.classList.remove(
                "show"
            );
        }
    }
);


/* =========================================
   ESTATÍSTICAS
========================================= */

estatisticaFilmes.textContent =
    filmes.length;


/* =========================================
   INICIALIZAÇÃO
========================================= */

carregarTema();

atualizarContadorFavoritos();

renderizarFilmes();

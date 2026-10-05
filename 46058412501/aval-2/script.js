/* ==========================================================
   GK FILMES E SÉRIES
   JAVASCRIPT
   ========================================================== */


/* ==========================================================
   DADOS DOS FILMES E SÉRIES
   ========================================================== */

const catalogo = [

    {
        titulo: "Interestelar",
        tipo: "Filme",
        ano: "2014",
        genero: ["Ficção científica", "Drama"],
        nota: "8.7",
        imagem: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        descricao:
            "Uma equipe de astronautas viaja através de um buraco de minhoca em busca de um novo planeta que possa servir de lar para a humanidade."
    },

    {
        titulo: "Batman",
        tipo: "Filme",
        ano: "2022",
        genero: ["Ação", "Suspense"],
        nota: "8.5",
        imagem: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        descricao:
            "Batman investiga uma série de crimes misteriosos que revelam uma conspiração envolvendo figuras importantes de Gotham."
    },

    {
        titulo: "Vingadores",
        tipo: "Filme",
        ano: "2012",
        genero: ["Ação", "Ficção científica"],
        nota: "8.4",
        imagem: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
        descricao:
            "Os maiores heróis da Marvel precisam se unir para impedir uma ameaça que pode destruir a Terra."
    },

    {
        titulo: "Homem-Aranha",
        tipo: "Filme",
        ano: "2021",
        genero: ["Ação", "Aventura"],
        nota: "8.2",
        imagem: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        descricao:
            "Peter Parker enfrenta novos desafios enquanto sua identidade é revelada e diferentes universos começam a se encontrar."
    },

    {
        titulo: "Stranger Things",
        tipo: "Série",
        ano: "2016",
        genero: ["Ficção científica", "Terror"],
        nota: "8.7",
        imagem: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
        descricao:
            "Um grupo de amigos descobre acontecimentos sobrenaturais e experimentos secretos em uma pequena cidade."
    },

    {
        titulo: "The Last of Us",
        tipo: "Série",
        ano: "2023",
        genero: ["Drama", "Ação"],
        nota: "8.8",
        imagem: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
        descricao:
            "Joel e Ellie atravessam uma América devastada tentando sobreviver enquanto desenvolvem uma relação de confiança."
    },

    {
        titulo: "Wandinha",
        tipo: "Série",
        ano: "2022",
        genero: ["Comédia", "Terror"],
        nota: "8.0",
        imagem: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
        descricao:
            "Wandinha Addams começa seus estudos em uma escola especial enquanto investiga acontecimentos misteriosos."
    },

    {
        titulo: "The Boys",
        tipo: "Série",
        ano: "2019",
        genero: ["Ação", "Comédia"],
        nota: "8.6",
        imagem: "https://image.tmdb.org/t/p/w500/stTEycfG9928HYGEISBFaG1ngjM.jpg",
        descricao:
            "Um grupo de vigilantes enfrenta super-heróis corruptos que abusam de seus poderes."
    }

];


/* ==========================================================
   ELEMENTOS DO HTML
   ========================================================== */

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const movieCards = document.querySelectorAll(".movie-card");

const categoryButtons =
    document.querySelectorAll(".category-card");

const detailsButtons =
    document.querySelectorAll(".details-button");

const menuButton =
    document.getElementById("menuButton");

const navList =
    document.querySelector(".nav-list");

const newsletterForm =
    document.getElementById("newsletterForm");


/* ==========================================================
   NORMALIZAR TEXTO
   Remove acentos para facilitar a pesquisa
   ========================================================== */

function normalizarTexto(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


/* ==========================================================
   PESQUISA
   ========================================================== */

if (searchForm && searchInput) {

    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const pesquisa =
            normalizarTexto(searchInput.value.trim());


        /* Se a pesquisa estiver vazia */

        if (pesquisa === "") {

            movieCards.forEach(card => {

                card.style.display = "";

            });

            mostrarMensagemBusca("");

            return;

        }


        let quantidadeEncontrada = 0;


        movieCards.forEach(card => {

            const titulo =
                normalizarTexto(
                    card.querySelector("h3")?.textContent || ""
                );

            const informacoes =
                normalizarTexto(
                    card.querySelector("p")?.textContent || ""
                );


            if (
                titulo.includes(pesquisa) ||
                informacoes.includes(pesquisa)
            ) {

                card.style.display = "";

                quantidadeEncontrada++;

            } else {

                card.style.display = "none";

            }

        });


        if (quantidadeEncontrada === 0) {

            mostrarMensagemBusca(
                `Nenhum resultado encontrado para "${searchInput.value}".`
            );

        } else {

            mostrarMensagemBusca(
                `${quantidadeEncontrada} resultado(s) encontrado(s).`
            );

        }

    });

}


/* ==========================================================
   MENSAGEM DA PESQUISA
   ========================================================== */

function mostrarMensagemBusca(texto) {

    let mensagem =
        document.getElementById("searchMessage");


    if (!mensagem) {

        mensagem =
            document.createElement("p");

        mensagem.id = "searchMessage";

        mensagem.style.textAlign = "center";
        mensagem.style.marginTop = "20px";
        mensagem.style.color = "#e50914";
        mensagem.style.fontWeight = "bold";

        const searchSection =
            document.querySelector(".search-section");

        if (searchSection) {

            searchSection.appendChild(mensagem);

        }

    }


    mensagem.textContent = texto;

}


/* ==========================================================
   CATEGORIAS
   ========================================================== */

categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        const categoriaOriginal =
            this.textContent
                .replace(/[^\p{L}\s]/gu, "")
                .trim();


        const categoria =
            normalizarTexto(categoriaOriginal);


        let encontrados = 0;


        /* Remove destaque dos outros botões */

        categoryButtons.forEach(btn => {

            btn.classList.remove("categoria-ativa");

        });


        /* Ativa o botão selecionado */

        this.classList.add("categoria-ativa");


        movieCards.forEach(card => {

            const titulo =
                normalizarTexto(
                    card.querySelector("h3")?.textContent || ""
                );

            const informacoes =
                normalizarTexto(
                    card.querySelector("p")?.textContent || ""
                );


            /*
                Se clicar em "Ação", por exemplo,
                procuramos a palavra ação dentro
                das informações do card.
            */

            if (
                titulo.includes(categoria) ||
                informacoes.includes(categoria)
            ) {

                card.style.display = "";

                encontrados++;

            } else {

                card.style.display = "none";

            }

        });


        mostrarMensagemBusca(
            encontrados > 0
                ? `${encontrados} título(s) encontrados em "${categoriaOriginal}".`
                : `Nenhum título encontrado em "${categoriaOriginal}".`
        );


        /* Vai até a seção de resultados */

        const primeiraSecao =
            document.querySelector("#filmes");

        if (primeiraSecao) {

            primeiraSecao.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* ==========================================================
   BOTÕES "VER DETALHES"
   ========================================================== */

detailsButtons.forEach((button, index) => {

    button.addEventListener("click", function () {

        const card =
            this.closest(".movie-card");


        if (!card) {
            return;
        }


        const titulo =
            card.querySelector("h3")?.textContent.trim();


        const informacoes =
            card.querySelector("p")?.textContent.trim();


        /*
            Procura o filme/série no catálogo.
        */

        const item =
            catalogo.find(filme =>

                normalizarTexto(filme.titulo) ===
                normalizarTexto(titulo)

            );


        if (item) {

            abrirModal(item);

        } else {

            /*
                Caso o título do HTML não esteja
                no catálogo.
            */

            abrirModal({

                titulo: titulo,
                tipo: "Filme/Série",
                ano: "",
                genero: [],
                nota: "",
                imagem: "",
                descricao:
                    informacoes ||
                    "Não há informações disponíveis."

            });

        }

    });

});


/* ==========================================================
   CRIAR MODAL
   ========================================================== */

function abrirModal(item) {

    /* Remove modal antigo */

    const modalAntigo =
        document.querySelector(".movie-modal");

    if (modalAntigo) {

        modalAntigo.remove();

    }


    /* Cria o modal */

    const modal =
        document.createElement("div");

    modal.className = "movie-modal";


    modal.innerHTML = `

        <div class="modal-overlay"></div>

        <div class="modal-content">

            <button
                class="modal-close"
                aria-label="Fechar">
                ×
            </button>

            <div class="modal-body">

                <div class="modal-poster">

                    ${
                        item.imagem
                            ? `
                                <img
                                    src="${item.imagem}"
                                    alt="Pôster de ${item.titulo}">
                              `
                            : ""
                    }

                </div>

                <div class="modal-info">

                    <span class="modal-type">
                        ${item.tipo}
                    </span>

                    <h2>
                        ${item.titulo}
                    </h2>

                    <p class="modal-meta">
                        ${item.ano}
                        &nbsp; • &nbsp;
                        ⭐ ${item.nota}
                    </p>

                    <p class="modal-genres">
                        ${
                            item.genero.length
                                ? item.genero.join(" • ")
                                : ""
                        }
                    </p>

                    <p class="modal-description">
                        ${item.descricao}
                    </p>

                    <button
                        class="modal-action"
                        id="fecharModal">
                        Fechar
                    </button>

                </div>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    /* Pequeno atraso para ativar animação */

    setTimeout(() => {

        modal.classList.add("modal-aberto");

    }, 10);


    /* Botão X */

    const closeButton =
        modal.querySelector(".modal-close");


    closeButton.addEventListener("click", fecharModal);


    /* Botão Fechar */

    const closeAction =
        modal.querySelector("#fecharModal");


    closeAction.addEventListener("click", fecharModal);


    /* Clique no fundo */

    const overlay =
        modal.querySelector(".modal-overlay");


    overlay.addEventListener("click", fecharModal);


    /* Tecla ESC */

    document.addEventListener(
        "keydown",
        fecharComEsc
    );


    function fecharComEsc(event) {

        if (event.key === "Escape") {

            fecharModal();

        }

    }


    function fecharModal() {

        modal.classList.remove("modal-aberto");

        document.removeEventListener(
            "keydown",
            fecharComEsc
        );


        setTimeout(() => {

            modal.remove();

        }, 300);

    }

}


/* ==========================================================
   MENU MOBILE
   ========================================================== */

if (menuButton && navList) {

    menuButton.addEventListener("click", function () {

        navList.classList.toggle("active");


        const aberto =
            navList.classList.contains("active");


        menuButton.textContent =
            aberto ? "✕" : "☰";

    });


    /* Fecha ao clicar em um link */

    navList.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navList.classList.remove("active");

                menuButton.textContent = "☰";

            });

        });

}


/* ==========================================================
   NEWSLETTER
   ========================================================== */

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const input =
                newsletterForm.querySelector("input");


            const email =
                input.value.trim();


            if (!email) {

                alert(
                    "Por favor, digite seu e-mail."
                );

                return;

            }


            if (!email.includes("@")) {

                alert(
                    "Digite um e-mail válido."
                );

                return;

            }


            alert(
                "🎬 Inscrição realizada com sucesso!"
            );


            input.value = "";

        }
    );

}


/* ==========================================================
   BOTÃO VOLTAR AO TOPO
   ========================================================== */

const backToTop =
    document.createElement("button");


backToTop.className =
    "back-to-top";


backToTop.innerHTML = "↑";


backToTop.setAttribute(
    "aria-label",
    "Voltar ao topo"
);


document.body.appendChild(backToTop);


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ==========================================================
   INICIALIZAÇÃO
   ========================================================== */

console.log(
    "🎬 GK Filmes e Séries carregado com sucesso!"
);
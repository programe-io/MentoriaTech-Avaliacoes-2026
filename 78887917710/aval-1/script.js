
const noticias = [

    {
        categoria: "DESTAQUE",
        data: "21/11/2026",
        titulo: "FIDE encaminha caso de Carlsen para comissão disciplinar",
        descricao: "A federação internacional anunciou que vai analisar os abandonos de partidas do norueguês durante o torneio em Budapeste.",
        icone: "♟",
        link: "https://www.reuters.com/sports/chess-fide-refers-carlsen-disciplinary-body-over-forfeits-budapest-chess-event-2026-11-21/"
    },

    {
        categoria: "COMPETIÇÃO",
        data: "21/11/2026",
        titulo: "Caruana se aproxima de Carlsen no ranking mundial",
        descricao: "Após resultados no torneio Total Chess, Fabiano Caruana chegou aos 2800 pontos e ameaçou a liderança histórica de Carlsen.",
        icone: "🏆",
        link: "https://www.chess.com/news/view/2026-total-chess-world-championship-tour-pilot-day-4"
    },

    {
        categoria: "TORNEIO",
        data: "20/11/2026",
        titulo: "Carlsen enfrenta dificuldades em Budapeste",
        descricao: "Uma sequência complicada no torneio colocou em risco sua posição no ranking mundial e a marca dos 2800 pontos.",
        icone: "♚",
        link: "https://www.theguardian.com/sport/2026/nov/20/chess-magnus-carlsen-winless-world-no1-spot-2800-rating"
    },

    {
        categoria: "DECLARAÇÃO",
        data: "2026",
        titulo: "Carlsen fala sobre momento difícil no xadrez",
        descricao: "O grande mestre comentou sobre uma fase negativa durante o torneio Total Chess em Budapeste.",
        icone: "🎙️",
        link: "https://indianexpress.com/article/sports/chess/magnus-carlsen-opens-up-negative-spiral-total-chess-pilot-10972233/"
    },

    {
        categoria: "CONQUISTA",
        data: "15/02/2026",
        titulo: "Magnus Carlsen conquista o Mundial de Freestyle",
        descricao: "O norueguês venceu Fabiano Caruana na final e se tornou o primeiro campeão mundial oficial da modalidade Freestyle.",
        icone: "🥇",
        link: "https://www.reuters.com/sports/chess-norways-carlsen-wins-first-fide-freestyle-world-championship-2026-02-15/"
    }

];

// ELEMENTO QUE RECEBE AS NOTÍCIAS

const lista = document.getElementById("lista-noticias");
const pesquisa = document.getElementById("pesquisa");
const mensagem = document.getElementById("mensagem");

// FUNÇÃO PARA MOSTRAR AS NOTÍCIAS

function mostrarNoticias(dados) {

    lista.innerHTML = "";

    if (dados.length === 0) {
        mensagem.textContent = "Nenhuma notícia encontrada.";
        return;
    }

    mensagem.textContent = "";

    dados.forEach(noticia => {

        const card = document.createElement("article");

        card.classList.add("card");

        card.innerHTML = `
            <div class="card-image">
                ${noticia.icone}
            </div>

            <div class="card-content">

                <span>
                    ${noticia.categoria} | ${noticia.data}
                </span>

                <h3>${noticia.titulo}</h3>

                <p>${noticia.descricao}</p>

                <a href="${noticia.link}"
                   target="_blank"
                   rel="noopener noreferrer">
                   LER NOTÍCIA →
                </a>

            </div>
        `;

        lista.appendChild(card);

    });

}

// PESQUISA DE NOTÍCIAS

pesquisa.addEventListener("input", function() {

    const termo = pesquisa.value.toLowerCase();

    const filtradas = noticias.filter(noticia => {

        return (
            noticia.titulo.toLowerCase().includes(termo) ||
            noticia.categoria.toLowerCase().includes(termo) ||
            noticia.descricao.toLowerCase().includes(termo)
        );

    });

    mostrarNoticias(filtradas);

});

// CARREGAR NOTÍCIAS INICIALMENTE

mostrarNoticias(noticias);

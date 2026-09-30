const noticias = [

    {
        categoria: "LIBERTADORES",
        titulo: "Flamengo chega à semifinal da Libertadores",
        texto: "O Rubro-Negro empatou em 1 a 1 com o Independiente del Valle no Maracanã e avançou com 3 a 1 no placar agregado.",
        data: "17/09/2026",
        imagem: "https://storage.googleapis.com/crf-strapi-media-prd/Whats_App_Image_2026_09_17_at_23_30_03_817d9ce2d7/Whats_App_Image_2026_09_17_at_23_30_03_817d9ce2d7.jpeg",
        fonte: "https://www.flamengo.com.br/noticias/futebol/com-gol-de-arrascaeta-flamengo-busca-empate-com-del-valle-e-garante-vaga-na-semifinal-da-libertadores"
    },

    {
        categoria: "BRASILEIRÃO",
        titulo: "Flamengo vence Bragantino e segue na liderança",
        texto: "Varela e Pedro marcaram na vitória por 2 a 1 sobre o RB Bragantino no Maracanã.",
        data: "20/09/2026",
        imagem: "https://storage.googleapis.com/crf-strapi-media-prd/Whats_App_Image_2026_09_20_at_18_56_48_53067717ec/Whats_App_Image_2026_09_20_at_18_56_48_53067717ec.jpeg",
        fonte: "https://www.flamengo.com.br/noticias/futebol/com-maraca-lotado-mengao-vence-rb-bragantino-e-segue-na-lideranca-do-brasileirao"
    },

    {
        categoria: "LIBERTADORES",
        titulo: "Arrascaeta pode ficar fora da semifinal",
        texto: "O meia sofreu uma fratura no punho esquerdo e deve ser desfalque nos confrontos contra o Estudiantes.",
        data: "29/09/2026",
        imagem: "https://storage.googleapis.com/crf-strapi-media-prd/Whats_App_Image_2026_09_17_at_23_29_21_db85510157/Whats_App_Image_2026_09_17_at_23_29_21_db85510157.jpeg",
        fonte: "https://ge.globo.com/futebol/times/flamengo/noticia/2026/09/29/sem-arrascaeta-flamengo-trabalha-opcoes-para-volta-da-data-fifa-jorginho-tambem-desfalca-na-libertadores.ghtml"
    },

    {
        categoria: "LIBERTADORES",
        titulo: "Jorginho será desfalque no jogo de ida",
        texto: "O volante foi expulso contra o Independiente del Valle e cumprirá suspensão automática diante do Estudiantes.",
        data: "29/09/2026",
        imagem: "https://storage.googleapis.com/crf-strapi-media-prd/Whats_App_Image_2026_09_17_at_23_30_03_817d9ce2d7/Whats_App_Image_2026_09_17_at_23_30_03_817d9ce2d7.jpeg",
        fonte: "https://ge.globo.com/futebol/times/flamengo/noticia/2026/09/29/sem-arrascaeta-flamengo-trabalha-opcoes-para-volta-da-data-fifa-jorginho-tambem-desfalca-na-libertadores.ghtml"
    },

    {
        categoria: "BRASILEIRÃO",
        titulo: "Flamengo tem números fortes quando abre o placar cedo",
        texto: "Segundo levantamento publicado pelo próprio clube, o Flamengo abriu o placar nos primeiros 15 minutos em 13 partidas de Brasileirão e Libertadores em 2026.",
        data: "23/09/2026",
        imagem: "https://storage.googleapis.com/crf-strapi-media-prd/Whats_App_Image_2026_09_20_at_18_56_48_53067717ec/Whats_App_Image_2026_09_20_at_18_56_48_53067717ec.jpeg",
        fonte: "https://www.flamengo.com.br/noticias/futebol/flamengo-nao-perde-quando-abre-o-placar-antes-dos-15-minutos-em-2026"
    },

    {
        categoria: "AGENDA",
        titulo: "Estudiantes x Flamengo será em 15 de outubro",
        texto: "A partida de ida da semifinal da Libertadores está marcada para La Plata. A volta acontece no Maracanã em 22 de outubro.",
        data: "24/09/2026",
        imagem: "https://storage.googleapis.com/crf-strapi-media-prd/Whats_App_Image_2026_09_17_at_23_29_21_db85510157/Whats_App_Image_2026_09_17_at_23_29_21_db85510157.jpeg",
        fonte: "https://ge.globo.com/futebol/times/flamengo/noticia/2026/09/24/estudiantes-confirma-em-qual-estadio-mandara-a-semifinal-da-libertadores-contra-flamengo-veja-detalhes.ghtml"
    }

];


/* =========================
CARREGAR NOTÍCIAS
========================= */

function carregarNoticias(lista = noticias) {

    const feed = document.getElementById("feedNoticias");

    feed.innerHTML = "";


    if (lista.length === 0) {

        feed.innerHTML = `
            <p>
                Nenhuma notícia encontrada.
            </p>
        `;

        return;
    }


    lista.forEach((noticia, index) => {

        const card = document.createElement("article");

        card.className = "card-noticia";


        card.innerHTML = `

            <img
                src="${noticia.imagem}"
                alt="${noticia.titulo}"
                loading="lazy"
            >

            <div class="card-info">

                <span class="categoria">
                    ${noticia.categoria}
                </span>

                <h3>
                    ${noticia.titulo}
                </h3>

                <p>
                    ${noticia.texto}
                </p>

                <span class="card-data">
                    ${noticia.data}
                </span>

                <button
                    class="leia"
                    onclick="abrirNoticia(${index})"
                >
                    Ler matéria →
                </button>

            </div>

        `;


        feed.appendChild(card);

    });

}


/* =========================
ABRIR NOTÍCIA
========================= */

function abrirNoticia(index) {

    const noticia = noticias[index];

    document.getElementById("modalImagem").src =
        noticia.imagem;

    document.getElementById("modalCategoria").textContent =
        noticia.categoria;

    document.getElementById("modalTitulo").textContent =
        noticia.titulo;

    document.getElementById("modalData").textContent =
        noticia.data;

    document.getElementById("modalTexto").textContent =
        noticia.texto;

    document.getElementById("modalFonte").href =
        noticia.fonte;


    document.getElementById("modal").classList.add("ativo");

    document.body.style.overflow = "hidden";
}


/* =========================
FECHAR NOTÍCIA
========================= */

function fecharNoticia() {

    document.getElementById("modal")
        .classList.remove("ativo");

    document.body.style.overflow = "auto";

}


/* =========================
PESQUISA
========================= */

function filtrarNoticias() {

    const termo =
        document
            .getElementById("pesquisa")
            .value
            .toLowerCase();


    const resultado =
        noticias.filter(noticia => {

            return (
                noticia.titulo
                    .toLowerCase()
                    .includes(termo)

                ||

                noticia.texto
                    .toLowerCase()
                    .includes(termo)

                ||

                noticia.categoria
                    .toLowerCase()
                    .includes(termo)
            );

        });


    carregarNoticias(resultado);
}


/* =========================
COMENTÁRIOS
========================= */

let comentarios =
    JSON.parse(
        localStorage.getItem("flaComentarios")
    ) || [

        {
            nome: "João",
            texto: "Que venha o Estudiantes! Mengão até o fim! 🔴⚫",
            data: "Comentário da torcida"
        },

        {
            nome: "Mariana",
            texto: "Essa semifinal promete. Vamos Flamengo!",
            data: "Comentário da torcida"
        }

    ];


/* =========================
SALVAR COMENTÁRIOS
========================= */

function salvarComentarios() {

    localStorage.setItem(
        "flaComentarios",
        JSON.stringify(comentarios)
    );

}


/* =========================
PUBLICAR
========================= */

function publicarComentario() {

    const nome =
        document
            .getElementById("nome")
            .value
            .trim();

    const texto =
        document
            .getElementById("comentario")
            .value
            .trim();


    if (!nome || !texto) {

        alert(
            "Digite seu nome e comentário."
        );

        return;
    }


    if (texto.length < 3) {

        alert(
            "Seu comentário é muito curto."
        );

        return;
    }


    const novoComentario = {

        nome: nome,

        texto: texto,

        data: new Date()
            .toLocaleString("pt-BR")

    };


    comentarios.unshift(novoComentario);


    salvarComentarios();

    mostrarComentarios();


    document.getElementById("nome").value = "";

    document.getElementById("comentario").value = "";

}


/* =========================
MOSTRAR COMENTÁRIOS
========================= */

function mostrarComentarios() {

    const lista =
        document.getElementById(
            "listaComentarios"
        );


    lista.innerHTML = "";


    if (comentarios.length === 0) {

        lista.innerHTML = `
            <div class="vazio">
                Ainda não há comentários.
            </div>
        `;

        return;
    }


    comentarios.forEach(comentario => {

        const div =
            document.createElement("div");

        div.className = "comentario";


        div.innerHTML = `

            <div class="comentario-topo">

                <span class="usuario">
                    🔴 ${escaparHTML(comentario.nome)}
                </span>

                <span class="hora">
                    ${comentario.data}
                </span>

            </div>

            <p>
                ${escaparHTML(comentario.texto)}
            </p>

        `;


        lista.appendChild(div);

    });

}


/* =========================
SEGURANÇA
========================= */

function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;

}


/* =========================
MENU
========================= */

function abrirMenu() {

    const menu =
        document.getElementById("menuMobile");


    if (
        menu.style.display === "block"
    ) {

        menu.style.display = "none";

    } else {

        menu.style.display = "block";

    }

}


/* =========================
FECHAR MODAL CLICANDO FORA
========================= */

document
    .getElementById("modal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            fecharNoticia();

        }

    });


/* =========================
INICIALIZAÇÃO
========================= */

carregarNoticias();

mostrarComentarios();

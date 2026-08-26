// =========================
// NOTÍCIAS COMPLETAS
// =========================

const noticias = {
    "Os jogos mais aguardados do ano": {
        categoria: "AÇÃO",
        titulo: "Os jogos mais aguardados do ano",
        imagem: "https://images.unsplash.com/photo-1603481546238-487240415921?auto=format&fit=crop&w=1000&q=80",
        texto: `
            <p>
                O mundo dos games está cheio de novidades e vários títulos
                estão deixando os jogadores ansiosos.
            </p>

            <p>
                Grandes lançamentos prometem trazer gráficos impressionantes,
                histórias envolventes e muita ação. Entre os principais
                destaques estão jogos de aventura, RPGs e experiências
                multiplayer.
            </p>

            <p>
                Para quem gosta de acompanhar as novidades, este é um ótimo
                momento para descobrir quais jogos estarão disponíveis
                nos próximos meses.
            </p>
        `
    },

    "5 RPGs que você precisa jogar": {
        categoria: "RPG",
        titulo: "5 RPGs que você precisa jogar",
        imagem: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80",
        texto: `
            <p>
                Os RPGs são conhecidos por seus mundos enormes, personagens
                marcantes e histórias que podem levar dezenas de horas.
            </p>

            <p>
                Se você gosta de explorar mapas, melhorar seus personagens
                e tomar decisões durante a história, existem muitas opções
                excelentes para experimentar.
            </p>

            <p>
                Nossa seleção reúne cinco jogos que merecem a atenção de
                qualquer fã do gênero.
            </p>
        `
    },

    "Os melhores jogos de corrida": {
        categoria: "CORRIDA",
        titulo: "Os melhores jogos de corrida",
        imagem: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=80",
        texto: `
            <p>
                Jogos de corrida são perfeitos para quem gosta de velocidade,
                competição e carros incríveis.
            </p>

            <p>
                Existem opções para todos os estilos: desde simuladores
                realistas até jogos mais arcade e divertidos.
            </p>

            <p>
                Pegue seu volante ou controle e prepare-se para acelerar!
            </p>
        `
    },

    "Como montar um setup gamer": {
        categoria: "AVENTURA",
        titulo: "Como montar um setup gamer",
        imagem: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1000&q=80",
        texto: `
            <p>
                Ter um bom setup pode deixar sua experiência de jogo muito
                mais confortável.
            </p>

            <p>
                Você pode começar escolhendo uma boa mesa, cadeira,
                monitor, teclado, mouse e iluminação.
            </p>

            <p>
                O mais importante é montar um espaço que combine com seu
                estilo e seja confortável para passar várias horas jogando.
            </p>
        `
    }
};


// =========================
// ABRIR NOTÍCIA
// =========================

function lerPost(titulo) {

    const noticia = noticias[titulo];

    if (!noticia) {
        return;
    }

    document.getElementById("modalCategoria").textContent =
        noticia.categoria;

    document.getElementById("modalTitulo").textContent =
        noticia.titulo;

    document.getElementById("modalImagem").src =
        noticia.imagem;

    document.getElementById("modalTexto").innerHTML =
        noticia.texto;

    document.getElementById("modalNoticia").classList.add("ativo");

    document.body.classList.add("modal-aberto");
}


// =========================
// FECHAR NOTÍCIA
// =========================

function fecharNoticia() {

    document.getElementById("modalNoticia").classList.remove("ativo");

    document.body.classList.remove("modal-aberto");
}


// =========================
// FILTRAR JOGOS
// =========================

function filtrarJogos(categoria) {

    const posts = document.querySelectorAll(".post");

    posts.forEach(function(post) {

        const categoriaPost = post.dataset.categoria;

        if (
            categoria === "todos" ||
            categoriaPost === categoria
        ) {

            post.style.display = "grid";

        } else {

            post.style.display = "none";

        }

    });
}


// =========================
// VOLTAR PARA O INÍCIO
// =========================

function mostrarInicio() {

    filtrarJogos("todos");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =========================
// FECHAR COM ESC
// =========================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        fecharNoticia();
    }

});


const noticias = [
    {
        titulo: "Enaldinho e suas aventuras",
        categoria: "Vídeos",
        descricao: "Confira os desafios e aventuras que fazem parte do conteúdo do Enaldinho!",
        imagem: "https://placehold.co/600x350/ffcc00/222?text=Aventuras+do+Enaldinho"
    },

    {
        titulo: "Conheça mais sobre Enaldinho",
        categoria: "Curiosidades",
        descricao: "Descubra curiosidades sobre a trajetória do criador de conteúdo!",
        imagem: "https://placehold.co/600x350/ff8800/fff?text=Curiosidades"
    },

    {
        titulo: "Novos desafios e brincadeiras",
        categoria: "Vídeos",
        descricao: "Os desafios são uma das marcas do entretenimento do canal!",
        imagem: "https://placehold.co/600x350/ffdd55/222?text=Desafios"
    },

    {
        titulo: "O universo dos fãs",
        categoria: "Novidades",
        descricao: "Veja como os fãs acompanham e compartilham os conteúdos do Enaldinho!",
        imagem: "https://placehold.co/600x350/ff9900/fff?text=Fas+do+Enaldinho"
    },

    {
        titulo: "Momentos engraçados",
        categoria: "Curiosidades",
        descricao: "Relembre o estilo divertido dos vídeos e suas brincadeiras!",
        imagem: "https://placehold.co/600x350/ffcc00/222?text=Momentos"
    }
];

const feed = document.getElementById("feed");
const pesquisa = document.getElementById("pesquisa");

let categoriaAtual = "Todas";

function mostrarNoticias() {

    const termo = pesquisa.value.toLowerCase();

    const filtradas = noticias.filter(noticia => {

        const combinaCategoria =
            categoriaAtual === "Todas" ||
            noticia.categoria === categoriaAtual;

        const combinaPesquisa =
            noticia.titulo.toLowerCase().includes(termo) ||
            noticia.descricao.toLowerCase().includes(termo);

        return combinaCategoria && combinaPesquisa;
    });

    feed.innerHTML = "";

    if (filtradas.length === 0) {
        feed.innerHTML = "<p>Nenhuma notícia encontrada.</p>";
        return;
    }

    filtradas.forEach(noticia => {

        const card = document.createElement("article");

        card.className = "noticia";

        card.innerHTML = `
            <img src="${noticia.imagem}" alt="${noticia.titulo}">

            <div class="conteudo">
                <span class="categoria">
                    ${noticia.categoria}
                </span>

                <h3>${noticia.titulo}</h3>

                <p>${noticia.descricao}</p>

                <button class="curtir"
                    onclick="curtir(this)">
                    ❤️ Curtir <span>0</span>
                </button>
            </div>
        `;

        feed.appendChild(card);
    });
}

function filtrar(categoria) {
    categoriaAtual = categoria;
    mostrarNoticias();
}

function curtir(botao) {
    const contador = botao.querySelector("span");
    contador.textContent = Number(contador.textContent) + 1;
}

pesquisa.addEventListener("input", mostrarNoticias);

mostrarNoticias();


const listaNoticias = [
    {
        titulo: "Inteligência artificial transforma o mundo",
        categoria: "Tecnologia",
        descricao: "Novas tecnologias estão mudando a maneira como as pessoas trabalham e se comunicam.",
        imagem: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
        data: "18/11/2026"
    },
    {
        titulo: "Brasil se prepara para novos desafios",
        categoria: "Esportes",
        descricao: "Seleções e atletas intensificam a preparação para as próximas competições.",
        imagem: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600",
        data: "18/11/2026"
    },
    {
        titulo: "Debates políticos movimentam o país",
        categoria: "Política",
        descricao: "Representantes discutem propostas e projetos para o futuro do Brasil.",
        imagem: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600",
        data: "17/11/2026"
    },
    {
        titulo: "Cinema anuncia grandes lançamentos",
        categoria: "Entretenimento",
        descricao: "Novas produções prometem movimentar as salas de cinema.",
        imagem: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600",
        data: "17/11/2026"
    },
    {
        titulo: "Tecnologia avança na área da educação",
        categoria: "Tecnologia",
        descricao: "Ferramentas digitais estão criando novas possibilidades de aprendizagem.",
        imagem: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
        data: "16/11/2026"
    },
    {
        titulo: "Campeonatos movimentam o futebol",
        categoria: "Esportes",
        descricao: "Clubes disputam partidas importantes em busca de títulos.",
        imagem: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600",
        data: "16/11/2026"
    },
    {
        titulo: "Novidades no cenário econômico",
        categoria: "Política",
        descricao: "Decisões e propostas econômicas estão no centro das discussões.",
        imagem: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600",
        data: "15/11/2026"
    },
    {
        titulo: "Música ganha destaque nas plataformas",
        categoria: "Entretenimento",
        descricao: "Artistas lançam novos trabalhos e conquistam milhares de ouvintes.",
        imagem: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600",
        data: "15/11/2026"
    }
];

// Configurações
let categoriaAtual = "Todas";
let quantidade = 6;

// Mostrar notícias
function mostrarNoticias() {

    const feed = document.getElementById("noticias");

    const busca = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    feed.innerHTML = "";

    const filtradas = listaNoticias.filter(noticia => {

        const categoriaOK =
            categoriaAtual === "Todas" ||
            noticia.categoria === categoriaAtual;

        const buscaOK =
            noticia.titulo.toLowerCase().includes(busca) ||
            noticia.descricao.toLowerCase().includes(busca);

        return categoriaOK && buscaOK;
    });

    filtradas.slice(0, quantidade).forEach(noticia => {

        const card = document.createElement("article");

        card.className = "card";

        const imagem = document.createElement("img");
        imagem.src = noticia.imagem;
        imagem.alt = noticia.titulo;

        const conteudo = document.createElement("div");
        conteudo.className = "conteudo";

        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = noticia.categoria;

        const titulo = document.createElement("h2");
        titulo.textContent = noticia.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = noticia.descricao;

        const data = document.createElement("div");
        data.className = "data";
        data.textContent = noticia.data;

        const botao = document.createElement("button");
        botao.className = "ler";
        botao.textContent = "Ler notícia";

        botao.addEventListener("click", () => {
            lerNoticia(noticia);
        });

        conteudo.append(
            tag,
            titulo,
            descricao,
            data,
            botao
        );

        card.append(imagem, conteudo);

        feed.appendChild(card);
    });

    document.getElementById("mais").style.display =
        filtradas.length > quantidade ? "block" : "none";

    if (filtradas.length === 0) {
        feed.innerHTML = "<p>Nenhuma notícia encontrada.</p>";
    }
}

// Filtrar categorias
function filtrar(categoria, botao) {

    categoriaAtual = categoria;
    quantidade = 6;

    document.querySelectorAll(".categorias button")
        .forEach(btn => btn.classList.remove("ativo"));

    botao.classList.add("ativo");

    mostrarNoticias();
}

// Carregar mais notícias
function carregarMais() {
    quantidade += 3;
    mostrarNoticias();
}

// Abrir notícia
function lerNoticia(noticia) {

    alert(
        noticia.titulo + "\n\n" +
        noticia.descricao
    );
}

// Pesquisa em tempo real
document.getElementById("pesquisa")
    .addEventListener("input", () => {
        quantidade = 6;
        mostrarNoticias();
    });

// Inicializar feed
mostrarNoticias();

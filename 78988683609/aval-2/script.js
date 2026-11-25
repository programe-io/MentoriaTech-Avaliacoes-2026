
const noticias = [
    {
        titulo: "Inteligência artificial transforma a tecnologia",
        categoria: "Tecnologia",
        descricao: "Novas ferramentas de inteligência artificial estão mudando a maneira como as pessoas estudam e trabalham.",
        imagem: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
        data: "25/11/2026"
    },
    {
        titulo: "Brasil se destaca no esporte",
        categoria: "Esportes",
        descricao: "Atletas brasileiros conquistam resultados importantes em competições esportivas.",
        imagem: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600",
        data: "25/11/2026"
    },
    {
        titulo: "Educação digital cresce nas escolas",
        categoria: "Educação",
        descricao: "O uso da tecnologia nas salas de aula amplia as possibilidades de aprendizagem.",
        imagem: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600",
        data: "24/11/2026"
    },
    {
        titulo: "Cinema recebe novas produções",
        categoria: "Entretenimento",
        descricao: "Novos filmes e produções audiovisuais prometem movimentar o mundo do entretenimento.",
        imagem: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600",
        data: "24/11/2026"
    },
    {
        titulo: "Inovações chegam ao mundo dos computadores",
        categoria: "Tecnologia",
        descricao: "Novas soluções tecnológicas prometem facilitar o dia a dia dos usuários.",
        imagem: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
        data: "23/11/2026"
    },
    {
        titulo: "A importância da leitura na educação",
        categoria: "Educação",
        descricao: "A leitura ajuda a desenvolver a criatividade, o conhecimento e o pensamento crítico.",
        imagem: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600",
        data: "23/11/2026"
    }
];

let quantidade = 4;
let categoriaAtual = "Todas";
let buscaAtual = "";

function mostrarNoticias() {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    const filtradas = noticias.filter(noticia => {
        const categoriaCorreta =
            categoriaAtual === "Todas" ||
            noticia.categoria === categoriaAtual;

        const texto = (
            noticia.titulo + " " + noticia.descricao
        ).toLowerCase();

        const buscaCorreta = texto.includes(
            buscaAtual.toLowerCase()
        );

        return categoriaCorreta && buscaCorreta;
    });

    const exibidas = filtradas.slice(0, quantidade);

    if (exibidas.length === 0) {
        feed.innerHTML = "<p>Nenhuma notícia encontrada.</p>";
        return;
    }

    exibidas.forEach(noticia => {
        feed.innerHTML += `
            <article class="card">
                <img src="${noticia.imagem}" alt="${noticia.titulo}">

                <div class="conteudo">
                    <span class="categoria">
                        ${noticia.categoria}
                    </span>

                    <h3>${noticia.titulo}</h3>

                    <p>${noticia.descricao}</p>

                    <p class="data">${noticia.data}</p>

                    <button class="curtir"
                        onclick="curtir(this)">
                        ❤️ Curtir
                    </button>
                </div>
            </article>
        `;
    });
}

function filtrar(categoria) {
    categoriaAtual = categoria;
    quantidade = 4;
    mostrarNoticias();
}

function pesquisarNoticias() {
    buscaAtual = document.getElementById("pesquisa").value;
    quantidade = noticias.length;
    mostrarNoticias();
}

function carregarMais() {
    quantidade += 2;
    mostrarNoticias();
}

function curtir(botao) {
    if (botao.textContent.includes("Curtir")) {
        botao.textContent = "❤️ Curtido!";
    } else {
        botao.textContent = "❤️ Curtir";
    }
}

mostrarNoticias();

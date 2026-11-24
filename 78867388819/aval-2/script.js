
const noticias = [
    {
        titulo: "Inteligência Artificial transforma o mundo",
        categoria: "Tecnologia",
        descricao: "Novas tecnologias de inteligência artificial estão mudando a maneira como vivemos e trabalhamos.",
        imagem: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600"
    },
    {
        titulo: "Brasil conquista grande vitória no futebol",
        categoria: "Esportes",
        descricao: "A seleção brasileira conquista uma importante vitória e anima os torcedores.",
        imagem: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600"
    },
    {
        titulo: "Novidades movimentam o cenário mundial",
        categoria: "Mundo",
        descricao: "Acontecimentos internacionais ganham destaque e repercutem em diversos países.",
        imagem: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=600"
    },
    {
        titulo: "Novos celulares chegam ao mercado",
        categoria: "Tecnologia",
        descricao: "Empresas apresentam novos dispositivos com recursos inovadores.",
        imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
    }
];

const feed = document.getElementById("feed");

function mostrarNoticias(lista) {
    feed.innerHTML = "";

    if (lista.length === 0) {
        feed.innerHTML = "<p>Nenhuma notícia encontrada.</p>";
        return;
    }

    lista.forEach((noticia, index) => {
        const card = document.createElement("article");
        card.className = "noticia";

        card.innerHTML = `
            <img src="${noticia.imagem}" alt="${noticia.titulo}">
            <div class="conteudo">
                <span>${noticia.categoria}</span>
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descricao}</p>
                <button class="curtir"
                    onclick="curtir(${index}, this)">
                    ❤️ Curtir (0)
                </button>
            </div>
        `;

        feed.appendChild(card);
    });
}

function filtrar(categoria) {
    if (categoria === "Todas") {
        mostrarNoticias(noticias);
    } else {
        const resultado = noticias.filter(
            noticia => noticia.categoria === categoria
        );
        mostrarNoticias(resultado);
    }
}

function pesquisar() {
    const termo = document.getElementById("busca")
        .value.toLowerCase();

    const resultado = noticias.filter(noticia =>
        noticia.titulo.toLowerCase().includes(termo) ||
        noticia.descricao.toLowerCase().includes(termo) ||
        noticia.categoria.toLowerCase().includes(termo)
    );

    mostrarNoticias(resultado);
}

function curtir(index, botao) {
    let curtidas = Number(
        botao.dataset.curtidas || 0
    );

    curtidas++;

    botao.dataset.curtidas = curtidas;
    botao.innerText = `❤️ Curtir (${curtidas})`;
}

mostrarNoticias(noticias);
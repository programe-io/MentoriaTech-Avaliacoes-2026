
const filtros = document.querySelectorAll(".filtro");
const noticias = document.querySelectorAll(".noticia");

// FILTRO DAS NOTÍCIAS
filtros.forEach((botao) => {
    botao.addEventListener("click", () => {
        filtros.forEach((item) => item.classList.remove("ativo"));
        botao.classList.add("ativo");

        const categoria = botao.dataset.filtro;

        noticias.forEach((noticia) => {
            if (
                categoria === "todos" ||
                noticia.dataset.categoria === categoria
            ) {
                noticia.style.display = "block";
            } else {
                noticia.style.display = "none";
            }
        });
    });
});

// CONTEÚDO DAS MATÉRIAS
const artigos = [
    {
        categoria: "MAFEX",
        titulo: "MAFEX Spider-Man: detalhes e articulação impressionam colecionadores",
        texto: "A linha MAFEX, produzida pela Medicom Toy, é conhecida pelo cuidado com os detalhes, variedade de acessórios e articulações. As figuras do Homem-Aranha são bastante procuradas por colecionadores que gostam de criar poses e cenas inspiradas nos quadrinhos e filmes."
    },
    {
        categoria: "REVOLTECH",
        titulo: "Amazing Yamaguchi: poses incríveis para o Homem-Aranha",
        texto: "A linha Amazing Yamaguchi, da Kaiyodo, ficou conhecida por suas articulações diferenciadas. Isso permite criar poses muito dinâmicas, reproduzindo movimentos de ação e cenas clássicas do Homem-Aranha."
    },
    {
        categoria: "S.H.FIGUARTS",
        titulo: "S.H.Figuarts: figuras com acabamento detalhado",
        texto: "A S.H.Figuarts é uma linha da Bandai que apresenta personagens de diferentes universos. Suas figuras costumam trazer acessórios, mãos intercambiáveis e articulações para reproduzir diferentes poses."
    },
    {
        categoria: "MARVEL LEGENDS",
        titulo: "Marvel Legends: novidades para os fãs da Marvel",
        texto: "A Marvel Legends, da Hasbro, é uma das linhas mais conhecidas entre os colecionadores. Ela apresenta personagens dos filmes, séries e quadrinhos da Marvel, com diferentes versões e acessórios."
    },
    {
        categoria: "MAFEX",
        titulo: "MAFEX No Way Home: uma peça para os fãs dos filmes",
        texto: "As figuras inspiradas em Homem-Aranha: Sem Volta Para Casa são interessantes para quem gosta de colecionar versões cinematográficas do personagem. A linha MAFEX costuma apostar em detalhes de roupa, acessórios e possibilidades de pose."
    },
    {
        categoria: "MARVEL LEGENDS",
        titulo: "Marvel Legends: figuras para todos os tipos de colecionadores",
        texto: "A coleção Marvel Legends conta com personagens clássicos e versões modernas. É uma opção conhecida por oferecer uma grande variedade de personagens e por ser uma porta de entrada para quem está começando a colecionar."
    }
];

// MODAL DE NOTÍCIAS
const modal = document.getElementById("modal");
const modalCategoria = document.getElementById("modal-categoria");
const modalTitulo = document.getElementById("modal-titulo");
const modalTexto = document.getElementById("modal-texto");
const fecharModal = document.getElementById("fechar-modal");

document.querySelectorAll(".ler-mais").forEach((botao) => {
    botao.addEventListener("click", () => {
        const indice = Number(botao.dataset.artigo);
        const artigo = artigos[indice];

        modalCategoria.textContent = artigo.categoria;
        modalTitulo.textContent = artigo.titulo;
        modalTexto.textContent = artigo.texto;

        modal.classList.add("aberto");
    });
});

fecharModal.addEventListener("click", () => {
    modal.classList.remove("aberto");
});

modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        modal.classList.remove("aberto");
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        modal.classList.remove("aberto");
    }
});

// NEWSLETTER
const formulario = document.getElementById("form-newsletter");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const email = document.getElementById("email").value;

    alert("Obrigado por se cadastrar, " + email + "!");

    formulario.reset();
});

// ANO AUTOMÁTICO NO CONSOLE
console.log("Action News carregado com sucesso!");

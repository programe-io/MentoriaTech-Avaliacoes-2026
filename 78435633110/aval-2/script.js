
const artigos = [
    {
        titulo: "O que é programação?",
        categoria: "Programação",
        descricao: "Entenda como funciona a programação e como ela está presente no nosso cotidiano.",
        imagem: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600",
        conteudo: "Programação é o processo de criar instruções para que computadores executem tarefas. Com linguagens como JavaScript, Python e Java, podemos desenvolver sites, aplicativos, jogos e sistemas."
    },
    {
        titulo: "A inteligência artificial",
        categoria: "Tecnologia",
        descricao: "Descubra como a inteligência artificial está transformando o mundo.",
        imagem: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
        conteudo: "A inteligência artificial permite que máquinas realizem atividades que normalmente exigiriam inteligência humana, como reconhecer imagens, compreender textos e auxiliar na resolução de problemas."
    },
    {
        titulo: "O futuro da inovação",
        categoria: "Inovação",
        descricao: "Conheça algumas tecnologias que podem mudar o nosso futuro.",
        imagem: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
        conteudo: "A inovação tecnológica desenvolve novas soluções para melhorar a sociedade. Robótica, energia sustentável e realidade virtual são exemplos de áreas que podem transformar nossas vidas."
    },
    {
        titulo: "Aprendendo JavaScript",
        categoria: "Programação",
        descricao: "Veja por que JavaScript é uma das linguagens mais utilizadas na web.",
        imagem: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600",
        conteudo: "JavaScript é uma linguagem de programação utilizada principalmente para adicionar interatividade aos sites. Ela permite criar menus, formulários, jogos e diversas aplicações."
    },
    {
        titulo: "A evolução dos computadores",
        categoria: "Tecnologia",
        descricao: "Conheça a história e a evolução dos computadores ao longo dos anos.",
        imagem: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
        conteudo: "Os computadores evoluíram de máquinas enormes e complexas para dispositivos pequenos e poderosos. Hoje fazem parte da educação, comunicação, trabalho e entretenimento."
    },
    {
        titulo: "Realidade virtual",
        categoria: "Inovação",
        descricao: "Entenda como a realidade virtual está criando novas experiências.",
        imagem: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600",
        conteudo: "A realidade virtual utiliza tecnologias digitais para criar ambientes simulados. Ela pode ser utilizada em jogos, treinamentos, educação e experiências interativas."
    }
];

const listaArtigos = document.getElementById("listaArtigos");
const pesquisa = document.getElementById("pesquisa");
const botoesCategoria = document.querySelectorAll(".categoria");
const semResultados = document.getElementById("semResultados");

let categoriaAtual = "Todos";

function mostrarArtigos() {
    const texto = pesquisa.value.toLowerCase();

    const filtrados = artigos.filter(artigo => {
        const correspondeTexto =
            artigo.titulo.toLowerCase().includes(texto) ||
            artigo.descricao.toLowerCase().includes(texto);

        const correspondeCategoria =
            categoriaAtual === "Todos" ||
            artigo.categoria === categoriaAtual;

        return correspondeTexto && correspondeCategoria;
    });

    listaArtigos.innerHTML = "";

    filtrados.forEach((artigo, indice) => {
        const card = document.createElement("article");
        card.className = "card";

        const imagem = document.createElement("img");
        imagem.src = artigo.imagem;
        imagem.alt = artigo.titulo;

        const conteudo = document.createElement("div");
        conteudo.className = "card-conteudo";

        const categoria = document.createElement("span");
        categoria.textContent = artigo.categoria;

        const titulo = document.createElement("h3");
        titulo.textContent = artigo.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = artigo.descricao;

        const botao = document.createElement("button");
        botao.textContent = "Ler artigo";

        botao.addEventListener("click", () => {
            alert(
                artigo.titulo + "\n\n" + artigo.conteudo
            );
        });

        conteudo.append(
            categoria,
            titulo,
            descricao,
            botao
        );

        card.append(imagem, conteudo);
        listaArtigos.appendChild(card);
    });

    semResultados.hidden = filtrados.length !== 0;
}

pesquisa.addEventListener("input", mostrarArtigos);

botoesCategoria.forEach(botao => {
    botao.addEventListener("click", () => {
        botoesCategoria.forEach(item => {
            item.classList.remove("ativa");
        });

        botao.classList.add("ativa");

        categoriaAtual = botao.dataset.categoria;

        mostrarArtigos();
    });
});

// Alternar entre modo claro e escuro
const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        botaoTema.textContent = "☀️";
    } else {
        botaoTema.textContent = "🌙";
    }
});

// Exibir os artigos quando o site abrir
mostrarArtigos();

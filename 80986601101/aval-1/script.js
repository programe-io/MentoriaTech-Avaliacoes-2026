
const capitulos = [
    {
        titulo: "1. Introdução",
        resumo: "Conheça o projeto Meu Blog e os conceitos fundamentais do desenvolvimento web.",
        conteudo: `
            <p>Após estudar diversos conceitos fundamentais do desenvolvimento web,
            chegou o momento de aplicar esses conhecimentos na construção de um projeto.</p>
            <p>Durante as aulas, estudamos HTML, CSS, organização de layouts,
            responsividade e Flexbox.</p>
            <p>O projeto Meu Blog tem como objetivo reunir esses conhecimentos
            na criação de um site semelhante aos encontrados na internet.</p>
        `
    },
    {
        titulo: "2. A importância de projetos práticos no aprendizado",
        resumo: "Entenda por que desenvolver projetos é importante para aprender programação.",
        conteudo: `
            <p>Aprender desenvolvimento web não significa apenas estudar teoria.
            É importante colocar os conhecimentos em prática.</p>
            <p>Os projetos práticos ajudam a consolidar conhecimentos,
            organizar códigos e compreender como as tecnologias funcionam juntas.</p>
            <p>Essa experiência prepara o estudante para desenvolver projetos reais.</p>
        `
    },
    {
        titulo: "3. Apresentação do projeto Meu Blog",
        resumo: "Conheça a proposta e os principais elementos de um blog.",
        conteudo: `
            <p>O Meu Blog é um site desenvolvido para apresentar conteúdos
            organizados em artigos e publicações.</p>
            <p>Um blog normalmente possui título, menu de navegação,
            lista de artigos, conteúdo principal, barra lateral e rodapé.</p>
            <p>Esses elementos facilitam a organização e a navegação dos visitantes.</p>
        `
    },
    {
        titulo: "4. Planejamento da estrutura do site",
        resumo: "Aprenda a organizar as principais áreas de uma página web.",
        conteudo: `
            <p>Antes de programar, é importante planejar como o site será organizado.</p>
            <p><strong>Cabeçalho:</strong> apresenta o nome do blog e o menu.</p>
            <p><strong>Conteúdo:</strong> apresenta os artigos e publicações.</p>
            <p><strong>Barra lateral:</strong> apresenta categorias e informações adicionais.</p>
            <p><strong>Rodapé:</strong> apresenta informações finais sobre o site.</p>
        `
    },
    {
        titulo: "5. Organização inicial do projeto",
        resumo: "Veja como organizar os arquivos HTML, CSS e JavaScript.",
        conteudo: `
            <p>Um projeto web precisa ter seus arquivos organizados.</p>
            <p>O arquivo index.html contém a estrutura da página.</p>
            <p>O arquivo style.css controla as cores, fontes e aparência.</p>
            <p>O arquivo script.js adiciona funcionalidades e interatividade.</p>
            <p>Essa separação facilita a manutenção e a organização do projeto.</p>
        `
    },
    {
        titulo: "6. Estrutura HTML da página do blog",
        resumo: "Conheça os elementos utilizados para estruturar uma página.",
        conteudo: `
            <p>O HTML é responsável pela estrutura do site.</p>
            <p>Podemos utilizar títulos, parágrafos, imagens, links e seções.</p>
            <p>Elementos como header, nav, main, section, aside e footer
            ajudam a organizar semanticamente o conteúdo.</p>
        `
    },
    {
        titulo: "7. Inserindo conteúdo inicial",
        resumo: "Aprenda a adicionar textos e informações ao blog.",
        conteudo: `
            <p>Depois de criar a estrutura, precisamos inserir conteúdos.</p>
            <p>Podemos adicionar títulos, descrições, textos explicativos,
            imagens e links.</p>
            <p>O conteúdo permite visualizar o funcionamento do layout
            e identificar possíveis melhorias.</p>
        `
    },
    {
        titulo: "8. Preparando a estilização do projeto",
        resumo: "Descubra como o CSS transforma a aparência de um site.",
        conteudo: `
            <p>O CSS é utilizado para melhorar a aparência da página.</p>
            <p>Com ele podemos definir cores, fontes, tamanhos,
            margens, espaçamentos e posicionamento dos elementos.</p>
            <p>Uma boa estilização torna o site mais agradável e organizado.</p>
        `
    },
    {
        titulo: "9. Evolução do projeto ao longo das aulas",
        resumo: "Conheça as melhorias que podem ser adicionadas ao blog.",
        conteudo: `
            <p>O projeto será desenvolvido gradualmente.</p>
            <p>Novas etapas podem adicionar melhorias visuais,
            responsividade, organização dos layouts e funcionalidades.</p>
            <p>A evolução gradual permite aprender novos conceitos
            enquanto o site fica cada vez mais completo.</p>
        `
    },
    {
        titulo: "10. Conclusão",
        resumo: "Confira o que foi aprendido durante a primeira parte do projeto.",
        conteudo: `
            <p>O projeto Meu Blog representa uma etapa importante
            no aprendizado de desenvolvimento web.</p>
            <p>Nesta primeira parte foram apresentados o planejamento,
            a organização dos arquivos, a estrutura HTML e a preparação do CSS.</p>
            <p>A prática contínua ajuda a desenvolver habilidades
            e preparar o estudante para projetos mais complexos.</p>
        `
    }
];

const listaArtigos = document.getElementById("listaArtigos");
const campoPesquisa = document.getElementById("campoPesquisa");
const botaoPesquisa = document.getElementById("botaoPesquisa");
const mensagemVazia = document.getElementById("mensagemVazia");

// Exibir os capítulos na tela
function mostrarArtigos(lista) {
    listaArtigos.innerHTML = "";

    mensagemVazia.hidden = lista.length !== 0;

    lista.forEach((capitulo, indice) => {
        const artigo = document.createElement("article");
        artigo.className = "artigo";

        const titulo = document.createElement("h3");
        titulo.textContent = capitulo.titulo;

        const resumo = document.createElement("p");
        resumo.textContent = capitulo.resumo;

        const botao = document.createElement("button");
        botao.textContent = "Ler mais";

        const conteudo = document.createElement("div");
        conteudo.className = "conteudo-completo";
        conteudo.hidden = true;
        conteudo.innerHTML = capitulo.conteudo;

        botao.addEventListener("click", () => {
            conteudo.hidden = !conteudo.hidden;

            botao.textContent = conteudo.hidden
                ? "Ler mais"
                : "Mostrar menos";
        });

        artigo.appendChild(titulo);
        artigo.appendChild(resumo);
        artigo.appendChild(botao);
        artigo.appendChild(conteudo);

        listaArtigos.appendChild(artigo);
    });
}

// Pesquisar capítulos
function pesquisarArtigos() {
    const pesquisa = campoPesquisa.value
        .trim()
        .toLowerCase();

    const resultados = capitulos.filter(capitulo => {
        return (
            capitulo.titulo.toLowerCase().includes(pesquisa) ||
            capitulo.resumo.toLowerCase().includes(pesquisa) ||
            capitulo.conteudo.toLowerCase().includes(pesquisa)
        );
    });

    mostrarArtigos(resultados);
}

// Eventos da pesquisa
botaoPesquisa.addEventListener("click", pesquisarArtigos);

campoPesquisa.addEventListener("input", pesquisarArtigos);

campoPesquisa.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        pesquisarArtigos();
    }
});

// Mostrar todos os capítulos ao abrir o site
mostrarArtigos(capitulos);

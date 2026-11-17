
const capitulos = [
    // PARTE 1 - MEU BLOG

    {
        titulo: "1. Introdução",
        resumo: "Conheça o projeto Meu Blog e os conceitos fundamentais do desenvolvimento web.",
        conteudo: `
            <p>O projeto Meu Blog tem como objetivo aplicar os conhecimentos
            adquiridos sobre desenvolvimento web.</p>
            <p>Durante as aulas, estudamos HTML, CSS, layouts,
            responsividade e Flexbox.</p>
        `
    },
    {
        titulo: "2. A importância de projetos práticos no aprendizado",
        resumo: "Entenda por que desenvolver projetos é importante.",
        conteudo: `
            <p>Os projetos práticos ajudam a consolidar conhecimentos,
            organizar códigos e desenvolver habilidades de programação.</p>
            <p>Também permitem compreender como diferentes tecnologias
            trabalham juntas.</p>
        `
    },
    {
        titulo: "3. Apresentação do projeto Meu Blog",
        resumo: "Conheça a proposta e os principais elementos de um blog.",
        conteudo: `
            <p>O Meu Blog é um site criado para apresentar conteúdos
            organizados em artigos.</p>
            <p>Ele possui cabeçalho, menu, conteúdo, barra lateral e rodapé.</p>
        `
    },
    {
        titulo: "4. Planejamento da estrutura do site",
        resumo: "Aprenda a organizar as principais áreas de uma página web.",
        conteudo: `
            <p>O planejamento ajuda a organizar os elementos do site.</p>
            <p>O cabeçalho apresenta o título e o menu. A área principal
            apresenta os artigos. A barra lateral contém informações
            adicionais e o rodapé apresenta informações finais.</p>
        `
    },
    {
        titulo: "5. Organização inicial do projeto",
        resumo: "Veja como organizar os arquivos HTML, CSS e JavaScript.",
        conteudo: `
            <p>O HTML estrutura a página, o CSS controla a aparência
            e o JavaScript adiciona funcionalidades.</p>
            <p>Separar esses arquivos facilita a organização do projeto.</p>
        `
    },
    {
        titulo: "6. Estrutura HTML da página do blog",
        resumo: "Conheça os elementos utilizados para estruturar uma página.",
        conteudo: `
            <p>O HTML permite criar títulos, parágrafos, imagens,
            links e seções.</p>
            <p>Ele representa a estrutura principal de uma página web.</p>
        `
    },
    {
        titulo: "7. Inserindo conteúdo inicial",
        resumo: "Aprenda a adicionar textos e informações ao blog.",
        conteudo: `
            <p>Depois de criar a estrutura, adicionamos textos,
            títulos e informações.</p>
            <p>Isso permite visualizar o funcionamento do layout.</p>
        `
    },
    {
        titulo: "8. Preparando a estilização do projeto",
        resumo: "Descubra como o CSS transforma a aparência de um site.",
        conteudo: `
            <p>O CSS permite definir cores, fontes, tamanhos,
            margens e espaçamentos.</p>
            <p>Ele transforma uma página simples em uma interface
            mais organizada e agradável.</p>
        `
    },
    {
        titulo: "9. Evolução do projeto ao longo das aulas",
        resumo: "Conheça as melhorias que podem ser adicionadas ao blog.",
        conteudo: `
            <p>O projeto evolui gradualmente com novas funcionalidades,
            melhorias visuais e responsividade.</p>
        `
    },
    {
        titulo: "10. Conclusão",
        resumo: "Confira o que foi aprendido durante a primeira parte.",
        conteudo: `
            <p>O projeto Meu Blog permite colocar em prática
            os conhecimentos de desenvolvimento web.</p>
            <p>A prática contínua ajuda a preparar o estudante
            para projetos mais complexos.</p>
        `
    },

    // PARTE 2 - INTRODUÇÃO À WEB E À INTERNET

    {
        titulo: "11. Introdução à Web e à Internet",
        resumo: "Conheça os conceitos fundamentais da internet e da Web.",
        conteudo: `
            <p>A internet e a Web fazem parte do nosso cotidiano.
            Utilizamos essas tecnologias para acessar sites,
            assistir vídeos e trocar informações.</p>
            <p>Por trás dessas atividades existe uma infraestrutura
            tecnológica que conecta bilhões de dispositivos.</p>
            <p>Neste capítulo vamos conhecer como a internet surgiu,
            como funciona e como a Web utiliza essa infraestrutura.</p>
        `
    },
    {
        titulo: "12. O que é a Internet",
        resumo: "Entenda o que é a rede mundial de computadores.",
        conteudo: `
            <p>A internet é um sistema global de redes de computadores
            interligadas.</p>
            <p>Ela permite que computadores, celulares e servidores
            troquem informações utilizando protocolos de comunicação.</p>
            <p>Entre suas principais características estão:</p>
            <ul>
                <li>Conexão mundial de dispositivos.</li>
                <li>Compartilhamento de informações.</li>
                <li>Comunicação digital.</li>
                <li>Acesso a serviços online.</li>
            </ul>
            <p>Também permite utilizar e-mails, redes sociais,
            streaming, jogos online e computação em nuvem.</p>
        `
    },
    {
        titulo: "13. História da Internet",
        resumo: "Descubra como surgiu a internet e como ela evoluiu.",
        conteudo: `
            <p>A origem da internet está relacionada à década de 1960,
            durante a Guerra Fria.</p>
            <p>Nesse período surgiu a ARPANET, um projeto desenvolvido
            pelo Departamento de Defesa dos Estados Unidos.</p>
            <p>O objetivo era permitir a comunicação entre centros
            de pesquisa e instituições.</p>
            <h4>Principais momentos históricos:</h4>
            <ul>
                <li>Década de 1960: criação da ARPANET.</li>
                <li>Década de 1970: desenvolvimento dos protocolos TCP/IP.</li>
                <li>Década de 1980: expansão para universidades.</li>
                <li>Década de 1990: popularização da internet comercial.</li>
            </ul>
            <p>Com o passar dos anos, a internet se tornou uma rede
            mundial acessível a milhões de pessoas.</p>
        `
    },
    {
        titulo: "14. Infraestrutura da Internet",
        resumo: "Conheça os equipamentos físicos que fazem a internet funcionar.",
        conteudo: `
            <p>A internet depende de uma grande infraestrutura física.</p>
            <p>Entre seus principais componentes estão:</p>
            <ul>
                <li>Data centers.</li>
                <li>Servidores.</li>
                <li>Cabos de fibra óptica.</li>
                <li>Roteadores.</li>
                <li>Satélites.</li>
                <li>Equipamentos de rede.</li>
            </ul>
            <p>Quando acessamos um site, nosso dispositivo envia
            uma solicitação pela rede até o servidor que armazena
            o conteúdo.</p>
            <p>O servidor responde enviando os dados de volta
            para o navegador.</p>
        `
    },
    {
        titulo: "15. Cabos Submarinos de Internet",
        resumo: "Entenda como os continentes se conectam por cabos submarinos.",
        conteudo: `
            <p>Grande parte da comunicação internacional da internet
            acontece por meio de cabos submarinos de fibra óptica.</p>
            <p>Esses cabos atravessam oceanos e conectam diferentes
            continentes.</p>
            <p>Suas principais características são:</p>
            <ul>
                <li>Percorrem milhares de quilômetros.</li>
                <li>Utilizam tecnologia de fibra óptica.</li>
                <li>Transportam grandes quantidades de dados.</li>
                <li>Permitem comunicação internacional rápida.</li>
            </ul>
            <p>Os cabos submarinos são fundamentais para o funcionamento
            da comunicação digital mundial.</p>
        `
    },
    {
        titulo: "16. O que é a Web (World Wide Web)",
        resumo: "Aprenda o significado de World Wide Web.",
        conteudo: `
            <p>A World Wide Web, também conhecida como Web,
            é um sistema que funciona sobre a internet.</p>
            <p>Ela reúne documentos e páginas conectados por hiperlinks.</p>
            <p>Esses documentos podem apresentar textos, imagens,
            vídeos, sons e animações.</p>
            <p>Quando acessamos um site por meio de um navegador,
            estamos utilizando a Web.</p>
        `
    },
    {
        titulo: "17. Como funciona a Web",
        resumo: "Conheça o funcionamento da comunicação entre cliente e servidor.",
        conteudo: `
            <p>A Web funciona utilizando uma arquitetura chamada
            cliente-servidor.</p>
            <p>O cliente é o dispositivo utilizado pelo usuário,
            como computador, celular ou tablet.</p>
            <p>O servidor é o computador responsável por armazenar
            e fornecer os conteúdos dos sites.</p>
            <h4>Etapas do funcionamento:</h4>
            <ol>
                <li>O navegador envia uma solicitação ao servidor.</li>
                <li>O servidor recebe e processa a solicitação.</li>
                <li>O servidor envia os dados de resposta.</li>
                <li>O navegador apresenta o conteúdo ao usuário.</li>
            </ol>
            <p>Esse processo utiliza protocolos como HTTP e HTTPS.</p>
        `
    },
    {
        titulo: "18. O papel de Tim Berners-Lee",
        resumo: "Conheça o criador da World Wide Web.",
        conteudo: `
            <p>Tim Berners-Lee é o cientista da computação
            conhecido por criar a World Wide Web.</p>
            <p>Ele desenvolveu a Web no final da década de 1980,
            enquanto trabalhava no CERN, um centro de pesquisa
            científica na Europa.</p>
            <p>Entre as tecnologias fundamentais da Web estão:</p>
            <ul>
                <li><strong>HTML:</strong> linguagem de marcação
                utilizada para criar páginas.</li>
                <li><strong>HTTP:</strong> protocolo utilizado
                para comunicação na Web.</li>
                <li><strong>URL:</strong> endereço utilizado
                para localizar recursos na Web.</li>
            </ul>
            <p>Essas tecnologias permitiram criar páginas
            interligadas e acessíveis por navegadores.</p>
        `
    },
    {
        titulo: "19. Internet x Web: diferenças fundamentais",
        resumo: "Entenda a diferença entre internet e World Wide Web.",
        conteudo: `
            <p>Internet e Web são conceitos diferentes,
            embora estejam relacionados.</p>
            <h4>Internet</h4>
            <p>É a infraestrutura mundial que conecta computadores
            e permite a comunicação entre dispositivos.</p>
            <h4>Web</h4>
            <p>É um serviço que funciona sobre a internet,
            formado por páginas e documentos interligados.</p>
            <p>Outros serviços que utilizam a internet incluem:</p>
            <ul>
                <li>E-mail.</li>
                <li>Transferência de arquivos.</li>
                <li>Streaming.</li>
                <li>Jogos online.</li>
                <li>Serviços em nuvem.</li>
            </ul>
            <p><strong>Internet = infraestrutura de comunicação.</strong></p>
            <p><strong>Web = sistema de páginas e documentos.</strong></p>
        `
    },
    {
        titulo: "20. Conclusão",
        resumo: "Relembre os principais conceitos sobre internet e Web.",
        conteudo: `
            <p>A internet é uma das tecnologias mais importantes
            da sociedade moderna.</p>
            <p>Ela surgiu como um projeto militar e acadêmico
            e evoluiu para uma rede mundial que conecta
            bilhões de pessoas e dispositivos.</p>
            <p>Sobre essa infraestrutura foi criada a World Wide Web,
            que tornou o acesso às informações mais simples.</p>
            <p>Compreender esses conceitos é fundamental para quem
            deseja estudar desenvolvimento web, redes de computadores
            e tecnologia.</p>
        `
    }
];

// ELEMENTOS HTML

const listaArtigos = document.getElementById("listaArtigos");
const campoPesquisa = document.getElementById("campoPesquisa");
const botaoPesquisa = document.getElementById("botaoPesquisa");
const mensagemVazia = document.getElementById("mensagemVazia");

// MOSTRAR CAPÍTULOS

function mostrarArtigos(lista) {

    listaArtigos.innerHTML = "";

    mensagemVazia.hidden = lista.length !== 0;

    lista.forEach((capitulo) => {

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

        // ABRIR E FECHAR CONTEÚDO

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

// PESQUISAR CAPÍTULOS

function pesquisarArtigos() {

    const pesquisa = campoPesquisa.value.trim().toLowerCase();

    const resultados = capitulos.filter((capitulo) => {

        return (
            capitulo.titulo.toLowerCase().includes(pesquisa) ||
            capitulo.resumo.toLowerCase().includes(pesquisa) ||
            capitulo.conteudo.toLowerCase().includes(pesquisa)
        );

    });

    mostrarArtigos(resultados);

}

// BOTÃO DE PESQUISA

botaoPesquisa.addEventListener("click", pesquisarArtigos);

// PESQUISA AUTOMÁTICA

campoPesquisa.addEventListener("input", pesquisarArtigos);

// PESQUISA COM TECLA ENTER

campoPesquisa.addEventListener("keydown", (evento) => {

    if (evento.key === "Enter") {
        pesquisarArtigos();
    }

});

// CARREGAR TODOS OS CAPÍTULOS

mostrarArtigos(capitulos);

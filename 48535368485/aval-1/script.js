// ==========================================
// BANCO DE NOTÍCIAS
// ==========================================

const noticias = {

    1: {

        categoria: "AÇÃO",

        classe: "",

        titulo: "Os jogos mais aguardados do ano",

        data: "26 de agosto de 2026",

        autor: "Lucas - GameZone",

        imagem:
            "https://images.unsplash.com/photo-1603481546238-487240415921?auto=format&fit=crop&w=1400&q=80",

        texto: `

            <p>
                <strong>O mundo dos games está cheio de novidades.</strong>
                Diversos títulos estão sendo aguardados pelos jogadores
                e prometem trazer experiências incríveis.
            </p>

            <p>
                As desenvolvedoras estão preparando jogos com mapas
                maiores, gráficos impressionantes e histórias cada vez
                mais elaboradas.
            </p>

            <h2>Grandes lançamentos</h2>

            <p>
                Entre os principais destaques estão jogos de ação,
                aventura, RPG e experiências multiplayer.
            </p>

            <p>
                Os jogadores poderão explorar novos mundos, conhecer
                personagens diferentes e participar de batalhas
                épicas.
            </p>

            <blockquote>
                "Os próximos lançamentos prometem ser uma grande
                celebração para os fãs de videogames."
            </blockquote>

            <h2>O que esperar?</h2>

            <p>
                Podemos esperar novas mecânicas de gameplay, mundos
                abertos maiores, inteligência artificial aprimorada
                e muitas horas de diversão.
            </p>

        `
    },


    2: {

        categoria: "RPG",

        classe: "roxo",

        titulo: "5 RPGs que você precisa jogar",

        data: "24 de agosto de 2026",

        autor: "Marcos - GameZone",

        imagem:
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=80",

        texto: `

            <p>
                <strong>Os RPGs são um dos gêneros mais populares
                dos videogames.</strong>
                Eles permitem que o jogador explore mundos enormes
                e desenvolva seus próprios personagens.
            </p>

            <h2>Mundos enormes</h2>

            <p>
                Uma das características mais interessantes dos RPGs
                modernos são seus mundos abertos.
            </p>

            <p>
                O jogador pode explorar cidades, florestas,
                montanhas, cavernas e diversos outros lugares.
            </p>

            <h2>Evolução do personagem</h2>

            <p>
                Outra característica importante é a evolução.
                Conforme o jogador avança, novas habilidades,
                equipamentos e poderes são desbloqueados.
            </p>

            <h2>Histórias memoráveis</h2>

            <p>
                Bons RPGs também apresentam personagens marcantes
                e histórias capazes de prender a atenção do jogador.
            </p>

            <p>
                Se você gosta de exploração e aventura, esse é um
                gênero que certamente merece sua atenção.
            </p>

        `
    },


    3: {

        categoria: "CORRIDA",

        classe: "verde",

        titulo: "Os melhores jogos de corrida",

        data: "22 de agosto de 2026",

        autor: "Pedro - GameZone",

        imagem:
            "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80",

        texto: `

            <p>
                <strong>Velocidade, carros incríveis e muita
                competição.</strong>
                Os jogos de corrida continuam conquistando
                jogadores no mundo inteiro.
            </p>

            <h2>Simulação</h2>

            <p>
                Os simuladores procuram reproduzir o comportamento
                dos veículos da maneira mais realista possível.
            </p>

            <p>
                Eles são perfeitos para quem gosta de competições
                e quer uma experiência mais próxima da realidade.
            </p>

            <h2>Arcade</h2>

            <p>
                Os jogos arcade possuem uma proposta mais simples
                e divertida.
            </p>

            <p>
                Eles permitem realizar curvas impossíveis,
                grandes saltos e outras manobras.
            </p>

            <blockquote>
                "Prepare o motor e acelere!"
            </blockquote>

        `
    },


    4: {

        categoria: "AVENTURA",

        classe: "vermelho",

        titulo: "Como montar um setup gamer",

        data: "20 de agosto de 2026",

        autor: "Gabriel - GameZone",

        imagem:
            "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1400&q=80",

        texto: `

            <p>
                <strong>Um bom setup pode transformar completamente
                sua experiência durante as partidas.</strong>
            </p>

            <p>
                Não é necessário gastar uma fortuna para criar um
                espaço bonito e confortável.
            </p>

            <h2>Escolha uma boa mesa</h2>

            <p>
                A mesa precisa possuir espaço suficiente para o
                monitor, teclado, mouse e outros acessórios.
            </p>

            <h2>Uma cadeira confortável</h2>

            <p>
                A cadeira é um dos itens mais importantes.
                Como você pode passar várias horas jogando,
                conforto é essencial.
            </p>

            <h2>Iluminação</h2>

            <p>
                Fitas de LED e outras luzes podem deixar o ambiente
                muito mais bonito e criar uma verdadeira atmosfera
                gamer.
            </p>

            <p>
                O mais importante é criar um espaço que combine
                com seu estilo.
            </p>

        `
    }

};


// ==========================================
// ABRIR NOTÍCIA
// ==========================================

function abrirNoticia(id) {

    const noticia = noticias[id];

    if (!noticia) {

        console.error("Notícia não encontrada.");

        return;

    }


    // Pega os elementos da página

    const blog =
        document.getElementById("blog");

    const pagina =
        document.getElementById("paginaNoticia");


    const imagem =
        document.getElementById("noticiaImagem");

    const categoria =
        document.getElementById("noticiaCategoria");

    const titulo =
        document.getElementById("noticiaTitulo");

    const data =
        document.getElementById("noticiaData");

    const autor =
        document.getElementById("noticiaAutor");

    const texto =
        document.getElementById("noticiaTexto");


    // Coloca os dados

    imagem.src = noticia.imagem;

    imagem.alt = noticia.titulo;

    categoria.textContent =
        noticia.categoria;


    // Remove classes anteriores

    categoria.className = "tag";


    // Coloca a cor correta

    if (noticia.classe !== "") {

        categoria.classList.add(
            noticia.classe
        );

    }


    titulo.textContent =
        noticia.titulo;

    data.textContent =
        noticia.data;

    autor.textContent =
        noticia.autor;

    texto.innerHTML =
        noticia.texto;


    // Esconde o blog

    blog.style.display = "none";


    // Mostra a notícia

    pagina.style.display = "block";


    // Vai para o topo

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================
// VOLTAR PARA O BLOG
// ==========================================

function mostrarInicio() {

    const blog =
        document.getElementById("blog");

    const pagina =
        document.getElementById("paginaNoticia");


    // Mostra o blog

    blog.style.display = "grid";


    // Esconde a notícia

    pagina.style.display = "none";


    // Mostra todas as notícias

    filtrarJogos("todos");


    // Volta para o topo

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================
// FILTRAR NOTÍCIAS
// ==========================================

function filtrarJogos(categoria) {

    const cards =
        document.querySelectorAll(".card");


    cards.forEach(function(card) {

        const categoriaCard =
            card.dataset.categoria;


        if (
            categoria === "todos" ||
            categoriaCard === categoria
        ) {

            card.style.display = "grid";

        } else {

            card.style.display = "none";

        }

    });

}

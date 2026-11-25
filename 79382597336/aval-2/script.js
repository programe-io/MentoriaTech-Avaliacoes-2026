
// ======================================
// BANCO DE NOTÍCIAS DO MJ NEWS
// ======================================

const noticias = [
    {
        id: 1,
        categoria: "Biografia",
        data: "29 de agosto de 1958",
        emoji: "👶",
        titulo: "O nascimento de Michael Jackson",
        resumo: "Conheça a infância do artista que conquistaria o mundo.",
        texto: `Michael Joseph Jackson nasceu em 29 de agosto de 1958, em Gary, Indiana, nos Estados Unidos.

Filho de Katherine e Joseph Jackson, Michael cresceu em uma família numerosa e demonstrou talento musical ainda muito pequeno.

Sua infância foi marcada por ensaios, apresentações e uma rotina intensa de preparação artística.

Desde cedo, sua voz e sua habilidade no palco chamavam a atenção do público.

Esse foi o início de uma trajetória que transformaria a história da música pop.`
    },
    {
        id: 2,
        categoria: "Carreira",
        data: "1969",
        emoji: "🎤",
        titulo: "Jackson 5: o começo de tudo",
        resumo: "O grupo formado por Michael e seus irmãos conquista o público.",
        texto: `Antes de se tornar um fenômeno mundial solo, Michael Jackson fez história ao lado de seus irmãos no grupo Jackson 5.

O grupo assinou com a gravadora Motown e conquistou enorme sucesso com músicas como I Want You Back, ABC e I'll Be There.

Michael era o vocalista principal e impressionava pela voz, presença de palco e desenvoltura.

O sucesso do grupo abriu as portas para sua carreira individual.`
    },
    {
        id: 3,
        categoria: "Música",
        data: "1979",
        emoji: "💿",
        titulo: "Off the Wall: uma nova fase musical",
        resumo: "Michael apresenta uma identidade musical mais madura.",
        texto: `Lançado em 1979, Off the Wall marcou uma transformação importante na carreira de Michael Jackson.

Produzido por Quincy Jones, o álbum misturou disco, funk, soul e pop.

Entre os grandes sucessos estavam Don't Stop 'Til You Get Enough e Rock with You.

O disco demonstrou que Michael tinha potencial para construir uma carreira solo extraordinária.

A parceria com Quincy Jones seria fundamental para os próximos grandes projetos.`
    },
    {
        id: 4,
        categoria: "Música",
        data: "1982",
        emoji: "🧟",
        titulo: "Thriller: o álbum que entrou para a história",
        resumo: "Uma das maiores revoluções da indústria musical.",
        texto: `Em novembro de 1982, Michael Jackson lançou Thriller.

O álbum tornou-se o mais vendido da história da música, segundo o reconhecimento da indústria musical.

Billie Jean, Beat It e Thriller foram alguns dos grandes destaques.

Os videoclipes apresentavam produções cinematográficas, coreografias elaboradas e uma linguagem visual inovadora.

Na edição de 1984 do Grammy, Michael conquistou oito prêmios em uma única noite.

Thriller consolidou definitivamente sua posição como um dos maiores artistas do planeta.`
    },
    {
        id: 5,
        categoria: "Carreira",
        data: "1983",
        emoji: "🕺",
        titulo: "O moonwalk conquista o mundo",
        resumo: "Uma apresentação que entrou para a história da dança.",
        texto: `Em 1983, durante o especial televisivo Motown 25: Yesterday, Today, Forever, Michael Jackson apresentou Billie Jean.

Foi nessa apresentação que ele mostrou ao grande público o moonwalk, movimento de dança que se tornou uma de suas marcas registradas.

A performance foi assistida por milhões de pessoas e ajudou a consolidar sua imagem como um artista completo.

A partir daquele momento, o moonwalk tornou-se um dos movimentos mais reconhecidos da cultura pop.`
    },
    {
        id: 6,
        categoria: "Música",
        data: "1987",
        emoji: "🎸",
        titulo: "Bad: uma nova era do Rei do Pop",
        resumo: "Um álbum repleto de sucessos e performances inesquecíveis.",
        texto: `Em 1987, Michael Jackson lançou Bad, mais um álbum de enorme impacto.

O trabalho trouxe músicas como Bad, Smooth Criminal, Man in the Mirror e The Way You Make Me Feel.

O álbum alcançou grande sucesso comercial e originou uma turnê mundial.

Michael continuou demonstrando sua capacidade de unir música, dança, moda e narrativa visual em um único espetáculo.`
    },
    {
        id: 7,
        categoria: "Legado",
        data: "1991",
        emoji: "🌍",
        titulo: "Dangerous e a evolução musical",
        resumo: "Michael explora novas sonoridades e amplia seu alcance.",
        texto: `Lançado em 1991, Dangerous apresentou uma nova fase musical de Michael Jackson.

O álbum incorporou elementos de new jack swing, pop, R&B e rock.

Black or White, Remember the Time e Heal the World estão entre as músicas mais conhecidas desse período.

O videoclipe de Black or White também chamou atenção pela produção visual e pela mensagem de união entre diferentes culturas.`
    },
    {
        id: 8,
        categoria: "Biografia",
        data: "2009",
        emoji: "🕊️",
        titulo: "A despedida de uma lenda",
        resumo: "O mundo se despede de Michael Jackson aos 50 anos.",
        texto: `Em 25 de junho de 2009, Michael Jackson faleceu em Los Angeles, aos 50 anos.

Naquele período, ele se preparava para uma série de apresentações chamada This Is It, em Londres.

Sua morte provocou manifestações de luto em diferentes países.

Milhões de fãs prestaram homenagens ao cantor, relembrando suas músicas, apresentações e contribuições culturais.

Sua história continua sendo estudada e celebrada por admiradores de várias gerações.`
    }
];

// ======================================
// ELEMENTOS DA PÁGINA
// ======================================

const feed = document.getElementById("feed");
const pesquisa = document.getElementById("pesquisa");
const contador = document.getElementById("contador");

let categoriaAtual = "Todas";
let favoritos = JSON.parse(
    localStorage.getItem("mj-favoritos") || "[]"
);

let curtidas = JSON.parse(
    localStorage.getItem("mj-curtidas") || "[]"
);

// ======================================
// MOSTRAR NOTÍCIAS
// ======================================

function renderizarNoticias() {

    const termo = pesquisa.value.toLowerCase().trim();

    const filtradas = noticias.filter(noticia => {

        const correspondeCategoria =
            categoriaAtual === "Todas" ||
            noticia.categoria === categoriaAtual;

        const correspondePesquisa =
            noticia.titulo.toLowerCase().includes(termo) ||
            noticia.resumo.toLowerCase().includes(termo) ||
            noticia.categoria.toLowerCase().includes(termo) ||
            noticia.texto.toLowerCase().includes(termo);

        return correspondeCategoria && correspondePesquisa;
    });

    feed.innerHTML = "";

    contador.textContent =
        filtradas.length +
        (filtradas.length === 1 ? " matéria" : " matérias");

    document.getElementById("sem-resultados").hidden =
        filtradas.length !== 0;

    filtradas.forEach(noticia => {

        const curtiu = curtidas.includes(noticia.id);
        const favoritou = favoritos.includes(noticia.id);

        const card = document.createElement("article");

        card.className = "noticia";

        card.innerHTML = `
            <div class="noticia-imagem">
                ${noticia.emoji}
            </div>

            <div class="noticia-conteudo">

                <span class="categoria">
                    ${noticia.categoria.toUpperCase()}
                </span>

                <small>${noticia.data}</small>

                <h3>${noticia.titulo}</h3>

                <p>${noticia.resumo}</p>

                <div class="noticia-acoes">

                    <button onclick="abrirMateria(${noticia.id})">
                        📖 Ler mais
                    </button>

                    <button onclick="curtir(${noticia.id})">
                        ${curtiu ? "❤️" : "🤍"}
                        ${curtiu ? "Curtido" : "Curtir"}
                    </button>

                    <button onclick="favoritar(${noticia.id})">
                        ${favoritou ? "🔖 Salvo" : "☆ Favoritar"}
                    </button>

                </div>
            </div>
        `;

        feed.appendChild(card);
    });

    renderizarFavoritos();
}

// ======================================
// PESQUISA
// ======================================

pesquisa.addEventListener("input", renderizarNoticias);

// ======================================
// FILTROS DE CATEGORIA
// ======================================

document.querySelectorAll(".filtro").forEach(botao => {

    botao.addEventListener("click", () => {

        document.querySelectorAll(".filtro").forEach(item => {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        categoriaAtual = botao.dataset.categoria;

        renderizarNoticias();
    });

});

// ======================================
// CURTIR NOTÍCIAS
// ======================================

function curtir(id) {

    if (curtidas.includes(id)) {
        curtidas = curtidas.filter(item => item !== id);
    } else {
        curtidas.push(id);
    }

    localStorage.setItem(
        "mj-curtidas",
        JSON.stringify(curtidas)
    );

    renderizarNoticias();
}

// ======================================
// FAVORITAR NOTÍCIAS
// ======================================

function favoritar(id) {

    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(item => item !== id);
    } else {
        favoritos.push(id);
    }

    localStorage.setItem(
        "mj-favoritos",
        JSON.stringify(favoritos)
    );

    renderizarNoticias();
}

// ======================================
// LISTA DE FAVORITOS
// ======================================

function renderizarFavoritos() {

    const lista = document.getElementById("lista-favoritos");

    lista.innerHTML = "";

    const salvos = noticias.filter(n =>
        favoritos.includes(n.id)
    );

    if (salvos.length === 0) {
        lista.textContent = "Você ainda não salvou nenhuma matéria. ⭐";
        return;
    }

    salvos.forEach(noticia => {

        const item = document.createElement("div");
        item.className = "favorito-item";

        const titulo = document.createElement("span");
        titulo.textContent = noticia.emoji + " " + noticia.titulo;

        const botao = document.createElement("button");
        botao.textContent = "Ler matéria →";
        botao.addEventListener("click", () => abrirMateria(noticia.id));

        item.append(titulo, botao);

        lista.appendChild(item);
    });
}

// ======================================
// ABRIR MATÉRIA COMPLETA
// ======================================

function abrirMateria(id) {

    const noticia = noticias.find(n => n.id === id);

    if (!noticia) return;

    document.getElementById("modal-categoria").textContent =
        noticia.categoria.toUpperCase() + " • " + noticia.data;

    document.getElementById("modal-titulo").textContent =
        noticia.titulo;

    document.getElementById("modal-texto").textContent =
        noticia.texto;

    document.getElementById("modal").classList.add("aberto");

    document.body.style.overflow = "hidden";
}

function fecharMateria() {

    document.getElementById("modal").classList.remove("aberto");

    document.body.style.overflow = "";
}

// Fechar clicando fora da matéria
document.getElementById("modal").addEventListener("click", e => {

    if (e.target.id === "modal") {
        fecharMateria();
    }

});

// Fechar usando ESC
document.addEventListener("keydown", e => {

    if (e.key === "Escape") {
        fecharMateria();
    }

});

// ======================================
// MODO CLARO E ESCURO
// ======================================

const botaoTema = document.getElementById("tema");

if (localStorage.getItem("mj-tema") === "claro") {
    document.body.classList.add("claro");
    botaoTema.textContent = "☀️";
}

botaoTema.addEventListener("click", () => {

    document.body.classList.toggle("claro");

    const claro = document.body.classList.contains("claro");

    botaoTema.textContent = claro ? "☀️" : "🌙";

    localStorage.setItem(
        "mj-tema",
        claro ? "claro" : "escuro"
    );

});

// ======================================
// CURIOSIDADES ALEATÓRIAS
// ======================================

const curiosidades = [
    {
        emoji: "🏆",
        texto: "Michael conquistou oito Grammys em uma única noite, em 1984."
    },
    {
        emoji: "🕺",
        texto: "O moonwalk se tornou uma das marcas registradas de suas apresentações."
    },
    {
        emoji: "🎬",
        texto: "O videoclipe de Thriller ficou conhecido por sua produção cinematográfica."
    },
    {
        emoji: "🌎",
        texto: "Michael participou da criação de We Are the World, projeto musical beneficente."
    },
    {
        emoji: "👑",
        texto: "Em 2001, Michael Jackson foi introduzido no Rock & Roll Hall of Fame como artista solo."
    },
    {
        emoji: "🎵",
        texto: "Off the Wall, Thriller e Bad foram produzidos em parceria com Quincy Jones."
    }
];

function novaCuriosidade() {

    const sorteio = Math.floor(
        Math.random() * curiosidades.length
    );

    const curiosidade = curiosidades[sorteio];

    document.getElementById("emoji-curiosidade").textContent =
        curiosidade.emoji;

    document.getElementById("texto-curiosidade").textContent =
        curiosidade.texto;
}

// ======================================
// INICIALIZAR O PORTAL
// ======================================

renderizarNoticias();

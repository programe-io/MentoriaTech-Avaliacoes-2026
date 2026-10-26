
const postsIniciais = [
    {
        id: 1,
        categoria: "Música",
        emoji: "🎸",
        titulo: "música é minha terapia",
        texto: "Quadriton, bateria, guitarra e violão... me deixa com meus instrumentos que eu fico feliz 💙",
        curtidas: 0,
        curtiu: false,
        comentarios: []
    },
    {
        id: 2,
        categoria: "Comidinhas",
        emoji: "🍇",
        titulo: "açaí + eu = felicidade",
        texto: "Um açaízinho e todos os problemas ficam menores kkkkk 💜",
        curtidas: 0,
        curtiu: false,
        comentarios: []
    },
    {
        id: 3,
        categoria: "Momentos",
        emoji: "🌊",
        titulo: "queria morar na praia",
        texto: "Sol, mar, vento no rosto e depois um friozinho pra dormir. Meu tipo de felicidade!",
        curtidas: 0,
        curtiu: false,
        comentarios: []
    },
    {
        id: 4,
        categoria: "Games",
        emoji: "🎮",
        titulo: "só mais um mundo no minecraft",
        texto: "Entrei pra jogar um pouquinho e quando vi já tinha passado horas 😂",
        curtidas: 0,
        curtiu: false,
        comentarios: []
    },
    {
        id: 5,
        categoria: "Amizades",
        emoji: "🩷",
        titulo: "tempo de qualidade com elas",
        texto: "As melhores memórias são aquelas que a gente cria com as amigas. Amo muito!",
        curtidas: 0,
        curtiu: false,
        comentarios: []
    },
    {
        id: 6,
        categoria: "Favoritos",
        emoji: "🎬",
        titulo: "fear street 1666",
        texto: "Minha trilogia favorita! O tipo de filme que merece ser comentado depois de assistir 👀",
        curtidas: 0,
        curtiu: false,
        comentarios: []
    }
];

let posts = postsIniciais;
let categoriaAtual = "Todos";

const listaPosts = document.getElementById("listaPosts");
const formPost = document.getElementById("formPost");
const totalPosts = document.getElementById("totalPosts");
const totalCurtidas = document.getElementById("totalCurtidas");

function atualizarEstatisticas() {
    totalPosts.textContent = posts.length;

    totalCurtidas.textContent = posts.reduce(
        (total, post) => total + post.curtidas,
        0
    );
}

function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);

    if (classe) elemento.className = classe;
    if (texto !== undefined) elemento.textContent = texto;

    return elemento;
}

function renderizarPosts() {
    listaPosts.replaceChildren();

    const filtrados = posts.filter(post =>
        categoriaAtual === "Todos" ||
        post.categoria === categoriaAtual
    );

    if (filtrados.length === 0) {
        listaPosts.append(
            criarElemento("p", "", "Nenhum post nesta categoria ainda 💙")
        );
    }

    filtrados.forEach(post => {
        const card = criarElemento("article", "post");

        // Cabeçalho
        const cabecalho = criarElemento("div", "post-cabecalho");
        const avatar = criarElemento("div", "post-avatar", post.emoji);
        const info = document.createElement("div");

        info.append(
            criarElemento("h3", "", "meucantinho ♡"),
            criarElemento("small", "", post.categoria)
        );

        cabecalho.append(avatar, info);

        // Imagem ilustrativa em emoji
        const imagem = criarElemento("div", "post-imagem", post.emoji);
        imagem.setAttribute("aria-label", post.categoria);

        // Texto da publicação
        const conteudo = criarElemento("div", "post-conteudo");
        conteudo.append(
            criarElemento("h3", "", post.titulo),
            criarElemento("p", "", post.texto)
        );

        // Curtidas e comentários
        const acoes = criarElemento("div", "acoes");
        const botaoCurtir = criarElemento(
            "button",
            post.curtiu ? "btn-acao curtiu" : "btn-acao",
            `${post.curtiu ? "♥ Curtido" : "♡ Curtir"} (${post.curtidas})`
        );

        botaoCurtir.type = "button";

        botaoCurtir.addEventListener("click", () => {
            post.curtiu = !post.curtiu;
            post.curtidas += post.curtiu ? 1 : -1;

            renderizarPosts();
            atualizarEstatisticas();
        });

        const botaoComentario = criarElemento(
            "button",
            "btn-acao",
            `💬 Comentários (${post.comentarios.length})`
        );

        botaoComentario.type = "button";

        acoes.append(botaoCurtir, botaoComentario);

        // Área de comentários
        const areaComentarios = criarElemento("section", "comentarios");
        const listaComentarios = criarElemento("div", "lista-comentarios");

        post.comentarios.forEach(comentario => {
            listaComentarios.append(
                criarElemento("p", "comentario", comentario)
            );
        });

        const formularioComentario = criarElemento(
            "form",
            "form-comentario"
        );

        const campoComentario = document.createElement("input");
        campoComentario.type = "text";
        campoComentario.placeholder = "Escreva um comentário...";
        campoComentario.maxLength = 250;
        campoComentario.setAttribute(
            "aria-label",
            "Escreva um comentário"
        );
        campoComentario.required = true;

        const enviarComentario = criarElemento(
            "button",
            "",
            "Enviar"
        );

        enviarComentario.type = "submit";

        formularioComentario.append(campoComentario, enviarComentario);

        formularioComentario.addEventListener("submit", evento => {
            evento.preventDefault();

            const texto = campoComentario.value.trim();

            if (!texto) return;

            post.comentarios.push(texto);
            renderizarPosts();
        });

        // Mostrar ou esconder comentários
        areaComentarios.hidden = true;

        botaoComentario.addEventListener("click", () => {
            areaComentarios.hidden = !areaComentarios.hidden;

            if (!areaComentarios.hidden) {
                campoComentario.focus();
            }
        });

        areaComentarios.append(listaComentarios, formularioComentario);

        card.append(
            cabecalho,
            imagem,
            conteudo,
            acoes,
            areaComentarios
        );

        listaPosts.append(card);
    });

    atualizarEstatisticas();
}

// Filtros de categoria
document.querySelectorAll(".filtro").forEach(botao => {
    botao.addEventListener("click", () => {
        categoriaAtual = botao.dataset.categoria;

        document.querySelectorAll(".filtro").forEach(filtro => {
            filtro.classList.toggle("ativo", filtro === botao);
        });

        renderizarPosts();
    });
});

// Criar uma nova publicação
formPost.addEventListener("submit", evento => {
    evento.preventDefault();

    const titulo = document.getElementById("tituloPost").value.trim();
    const texto = document.getElementById("textoPost").value.trim();
    const categoria = document.getElementById("categoriaPost").value;

    if (!titulo || !texto) return;

    posts.unshift({
        id: Date.now(),
        categoria,
        emoji: {
            "Música": "🎸",
            "Comidinhas": "🍣",
            "Momentos": "💙",
            "Games": "🎮",
            "Amizades": "🩷",
            "Favoritos": "✨"
        }[categoria] || "💙",
        titulo,
        texto,
        curtidas: 0,
        curtiu: false,
        comentarios: []
    });

    categoriaAtual = "Todos";

    document.querySelectorAll(".filtro").forEach(botao => {
        botao.classList.toggle(
            "ativo",
            botao.dataset.categoria === "Todos"
        );
    });

    formPost.reset();
    renderizarPosts();

    document.getElementById("listaPosts").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// Inicialização
renderizarPosts();


const feed = document.getElementById("listaPosts");
const textoPost = document.getElementById("textoPost");
const autorPost = document.getElementById("autor");
const categoriaPost = document.getElementById("categoriaPost");
const imagemPost = document.getElementById("imagemPost");
const pesquisa = document.getElementById("pesquisa");

let categoriaAtual = "Todos";

const imagens = {
    anime: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=900",
    games: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900",
    filmes: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900",
    tecnologia: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900",
    hqs: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=900"
};

const postsIniciais = [
    {
        id: 1,
        autor: "Ana Geek",
        avatar: "https://i.pravatar.cc/100?img=47",
        categoria: "Animes",
        texto: "Qual é o anime que mais marcou sua vida? Para mim, Naruto sempre terá um lugar especial! 🍥🔥",
        imagem: imagens.anime,
        curtidas: 28,
        comentarios: [
            { id: 101, autor: "Lucas", texto: "Naruto é simplesmente lendário!" },
            { id: 102, autor: "Maria", texto: "One Piece também é incrível!" }
        ]
    },
    {
        id: 2,
        autor: "Pedro Gamer",
        avatar: "https://i.pravatar.cc/100?img=12",
        categoria: "Games",
        texto: "Uma boa partida de videogame consegue transformar qualquer dia ruim em um dia incrível! 🎮",
        imagem: imagens.games,
        curtidas: 45,
        comentarios: [
            { id: 201, autor: "João", texto: "Qual seu jogo favorito?" }
        ]
    },
    {
        id: 3,
        autor: "Julia Cine",
        avatar: "https://i.pravatar.cc/100?img=44",
        categoria: "Filmes",
        texto: "O universo cinematográfico dos super-heróis nunca deixa de surpreender. Qual é seu herói favorito? 🦸",
        imagem: imagens.filmes,
        curtidas: 19,
        comentarios: []
    },
    {
        id: 4,
        autor: "Tech World",
        avatar: "https://i.pravatar.cc/100?img=14",
        categoria: "Tecnologia",
        texto: "A inteligência artificial está mudando o futuro. Estamos apenas começando a descobrir seu potencial! 🤖",
        imagem: imagens.tecnologia,
        curtidas: 36,
        comentarios: []
    },
    {
        id: 5,
        autor: "Comic Lover",
        avatar: "https://i.pravatar.cc/100?img=32",
        categoria: "HQs",
        texto: "As histórias em quadrinhos são verdadeiras obras de arte. Marvel ou DC? 📚",
        imagem: imagens.hqs,
        curtidas: 12,
        comentarios: []
    }
];

// CARREGAR PUBLICAÇÕES

function carregarPosts() {
    try {
        const salvos = localStorage.getItem("geekverse_posts");
        if (salvos) return JSON.parse(salvos);
    } catch (erro) {
        console.error("Erro ao carregar publicações:", erro);
    }

    return postsIniciais;
}

let posts = carregarPosts();

function salvarPosts() {
    try {
        localStorage.setItem("geekverse_posts", JSON.stringify(posts));
    } catch (erro) {
        alert("Não foi possível salvar os dados neste navegador.");
    }
}

// CRIAR ELEMENTOS DE TEXTO COM SEGURANÇA

function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);

    if (classe) elemento.className = classe;
    if (texto !== undefined) elemento.textContent = texto;

    return elemento;
}

// VALIDAR LINKS DE IMAGEM

function linkSeguro(url) {
    try {
        const link = new URL(url);
        return ["http:", "https:"].includes(link.protocol);
    } catch {
        return false;
    }
}

// MOSTRAR PUBLICAÇÕES

function renderizarPosts() {
    feed.replaceChildren();

    const termo = pesquisa.value.toLowerCase().trim();

    const filtrados = posts.filter(post => {
        const correspondeCategoria =
            categoriaAtual === "Todos" ||
            post.categoria === categoriaAtual;

        const correspondePesquisa =
            post.autor.toLowerCase().includes(termo) ||
            post.texto.toLowerCase().includes(termo) ||
            post.categoria.toLowerCase().includes(termo);

        return correspondeCategoria && correspondePesquisa;
    });

    if (filtrados.length === 0) {
        feed.appendChild(
            criarElemento("div", "vazio",
                "🔎 Nenhuma publicação encontrada.")
        );
        return;
    }

    filtrados.forEach(post => {
        const artigo = criarElemento("article", "post");
        artigo.dataset.id = post.id;

        // CABEÇALHO

        const topo = criarElemento("div", "post-topo");

        const avatar = criarElemento("img", "avatar");
        avatar.src = post.avatar;
        avatar.alt = "Foto de " + post.autor;

        const info = criarElemento("div", "usuario-info");
        info.append(
            criarElemento("strong", "", post.autor),
            criarElemento("small", "", "Membro da comunidade"),
            criarElemento("span", "selo", "✦ GeekVerse")
        );

        const excluir = criarElemento("button", "excluir-btn", "Excluir");
        excluir.dataset.acao = "excluir-post";

        topo.append(avatar, info, excluir);

        // CONTEÚDO

        const categoria = criarElemento(
            "span", "post-categoria", "✦ " + post.categoria
        );

        const texto = criarElemento("p", "post-texto", post.texto);

        artigo.append(topo, categoria, texto);

        if (post.imagem && linkSeguro(post.imagem)) {
            const foto = criarElemento("img", "post-imagem");
            foto.src = post.imagem;
            foto.alt = "Imagem da publicação";
            foto.loading = "lazy";
            artigo.appendChild(foto);
        }

        // BOTÕES DE INTERAÇÃO

        const acoes = criarElemento("div", "acoes");

        const curtir = criarElemento(
            "button", "acao-btn" + (post.curtido ? " curtido" : ""),
            (post.curtido ? "❤️" : "🤍") +
            " Curtir (" + post.curtidas + ")"
        );
        curtir.dataset.acao = "curtir";

        const comentar = criarElemento(
            "button", "acao-btn",
            "💬 Comentar (" + post.comentarios.length + ")"
        );
        comentar.dataset.acao = "focar-comentario";

        acoes.append(curtir, comentar);

        // ÁREA DE COMENTÁRIOS

        const area = criarElemento("div", "area-comentarios");
        area.appendChild(criarElemento("h4", "", "💬 Comentários"));

        post.comentarios.forEach(comentario => {
            const bloco = criarElemento("div", "comentario");
            bloco.dataset.id = comentario.id;

            const nome = criarElemento("strong", "", comentario.autor);
            const mensagem = criarElemento("p", "", comentario.texto);

            const botoes = criarElemento("div", "comentario-acoes");

            const editar = criarElemento("button", "", "✏️ Editar");
            editar.dataset.acao = "editar-comentario";

            const excluirComentario = criarElemento(
                "button", "", "🗑️ Excluir"
            );
            excluirComentario.dataset.acao = "excluir-comentario";

            botoes.append(editar, excluirComentario);
            bloco.append(nome, mensagem, botoes);
            area.appendChild(bloco);
        });

        // FORMULÁRIO DE COMENTÁRIO

        const formulario = criarElemento("form", "comentario-form");

        const campo = criarElemento("input");
        campo.type = "text";
        campo.placeholder = "Escreva um comentário...";
        campo.maxLength = 300;
        campo.required = true;

        const enviar = criarElemento("button", "", "Enviar");
        enviar.type = "submit";

        formulario.append(campo, enviar);
        area.appendChild(formulario);

        artigo.append(acoes, area);
        feed.appendChild(artigo);
    });
}

// CRIAR PUBLICAÇÃO

document.getElementById("publicarBtn").addEventListener("click", () => {
    const autor = autorPost.value.trim();
    const texto = textoPost.value.trim();
    const imagem = imagemPost.value.trim();

    if (!autor || !texto) {
        alert("Preencha seu nome e o conteúdo da publicação!");
        return;
    }

    if (imagem && !linkSeguro(imagem)) {
        alert("Digite um link de imagem válido (HTTP ou HTTPS).");
        return;
    }

    const novoPost = {
        id: Date.now(),
        autor: autor,
        avatar: "https://i.pravatar.cc/100?img=11",
        categoria: categoriaPost.value,
        texto: texto,
        imagem: imagem,
        curtidas: 0,
        curtido: false,
        comentarios: []
    };

    posts.unshift(novoPost);

    salvarPosts();

    textoPost.value = "";
    imagemPost.value = "";

    categoriaAtual = "Todos";
    pesquisa.value = "";

    document.querySelectorAll(".filtro").forEach(botao => {
        botao.classList.toggle(
            "ativo", botao.dataset.categoria === "Todos"
        );
    });

    renderizarPosts();

    alert("Publicação criada com sucesso! 🚀");
});

// INTERAÇÕES DO FEED

feed.addEventListener("click", evento => {
    const botao = evento.target.closest("[data-acao]");
    if (!botao) return;

    const artigo = botao.closest(".post");
    const post = posts.find(p => p.id == artigo.dataset.id);

    if (!post) return;

    const acao = botao.dataset.acao;

    // CURTIR E DESCURTIR

    if (acao === "curtir") {
        if (post.curtido) {
            post.curtidas = Math.max(0, post.curtidas - 1);
            post.curtido = false;
        } else {
            post.curtidas++;
            post.curtido = true;
        }
    }

    // EXCLUIR PUBLICAÇÃO

    if (acao === "excluir-post") {
        if (!confirm("Deseja realmente excluir esta publicação?")) {
            return;
        }

        posts = posts.filter(p => p.id !== post.id);
    }

    // EDITAR COMENTÁRIO

    if (acao === "editar-comentario") {
        const bloco = botao.closest(".comentario");
        const idComentario = Number(bloco.dataset.id);

        const comentario = post.comentarios.find(
            c => c.id === idComentario
        );

        if (!comentario) return;

        const campo = criarElemento("input");
        campo.value = comentario.texto;
        campo.maxLength = 300;
        campo.setAttribute("aria-label", "Editar comentário");

        const salvar = criarElemento("button", "", "Salvar");
        salvar.type = "button";

        const cancelar = criarElemento("button", "", "Cancelar");
        cancelar.type = "button";

        bloco.querySelector("p").replaceWith(campo);

        const botoes = bloco.querySelector(".comentario-acoes");
        botoes.replaceChildren(salvar, cancelar);

        salvar.addEventListener("click", () => {
            const novoTexto = campo.value.trim();

            if (!novoTexto) {
                alert("O comentário não pode ficar vazio!");
                return;
            }

            comentario.texto = novoTexto;
            salvarPosts();
            renderizarPosts();
        });

        cancelar.addEventListener("click", renderizarPosts);

        campo.focus();
        return;
    }

    // EXCLUIR COMENTÁRIO

    if (acao === "excluir-comentario") {
        const bloco = botao.closest(".comentario");
        const idComentario = Number(bloco.dataset.id);

        if (!confirm("Deseja excluir este comentário?")) return;

        post.comentarios = post.comentarios.filter(
            c => c.id !== idComentario
        );
    }

    // FOCAR NO CAMPO DE COMENTÁRIO

    if (acao === "focar-comentario") {
        artigo.querySelector(".comentario-form input").focus();
        return;
    }

    salvarPosts();
    renderizarPosts();
});

// ADICIONAR COMENTÁRIO

feed.addEventListener("submit", evento => {
    if (!evento.target.matches(".comentario-form")) return;

    evento.preventDefault();

    const formulario = evento.target;
    const artigo = formulario.closest(".post");

    const post = posts.find(p => p.id == artigo.dataset.id);

    if (!post) return;

    const campo = formulario.querySelector("input");
    const texto = campo.value.trim();

    if (!texto) return;

    post.comentarios.push({
        id: Date.now(),
        autor: "Geek User",
        texto: texto
    });

    salvarPosts();
    renderizarPosts();
});

// FILTRAR CATEGORIAS

document.querySelectorAll(".filtro").forEach(botao => {
    botao.addEventListener("click", () => {
        categoriaAtual = botao.dataset.categoria;

        document.querySelectorAll(".filtro").forEach(item => {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        renderizarPosts();
    });
});

// PESQUISAR PUBLICAÇÕES

pesquisa.addEventListener("input", renderizarPosts);

// INICIALIZAR A APLICAÇÃO

renderizarPosts();


/* =====================================
   MINIBLOG INTERATIVO
   ===================================== */

// Seleciona os elementos do HTML
const form = document.getElementById("formPost");
const listaPosts = document.getElementById("listaPosts");
const campoPesquisa = document.getElementById("pesquisa");

const campoAutor = document.getElementById("autor");
const campoTitulo = document.getElementById("titulo");
const campoConteudo = document.getElementById("conteudo");

// =====================================
// 1. CARREGAR PUBLICAÇÕES SALVAS
// =====================================

function carregarPosts() {
    try {
        const dados = localStorage.getItem("meuMiniblogPosts");
        const posts = dados ? JSON.parse(dados) : [];

        if (!Array.isArray(posts)) {
            return [];
        }

        // Valida os dados básicos antes de utilizá-los.
        return posts.filter(post =>
            post &&
            typeof post.id === "string" &&
            typeof post.autor === "string" &&
            typeof post.titulo === "string" &&
            typeof post.conteudo === "string"
        ).map(post => ({
            ...post,
            curtidas: Number.isInteger(post.curtidas)
                ? Math.max(0, post.curtidas)
                : 0,
            curtido: post.curtido === true,
            data: typeof post.data === "string"
                ? post.data
                : new Date().toISOString()
        }));
    } catch (erro) {
        console.error("Erro ao carregar publicações:", erro);
        return [];
    }
}

let posts = carregarPosts();

// =====================================
// 2. SALVAR PUBLICAÇÕES
// =====================================

function salvarPosts() {
    try {
        localStorage.setItem(
            "meuMiniblogPosts",
            JSON.stringify(posts)
        );

        return true;
    } catch (erro) {
        console.error("Erro ao salvar publicações:", erro);
        alert(
            "Não foi possível salvar os posts. " +
            "Verifique o espaço disponível no navegador."
        );

        return false;
    }
}

// =====================================
// 3. CRIAR ELEMENTOS COM SEGURANÇA
// =====================================

function criarElemento(tag, texto, classe = "") {
    const elemento = document.createElement(tag);

    // textContent impede que textos dos usuários
    // sejam interpretados como código HTML.
    elemento.textContent = texto;

    if (classe) {
        elemento.className = classe;
    }

    return elemento;
}

// =====================================
// 4. FORMATAR DATA
// =====================================

function formatarData(data) {
    const dataPost = new Date(data);

    if (Number.isNaN(dataPost.getTime())) {
        return "Data desconhecida";
    }

    return dataPost.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
    });
}

// =====================================
// 5. EXIBIR PUBLICAÇÕES
// =====================================

function renderizarPosts() {
    listaPosts.replaceChildren();

    const termo = campoPesquisa.value
        .trim()
        .toLocaleLowerCase("pt-BR");

    // Filtra por título, conteúdo ou autor.
    const postsFiltrados = posts.filter(post => {
        return [
            post.titulo,
            post.conteudo,
            post.autor
        ].some(texto =>
            texto.toLocaleLowerCase("pt-BR").includes(termo)
        );
    });

    // Mensagem quando não existem resultados.
    if (postsFiltrados.length === 0) {
        const mensagem = termo
            ? "Nenhuma publicação encontrada."
            : "Ainda não há publicações. Seja o primeiro a postar!";

        listaPosts.appendChild(
            criarElemento("p", mensagem, "vazio")
        );

        return;
    }

    // Cria um cartão para cada publicação.
    postsFiltrados.forEach(post => {
        const artigo = document.createElement("article");
        artigo.className = "post";

        // Título
        artigo.appendChild(
            criarElemento("h3", post.titulo)
        );

        // Autor e data
        const meta = criarElemento(
            "p",
            `Por ${post.autor} · ${formatarData(post.data)}`,
            "meta"
        );

        artigo.appendChild(meta);

        // Texto da publicação
        artigo.appendChild(
            criarElemento("p", post.conteudo, "conteudo")
        );

        // Área de botões
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        // Botão curtir
        const botaoCurtir = document.createElement("button");
        botaoCurtir.className = "btn-curtir";

        botaoCurtir.textContent =
            `${post.curtido ? "❤️" : "🤍"} Curtir (${post.curtidas})`;

        botaoCurtir.setAttribute(
            "aria-pressed",
            String(post.curtido)
        );

        botaoCurtir.addEventListener("click", () => {
            alternarCurtida(post.id);
        });

        // Botão excluir
        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "btn-excluir";
        botaoExcluir.textContent = "🗑️ Excluir";

        botaoExcluir.addEventListener("click", () => {
            excluirPost(post.id);
        });

        acoes.append(botaoCurtir, botaoExcluir);
        artigo.appendChild(acoes);
        listaPosts.appendChild(artigo);
    });
}

// =====================================
// 6. CRIAR UMA NOVA PUBLICAÇÃO
// =====================================

form.addEventListener("submit", event => {
    event.preventDefault();

    const autor = campoAutor.value.trim();
    const titulo = campoTitulo.value.trim();
    const conteudo = campoConteudo.value.trim();

    // Verifica os campos obrigatórios.
    if (!autor || !titulo || !conteudo) {
        alert("Preencha todos os campos antes de publicar!");
        return;
    }

    // Evita publicações vazias ou excessivamente grandes.
    if (
        autor.length > 60 ||
        titulo.length > 120 ||
        conteudo.length > 5000
    ) {
        alert("Um ou mais campos ultrapassaram o limite permitido.");
        return;
    }

    const novoPost = {
        id: crypto.randomUUID(),
        autor,
        titulo,
        conteudo,
        data: new Date().toISOString(),
        curtidas: 0,
        curtido: false
    };

    // Adiciona a publicação ao início da lista.
    posts.unshift(novoPost);

    // Só limpa o formulário se o salvamento funcionar.
    if (salvarPosts()) {
        form.reset();
        campoPesquisa.value = "";
        renderizarPosts();
    } else {
        posts.shift();
    }
});

// =====================================
// 7. CURTIR E DESCURTIR
// =====================================

function alternarCurtida(id) {
    const post = posts.find(item => item.id === id);

    if (!post) {
        return;
    }

    const curtidoAnterior = post.curtido;
    const curtidasAnteriores = post.curtidas;

    post.curtido = !post.curtido;
    post.curtidas += post.curtido ? 1 : -1;

    if (salvarPosts()) {
        renderizarPosts();
    } else {
        post.curtido = curtidoAnterior;
        post.curtidas = curtidasAnteriores;
        renderizarPosts();
    }
}

// =====================================
// 8. EXCLUIR PUBLICAÇÕES
// =====================================

function excluirPost(id) {
    const confirmar = confirm(
        "Tem certeza de que deseja excluir esta publicação?"
    );

    if (!confirmar) {
        return;
    }

    const postsAnteriores = posts;
    posts = posts.filter(post => post.id !== id);

    if (salvarPosts()) {
        renderizarPosts();
    } else {
        posts = postsAnteriores;
        renderizarPosts();
    }
}

// =====================================
// 9. PESQUISAR PUBLICAÇÕES
// =====================================

campoPesquisa.addEventListener("input", () => {
    renderizarPosts();
});

// =====================================
// 10. INICIALIZAR MINIBLOG
// =====================================

renderizarPosts();

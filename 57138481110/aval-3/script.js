
// =====================================
// MINI FEED SOCIAL - JAVASCRIPT
// =====================================

// ELEMENTOS DO HTML
const formulario = document.getElementById("form-publicacao");
const campoTexto = document.getElementById("texto-publicacao");
const contador = document.getElementById("contador");
const listaPostagens = document.getElementById("lista-postagens");
const mensagemVazia = document.getElementById("mensagem-vazia");

// PUBLICAÇÕES INICIAIS
const publicacoesIniciais = [
    {
        id: 1,
        nome: "Maria Oliveira",
        inicial: "M",
        classe: "avatar-azul",
        texto: "Hoje foi um dia incrível de aprendizado! Estou estudando desenvolvimento web e cada dia descubro algo novo. 💜",
        curtidas: 0,
        curtido: false,
        comentarios: [],
        data: "Há 10 minutos",
        propria: false
    },
    {
        id: 2,
        nome: "João Santos",
        inicial: "J",
        classe: "avatar-verde",
        texto: "A tecnologia é uma ferramenta poderosa para transformar ideias em realidade. Nunca pare de aprender! 🚀",
        curtidas: 0,
        curtido: false,
        comentarios: [],
        data: "Há 30 minutos",
        propria: false
    }
];

// CARREGAR PUBLICAÇÕES SALVAS
function carregarPublicacoes() {
    try {
        const dados = localStorage.getItem("miniFeedPublicacoes");

        if (dados !== null) {
            const publicacoes = JSON.parse(dados);

            if (Array.isArray(publicacoes)) {
                return publicacoes;
            }
        }
    } catch (erro) {
        console.log("Não foi possível carregar os dados.", erro);
    }

    return publicacoesIniciais;
}

let publicacoes = carregarPublicacoes();

// SALVAR PUBLICAÇÕES
function salvarPublicacoes() {
    try {
        localStorage.setItem(
            "miniFeedPublicacoes",
            JSON.stringify(publicacoes)
        );
    } catch (erro) {
        console.log("Não foi possível salvar os dados.", erro);
        alert("Não foi possível salvar a publicação neste navegador.");
    }
}

// CONTADOR DE CARACTERES
campoTexto.addEventListener("input", function() {
    contador.textContent = `${campoTexto.value.length}/500 caracteres`;
});

// CRIAR NOVA PUBLICAÇÃO
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const texto = campoTexto.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const novaPublicacao = {
        id: Date.now(),
        nome: "Você",
        inicial: "V",
        classe: "avatar-roxo",
        texto: texto,
        curtidas: 0,
        curtido: false,
        comentarios: [],
        data: "Agora",
        propria: true
    };

    // ADICIONAR NO INÍCIO DO FEED
    publicacoes.unshift(novaPublicacao);

    salvarPublicacoes();
    mostrarPublicacoes();

    formulario.reset();
    contador.textContent = "0/500 caracteres";

    // IR PARA O FEED
    document.getElementById("feed").scrollIntoView({
        behavior: "smooth"
    });
});

// MOSTRAR PUBLICAÇÕES
function mostrarPublicacoes() {

    listaPostagens.innerHTML = "";

    mensagemVazia.hidden = publicacoes.length !== 0;

    publicacoes.forEach(function(post) {

        const artigo = document.createElement("article");
        artigo.className = "card postagem";
        artigo.dataset.id = post.id;

        // CABEÇALHO
        const cabecalho = document.createElement("div");
        cabecalho.className = "post-header";

        const usuario = document.createElement("div");
        usuario.className = "usuario-info";

        const avatar = document.createElement("div");
        avatar.className = `avatar ${post.classe}`;
        avatar.textContent = post.inicial;

        const informacoes = document.createElement("div");

        const nome = document.createElement("strong");
        nome.textContent = post.nome;

        const data = document.createElement("span");
        data.textContent = post.data;

        informacoes.append(nome, data);
        usuario.append(avatar, informacoes);
        cabecalho.append(usuario);

        // BOTÃO EXCLUIR
        if (post.propria) {
            const excluir = document.createElement("button");
            excluir.className = "botao-excluir";
            excluir.type = "button";
            excluir.dataset.acao = "excluir";
            excluir.textContent = "Excluir";

            cabecalho.append(excluir);
        }

        // TEXTO DA PUBLICAÇÃO
        const texto = document.createElement("div");
        texto.className = "post-texto";

        const paragrafo = document.createElement("p");
        paragrafo.textContent = post.texto;

        texto.append(paragrafo);

        // ESTATÍSTICAS
        const estatisticas = document.createElement("div");
        estatisticas.className = "post-estatisticas";

        const curtidas = document.createElement("span");
        curtidas.className = "quantidade-curtidas";
        curtidas.textContent =
            `${post.curtidas} ${post.curtidas === 1 ? "curtida" : "curtidas"}`;

        const comentarios = document.createElement("span");
        comentarios.className = "quantidade-comentarios";
        comentarios.textContent =
            `${post.comentarios.length} ${post.comentarios.length === 1 ? "comentário" : "comentários"}`;

        estatisticas.append(curtidas, comentarios);

        // BOTÕES DE AÇÃO
        const acoes = document.createElement("div");
        acoes.className = "post-acoes";

        const botaoCurtir = document.createElement("button");
        botaoCurtir.type = "button";
        botaoCurtir.className = post.curtido
            ? "acao-curtir curtido"
            : "acao-curtir";

        botaoCurtir.dataset.acao = "curtir";
        botaoCurtir.textContent = post.curtido
            ? "♥ Curtido"
            : "♡ Curtir";

        const botaoComentar = document.createElement("button");
        botaoComentar.type = "button";
        botaoComentar.className = "acao-comentar";
        botaoComentar.dataset.acao = "comentar";
        botaoComentar.textContent = "◯ Comentar";

        acoes.append(botaoCurtir, botaoComentar);

        // ÁREA DE COMENTÁRIOS
        const areaComentarios = document.createElement("div");
        areaComentarios.className = "area-comentarios";
        areaComentarios.hidden = true;

        const formComentario = document.createElement("form");
        formComentario.className = "form-comentario";

        const inputComentario = document.createElement("input");
        inputComentario.type = "text";
        inputComentario.placeholder = "Escreva um comentário...";
        inputComentario.maxLength = 200;
        inputComentario.required = true;

        const enviarComentario = document.createElement("button");
        enviarComentario.type = "submit";
        enviarComentario.textContent = "Enviar";

        formComentario.append(inputComentario, enviarComentario);

        const listaComentarios = document.createElement("div");
        listaComentarios.className = "lista-comentarios";

        post.comentarios.forEach(function(comentario) {
            const item = document.createElement("div");
            item.className = "comentario";

            const autor = document.createElement("strong");
            autor.textContent = comentario.nome;

            const mensagem = document.createElement("p");
            mensagem.textContent = comentario.texto;

            item.append(autor, mensagem);
            listaComentarios.append(item);
        });

        areaComentarios.append(formComentario, listaComentarios);

        // MONTAR POSTAGEM
        artigo.append(
            cabecalho,
            texto,
            estatisticas,
            acoes,
            areaComentarios
        );

        listaPostagens.append(artigo);

    });
}

// AÇÕES DO FEED
listaPostagens.addEventListener("click", function(evento) {

    const botao = evento.target.closest("button[data-acao]");

    if (!botao) return;

    const artigo = botao.closest(".postagem");
    const id = Number(artigo.dataset.id);

    const post = publicacoes.find(function(item) {
        return item.id === id;
    });

    if (!post) return;

    // CURTIR
    if (botao.dataset.acao === "curtir") {

        post.curtido = !post.curtido;

        if (post.curtido) {
            post.curtidas++;
        } else {
            post.curtidas = Math.max(0, post.curtidas - 1);
        }

        salvarPublicacoes();
        mostrarPublicacoes();
    }

    // ABRIR COMENTÁRIOS
    if (botao.dataset.acao === "comentar") {

        const area = artigo.querySelector(".area-comentarios");

        area.hidden = !area.hidden;

        if (!area.hidden) {
            area.querySelector("input").focus();
        }
    }

    // EXCLUIR PUBLICAÇÃO
    if (botao.dataset.acao === "excluir") {

        const confirmar = confirm(
            "Deseja realmente excluir esta publicação?"
        );

        if (confirmar) {
            publicacoes = publicacoes.filter(function(item) {
                return item.id !== id;
            });

            salvarPublicacoes();
            mostrarPublicacoes();
        }
    }

});

// ADICIONAR COMENTÁRIOS
listaPostagens.addEventListener("submit", function(evento) {

    if (!evento.target.matches(".form-comentario")) {
        return;
    }

    evento.preventDefault();

    const artigo = evento.target.closest(".postagem");
    const id = Number(artigo.dataset.id);

    const post = publicacoes.find(function(item) {
        return item.id === id;
    });

    if (!post) return;

    const campo = evento.target.querySelector("input");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    post.comentarios.push({
        nome: "Você",
        texto: texto
    });

    salvarPublicacoes();
    mostrarPublicacoes();

    // REABRIR A ÁREA DE COMENTÁRIOS
    const postagemAtual = listaPostagens.querySelector(
        `[data-id="${id}"]`
    );

    postagemAtual.querySelector(".area-comentarios").hidden = false;

});

// INICIAR O FEED
mostrarPublicacoes();

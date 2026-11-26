
// =====================================
// INTER-KNOT - ZENLESS ZONE ZERO
// JAVASCRIPT REFORMULADO
// =====================================

// ELEMENTOS PRINCIPAIS

const feed = document.getElementById("feed");
const postText = document.getElementById("postText");
const search = document.getElementById("search");

const nomeUsuario = "Proxy";
const usuario = "@proxy";
const avatarUsuario = "https://i.pravatar.cc/100?img=12";


// =====================================
// 1. PUBLICAR MENSAGEM
// =====================================

function publicar() {

    const texto = postText.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    // Criar publicação
    const post = document.createElement("article");
    post.classList.add("post");

    // Criar cabeçalho do usuário
    const user = document.createElement("div");
    user.classList.add("user");

    const avatar = document.createElement("img");
    avatar.src = avatarUsuario;
    avatar.alt = "Avatar do Proxy";
    avatar.classList.add("avatar");

    const informacoes = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = nomeUsuario;

    const identificacao = document.createElement("p");
    identificacao.textContent = usuario;

    informacoes.appendChild(nome);
    informacoes.appendChild(identificacao);

    user.appendChild(avatar);
    user.appendChild(informacoes);

    // Criar conteúdo
    const conteudo = document.createElement("div");
    conteudo.classList.add("post-content");

    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;

    conteudo.appendChild(paragrafo);

    // Criar ações
    const acoes = document.createElement("div");
    acoes.classList.add("post-actions");

    const botaoCurtir = document.createElement("button");
    botaoCurtir.classList.add("action");
    botaoCurtir.innerHTML = '❤️ Curtir <span>0</span>';

    botaoCurtir.addEventListener("click", function() {
        curtir(this);
    });

    const botaoComentar = document.createElement("button");
    botaoComentar.classList.add("action");
    botaoComentar.textContent = "💬 Comentar";

    botaoComentar.addEventListener("click", function() {
        mostrarComentario(this);
    });

    acoes.appendChild(botaoCurtir);
    acoes.appendChild(botaoComentar);

    // Área dos comentários
    const comentarios = document.createElement("div");
    comentarios.classList.add("comments");

    // Montar publicação
    post.appendChild(user);
    post.appendChild(conteudo);
    post.appendChild(acoes);
    post.appendChild(comentarios);

    // Colocar no início do feed
    feed.prepend(post);

    // Limpar campo
    postText.value = "";

    // Atualizar pesquisa
    pesquisarPublicacoes();
}


// =====================================
// 2. CURTIR E DESCURTIR
// =====================================

function curtir(botao) {

    const contador = botao.querySelector("span");

    let quantidade = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {

        quantidade--;

        botao.classList.remove("curtido");
        botao.innerHTML = '❤️ Curtir <span>' + quantidade + '</span>';

    } else {

        quantidade++;

        botao.classList.add("curtido");
        botao.innerHTML = '❤️ Curtido <span>' + quantidade + '</span>';

    }

}


// =====================================
// 3. ADICIONAR COMENTÁRIOS
// =====================================

function mostrarComentario(botao) {

    const publicacao = botao.closest(".post");
    const areaComentarios = publicacao.querySelector(".comments");

    // Verificar se o campo já existe
    if (areaComentarios.querySelector("input")) {
        areaComentarios.querySelector("input").focus();
        return;
    }

    // Criar campo de comentário
    const campo = document.createElement("input");

    campo.type = "text";
    campo.placeholder = "Escreva um comentário...";

    const botaoEnviar = document.createElement("button");

    botaoEnviar.classList.add("action");
    botaoEnviar.textContent = "Enviar";

    // Função de envio
    function enviarComentario() {

        const texto = campo.value.trim();

        if (texto === "") {
            alert("Digite um comentário!");
            return;
        }

        const comentario = document.createElement("div");
        comentario.classList.add("comment-item");

        const nome = document.createElement("strong");
        nome.textContent = nomeUsuario + ": ";

        const mensagem = document.createElement("span");
        mensagem.textContent = texto;

        comentario.appendChild(nome);
        comentario.appendChild(mensagem);

        areaComentarios.appendChild(comentario);

        campo.value = "";
        campo.focus();
    }

    botaoEnviar.addEventListener("click", enviarComentario);

    campo.addEventListener("keydown", function(evento) {

        if (evento.key === "Enter") {
            enviarComentario();
        }

    });

    areaComentarios.appendChild(campo);
    areaComentarios.appendChild(botaoEnviar);

    campo.focus();

}


// =====================================
// 4. PESQUISAR PUBLICAÇÕES
// =====================================

function pesquisarPublicacoes() {

    const termo = search.value.toLowerCase().trim();

    const publicacoes = feed.querySelectorAll(".post");

    let encontradas = 0;

    publicacoes.forEach(function(publicacao) {

        const conteudo = publicacao
            .querySelector(".post-content")
            .textContent.toLowerCase();

        const nome = publicacao
            .querySelector(".user")
            .textContent.toLowerCase();

        if (conteudo.includes(termo) || nome.includes(termo)) {

            publicacao.style.display = "";

            encontradas++;

        } else {

            publicacao.style.display = "none";

        }

    });

    // Mensagem quando não houver resultados
    let mensagem = document.getElementById("semResultado");

    if (mensagem) {
        mensagem.remove();
    }

    if (encontradas === 0) {

        mensagem = document.createElement("div");

        mensagem.id = "semResultado";
        mensagem.classList.add("sem-resultado");

        mensagem.textContent = "Nenhuma publicação encontrada.";

        feed.appendChild(mensagem);

    }

}


// =====================================
// 5. ATIVAR A PESQUISA
// =====================================

search.addEventListener("input", pesquisarPublicacoes);


// =====================================
// 6. PUBLICAR COM CTRL + ENTER
// =====================================

postText.addEventListener("keydown", function(evento) {

    if (evento.ctrlKey && evento.key === "Enter") {
        publicar();
    }

});


// =====================================
// 7. INICIALIZAR O FEED
// =====================================

pesquisarPublicacoes();

console.log("Inter-Knot carregada com sucesso!");

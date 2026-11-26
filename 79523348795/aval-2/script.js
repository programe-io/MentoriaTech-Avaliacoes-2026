
// ELEMENTOS PRINCIPAIS
const formularioPost = document.getElementById("post-form");
const campoPost = document.getElementById("post-input");
const feed = document.querySelector(".feed");


// FUNÇÃO PARA CURTIR
function configurarCurtidas(post) {

    const botao = post.querySelector(".like-button");
    const contador = post.querySelector(".like-count");

    let curtido = false;
    let quantidade = 0;

    botao.addEventListener("click", function() {

        curtido = !curtido;

        if (curtido) {
            quantidade++;
            botao.classList.add("liked");
            botao.firstChild.textContent = "♥ Curtir ";
        } else {
            quantidade--;
            botao.classList.remove("liked");
            botao.firstChild.textContent = "♡ Curtir ";
        }

        contador.textContent = quantidade;

    });

}


// FUNÇÃO PARA COMENTÁRIOS
function configurarComentarios(post) {

    const botao = post.querySelector(".comment-toggle");
    const area = post.querySelector(".comments");
    const formulario = post.querySelector(".comment-form");
    const campo = formulario.querySelector("input");
    const lista = post.querySelector(".comment-list");


    // MOSTRAR COMENTÁRIOS
    botao.addEventListener("click", function() {

        area.classList.toggle("active");

    });


    // ENVIAR COMENTÁRIO
    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        const texto = campo.value.trim();

        if (texto === "") {
            return;
        }

        const comentario = document.createElement("div");

        comentario.classList.add("comment");

        const nome = document.createElement("strong");
        nome.textContent = "Alexandre: ";

        comentario.appendChild(nome);

        comentario.appendChild(
            document.createTextNode(texto)
        );

        lista.appendChild(comentario);

        campo.value = "";

    });

}


// CONFIGURAR UMA PUBLICAÇÃO
function configurarPostagem(post) {

    configurarCurtidas(post);
    configurarComentarios(post);

}


// CONFIGURAR PUBLICAÇÕES EXISTENTES
document.querySelectorAll(".post").forEach(function(post) {

    configurarPostagem(post);

});


// CRIAR NOVA PUBLICAÇÃO
formularioPost.addEventListener("submit", function(event) {

    event.preventDefault();

    const texto = campoPost.value.trim();

    if (texto === "") {
        return;
    }

    // ARTICLE
    const postagem = document.createElement("article");

    postagem.classList.add("post", "card");


    // CABEÇALHO
    const cabecalho = document.createElement("div");

    cabecalho.classList.add("post-header");

    const avatar = document.createElement("div");

    avatar.classList.add("avatar");
    avatar.textContent = "A";

    const usuario = document.createElement("div");

    usuario.classList.add("user-info");

    const nome = document.createElement("strong");

    nome.textContent = "Alexandre";

    const data = document.createElement("span");

    data.textContent = "Agora mesmo";

    usuario.appendChild(nome);
    usuario.appendChild(data);

    cabecalho.appendChild(avatar);
    cabecalho.appendChild(usuario);


    // TEXTO
    const textoPost = document.createElement("div");

    textoPost.classList.add("post-text");
    textoPost.textContent = texto;


    // AÇÕES
    const acoes = document.createElement("div");

    acoes.classList.add("post-actions");

    const curtir = document.createElement("button");

    curtir.classList.add("like-button");
    curtir.append("♡ Curtir ");

    const contador = document.createElement("span");

    contador.classList.add("like-count");
    contador.textContent = "0";

    curtir.appendChild(contador);


    const comentar = document.createElement("button");

    comentar.classList.add("comment-toggle");
    comentar.textContent = "💬 Comentar";

    acoes.appendChild(curtir);
    acoes.appendChild(comentar);


    // COMENTÁRIOS
    const comentarios = document.createElement("div");

    comentarios.classList.add("comments");

    const lista = document.createElement("div");

    lista.classList.add("comment-list");

    const formularioComentario = document.createElement("form");

    formularioComentario.classList.add("comment-form");

    const campoComentario = document.createElement("input");

    campoComentario.type = "text";
    campoComentario.placeholder = "Escreva um comentário...";
    campoComentario.required = true;

    const enviar = document.createElement("button");

    enviar.type = "submit";
    enviar.textContent = "Enviar";

    formularioComentario.appendChild(campoComentario);
    formularioComentario.appendChild(enviar);

    comentarios.appendChild(lista);
    comentarios.appendChild(formularioComentario);


    // MONTAR POSTAGEM
    postagem.appendChild(cabecalho);
    postagem.appendChild(textoPost);
    postagem.appendChild(acoes);
    postagem.appendChild(comentarios);


    // INSERIR NO INÍCIO DO FEED
    const primeira = feed.querySelector(".post");

    feed.insertBefore(postagem, primeira);


    // ATIVAR FUNCIONALIDADES
    configurarPostagem(postagem);


    // LIMPAR CAMPO
    campoPost.value = "";

});

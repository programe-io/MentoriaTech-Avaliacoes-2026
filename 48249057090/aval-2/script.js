
// CURTIR PUBLICAÇÕES

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        button.classList.toggle("liked");

        const post = button.closest(".post");

        const likes = post.querySelector(".likes");

        let quantidade = Number(
            likes.dataset.count ||
            likes.textContent.match(/\d+/)[0]
        );

        if (button.classList.contains("liked")) {

            quantidade++;

            button.textContent = "♥ Curtido";

        } else {

            quantidade--;

            button.textContent = "♡ Curtir";

        }

        likes.dataset.count = quantidade;

        likes.textContent = quantidade + " curtidas";

    });

});


// ADICIONAR COMENTÁRIOS

const commentForms = document.querySelectorAll(".comment-form");

commentForms.forEach(function(form) {

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const input = form.querySelector("input");

        const texto = input.value.trim();

        if (texto === "") {
            return;
        }

        const post = form.closest(".post");

        const comments = post.querySelector(".comments");

        const novoComentario = document.createElement("p");

        novoComentario.textContent = "👤 " + texto;

        comments.appendChild(novoComentario);

        input.value = "";

    });

});


// CRIAR NOVA PUBLICAÇÃO

const postForm = document.getElementById("postForm");

postForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("username").value;

    const descricao = document.getElementById("description").value;

    const imagem = document.getElementById("imageUrl").value;

    const feed = document.querySelector(".feed");

    const novoPost = document.createElement("article");

    novoPost.className = "post";

    const cabecalho = document.createElement("div");

    cabecalho.className = "post-header";

    const avatar = document.createElement("div");

    avatar.className = "avatar";

    avatar.textContent = nome.charAt(0).toUpperCase();

    const dados = document.createElement("div");

    const nomeUsuario = document.createElement("h3");

    nomeUsuario.textContent = nome;

    const horario = document.createElement("small");

    horario.textContent = "Agora";

    dados.appendChild(nomeUsuario);

    dados.appendChild(horario);

    cabecalho.appendChild(avatar);

    cabecalho.appendChild(dados);

    const foto = document.createElement("img");

    foto.className = "post-image";

    foto.src = imagem;

    foto.alt = "Look publicado por " + nome;

    const acoes = document.createElement("div");

    acoes.className = "post-actions";

    const curtir = document.createElement("button");

    curtir.className = "like-btn";

    curtir.textContent = "♡ Curtir";

    const comentar = document.createElement("button");

    comentar.className = "comment-btn";

    comentar.textContent = "💬 Comentar";

    acoes.appendChild(curtir);

    acoes.appendChild(comentar);

    const likes = document.createElement("p");

    likes.className = "likes";

    likes.dataset.count = "0";

    likes.textContent = "0 curtidas";

    const textoDescricao = document.createElement("p");

    textoDescricao.className = "description";

    textoDescricao.textContent = descricao;

    const comentarios = document.createElement("div");

    comentarios.className = "comments";

    const formularioComentario = document.createElement("form");

    formularioComentario.className = "comment-form";

    const campoComentario = document.createElement("input");

    campoComentario.type = "text";

    campoComentario.placeholder = "Escreva um comentário...";

    campoComentario.required = true;

    const enviarComentario = document.createElement("button");

    enviarComentario.type = "submit";

    enviarComentario.textContent = "Enviar";

    formularioComentario.appendChild(campoComentario);

    formularioComentario.appendChild(enviarComentario);

    novoPost.appendChild(cabecalho);

    novoPost.appendChild(foto);

    novoPost.appendChild(acoes);

    novoPost.appendChild(likes);

    novoPost.appendChild(textoDescricao);

    novoPost.appendChild(comentarios);

    novoPost.appendChild(formularioComentario);

    // ADICIONAR O NOVO POST NO INÍCIO DO FEED

    feed.insertBefore(novoPost, feed.querySelector(".new-post").nextSibling);

    // ATIVAR CURTIDAS E COMENTÁRIOS DO NOVO POST

    ativarInteracoes(novoPost);

    postForm.reset();

});


// FUNÇÃO PARA ATIVAR INTERAÇÕES

function ativarInteracoes(post) {

    const botaoCurtir = post.querySelector(".like-btn");

    botaoCurtir.addEventListener("click", function() {

        botaoCurtir.classList.toggle("liked");

        const likes = post.querySelector(".likes");

        let quantidade = Number(likes.dataset.count || 0);

        if (botaoCurtir.classList.contains("liked")) {

            quantidade++;

            botaoCurtir.textContent = "♥ Curtido";

        } else {

            quantidade--;

            botaoCurtir.textContent = "♡ Curtir";

        }

        likes.dataset.count = quantidade;

        likes.textContent = quantidade + " curtidas";

    });

    const formulario = post.querySelector(".comment-form");

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        const input = formulario.querySelector("input");

        if (input.value.trim() === "") {
            return;
        }

        const comentario = document.createElement("p");

        comentario.textContent = "👤 " + input.value.trim();

        post.querySelector(".comments").appendChild(comentario);

        input.value = "";

    });

}


// PESQUISAR PUBLICAÇÕES

const search = document.getElementById("search");

search.addEventListener("input", function() {

    const termo = search.value.toLowerCase();

    const posts = document.querySelectorAll(".post");

    posts.forEach(function(post) {

        const conteudo = post.textContent.toLowerCase();

        post.style.display =
            conteudo.includes(termo) ? "block" : "none";

    });

});

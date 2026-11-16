
// FORMULÁRIO DE NOVA PUBLICAÇÃO

const postForm = document.getElementById("postForm");
const feed = document.getElementById("feed");

// PUBLICAR

postForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const texto = document.getElementById("postText").value.trim();
    const imagem = document.getElementById("postImage").value.trim();

    if (texto === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    // Criar postagem

    const post = document.createElement("article");
    post.className = "post";

    // Cabeçalho

    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "U";

    const usuario = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = "Meu Usuário";

    const tempo = document.createElement("span");
    tempo.textContent = "Agora mesmo";

    usuario.appendChild(nome);
    usuario.appendChild(tempo);

    cabecalho.appendChild(avatar);
    cabecalho.appendChild(usuario);

    // Texto da postagem

    const textoPost = document.createElement("p");
    textoPost.className = "post-text";
    textoPost.textContent = texto;

    post.appendChild(cabecalho);
    post.appendChild(textoPost);

    // Imagem opcional

    if (imagem !== "") {

        try {
            const endereco = new URL(imagem);

            if (!["http:", "https:"].includes(endereco.protocol)) {
                alert("Informe um link de imagem válido.");
                return;
            }

            const img = document.createElement("img");

            img.className = "post-image";
            img.src = endereco.href;
            img.alt = "Imagem da publicação";

            post.appendChild(img);

        } catch {
            alert("O endereço da imagem não é válido.");
            return;
        }
    }

    // Botões de ação

    const acoes = document.createElement("div");
    acoes.className = "post-actions";

    const curtir = document.createElement("button");
    curtir.className = "like-button";
    curtir.innerHTML = "♡ Curtir <span>0</span>";

    const comentar = document.createElement("button");
    comentar.className = "comment-button";
    comentar.textContent = "💬 Comentar";

    acoes.appendChild(curtir);
    acoes.appendChild(comentar);

    post.appendChild(acoes);

    // Área de comentários

    const areaComentarios = document.createElement("div");
    areaComentarios.className = "comment-area";

    const listaComentarios = document.createElement("div");
    listaComentarios.className = "comments";

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

    areaComentarios.appendChild(listaComentarios);
    areaComentarios.appendChild(formularioComentario);

    post.appendChild(areaComentarios);

    // Colocar a postagem no início do feed

    feed.prepend(post);

    // Limpar formulário

    postForm.reset();

    alert("Publicação realizada com sucesso!");

});


// CURTIR E ABRIR COMENTÁRIOS

feed.addEventListener("click", function(event) {

    // CURTIR

    const botaoCurtir = event.target.closest(".like-button");

    if (botaoCurtir && feed.contains(botaoCurtir)) {

        const contador = botaoCurtir.querySelector("span");

        let quantidade = Number(contador.textContent);

        if (botaoCurtir.classList.contains("liked")) {

            quantidade--;

            botaoCurtir.classList.remove("liked");

            botaoCurtir.firstChild.textContent = "♡ Curtir ";

        } else {

            quantidade++;

            botaoCurtir.classList.add("liked");

            botaoCurtir.firstChild.textContent = "♥ Curtido ";

        }

        contador.textContent = quantidade;

    }

    // ABRIR COMENTÁRIOS

    const botaoComentar = event.target.closest(".comment-button");

    if (botaoComentar && feed.contains(botaoComentar)) {

        const postagem = botaoComentar.closest(".post");

        const area = postagem.querySelector(".comment-area");

        area.classList.toggle("active");

    }

});


// ENVIAR COMENTÁRIOS

feed.addEventListener("submit", function(event) {

    if (!event.target.matches(".comment-form")) {
        return;
    }

    event.preventDefault();

    const formulario = event.target;

    const campo = formulario.querySelector("input");

    const mensagem = campo.value.trim();

    if (mensagem === "") {
        alert("Digite um comentário!");
        return;
    }

    const postagem = formulario.closest(".post");

    const lista = postagem.querySelector(".comments");

    const comentario = document.createElement("div");

    comentario.className = "comment";

    comentario.textContent = "Você: " + mensagem;

    lista.appendChild(comentario);

    campo.value = "";

});

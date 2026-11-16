
const botaoPublicar = document.getElementById("publicar");
const textoPost = document.getElementById("texto-post");
const imagemPost = document.getElementById("imagem-post");
const listaPosts = document.getElementById("lista-posts");

// PUBLICAR UMA NOVA POSTAGEM

botaoPublicar.addEventListener("click", function() {

    const texto = textoPost.value.trim();
    const imagem = imagemPost.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        textoPost.focus();
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
    avatar.textContent = "K";

    const usuario = document.createElement("div");
    usuario.className = "user-info";

    const nome = document.createElement("strong");
    nome.textContent = "Meu Perfil";

    const tempo = document.createElement("span");
    tempo.textContent = "Agora";

    usuario.append(nome, tempo);
    cabecalho.append(avatar, usuario);

    // Texto
    const paragrafo = document.createElement("p");
    paragrafo.className = "post-text";
    paragrafo.textContent = texto;

    post.append(cabecalho, paragrafo);

    // Imagem opcional
    if (imagem !== "") {

        try {
            const url = new URL(imagem);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error("Endereço inválido");
            }

            const foto = document.createElement("img");
            foto.className = "post-image";
            foto.src = url.href;
            foto.alt = "Imagem da publicação";
            foto.onerror = function() {
                foto.remove();
                alert("Não foi possível carregar essa imagem.");
            };

            post.appendChild(foto);

        } catch (erro) {
            alert("Digite um link de imagem válido.");
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

    acoes.append(curtir, comentar);
    post.appendChild(acoes);

    // Área dos comentários
    const comentarios = document.createElement("div");
    comentarios.className = "comments";

    post.appendChild(comentarios);

    // Adicionar ao início do feed
    listaPosts.prepend(post);

    // Limpar campos
    textoPost.value = "";
    imagemPost.value = "";

    alert("Publicação realizada com sucesso!");

});

// CURTIR PUBLICAÇÕES

document.addEventListener("click", function(event) {

    if (event.target.closest(".like-button")) {

        const botao = event.target.closest(".like-button");
        const contador = botao.querySelector("span");

        let quantidade = Number(contador.textContent);

        if (botao.classList.contains("liked")) {

            quantidade--;
            botao.classList.remove("liked");
            botao.firstChild.textContent = "♡ Curtir ";

        } else {

            quantidade++;
            botao.classList.add("liked");
            botao.firstChild.textContent = "♥ Curtido ";

        }

        contador.textContent = quantidade;
    }

});

// COMENTAR PUBLICAÇÕES

document.addEventListener("click", function(event) {

    if (event.target.closest(".comment-button")) {

        const botao = event.target.closest(".comment-button");
        const post = botao.closest(".post");
        const comentarios = post.querySelector(".comments");

        const texto = prompt("Digite seu comentário:");

        if (texto && texto.trim() !== "") {

            const comentario = document.createElement("div");
            comentario.className = "comment-item";

            comentario.textContent = "Você: " + texto.trim();

            comentarios.appendChild(comentario);

        }

    }

});

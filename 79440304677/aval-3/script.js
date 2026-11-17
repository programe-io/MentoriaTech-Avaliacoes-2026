
// CURTIR PUBLICAÇÃO
function curtir(elemento) {
    if (elemento.innerText === "🤍") {
        elemento.innerText = "❤️";
    } else {
        elemento.innerText = "🤍";
    }
}

// FOCAR NO CAMPO DE COMENTÁRIO
function comentar(elemento) {
    const input = elemento.closest(".post")
        .querySelector(".comment-box input");

    input.focus();
}

// PUBLICAR COMENTÁRIO
function enviarComentario(botao) {
    const input = botao.previousElementSibling;
    const texto = input.value.trim();

    if (texto === "") return;

    const comentarios = botao.closest(".post")
        .querySelector(".comments");

    const novo = document.createElement("p");
    novo.style.padding = "5px 12px";

    const usuario = document.createElement("b");
    usuario.textContent = "Você: ";

    novo.append(usuario, document.createTextNode(texto));

    comentarios.appendChild(novo);

    input.value = "";
}

// CRIAR PUBLICAÇÃO
function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const legenda = document.getElementById("legenda").value;
    const arquivo = document.getElementById("foto").files[0];

    if (!nome || !arquivo) {
        alert("Digite seu nome e escolha uma foto!");
        return;
    }

    const imagem = URL.createObjectURL(arquivo);

    const post = document.createElement("div");
    post.className = "post";

    // CABEÇALHO
    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";

    const usuario = document.createElement("b");
    usuario.textContent = nome;

    cabecalho.append(avatar, usuario);

    // FOTO
    const foto = document.createElement("img");
    foto.className = "post-image";
    foto.src = imagem;

    // AÇÕES
    const acoes = document.createElement("div");
    acoes.className = "actions";

    const like = document.createElement("span");
    like.textContent = "🤍";
    like.onclick = () => curtir(like);

    const comentarioIcone = document.createElement("span");
    comentarioIcone.textContent = "💬";
    comentarioIcone.onclick = () => {
        campoComentario.focus();
    };

    const compartilhar = document.createElement("span");
    compartilhar.textContent = "📤";

    acoes.append(like, comentarioIcone, compartilhar);

    // CURTIDAS
    const curtidas = document.createElement("div");
    curtidas.className = "likes";
    curtidas.textContent = "❤️ 0 curtidas";

    // LEGENDA
    const legendaPost = document.createElement("div");
    legendaPost.className = "caption";

    const nomeLegenda = document.createElement("b");
    nomeLegenda.textContent = nome;

    legendaPost.append(
        nomeLegenda,
        document.createTextNode(" " + legenda)
    );

    // COMENTÁRIOS
    const comentarios = document.createElement("div");
    comentarios.className = "comments";

    // CAMPO DE COMENTÁRIO
    const caixa = document.createElement("div");
    caixa.className = "comment-box";

    const campoComentario = document.createElement("input");
    campoComentario.placeholder = "Adicione um comentário...";

    const enviar = document.createElement("button");
    enviar.textContent = "Publicar";
    enviar.onclick = () => enviarComentario(enviar);

    caixa.append(campoComentario, enviar);

    // ADICIONAR AO FEED
    post.append(
        cabecalho,
        foto,
        acoes,
        curtidas,
        legendaPost,
        comentarios,
        caixa
    );

    document.getElementById("feed").prepend(post);

    // LIMPAR FORMULÁRIO
    document.getElementById("nome").value = "";
    document.getElementById("legenda").value = "";
    document.getElementById("foto").value = "";
}

// PESQUISAR PUBLICAÇÕES
document.querySelector(".search").addEventListener("input", function() {
    const pesquisa = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        const conteudo = post.innerText.toLowerCase();

        post.style.display = conteudo.includes(pesquisa)
            ? "block"
            : "none";
    });
});
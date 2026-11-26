
// ABRIR E FECHAR MODAL
function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

// CURTIR PUBLICAÇÃO
function curtir(botao) {
    const post = botao.closest(".post");
    const contador = post.querySelector(".likes span");

    let quantidade = Number(contador.textContent);

    if (botao.textContent === "♡") {
        quantidade++;
        botao.textContent = "❤️";
    } else {
        quantidade--;
        botao.textContent = "♡";
    }

    contador.textContent = quantidade;
}

// SALVAR PUBLICAÇÃO
function salvar(botao) {
    if (botao.textContent === "♧") {
        botao.textContent = "🔖";
        alert("Publicação salva!");
    } else {
        botao.textContent = "♧";
        alert("Publicação removida dos salvos!");
    }
}

// COMENTAR
function comentar(botao) {
    const post = botao.closest(".post");
    post.querySelector(".comment-box input").focus();
}

// ENVIAR COMENTÁRIO
function enviarComentario(botao) {
    const caixa = botao.parentElement;
    const input = caixa.querySelector("input");
    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const comentario = document.createElement("p");
    comentario.style.padding = "10px 15px";
    comentario.style.fontSize = "13px";

    const nome = document.createElement("strong");
    nome.textContent = "Você: ";

    comentario.append(nome, document.createTextNode(texto));

    caixa.parentElement.insertBefore(comentario, caixa);
    input.value = "";
}

// COMPARTILHAR
function compartilhar() {
    if (navigator.share) {
        navigator.share({
            title: "TravelGram",
            text: "Confira esta viagem incrível!"
        });
    } else {
        alert("Compartilhe esta publicação com seus amigos!");
    }
}

// SEGUIR USUÁRIO
function seguir(botao) {
    if (botao.textContent === "Seguir") {
        botao.textContent = "Seguindo";
        botao.style.color = "#888";
    } else {
        botao.textContent = "Seguir";
        botao.style.color = "#00a896";
    }
}

// CRIAR PUBLICAÇÃO
function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const local = document.getElementById("local").value.trim();
    const imagem = document.getElementById("imagem").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    if (!nome || !local || !imagem || !descricao) {
        alert("Preencha todos os campos!");
        return;
    }

    let url;

    try {
        url = new URL(imagem);
        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error();
        }
    } catch {
        alert("Informe um endereço de imagem válido!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Foto de perfil";

    const dados = document.createElement("div");
    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const endereco = document.createElement("span");
    endereco.textContent = "📍 " + local;

    dados.append(titulo, endereco);
    cabecalho.append(avatar, dados);

    const foto = document.createElement("img");
    foto.className = "post-image";
    foto.src = url.href;
    foto.alt = "Foto da viagem";

    const acoes = document.createElement("div");
    acoes.className = "post-actions";

    const like = document.createElement("button");
    like.textContent = "♡";
    like.onclick = () => curtir(like);

    const comment = document.createElement("button");
    comment.textContent = "💬";
    comment.onclick = () => comentar(comment);

    const share = document.createElement("button");
    share.textContent = "➤";
    share.onclick = compartilhar;

    const save = document.createElement("button");
    save.textContent = "♧";
    save.className = "save";
    save.onclick = () => salvar(save);

    acoes.append(like, comment, share, save);

    const info = document.createElement("div");
    info.className = "post-info";

    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "❤️ ";

    const contador = document.createElement("span");
    contador.textContent = "0";

    likes.append(contador, " curtidas");

    const legenda = document.createElement("p");
    const autor = document.createElement("strong");
    autor.textContent = nome;
    legenda.append(autor, " " + descricao);

    const data = document.createElement("small");
    data.textContent = "AGORA";

    info.append(likes, legenda, data);

    const caixa = document.createElement("div");
    caixa.className = "comment-box";

    const campo = document.createElement("input");
    campo.placeholder = "Adicione um comentário...";

    const enviar = document.createElement("button");
    enviar.textContent = "Publicar";
    enviar.onclick = () => enviarComentario(enviar);

    caixa.append(campo, enviar);

    post.append(cabecalho, foto, acoes, info, caixa);

    document.querySelector(".feed").prepend(post);

    fecharModal();

    document.querySelectorAll("#modal input, #modal textarea")
        .forEach(campo => campo.value = "");

    alert("Publicação compartilhada com sucesso!");
}


/* CURTIR PUBLICAÇÃO */

function curtir(botao) {

    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = Number(
        likes.textContent.match(/\d+/)?.[0] || 0
    );

    const curtido = botao.dataset.curtido === "true";

    if (curtido) {
        quantidade--;
        botao.textContent = "🤍";
        botao.dataset.curtido = "false";
    } else {
        quantidade++;
        botao.textContent = "❤️";
        botao.dataset.curtido = "true";
    }

    likes.textContent = quantidade + " curtidas";
}


/* COMENTAR */

function comentar(botao) {

    const post = botao.closest(".post");

    const input = post.querySelector(
        ".comentario-input input"
    );

    const area = post.querySelector(".comentarios");

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const comentario = document.createElement("p");

    comentario.textContent = "👤 Você: " + texto;

    area.appendChild(comentario);

    input.value = "";
}


/* FOCAR NO CAMPO DE COMENTÁRIO */

function focarComentario(botao) {

    const post = botao.closest(".post");

    post.querySelector(
        ".comentario-input input"
    ).focus();

}


/* SALVAR PUBLICAÇÃO */

function salvar(botao) {

    const salvo = botao.dataset.salvo === "true";

    if (salvo) {
        botao.textContent = "🔖";
        botao.dataset.salvo = "false";
    } else {
        botao.textContent = "📑";
        botao.dataset.salvo = "true";
    }

}


/* CRIAR PUBLICAÇÃO */

function publicar() {

    const nome = document.getElementById("nome").value.trim();

    const legenda = document.getElementById("legenda").value.trim();

    const imagem = document.getElementById("imagem").value.trim();

    if (!nome || !legenda) {
        alert("Preencha seu nome e a legenda!");
        return;
    }

    let imagemSegura = "";

    if (imagem) {
        try {
            const url = new URL(imagem);

            if (!["http:", "https:"].includes(url.protocol)) {
                alert("URL de imagem inválida!");
                return;
            }

            imagemSegura = url.href;

        } catch {
            alert("Digite uma URL válida!");
            return;
        }
    }

    const post = document.createElement("article");

    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = nome.charAt(0).toUpperCase();

    const usuario = document.createElement("strong");
    usuario.textContent = nome;

    const menu = document.createElement("span");
    menu.textContent = "•••";

    header.append(avatar, usuario, menu);

    const texto = document.createElement("p");
    texto.textContent = legenda;

    const acoes = document.createElement("div");
    acoes.className = "post-actions";

    const like = document.createElement("button");
    like.textContent = "🤍";
    like.onclick = function() {
        curtir(this);
    };

    const comment = document.createElement("button");
    comment.textContent = "💬";
    comment.onclick = function() {
        focarComentario(this);
    };

    const share = document.createElement("button");
    share.textContent = "➤";

    const save = document.createElement("button");
    save.className = "salvar";
    save.textContent = "🔖";
    save.onclick = function() {
        salvar(this);
    };

    acoes.append(like, comment, share, save);

    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    const areaComentario = document.createElement("div");
    areaComentario.className = "comentario-input";

    const inputComentario = document.createElement("input");
    inputComentario.placeholder = "Adicione um comentário...";

    const enviar = document.createElement("button");
    enviar.textContent = "Publicar";
    enviar.onclick = function() {
        comentar(this);
    };

    areaComentario.append(inputComentario, enviar);

    post.append(header);

    if (imagemSegura) {
        const img = document.createElement("img");
        img.className = "post-image";
        img.src = imagemSegura;
        img.alt = "Imagem da publicação";
        img.onerror = () => img.remove();

        post.appendChild(img);
    }

    post.append(
        acoes,
        likes,
        texto,
        comentarios,
        areaComentario
    );

    const feed = document.getElementById("feed");

    feed.prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("legenda").value = "";
    document.getElementById("imagem").value = "";

    alert("Publicação criada com sucesso!");
}

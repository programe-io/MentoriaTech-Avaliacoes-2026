
// CURTIR PUBLICAÇÃO
function curtir(botao) {
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = Number(likes.dataset.quantidade || 120);

    if (botao.classList.contains("curtido")) {
        quantidade--;
        botao.classList.remove("curtido");
        botao.textContent = "♡";
    } else {
        quantidade++;
        botao.classList.add("curtido");
        botao.textContent = "♥";
    }

    likes.dataset.quantidade = quantidade;
    likes.textContent = quantidade + " curtidas";
}

// ABRIR COMENTÁRIOS
function comentar(botao) {
    const post = botao.closest(".post");
    const campo = post.querySelector("input");

    campo.focus();
}

// ENVIAR COMENTÁRIO
function enviarComentario(evento, campo) {
    if (evento.key === "Enter" && campo.value.trim() !== "") {
        const post = campo.closest(".post");
        const comentarios = post.querySelector(".comments");

        comentarios.textContent =
            "Novo comentário: " + campo.value;

        campo.value = "";
    }
}

// ABRIR MODAL
function abrirPublicacao() {
    document.getElementById("modal").style.display = "flex";
}

// FECHAR MODAL
function fecharPublicacao() {
    document.getElementById("modal").style.display = "none";
}

// PUBLICAR FOTO
function publicar() {
    const usuario = document.getElementById("usuario").value.trim();
    const foto = document.getElementById("foto").value.trim();
    const legenda = document.getElementById("legenda").value.trim();

    if (!usuario || !foto) {
        alert("Preencha o usuário e o endereço da imagem!");
        return;
    }

    try {
        const url = new URL(foto);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }
    } catch {
        alert("Digite um endereço de imagem válido!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const nome = document.createElement("strong");
    nome.textContent = usuario;

    header.appendChild(nome);

    const imagem = document.createElement("img");
    imagem.className = "post-image";
    imagem.src = foto;
    imagem.alt = "Publicação de " + usuario;

    imagem.onerror = function() {
        alert("Não foi possível carregar essa imagem.");
        post.remove();
    };

    const conteudo = document.createElement("div");
    conteudo.className = "post-content";

    const likes = document.createElement("strong");
    likes.className = "likes";
    likes.textContent = "0 curtidas";
    likes.dataset.quantidade = "0";

    const texto = document.createElement("p");

    const nomeLegenda = document.createElement("strong");
    nomeLegenda.textContent = usuario + " ";

    texto.appendChild(nomeLegenda);
    texto.appendChild(document.createTextNode(legenda));

    conteudo.appendChild(likes);
    conteudo.appendChild(texto);

    const acoes = document.createElement("div");
    acoes.className = "actions";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "♡";
    botaoCurtir.onclick = function() {
        curtir(this);
    };

    const botaoComentar = document.createElement("button");
    botaoComentar.textContent = "💬";
    botaoComentar.onclick = function() {
        comentar(this);
    };

    acoes.append(botaoCurtir, botaoComentar);

    const campo = document.createElement("input");
    campo.placeholder = "Adicione um comentário...";
    campo.onkeydown = function(evento) {
        enviarComentario(evento, this);
    };

    conteudo.appendChild(campo);

    post.append(header, imagem, acoes, conteudo);
    feed.prepend(post);

    document.getElementById("usuario").value = "";
    document.getElementById("foto").value = "";
    document.getElementById("legenda").value = "";

    fecharPublicacao();

    alert("Publicação criada com sucesso!");
}

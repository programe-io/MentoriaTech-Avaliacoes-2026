
// ABRIR MODAL
function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

// FECHAR MODAL
function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

// CURTIR PUBLICAÇÃO
function curtir(botao) {
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = Number(
        likes.textContent.replace(/\D/g, "")
    );

    if (botao.textContent.includes("♡")) {
        quantidade++;
        botao.textContent = "♥";
        botao.style.color = "red";
    } else {
        quantidade--;
        botao.textContent = "♡";
        botao.style.color = "black";
    }

    likes.textContent = quantidade + " curtidas";
}

// FOCAR NO COMENTÁRIO
function focarComentario(botao) {
    const post = botao.closest(".post");
    post.querySelector("input").focus();
}

// ADICIONAR COMENTÁRIO
function comentar(botao) {
    const post = botao.closest(".post");
    const input = post.querySelector("input");
    const comentarios = post.querySelector(".comentarios");

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const comentario = document.createElement("p");
    comentario.textContent = texto;

    comentarios.appendChild(comentario);

    input.value = "";
}

// CRIAR PUBLICAÇÃO
function criarPost() {
    const usuario = document.getElementById("usuario").value.trim();
    const imagem = document.getElementById("imagem").value.trim();
    const legenda = document.getElementById("legenda").value.trim();

    if (!usuario || !imagem || !legenda) {
        alert("Preencha todos os campos!");
        return;
    }

    // Aceita somente URLs de imagens HTTP ou HTTPS
    try {
        const url = new URL(imagem);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }
    } catch {
        alert("Digite uma URL de imagem válida!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const nome = document.createElement("strong");
    nome.textContent = usuario;

    const opcoes = document.createElement("span");
    opcoes.textContent = "•••";

    cabecalho.append(nome, opcoes);

    const foto = document.createElement("img");
    foto.className = "post-image";
    foto.src = imagem;
    foto.alt = "Imagem publicada";

    const acoes = document.createElement("div");
    acoes.className = "post-actions";

    const curtirBtn = document.createElement("button");
    curtirBtn.textContent = "♡";
    curtirBtn.onclick = function() {
        curtir(this);
    };

    const comentarioBtn = document.createElement("button");
    comentarioBtn.textContent = "💬";
    comentarioBtn.onclick = function() {
        focarComentario(this);
    };

    const compartilharBtn = document.createElement("button");
    compartilharBtn.textContent = "↗";

    acoes.append(curtirBtn, comentarioBtn, compartilharBtn);

    const info = document.createElement("div");
    info.className = "post-info";

    const curtidas = document.createElement("strong");
    curtidas.className = "likes";
    curtidas.textContent = "0 curtidas";

    const texto = document.createElement("p");

    const nomeUsuario = document.createElement("strong");
    nomeUsuario.textContent = usuario;

    texto.append(nomeUsuario, document.createTextNode(" " + legenda));

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    const input = document.createElement("input");
    input.placeholder = "Adicione um comentário...";

    const publicarBtn = document.createElement("button");
    publicarBtn.textContent = "Publicar";
    publicarBtn.onclick = function() {
        comentar(this);
    };

    info.append(curtidas, texto, comentarios, input, publicarBtn);

    post.append(cabecalho, foto, acoes, info);

    document.getElementById("feed").prepend(post);

    document.getElementById("usuario").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("legenda").value = "";

    fecharModal();
}

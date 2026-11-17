
// CURTIR PUBLICAÇÃO

function curtir(botao) {

    const icone = botao.querySelector("i");
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = Number(
        likes.textContent.split(" ")[0]
    );

    if (botao.classList.contains("ativo")) {

        botao.classList.remove("ativo");

        icone.classList.remove("fas");
        icone.classList.add("far");

        quantidade--;

    } else {

        botao.classList.add("ativo");

        icone.classList.remove("far");
        icone.classList.add("fas");

        quantidade++;
    }

    likes.textContent = quantidade + " curtidas";
}


// ABRIR FORMULÁRIO

function mostrarFormulario(event) {

    event.preventDefault();

    document.getElementById("modal").style.display = "flex";
}


// FECHAR FORMULÁRIO

function fecharFormulario() {

    document.getElementById("modal").style.display = "none";
}


// PUBLICAR FOTO

function publicar() {

    const usuario = document.getElementById("usuario").value.trim();

    const imagem = document.getElementById("imagem").value.trim();

    const legenda = document.getElementById("legenda").value.trim();

    if (!usuario || !imagem || !legenda) {

        alert("Preencha todos os campos!");

        return;
    }

    try {
        const url = new URL(imagem);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }

    } catch {
        alert("Digite uma URL de imagem válida!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");

    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Foto de perfil";

    const nome = document.createElement("strong");
    nome.textContent = usuario;

    header.append(avatar, nome);

    const foto = document.createElement("img");
    foto.className = "post-image";
    foto.src = imagem;
    foto.alt = "Publicação de " + usuario;

    const acoes = document.createElement("div");
    acoes.className = "post-actions";

    const grupo = document.createElement("div");

    const botaoCurtir = document.createElement("button");
    botaoCurtir.className = "like";
    botaoCurtir.innerHTML = '<i class="far fa-heart"></i>';
    botaoCurtir.onclick = function() {
        curtir(botaoCurtir);
    };

    const botaoComentario = document.createElement("button");
    botaoComentario.innerHTML = '<i class="far fa-comment"></i>';
    botaoComentario.onclick = function() {
        focarComentario(botaoComentario);
    };

    grupo.append(botaoCurtir, botaoComentario);
    acoes.append(grupo);

    const info = document.createElement("div");
    info.className = "post-info";

    const likes = document.createElement("strong");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    const texto = document.createElement("p");

    const nomeLegenda = document.createElement("strong");
    nomeLegenda.textContent = usuario + " ";

    texto.append(nomeLegenda, document.createTextNode(legenda));

    const comentarioArea = document.createElement("div");
    comentarioArea.className = "comentario-area";

    info.append(likes, texto, comentarioArea);

    post.append(header, foto, acoes, info);

    feed.prepend(post);

    document.getElementById("usuario").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("legenda").value = "";

    fecharFormulario();

    alert("Publicação criada com sucesso!");
}


// FOCO NO CAMPO DE COMENTÁRIO

function focarComentario(botao) {

    const post = botao.closest(".post");
    const area = post.querySelector(".comentario-area");

    if (area.querySelector("input")) {
        area.querySelector("input").focus();
        return;
    }

    const campo = document.createElement("input");
    campo.type = "text";
    campo.placeholder = "Escreva um comentário...";

    campo.style.width = "100%";
    campo.style.padding = "10px";
    campo.style.marginTop = "12px";

    const enviar = document.createElement("button");
    enviar.textContent = "Enviar";
    enviar.style.marginTop = "8px";

    enviar.onclick = function() {

        const texto = campo.value.trim();

        if (!texto) return;

        const comentario = document.createElement("p");
        comentario.textContent = "Você: " + texto;

        area.append(comentario);

        campo.value = "";
    };

    area.append(campo, enviar);

    campo.focus();
}

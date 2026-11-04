
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

        if (url.protocol !== "https:" && url.protocol !== "http:") {
            alert("Digite um link de imagem válido!");
            return;
        }
    } catch {
        alert("Digite um link de imagem válido!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const topo = document.createElement("div");
    topo.className = "post-topo";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";

    const nome = document.createElement("strong");
    nome.textContent = usuario;

    topo.appendChild(avatar);
    topo.appendChild(nome);

    const foto = document.createElement("img");
    foto.className = "foto-post";
    foto.src = url.href;
    foto.alt = "Imagem publicada por " + usuario;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "♡ Curtir";
    botaoCurtir.onclick = function() {
        curtir(botaoCurtir);
    };

    const botaoComentar = document.createElement("button");
    botaoComentar.textContent = "💬 Comentar";
    botaoComentar.onclick = function() {
        focarComentario(botaoComentar);
    };

    const botaoCompartilhar = document.createElement("button");
    botaoCompartilhar.textContent = "↗ Compartilhar";
    botaoCompartilhar.onclick = compartilhar;

    acoes.appendChild(botaoCurtir);
    acoes.appendChild(botaoComentar);
    acoes.appendChild(botaoCompartilhar);

    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    const descricao = document.createElement("p");
    const nomeDescricao = document.createElement("strong");
    nomeDescricao.textContent = usuario + " ";
    descricao.appendChild(nomeDescricao);
    descricao.appendChild(document.createTextNode(legenda));

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    const campo = document.createElement("div");
    campo.className = "campo-comentario";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Adicione um comentário...";

    const enviar = document.createElement("button");
    enviar.textContent = "Enviar";
    enviar.onclick = function() {
        comentar(enviar);
    };

    campo.appendChild(input);
    campo.appendChild(enviar);

    post.appendChild(topo);
    post.appendChild(foto);
    post.appendChild(acoes);
    post.appendChild(likes);
    post.appendChild(descricao);
    post.appendChild(comentarios);
    post.appendChild(campo);

    document.getElementById("feed").prepend(post);

    document.getElementById("usuario").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("legenda").value = "";
}

function curtir(botao) {
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = Number(
        likes.textContent.replace(/\D/g, "")
    );

    if (botao.dataset.curtido === "sim") {
        quantidade--;
        botao.dataset.curtido = "nao";
        botao.textContent = "♡ Curtir";
    } else {
        quantidade++;
        botao.dataset.curtido = "sim";
        botao.textContent = "❤️ Curtido";
    }

    likes.textContent = quantidade + " curtidas";
}

function comentar(botao) {
    const post = botao.closest(".post");
    const input = post.querySelector(".campo-comentario input");
    const comentarios = post.querySelector(".comentarios");

    const mensagem = input.value.trim();

    if (mensagem === "") {
        alert("Digite um comentário!");
        return;
    }

    const novoComentario = document.createElement("p");
    novoComentario.textContent = "Você: " + mensagem;

    comentarios.appendChild(novoComentario);

    input.value = "";
}

function focarComentario(botao) {
    const post = botao.closest(".post");
    post.querySelector(".campo-comentario input").focus();
}

function compartilhar() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert("Link copiado!"))
            .catch(() => alert("Não foi possível copiar o link."));
    } else {
        alert("Copie o endereço do site para compartilhar.");
    }
}

function curtir(botao) {
    const post = botao.closest(".post");
    const contador = post.querySelector(".curtidas");

    let quantidade = Number(
        contador.dataset.quantidade || 0
    );

    if (botao.dataset.curtido === "sim") {
        quantidade--;
        botao.dataset.curtido = "nao";
        botao.style.color = "";
    } else {
        quantidade++;
        botao.dataset.curtido = "sim";
        botao.style.color = "#ff0000";
    }

    contador.dataset.quantidade = quantidade;
    contador.textContent = quantidade + " curtidas";
}

function comentar(botao) {
    const post = botao.closest(".post");
    const campo = post.querySelector(".comentar input");
    const lista = post.querySelector(".comentarios");

    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const comentario = document.createElement("p");
    comentario.textContent = "💬 " + texto;

    lista.appendChild(comentario);

    campo.value = "";
}

function focarComentario(botao) {
    const post = botao.closest(".post");
    post.querySelector(".comentar input").focus();
}

function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const legenda = document.getElementById("legenda").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (nome === "" || legenda === "") {
        alert("Preencha seu nome e sua legenda!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    const usuario = document.createElement("div");
    usuario.className = "usuario";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "🌸";

    const nomeUsuario = document.createElement("strong");
    nomeUsuario.textContent = nome;

    usuario.appendChild(avatar);
    usuario.appendChild(nomeUsuario);

    post.appendChild(usuario);

    if (imagem !== "") {
        const foto = document.createElement("img");
        foto.className = "foto-post";
        foto.src = imagem;
        foto.alt = "Imagem da publicação";

        post.appendChild(foto);
    }

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "❤️";
    botaoCurtir.onclick = function() {
        curtir(this);
    };

    const botaoComentario = document.createElement("button");
    botaoComentario.textContent = "💬";
    botaoComentario.onclick = function() {
        focarComentario(this);
    };

    acoes.appendChild(botaoCurtir);
    acoes.appendChild(botaoComentario);

    post.appendChild(acoes);

    const curtidas = document.createElement("p");
    curtidas.className = "curtidas";
    curtidas.textContent = "0 curtidas";

    post.appendChild(curtidas);

    const texto = document.createElement("p");
    texto.className = "legenda";

    const nomeTexto = document.createElement("strong");
    nomeTexto.textContent = nome + " ";

    texto.appendChild(nomeTexto);
    texto.appendChild(document.createTextNode(legenda));

    post.appendChild(texto);

    const lista = document.createElement("div");
    lista.className = "comentarios";

    post.appendChild(lista);

    const area = document.createElement("div");
    area.className = "comentar";

    const campo = document.createElement("input");
    campo.placeholder = "Adicione um comentário...";

    const botaoEnviar = document.createElement("button");
    botaoEnviar.textContent = "Enviar";
    botaoEnviar.onclick = function() {
        comentar(this);
    };

    area.appendChild(campo);
    area.appendChild(botaoEnviar);

    post.appendChild(area);

    feed.prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("legenda").value = "";
    document.getElementById("imagem").value = "";
}
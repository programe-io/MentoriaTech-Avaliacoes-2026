
// Criar uma nova publicação
function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const texto = document.getElementById("texto").value.trim();

    if (nome === "" || texto === "") {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const mensagem = document.createElement("p");
    mensagem.textContent = texto;

    const botaoCurtir = document.createElement("button");
    botaoCurtir.innerHTML = '❤️ Curtir <span>0</span>';
    botaoCurtir.onclick = function() {
        curtir(this);
    };

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    const campo = document.createElement("input");
    campo.type = "text";
    campo.placeholder = "Escreva um comentário...";

    const botaoComentar = document.createElement("button");
    botaoComentar.textContent = "Comentar";
    botaoComentar.onclick = function() {
        comentar(this);
    };

    post.append(
        titulo,
        mensagem,
        botaoCurtir,
        comentarios,
        campo,
        botaoComentar
    );

    feed.prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("texto").value = "";
}

// Curtir publicação
function curtir(botao) {
    const contador = botao.querySelector("span");
    let quantidade = Number(contador.textContent);

    quantidade++;

    contador.textContent = quantidade;
}

// Comentar publicação
function comentar(botao) {
    const post = botao.closest(".post");
    const campo = post.querySelector("input");
    const comentarios = post.querySelector(".comentarios");

    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const novoComentario = document.createElement("p");
    novoComentario.textContent = texto;

    comentarios.appendChild(novoComentario);

    campo.value = "";
}

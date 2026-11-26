
// Criar uma publicação
function publicar() {

    let nome = document.getElementById("nome").value.trim();
    let texto = document.getElementById("texto").value.trim();

    if (nome === "" || texto === "") {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    let post = document.createElement("article");
    post.className = "post";

    let titulo = document.createElement("h3");
    titulo.textContent = nome;

    let mensagem = document.createElement("p");
    mensagem.textContent = texto;

    let botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "♡ Curtir";
    botaoCurtir.onclick = function() {
        curtir(botaoCurtir);
    };

    let contador = document.createElement("span");
    contador.className = "contador";
    contador.textContent = "0 curtidas";

    let comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    let campo = document.createElement("input");
    campo.placeholder = "Escreva um comentário...";

    let botaoComentar = document.createElement("button");
    botaoComentar.textContent = "Comentar";
    botaoComentar.onclick = function() {
        comentar(botaoComentar);
    };

    post.append(
        titulo,
        mensagem,
        botaoCurtir,
        contador,
        comentarios,
        campo,
        botaoComentar
    );

    document.getElementById("publicacoes")
        .prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("texto").value = "";
}


// Curtir e descurtir publicação
function curtir(botao) {

    let post = botao.closest(".post");
    let contador = post.querySelector(".contador");

    let total = Number(contador.dataset.total || 0);

    if (botao.dataset.curtido === "sim") {
        total--;
        botao.dataset.curtido = "nao";
        botao.textContent = "♡ Curtir";
    } else {
        total++;
        botao.dataset.curtido = "sim";
        botao.textContent = "❤️ Curtido";
    }

    contador.dataset.total = total;
    contador.textContent = total + " curtidas";
}


// Adicionar comentário
function comentar(botao) {

    let post = botao.closest(".post");
    let campo = post.querySelector("input");
    let area = post.querySelector(".comentarios");

    let texto = campo.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    let comentario = document.createElement("p");
    comentario.textContent = "Você: " + texto;

    area.appendChild(comentario);

    campo.value = "";
}

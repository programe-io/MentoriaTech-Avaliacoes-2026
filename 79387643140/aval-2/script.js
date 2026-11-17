
// NAVEGAR ENTRE AS PÁGINAS
function abrirPagina(id) {

    let paginas = document.querySelectorAll(".pagina");

    paginas.forEach(function(pagina) {
        pagina.classList.remove("ativa");
    });

    document.getElementById(id).classList.add("ativa");
}

// CURTIR PUBLICAÇÃO
function curtir(botao) {

    let post = botao.closest(".post, .reel");

    let likes = post.querySelector(".likes");

    if (!likes) {
        likes = document.createElement("p");
        likes.className = "likes";
        likes.dataset.total = "0";
        post.appendChild(likes);
    }

    let total = Number(likes.dataset.total || 0);

    if (botao.dataset.curtido === "sim") {
        total--;
        botao.dataset.curtido = "nao";
        botao.innerHTML = "♡ Curtir";
    } else {
        total++;
        botao.dataset.curtido = "sim";
        botao.innerHTML = "❤️ Curtido";
    }

    likes.dataset.total = total;
    likes.textContent = total + " curtidas";
}

// COMENTAR
function comentar(botao) {

    let post = botao.closest(".post");

    let texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {

        let comentario = document.createElement("p");

        comentario.textContent = "💬 Você: " + texto;

        post.querySelector(".comentarios").appendChild(comentario);
    }
}

// ENVIAR MENSAGEM
function enviarMensagem() {

    let campo = document.getElementById("mensagemTexto");

    let texto = campo.value.trim();

    if (texto === "") {
        alert("Digite uma mensagem!");
        return;
    }

    let historico = document.getElementById("historico");

    let mensagem = document.createElement("p");

    mensagem.className = "enviada";
    mensagem.textContent = texto;

    historico.appendChild(mensagem);

    campo.value = "";
}

// CRIAR PUBLICAÇÃO
function publicar() {

    let legenda = document.getElementById("legenda");

    let texto = legenda.value.trim();

    if (texto === "") {
        alert("Escreva uma legenda!");
        return;
    }

    let post = document.createElement("article");

    post.className = "post";

    let titulo = document.createElement("h3");
    titulo.textContent = "👤 Meu Perfil";

    let descricao = document.createElement("p");
    descricao.textContent = texto;

    let botao = document.createElement("button");
    botao.textContent = "♡ Curtir";

    botao.onclick = function() {
        curtir(botao);
    };

    let likes = document.createElement("p");
    likes.className = "likes";
    likes.dataset.total = "0";
    likes.textContent = "0 curtidas";

    post.append(titulo, descricao, botao, likes);

    let feed = document.querySelector(".feed");

    feed.appendChild(post);

    legenda.value = "";

    alert("Publicação criada com sucesso!");

    abrirPagina("inicio");
}


// CURTIR PUBLICAÇÃO
function curtir(element) {
    let post = element.closest(".post");
    let likes = post.querySelector(".likes");

    let quantidade = parseInt(likes.innerText);

    if (element.classList.contains("like")) {
        element.classList.remove("like");
        element.innerText = "♡";
        quantidade--;
    } else {
        element.classList.add("like");
        element.innerText = "♥";
        quantidade++;
    }

    likes.innerText = quantidade + " curtidas";
}

// ENVIAR COMENTÁRIO
function enviarComentario(button) {
    let post = button.closest(".post");

    let input = post.querySelector(".comment-input");
    let comentarios = post.querySelector(".comments");

    if (input.value.trim() === "") {
        alert("Digite um comentário!");
        return;
    }

    let novoComentario = document.createElement("p");

    let usuario = document.createElement("b");
    usuario.innerText = "meu_perfil ";

    novoComentario.appendChild(usuario);

    novoComentario.appendChild(
        document.createTextNode(input.value)
    );

    comentarios.appendChild(novoComentario);

    input.value = "";
}

// FOCAR NO CAMPO DE COMENTÁRIO
function comentar(element) {
    let input = element.closest(".post")
        .querySelector(".comment-input");

    input.focus();
}

// SEGUIR USUÁRIOS
function seguir(button) {
    if (button.innerText === "Seguir") {
        button.innerText = "Seguindo";
    } else {
        button.innerText = "Seguir";
    }
}

// CRIAR PUBLICAÇÃO
function criarPost() {

    let imagem = prompt("Cole o endereço de uma imagem:");

    if (!imagem || imagem.trim() === "") {
        return;
    }

    let legenda = prompt("Digite uma legenda:");

    let post = document.createElement("article");
    post.className = "post";

    // Cabeçalho
    let cabecalho = document.createElement("div");
    cabecalho.className = "post-header";
    cabecalho.innerText = "👤 meu_perfil";

    // Imagem
    let foto = document.createElement("img");
    foto.className = "post-image";
    foto.src = imagem;

    foto.onerror = function() {
        alert("Não foi possível carregar essa imagem.");
        post.remove();
    };

    // Botões
    let acoes = document.createElement("div");
    acoes.className = "actions";

    let curtirBtn = document.createElement("span");
    curtirBtn.innerText = "♡";

    curtirBtn.onclick = function() {
        curtir(curtirBtn);
    };

    let comentarBtn = document.createElement("span");
    comentarBtn.innerText = "💬";

    comentarBtn.onclick = function() {
        comentar(comentarBtn);
    };

    acoes.append(curtirBtn, comentarBtn);

    // Descrição
    let descricao = document.createElement("div");
    descricao.className = "description";

    let likes = document.createElement("b");
    likes.className = "likes";
    likes.innerText = "0 curtidas";

    let texto = document.createElement("p");

    let usuario = document.createElement("b");
    usuario.innerText = "meu_perfil";

    texto.appendChild(usuario);
    texto.appendChild(
        document.createTextNode(" " + (legenda || "Minha publicação!"))
    );

    descricao.append(likes, texto);

    // Comentários
    let comentarios = document.createElement("div");
    comentarios.className = "comments";

    let input = document.createElement("input");
    input.className = "comment-input";
    input.placeholder = "Adicione um comentário...";

    let botao = document.createElement("button");
    botao.innerText = "Publicar";

    botao.onclick = function() {
        enviarComentario(botao);
    };

    // Adicionar tudo ao post
    post.append(
        cabecalho,
        foto,
        acoes,
        descricao,
        comentarios,
        input,
        botao
    );

    document.getElementById("feed").prepend(post);
}

// MENSAGEM DE NOTIFICAÇÃO
function notificacao() {
    alert("Você não tem novas notificações! ❤️");
}

// PESQUISAR USUÁRIOS
function pesquisar() {
    let nome = prompt("Digite o nome do usuário:");

    if (nome) {
        alert("Pesquisando por: " + nome);
    }
}


// FUNÇÃO PARA PUBLICAR
function publicarPost() {

    const texto = document.getElementById("textoPost").value.trim();
    const imagem = document.getElementById("imagemPost").value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const lista = document.getElementById("listaPosts");

    const post = document.createElement("article");
    post.className = "post";

    // CABEÇALHO
    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "U";

    const usuario = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = "Usuário";

    const horario = document.createElement("span");
    horario.textContent = "Agora";

    usuario.appendChild(nome);
    usuario.appendChild(horario);

    cabecalho.appendChild(avatar);
    cabecalho.appendChild(usuario);

    // TEXTO
    const mensagem = document.createElement("p");
    mensagem.className = "post-text";
    mensagem.textContent = texto;

    post.appendChild(cabecalho);
    post.appendChild(mensagem);

    // IMAGEM OPCIONAL
    if (imagem !== "") {
        const foto = document.createElement("img");

        foto.className = "post-image";
        foto.src = imagem;
        foto.alt = "Imagem da publicação";

        post.appendChild(foto);
    }

    // BOTÕES
    const acoes = document.createElement("div");
    acoes.className = "post-actions";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "♡ Curtir (0)";
    botaoCurtir.onclick = function() {
        curtir(botaoCurtir);
    };

    const botaoComentar = document.createElement("button");
    botaoComentar.textContent = "Comentar";
    botaoComentar.onclick = function() {
        comentar(botaoComentar);
    };

    acoes.appendChild(botaoCurtir);
    acoes.appendChild(botaoComentar);

    post.appendChild(acoes);

    // ÁREA DE COMENTÁRIOS
    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.appendChild(comentarios);

    // ADICIONAR AO FEED
    lista.prepend(post);

    // LIMPAR CAMPOS
    document.getElementById("textoPost").value = "";
    document.getElementById("imagemPost").value = "";

    alert("Publicação realizada com sucesso!");
}


// FUNÇÃO CURTIR
function curtir(botao) {

    let quantidade = Number(botao.dataset.curtidas || 0);

    if (botao.dataset.curtido === "true") {
        quantidade--;
        botao.dataset.curtido = "false";
    } else {
        quantidade++;
        botao.dataset.curtido = "true";
    }

    botao.dataset.curtidas = quantidade;

    botao.textContent = "♡ Curtir (" + quantidade + ")";
}


// FUNÇÃO COMENTAR
function comentar(botao) {

    const comentario = prompt("Digite seu comentário:");

    if (comentario === null || comentario.trim() === "") {
        return;
    }

    const post = botao.closest(".post");
    const area = post.querySelector(".comentarios");

    const novoComentario = document.createElement("div");
    novoComentario.className = "comentario";

    novoComentario.textContent = "Usuário: " + comentario;

    area.appendChild(novoComentario);
}

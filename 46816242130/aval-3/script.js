
function curtir(botao) {
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = parseInt(likes.textContent);

    if (botao.classList.contains("curtido")) {
        quantidade--;
        botao.classList.remove("curtido");
        botao.textContent = "♡";
        botao.style.color = "black";
    } else {
        quantidade++;
        botao.classList.add("curtido");
        botao.textContent = "♥";
        botao.style.color = "red";
    }

    likes.textContent = quantidade + " curtidas";
}

function comentar(botao) {
    const campo = botao.closest(".post").querySelector(".comment-area input");
    campo.focus();
}

function enviarComentario(botao) {
    const post = botao.closest(".post");
    const input = post.querySelector(".comment-area input");
    const comentarios = post.querySelector(".comments");

    if (input.value.trim() === "") {
        alert("Digite um comentário!");
        return;
    }

    const novoComentario = document.createElement("p");
    novoComentario.innerHTML = "<strong>meu_perfil</strong> " +
        document.createTextNode(input.value).textContent;

    comentarios.insertAdjacentElement("beforebegin", novoComentario);

    input.value = "";
}

function criarPost() {
    const legenda = prompt("Digite a legenda da publicação:");
    if (legenda === null || legenda.trim() === "") return;

    const imagem = prompt("Cole o endereço (URL) da imagem:");
    if (!imagem || !imagem.trim()) return;

    const post = document.createElement("article");
    post.className = "post";

    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";
    cabecalho.innerHTML = `
        <img src="https://i.pravatar.cc/100?img=11">
        <strong>meu_perfil</strong>
        <span>•••</span>
    `;

    const foto = document.createElement("img");
    foto.className = "post-image";
    foto.src = imagem.trim();

    const acoes = document.createElement("div");
    acoes.className = "post-actions";
    acoes.innerHTML = `
        <button onclick="curtir(this)">♡</button>
        <button onclick="comentar(this)">♧</button>
        <button>➤</button>
    `;

    const info = document.createElement("div");
    info.className = "post-info";

    const curtidas = document.createElement("strong");
    curtidas.className = "likes";
    curtidas.textContent = "0 curtidas";

    const texto = document.createElement("p");
    const usuario = document.createElement("strong");
    usuario.textContent = "meu_perfil";
    texto.append(usuario, document.createTextNode(" " + legenda));

    const comentarios = document.createElement("p");
    comentarios.className = "comments";
    comentarios.textContent = "Ver todos os comentários";

    const area = document.createElement("div");
    area.className = "comment-area";
    area.innerHTML = `
        <input type="text" placeholder="Adicione um comentário...">
        <button onclick="enviarComentario(this)">Publicar</button>
    `;

    info.append(curtidas, texto, comentarios, area);
    post.append(cabecalho, foto, acoes, info);

    document.getElementById("posts").prepend(post);
}

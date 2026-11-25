
// FUNÇÃO DE CURTIR
function curtir(botao) {

    const post = botao.closest(".post");
    const curtidas = post.querySelector(".likes");

    let quantidade = parseInt(
        curtidas.innerText.replace(/\D/g, "")
    );

    if (botao.classList.contains("curtido")) {

        botao.classList.remove("curtido");
        botao.innerText = "♡";
        botao.style.color = "#222";

        quantidade--;

    } else {

        botao.classList.add("curtido");
        botao.innerText = "♥";
        botao.style.color = "red";

        quantidade++;
    }

    curtidas.innerText = quantidade.toLocaleString("pt-BR")
        + " curtidas";
}

// FUNÇÃO DE COMENTAR
function comentar(botao) {

    const post = botao.closest(".post");

    post.querySelector(".comment-input").focus();
}

// ENVIAR COMENTÁRIO
function enviarComentario(botao) {

    const post = botao.closest(".post");

    const input = post.querySelector(".comment-input");

    const comentarios = post.querySelector(".comments");

    if (input.value.trim() === "") {

        alert("Digite um comentário!");

        return;
    }

    const novoComentario = document.createElement("p");

    novoComentario.innerHTML =
        "<strong>meu.perfil</strong> " +
        input.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    comentarios.after(novoComentario);

    input.value = "";
}

// CRIAR PUBLICAÇÃO
function criarPost() {

    const legenda = prompt("Digite a legenda da publicação:");

    if (legenda === null || legenda.trim() === "") {
        return;
    }

    const url = prompt("Cole o endereço de uma imagem:");

    if (url === null || url.trim() === "") {
        return;
    }

    const post = document.createElement("article");

    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=1"
                 alt="Meu perfil">
            <strong>meu.perfil</strong>
            <span>•••</span>
        </div>

        <img class="post-image"
             src="${url.replace(/["'<>]/g, "")}"
             alt="Minha publicação">

        <div class="post-actions">
            <button class="like" onclick="curtir(this)">♡</button>
            <button onclick="comentar(this)">💬</button>
            <button>➤</button>
            <button class="save">♧</button>
        </div>

        <div class="post-content">
            <p class="likes">0 curtidas</p>
            <p><strong>meu.perfil</strong> ${
                legenda.replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }</p>
            <p class="comments">Ver todos os comentários</p>

            <input type="text"
                   placeholder="Adicione um comentário..."
                   class="comment-input">

            <button onclick="enviarComentario(this)">
                Publicar
            </button>
        </div>
    `;

    document.getElementById("feed").prepend(post);

    alert("Publicação criada com sucesso!");
}

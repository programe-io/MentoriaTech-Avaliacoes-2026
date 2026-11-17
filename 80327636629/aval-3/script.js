
// CADASTRAR NOVA PUBLICAÇÃO

const formulario = document.getElementById("formPost");
const textoPost = document.getElementById("textoPost");
const feed = document.getElementById("feed");

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const texto = textoPost.value.trim();

    if (texto.length === 0) {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const postagem = document.createElement("article");
    postagem.className = "post";

    postagem.innerHTML = `
        <div class="post-header">
            <div class="avatar">M</div>

            <div class="user-info">
                <strong>Miqueias</strong>
                <span>Agora mesmo</span>
            </div>
        </div>

        <p class="post-text"></p>

        <div class="post-actions">
            <button class="like-button">
                Curtir <span>0</span>
            </button>

            <button class="comment-button">
                Comentar
            </button>
        </div>

        <div class="comment-area" hidden>
            <input type="text" placeholder="Escreva um comentário...">
            <button class="send-comment">Enviar</button>
            <div class="comments-list"></div>
        </div>
    `;

    // Inserir texto sem interpretar HTML digitado pelo usuário
    postagem.querySelector(".post-text").textContent = texto;

    feed.prepend(postagem);

    textoPost.value = "";

    alert("Publicação realizada com sucesso!");

});

// CURTIR PUBLICAÇÕES

feed.addEventListener("click", function(evento) {

    const botao = evento.target.closest(".like-button");

    if (!botao) return;

    const contador = botao.querySelector("span");

    let curtidas = Number(contador.textContent);

    curtidas++;

    contador.textContent = curtidas;

    botao.style.background = "#0d5ec4";

    botao.firstChild.textContent = "Curtido ";

});

// ABRIR E FECHAR ÁREA DE COMENTÁRIOS

feed.addEventListener("click", function(evento) {

    const botao = evento.target.closest(".comment-button");

    if (!botao) return;

    const postagem = botao.closest(".post");
    const area = postagem.querySelector(".comment-area");

    area.hidden = !area.hidden;

});

// ENVIAR COMENTÁRIOS

feed.addEventListener("click", function(evento) {

    const botao = evento.target.closest(".send-comment");

    if (!botao) return;

    const postagem = botao.closest(".post");

    const campo = postagem.querySelector(".comment-area input");

    const lista = postagem.querySelector(".comments-list");

    const comentario = campo.value.trim();

    if (comentario === "") {
        alert("Digite um comentário!");
        return;
    }

    const novoComentario = document.createElement("p");

    novoComentario.textContent = "Miqueias: " + comentario;

    lista.appendChild(novoComentario);

    campo.value = "";

});

// MENSAGEM DE INICIALIZAÇÃO

console.log("Mini Feed iniciado com sucesso!");

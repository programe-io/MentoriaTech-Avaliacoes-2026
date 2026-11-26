
const campoPostagem = document.getElementById("postInput");
const botaoPublicar = document.getElementById("publishButton");
const containerPostagens = document.getElementById("postsContainer");

// Publicar uma nova postagem
botaoPublicar.addEventListener("click", function () {

    const texto = campoPostagem.value.trim();

    if (texto === "") {
        alert("Digite algo antes de publicar!");
        return;
    }

    const postagem = document.createElement("article");
    postagem.classList.add("card", "post");

    postagem.innerHTML = `
        <div class="post-header">
            <div class="avatar">F</div>

            <div class="post-user">
                <strong>Felipe Rodrigues</strong>
                <span>Agora mesmo</span>
            </div>
        </div>

        <p class="post-text">${texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>

        <div class="post-actions">
            <button class="like-button">♡ Curtir</button>
            <button class="comment-button">Comentar</button>
        </div>

        <div class="comment-area">
            <input type="text" placeholder="Escreva um comentário...">
            <button class="send-comment">Enviar</button>
        </div>
    `;

    containerPostagens.prepend(postagem);

    campoPostagem.value = "";

});

// Curtir e abrir comentários
document.addEventListener("click", function (evento) {

    // Curtir postagem
    if (evento.target.classList.contains("like-button")) {

        evento.target.classList.toggle("liked");

        if (evento.target.classList.contains("liked")) {
            evento.target.textContent = "♥ Curtido";
        } else {
            evento.target.textContent = "♡ Curtir";
        }
    }

    // Mostrar campo de comentário
    if (evento.target.classList.contains("comment-button")) {

        const postagem = evento.target.closest(".post");
        const areaComentario = postagem.querySelector(".comment-area");

        areaComentario.classList.toggle("active");
    }

    // Enviar comentário
    if (evento.target.classList.contains("send-comment")) {

        const postagem = evento.target.closest(".post");
        const campo = postagem.querySelector(".comment-area input");
        const texto = campo.value.trim();

        if (texto === "") {
            alert("Digite um comentário!");
            return;
        }

        let lista = postagem.querySelector(".comments-list");

        if (!lista) {
            lista = document.createElement("div");
            lista.classList.add("comments-list");
            postagem.appendChild(lista);
        }

        const comentario = document.createElement("div");
        comentario.classList.add("comment");

        comentario.textContent = texto;

        lista.appendChild(comentario);

        campo.value = "";
    }

});

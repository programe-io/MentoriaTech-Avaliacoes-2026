
function publicar() {

    const campo = document.getElementById("postInput");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=12" class="avatar">
            <div class="user-info">
                <strong>Eduardo</strong>
                <span>Agora mesmo</span>
            </div>
        </div>

        <div class="post-text">
            <p></p>
        </div>

        <div class="post-actions">
            <button onclick="curtir(this)">♡ Curtir <span>0</span></button>
            <button onclick="comentar(this)">💬 Comentar</button>
        </div>

        <div class="comments"></div>
    `;

    post.querySelector(".post-text p").textContent = texto;

    document.getElementById("feed").prepend(post);

    campo.value = "";
}

function curtir(botao) {

    const contador = botao.querySelector("span");
    let quantidade = Number(contador.textContent);

    if (botao.classList.contains("liked")) {
        quantidade--;
        botao.classList.remove("liked");
        botao.firstChild.textContent = "♡ Curtir ";
    } else {
        quantidade++;
        botao.classList.add("liked");
        botao.firstChild.textContent = "♥ Curtido ";
    }

    contador.textContent = quantidade;
}

function comentar(botao) {

    const post = botao.closest(".post");
    const areaComentarios = post.querySelector(".comments");

    const comentario = prompt("Digite seu comentário:");

    if (comentario === null || comentario.trim() === "") {
        return;
    }

    const novoComentario = document.createElement("div");
    novoComentario.className = "comment";

    novoComentario.textContent = "Eduardo: " + comentario;

    areaComentarios.appendChild(novoComentario);
}

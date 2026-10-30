function curtir(botao) {
    const contador = botao.querySelector("span");
    let quantidade = Number(contador.textContent);

    if (botao.dataset.curtido === "sim") {
        quantidade--;
        botao.dataset.curtido = "nao";
        botao.innerHTML = `♡ Curtir <span>${quantidade}</span>`;
    } else {
        quantidade++;
        botao.dataset.curtido = "sim";
        botao.innerHTML = `♥ Curtido <span>${quantidade}</span>`;
    }
}

function mostrarComentario(botao) {
    const area = botao.closest(".post").querySelector(".area-comentario");
    area.hidden = !area.hidden;
}

function enviarComentario(botao) {
    const area = botao.closest(".area-comentario");
    const campo = area.querySelector("input");
    const lista = area.querySelector(".lista-comentarios");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva um comentário!");
        return;
    }

    const comentario = document.createElement("div");
    comentario.classList.add("comentario");
    comentario.textContent = texto;

    lista.appendChild(comentario);
    campo.value = "";
}

function publicarPost() {
    const campo = document.getElementById("novoPost");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva algo antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.classList.add("post");

    post.innerHTML = `
        <div class="post-topo">
            <div class="mini-avatar">V</div>
            <div>
                <strong>Visitante</strong>
                <small>Agora • Nova publicação</small>
            </div>
        </div>
        <p></p>
        <div class="acoes">
            <button onclick="curtir(this)">♡ Curtir <span>0</span></button>
            <button onclick="mostrarComentario(this)">💬 Comentar</button>
        </div>
        <div class="area-comentario" hidden>
            <input type="text" placeholder="Escreva um comentário...">
            <button onclick="enviarComentario(this)">Enviar</button>
            <div class="lista-comentarios"></div>
        </div>
    `;

    post.querySelector("p").textContent = texto;

    document.getElementById("publicacoes").prepend(post);
    campo.value = "";
}
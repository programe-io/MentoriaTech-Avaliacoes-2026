
function publicar() {
    const campo = document.getElementById("textoPost");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    const publicacoes = document.getElementById("publicacoes");

    const post = document.createElement("div");
    post.className = "post";

    post.innerHTML = `
        <div class="post-topo">
            <div class="foto">L</div>
            <div>
                <strong>Lucas</strong>
                <small>Agora mesmo · 🌎</small>
            </div>
        </div>

        <p></p>

        <div class="acoes">
            <button onclick="curtir(this)">♡ Curtir</button>
            <button onclick="comentar(this)">💬 Comentar</button>
        </div>

        <div class="comentarios"></div>
    `;

    post.querySelector("p").textContent = texto;

    publicacoes.prepend(post);

    campo.value = "";
}

function curtir(botao) {
    if (botao.classList.contains("liked")) {
        botao.classList.remove("liked");
        botao.innerHTML = "♡ Curtir";
    } else {
        botao.classList.add("liked");
        botao.innerHTML = "♥ Curtido";
    }
}

function comentar(botao) {
    const post = botao.closest(".post");
    const comentarios = post.querySelector(".comentarios");

    const texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {
        const comentario = document.createElement("div");
        comentario.className = "comentario";

        comentario.textContent = "Lucas: " + texto;

        comentarios.appendChild(comentario);
    }
}

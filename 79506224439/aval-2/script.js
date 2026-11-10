
function curtir(botao) {
    const post = botao.closest(".post");
    const contador = post.querySelector(".curtidas");

    let curtidas = Number(contador.dataset.total || 0);

    if (botao.dataset.curtido === "true") {
        curtidas--;
        botao.dataset.curtido = "false";
        botao.textContent = "❤️ Curtir";
    } else {
        curtidas++;
        botao.dataset.curtido = "true";
        botao.textContent = "💙 Curtido";
    }

    contador.dataset.total = curtidas;
    contador.textContent = curtidas + 
        (curtidas === 1 ? " curtida" : " curtidas");
}

function comentar(botao) {
    const post = botao.closest(".post");
    const areaComentarios = post.querySelector(".comentarios");

    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        const novoComentario = document.createElement("div");

        novoComentario.className = "comentario";
        novoComentario.textContent = "👤 Você: " + comentario;

        areaComentarios.appendChild(novoComentario);
    }
}

function publicar() {
    const texto = document.getElementById("textoPost");
    const imagem = document.getElementById("imagemPost");

    if (texto.value.trim() === "") {
        alert("Digite algo antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="usuario">
            <div class="avatar">V</div>
            <div>
                <h3>Você</h3>
                <small>Agora mesmo</small>
            </div>
        </div>

        <p></p>

        <div class="acoes">
            <button onclick="curtir(this)">❤️ Curtir</button>
            <button onclick="comentar(this)">💬 Comentar</button>
            <span class="curtidas" data-total="0">0 curtidas</span>
        </div>

        <div class="comentarios"></div>
    `;

    post.querySelector("p").textContent = texto.value;

    if (imagem.value.trim() !== "") {
        try {
            const url = new URL(imagem.value);

            if (url.protocol === "https:" || url.protocol === "http:") {
                const img = document.createElement("img");
                img.className = "imagem-post";
                img.src = url.href;
                img.alt = "Imagem da publicação";
                post.insertBefore(img, post.querySelector(".acoes"));
            }
        } catch {
            alert("Digite um link de imagem válido!");
            return;
        }
    }

    const feed = document.querySelector(".feed");
    feed.insertBefore(post, feed.children[1]);

    texto.value = "";
    imagem.value = "";
}

// Curtir publicação
function curtir(botao) {
    const contador = botao.querySelector("span");

    let curtidas = parseInt(contador.textContent);

    if (!botao.classList.contains("curtido")) {
        curtidas++;
        botao.classList.add("curtido");
        botao.style.color = "#ef4444";
    } else {
        curtidas--;
        botao.classList.remove("curtido");
        botao.style.color = "#555";
    }

    contador.textContent = curtidas;
}


// Adicionar comentário
function comentar(botao) {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        const contador = botao.querySelector("span");
        let comentarios = parseInt(contador.textContent);

        comentarios++;

        contador.textContent = comentarios;

        alert("Comentário publicado!");
    }
}


// Publicar novo post
function publicarPost() {

    const campo = document.getElementById("novoPost");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar.");
        return;
    }

    const feed = document.getElementById("feed");

    const novoPost = document.createElement("article");

    novoPost.classList.add("post");

    novoPost.innerHTML = `
        <div class="post-header">
            <div class="avatar">📱</div>

            <div>
                <strong>TechCell</strong>
                <small>Agora</small>
            </div>
        </div>

        <p class="texto">${texto}</p>

        <div class="acoes">
            <button onclick="curtir(this)">
                ❤️ <span>0</span>
            </button>

            <button onclick="comentar(this)">
                💬 <span>0</span>
            </button>

            <button>
                ↗️ Compartilhar
            </button>
        </div>
    `;

    feed.prepend(novoPost);

    campo.value = "";
}

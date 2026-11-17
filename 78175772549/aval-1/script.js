
// ADICIONAR NOVA PUBLICAÇÃO
function adicionarPost() {
    const input = document.getElementById("postInput");
    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const feed = document.querySelector(".feed");

    const novoPost = document.createElement("article");
    novoPost.className = "post";

    const data = new Date().toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
    });

    novoPost.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/120?img=12" alt="João">
            <div>
                <h3>João da Silva</h3>
                <p>Desenvolvedor Web</p>
                <small>${data}</small>
            </div>
            <button class="more">•••</button>
        </div>

        <div class="post-content">
            <p></p>
        </div>

        <div class="post-stats">
            <span>👍 <span class="likes-count">0</span> curtidas</span>
            <span>0 comentários</span>
        </div>

        <div class="post-actions">
            <button class="like-btn" onclick="curtir(this)">
                👍 Curtir
            </button>
            <button onclick="comentar(this)">
                💬 Comentar
            </button>
            <button onclick="compartilhar(this)">
                🔁 Compartilhar
            </button>
        </div>

        <div class="comments"></div>
    `;

    novoPost.querySelector(".post-content p").textContent = texto;

    feed.insertBefore(novoPost, feed.children[1]);

    input.value = "";

    alert("Publicação realizada com sucesso!");
}


// CURTIR E DESCURTIR
function curtir(botao) {
    const post = botao.closest(".post");
    const contador = post.querySelector(".likes-count");

    let quantidade = parseInt(contador.textContent);

    if (botao.classList.contains("liked")) {
        quantidade--;
        botao.classList.remove("liked");
        botao.innerHTML = "👍 Curtir";
    } else {
        quantidade++;
        botao.classList.add("liked");
        botao.innerHTML = "👍 Curtido";
    }

    contador.textContent = quantidade;
}


// COMENTAR PUBLICAÇÃO
function comentar(botao) {
    const post = botao.closest(".post");
    const comentarios = post.querySelector(".comments");

    const comentario = prompt("Digite seu comentário:");

    if (comentario === null || comentario.trim() === "") {
        return;
    }

    const novoComentario = document.createElement("div");
    novoComentario.className = "comment-item";

    const nome = document.createElement("strong");
    nome.textContent = "João da Silva";

    const texto = document.createElement("p");
    texto.textContent = comentario.trim();

    novoComentario.append(nome, texto);
    comentarios.appendChild(novoComentario);

    const contador = post.querySelector(".post-stats span:last-child");

    const quantidade = comentarios.querySelectorAll(".comment-item").length;

    contador.textContent = quantidade + " comentários";
}


// COMPARTILHAR PUBLICAÇÃO
function compartilhar(botao) {
    const post = botao.closest(".post");
    const texto = post.querySelector(".post-content p").textContent;

    if (navigator.share) {
        navigator.share({
            title: "Mini LinkedIn",
            text: texto
        }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(texto)
            .then(() => alert("Texto copiado para compartilhar!"))
            .catch(() => alert("Não foi possível copiar o texto."));
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}


// CONECTAR COM USUÁRIOS
function conectar(botao) {
    if (botao.classList.contains("connected")) {
        return;
    }

    botao.textContent = "✓ Conectado";
    botao.classList.add("connected");
    botao.disabled = true;

    botao.style.color = "#777";
    botao.style.borderColor = "#aaa";

    alert("Conexão realizada com sucesso!");
}

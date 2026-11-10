
// Função para publicar uma nova postagem
function publicarPost() {
    const texto = document.getElementById("textoPost").value.trim();
    const imagem = document.getElementById("imagemPost").value.trim();

    if (texto === "") {
        alert("Digite algo antes de publicar!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=12" alt="Usuário">
            <div>
                <h3>Você</h3>
                <small>Agora mesmo</small>
            </div>
        </div>

        <p></p>

        ${imagem ? `<img class="post-image" alt="Imagem da publicação">` : ""}

        <div class="acoes">
            <button onclick="curtir(this)">
                ♡ Curtir <span>0</span>
            </button>
            <button onclick="comentar()">💬 Comentar</button>
            <button onclick="compartilhar()">↗ Compartilhar</button>
        </div>
    `;

    // Insere o texto com segurança
    post.querySelector("p").textContent = texto;

    // Adiciona a imagem, caso tenha sido informada
    if (imagem) {
        post.querySelector(".post-image").src = imagem;
    }

    // Adiciona a postagem no início do feed
    feed.prepend(post);

    // Limpa os campos
    document.getElementById("textoPost").value = "";
    document.getElementById("imagemPost").value = "";
}

// Função para curtir uma postagem
function curtir(botao) {
    const contador = botao.querySelector("span");
    let quantidade = Number(contador.textContent);

    if (botao.classList.contains("liked")) {
        quantidade--;
        botao.classList.remove("liked");
        botao.innerHTML = `♡ Curtir <span>${quantidade}</span>`;
    } else {
        quantidade++;
        botao.classList.add("liked");
        botao.innerHTML = `♥ Curtido <span>${quantidade}</span>`;
    }
}

// Função para comentar
function comentar() {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Comentário enviado: " + comentario);
    }
}

// Função para compartilhar
function compartilhar() {
    if (navigator.share) {
        navigator.share({
            title: "MiniFeed",
            text: "Confira esta publicação no MiniFeed!"
        }).catch(() => {});
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}

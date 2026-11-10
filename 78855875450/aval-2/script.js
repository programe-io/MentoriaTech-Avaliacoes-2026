
// Criar nova publicação
function publicar() {
    const texto = document.getElementById("textoPost").value.trim();
    const imagem = document.getElementById("imagemPost").value.trim();

    if (texto === "") {
        alert("Digite algo para publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="usuario">
            <div class="avatar">👤</div>
            <div>
                <h3>Meu Perfil</h3>
                <small>Agora mesmo</small>
            </div>
        </div>

        <p></p>

        ${imagem ? `<img class="imagem-post" alt="Imagem da publicação">` : ""}

        <div class="acoes">
            <button onclick="curtir(this)">
                ❤️ Curtir <span>0</span>
            </button>
            <button onclick="comentar(this)">💬 Comentar</button>
            <button onclick="compartilhar()">🔗 Compartilhar</button>
        </div>

        <div class="comentarios"></div>
    `;

    post.querySelector(".usuario + p").textContent = texto;

    if (imagem) {
        post.querySelector(".imagem-post").src = imagem;
    }

    document.getElementById("feed").prepend(post);

    document.getElementById("textoPost").value = "";
    document.getElementById("imagemPost").value = "";
}

// Curtir publicação
function curtir(botao) {
    const contador = botao.querySelector("span");
    let curtidas = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {
        curtidas--;
        botao.classList.remove("curtido");
    } else {
        curtidas++;
        botao.classList.add("curtido");
    }

    contador.textContent = curtidas;
}

// Comentar publicação
function comentar(botao) {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        const area = botao.closest(".post")
            .querySelector(".comentarios");

        const novoComentario = document.createElement("p");
        novoComentario.textContent = "💬 " + comentario.trim();

        area.appendChild(novoComentario);
    }
}

// Compartilhar publicação
function compartilhar() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert("Link copiado com sucesso!"))
            .catch(() => alert("Não foi possível copiar o link."));
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}

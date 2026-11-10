
// Criar uma nova publicação
function publicar() {
    const texto = document.getElementById("textoPost").value.trim();
    const imagem = document.getElementById("imagemPost").value.trim();

    if (texto === "") {
        alert("Digite algo antes de publicar!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "👤";

    const usuario = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = "Você";

    const data = document.createElement("small");
    data.textContent = "Agora";

    usuario.append(nome, data);
    cabecalho.append(avatar, usuario);

    const mensagem = document.createElement("p");
    mensagem.textContent = texto;

    post.append(cabecalho, mensagem);

    // Adicionar imagem se houver uma URL
    if (imagem !== "") {
        try {
            const url = new URL(imagem);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error("URL inválida");
            }

            const foto = document.createElement("img");
            foto.src = url.href;
            foto.alt = "Imagem da publicação";
            foto.className = "post-image";

            post.appendChild(foto);
        } catch {
            alert("Informe uma URL de imagem válida.");
            return;
        }
    }

    // Criar botões de ação
    const acoes = document.createElement("div");
    acoes.className = "acoes";

    acoes.innerHTML = `
        <button onclick="curtir(this)">❤️ Curtir</button>
        <button onclick="comentar(this)">💬 Comentar</button>
        <button onclick="compartilhar()">🔗 Compartilhar</button>
    `;

    post.appendChild(acoes);

    // Colocar a nova postagem no início do feed
    feed.prepend(post);

    document.getElementById("textoPost").value = "";
    document.getElementById("imagemPost").value = "";
}

// Curtir publicação
function curtir(botao) {
    if (botao.classList.contains("curtido")) {
        botao.classList.remove("curtido");
        botao.textContent = "❤️ Curtir";
    } else {
        botao.classList.add("curtido");
        botao.textContent = "❤️ Curtido!";
    }
}

// Comentar publicação
function comentar(botao) {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        const post = botao.closest(".post");

        const novoComentario = document.createElement("p");
        novoComentario.textContent = "💬 Você: " + comentario;

        post.appendChild(novoComentario);
    }
}

// Compartilhar publicação
function compartilhar() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert("Link copiado para compartilhar!"))
            .catch(() => alert("Não foi possível copiar o link."));
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}

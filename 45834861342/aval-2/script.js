
function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const texto = document.getElementById("texto").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (!nome || !texto) {
        alert("Digite seu nome e escreva uma publicação!");
        return;
    }

    let linkImagem = "";

    try {
        const url = new URL(imagem);

        if (imagem && ["http:", "https:"].includes(url.protocol)) {
            linkImagem = url.href;
        }
    } catch (e) {
        linkImagem = "";
    }

    const post = document.createElement("article");
    post.className = "post";

    // Perfil do usuário
    const usuario = document.createElement("div");
    usuario.className = "usuario";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "😊";

    const nomeUsuario = document.createElement("span");
    nomeUsuario.textContent = nome;

    usuario.append(avatar, nomeUsuario);

    // Texto da publicação
    const paragrafo = document.createElement("p");
    paragrafo.className = "texto-post";
    paragrafo.textContent = texto;

    post.append(usuario, paragrafo);

    // Imagem opcional
    if (linkImagem) {
        const img = document.createElement("img");
        img.className = "imagem-post";
        img.src = linkImagem;
        img.alt = "Imagem da publicação";

        post.appendChild(img);
    }

    // Botões de ação
    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.className = "curtir";
    botaoCurtir.innerHTML = '❤️ Curtir <span>0</span>';

    botaoCurtir.onclick = function () {
        curtir(botaoCurtir);
    };

    const botaoCompartilhar = document.createElement("button");
    botaoCompartilhar.className = "compartilhar";
    botaoCompartilhar.textContent = "↗ Compartilhar";

    botaoCompartilhar.onclick = function () {
        compartilhar(texto);
    };

    acoes.append(botaoCurtir, botaoCompartilhar);
    post.appendChild(acoes);

    // Botão excluir
    const botaoExcluir = document.createElement("button");
    botaoExcluir.className = "excluir";
    botaoExcluir.textContent = "Excluir publicação";

    botaoExcluir.onclick = function () {
        post.remove();
    };

    post.appendChild(botaoExcluir);

    // Adiciona o post ao início do feed
    const feed = document.getElementById("feed");
    feed.prepend(post);

    // Limpa os campos
    document.getElementById("texto").value = "";
    document.getElementById("imagem").value = "";
}

// Curtir e descurtir
function curtir(botao) {
    const contador = botao.querySelector("span");
    let total = Number(contador.textContent);

    if (botao.classList.contains("ativo")) {
        total--;
        botao.classList.remove("ativo");
    } else {
        total++;
        botao.classList.add("ativo");
    }

    contador.textContent = total;
}

// Compartilhar publicação
async function compartilhar(texto) {
    try {
        if (navigator.share) {
            await navigator.share({
                title: "Meu Feed Social",
                text: texto
            });
        } else {
            await navigator.clipboard.writeText(texto);
            alert("Texto copiado para compartilhar!");
        }
    } catch (erro) {
        if (erro.name !== "AbortError") {
            alert("Não foi possível compartilhar agora.");
        }
    }
}

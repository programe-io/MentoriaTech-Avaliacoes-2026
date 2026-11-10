
// Função para curtir uma publicação
function curtir(botao) {
    const contador = botao
        .closest(".post")
        .querySelector(".contador");

    let quantidade = Number(
        contador.dataset.curtidas || 0
    );

    if (botao.classList.contains("curtido")) {
        quantidade--;
        botao.classList.remove("curtido");
        botao.innerHTML = "❤️ Curtir";
    } else {
        quantidade++;
        botao.classList.add("curtido");
        botao.innerHTML = "💙 Curtido";
    }

    contador.dataset.curtidas = quantidade;
    contador.textContent = quantidade +
        (quantidade === 1 ? " curtida" : " curtidas");
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
    alert("Publicação compartilhada com sucesso!");
}

// Função para criar uma publicação
function publicar() {
    const texto = document
        .getElementById("textoPost").value.trim();

    const imagem = document
        .getElementById("imagemPost").value.trim();

    if (texto === "") {
        alert("Digite algo antes de publicar!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    const usuario = document.createElement("div");
    usuario.className = "usuario";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "V";

    const dados = document.createElement("div");

    const nome = document.createElement("h3");
    nome.textContent = "Você";

    const horario = document.createElement("small");
    horario.textContent = "Agora";

    dados.append(nome, horario);
    usuario.append(avatar, dados);

    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;

    post.append(usuario, paragrafo);

    // Adiciona imagem se houver uma URL
    if (imagem !== "") {
        try {
            const url = new URL(imagem);

            if (url.protocol === "https:" ||
                url.protocol === "http:") {
                const img = document.createElement("img");
                img.src = url.href;
                img.alt = "Imagem da publicação";
                img.className = "imagem-post";

                post.appendChild(img);
            }
        } catch {
            alert("Digite uma URL de imagem válida!");
            return;
        }
    }

    // Cria os botões de ação
    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.innerHTML = "❤️ Curtir";
    botaoCurtir.onclick = function() {
        curtir(this);
    };

    const botaoComentar = document.createElement("button");
    botaoComentar.innerHTML = "💬 Comentar";
    botaoComentar.onclick = comentar;

    const botaoCompartilhar = document.createElement("button");
    botaoCompartilhar.innerHTML = "🔗 Compartilhar";
    botaoCompartilhar.onclick = compartilhar;

    acoes.append(
        botaoCurtir,
        botaoComentar,
        botaoCompartilhar
    );

    const contador = document.createElement("p");
    contador.className = "contador";
    contador.dataset.curtidas = 0;
    contador.textContent = "0 curtidas";

    post.append(acoes, contador);

    // Adiciona no início do feed
    feed.prepend(post);

    // Limpa os campos
    document.getElementById("textoPost").value = "";
    document.getElementById("imagemPost").value = "";
}

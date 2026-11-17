
function curtir(botao) {
    const numero = botao.querySelector("span");

    if (!numero) return;

    if (botao.dataset.curtido === "sim") {
        numero.textContent = Number(numero.textContent) - 1;
        botao.dataset.curtido = "nao";
    } else {
        numero.textContent = Number(numero.textContent) + 1;
        botao.dataset.curtido = "sim";
    }
}

function comentar() {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Comentário publicado: " + comentario);
    }
}

function compartilhar() {
    const link = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: "Tok Mania",
            text: "Confira esta rede social!",
            url: link
        }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(link)
            .then(() => alert("Link copiado para compartilhar!"))
            .catch(() => alert("Não foi possível copiar o link."));
    } else {
        prompt("Copie o link:", link);
    }
}

function mostrarPerfil() {
    document.getElementById("perfil").style.display = "block";
}

function fecharPerfil() {
    document.getElementById("perfil").style.display = "none";
}

function inicio() {
    fecharPerfil();

    document.getElementById("feed").scrollIntoView({
        behavior: "smooth"
    });
}

function novoVideo() {
    const arquivo = document.createElement("input");

    arquivo.type = "file";
    arquivo.accept = "video/*";

    arquivo.onchange = function() {
        const videoSelecionado = arquivo.files[0];

        if (!videoSelecionado) return;

        const url = URL.createObjectURL(videoSelecionado);

        const novoPost = document.createElement("article");
        novoPost.className = "video";

        const video = document.createElement("video");
        video.src = url;
        video.controls = true;
        video.loop = true;
        video.playsInline = true;

        const informacoes = document.createElement("div");
        informacoes.className = "informacoes";

        const usuario = document.createElement("h3");
        usuario.textContent = "@meu_usuario";

        const legenda = document.createElement("p");
        legenda.textContent = "Meu novo vídeo! 🎵";

        informacoes.appendChild(usuario);
        informacoes.appendChild(legenda);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        acoes.innerHTML = `
            <button onclick="curtir(this)">
                ❤️ <span>0</span>
            </button>
            <button onclick="comentar()">💬 Comentar</button>
            <button onclick="compartilhar()">↗️ Compartilhar</button>
        `;

        novoPost.appendChild(video);
        novoPost.appendChild(informacoes);
        novoPost.appendChild(acoes);

        document.getElementById("feed").prepend(novoPost);

        novoPost.scrollIntoView({
            behavior: "smooth"
        });
    };

    arquivo.click();
}

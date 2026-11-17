
let seguindo = false;
let numeroSeguidores = 1250;

// SEGUIR PERFIL

function seguir() {
    seguindo = !seguindo;

    numeroSeguidores += seguindo ? 1 : -1;

    document.getElementById("seguidores").textContent =
        numeroSeguidores.toLocaleString("pt-BR");

    const botao = document.getElementById("seguirBtn");

    botao.textContent = seguindo ? "Seguindo" : "Seguir";
    botao.style.background = seguindo ? "#555" : "#fe2c55";
}

// CURTIR VÍDEO

function curtir(botao) {
    const numero = botao.querySelector("span");

    let curtidas = Number(numero.textContent);

    const jaCurtiu = botao.classList.toggle("curtido");

    curtidas += jaCurtiu ? 1 : -1;

    numero.textContent = curtidas;

    atualizarCurtidasPerfil();
}

// ATUALIZAR CURTIDAS

function atualizarCurtidasPerfil() {
    const curtidas = document.querySelectorAll(".acoes button.curtido");

    document.getElementById("curtidasPerfil").textContent =
        (5800 + curtidas.length).toLocaleString("pt-BR");
}

// COMENTAR VÍDEO

function comentar(botao) {
    const texto = prompt("Escreva seu comentário:");

    if (!texto || !texto.trim()) {
        return;
    }

    const comentario = document.createElement("p");

    comentario.textContent = "@araujoo__086: " + texto.trim();

    comentario.style.padding = "10px";
    comentario.style.background = "#303030";
    comentario.style.borderRadius = "8px";
    comentario.style.marginTop = "10px";

    botao.closest(".video-card").appendChild(comentario);

    alert("Comentário publicado!");
}

// COMPARTILHAR VÍDEO

function compartilhar() {
    const link = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: "Vídeo de @araujoo__086",
            text: "Confira este vídeo!",
            url: link
        }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(link)
            .then(() => alert("Link copiado para compartilhar!"))
            .catch(() => alert("Não foi possível copiar o link."));
    } else {
        prompt("Copie o endereço do site:", link);
    }
}

// PUBLICAR VÍDEO

function publicarVideo() {
    const url = document.getElementById("videoUrl").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    if (!url) {
        alert("Insira o link do vídeo!");
        return;
    }

    try {
        const endereco = new URL(url);

        if (!["http:", "https:"].includes(endereco.protocol)) {
            throw new Error("Endereço inválido");
        }
    } catch {
        alert("Digite um endereço de vídeo válido!");
        return;
    }

    const card = document.createElement("article");
    card.className = "video-card";

    const video = document.createElement("video");
    video.controls = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    const source = document.createElement("source");
    source.src = url;
    source.type = "video/mp4";

    video.appendChild(source);

    const informacoes = document.createElement("div");
    informacoes.className = "informacoes";

    const nome = document.createElement("strong");
    nome.textContent = "@araujoo__086";

    const legenda = document.createElement("p");
    legenda.textContent = descricao;

    const local = document.createElement("small");
    local.textContent = "🌎 Para você";

    informacoes.append(nome, legenda, local);

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.innerHTML = '❤️ <span>0</span>';
    botaoCurtir.onclick = () => curtir(botaoCurtir);

    const botaoComentar = document.createElement("button");
    botaoComentar.textContent = "💬 Comentar";
    botaoComentar.onclick = () => comentar(botaoComentar);

    const botaoCompartilhar = document.createElement("button");
    botaoCompartilhar.textContent = "↗️ Compartilhar";
    botaoCompartilhar.onclick = compartilhar;

    acoes.append(botaoCurtir, botaoComentar, botaoCompartilhar);

    card.append(video, informacoes, acoes);

    document.getElementById("listaVideos").prepend(card);

    document.getElementById("videoUrl").value = "";
    document.getElementById("descricao").value = "";

    alert("Vídeo publicado com sucesso!");

    video.play().catch(() => {});
}

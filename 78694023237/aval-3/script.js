
function curtir(botao) {
    let numero = botao.querySelector("small");
    let valor = parseInt(numero.textContent);

    if (botao.dataset.curtido === "sim") {
        botao.dataset.curtido = "nao";
        botao.firstChild.textContent = "🤍";
        numero.textContent = valor - 1;
    } else {
        botao.dataset.curtido = "sim";
        botao.firstChild.textContent = "❤️";
        numero.textContent = valor + 1;
    }
}

function comentar(botao) {
    let texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {
        alert("Comentário publicado: " + texto);
    }
}

function compartilhar() {
    if (navigator.share) {
        navigator.share({
            title: "TokPlay",
            text: "Confira este vídeo no TokPlay!"
        });
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}

function mostrarUpload() {
    let upload = document.getElementById("upload");
    upload.hidden = !upload.hidden;
}

function publicarVideo() {
    let usuario = document.getElementById("usuario").value.trim();
    let descricao = document.getElementById("descricao").value.trim();
    let videoUrl = document.getElementById("videoUrl").value.trim();

    if (!usuario || !descricao || !videoUrl) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        let url = new URL(videoUrl);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }
    } catch {
        alert("Digite um link válido para o vídeo!");
        return;
    }

    let post = document.createElement("article");
    post.className = "video";

    let video = document.createElement("video");
    video.src = videoUrl;
    video.controls = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    let informacoes = document.createElement("div");
    informacoes.className = "informacoes";

    let nome = document.createElement("h3");
    nome.textContent = "@" + usuario;

    let legenda = document.createElement("p");
    legenda.textContent = descricao;

    let musica = document.createElement("span");
    musica.textContent = "🎵 Som original";

    informacoes.append(nome, legenda, musica);

    let acoes = document.createElement("div");
    acoes.className = "acoes";

    let botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "🤍";

    let quantidade = document.createElement("small");
    quantidade.textContent = "0";
    botaoCurtir.appendChild(quantidade);

    botaoCurtir.onclick = function() {
        let valor = parseInt(quantidade.textContent);

        if (botaoCurtir.dataset.curtido === "sim") {
            botaoCurtir.dataset.curtido = "nao";
            botaoCurtir.firstChild.textContent = "🤍";
            quantidade.textContent = valor - 1;
        } else {
            botaoCurtir.dataset.curtido = "sim";
            botaoCurtir.firstChild.textContent = "❤️";
            quantidade.textContent = valor + 1;
        }
    };

    let botaoCompartilhar = document.createElement("button");
    botaoCompartilhar.textContent = "↗️";
    botaoCompartilhar.onclick = compartilhar;

    acoes.append(botaoCurtir, botaoCompartilhar);

    post.append(video, informacoes, acoes);

    document.getElementById("feed").prepend(post);

    document.getElementById("usuario").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("videoUrl").value = "";

    mostrarUpload();

    alert("Vídeo publicado com sucesso!");
}

document.getElementById("pesquisa").addEventListener("input", function() {
    let pesquisa = this.value.toLowerCase();

    document.querySelectorAll(".video").forEach(video => {
        let texto = video.textContent.toLowerCase();
        video.style.display = texto.includes(pesquisa) ? "" : "none";
    });
});

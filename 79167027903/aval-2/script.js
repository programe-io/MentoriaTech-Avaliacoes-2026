
const feed = document.getElementById("feed");
const perfil = document.getElementById("perfil");

// ABRIR PERFIL
function abrirPerfil() {
    perfil.classList.remove("escondido");
}

// FECHAR PERFIL
function fecharPerfil() {
    perfil.classList.add("escondido");
}

document.getElementById("abrirPerfil").addEventListener("click", abrirPerfil);

document.getElementById("perfilRodape").addEventListener("click", abrirPerfil);

document.getElementById("fecharPerfil").addEventListener("click", fecharPerfil);

// VOLTAR AO INÍCIO
document.getElementById("inicio").addEventListener("click", function() {
    fecharPerfil();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// CURTIR E COMENTAR
feed.addEventListener("click", function(event) {
    const botao = event.target.closest("button");

    if (!botao) return;

    const publicacao = botao.closest(".video");

    if (!publicacao) return;

    // CURTIR
    if (botao.classList.contains("curtir")) {
        const numero = botao.querySelector("span");
        let curtidas = Number(numero.textContent);

        if (botao.dataset.curtido === "sim") {
            curtidas--;
            botao.dataset.curtido = "nao";
            botao.style.color = "white";
        } else {
            curtidas++;
            botao.dataset.curtido = "sim";
            botao.style.color = "#fe2c55";
        }

        numero.textContent = curtidas;
    }

    // COMENTAR
    if (botao.classList.contains("comentar")) {
        const texto = prompt("Digite seu comentário:");

        if (texto && texto.trim() !== "") {
            const comentario = document.createElement("p");
            comentario.className = "comentario";
            comentario.textContent = "💬 Você: " + texto.trim();

            publicacao.appendChild(comentario);

            const numero = botao.querySelector("span");
            numero.textContent = Number(numero.textContent) + 1;
        }
    }

    // COMPARTILHAR
    if (botao.classList.contains("compartilhar")) {
        const link = window.location.href;

        if (navigator.share) {
            navigator.share({
                title: "Tok Mania",
                text: "Confira este vídeo no Tok Mania!",
                url: link
            }).catch(function() {});
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(link)
                .then(function() {
                    alert("Link copiado com sucesso!");
                })
                .catch(function() {
                    alert("Não foi possível copiar o link.");
                });
        } else {
            prompt("Copie o link:", link);
        }
    }
});

// PUBLICAR VÍDEO
document.getElementById("publicar").addEventListener("click", function() {
    const seletor = document.createElement("input");

    seletor.type = "file";
    seletor.accept = "video/*";

    seletor.addEventListener("change", function() {
        const arquivo = seletor.files[0];

        if (!arquivo) return;

        if (!arquivo.type.startsWith("video/")) {
            alert("Escolha um arquivo de vídeo válido!");
            return;
        }

        const endereco = URL.createObjectURL(arquivo);

        const publicacao = document.createElement("article");
        publicacao.className = "video";

        const video = document.createElement("video");
        video.src = endereco;
        video.controls = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = "metadata";

        const informacoes = document.createElement("div");
        informacoes.className = "informacoes";

        const nome = document.createElement("h3");
        nome.textContent = "@meu_usuario";

        const legenda = document.createElement("p");
        legenda.textContent = "Meu novo vídeo! 🎵";

        informacoes.appendChild(nome);
        informacoes.appendChild(legenda);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        acoes.innerHTML = `
            <button class="curtir">
                ❤️ <span>0</span>
            </button>

            <button class="comentar">
                💬 <span>0</span>
            </button>

            <button class="compartilhar">
                ↗️ Compartilhar
            </button>
        `;

        publicacao.appendChild(video);
        publicacao.appendChild(informacoes);
        publicacao.appendChild(acoes);

        feed.prepend(publicacao);

        publicacao.scrollIntoView({
            behavior: "smooth"
        });

        alert("Vídeo publicado com sucesso!");
    });

    seletor.click();
});

// PESQUISAR VÍDEOS
document.getElementById("pesquisa").addEventListener("input", function() {
    const pesquisa = this.value.toLowerCase();

    const videos = document.querySelectorAll(".video");

    videos.forEach(function(video) {
        const conteudo = video.textContent.toLowerCase();

        video.style.display = conteudo.includes(pesquisa)
            ? "block"
            : "none";
    });
});

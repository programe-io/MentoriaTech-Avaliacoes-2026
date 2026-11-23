
function curtir(botao) {
    const contador = botao.querySelector("span");

    let numero = parseInt(contador.textContent);

    if (botao.dataset.curtido === "sim") {
        numero--;
        botao.dataset.curtido = "nao";
        botao.style.color = "white";
    } else {
        numero++;
        botao.dataset.curtido = "sim";
        botao.style.color = "#fe2c55";
    }

    contador.textContent = numero;
}

function comentar() {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Comentário enviado: " + comentario);
    }
}

function compartilhar() {
    const link = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: "TikTok DENILSON",
            text: "Confira este site de futebol!",
            url: link
        });
    } else {
        navigator.clipboard.writeText(link)
            .then(() => alert("Link copiado!"))
            .catch(() => alert("Não foi possível copiar o link."));
    }
}

// Pesquisa de vídeos
const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", function() {
    const texto = pesquisa.value.toLowerCase();

    const videos = document.querySelectorAll(".video-card");

    videos.forEach(video => {
        const conteudo = video.textContent.toLowerCase();

        video.style.display = conteudo.includes(texto)
            ? "block"
            : "none";
    });
});

// Reproduz apenas um vídeo por vez
const todosVideos = document.querySelectorAll("video");

todosVideos.forEach(video => {
    video.addEventListener("play", function() {
        todosVideos.forEach(outro => {
            if (outro !== video) {
                outro.pause();
            }
        });
    });
});

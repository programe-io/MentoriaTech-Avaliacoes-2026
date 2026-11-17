
// FILTRAR VÍDEOS POR CATEGORIA

function filtrar(categoria, botao) {

    const videos = document.querySelectorAll(".video-card");

    videos.forEach(video => {

        const tipo = video.dataset.categoria;

        if (categoria === "todos" || tipo.includes(categoria)) {
            video.style.display = "block";
        } else {
            video.style.display = "none";
        }

    });

    document.querySelectorAll(".categorias button")
        .forEach(b => b.classList.remove("ativo"));

    botao.classList.add("ativo");
}


// SISTEMA DE CURTIDAS

function curtir(botao) {

    const numero = botao.querySelector("span");
    let quantidade = Number(numero.textContent);

    if (botao.dataset.curtido === "sim") {

        numero.textContent = quantidade - 1;
        botao.dataset.curtido = "nao";
        botao.style.color = "white";

    } else {

        numero.textContent = quantidade + 1;
        botao.dataset.curtido = "sim";
        botao.style.color = "#ff3155";

    }
}


// SISTEMA DE COMENTÁRIOS

function comentar(botao) {

    const comentario = prompt("Escreva seu comentário:");

    if (comentario && comentario.trim() !== "") {

        const area = botao.closest(".video-card");

        const novoComentario = document.createElement("p");

        novoComentario.textContent = "💬 Você: " + comentario;

        area.appendChild(novoComentario);

        alert("Comentário adicionado!");

    }

}


// COMPARTILHAR VÍDEOS

function compartilhar(botao) {

    const titulo = botao.closest(".video-card")
        .querySelector("h3").textContent;

    if (navigator.share) {

        navigator.share({
            title: "VibePlay",
            text: titulo,
            url: window.location.href
        }).catch(() => {});

    } else {

        navigator.clipboard.writeText(window.location.href)
            .then(() => alert("Link copiado!"))
            .catch(() => alert("Não foi possível copiar o link."));

    }

}


// SISTEMA DE PESQUISA

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();

    document.querySelectorAll(".video-card").forEach(video => {

        const conteudo = (
            video.textContent + " " +
            video.dataset.nome + " " +
            video.dataset.categoria
        ).toLowerCase();

        video.style.display = conteudo.includes(texto)
            ? "block"
            : "none";

    });

});


// PUBLICAR VÍDEOS DO COMPUTADOR

const arquivo = document.getElementById("arquivo");

arquivo.addEventListener("change", function() {

    const file = arquivo.files[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
        alert("Escolha um arquivo de vídeo válido!");
        return;
    }

    const url = URL.createObjectURL(file);

    const card = document.createElement("div");
    card.className = "video-card";
    card.dataset.categoria = "todos";
    card.dataset.nome = file.name;

    card.innerHTML = `
        <div class="usuario">
            <span>🎬</span>
            <strong>@vibeplay_user</strong>
            <span class="tag">NOVO VÍDEO</span>
        </div>

        <video controls preload="metadata"></video>

        <h3></h3>
        <p>Vídeo publicado no VibePlay!</p>

        <div class="acoes">
            <button onclick="curtir(this)">
                ❤️ <span>0</span>
            </button>

            <button onclick="comentar(this)">
                💬 Comentar
            </button>

            <button onclick="compartilhar(this)">
                ↗ Compartilhar
            </button>
        </div>
    `;

    const video = card.querySelector("video");
    video.src = url;

    card.querySelector("h3").textContent = file.name;

    document.querySelector(".feed").appendChild(card);

    alert("Vídeo publicado com sucesso!");

    arquivo.value = "";

});


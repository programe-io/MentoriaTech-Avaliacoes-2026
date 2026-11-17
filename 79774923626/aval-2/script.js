
const videos = [
    {
        id: 1,
        usuario: "Lucas Silva",
        arroba: "@lucas",
        legenda: "Confira esse vídeo incrível! 🔥 #viral #paravoce",
        arquivo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        curtidas: 1250,
        comentarios: ["Muito bom! 🔥", "Adorei esse vídeo! ❤️"],
        curtido: false
    },
    {
        id: 2,
        usuario: "Maria Oliveira",
        arroba: "@maria",
        legenda: "Um momento especial para compartilhar! ❤️ #fyp",
        arquivo: "https://www.w3schools.com/html/mov_bbb.mp4",
        curtidas: 850,
        comentarios: ["Que lindo!", "Maravilhoso!"],
        curtido: false
    },
    {
        id: 3,
        usuario: "Pedro Santos",
        arroba: "@pedro",
        legenda: "Diversão garantida! 😂 #humor #viral",
        arquivo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        curtidas: 2300,
        comentarios: ["Kkkkk 😂", "Muito engraçado!"],
        curtido: false
    }
];

let videoAtual = null;
let videosExibidos = [...videos];
let favoritos = [];

// FORMATAR NÚMEROS

function formatarNumero(numero) {
    return numero.toLocaleString("pt-BR");
}

// MOSTRAR VÍDEOS

function mostrarVideos(lista = videosExibidos) {
    const feed = document.getElementById("listaVideos");

    feed.innerHTML = "";

    if (lista.length === 0) {
        feed.innerHTML = "<p>Nenhum vídeo encontrado.</p>";
        return;
    }

    lista.forEach(video => {

        const card = document.createElement("article");
        card.className = "video-card";

        card.innerHTML = `
            <div class="video-main">

                <div class="usuario">
                    <div class="avatar">
                        ${video.usuario.charAt(0)}
                    </div>

                    <div>
                        <h3>${video.usuario}</h3>
                        <p>${video.arroba}</p>
                    </div>
                </div>

                <p class="legenda">${video.legenda}</p>

                <div class="video-player">
                    <video controls loop playsinline preload="metadata">
                        <source src="${video.arquivo}" type="video/mp4">
                        Seu navegador não suporta vídeos.
                    </video>
                </div>

            </div>

            <div class="acoes">

                <button class="acao ${video.curtido ? "curtido" : ""}"
                    onclick="curtirVideo(${video.id})">
                    ${video.curtido ? "❤️" : "🤍"}
                    <span>${formatarNumero(video.curtidas)}</span>
                </button>

                <button class="acao"
                    onclick="abrirComentarios(${video.id})">
                    💬
                    <span>${video.comentarios.length}</span>
                </button>

                <button class="acao"
                    onclick="compartilharVideo(${video.id})">
                    ↗️
                    <span>Compartilhar</span>
                </button>

                <button class="acao"
                    onclick="salvarFavorito(${video.id})">
                    ⭐
                    <span>Salvar</span>
                </button>

            </div>
        `;

        feed.appendChild(card);
    });
}

// CURTIR VÍDEO

function curtirVideo(id) {
    const video = videos.find(v => v.id === id);

    if (video.curtido) {
        video.curtidas--;
        video.curtido = false;
    } else {
        video.curtidas++;
        video.curtido = true;
    }

    mostrarVideos();
}

// ABRIR COMENTÁRIOS

function abrirComentarios(id) {
    videoAtual = id;

    const video = videos.find(v => v.id === id);
    const lista = document.getElementById("listaComentarios");

    lista.innerHTML = "";

    video.comentarios.forEach(comentario => {
        const item = document.createElement("div");
        item.className = "comentario";
        item.textContent = comentario;
        lista.appendChild(item);
    });

    document.getElementById("modalComentarios")
        .classList.add("ativo");
}

// ENVIAR COMENTÁRIO

function enviarComentario() {
    const input = document.getElementById("comentarioInput");

    const texto = input.value.trim();

    if (!texto) {
        alert("Digite um comentário!");
        return;
    }

    const video = videos.find(v => v.id === videoAtual);

    video.comentarios.push(texto);

    input.value = "";

    abrirComentarios(videoAtual);
    mostrarVideos();
}

// FECHAR MODAL

function fecharModal() {
    document.getElementById("modalComentarios")
        .classList.remove("ativo");
}

// COMPARTILHAR

function compartilharVideo(id) {
    const link = window.location.href.split("#")[0] + "#video-" + id;

    if (navigator.share) {
        navigator.share({
            title: "Vídeo da nossa rede social",
            text: "Confira este vídeo!",
            url: link
        }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(link)
            .then(() => alert("Link copiado!"))
            .catch(() => alert("Não foi possível copiar o link."));
    } else {
        alert("Link do vídeo: " + link);
    }
}

// SALVAR FAVORITOS

function salvarFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(item => item !== id);
        alert("Vídeo removido dos favoritos!");
    } else {
        favoritos.push(id);
        alert("Vídeo salvo nos favoritos! ⭐");
    }
}

// PESQUISAR

function pesquisarVideos() {
    const termo = document.getElementById("pesquisa")
        .value.toLowerCase().trim();

    videosExibidos = videos.filter(video =>
        video.usuario.toLowerCase().includes(termo) ||
        video.arroba.toLowerCase().includes(termo) ||
        video.legenda.toLowerCase().includes(termo)
    );

    document.getElementById("tituloFeed").textContent =
        "Resultados da pesquisa";

    mostrarVideos(videosExibidos);
}

// MOSTRAR TODOS

function mostrarTodos() {
    videosExibidos = [...videos];

    document.getElementById("tituloFeed").textContent =
        "Para você";

    document.getElementById("pesquisa").value = "";

    mostrarVideos();
}

// MOSTRAR FAVORITOS

function mostrarFavoritos() {
    const lista = videos.filter(video =>
        favoritos.includes(video.id)
    );

    document.getElementById("tituloFeed").textContent =
        "Vídeos favoritos";

    mostrarVideos(lista);
}

// PERFIL

function mostrarPerfil() {
    document.getElementById("tituloFeed").textContent = "Meu perfil";

    document.getElementById("listaVideos").innerHTML = `
        <div class="perfil">
            <div class="avatar">U</div>

            <h2>Meu Usuário</h2>
            <p>@meuusuario</p>

            <br>

            <h3>${videos.length} vídeos</h3>

            <p>Bem-vindo à sua rede social!</p>
        </div>
    `;
}

// PUBLICAR VÍDEO (DEMONSTRAÇÃO)

function mostrarUpload() {
    const arquivo = document.createElement("input");

    arquivo.type = "file";
    arquivo.accept = "video/*";

    arquivo.onchange = function() {
        if (arquivo.files.length > 0) {
            alert(
                "Vídeo selecionado: " +
                arquivo.files[0].name +
                "\nO envio real precisa de um servidor."
            );
        }
    };

    arquivo.click();
}

// PESQUISA COM ENTER

document.getElementById("pesquisa")
    .addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            pesquisarVideos();
        }
    });

// INICIALIZAR

mostrarVideos();


const videos = [
    {
        id: 1,
        titulo: "😂 Minha reação quando vejo a prova!",
        usuario: "@memes",
        categoria: "Reações",
        arquivo: "videos/reacao1.mp4",
        curtidas: 2500,
        comentarios: 120
    },
    {
        id: 2,
        titulo: "💃 A dança mais engraçada!",
        usuario: "@dancinhas",
        categoria: "Danças",
        arquivo: "videos/danca1.mp4",
        curtidas: 3800,
        comentarios: 210
    },
    {
        id: 3,
        titulo: "🤣 Quando a mãe chama pelo nome completo!",
        usuario: "@comedia",
        categoria: "Comédia",
        arquivo: "videos/comedia1.mp4",
        curtidas: 4200,
        comentarios: 350
    },
    {
        id: 4,
        titulo: "🎮 Quando perco no último segundo!",
        usuario: "@games",
        categoria: "Memes de jogos",
        arquivo: "videos/jogo1.mp4",
        curtidas: 5100,
        comentarios: 400
    },
    {
        id: 5,
        titulo: "😂 Eu tentando acordar cedo!",
        usuario: "@humor",
        categoria: "Reações",
        arquivo: "videos/reacao2.mp4",
        curtidas: 6000,
        comentarios: 500
    },
    {
        id: 6,
        titulo: "🕺 A dança que ninguém esperava!",
        usuario: "@risadas",
        categoria: "Danças",
        arquivo: "videos/danca2.mp4",
        curtidas: 3200,
        comentarios: 180
    },
    {
        id: 7,
        titulo: "🤣 A maior confusão!",
        usuario: "@memes_diarios",
        categoria: "Comédia",
        arquivo: "videos/comedia2.mp4",
        curtidas: 7200,
        comentarios: 600
    },
    {
        id: 8,
        titulo: "🎮 O jogador mais azarado!",
        usuario: "@game_memes",
        categoria: "Memes de jogos",
        arquivo: "videos/jogo2.mp4",
        curtidas: 4500,
        comentarios: 280
    }
];

let categoriaAtual = "Todos";
let favoritos = [];

const feed = document.getElementById("feed");

// MOSTRAR VÍDEOS
function mostrarVideos(lista = videos) {

    feed.innerHTML = "";

    if (lista.length === 0) {
        feed.textContent = "Nenhum vídeo encontrado!";
        return;
    }

    lista.forEach(video => {

        const card = document.createElement("article");
        card.className = "video-card";

        // PLAYER DE VÍDEO
        const player = document.createElement("video");

        player.src = video.arquivo;
        player.controls = true;
        player.playsInline = true;
        player.preload = "auto";
        player.muted = false;

        // Permitir reprodução no navegador
        player.setAttribute("controlsList", "nodownload");
        player.setAttribute("disablePictureInPicture", "");

        player.style.width = "100%";
        player.style.display = "block";
        player.style.background = "#000";
        player.style.borderRadius = "12px";

        // Verificar carregamento
        player.addEventListener("error", () => {

            const aviso = document.createElement("p");

            aviso.textContent =
                "⚠️ Não foi possível carregar este vídeo. Confira se o arquivo existe na pasta videos.";

            aviso.className = "erro-video";

            if (!card.querySelector(".erro-video")) {
                card.insertBefore(aviso, info);
            }
        });

        // INFORMAÇÕES
        const info = document.createElement("div");
        info.className = "video-info";

        const categoria = document.createElement("span");
        categoria.className = "categoria";
        categoria.textContent = video.categoria;

        const titulo = document.createElement("h3");
        titulo.textContent = video.titulo;

        const usuario = document.createElement("p");
        usuario.className = "usuario";
        usuario.textContent = video.usuario;

        // BOTÕES
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        // CURTIR
        const curtir = document.createElement("button");
        curtir.textContent = `❤️ ${video.curtidas}`;

        curtir.onclick = () => {
            video.curtidas++;
            curtir.textContent = `❤️ ${video.curtidas}`;
        };

        // COMENTAR
        const comentar = document.createElement("button");
        comentar.textContent = `💬 ${video.comentarios}`;

        comentar.onclick = () => {

            const texto = prompt("Digite seu comentário:");

            if (texto && texto.trim()) {
                video.comentarios++;
                comentar.textContent = `💬 ${video.comentarios}`;
                alert("Comentário publicado!");
            }
        };

        // FAVORITOS
        const favorito = document.createElement("button");

        function atualizarFavorito() {
            favorito.textContent = favoritos.includes(video.id)
                ? "⭐ Salvo"
                : "☆ Salvar";
        }

        atualizarFavorito();

        favorito.onclick = () => {

            if (favoritos.includes(video.id)) {
                favoritos = favoritos.filter(id => id !== video.id);
            } else {
                favoritos.push(video.id);
            }

            atualizarFavorito();

            if (categoriaAtual === "Favoritos") {
                mostrarVideos(filtrarLista());
            }
        };

        acoes.append(curtir, comentar, favorito);

        info.append(categoria, titulo, usuario, acoes);

        card.append(player, info);

        feed.append(card);
    });
}

// FILTRAR CATEGORIAS
function filtrar(categoria, botao) {

    categoriaAtual = categoria;

    document.querySelectorAll(".menu button")
        .forEach(b => b.classList.remove("ativo"));

    botao.classList.add("ativo");

    mostrarVideos(filtrarLista());
}

// LISTA DE FILTROS
function filtrarLista() {

    if (categoriaAtual === "Todos") {
        return videos;
    }

    if (categoriaAtual === "Favoritos") {
        return videos.filter(v => favoritos.includes(v.id));
    }

    return videos.filter(v => v.categoria === categoriaAtual);
}

// PESQUISAR
document.getElementById("pesquisa")
.addEventListener("input", function() {

    const termo = this.value.toLowerCase();

    const resultado = filtrarLista().filter(video =>
        video.titulo.toLowerCase().includes(termo) ||
        video.usuario.toLowerCase().includes(termo) ||
        video.categoria.toLowerCase().includes(termo)
    );

    mostrarVideos(resultado);
});

// ABRIR PUBLICAÇÃO
function abrirUpload() {
    document.getElementById("modalUpload").style.display = "flex";
}

// FECHAR PUBLICAÇÃO
function fecharUpload() {
    document.getElementById("modalUpload").style.display = "none";
}

// PUBLICAR VÍDEOS
function publicarVideo() {

    const titulo = document.getElementById("nomeVideo").value.trim();
    const usuario = document.getElementById("nomeUsuario").value.trim();
    const categoria = document.getElementById("categoriaVideo").value;
    const arquivo = document.getElementById("arquivoVideo").files[0];

    if (!titulo || !usuario || !arquivo) {
        alert("Preencha todos os campos!");
        return;
    }

    if (!arquivo.type.startsWith("video/")) {
        alert("Escolha um arquivo de vídeo válido!");
        return;
    }

    const novoVideo = {
        id: Date.now(),
        titulo: titulo,
        usuario: "@" + usuario.replace(/^@/, ""),
        categoria: categoria,
        arquivo: URL.createObjectURL(arquivo),
        curtidas: 0,
        comentarios: 0
    };

    videos.unshift(novoVideo);

    categoriaAtual = "Todos";

    document.querySelectorAll(".menu button")
        .forEach(b => b.classList.remove("ativo"));

    document.querySelector(".menu button").classList.add("ativo");

    fecharUpload();
    mostrarVideos();

    alert("Vídeo publicado no LiveTok!");
}

// INICIAR LIVETOK
document.addEventListener("DOMContentLoaded", () => {
    mostrarVideos();
});

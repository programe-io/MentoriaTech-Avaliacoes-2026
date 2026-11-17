
const stories = [
    {
        nome: "Lucas",
        foto: "https://i.pravatar.cc/300?img=12"
    },
    {
        nome: "Gabriel",
        foto: "https://i.pravatar.cc/300?img=13"
    },
    {
        nome: "Pedro",
        foto: "https://i.pravatar.cc/300?img=14"
    },
    {
        nome: "Matheus",
        foto: "https://i.pravatar.cc/300?img=15"
    },
    {
        nome: "Rafael",
        foto: "https://i.pravatar.cc/300?img=11"
    }
];

const perfis = [
    {
        nome: "Lucas Silva",
        usuario: "@lucasfut",
        foto: "https://i.pravatar.cc/300?img=12"
    },
    {
        nome: "Gabriel Santos",
        usuario: "@gabriel10",
        foto: "https://i.pravatar.cc/300?img=13"
    },
    {
        nome: "Pedro Costa",
        usuario: "@pedrocosta",
        foto: "https://i.pravatar.cc/300?img=14"
    },
    {
        nome: "Matheus Lima",
        usuario: "@matheusfut",
        foto: "https://i.pravatar.cc/300?img=15"
    },
    {
        nome: "Rafael Alves",
        usuario: "@rafael7",
        foto: "https://i.pravatar.cc/300?img=11"
    }
];

const videos = [
    {
        usuario: "Lucas Silva",
        foto: "https://i.pravatar.cc/300?img=12",
        legenda: "⚽ Treino de finalização! Nunca desista dos seus sonhos! #Futebol",
        arquivo: "videos/futebol1.mp4",
        curtidas: 1250
    },
    {
        usuario: "Gabriel Santos",
        foto: "https://i.pravatar.cc/300?img=13",
        legenda: "🔥 Melhores momentos do nosso jogo de hoje!",
        arquivo: "videos/futebol2.mp4",
        curtidas: 890
    },
    {
        usuario: "Pedro Costa",
        foto: "https://i.pravatar.cc/300?img=14",
        legenda: "⚽ A paixão pelo futebol nunca acaba!",
        arquivo: "videos/futebol3.mp4",
        curtidas: 2100
    }
];

// Mostrar stories
const listaStories = document.getElementById("listaStories");

stories.forEach(story => {
    const item = document.createElement("div");
    item.className = "story";

    const foto = document.createElement("img");
    foto.src = story.foto;
    foto.alt = "Foto de " + story.nome;

    const nome = document.createElement("p");
    nome.textContent = story.nome;

    item.append(foto, nome);

    item.addEventListener("click", () => {
        abrirStory(story);
    });

    listaStories.appendChild(item);
});

// Abrir e fechar stories
function abrirStory(story) {
    document.getElementById("fotoStory").src = story.foto;
    document.getElementById("nomeStory").textContent =
        "Story de " + story.nome;

    document.getElementById("janelaStory").classList.add("ativo");
}

function fecharStory() {
    document.getElementById("janelaStory").classList.remove("ativo");
}

// Mostrar vídeos
const listaVideos = document.getElementById("listaVideos");

videos.forEach((video, index) => {
    const publicacao = document.createElement("div");
    publicacao.className = "publicacao";

    const usuario = document.createElement("div");
    usuario.className = "usuario";

    const foto = document.createElement("img");
    foto.src = video.foto;
    foto.alt = "Foto do usuário";

    const nome = document.createElement("h3");
    nome.textContent = video.usuario;

    const identificacao = document.createElement("span");
    identificacao.textContent = " @FutTok";

    const dados = document.createElement("div");
    dados.append(nome, identificacao);
    usuario.append(foto, dados);

    const player = document.createElement("video");
    player.className = "video";
    player.src = video.arquivo;
    player.controls = true;
    player.playsInline = true;
    player.preload = "metadata";

    const legenda = document.createElement("p");
    legenda.className = "legenda";
    legenda.textContent = video.legenda;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const curtir = document.createElement("button");
    curtir.textContent = "❤️ " + video.curtidas;

    let jaCurtiu = false;

    curtir.addEventListener("click", () => {
        jaCurtiu = !jaCurtiu;

        video.curtidas += jaCurtiu ? 1 : -1;

        curtir.textContent = "❤️ " + video.curtidas;
        curtir.classList.toggle("curtido", jaCurtiu);
    });

    const comentar = document.createElement("button");
    comentar.textContent = "💬 Comentar";

    comentar.addEventListener("click", () => {
        const texto = prompt("Escreva seu comentário:");

        if (texto && texto.trim()) {
            const comentario = document.createElement("p");
            comentario.textContent = "💬 " + texto.trim();
            areaComentarios.appendChild(comentario);
        }
    });

    const compartilhar = document.createElement("button");
    compartilhar.textContent = "📤 Compartilhar";

    compartilhar.addEventListener("click", async () => {
        const texto = "Confira este vídeo no FutTok: " + video.legenda;

        if (navigator.share) {
            try {
                await navigator.share({ title: "FutTok", text: texto });
            } catch (erro) {
                console.log("Compartilhamento cancelado.");
            }
        } else {
            alert(texto);
        }
    });

    acoes.append(curtir, comentar, compartilhar);

    const areaComentarios = document.createElement("div");
    areaComentarios.className = "comentarios";

    publicacao.append(
        usuario,
        player,
        legenda,
        acoes,
        areaComentarios
    );

    listaVideos.appendChild(publicacao);
});

// Mostrar perfis
const listaPerfis = document.getElementById("listaPerfis");

perfis.forEach(perfil => {
    const card = document.createElement("div");
    card.className = "perfil";

    const foto = document.createElement("img");
    foto.src = perfil.foto;
    foto.alt = perfil.nome;

    const nome = document.createElement("h3");
    nome.textContent = perfil.nome;

    const usuario = document.createElement("p");
    usuario.textContent = perfil.usuario;

    const botao = document.createElement("button");
    botao.textContent = "Seguir";

    botao.addEventListener("click", () => {
        const seguindo = botao.classList.toggle("seguindo");

        botao.textContent = seguindo ? "Seguindo ✓" : "Seguir";
    });

    card.append(foto, nome, usuario, botao);
    listaPerfis.appendChild(card);
});

// Pesquisa de pessoas
document.getElementById("pesquisa").addEventListener("input", function() {
    const termo = this.value.toLowerCase();

    document.querySelectorAll(".perfil").forEach(card => {
        const nome = card.querySelector("h3").textContent.toLowerCase();
        const usuario = card.querySelector("p").textContent.toLowerCase();

        card.style.display =
            nome.includes(termo) || usuario.includes(termo)
            ? "block" : "none";
    });
});

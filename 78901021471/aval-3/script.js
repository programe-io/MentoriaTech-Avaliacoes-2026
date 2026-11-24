
const feed = document.getElementById("feed");

let videos = [];
let activeCommentVideo = null;

// Vídeos demonstrativos.
// Substitua os endereços por vídeos de futebol em MP4.
const initialVideos = [
    {
        id: 1,
        user: "FutebolBrasil",
        description: "⚽ Melhores momentos do futebol! #futebol #gols",
        category: "gols",
        url: "https://videos.pexels.com/video-files/3129671/3129671-hd_1080_1920_25fps.mp4"
    },
    {
        id: 2,
        user: "CraqueDosDribles",
        description: "🔥 Habilidade e muita velocidade! #dribles",
        category: "dribles",
        url: "https://videos.pexels.com/video-files/3195394/3195394-hd_1080_1920_25fps.mp4"
    },
    {
        id: 3,
        user: "FutebolSkills",
        description: "🎯 Treinando habilidades com a bola!",
        category: "skills",
        url: "https://videos.pexels.com/video-files/854058/854058-hd_1080_1920_25fps.mp4"
    }
];

let nextId = 4;

// Criar objeto de vídeo
function createVideo(data) {
    return {
        ...data,
        likes: 0,
        comments: [],
        views: 0,
        score: 0,
        liked: false,
        following: false
    };
}

videos = initialVideos.map(createVideo);

// Criar cartão
function renderVideo(video) {
    const card = document.createElement("article");

    card.className = "video-card";
    card.dataset.id = video.id;

    card.innerHTML = `
        <video src="${video.url}" loop playsinline
            preload="metadata"></video>

        <div class="video-overlay"></div>

        <div class="video-info">
            <h3>@${video.user}</h3>
            <p></p>
            <small>⚽ Som original - FutTok</small>
        </div>

        <div class="actions">
            <button class="like">
                ❤️ <span>${video.likes}</span>
            </button>

            <button class="comment">
                💬 <span>${video.comments.length}</span>
            </button>

            <button class="share">↗️</button>

            <button class="follow-btn">
                ${video.following ? "Seguindo" : "+ Seguir"}
            </button>
        </div>
    `;

    card.querySelector(".video-info p").textContent =
        video.description;

    const videoElement = card.querySelector("video");

    // Reproduzir e pausar
    videoElement.addEventListener("click", () => {
        if (videoElement.paused) {
            videoElement.play().catch(() => {});
        } else {
            videoElement.pause();
        }
    });

    // Curtir
    card.querySelector(".like").addEventListener("click", event => {
        video.liked = !video.liked;

        video.likes += video.liked ? 1 : -1;
        video.score += video.liked ? 5 : -3;

        const button = event.currentTarget;
        button.classList.toggle("liked", video.liked);
        button.querySelector("span").textContent = video.likes;

        recommendVideos();
    });

    // Comentários
    card.querySelector(".comment").addEventListener("click", () => {
        openComments(video.id);
    });

    // Compartilhar
    card.querySelector(".share").addEventListener("click", async () => {
        const shareData = {
            title: "FutTok ⚽",
            text: video.description,
            url: location.href + "#video-" + video.id
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                alert("Link copiado!");
            }
        } catch (error) {
            console.log("Compartilhamento cancelado.");
        }
    });

    // Seguir criador
    card.querySelector(".follow-btn").addEventListener("click", event => {
        video.following = !video.following;

        event.currentTarget.textContent =
            video.following ? "Seguindo" : "+ Seguir";
    });

    return card;
}

// Mostrar feed
function showVideos(list = videos) {
    document.querySelectorAll(".video-card video").forEach(video => {
        video.pause();
    });

    feed.innerHTML = "";

    if (list.length === 0) {
        feed.innerHTML =
            "<p style='padding:30px'>Nenhum vídeo encontrado. ⚽</p>";
        return;
    }

    list.forEach(video => {
        feed.appendChild(renderVideo(video));
    });

    startAutoPlay();
}

// Reprodução automática
let videoObserver;

function startAutoPlay() {
    if (videoObserver) {
        videoObserver.disconnect();
    }

    videoObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const element = entry.target;

            if (entry.isIntersecting) {
                element.play().catch(() => {});

                const id = Number(
                    element.closest(".video-card").dataset.id
                );

                const video = videos.find(v => v.id === id);

                if (video) {
                    video.views++;
                    video.score += 1;
                }
            } else {
                element.pause();
            }
        });
    }, {
        threshold: 0.7
    });

    document.querySelectorAll(".video-card video").forEach(video => {
        videoObserver.observe(video);
    });
}

// Algoritmo de recomendação
function recommendVideos() {
    videos.sort((a, b) => b.score - a.score);
    showVideos();
}

// Filtro de categorias
function filterFeed(category) {
    const result = category === "todos"
        ? videos
        : videos.filter(video => video.category === category);

    showVideos(result);
}

// Pesquisa
document.getElementById("search").addEventListener("input", event => {
    const search = event.target.value.toLowerCase();

    const result = videos.filter(video =>
        video.user.toLowerCase().includes(search) ||
        video.description.toLowerCase().includes(search) ||
        video.category.toLowerCase().includes(search)
    );

    showVideos(result);
});

// Abrir comentários
function openComments(id) {
    activeCommentVideo = videos.find(v => v.id === id);

    document.getElementById("commentModal").style.display = "flex";

    renderComments();
}

// Mostrar comentários
function renderComments() {
    const list = document.getElementById("commentsList");

    list.innerHTML = "";

    if (!activeCommentVideo.comments.length) {
        list.textContent = "Seja o primeiro a comentar! ⚽";
        return;
    }

    activeCommentVideo.comments.forEach(comment => {
        const p = document.createElement("p");
        p.textContent = "💬 " + comment;
        list.appendChild(p);
    });
}

// Enviar comentário
document.getElementById("sendComment").addEventListener("click", () => {
    const input = document.getElementById("commentInput");
    const text = input.value.trim();

    if (!text || !activeCommentVideo) return;

    activeCommentVideo.comments.push(text);
    activeCommentVideo.score += 3;

    const card = document.querySelector(
        `[data-id="${activeCommentVideo.id}"]`
    );

    if (card) {
        card.querySelector(".comment span").textContent =
            activeCommentVideo.comments.length;
    }

    input.value = "";
    renderComments();
    recommendVideos();
});

function closeComments() {
    document.getElementById("commentModal").style.display = "none";
}

// Upload de vídeos
document.getElementById("uploadVideo").addEventListener("change", event => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
        alert("Selecione um arquivo de vídeo válido.");
        return;
    }

    const url = URL.createObjectURL(file);

    const newVideo = createVideo({
        id: nextId++,
        user: "MeuPerfil",
        description: "⚽ Meu novo vídeo de futebol! #futebol",
        category: "gols",
        url
    });

    videos.unshift(newVideo);

    showVideos();

    event.target.value = "";
});

// Inicialização
showVideos();

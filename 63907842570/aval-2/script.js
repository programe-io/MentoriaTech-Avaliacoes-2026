
const videos = [
    {
        user: "@criador",
        description: "Bem-vindo ao meu TikTok! 🔥",
        music: "Som original",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        likes: 12500,
        comments: 320,
        shares: 150
    },
    {
        user: "@video_viral",
        description: "Esse vídeo ficou incrível 😂",
        music: "Música viral",
        video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        likes: 25000,
        comments: 850,
        shares: 400
    },
    {
        user: "@mundo",
        description: "A natureza é maravilhosa 🌸",
        music: "Som da natureza",
        video: "https://www.w3schools.com/html/movie.mp4",
        likes: 8700,
        comments: 120,
        shares: 90
    }
];

let currentVideo = 0;
let likedVideos = new Set();
let muted = true;

const feed = document.querySelector("#feed");

function renderVideos() {
    feed.innerHTML = "";

    videos.forEach((video, index) => {
        const section = document.createElement("section");
        section.className = "video-card";

        section.innerHTML = `
            <video
                class="video"
                src="${video.video}"
                loop
                muted
                playsinline
                preload="metadata">
            </video>

            <div class="video-info">
                <h3>${video.user}</h3>
                <p>${video.description}</p>
                <p class="music">♫ ${video.music}</p>
            </div>

            <div class="actions">
                <button class="avatar" onclick="followUser(this)">👤</button>

                <button class="like-btn" onclick="likeVideo(${index}, this)">
                    <span>❤️</span>
                    <small>${formatNumber(video.likes)}</small>
                </button>

                <button onclick="commentVideo(${index})">
                    💬
                    <small>${formatNumber(video.comments)}</small>
                </button>

                <button onclick="shareVideo(${index})">
                    ↗️
                    <small>${formatNumber(video.shares)}</small>
                </button>
            </div>

            <button class="sound-btn" onclick="toggleSound()">
                🔇
            </button>

            <div class="video-overlay" onclick="toggleVideo(this)">
                <span class="pause-icon">▶</span>
            </div>
        `;

        feed.appendChild(section);
    });

    setupObserver();
}

function formatNumber(number) {
    if (number >= 1000) {
        return (number / 1000).toFixed(1).replace(".0", "") + " mil";
    }
    return number;
}

// CURTIR VÍDEO
function likeVideo(index, button) {
    const icon = button.querySelector("span");

    if (likedVideos.has(index)) {
        likedVideos.delete(index);
        videos[index].likes--;
        icon.style.filter = "grayscale(1)";
    } else {
        likedVideos.add(index);
        videos[index].likes++;
        icon.style.filter = "none";
        icon.animate(
            [
                { transform: "scale(1)" },
                { transform: "scale(1.5)" },
                { transform: "scale(1)" }
            ],
            { duration: 300 }
        );
    }

    button.querySelector("small").textContent =
        formatNumber(videos[index].likes);
}

// PAUSAR E REPRODUZIR
function toggleVideo(overlay) {
    const card = overlay.closest(".video-card");
    const video = card.querySelector("video");
    const icon = card.querySelector(".pause-icon");

    if (video.paused) {
        video.play();
        icon.style.opacity = "0";
    } else {
        video.pause();
        icon.style.opacity = "1";
    }
}

// SOM
function toggleSound() {
    muted = !muted;

    document.querySelectorAll(".video").forEach(video => {
        video.muted = muted;
    });

    document.querySelectorAll(".sound-btn").forEach(button => {
        button.textContent = muted ? "🔇" : "🔊";
    });
}

// COMENTÁRIOS
function commentVideo(index) {
    const comment = prompt("Escreva seu comentário:");

    if (comment && comment.trim()) {
        videos[index].comments++;

        alert("Comentário enviado: " + comment);

        renderVideos();
    }
}

// COMPARTILHAR
function shareVideo(index) {
    const url = videos[index].video;

    if (navigator.share) {
        navigator.share({
            title: "Meu vídeo",
            text: videos[index].description,
            url: url
        }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url)
            .then(() => alert("Link copiado!"))
            .catch(() => alert("Não foi possível copiar o link."));
    } else {
        prompt("Copie o link:", url);
    }
}

// SEGUIR
function followUser(button) {
    button.textContent =
        button.textContent === "👤" ? "✓" : "👤";
}

// REPRODUÇÃO AUTOMÁTICA AO ENTRAR NA TELA
function setupObserver() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const video = entry.target;

            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.7
    });

    document.querySelectorAll(".video").forEach(video => {
        observer.observe(video);
    });
}

// NAVEGAÇÃO
function goHome() {
    feed.scrollTo({ top: 0, behavior: "smooth" });
}

function goToNext() {
    feed.scrollBy({
        top: feed.clientHeight,
        behavior: "smooth"
    });
}

// INICIALIZAÇÃO
renderVideos();

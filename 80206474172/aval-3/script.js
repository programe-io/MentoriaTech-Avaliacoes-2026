
const feed = document.getElementById("videoFeed");

const modal = document.getElementById("uploadModal");

const openUpload = document.getElementById("openUpload");
const closeUpload = document.getElementById("closeUpload");
const publishVideo = document.getElementById("publishVideo");

// ABRIR E FECHAR MODAL

openUpload.addEventListener("click", () => {
    modal.classList.add("show");
});

closeUpload.addEventListener("click", () => {
    modal.classList.remove("show");
});

// CONTROLE DE CURTIDAS

document.addEventListener("click", (e) => {

    const button = e.target.closest(".like-btn");

    if (button) {
        button.classList.toggle("liked");

        const icon = button.querySelector("span");

        icon.textContent = button.classList.contains("liked") ? "♥" : "♡";
    }

});

// COMPARTILHAR

document.addEventListener("click", async (e) => {

    const button = e.target.closest(".share-btn");

    if (!button) return;

    try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copiado para compartilhar!");
    } catch {
        alert("Não foi possível copiar o link.");
    }

});

// PUBLICAR VÍDEO

publishVideo.addEventListener("click", () => {

    const username = document.getElementById("username").value.trim();
    const videoUrl = document.getElementById("videoUrl").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!username || !videoUrl) {
        alert("Preencha seu nome e o link do vídeo!");
        return;
    }

    let url;

    try {
        url = new URL(videoUrl);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }
    } catch {
        alert("Digite um link válido!");
        return;
    }

    const card = document.createElement("section");
    card.className = "video-card";

    const video = document.createElement("video");
    video.className = "video";
    video.src = url.href;
    video.loop = true;
    video.playsInline = true;
    video.muted = true;

    const info = document.createElement("div");
    info.className = "video-info";

    const title = document.createElement("h3");
    title.textContent = "@" + username;

    const caption = document.createElement("p");
    caption.textContent = description;

    const music = document.createElement("p");
    music.className = "music";
    music.textContent = "♫ Som original";

    info.append(title, caption, music);

    const actions = document.createElement("div");
    actions.className = "video-actions";

    actions.innerHTML = `
        <div class="creator-avatar">${username.charAt(0).toUpperCase()}</div>

        <button class="like-btn">
            <span>♡</span>
            <small>0</small>
        </button>

        <button class="comment-btn">
            <span>💬</span>
            <small>0</small>
        </button>

        <button class="share-btn">
            <span>➤</span>
            <small>Compartilhar</small>
        </button>

        <div class="music-disc">♫</div>
    `;

    card.append(video, info, actions);

    feed.prepend(card);

    modal.classList.remove("show");

    document.getElementById("username").value = "";
    document.getElementById("videoUrl").value = "";
    document.getElementById("description").value = "";

    feed.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    observarVideos();
});

// REPRODUÇÃO AUTOMÁTICA DO VÍDEO VISÍVEL

let observador;

function observarVideos() {

    if (observador) observador.disconnect();

    observador = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            const video = entry.target;

            if (entry.isIntersecting) {
                video.muted = true;
                video.play().catch(() => {});
            } else {
                video.pause();
            }

        });

    }, {
        root: feed,
        threshold: 0.7
    });

    document.querySelectorAll(".video").forEach(video => {
        observador.observe(video);
    });
}

observarVideos();

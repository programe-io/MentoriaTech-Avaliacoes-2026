
const feed = document.querySelector("#videoFeed");
const uploadModal = document.querySelector("#uploadModal");
const commentsPanel = document.querySelector("#commentsPanel");

let selectedCard = null;
let followedUsers = new Set();
let favorites = new Set();

// ABRIR PUBLICAÇÃO
function openUpload() {
    uploadModal.classList.add("open");
}

document.querySelector("#openUpload").addEventListener("click", openUpload);
document.querySelector("#mobileUpload").addEventListener("click", openUpload);

document.querySelector("#closeUpload").addEventListener("click", () => {
    uploadModal.classList.remove("open");
});

// CURTIR
document.addEventListener("click", event => {
    const button = event.target.closest(".like");
    if (!button) return;

    button.classList.toggle("liked");

    const icon = button.querySelector("span");
    const count = button.querySelector("small");

    let number = Number(count.dataset.count || 0);

    if (button.classList.contains("liked")) {
        icon.textContent = "♥";
        number++;
    } else {
        icon.textContent = "♡";
        number = Math.max(0, number - 1);
    }

    count.dataset.count = number;
    count.textContent = number.toLocaleString("pt-BR");
});

// FAVORITOS
document.addEventListener("click", event => {
    const button = event.target.closest(".favorite");
    if (!button) return;

    const card = button.closest(".video-card");
    button.classList.toggle("saved");

    if (button.classList.contains("saved")) {
        favorites.add(card);
        button.querySelector("small").textContent = "Salvo";
    } else {
        favorites.delete(card);
        button.querySelector("small").textContent = "Salvar";
    }
});

// SEGUIR
document.addEventListener("click", event => {
    const button = event.target.closest(".follow");
    if (!button) return;

    const card = button.closest(".video-card");
    const user = card.dataset.user;

    if (followedUsers.has(user)) {
        followedUsers.delete(user);
        button.textContent = "+";
        button.classList.remove("following");
    } else {
        followedUsers.add(user);
        button.textContent = "✓";
        button.classList.add("following");
    }

    document.querySelector("#followingCount").textContent =
        120 + followedUsers.size;
});

// REPRODUÇÃO DOS VÍDEOS
function setupVideo(card) {
    const video = card.querySelector("video");
    const playButton = card.querySelector(".video-play");

    async function toggleVideo() {
        if (video.paused) {
            document.querySelectorAll(".video-container video").forEach(other => {
                if (other !== video) {
                    other.pause();
                    other.closest(".video-container")
                        .querySelector(".video-play").style.display = "block";
                }
            });

            try {
                await video.play();
                playButton.style.display = "none";
            } catch {
                alert("Não foi possível reproduzir o vídeo.");
            }
        } else {
            video.pause();
            playButton.style.display = "block";
        }
    }

    video.addEventListener("click", toggleVideo);
    playButton.addEventListener("click", toggleVideo);
}

document.querySelectorAll(".video-card").forEach(setupVideo);

// COMENTÁRIOS
document.addEventListener("click", event => {
    const button = event.target.closest(".comments");
    if (!button) return;

    selectedCard = button.closest(".video-card");

    document.querySelector("#commentsList").replaceChildren();

    commentsPanel.classList.add("open");
});

document.querySelector("#closeComments").addEventListener("click", () => {
    commentsPanel.classList.remove("open");
});

// ADICIONAR COMENTÁRIO
document.querySelector("#commentForm").addEventListener("submit", event => {
    event.preventDefault();

    const input = document.querySelector("#commentInput");
    const text = input.value.trim();

    if (!text || !selectedCard) return;

    const item = document.createElement("div");
    item.className = "comment-item";

    const username = document.createElement("strong");
    username.textContent = "@seu_usuario";

    const message = document.createElement("p");
    message.textContent = text;

    item.append(username, message);

    const list = document.querySelector("#commentsList");

    if (list.querySelector(".empty-message")) {
        list.replaceChildren();
    }

    list.append(item);

    const count = selectedCard.querySelector(".comments small");
    const number = Number(count.dataset.count || 0) + 1;

    count.dataset.count = number;
    count.textContent = number.toLocaleString("pt-BR");

    input.value = "";
});

// COMPARTILHAR
document.addEventListener("click", async event => {
    const button = event.target.closest(".share");
    if (!button) return;

    const card = button.closest(".video-card");
    const user = card.dataset.user;

    try {
        if (navigator.share) {
            await navigator.share({
                title: "TikTok World",
                text: "Confira este vídeo de @" + user,
                url: window.location.href
            });
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href);
            alert("Link copiado!");
        } else {
            alert("Compartilhamento não disponível.");
        }
    } catch (error) {
        if (error.name !== "AbortError") {
            alert("Não foi possível compartilhar.");
        }
    }
});

// PUBLICAR VÍDEO
document.querySelector("#uploadForm").addEventListener("submit", event => {
    event.preventDefault();

    const urlText = document.querySelector("#videoUrl").value.trim();
    const captionText = document.querySelector("#videoCaption").value.trim();
    const category = document.querySelector("#videoCategory").value;

    let url;

    try {
        url = new URL(urlText);
    } catch {
        alert("Digite um link válido.");
        return;
    }

    if (!["https:", "http:"].includes(url.protocol)) {
        alert("Use um endereço de vídeo válido.");
        return;
    }

    const card = document.createElement("article");
    card.className = "video-card";
    card.dataset.user = "seu_usuario";
    card.dataset.category = category;

    const container = document.createElement("div");
    container.className = "video-container";

    const video = document.createElement("video");
    video.src = url.href;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    const gradient = document.createElement("div");
    gradient.className = "video-gradient";

    const text = document.createElement("div");
    text.className = "video-text";

    const username = document.createElement("strong");
    username.textContent = "@seu_usuario";

    const caption = document.createElement("p");
    caption.textContent = captionText || "Novo vídeo!";

    const music = document.createElement("span");
    music.textContent = "♫ Som original - seu_usuario";

    text.append(username, caption, music);

    const play = document.createElement("button");
    play.className = "video-play";
    play.textContent = "▶";

    container.append(video, gradient, text, play);

    const actions = document.createElement("div");
    actions.className = "actions";

    const creator = document.createElement("div");
    creator.className = "creator";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Seu perfil";

    const follow = document.createElement("button");
    follow.className = "follow";
    follow.textContent = "+";

    creator.append(avatar, follow);
    actions.append(creator);

    [
        ["♡", "0", "like"],
        ["💬", "0", "comments"],
        ["★", "Salvar", "favorite"],
        ["↗", "Compartilhar", "share"]
    ].forEach(([icon, label, className]) => {
        const button = document.createElement("button");
        button.className = "action " + className;

        const span = document.createElement("span");
        span.textContent = icon;

        const small = document.createElement("small");
        small.textContent = label;

        button.append(span, small);
        actions.append(button);
    });

    const disc = document.createElement("div");
    disc.className = "music-disc";
    disc.textContent = "♪";
    actions.append(disc);

    card.append(container, actions);
    feed.prepend(card);

    setupVideo(card);

    uploadModal.classList.remove("open");
    event.target.reset();

    document.querySelectorAll(".video-card").forEach(item => {
        item.style.display = "flex";
    });

    document.querySelector("#feedPage").classList.remove("hidden");
    document.querySelector("#profilePage").classList.add("hidden");
});

// NAVEGAÇÃO
function showPage(page) {
    const feedPage = document.querySelector("#feedPage");
    const profilePage = document.querySelector("#profilePage");

    if (page === "profile") {
        feedPage.classList.add("hidden");
        profilePage.classList.remove("hidden");
    } else {
        profilePage.classList.add("hidden");
        feedPage.classList.remove("hidden");
    }

    document.querySelectorAll(".nav-item").forEach(button => {
        button.classList.toggle("active", button.dataset.page === page);
    });
}

document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => {
        showPage(button.dataset.page);
    });
});

// ABA DO FEED
document.querySelectorAll(".feed-tab").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".feed-tab").forEach(tab => {
            tab.classList.remove("active");
        });

        button.classList.add("active");
    });
});

// PESQUISA
function searchVideos() {
    const query = document.querySelector("#searchInput")
        .value.trim().toLowerCase();

    showPage("home");

    document.querySelectorAll(".video-card").forEach(card => {
        const content = (
            card.dataset.user + " " + card.textContent
        ).toLowerCase();

        card.style.display = content.includes(query) ? "flex" : "none";
    });
}

document.querySelector("#searchButton").addEventListener("click", searchVideos);

document.querySelector("#searchInput").addEventListener("keydown", event => {
    if (event.key === "Enter") searchVideos();
});

// GALERIA DO PERFIL
function updateProfileGrid() {
    const grid = document.querySelector("#profileGrid");
    grid.replaceChildren();

    document.querySelectorAll(".video-card").forEach(card => {
        if (card.dataset.user !== "seu_usuario") return;

        const video = document.createElement("video");
        video.src = card.querySelector("video").src;
        video.muted = true;
        video.playsInline = true;

        grid.append(video);
    });
}

// OBSERVAR PUBLICAÇÕES NO PERFIL
const uploadForm = document.querySelector("#uploadForm");

uploadForm.addEventListener("submit", () => {
    setTimeout(updateProfileGrid, 0);
});

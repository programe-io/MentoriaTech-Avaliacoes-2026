
const feed = document.getElementById("videoFeed");
const uploadModal = document.getElementById("uploadModal");
const commentModal = document.getElementById("commentModal");

let currentPost = null;

// REPRODUÇÃO AUTOMÁTICA DOS VÍDEOS

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;

        if (entry.isIntersecting) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    });
}, { threshold: 0.7 });

function observeVideos() {
    document.querySelectorAll(".video").forEach(video => {
        if (!video.dataset.observed) {
            observer.observe(video);
            video.dataset.observed = "true";
        }
    });
}

observeVideos();

// PAUSAR E REPRODUZIR

feed.addEventListener("click", (event) => {
    if (event.target.classList.contains("video")) {
        const video = event.target;

        if (video.paused) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }
});

// CURTIDAS

document.addEventListener("click", (event) => {
    const button = event.target.closest(".like");

    if (!button) return;

    const count = button.querySelector("span");
    let number = Number(button.dataset.count || 25400);

    if (button.classList.contains("liked")) {
        button.classList.remove("liked");
        number--;
    } else {
        button.classList.add("liked");
        number++;
    }

    button.dataset.count = number;
    count.textContent = number.toLocaleString("pt-BR");
});

// SEGUIR USUÁRIOS

document.addEventListener("click", (event) => {
    const button = event.target.closest(".follow");

    if (!button) return;

    button.classList.toggle("following");

    button.textContent =
        button.classList.contains("following") ? "✓" : "+";

    button.style.background =
        button.classList.contains("following") ? "#555" : "#fe2c55";
});

// COMPARTILHAR

document.addEventListener("click", async (event) => {
    const button = event.target.closest(".share");

    if (!button) return;

    const video = button.closest(".video-card").querySelector("video");

    try {
        if (navigator.share) {
            await navigator.share({
                title: "TikTokPlay",
                text: "Confira este vídeo!",
                url: video.currentSrc
            });
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(video.currentSrc);
            alert("Link copiado!");
        } else {
            alert("Compartilhamento não disponível neste navegador.");
        }
    } catch (error) {
        if (error.name !== "AbortError") {
            alert("Não foi possível compartilhar.");
        }
    }
});

// ABRIR COMENTÁRIOS

document.addEventListener("click", (event) => {
    const button = event.target.closest(".comment");

    if (!button) return;

    currentPost = button.closest(".video-card");

    commentModal.style.display = "flex";
});

// ENVIAR COMENTÁRIO

document.getElementById("sendComment").onclick = () => {
    const input = document.getElementById("commentInput");
    const text = input.value.trim();

    if (!text) return;

    const comment = document.createElement("div");
    comment.className = "comment-item";

    const strong = document.createElement("strong");
    strong.textContent = "@voce";

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    comment.append(strong, paragraph);

    document.getElementById("commentList").appendChild(comment);

    input.value = "";
};

// FECHAR MODAIS

document.getElementById("closeModal").onclick = () => {
    uploadModal.style.display = "none";
};

document.getElementById("closeComments").onclick = () => {
    commentModal.style.display = "none";
};

// ABRIR PUBLICAÇÃO

document.querySelector(".bottom-menu .add").onclick = () => {
    uploadModal.style.display = "flex";
};

// CRIAR VÍDEO

document.getElementById("publishVideo").onclick = () => {
    const username = document.getElementById("newUser").value.trim();
    const videoURL = document.getElementById("newVideo").value.trim();
    const caption = document.getElementById("newCaption").value.trim();

    if (!username || !videoURL) {
        alert("Preencha seu usuário e o link do vídeo!");
        return;
    }

    let url;

    try {
        url = new URL(videoURL);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error();
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
    video.muted = true;
    video.playsInline = true;

    const info = document.createElement("div");
    info.className = "video-info";

    const name = document.createElement("h3");
    name.textContent = "@" + username;

    const description = document.createElement("p");
    description.textContent = caption;

    const music = document.createElement("p");
    music.innerHTML = '<i class="fas fa-music"></i> Som original';

    info.append(name, description, music);

    const actions = document.createElement("div");
    actions.className = "actions";

    const profile = document.createElement("div");
    profile.className = "profile";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";

    const follow = document.createElement("button");
    follow.className = "follow";
    follow.textContent = "+";

    profile.append(avatar, follow);

    actions.append(profile);

    function createAction(icon, label, className) {
        const button = document.createElement("button");
        button.className = "action " + className;

        const i = document.createElement("i");
        i.className = icon;

        const span = document.createElement("span");
        span.textContent = label;

        button.append(i, span);
        actions.append(button);

        return button;
    }

    const like = createAction(
        "fas fa-heart", "0", "like"
    );

    like.dataset.count = "0";

    createAction(
        "fas fa-comment-dots", "0", "comment"
    );

    createAction(
        "fas fa-share", "Compartilhar", "share"
    );

    card.append(video, info, actions);

    video.addEventListener("error", () => {
        alert("Não foi possível carregar o vídeo.");
        card.remove();
    }, { once: true });

    feed.prepend(card);

    observeVideos();

    uploadModal.style.display = "none";

    document.getElementById("newUser").value = "";
    document.getElementById("newVideo").value = "";
    document.getElementById("newCaption").value = "";
};

// FECHAR MODAL CLICANDO FORA

[uploadModal, commentModal].forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

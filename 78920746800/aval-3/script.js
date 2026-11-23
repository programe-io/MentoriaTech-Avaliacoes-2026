
const feed = document.getElementById("feed");
const uploadInput = document.getElementById("videoUpload");

// Curtidas
function activateLike(button) {
    const counter = button.querySelector("span");
    let likes = Number(counter.textContent);

    if (button.classList.contains("liked")) {
        button.classList.remove("liked");
        button.innerHTML = `❤️ <span>${likes - 1}</span>`;
    } else {
        button.classList.add("liked");
        button.innerHTML = `💖 <span>${likes + 1}</span>`;
    }
}

// Seguir criadores
function activateFollow(button) {
    button.classList.toggle("following");

    if (button.classList.contains("following")) {
        button.textContent = "✓";
    } else {
        button.textContent = "+";
    }
}

// Comentários
function activateComment(button) {
    const comment = prompt("Escreva seu comentário:");

    if (comment && comment.trim() !== "") {
        const counter = button.querySelector("span");
        counter.textContent = Number(counter.textContent) + 1;

        alert("Comentário publicado: " + comment);
    }
}

// Compartilhar
async function activateShare(button) {
    const url = window.location.href;

    try {
        if (navigator.share) {
            await navigator.share({
                title: "VibeTok",
                text: "Confira este vídeo!",
                url: url
            });
        } else {
            await navigator.clipboard.writeText(url);
            alert("Link copiado!");
        }
    } catch (error) {
        console.log("Compartilhamento cancelado.");
    }
}

// Eventos dos botões
feed.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button) return;

    if (button.classList.contains("like-btn")) {
        activateLike(button);
    }

    if (button.classList.contains("follow-btn")) {
        activateFollow(button);
    }

    if (button.classList.contains("comment-btn")) {
        activateComment(button);
    }

    if (button.classList.contains("share-btn")) {
        activateShare(button);
    }
});

// Pausar e reproduzir vídeos
feed.addEventListener("click", function(event) {
    if (event.target.tagName === "VIDEO") {
        const video = event.target;

        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
});

// Reprodução automática do vídeo visível
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;

        if (entry.isIntersecting) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    });
}, {
    threshold: 0.6
});

function observeVideos() {
    document.querySelectorAll(".video").forEach(video => {
        observer.observe(video);
    });
}

observeVideos();

// Abrir seletor de vídeos
function openUpload() {
    uploadInput.click();
}

document.getElementById("uploadBtn").addEventListener("click", openUpload);
document.getElementById("navUploadBtn").addEventListener("click", openUpload);

// Publicar vídeo selecionado
uploadInput.addEventListener("change", function() {
    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
        alert("Selecione um arquivo de vídeo.");
        return;
    }

    const videoURL = URL.createObjectURL(file);

    const card = document.createElement("article");
    card.className = "video-card";

    card.innerHTML = `
        <video class="video" loop muted playsinline></video>

        <div class="video-info">
            <h3>@voce</h3>
            <p>Meu novo vídeo! 🚀</p>
            <p>🎵 Som original</p>
        </div>

        <div class="video-actions">
            <div class="creator-avatar">U</div>
            <button class="follow-btn">+</button>
            <button class="like-btn">❤️ <span>0</span></button>
            <button class="comment-btn">💬 <span>0</span></button>
            <button class="share-btn">↗️ <span>Compartilhar</span></button>
        </div>
    `;

    const video = card.querySelector("video");
    video.src = videoURL;

    feed.prepend(card);
    observeVideos();

    video.play().catch(() => {});

    feed.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    this.value = "";
});

// Navegação inferior
document.getElementById("homeBtn").onclick = () => {
    feed.scrollTo({ top: 0, behavior: "smooth" });
};

document.getElementById("searchBtn").onclick = () => {
    const search = prompt("O que você deseja encontrar?");
    if (search) {
        alert("Busca por: " + search +
            "\nA busca completa será implementada com um servidor.");
    }
};

document.getElementById("inboxBtn").onclick = () => {
    alert("Sua caixa de mensagens aparecerá aqui!");
};

document.getElementById("profileBtn").onclick = () => {
    alert("Seu perfil aparecerá aqui!");
};

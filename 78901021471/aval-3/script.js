
const feed = document.getElementById("feed");

const STORAGE_KEY = "futtok_interactions_v1";

let activeCategory = "todos";
let activeSort = "recomendados";
let activeVideoId = null;
let videos = [];
let nextId = 5;
let observer;

// Vídeos iniciais
// Coloque seus arquivos MP4 na pasta videos.
const initialVideos = [
    {
        id: 1,
        user: "FutebolBrasil",
        description: "QUE GOLAÇO! ⚽🔥 Um chute incrível!",
        category: "gols",
        src: "videos/gol.mp4",
        poster: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=900",
        views: 1200
    },
    {
        id: 2,
        user: "ReiDosDribles",
        description: "Olha esse drible desconcertante! 😱",
        category: "dribles",
        src: "videos/drible.mp4",
        poster: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=900",
        views: 900
    },
    {
        id: 3,
        user: "FreestyleFC",
        description: "Habilidade pura com a bola! 🎯",
        category: "skills",
        src: "videos/fintas.mp4",
        poster: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=900",
        views: 700
    },
    {
        id: 4,
        user: "GoleirosBrasil",
        description: "DEFESA ESPETACULAR! 🧤",
        category: "defesas",
        src: "videos/defesa.mp4",
        poster: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900",
        views: 500
    }
];

// Recuperar interações salvas
function loadInteractions() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
}

const savedInteractions = loadInteractions();

// Preparar publicações
videos = initialVideos.map(video => {
    const saved = savedInteractions[video.id] || {};

    return {
        ...video,
        likes: saved.likes || 0,
        comments: saved.comments || [],
        liked: saved.liked || false,
        following: saved.following || false,
        score: saved.score || 0
    };
});

// Salvar interações
function saveInteractions() {
    const data = {};

    videos.forEach(video => {
        data[video.id] = {
            likes: video.likes,
            comments: video.comments,
            liked: video.liked,
            following: video.following,
            score: video.score
        };
    });

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        showToast("Não foi possível salvar os dados.");
    }
}

// Avisos
function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

// Criar publicação
function createCard(video) {
    const card = document.createElement("article");

    card.className = "video-card";
    card.dataset.id = video.id;

    const player = document.createElement("video");

    player.src = video.src;
    player.poster = video.poster || "";
    player.loop = true;
    player.playsInline = true;
    player.preload = "metadata";

    const gradient = document.createElement("div");
    gradient.className = "video-gradient";

    const info = document.createElement("div");
    info.className = "video-info";

    const username = document.createElement("h3");
    username.textContent = "@" + video.user;

    const description = document.createElement("p");
    description.textContent = video.description;

    const category = document.createElement("small");
    category.textContent = "#Futebol #" + video.category;

    info.append(username, description, category);

    const actions = document.createElement("div");
    actions.className = "video-actions";

    // Curtir
    const likeButton = document.createElement("button");

    likeButton.className = video.liked ? "liked" : "";
    likeButton.innerHTML =
        `❤️ <span>${video.likes}</span>`;

    likeButton.addEventListener("click", () => {
        video.liked = !video.liked;
        video.likes += video.liked ? 1 : -1;
        video.score += video.liked ? 5 : -2;

        likeButton.classList.toggle("liked", video.liked);
        likeButton.querySelector("span").textContent = video.likes;

        saveInteractions();
        recommendVideos();
    });

    // Comentários
    const commentButton = document.createElement("button");

    commentButton.innerHTML =
        `💬 <span>${video.comments.length}</span>`;

    commentButton.addEventListener("click", () => {
        openComments(video.id);
    });

    // Compartilhar
    const shareButton = document.createElement("button");

    shareButton.innerHTML = "↗️";

    shareButton.addEventListener("click", async () => {
        const shareUrl = location.href.split("#")[0] +
            "#video-" + video.id;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: "FUTTOK - Futebol",
                    text: video.description,
                    url: shareUrl
                });
            } else {
                await navigator.clipboard.writeText(shareUrl);
                showToast("Link copiado!");
            }
        } catch {
            showToast("Compartilhamento cancelado.");
        }
    });

    // Seguir criador
    const followButton = document.createElement("button");

    followButton.className = "follow-button";

    function updateFollowButton() {
        followButton.textContent =
            video.following ? "✓" : "+";
        followButton.classList.toggle(
            "following", video.following
        );
    }

    updateFollowButton();

    followButton.addEventListener("click", () => {
        video.following = !video.following;

        updateFollowButton();
        saveInteractions();

        showToast(
            video.following
                ? "Você está seguindo @" + video.user
                : "Você deixou de seguir @" + video.user
        );
    });

    // Reproduzir e pausar tocando no vídeo
    player.addEventListener("click", () => {
        if (player.paused) {
            player.play().catch(() => {});
        } else {
            player.pause();
        }
    });

    // Controle de volume
    player.muted = true;

    player.addEventListener("error", () => {
        // Mostra o poster se o vídeo não estiver disponível.
        card.classList.add("video-unavailable");
    });

    actions.append(
        likeButton,
        commentButton,
        shareButton,
        followButton
    );

    card.append(player, gradient, info, actions);

    return card;
}

// Ordenar publicações
function getOrderedVideos() {
    let result = [...videos];

    if (activeCategory !== "todos") {
        result = result.filter(
            video => video.category === activeCategory
        );
    }

    if (activeSort === "recentes") {
        result.sort((a, b) => b.id - a.id);
    }

    if (activeSort === "populares") {
        result.sort((a, b) =>
            (b.likes + b.views) - (a.likes + a.views)
        );
    }

    if (activeSort === "recomendados") {
        result.sort((a, b) =>
            (b.score + b.likes * 2) -
            (a.score + a.likes * 2)
        );
    }

    return result;
}

// Renderizar feed
function renderFeed() {
    if (observer) observer.disconnect();

    document.querySelectorAll(".video-card video").forEach(video => {
        video.pause();
    });

    feed.replaceChildren();

    const list = getOrderedVideos();

    if (!list.length) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent =
            "Nenhum vídeo encontrado. Seja o primeiro a publicar! ⚽";

        feed.appendChild(empty);
        return;
    }

    list.forEach(video => {
        feed.appendChild(createCard(video));
    });

    startAutoPlay();
}

// Reprodução automática
function startAutoPlay() {
    observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const player = entry.target;
            const card = player.closest(".video-card");

            if (entry.isIntersecting) {
                player.play().then(() => {
                    const video = videos.find(
                        v => v.id === Number(card.dataset.id)
                    );

                    if (video) {
                        video.views++;
                        video.score += 0.1;
                    }
                }).catch(() => {});
            } else {
                player.pause();
            }
        });
    }, {
        threshold: 0.65
    });

    document.querySelectorAll(".video-card video").forEach(player => {
        observer.observe(player);
    });
}

// Recomendação
function recommendVideos() {
    if (activeSort === "recomendados") {
        renderFeed();
    }
}

// Filtros de categoria
function filterFeed(category) {
    activeCategory = category;

    document.querySelectorAll(".sidebar button").forEach(button => {
        button.classList.toggle(
            "selected",
            button.dataset.filter === category
        );
    });

    renderFeed();
}

document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
        filterFeed(button.dataset.filter);
    });
});

// Abas do feed
document.querySelectorAll("[data-sort]").forEach(button => {
    button.addEventListener("click", () => {
        activeSort = button.dataset.sort;

        document.querySelectorAll("[data-sort]").forEach(tab => {
            tab.classList.toggle("active", tab === button);
        });

        renderFeed();
    });
});

// Pesquisa
document.getElementById("search").addEventListener("input", event => {
    const term = event.target.value.toLowerCase().trim();

    if (observer) observer.disconnect();

    document.querySelectorAll(".video-card video").forEach(v => v.pause());

    feed.replaceChildren();

    const result = getOrderedVideos().filter(video =>
        video.user.toLowerCase().includes(term) ||
        video.description.toLowerCase().includes(term) ||
        video.category.toLowerCase().includes(term)
    );

    if (!result.length) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = "Nenhum vídeo encontrado.";
        feed.appendChild(empty);
        return;
    }

    result.forEach(video => feed.appendChild(createCard(video)));
    startAutoPlay();
});

// Comentários
function openComments(id) {
    activeVideoId = id;

    document.getElementById("commentModal").classList.add("open");

    renderComments();
}

function renderComments() {
    const video = videos.find(v => v.id === activeVideoId);
    const list = document.getElementById("commentsList");

    list.replaceChildren();

    if (!video || video.comments.length === 0) {
        list.textContent = "Ainda não existem comentários.";
        return;
    }

    video.comments.forEach(comment => {
        const item = document.createElement("div");
        item.className = "comment-item";

        const user = document.createElement("strong");
        user.textContent = comment.user + ": ";

        const text = document.createElement("span");
        text.textContent = comment.text;

        item.append(user, text);
        list.appendChild(item);
    });
}

// Enviar comentário
document.getElementById("commentForm").addEventListener("submit", event => {
    event.preventDefault();

    const input = document.getElementById("commentInput");
    const text = input.value.trim();

    const video = videos.find(v => v.id === activeVideoId);

    if (!video || !text) return;

    video.comments.push({
        user: "Visitante",
        text
    });

    video.score += 3;

    saveInteractions();
    renderComments();

    const card = feed.querySelector(
        `[data-id="${activeVideoId}"]`
    );

    if (card) {
        card.querySelector(".video-actions button:nth-child(2) span")
            .textContent = video.comments.length;
    }

    input.value = "";
});

// Fechar comentários
function closeComments() {
    document.getElementById("commentModal").classList.remove("open");
}

document.getElementById("closeModal").addEventListener(
    "click", closeComments
);

document.getElementById("commentModal").addEventListener(
    "click", event => {
        if (event.target.id === "commentModal") closeComments();
    }
);

// Publicar vídeo
document.getElementById("upload").addEventListener("change", event => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
        showToast("Selecione um arquivo de vídeo.");
        return;
    }

    if (file.size > 100 * 1024 * 1024) {
        showToast("O vídeo deve ter no máximo 100 MB.");
        return;
    }

    const url = URL.createObjectURL(file);

    const newVideo = {
        id: nextId++,
        user: "MeuPerfil",
        description: "Meu vídeo de futebol! ⚽🔥",
        category: "gols",
        src: url,
        poster: "",
        views: 0,
        likes: 0,
        comments: [],
        liked: false,
        following: false,
        score: 0
    };

    videos.unshift(newVideo);

    activeCategory = "todos";
    activeSort = "recentes";

    document.querySelectorAll("[data-sort]").forEach(tab => {
        tab.classList.toggle(
            "active", tab.dataset.sort === "recentes"
        );
    });

    document.getElementById("search").value = "";

    renderFeed();

    showToast("Vídeo publicado com sucesso! ⚽");

    event.target.value = "";
});

// Inicialização
filterFeed("todos");

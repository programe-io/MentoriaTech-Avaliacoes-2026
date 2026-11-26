const videosData = [
  {
    id: 1,
    user: "@dev.criativo",
    caption: "Animações fluidas com CSS puro e zero bibliotecas pesadas #frontend #css",
    sound: "♪ Som original - dev.criativo",
    src: "https://googleapis.com",
    likes: 1240,
    liked: false,
    comments: ["Muito bom esse efeito!", "Salvando para o próximo projeto."]
  },
  {
    id: 2,
    user: "@piaui.no.mapa",
    caption: "Fim de tarde e luz dourada no horizonte #viagem #brasil",
    sound: "♪ Batida Tropical - Remix",
    src: "https://googleapis.com",
    likes: 3890,
    liked: false,
    comments: ["Que visual incrível!"]
  },
  {
    id: 3,
    user: "@codigo.rapido",
    caption: "IntersectionObserver resolve o play/pause automático em poucas linhas #javascript",
    sound: "♪ Lo-fi Coding Beats",
    src: "https://googleapis.com",
    likes: 942,
    liked: false,
    comments: []
  }
];

const feedEl = document.getElementById("feed");
const drawerEl = document.getElementById("commentsDrawer");
const commentsTitleEl = document.getElementById("commentsTitle");
const commentsListEl = document.getElementById("commentsList");
const commentFormEl = document.getElementById("commentForm");
const commentInputEl = document.getElementById("commentInput");
const closeCommentsEl = document.getElementById("closeComments");

let activeVideoId = null;
let globalMuted = true;

function formatCount(num) {
  return num >= 1000 ? `${(num / 1000).toFixed(1).replace(".", ",")} mil` : String(num);
}

function renderFeed() {
  feedEl.innerHTML = "";

  videosData.forEach((item) => {
    const card = document.createElement("article");
    card.className = "video-card";
    card.dataset.id = item.id;

    card.innerHTML = `
      <video src="${item.src}" loop playsinline ${globalMuted ? "muted" : ""}></video>
      <button type="button" class="mute-btn">${globalMuted ? "🔇 Som off" : "🔊 Som on"}</button>
      <div class="actions">
        <button type="button" class="action-btn like-btn ${item.liked ? "liked" : ""}">
          <span class="icon">♥</span>
          <span class="like-count">${formatCount(item.likes)}</span>
        </button>
        <button type="button" class="action-btn comment-btn">
          <span class="icon">💬</span>
          <span class="comment-count">${item.comments.length}</span>
        </button>
        <button type="button" class="action-btn share-btn">
          <span class="icon">↗</span>
          <span>Enviar</span>
        </button>
      </div>
      <div class="meta">
        <h2>${item.user}</h2>
        <p>${item.caption}</p>
        <div class="sound">${item.sound}</div>
      </div>
    `;

    const video = card.querySelector("video");
    const muteBtn = card.querySelector(".mute-btn");
    const likeBtn = card.querySelector(".like-btn");
    const commentBtn = card.querySelector(".comment-btn");
    const shareBtn = card.querySelector(".share-btn");

    video.addEventListener("click", () => {
      if (video.paused) video.play();
      else video.pause();
    });

    muteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      globalMuted = !globalMuted;
      document.querySelectorAll(".video-card video").forEach((v) => {
        v.muted = globalMuted;
      });
      document.querySelectorAll(".mute-btn").forEach((btn) => {
        btn.textContent = globalMuted ? "🔇 Som off" : "🔊 Som on";
      });
    });

    likeBtn.addEventListener("click", () => {
      item.liked = !item.liked;
      item.likes += item.liked ? 1 : -1;
      likeBtn.classList.toggle("liked", item.liked);
      card.querySelector(".like-count").textContent = formatCount(item.likes);
    });

    commentBtn.addEventListener("click", () => openComments(item.id));

    shareBtn.addEventListener("click", async () => {
      const shareUrl = `${window.location.href}#video-${item.id}`;
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link do vídeo copiado!");
      } catch {
        alert(`Link: ${shareUrl}`);
      }
    });

    feedEl.appendChild(card);
  });

  setupAutoPlay();
}

function setupAutoPlay() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector("video");
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { root: feedEl, threshold: [0.7] }
  );

  document.querySelectorAll(".video-card").forEach((card) => observer.observe(card));
}

function openComments(videoId) {
  activeVideoId = videoId;
  const videoItem = videosData.find((v) => v.id === videoId);
  commentsTitleEl.textContent = `Comentários (${videoItem.comments.length})`;
  commentsListEl.innerHTML = videoItem.comments.length
    ? videoItem.comments.map((c) => `<li>${c}</li>`).join("")
    : "<li>Seja o primeiro a comentar.</li>";
  drawerEl.classList.add("open");
  drawerEl.setAttribute("aria-hidden", "false");
}

closeCommentsEl.addEventListener("click", () => {
  drawerEl.classList.remove("open");
  drawerEl.setAttribute("aria-hidden", "true");
});

commentFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = commentInputEl.value.trim();
  if (!text || activeVideoId === null) return;

  const videoItem = videosData.find((v) => v.id === activeVideoId);
  videoItem.comments.push(text);
  commentInputEl.value = "";
  openComments(activeVideoId);

  const card = feedEl.querySelector(`.video-card[data-id="${activeVideoId}"]`);
  if (card) {
    card.querySelector(".comment-count").textContent = videoItem.comments.length;
  }
});

renderFeed();

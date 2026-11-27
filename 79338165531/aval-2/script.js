
const feed = document.getElementById("feed");
const search = document.getElementById("search");
const toast = document.getElementById("toast");

let activeTab = "home";

const images = {
  couple: "https://www.leftdownrightup.co.uk/images/screenshots/Jason_and_Lucia_03.jpg",
  city: "https://www.nextg.tv/assets/images/42/373/42373720-gta-screenshot-eine-belebte-strasse-in-vice-city-mit-autos-motorraedern-und-auffaelliger-street-art-unter-einer-bruecke-der-screenshot-zeigt.jpg",
  gameplay: "https://i.imgur.com/u4k973q.jpeg",
  lucia: "https://www.notebookcheck.it/fileadmin/_processed_/9/0/csm_GTA6releasedatescreenshot_a6be71bb90.jpg",
  dock: "https://i.blogs.es/d19b44/captura_de_pantalla_2025-05-06_a_las_16.45.47/650_1200.jpeg"
};

const initialPosts = [
  {
    id: 1,
    author: "GTA VI News",
    avatar: "VI",
    time: "19 de novembro de 2026",
    category: "NOTÍCIA",
    type: "news",
    text: "🚨 GTA VI JÁ ESTÁ DISPONÍVEL!\n\nO lançamento oficial de Grand Theft Auto VI aconteceu em 19 de novembro de 2026 para PlayStation 5 e Xbox Series X|S. Bem-vindos a Leonida! 🌴",
    image: images.couple,
    caption: "Jason e Lucia — captura do jogo.",
    likes: 2840,
    dislikes: 12,
    comments: [],
    liked: false,
    disliked: false
  },
  {
    id: 2,
    author: "Vice City Explorer",
    avatar: "VC",
    time: "Hoje",
    category: "GAMEPLAY",
    type: "community",
    text: "🌆 Olha só essa paisagem de Vice City! A cidade está cheia de detalhes, veículos e personagens. Qual região de Leonida vocês mais gostam?",
    image: images.city,
    caption: "Vice City — imagem do jogo.",
    likes: 1570,
    dislikes: 8,
    comments: [],
    liked: false,
    disliked: false
  },
  {
    id: 3,
    author: "GTA VI News",
    avatar: "VI",
    time: "16 de novembro de 2026",
    category: "NOVIDADE",
    type: "news",
    text: "🌧️ CLIMA DINÂMICO EM LEONIDA!\n\nA Rockstar apresentou detalhes do sistema climático de GTA VI. Chuva, neblina e tempestades ajudam a transformar a experiência pelo mapa.",
    image: images.dock,
    caption: "Ambiente de Leonida — imagem do jogo.",
    likes: 3210,
    dislikes: 15,
    comments: [],
    liked: false,
    disliked: false
  },
  {
    id: 4,
    author: "Jason & Lucia Fanpage",
    avatar: "JL",
    time: "Ontem",
    category: "PERSONAGENS",
    type: "community",
    text: "❤️ Jason e Lucia são o centro da história de GTA VI. Uma dupla que promete muitos momentos inesquecíveis em Leonida!",
    image: images.lucia,
    caption: "Lucia — captura do jogo.",
    likes: 1950,
    dislikes: 5,
    comments: [],
    liked: false,
    disliked: false
  },
  {
    id: 5,
    author: "GTA VI Gameplay",
    avatar: "GP",
    time: "Hoje",
    category: "GAMEPLAY",
    type: "community",
    text: "🏍️ Perseguições, motos e muita adrenalina! Quem já está explorando as ruas de Leonida? Compartilhe seu momento favorito de gameplay!",
    image: images.gameplay,
    caption: "Cena de ação de GTA VI — captura do jogo.",
    likes: 4120,
    dislikes: 19,
    comments: [],
    liked: false,
    disliked: false
  }
];

function loadPosts() {
  try {
    const saved = localStorage.getItem("gtaVIposts");
    return saved ? JSON.parse(saved) : initialPosts;
  } catch {
    return initialPosts;
  }
}

let posts = loadPosts();

function savePosts() {
  localStorage.setItem("gtaVIposts", JSON.stringify(posts));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function formatNumber(number) {
  return new Intl.NumberFormat("pt-BR", {
    notation: number >= 10000 ? "compact" : "standard",
    maximumFractionDigits: 1
  }).format(number);
}

function getVisiblePosts() {
  let visible = [...posts];

  if (activeTab === "news") {
    visible = visible.filter(post => post.type === "news");
  }

  if (activeTab === "community") {
    visible = visible.filter(post => post.type === "community");
  }

  const term = search.value.trim().toLowerCase();

  if (term) {
    visible = visible.filter(post =>
      (post.text + post.author + post.category)
        .toLowerCase()
        .includes(term)
    );
  }

  return visible;
}

function renderFeed() {
  const visible = getVisiblePosts();

  document.getElementById("emptyMessage").hidden = visible.length > 0;

  feed.innerHTML = visible.map(post => `
    <article class="post" data-id="${post.id}">

      <div class="post-header">
        <div class="post-avatar">${escapeHTML(post.avatar)}</div>
        <div>
          <div class="post-author">${escapeHTML(post.author)}</div>
          <div class="post-time">${escapeHTML(post.time)}</div>
        </div>
        <span class="post-category">${escapeHTML(post.category)}</span>
      </div>

      <div class="post-text">${escapeHTML(post.text)}</div>

      ${post.image ? `
        <img
          class="post-image"
          src="${escapeHTML(post.image)}"
          alt="Imagem real de Grand Theft Auto VI"
          loading="lazy"
          onerror="this.style.display='none'"
        >
        <div class="post-image-caption">${escapeHTML(post.caption || "Imagem de GTA VI")}</div>
      ` : ""}

      <div class="post-counts">
        <span>❤️ ${formatNumber(post.likes)} curtidas</span>
        <span>${post.comments.length} comentários · 👎 ${formatNumber(post.dislikes)}</span>
      </div>

      <div class="post-actions">
        <button class="action-btn ${post.liked ? "liked" : ""}"
          data-action="like" data-id="${post.id}">
          ${post.liked ? "♥ Curtido" : "♡ Curtir"}
        </button>

        <button class="action-btn ${post.disliked ? "disliked" : ""}"
          data-action="dislike" data-id="${post.id}">
          👎 Descurtir
        </button>

        <button class="action-btn"
          data-action="comments" data-id="${post.id}">
          💬 Comentar
        </button>

        <button class="action-btn"
          data-action="share" data-id="${post.id}">
          ↗ Compartilhar
        </button>
      </div>

      <div class="comments" id="comments-${post.id}">
        <div class="comment-list">
          ${post.comments.map(comment => `
            <div class="comment">
              <b>${escapeHTML(comment.author)}:</b>
              ${escapeHTML(comment.text)}
            </div>
          `).join("")}
        </div>

        <form class="comment-form" data-id="${post.id}">
          <input name="comment" placeholder="Escreva um comentário..." maxlength="300" required>
          <button type="submit">Enviar</button>
        </form>
      </div>

    </article>
  `).join("");
}

function findPost(id) {
  return posts.find(post => post.id === Number(id));
}

feed.addEventListener("click", async event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const id = button.dataset.id;
  const action = button.dataset.action;
  const post = findPost(id);

  if (!post) return;

  if (action === "like") {
    if (post.liked) {
      post.liked = false;
      post.likes--;
    } else {
      post.liked = true;
      post.likes++;

      if (post.disliked) {
        post.disliked = false;
        post.dislikes--;
      }
    }
    savePosts();
    renderFeed();
  }

  if (action === "dislike") {
    if (post.disliked) {
      post.disliked = false;
      post.dislikes--;
    } else {
      post.disliked = true;
      post.dislikes++;

      if (post.liked) {
        post.liked = false;
        post.likes--;
      }
    }
    savePosts();
    renderFeed();
  }

  if (action === "comments") {
    const area = document.getElementById(`comments-${id}`);
    area.classList.toggle("open");
  }

  if (action === "share") {
    const shareData = {
      title: "GTA VI Feed",
      text: post.text,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          shareData.text + "\n" + shareData.url
        );
        showToast("Publicação copiada para compartilhar!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        showToast("Não foi possível compartilhar.");
      }
    }
  }
});

feed.addEventListener("submit", event => {
  if (!event.target.matches(".comment-form")) return;

  event.preventDefault();

  const form = event.target;
  const id = form.dataset.id;
  const input = form.elements.comment;
  const text = input.value.trim();

  if (!text) return;

  const post = findPost(id);
  if (!post) return;

  post.comments.push({
    author: "Visitante",
    text
  });

  savePosts();
  renderFeed();

  document.getElementById(`comments-${id}`).classList.add("open");
  showToast("Comentário publicado!");
});

function setTab(tab) {
  activeTab = tab;

  const titles = {
    home: "Explorar Leonida",
    news: "Últimas notícias GTA VI",
    community: "Gameplay e comunidade"
  };

  document.getElementById("feedTitle").textContent = titles[tab];

  document.querySelectorAll("[data-tab]").forEach(button => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });

  renderFeed();
}

document.querySelectorAll("[data-tab]").forEach(button => {
  button.addEventListener("click", () => {
    setTab(button.dataset.tab);
  });
});

search.addEventListener("input", renderFeed);

document.getElementById("publishBtn").addEventListener("click", () => {
  const input = document.getElementById("postText");
  const text = input.value.trim();

  if (!text) {
    showToast("Escreva alguma coisa antes de publicar!");
    return;
  }

  posts.unshift({
    id: Date.now(),
    author: "Visitante",
    avatar: "VI",
    time: "Agora",
    category: "COMUNIDADE",
    type: "community",
    text,
    image: null,
    caption: "",
    likes: 0,
    dislikes: 0,
    comments: [],
    liked: false,
    disliked: false
  });

  savePosts();
  input.value = "";
  setTab("home");
  showToast("Sua publicação foi adicionada!");
});

const followBtn = document.getElementById("followBtn");
const followStatus = document.getElementById("followStatus");

let following = localStorage.getItem("gtaVIfollowing") === "true";

function updateFollow() {
  followBtn.textContent = following ? "✓ Seguindo" : "+ Seguir página";
  followStatus.textContent = following
    ? "Você está acompanhando esta página!"
    : "Acompanhe as publicações";
}

followBtn.addEventListener("click", () => {
  following = !following;
  localStorage.setItem("gtaVIfollowing", following);
  updateFollow();

  showToast(following
    ? "Você começou a seguir a página!"
    : "Você deixou de seguir a página.");
});

updateFollow();
renderFeed();

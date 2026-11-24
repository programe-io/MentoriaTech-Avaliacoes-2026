
const $ = (s) => document.querySelector(s);

const gambitImg = "https://66703.cdn.simplo7.net/static/66703/sku/action-figures-revoltech-gambit-amazing-yamaguchi-marvel-x-men--p-1640724075839.jpg";

let posts = [];

try {
  posts = JSON.parse(localStorage.getItem("facebook_vini_posts")) || [];
} catch {
  posts = [];
}

if (!posts.length) {
  posts = [
    {
      id: 1,
      author: "VINI_FIGS",
      text: "Minha nova aquisição! O Gambit chegou para a coleção! 🃏🔥",
      image: gambitImg,
      likes: 28,
      liked: false,
      comments: [
        { author: "Raven", text: "Essa figura é linda! Mas capricha mais nas poses." },
        { author: "Pedro", text: "Que coleção incrível!" }
      ]
    },
    {
      id: 2,
      author: "Raven",
      text: "Um pouco da minha coleção. 🖤",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900",
      likes: 42,
      liked: false,
      comments: [
        { author: "VINI_FIGS", text: "Muito bonita sua coleção!" }
      ]
    },
    {
      id: 3,
      author: "VINI_FIGS",
      text: "Testando uma nova pose do Gambit. De 0 a 10? 👀",
      image: gambitImg,
      likes: 15,
      liked: false,
      comments: [
        { author: "Raven", text: "8/10! Gostei, mas poderia ter mais movimento." }
      ]
    }
  ];
}

let currentPage = "home";
let currentProfile = "VINI_FIGS";
let saved = [];

try {
  saved = JSON.parse(localStorage.getItem("facebook_vini_saved")) || [];
} catch {
  saved = [];
}

function persist() {
  localStorage.setItem("facebook_vini_posts", JSON.stringify(posts));
  localStorage.setItem("facebook_vini_saved", JSON.stringify(saved));
}

function safe(text) {
  return String(text ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[c]);
}

function avatar(name) {
  if (name === "Raven") {
    return '<span class="avatar raven">R</span>';
  }
  if (name === "Pedro") {
    return '<span class="avatar blue">P</span>';
  }
  if (name === "Maria") {
    return '<span class="avatar pink">M</span>';
  }
  return '<span class="avatar">V</span>';
}

function toast(message) {
  const element = $("#toast");
  if (!element) return;

  element.textContent = message;
  element.style.display = "block";

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    element.style.display = "none";
  }, 2200);
}

function postHTML(post) {
  const comments = Array.isArray(post.comments) ? post.comments : [];

  return `
    <article class="card" id="post-${post.id}">
      <div class="post-header">
        ${avatar(post.author)}
        <div>
          <strong>${safe(post.author)}</strong>
          <small>Agora · 🌎</small>
        </div>
      </div>

      <div class="post-text">${safe(post.text)}</div>

      ${post.image ? `
        <img class="post-image"
          src="${safe(post.image)}"
          alt="Imagem da publicação"
          onerror="this.style.display='none'">
      ` : ""}

      <div class="post-stats">
        <span>👍 ${Number(post.likes) || 0} curtidas</span>
        <span>${comments.length} comentários</span>
      </div>

      <div class="post-actions">
        <button data-like="${post.id}" class="${post.liked ? "liked" : ""}">
          👍 Curtir
        </button>
        <button data-focus-comment="${post.id}">💬 Comentar</button>
        <button data-share="${post.id}">↗ Compartilhar</button>
        <button data-save="${post.id}">
          ${saved.includes(post.id) ? "🔖" : "☆"}
        </button>
      </div>

      <div class="comments">
        ${comments.map(comment => `
          <div class="comment">
            <strong>${safe(comment.author)}</strong>
            ${safe(comment.text)}
          </div>
        `).join("")}
      </div>

      <form class="comment-form" data-comment-form="${post.id}">
        <input name="comment" placeholder="Escreva um comentário..." required>
        <button type="submit">Enviar</button>
      </form>
    </article>
  `;
}

function storiesHTML() {
  return `
    <div class="card">
      <div class="story-list">
        <div class="story" data-story="VINI_FIGS">
          <span class="avatar">V</span>
          Criar story
        </div>

        <div class="story" data-story="Raven">
          <span class="avatar raven">R</span>
          Raven
        </div>

        <div class="story" data-story="Gambit">
          <span class="avatar">G</span>
          Gambit
        </div>

        <div class="story" data-story="Pedro">
          <span class="avatar blue">P</span>
          Pedro
        </div>
      </div>
    </div>
  `;
}

function composerHTML() {
  return `
    <div class="card">
      <div class="create-post">
        <span class="avatar">V</span>
        <input id="openComposer"
          placeholder="No que você está pensando, VINI_FIGS?">
      </div>
      <hr>
      <button id="openComposerButton">📷 Foto/vídeo</button>
    </div>
  `;
}

function renderHome() {
  $("#app").innerHTML = `
    ${storiesHTML()}
    ${composerHTML()}
    ${posts.map(postHTML).join("")}
  `;
}

function renderProfile(name) {
  const profilePosts = posts.filter(post => post.author === name);

  $("#app").innerHTML = `
    <div class="card">
      <div class="profile-cover"></div>

      <div class="profile-info">
        ${avatar(name)}
        <h2>${safe(name)}</h2>

        <p class="muted">
          ${name === "Raven"
            ? "Colecionadora e crítica de poses 🖤"
            : "Colecionador de Action Figures 🦸‍♂️"}
        </p>

        <p>${profilePosts.length} publicações · ${name === "Raven" ? 328 : 1250} amigos</p>

        <button class="primary" id="profileMessage">Mensagem</button>
        <button class="secondary" id="profileAdd">Adicionar amigo</button>
      </div>
    </div>

    <div class="card">
      <h3>Publicações</h3>
      ${profilePosts.length
        ? profilePosts.map(postHTML).join("")
        : '<p class="empty">Nenhuma publicação ainda.</p>'}
    </div>
  `;
}

function renderFriends() {
  const people = ["Raven", "Gambit", "Pedro", "Maria", "Deadpool"];

  $("#app").innerHTML = `
    <div class="card">
      <h2>Amigos</h2>

      ${people.map(name => `
        <div class="contact" style="cursor:pointer">
          ${avatar(name)}
          <strong>${safe(name)}</strong>
          <button class="primary" data-person="${safe(name)}">Ver perfil</button>
        </div>
      `).join("")}
    </div>
  `;
}

function renderGroups() {
  $("#app").innerHTML = `
    <div class="card">
      <h2>Seus grupos</h2>
      <h3>🦸 Colecionadores de Action Figures</h3>
      <p class="muted">12 mil membros · Grupo público</p>
      <button class="primary" data-join>Participar</button>
    </div>

    <div class="card">
      <h3>🎮 Universo Geek</h3>
      <p class="muted">8 mil membros · Grupo público</p>
      <button class="primary" data-join>Participar</button>
    </div>

    <div class="card">
      <h3>🃏 Marvel Figures Brasil</h3>
      <p class="muted">5 mil membros · Grupo público</p>
      <button class="primary" data-join>Participar</button>
    </div>
  `;
}

function renderVideos() {
  $("#app").innerHTML = `
    <div class="card">
      <h2>Vídeos</h2>
      <p class="empty">🎬 Em breve, vídeos da coleção!</p>
    </div>
  `;
}

function renderSaved() {
  const list = posts.filter(post => saved.includes(post.id));

  $("#app").innerHTML = `
    <div class="card">
      <h2>Publicações salvas</h2>
      ${list.length
        ? list.map(postHTML).join("")
        : '<p class="empty">Nenhuma publicação salva.</p>'}
    </div>
  `;
}

function renderMarketplace() {
  $("#app").innerHTML = `
    <div class="card">
      <h2>Marketplace</h2>
      <p>Encontre figuras e colecionáveis.</p>
      <div class="empty">🛒 Em breve!</div>
    </div>
  `;
}

function render() {
  const app = $("#app");
  if (!app) throw new Error("Não encontrei o elemento #app no HTML.");

  switch (currentPage) {
    case "home":
      renderHome();
      break;
    case "profile":
      renderProfile(currentProfile);
      break;
    case "friends":
      renderFriends();
      break;
    case "groups":
      renderGroups();
      break;
    case "videos":
      renderVideos();
      break;
    case "saved":
      renderSaved();
      break;
    case "marketplace":
      renderMarketplace();
      break;
    default:
      renderHome();
  }
}

function openModal(content) {
  $("#modalContent").innerHTML = content;
  $("#modal").classList.remove("hidden");
}

function closeModal() {
  $("#modal").classList.add("hidden");
}

function openComposer() {
  openModal(`
    <h2>Criar publicação</h2>

    <form id="newPostForm">
      <textarea name="text"
        placeholder="No que você está pensando?"
        required></textarea>

      <input type="text" name="image"
        placeholder="Link da imagem (opcional)">

      <button class="primary" type="submit">Publicar</button>
    </form>
  `);
}

document.addEventListener("click", event => {
  const target = event.target;

  const pageButton = target.closest("[data-page]");
  if (pageButton) {
    currentPage = pageButton.dataset.page;

    if (currentPage === "profile") {
      currentProfile = "VINI_FIGS";
    }

    render();
    return;
  }

  const likeButton = target.closest("[data-like]");
  if (likeButton) {
    const post = posts.find(p => p.id === Number(likeButton.dataset.like));

    if (post) {
      post.liked = !post.liked;
      post.likes = Math.max(0, post.likes + (post.liked ? 1 : -1));
      persist();
      render();
    }
    return;
  }

  const saveButton = target.closest("[data-save]");
  if (saveButton) {
    const id = Number(saveButton.dataset.save);

    if (saved.includes(id)) {
      saved = saved.filter(item => item !== id);
      toast("Publicação removida dos salvos");
    } else {
      saved.push(id);
      toast("Publicação salva!");
    }

    persist();
    render();
    return;
  }

  const commentButton = target.closest("[data-focus-comment]");
  if (commentButton) {
    $(`#post-${commentButton.dataset.focusComment} .comment-form input`)?.focus();
    return;
  }

  const shareButton = target.closest("[data-share]");
  if (shareButton) {
    const post = posts.find(p => p.id === Number(shareButton.dataset.share));
    if (post) {
      const message = `Publicação de ${post.author}: ${post.text}`;

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(message)
          .then(() => toast("Texto copiado!"))
          .catch(() => toast(message));
      } else {
        toast(message);
      }
    }
    return;
  }

  const person = target.closest("[data-person]");
  if (person) {
    currentProfile = person.dataset.person;
    currentPage = "profile";
    render();
    return;
  }

  if (target.closest("#openComposer") || target.closest("#openComposerButton")) {
    openComposer();
    return;
  }

  if (target.closest("#closeModal") || target.id === "modal") {
    closeModal();
    return;
  }

  if (target.closest("#themeBtn") || target.closest("#sideTheme")) {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "facebook_vini_dark",
      document.body.classList.contains("dark")
    );
    return;
  }

  if (target.closest("[data-join]")) {
    target.closest("[data-join]").textContent = "Participando ✓";
    target.closest("[data-join]").disabled = true;
    toast("Você entrou no grupo!");
    return;
  }

  const story = target.closest("[data-story]");
  if (story) {
    toast("Story de " + story.dataset.story);
    return;
  }

  if (target.closest("#profileMessage")) {
    openModal(`
      <h2>Mensagem para ${safe(currentProfile)}</h2>
      <textarea placeholder="Escreva uma mensagem..."></textarea>
      <button class="primary" id="sendMessage">Enviar</button>
    `);
    return;
  }

  if (target.closest("#sendMessage")) {
    toast("Mensagem enviada!");
    closeModal();
    return;
  }

  if (target.closest("#profileAdd")) {
    toast("Solicitação de amizade enviada!");
    return;
  }

  if (target.closest("#notificationsBtn")) {
    toast("Você não tem novas notificações.");
  }
});

document.addEventListener("submit", event => {
  if (event.target.id === "newPostForm") {
    event.preventDefault();

    const form = new FormData(event.target);
    const text = String(form.get("text") || "").trim();
    const image = String(form.get("image") || "").trim();

    if (!text) return;

    posts.unshift({
      id: Date.now(),
      author: "VINI_FIGS",
      text,
      image,
      likes: 0,
      liked: false,
      comments: []
    });

    persist();
    closeModal();
    currentPage = "home";
    render();
    toast("Publicação criada!");
    return;
  }

  const commentForm = event.target.closest("[data-comment-form]");
  if (commentForm) {
    event.preventDefault();

    const id = Number(commentForm.dataset.commentForm);
    const input = commentForm.elements.comment;
    const text = input.value.trim();
    const post = posts.find(p => p.id === id);

    if (!post || !text) return;

    post.comments.push({
      author: "VINI_FIGS",
      text
    });

    persist();
    render();
  }
});

const search = $("#search");

if (search) {
  search.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;

    const term = search.value.toLowerCase().trim();

    const results = posts.filter(post =>
      post.text.toLowerCase().includes(term) ||
      post.author.toLowerCase().includes(term)
    );

    $("#app").innerHTML = `
      <div class="card">
        <h2>Resultados da pesquisa</h2>
        ${results.length
          ? results.map(postHTML).join("")
          : '<p class="empty">Nenhum resultado encontrado.</p>'}
      </div>
    `;
  });
}

if (localStorage.getItem("facebook_vini_dark") === "true") {
  document.body.classList.add("dark");
}

try {
  render();
} catch (error) {
  console.error(error);
  $("#app").innerHTML = `
    <div class="card">
      <h2>Ops! Erro ao carregar o Facebook.</h2>
      <p>${safe(error.message)}</p>
      <button class="primary" onclick="location.reload()">Recarregar</button>
    </div>
  `;
}


/* ==================================
   CONECTA+ - SISTEMA PRINCIPAL
================================== */

const $ = id => document.getElementById(id);

const load = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

let profile = load("connect_profile", {
  name: "Minha conta",
  bio: "Olá! Estou no Conecta+ ❤️",
  avatar: "https://i.pravatar.cc/150?img=47"
});

let posts = load("connect_posts", [
  {
    id: 1,
    author: "Ana Silva",
    avatar: "https://i.pravatar.cc/150?img=5",
    text: "Olá pessoal! Bem-vindos à nossa comunidade! ❤️",
    category: "Amizade",
    media: "",
    likes: [],
    comments: [],
    saved: false,
    mine: false,
    date: new Date().toLocaleString("pt-BR")
  },
  {
    id: 2,
    author: "Lucas Santos",
    avatar: "https://i.pravatar.cc/150?img=12",
    text: "Olha que dia maravilhoso! Vamos fazer novas amizades? 🌞",
    category: "Pessoa",
    media: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
    likes: [],
    comments: [],
    saved: false,
    mine: false,
    date: new Date().toLocaleString("pt-BR")
  },
  {
    id: 3,
    author: "Mundo Animal",
    avatar: "https://i.pravatar.cc/150?img=33",
    text: "Quem também ama os animais? 🐶❤️",
    category: "Animal",
    media: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=900",
    likes: [],
    comments: [],
    saved: false,
    mine: false,
    date: new Date().toLocaleString("pt-BR")
  }
]);

let stories = load("connect_stories", [
  {
    name: "Ana",
    avatar: "https://i.pravatar.cc/150?img=5",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800"
  },
  {
    name: "Lucas",
    avatar: "https://i.pravatar.cc/150?img=12",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
  },
  {
    name: "Maria",
    avatar: "https://i.pravatar.cc/150?img=44",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800"
  }
]);

let messages = load("connect_messages", []);
let notifications = load("connect_notifications", []);

/* ==================================
   FUNÇÕES DE SEGURANÇA E FORMATAÇÃO
================================== */

function safe(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function persist() {
  save("connect_profile", profile);
  save("connect_posts", posts);
  save("connect_stories", stories);
  save("connect_messages", messages);
  save("connect_notifications", notifications);
}

/* ==================================
   NAVEGAÇÃO
================================== */

function showPage(page) {
  document.querySelectorAll(".page").forEach(element => {
    element.classList.add("hidden");
  });

  const selected = $(page);

  if (selected) {
    selected.classList.remove("hidden");
  }

  if (page === "messages") renderMessages();
  if (page === "notifications") renderNotifications();
  if (page === "profile") renderProfile();
  if (page === "saved") renderSaved();
  if (page === "explore") renderExplore();
}

/* ==================================
   PERFIL
================================== */

function renderProfile() {
  $("sideName").textContent = profile.name;
  $("sideAvatar").src = profile.avatar;
  $("profileName").textContent = profile.name;
  $("profileBio").textContent = profile.bio;
  $("profileAvatar").src = profile.avatar;

  $("myPosts").innerHTML = posts
    .filter(post => post.mine)
    .map(post => postHTML(post))
    .join("") || "<p>Você ainda não publicou nada.</p>";
}

function editProfile() {
  $("editName").value = profile.name;
  $("editBio").value = profile.bio;
  $("editAvatar").value = "";
  $("editModal").classList.remove("hidden");
}

function closeEdit() {
  $("editModal").classList.add("hidden");
}

async function saveProfile() {
  const name = $("editName").value.trim();
  const bio = $("editBio").value.trim();
  const file = $("editAvatar").files[0];

  if (!name) {
    alert("Digite seu nome!");
    return;
  }

  profile.name = name;
  profile.bio = bio;

  if (file) {
    if (!file.type.startsWith("image/")) {
      alert("Selecione uma imagem válida.");
      return;
    }

    try {
      profile.avatar = await fileToDataURL(file);
    } catch {
      alert("Não foi possível carregar a imagem.");
      return;
    }
  }

  persist();
  renderProfile();
  closeEdit();
}

/* ==================================
   PUBLICAÇÕES
================================== */

function postHTML(post) {
  const liked = post.likes.includes(profile.name);

  const media = post.media
    ? post.media.startsWith("data:video/")
      ? `<video class="post-media" controls src="${safe(post.media)}"></video>`
      : `<img class="post-media" src="${safe(post.media)}" alt="Imagem da publicação">`
    : "";

  const comments = post.comments.map(comment => `
    <p>
      <strong>${safe(comment.name)}:</strong>
      ${safe(comment.text)}
    </p>
  `).join("");

  return `
    <article class="post">
      <div class="post-header">
        <img src="${safe(post.avatar)}" alt="">
        <div>
          <strong>${safe(post.author)}</strong>
          <small>${safe(post.date)} · ${safe(post.category)}</small>
        </div>
      </div>

      <p class="post-text">${safe(post.text)}</p>

      ${media}

      <div class="post-actions">
        <button onclick="toggleLike(${post.id})">
          ${liked ? "❤️" : "🤍"} ${post.likes.length}
        </button>

        <button onclick="focusComment(${post.id})">
          💬 ${post.comments.length}
        </button>

        <button onclick="sharePost(${post.id})">
          📤 Compartilhar
        </button>

        <button onclick="toggleSave(${post.id})">
          ${post.saved ? "⭐ Salvo" : "☆ Salvar"}
        </button>

        ${post.mine
          ? `<button onclick="deletePost(${post.id})">🗑 Excluir</button>`
          : ""}
      </div>

      <div class="comments">
        ${comments}

        <div class="comment-input">
          <input id="comment-${post.id}"
            placeholder="Escreva um comentário...">

          <button class="red-btn"
            onclick="addComment(${post.id})">
            Enviar
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderFeed() {
  $("feed").innerHTML = posts
    .map(post => postHTML(post))
    .join("");

  if ($("profile") && !$("profile").classList.contains("hidden")) {
    renderProfile();
  }
}

async function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

$("postImage").addEventListener("change", () => {
  const file = $("postImage").files[0];
  $("uploadName").textContent = file ? file.name : "";
});

async function createPost() {
  const text = $("postText").value.trim();
  const file = $("postImage").files[0];

  if (!text && !file) {
    alert("Escreva algo ou escolha uma imagem!");
    return;
  }

  let media = "";

  if (file) {
    if (!file.type.startsWith("image/") &&
        !file.type.startsWith("video/")) {
      alert("Escolha uma imagem ou vídeo válido.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("O arquivo deve ter no máximo 5 MB.");
      return;
    }

    try {
      media = await fileToDataURL(file);
    } catch {
      alert("Erro ao carregar arquivo.");
      return;
    }
  }

  posts.unshift({
    id: Date.now(),
    author: profile.name,
    avatar: profile.avatar,
    text,
    category: $("postCategory").value,
    media,
    likes: [],
    comments: [],
    saved: false,
    mine: true,
    date: new Date().toLocaleString("pt-BR")
  });

  $("postText").value = "";
  $("postImage").value = "";
  $("uploadName").textContent = "";

  persist();
  renderFeed();
}

function toggleLike(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;

  const index = post.likes.indexOf(profile.name);

  if (index >= 0) {
    post.likes.splice(index, 1);
  } else {
    post.likes.push(profile.name);

    if (!post.mine) {
      notify(`❤️ ${profile.name} curtiu uma publicação de ${post.author}.`);
    }
  }

  persist();
  renderFeed();
}

function addComment(id) {
  const post = posts.find(p => p.id === id);
  const input = $(`comment-${id}`);

  if (!post || !input || !input.value.trim()) return;

  post.comments.push({
    name: profile.name,
    text: input.value.trim()
  });

  if (!post.mine) {
    notify(`💬 ${profile.name} comentou em uma publicação de ${post.author}.`);
  }

  persist();
  renderFeed();
}

function focusComment(id) {
  $(`comment-${id}`)?.focus();
}

function toggleSave(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;

  post.saved = !post.saved;
  persist();
  renderFeed();
}

function deletePost(id) {
  if (!confirm("Deseja excluir esta publicação?")) return;

  posts = posts.filter(post => post.id !== id);
  persist();
  renderFeed();
}

async function sharePost(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;

  const text = `${post.author}: ${post.text}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: "Conecta+", text });
    } catch {}
  } else {
    try {
      await navigator.clipboard.writeText(text);
      alert("Publicação copiada!");
    } catch {
      alert(text);
    }
  }
}

/* ==================================
   STORIES
================================== */

function renderStories() {
  $("stories").innerHTML = `
    <div class="story" onclick="addStory()">
      <img src="${safe(profile.avatar)}">
      <p>+ Seu story</p>
    </div>
  ` + stories.map((story, index) => `
    <div class="story" onclick="openStory(${index})">
      <img src="${safe(story.avatar)}">
      <p>${safe(story.name)}</p>
    </div>
  `).join("");
}

async function addStory() {
  const file = document.createElement("input");
  file.type = "file";
  file.accept = "image/*";

  file.onchange = async () => {
    const selected = file.files[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/") ||
        selected.size > 5 * 1024 * 1024) {
      alert("Escolha uma imagem de até 5 MB.");
      return;
    }

    const image = await fileToDataURL(selected);

    stories.unshift({
      name: profile.name,
      avatar: profile.avatar,
      image
    });

    stories = stories.slice(0, 30);
    persist();
    renderStories();
  };

  file.click();
}

function openStory(index) {
  const story = stories[index];
  if (!story) return;

  $("storyImage").src = story.image;
  $("storyOwner").textContent = story.name;
  $("storyModal").classList.remove("hidden");
}

function closeStory() {
  $("storyModal").classList.add("hidden");
}

/* ==================================
   MENSAGENS
================================== */

function sendMessage() {
  const input = $("messageInput");
  const text = input.value.trim();

  if (!text) return;

  messages.push({
    id: Date.now(),
    sender: profile.name,
    text,
    date: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    })
  });

  input.value = "";
  persist();
  renderMessages();
}

function renderMessages() {
  $("chatMessages").innerHTML = messages.map(message => `
    <div class="message ${message.sender === profile.name ? "mine" : ""}">
      <strong>${safe(message.sender)}</strong>
      <p>${safe(message.text)}</p>
      <small>${safe(message.date)}</small>
    </div>
  `).join("");

  $("chatMessages").scrollTop =
    $("chatMessages").scrollHeight;
}

/* ==================================
   NOTIFICAÇÕES
================================== */

function notify(text) {
  notifications.unshift({
    text,
    date: new Date().toLocaleString("pt-BR")
  });

  persist();
}

function renderNotifications() {
  $("notificationList").innerHTML = notifications.map(n => `
    <div class="community-card">
      ${safe(n.text)}
      <small>${safe(n.date)}</small>
    </div>
  `).join("") || "<p>Nenhuma notificação ainda.</p>";
}

/* ==================================
   PUBLICAÇÕES SALVAS
================================== */

function renderSaved() {
  $("savedFeed").innerHTML = posts
    .filter(post => post.saved)
    .map(post => postHTML(post))
    .join("") || "<p>Nenhuma publicação salva.</p>";
}

/* ==================================
   EXPLORAR
================================== */

function renderExplore() {
  $("exploreFeed").innerHTML = posts
    .map(post => postHTML(post))
    .join("");
}

/* ==================================
   PESQUISA
================================== */

$("search").addEventListener("input", event => {
  const term = event.target.value.toLowerCase().trim();

  if (!term) {
    renderFeed();
    showPage("home");
    return;
  }

  showPage("explore");

  const results = posts.filter(post =>
    post.author.toLowerCase().includes(term) ||
    post.text.toLowerCase().includes(term) ||
    post.category.toLowerCase().includes(term)
  );

  $("exploreFeed").innerHTML = results
    .map(post => postHTML(post))
    .join("") || "<p>Nenhum resultado encontrado.</p>";
});

/* ==================================
   INICIALIZAÇÃO
================================== */

function startApp() {
  $("sideName").textContent = profile.name;
  $("sideAvatar").src = profile.avatar;

  renderFeed();
  renderStories();
  renderMessages();
  renderNotifications();
  renderProfile();
}

startApp();

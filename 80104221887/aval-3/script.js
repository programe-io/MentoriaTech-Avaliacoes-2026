const STORAGE_KEY = "insta_clone_state_v1";

const defaultState = {
  profile: {
    username: "voce.dev",
    bio: "Construindo interfaces com HTML, CSS e JS puro.",
    avatar: "https://picsum.photos"
  },
  stories: [
    { user: "voce.dev", avatar: "https://picsum.photos", photo: "https://picsum.photos" },
    { user: "ana.ui", avatar: "https://picsum.photos", photo: "https://picsum.photos" },
    { user: "carlos.js", avatar: "https://picsum.photos", photo: "https://picsum.photos" },
    { user: "nina.foto", avatar: "https://picsum.photos", photo: "https://picsum.photos" }
  ],
  posts: [
    {
      id: 1,
      user: "ana.ui",
      avatar: "https://picsum.photos",
      location: "São Paulo, Brasil",
      image: "https://picsum.photos",
      likes: 214,
      liked: false,
      saved: false,
      caption: "Café e protótipos novos nesta manhã.",
      comments: [{ user: "carlos.js", text: "Ficou excelente!" }]
    },
    {
      id: 2,
      user: "voce.dev",
      avatar: "https://picsum.photos",
      location: "Piauí, Brasil",
      image: "https://picsum.photos",
      likes: 98,
      liked: true,
      saved: true,
      caption: "Primeiro projeto completo rodando direto no navegador.",
      comments: []
    },
    {
      id: 3,
      user: "nina.foto",
      avatar: "https://picsum.photos",
      location: "Rio de Janeiro",
      image: "https://picsum.photos",
      likes: 540,
      liked: false,
      saved: false,
      caption: "Luz dourada no fim da tarde.",
      comments: []
    }
  ]
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultState;
let storyTimer = null;

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderStories() {
  const bar = document.getElementById("storiesBar");
  bar.innerHTML = state.stories
    .map(
      (s, index) => `
      <div class="story-item" data-story-index="${index}">
        <div class="story-ring"><img src="${s.avatar}" alt="${s.user}" /></div>
        <span>${s.user}</span>
      </div>
    `
    )
    .join("");
}

function renderFeed() {
  const feed = document.getElementById("feedList");
  feed.innerHTML = state.posts
    .map(
      (post) => `
      <article class="post" data-id="${post.id}">
        <header class="post-header">
          <div class="post-author">
            <img src="${post.avatar}" alt="${post.user}" />
            <div>
              <strong>${post.user}</strong>
              <div style="font-size:0.75rem;color:#737373">${post.location || ""}</div>
            </div>
          </div>
          ${post.user === state.profile.username ? `<button class="icon-btn" data-action="delete" title="Excluir">🗑️</button>` : ""}
        </header>

        <div class="post-media" data-action="dbl-like">
          <img src="${post.image}" alt="Publicação de ${post.user}" />
          <div class="heart-pop">❤️</div>
        </div>

        <div class="post-body">
          <div class="post-actions">
            <div>
              <button class="icon-btn" data-action="like">${post.liked ? "❤️" : "🤍"}</button>
              <button class="icon-btn" data-action="comment">💬</button>
            </div>
            <button class="icon-btn" data-action="save">${post.saved ? "🔖" : "📑"}</button>
          </div>

          <div class="likes">${post.likes} curtidas</div>
          <p class="caption"><strong>${post.user}</strong> ${post.caption}</p>

          <div>
            ${post.comments.map((c) => `<p class="comment"><strong>${c.user}</strong> ${c.text}</p>`).join("")}
          </div>

          <form class="comment-form">
            <input type="text" placeholder="Adicione um comentário..." required />
            <button type="submit">Publicar</button>
          </form>
        </div>
      </article>
    `
    )
    .join("");
}

function renderGrids() {
  const query = document.getElementById("exploreSearch").value.trim().toLowerCase();
  const explorePosts = state.posts.filter(
    (p) => p.user.toLowerCase().includes(query) || p.caption.toLowerCase().includes(query)
  );

  document.getElementById("exploreGrid").innerHTML = explorePosts
    .map((p) => `<div class="grid-item"><img src="${p.image}" alt="${p.caption}" /></div>`)
    .join("");

  const savedPosts = state.posts.filter((p) => p.saved);
  document.getElementById("savedGrid").innerHTML =
    savedPosts.length > 0
      ? savedPosts.map((p) => `<div class="grid-item"><img src="${p.image}" alt="${p.caption}" /></div>`).join("")
      : "<p>Nenhuma publicação salva ainda.</p>";

  const myPosts = state.posts.filter((p) => p.user === state.profile.username);
  document.getElementById("profileUsername").textContent = state.profile.username;
  document.getElementById("profileBio").textContent = state.profile.bio;
  document.getElementById("statPosts").textContent = myPosts.length;
  document.getElementById("profileGrid").innerHTML = myPosts
    .map((p) => `<div class="grid-item"><img src="${p.image}" alt="${p.caption}" /></div>`)
    .join("");
}

function renderAll() {
  renderStories();
  renderFeed();
  renderGrids();
}

// Navegação entre abas
document.querySelectorAll(".nav-btn[data-view]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`view-${btn.dataset.view}`).classList.add("active");
    renderGrids();
  });
});

// Interações do Feed
const feedList = document.getElementById("feedList");

feedList.addEventListener("click", (e) => {
  const postEl = e.target.closest(".post");
  if (!postEl) return;
  const post = state.posts.find((p) => p.id === Number(postEl.dataset.id));

  if (e.target.closest('[data-action="like"]')) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    saveState();
    renderAll();
  } else if (e.target.closest('[data-action="save"]')) {
    post.saved = !post.saved;
    saveState();
    renderAll();
  } else if (e.target.closest('[data-action="comment"]')) {
    postEl.querySelector("input").focus();
  } else if (e.target.closest('[data-action="delete"]')) {
    state.posts = state.posts.filter((p) => p.id !== post.id);
    saveState();
    renderAll();
  }
});

feedList.addEventListener("dblclick", (e) => {
  const media = e.target.closest('[data-action="dbl-like"]');
  if (!media) return;
  const postEl = media.closest(".post");
  const post = state.posts.find((p) => p.id === Number(postEl.dataset.id));

  if (!post.liked) {
    post.liked = true;
    post.likes += 1;
    saveState();
    renderAll();
  }
  const heart = feedList.querySelector(`.post[data-id="${post.id}"] .heart-pop`);
  heart.classList.add("show");
  setTimeout(() => heart.classList.remove("show"), 600);
});

feedList.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target.closest(".comment-form");
  if (!form) return;
  const input = form.querySelector("input");
  const postEl = form.closest(".post");
  const post = state.posts.find((p) => p.id === Number(postEl.dataset.id));

  post.comments.push({ user: state.profile.username, text: input.value.trim() });
  saveState();
  renderAll();
});

// Criar Post com upload real ou URL
const createModal = document.getElementById("createModal");
document.getElementById("openCreateModal").addEventListener("click", () => createModal.showModal());
document.getElementById("closeCreateModal").addEventListener("click", () => createModal.close());

document.getElementById("createForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const fileInput = document.getElementById("postImageFile");
  const urlInput = document.getElementById("postImageUrl").value.trim();
  const location = document.getElementById("postLocation").value.trim();
  const caption = document.getElementById("postCaption").value.trim();

  const publish = (imageSrc) => {
    state.posts.unshift({
      id: Date.now(),
      user: state.profile.username,
      avatar: state.profile.avatar,
      location,
      image: imageSrc,
      likes: 1,
      liked: true,
      saved: false,
      caption,
      comments: []
    });
    saveState();
    renderAll();
    e.target.reset();
    createModal.close();
  };

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = () => publish(reader.result);
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    publish(urlInput || `https://picsum.photos{Date.now()}/600`);
  }
});

// Visualizador de Stories com barra de progresso
const storyModal = document.getElementById("storyModal");
const storyBarFill = document.getElementById("storyBarFill");

document.getElementById("storiesBar").addEventListener("click", (e) => {
  const item = e.target.closest(".story-item");
  if (!item) return;
  const story = state.stories[Number(item.dataset.storyIndex)];

  document.getElementById("storyUserLabel").textContent = story.user;
  document.getElementById("storyImage").src = story.photo;
  storyBarFill.style.transition = "none";
  storyBarFill.style.width = "0%";
  storyModal.showModal();

  requestAnimationFrame(() => {
    storyBarFill.style.transition = "width 4s linear";
    storyBarFill.style.width = "100%";
  });

  clearTimeout(storyTimer);
  storyTimer = setTimeout(() => storyModal.close(), 4000);
});

document.getElementById("closeStoryModal").addEventListener("click", () => {
  clearTimeout(storyTimer);
  storyModal.close();
});

// Busca e Edição de Perfil
document.getElementById("exploreSearch").addEventListener("input", renderGrids);


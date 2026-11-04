// DADOS INICIAIS DA APLICAÇÃO (MOCK DATA)
const storiesData = [
  { id: 1, user: "marcos.dev", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80", storyImg: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80" },
  { id: 2, user: "carla_design", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", storyImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80" },
  { id: 3, user: "lucas_tech", img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80", storyImg: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80" },
  { id: 4, user: "beatriz_art", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80", storyImg: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80" }
];

let postsData = [
  {
    id: 101,
    user: "carla_design",
    userImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    postImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    caption: "Novo projeto 3D finalizado! O que acharam dessa paleta de cores? 🎨✨",
    likes: 342,
    isLiked: false,
    isSaved: false,
    comments: [
      { user: "marcos.dev", text: "Ficou incrível demais! 🔥" },
      { user: "lucas_tech", text: "Sensacional!" }
    ],
    time: "HÁ 2 HORAS"
  },
  {
    id: 102,
    user: "seu_usuario",
    userImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    postImg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    caption: "Dias de sol e tranquilidade 🌊☀️",
    likes: 890,
    isLiked: true,
    isSaved: true,
    comments: [
      { user: "beatriz_art", text: "Que lugar maravilhoso!" }
    ],
    time: "HÁ 5 HORAS"
  }
];

let activeStoryInterval = null;
let currentDetailPostId = null;

// INICIALIZAÇÃO DA APLICAÇÃO
document.addEventListener("DOMContentLoaded", () => {
  renderStories();
  renderPosts();
  renderProfileGrid();
});

// NAVEGAÇÃO DE ABAS
function switchTab(tab) {
  const feedTab = document.getElementById("tab-feed");
  const profileTab = document.getElementById("tab-profile");

  if (tab === "feed") {
    feedTab.classList.remove("hidden");
    profileTab.classList.add("hidden");
  } else if (tab === "profile") {
    profileTab.classList.remove("hidden");
    feedTab.classList.add("hidden");
    renderProfileGrid();
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// MODO ESCURO / CLARO
function toggleTheme() {
  const html = document.documentElement;
  const themeIcon = document.getElementById("themeIcon");

  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    html.classList.add("dark");
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
}

// RENDERIZAR STORIES
function renderStories() {
  const container = document.getElementById("storiesContainer");
  container.innerHTML = storiesData.map(story => `
    <div class="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0" onclick="openStory('${story.storyImg}', '${story.user}', '${story.img}')">
      <div class="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-500 via-rose-500 to-purple-600">
        <img src="${story.img}" class="w-full h-full object-cover rounded-full border-2 border-black">
      </div>
      <span class="text-xs text-zinc-400 truncate w-16 text-center">${story.user}</span>
    </div>
  `).join("");
}

// RENDERIZAR POSTS DO FEED
function renderPosts() {
  const container = document.getElementById("feedPosts");
  container.innerHTML = postsData.map(post => `
    <article class="border border-zinc-800 rounded-xl bg-black overflow-hidden">
      <!-- Cabeçalho do Post -->
      <div class="flex items-center justify-between p-3">
        <div class="flex items-center gap-3">
          <img src="${post.userImg}" class="w-8 h-8 rounded-full object-cover border border-zinc-700">
          <span class="font-semibold text-sm">${post.user}</span>
        </div>
        <button class="text-zinc-400 hover:text-white"><i class="fa-solid fa-ellipsis"></i></button>
      </div>

      <!-- Imagem com Double-Tap Heart Animation -->
      <div class="relative group cursor-pointer select-none" ondblclick="handleDoubleTap(${post.id}, event)">
        <img src="${post.postImg}" class="w-full max-h-[600px] object-cover">
        <i id="heart-anim-${post.id}" class="fa-solid fa-heart text-white text-7xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none drop-shadow-lg"></i>
      </div>

      <!-- Ações do Post -->
      <div class="p-3 flex flex-col gap-2">
        <div class="flex justify-between text-xl">
          <div class="flex gap-4">
            <button onclick="toggleLike(${post.id})" class="transition transform active:scale-125">
              <i class="${post.isLiked ? 'fa-solid fa-heart text-rose-500' : 'fa-regular fa-heart'}"></i>
            </button>
            <button class="hover:text-zinc-400"><i class="fa-regular fa-comment"></i></button>
            <button class="hover:text-zinc-400"><i class="fa-regular fa-paper-plane"></i></button>
          </div>
          <button onclick="toggleSave(${post.id})">
            <i class="${post.isSaved ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}"></i>
          </button>
        </div>

        <!-- Curtidas -->
        <div class="font-semibold text-sm">${post.likes.toLocaleString()} curtidas</div>

        <!-- Legenda -->
        <div class="text-sm">
          <span class="font-semibold">${post.user}</span>
          <span class="text-zinc-300">${post.caption}</span>
        </div>

        <!-- Comentários -->
        <div class="flex flex-col gap-1 mt-1">
          ${post.comments.map(c => `
            <div class="text-sm">
              <span class="font-semibold">${c.user}</span>
              <span class="text-zinc-300">${c.text}</span>
            </div>
          `).join('')}
        </div>

        <span class="text-[10px] text-zinc-500 tracking-wider uppercase mt-1">${post.time}</span>

        <!-- Input de Comentário -->
        <div class="flex items-center gap-2 border-t border-zinc-800 pt-3 mt-1">
          <input type="text" id="input-comment-${post.id}" placeholder="Adicione um comentário..." class="bg-transparent text-sm flex-1 focus:outline-none">
          <button onclick="addComment(${post.id})" class="text-blue-500 text-sm font-semibold hover:text-blue-400">Publicar</button>
        </div>
      </div>
    </article>
  `).join("");
}

// RENDERIZAR GRID DO PERFIL
function renderProfileGrid() {
  const container = document.getElementById("profileGrid");
  const myPosts = postsData.filter(p => p.user === "seu_usuario");

  document.getElementById("profilePostCount").innerText = myPosts.length;

  container.innerHTML = myPosts.map(post => `
    <div class="relative group aspect-square cursor-pointer overflow-hidden bg-zinc-900" onclick="openPostDetail(${post.id})">
      <img src="${post.postImg}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-6 font-bold text-white">
        <span class="flex items-center gap-2"><i class="fa-solid fa-heart"></i> ${post.likes}</span>
        <span class="flex items-center gap-2"><i class="fa-solid fa-comment"></i> ${post.comments.length}</span>
      </div>
    </div>
  `).join("");
}

// LÓGICA DE CURTIR / DOUBLE-TAP
function toggleLike(id) {
  const post = postsData.find(p => p.id === id);
  if (post) {
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
    renderPosts();
  }
}

function handleDoubleTap(id, e) {
  const post = postsData.find(p => p.id === id);
  if (post && !post.isLiked) {
    post.isLiked = true;
    post.likes += 1;
    renderPosts();
  }

  // Executar Animação do Coração Flutuante
  const heart = document.getElementById(`heart-anim-${id}`);
  if (heart) {
    heart.classList.remove("animate-heart");
    void heart.offsetWidth; // Trigger Reflow
    heart.classList.add("animate-heart");
  }
}

// SALVAR POST
function toggleSave(id) {
  const post = postsData.find(p => p.id === id);
  if (post) {
    post.isSaved = !post.isSaved;
    renderPosts();
  }
}

// ADICIONAR COMENTÁRIO
function addComment(id) {
  const input = document.getElementById(`input-comment-${id}`);
  if (input && input.value.trim() !== "") {
    const post = postsData.find(p => p.id === id);
    post.comments.push({ user: "seu_usuario", text: input.value.trim() });
    input.value = "";
    renderPosts();
  }
}

// MODAL DE CRIAÇÃO
function openCreateModal() {
  document.getElementById("createModal").classList.remove("hidden");
}

function closeCreateModal() {
  document.getElementById("createModal").classList.add("hidden");
  document.getElementById("postImgInput").value = "";
  document.getElementById("postCaptionInput").value = "";
}

function submitNewPost() {
  const imgUrl = document.getElementById("postImgInput").value.trim();
  const caption = document.getElementById("postCaptionInput").value.trim();

  if (!imgUrl) {
    alert("Por favor, informe a URL da imagem.");
    return;
  }

  const newPost = {
    id: Date.now(),
    user: "seu_usuario",
    userImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    postImg: imgUrl,
    caption: caption || "Nova publicação ✨",
    likes: 0,
    isLiked: false,
    isSaved: false,
    comments: [],
    time: "AGORA"
  };

  postsData.unshift(newPost);
  closeCreateModal();
  renderPosts();
  renderProfileGrid();
}

// MODAL DE STORY
function openStory(imgUrl, username, userImg) {
  const modal = document.getElementById("storyModal");
  const storyImg = document.getElementById("storyImg");
  const storyUsername = document.getElementById("storyUsername");
  const storyUserImg = document.getElementById("storyUserImg");
  const progressBar = document.getElementById("storyProgressBar");

  storyImg.src = imgUrl;
  storyUsername.innerText = username;
  storyUserImg.src = userImg || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";

  modal.classList.remove("hidden");
  progressBar.style.width = "0%";

  let progress = 0;
  clearInterval(activeStoryInterval);

  activeStoryInterval = setInterval(() => {
    progress += 2;
    progressBar.style.width = `${progress}%`;
    if (progress >= 100) {
      closeStory();
    }
  }, 100);
}

function closeStory() {
  clearInterval(activeStoryInterval);
  document.getElementById("storyModal").classList.add("hidden");
}

// MODAL DE DETALHES / EXCLUSÃO DE POST
function openPostDetail(id) {
  currentDetailPostId = id;
  const post = postsData.find(p => p.id === id);
  if (!post) return;

  document.getElementById("detailPostImg").src = post.postImg;
  document.getElementById("detailPostCaption").innerText = post.caption;
  document.getElementById("postDetailModal").classList.remove("hidden");
}

function closePostDetailModal() {
  document.getElementById("postDetailModal").classList.add("hidden");
}

function deleteCurrentPost() {
  if (currentDetailPostId) {
    postsData = postsData.filter(p => p.id !== currentDetailPostId);
    closePostDetailModal();
    renderPosts();
    renderProfileGrid();
  }
}
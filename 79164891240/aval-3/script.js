
const profileImage = "https://geekcitytoys.com/cdn/shop/files/SF03.jpg?v=1717531715";

const posts = [
  {
    id: 1,
    image: "https://i5.walmartimages.com/asr/0d82913c-6ed3-40f7-b0ce-13d59494b78c.e96e9e252f2dfdc17ea89442f362bd08.jpeg?odnBg=FFFFFF&odnHeight=576&odnWidth=576",
    caption: "Batman da McFarlane! Essa versão é muito bonita 🦇",
    likes: 1248,
    date: "HÁ 2 HORAS",
    comments: [
      ["marina.dc", "Essa figura é linda!!"],
      ["gui.collector", "A capa ficou muito boa nessa versão."]
    ]
  },
  {
    id: 2,
    image: "https://geekcitytoys.com/cdn/shop/files/SF03.jpg?v=1717531715",
    caption: "Olha essa Estelar!! Minha personagem favorita ⭐💗",
    likes: 986,
    date: "ONTEM",
    comments: [
      ["ana.comics", "ELA É PERFEITA"],
      ["rafael.hqs", "Muito bonita essa figure!"]
    ]
  },
  {
    id: 3,
    image: "https://forums.marvelousnews.com/uploads/monthly_2024_08/Marvel_Legends_Series_The_Cabal_By_MCUcollector24_16.jpg.82f9ba0208cf45971ef9bcbf540de448.jpg",
    caption: "Uma coleção dessas seria um sonho 😭❤️",
    likes: 2031,
    date: "HÁ 2 DIAS",
    comments: [
      ["marvel.fan", "Marvel Legends é muito bom!"],
      ["luizinho", "Queria todos kkkkk"]
    ]
  },
  {
    id: 4,
    image: "https://lede-admin.popheist.com/wp-content/uploads/sites/63/2024/11/marvel-legends-action-figures.jpg",
    caption: "Olhem o tanto de personagem junto! Qual vocês escolheriam?",
    likes: 754,
    date: "HÁ 3 DIAS",
    comments: [
      ["bia.nerd", "Wolverine com certeza!"],
      ["pedro.marvel", "Essa coleção é absurda."]
    ]
  },
  {
    id: 5,
    image: "https://media.karousell.com/media/photos/products/2023/2/26/hasbro_marvel_legends_spiderma_1677404824_de433b7c.jpg",
    caption: "As figuras Marvel Legends têm cada detalhe!!",
    likes: 1102,
    date: "HÁ 4 DIAS",
    comments: [
      ["carlos.figures", "Muito legais!"],
      ["maria.hqs", "A organização ficou ótima."]
    ]
  },
  {
    id: 6,
    image: "https://i.ebayimg.com/images/g/ym0AAeSwr5Fp2sve/s-l1200.webp",
    caption: "Mais uma foto de figuras para a coleção 💙",
    likes: 642,
    date: "HÁ 5 DIAS",
    comments: [
      ["gui.collector", "Essa versão é clássica!"]
    ]
  },
  {
    id: 7,
    image: "https://forums.marvelousnews.com/uploads/monthly_2020_11/Ms-Marvel-Spidey-Cosplay-06.JPG.fb3355f8ebd1c542559b2485c9741fc6.JPG",
    caption: "A variedade de personagens é o que eu mais gosto!",
    likes: 895,
    date: "HÁ 6 DIAS",
    comments: [
      ["ana.comics", "Adorei a foto!"]
    ]
  },
  {
    id: 8,
    image: "https://geekcitytoys.com/cdn/shop/files/SF03.jpg?v=1717531715",
    caption: "Estelar merece muito mais destaque nas coleções ⭐",
    likes: 1570,
    date: "HÁ 1 SEMANA",
    comments: [
      ["bia.nerd", "Concordo muito!"],
      ["marina.dc", "Minha favorita dos Titãs."]
    ]
  },
  {
    id: 9,
    image: "https://i5.walmartimages.com/asr/0d82913c-6ed3-40f7-b0ce-13d59494b78c.e96e9e252f2dfdc17ea89442f362bd08.jpeg?odnBg=FFFFFF&odnHeight=576&odnWidth=576",
    caption: "Batman sempre será um dos meus favoritos 🦇",
    likes: 2180,
    date: "HÁ 1 SEMANA",
    comments: [
      ["gui.collector", "O melhor da DC!"]
    ]
  }
];

const suggestions = [
  { name: "marina.dc", detail: "Seguido por 2 pessoas", emoji: "🦇" },
  { name: "ana.comics", detail: "Nova sugestão", emoji: "📚" },
  { name: "gui.collector", detail: "Seguido por você", emoji: "🤖" },
  { name: "marvel.fan", detail: "Sugestão para você", emoji: "🦸" }
];

const stories = [
  { name: "Seu story", emoji: "+", own: true },
  { name: "estelar.fan", emoji: "⭐" },
  { name: "batman.dc", emoji: "🦇" },
  { name: "marvelworld", emoji: "🦸" },
  { name: "figures.br", emoji: "🤖" },
  { name: "meus.hqs", emoji: "📚" }
];

let currentPostId = null;
let following = false;
let followerCount = 1248;


// FUNÇÕES AUXILIARES

function formatNumber(number) {
  return number.toLocaleString("pt-BR");
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

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}


// NAVEGAÇÃO ENTRE PÁGINAS

function showPage(pageName) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active-page");
  });

  const page = document.getElementById(pageName + "Page");

  if (page) {
    page.classList.add("active-page");
  }

  document.querySelectorAll(".nav-item[data-page]").forEach(item => {
    item.classList.toggle("active", item.dataset.page === pageName);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});


// STORIES

function renderStories() {
  const container = document.getElementById("stories");

  container.innerHTML = stories.map((story, index) => `
    <button class="story" data-story-index="${index}">
      <div class="story-ring">
        <div class="story-image">
          ${story.own ? "+" : story.emoji}
        </div>
      </div>
      <span class="story-name">${story.name}</span>
    </button>
  `).join("");
}

function openStory(name, emoji) {
  const modal = document.getElementById("storyModal");
  const content = document.getElementById("storyViewerContent");

  content.innerHTML = `
    <div style="font-size:65px">${emoji}</div>
    <strong>${escapeHTML(name)}</strong>
    <p style="font-size:15px">Um pouquinho do meu universo geek 💗</p>
  `;

  modal.classList.add("open");
}


// SUGESTÕES

function renderSuggestions() {
  const container = document.getElementById("suggestions");

  container.innerHTML = suggestions.map(person => `
    <div class="suggestion">
      <div class="suggestion-person">
        <div class="story-image" style="width:36px;height:36px;font-size:17px">
          ${person.emoji}
        </div>
        <div>
          <b>${person.name}</b>
          <small>${person.detail}</small>
        </div>
      </div>
      <button class="follow-button" data-follow="${person.name}">Seguir</button>
    </div>
  `).join("");
}


// CRIAR CARD DE PUBLICAÇÃO

function createPostCard(post) {
  return `
    <article class="post" data-post-id="${post.id}">

      <div class="post-header">
        <div class="post-author" data-open-profile>
          <img class="author-avatar" src="${profileImage}" alt="Estelar">
          <div>
            <span class="author-name">eduarda.lima</span>
            <span class="post-location">Brasil · ${post.date}</span>
          </div>
        </div>
        <button class="post-options" aria-label="Mais opções">
          <i class="fa-solid fa-ellipsis"></i>
        </button>
      </div>

      <div class="post-image" data-open-post="${post.id}">
        <img src="${post.image}" alt="Action figure e colecionável"
             loading="lazy"
             onerror="this.src='https://placehold.co/700x700/f1e6f1/745080?text=Foto+indisponivel'">
      </div>

      <div class="post-actions">
        <div class="action-group">
          <button class="action-button like-button" data-like="${post.id}" aria-label="Curtir">
            <i class="fa-regular fa-heart"></i>
          </button>
          <button class="action-button" data-open-post="${post.id}" aria-label="Comentar">
            <i class="fa-regular fa-comment"></i>
          </button>
          <button class="action-button share-button" aria-label="Compartilhar">
            <i class="fa-regular fa-paper-plane"></i>
          </button>
        </div>
        <button class="action-button save-button" data-save="${post.id}" aria-label="Salvar">
          <i class="fa-regular fa-bookmark"></i>
        </button>
      </div>

      <div class="post-info">
        <span class="like-count" id="likes-${post.id}">
          ${formatNumber(post.likes)} curtidas
        </span>

        <p class="caption">
          <strong>eduarda.lima</strong>
          ${escapeHTML(post.caption)}
        </p>

        <p class="hashtags">#Marvel #DC #ActionFigures #Geek</p>

        <button class="view-comments" data-open-post="${post.id}">
          Ver todos os ${post.comments.length} comentários
        </button>

        <span class="post-date">${post.date}</span>
      </div>

      <form class="comment-entry" data-comment-form="${post.id}">
        <input type="text" placeholder="Adicione um comentário..." aria-label="Comentário">
        <button type="submit">Publicar</button>
      </form>

    </article>
  `;
}


// MOSTRAR PUBLICAÇÕES

function renderFeed() {
  document.getElementById("feedPosts").innerHTML =
    posts.map(createPostCard).join("");
}

function renderProfileGrid() {
  document.getElementById("profileGrid").innerHTML =
    posts.map(post => `
      <button class="grid-item" data-open-post="${post.id}">
        <img src="${post.image}" alt="Publicação de Eduarda" loading="lazy"
             onerror="this.src='https://placehold.co/600x600/f1e6f1/745080?text=Foto+indisponivel'">
        <span class="grid-overlay">
          <span><i class="fa-solid fa-heart"></i> ${formatNumber(post.likes)}</span>
          <span><i class="fa-solid fa-comment"></i> ${post.comments.length}</span>
        </span>
      </button>
    `).join("");

  document.getElementById("postCount").textContent = posts.length;
}

function renderExplore() {
  document.getElementById("exploreGrid").innerHTML =
    posts.slice().reverse().map(post => `
      <button class="grid-item" data-open-post="${post.id}">
        <img src="${post.image}" alt="Figura colecionável" loading="lazy"
             onerror="this.src='https://placehold.co/600x600/f1e6f1/745080?text=Foto+indisponivel'">
        <span class="grid-overlay">
          <span><i class="fa-solid fa-heart"></i> ${formatNumber(post.likes)}</span>
        </span>
      </button>
    `).join("");
}


// LOCALIZAR PUBLICAÇÃO

function findPost(id) {
  return posts.find(post => post.id === Number(id));
}


// CURTIDAS

function toggleLike(id, button) {
  const post = findPost(id);
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;

  button.classList.toggle("liked", post.liked);

  button.innerHTML = post.liked
    ? '<i class="fa-solid fa-heart"></i>'
    : '<i class="fa-regular fa-heart"></i>';

  const count = document.getElementById("likes-" + id);
  if (count) {
    count.textContent = formatNumber(post.likes) + " curtidas";
  }

  const modalCount = document.getElementById("modalLikeCount");
  if (modalCount) {
    modalCount.textContent = formatNumber(post.likes) + " curtidas";
  }
}


// ABRIR DETALHES E COMENTÁRIOS

function openPost(id) {
  const post = findPost(id);
  if (!post) return;

  currentPostId = post.id;

  document.getElementById("postModalContent").innerHTML = `
    <div class="detail-layout">
      <div class="detail-image">
        <img src="${post.image}" alt="Action figure">
      </div>

      <div class="detail-info">
        <div class="post-author">
          <img class="author-avatar" src="${profileImage}" alt="Estelar">
          <span class="author-name">eduarda.lima</span>
        </div>

        <div style="padding:15px 0;border-bottom:1px solid #eee;font-size:13px">
          <b>eduarda.lima</b> ${escapeHTML(post.caption)}
        </div>

        <div class="detail-comments" id="detailComments">
          ${post.comments.map(comment => `
            <div class="detail-comment">
              <b>${escapeHTML(comment[0])}</b>
              ${escapeHTML(comment[1])}
            </div>
          `).join("")}
        </div>

        <div style="font-size:13px;padding:8px 0">
          <b id="modalLikeCount">${formatNumber(post.likes)} curtidas</b>
        </div>

        <form class="detail-comment-form" id="detailCommentForm">
          <input id="detailCommentInput" placeholder="Adicione um comentário..." autocomplete="off">
          <button type="submit">Publicar</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById("postModal").classList.add("open");
}


// COMENTAR

function addComment(id, text) {
  const post = findPost(id);
  if (!post || !text.trim()) return;

  post.comments.push(["eduarda.lima", text.trim()]);

  renderFeed();
  renderProfileGrid();

  showToast("Comentário publicado! 💗");
}


// EVENTOS GERAIS

document.addEventListener("click", event => {

  const likeButton = event.target.closest("[data-like]");
  if (likeButton) {
    toggleLike(likeButton.dataset.like, likeButton);
    return;
  }

  const openButton = event.target.closest("[data-open-post]");
  if (openButton) {
    openPost(openButton.dataset.openPost);
    return;
  }

  const profileButton = event.target.closest("[data-open-profile]");
  if (profileButton) {
    showPage("profile");
    return;
  }

  const followButton = event.target.closest("[data-follow]");
  if (followButton) {
    const isFollowing = followButton.classList.toggle("following");
    followButton.textContent = isFollowing ? "Seguindo" : "Seguir";
    showToast(isFollowing ? "Você está seguindo esse perfil!" : "Você deixou de seguir.");
    return;
  }

  const saveButton = event.target.closest("[data-save]");
  if (saveButton) {
    const saved = saveButton.classList.toggle("saved");
    saveButton.innerHTML = saved
      ? '<i class="fa-solid fa-bookmark"></i>'
      : '<i class="fa-regular fa-bookmark"></i>';
    showToast(saved ? "Publicação salva!" : "Publicação removida dos salvos.");
    return;
  }

  const storyButton = event.target.closest("[data-story-index]");
  if (storyButton) {
    const story = stories[Number(storyButton.dataset.storyIndex)];

    if (story.own) {
      document.getElementById("createModal").classList.add("open");
    } else {
      openStory(story.name, story.emoji);
    }
    return;
  }

  const highlightButton = event.target.closest("[data-story]");
  if (highlightButton) {
    openStory(highlightButton.dataset.story, "⭐");
    return;
  }

  const shareButton = event.target.closest(".share-button");
  if (shareButton) {
    showToast("Compartilhamento demonstrativo 💌");
  }

});


// FORMULÁRIOS DE COMENTÁRIOS DO FEED

document.addEventListener("submit", event => {
  const form = event.target.closest("[data-comment-form]");
  if (!form) return;

  event.preventDefault();

  const input = form.querySelector("input");
  const id = form.dataset.commentForm;

  if (!input.value.trim()) {
    showToast("Escreva um comentário primeiro.");
    return;
  }

  addComment(id, input.value);
});


// COMENTÁRIO DENTRO DO MODAL

document.addEventListener("submit", event => {
  if (event.target.id !== "detailCommentForm") return;

  event.preventDefault();

  const input = document.getElementById("detailCommentInput");

  if (!input.value.trim()) return;

  addComment(currentPostId, input.value);
  openPost(currentPostId);
});


// CRIAR PUBLICAÇÃO

document.getElementById("openCreate").addEventListener("click", () => {
  document.getElementById("createModal").classList.add("open");
});

document.getElementById("publishPost").addEventListener("click", () => {
  const image = document.getElementById("imageUrl").value.trim();
  const caption = document.getElementById("captionInput").value.trim();

  if (!image || !caption) {
    showToast("Adicione uma imagem e uma legenda.");
    return;
  }

  try {
    const url = new URL(image);

    if (!["http:", "https:"].includes(url.protocol)) {
      showToast("Use um endereço de imagem válido.");
      return;
    }

    const newPost = {
      id: Date.now(),
      image: url.href,
      caption,
      likes: 0,
      date: "AGORA",
      comments: []
    };

    posts.unshift(newPost);

    renderFeed();
    renderProfileGrid();
    renderExplore();

    document.getElementById("imageUrl").value = "";
    document.getElementById("captionInput").value = "";
    document.getElementById("createModal").classList.remove("open");

    showPage("profile");
    showToast("Sua publicação foi criada! ✨");

  } catch {
    showToast("O endereço da imagem não parece válido.");
  }
});


// FOTO DE PERFIL

document.getElementById("profilePhotoButton").addEventListener("click", () => {
  document.getElementById("avatarModal").classList.add("open");
});


// EDITAR PERFIL

document.getElementById("editProfile").addEventListener("click", () => {
  showToast("Perfil de demonstração: edição não conectada.");
});


// FECHAR MODAIS

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.close).classList.remove("open");
  });
});

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.classList.remove("open");
    }
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal.open").forEach(modal => {
      modal.classList.remove("open");
    });
  }
});


// INICIALIZAÇÃO

renderStories();
renderSuggestions();
renderFeed();
renderProfileGrid();
renderExplore();

document.getElementById("followerCount").textContent =
  formatNumber(followerCount);



const gambit = "https://www.kapowtoys.de/uploads/2020/05/mafex-gambit-4.jpg";

let posts = [
  {
    id: 1,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/b118e48d-1435-4252-8c34-d83d04457b30.jpg",
    caption: "Batman McFarlane! 🦇",
    likes: 128,
    comments: ["raven: Ficou incrível! 🖤", "geovanna: Muito bom!"]
  },
  {
    id: 2,
    image: "https://i5.walmartimages.com/asr/c8ab619c-99dd-474b-b9b8-ff9bb9db23bf.74d16e9627066bbe87cd7ea14b01e348.jpeg",
    caption: "Spider-Man MAFEX! 🕷️",
    likes: 95,
    comments: ["raven: Esse é muito bonito!", "figs_world: Coleção top!"]
  },
  {
    id: 3,
    image: "https://img.toy-people.com/member/167351257011.jpg",
    caption: "Naruto S.H.Figuarts 🍥",
    likes: 76,
    comments: ["raven: Adorei esse!", "geovanna: Quero um também."]
  },
  {
    id: 4,
    image: "https://files.ekmcdn.com/f3c05b/images/the-thing-ultimate-macready-v.3-last-stand-7-inch-scale-action-figure-from-neca-%287%29-40167-1-p.jpg?h=9999&v=FAFED150-46D1-4E94-95A8-A47626006774&w=700",
    caption: "Mais uma figura para a coleção!",
    likes: 64,
    comments: ["raven: Ficou perfeito!"]
  },
  {
    id: 5,
    image: "https://monsutagames.co.uk/cdn/shop/files/medicom-mafex-the-amazing-spiderman-185-classic-costume-version-01.jpg?v=1741795303",
    caption: "Mais um Homem-Aranha para a coleção.",
    likes: 112,
    comments: ["raven: Esse é meu favorito!"]
  },
  {
    id: 6,
    image: gambit,
    caption: "Gambit! Um dos meus favoritos. ♠️",
    likes: 150,
    comments: ["raven: Esse combina com seu perfil! 🖤"]
  }
];

let liked = [];
let saved = [];
let selectedPost = null;

function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(page);
  if (target) target.classList.add("active");

  if (page === "home") renderFeed();
  if (page === "profile") renderProfile();
  if (page === "explore") renderExplore();
  if (page === "saved") renderSaved();
}

document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

function postCard(post) {
  return `
    <article class="post">
      <div class="post-header">
        <img src="${gambit}" alt="Gambit" onclick="showPage('profile')">
        <strong onclick="showPage('profile')">vini_figs</strong>
      </div>
      <img class="post-image" src="${post.image}" alt="${post.caption}" onclick="openPost(${post.id})"
        onerror="this.src='https://placehold.co/600x600?text=Action+Figure'">
      <div class="post-actions">
        <button onclick="toggleLike(${post.id})">${liked.includes(post.id) ? "❤️" : "🤍"}</button>
        <button onclick="openPost(${post.id})">💬</button>
        <button onclick="toggleSave(${post.id})">${saved.includes(post.id) ? "🔖" : "♧"}</button>
      </div>
      <div class="post-caption"><strong>${post.likes + (liked.includes(post.id) ? 1 : 0)} curtidas</strong><p><strong>vini_figs</strong> ${post.caption}</p></div>
      <div class="comments">${post.comments.map(c => `<p>${c}</p>`).join("")}</div>
      <form class="comment-form" onsubmit="addComment(event, ${post.id})">
        <input placeholder="Adicione um comentário..." required>
        <button>Publicar</button>
      </form>
    </article>
  `;
}

function renderFeed() {
  document.getElementById("feed").innerHTML = posts.map(postCard).join("");
}

function renderProfile() {
  document.getElementById("profileGrid").innerHTML = posts.map(post => `
    <img src="${post.image}" alt="${post.caption}" onclick="openPost(${post.id})"
      onerror="this.src='https://placehold.co/400x400?text=Action+Figure'">
  `).join("");
  document.getElementById("postCount").textContent = posts.length;
}

function renderExplore() {
  document.getElementById("exploreGrid").innerHTML = posts.map(post => `
    <img src="${post.image}" alt="${post.caption}" onclick="openPost(${post.id})">
  `).join("");
}

function renderSaved() {
  const savedPosts = posts.filter(post => saved.includes(post.id));
  document.getElementById("savedGrid").innerHTML = savedPosts.map(post => `
    <img src="${post.image}" alt="${post.caption}" onclick="openPost(${post.id})">
  `).join("") || "<p>Nenhuma publicação salva ainda.</p>";
}

function toggleLike(id) {
  liked = liked.includes(id) ? liked.filter(x => x !== id) : [...liked, id];
  renderFeed();
}

function toggleSave(id) {
  saved = saved.includes(id) ? saved.filter(x => x !== id) : [...saved, id];
  renderFeed();
}

function addComment(event, id) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const post = posts.find(p => p.id === id);
  post.comments.push("você: " + input.value);
  input.value = "";
  renderFeed();
}

function openPost(id) {
  selectedPost = posts.find(p => p.id === id);
  if (!selectedPost) return;

  document.getElementById("modalImage").src = selectedPost.image;
  document.getElementById("modalCaption").textContent = selectedPost.caption;
  document.getElementById("modalComments").innerHTML =
    selectedPost.comments.map(c => `<p>${c}</p>`).join("");
  document.getElementById("postModal").classList.add("show");
}

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("postModal").classList.remove("show");
});

document.getElementById("postModal").addEventListener("click", event => {
  if (event.target.id === "postModal") {
    event.currentTarget.classList.remove("show");
  }
});

document.getElementById("modalCommentForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!selectedPost) return;

  const input = document.getElementById("modalCommentInput");
  selectedPost.comments.push("você: " + input.value);
  document.getElementById("modalComments").innerHTML =
    selectedPost.comments.map(c => `<p>${c}</p>`).join("");
  input.value = "";
});

document.getElementById("createForm").addEventListener("submit", event => {
  event.preventDefault();

  const image = document.getElementById("imageUrl").value;
  const caption = document.getElementById("caption").value;

  posts.unshift({
    id: Date.now(),
    image,
    caption,
    likes: 0,
    comments: ["raven: Amei a publicação! 🖤"]
  });

  event.target.reset();
  showPage("home");
});

renderFeed();
renderProfile();

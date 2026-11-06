
const myAccount = {
  username: "meu_perfil",
  fullName: "Meu Nome",
  bio: "Bem-vindo ao meu Instagram! 📸✨",
  photo: "https://i.pravatar.cc/200?img=12"
};

const users = [
  {name:"ana", img:"https://i.pravatar.cc/100?img=47"},
  {name:"pedro", img:"https://i.pravatar.cc/100?img=12"},
  {name:"julia", img:"https://i.pravatar.cc/100?img=44"},
  {name:"lucas", img:"https://i.pravatar.cc/100?img=13"},
  {name:"mariana", img:"https://i.pravatar.cc/100?img=45"}
];

let posts = [
  {
    image:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900",
    caption:"Momentos especiais! 🌄",
    likes:128,
    liked:false
  },
  {
    image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
    caption:"Vivendo e aprendendo! ✨",
    likes:89,
    liked:false
  },
  {
    image:"https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900",
    caption:"Natureza e tranquilidade 🌿",
    likes:245,
    liked:false
  }
];

const feed = document.getElementById("feed");

function loadProfile() {
  document.getElementById("username").textContent =
    myAccount.username;

  document.getElementById("fullName").textContent =
    myAccount.fullName;

  document.getElementById("bio").textContent =
    myAccount.bio;

  document.getElementById("profilePhoto").src =
    myAccount.photo;
}

function editProfile() {
  const name = prompt("Seu nome:", myAccount.fullName);
  if (name === null) return;

  const bio = prompt("Sua biografia:", myAccount.bio);
  if (bio === null) return;

  const username = prompt("Seu usuário:", myAccount.username);
  if (username === null) return;

  myAccount.fullName = name;
  myAccount.bio = bio;
  myAccount.username = username.replace(/^@/, "").trim() || "meu_perfil";

  loadProfile();
}

function renderStories() {
  const stories = document.getElementById("stories");

  stories.innerHTML = `
    <div class="story">
      <img src="${myAccount.photo}">
      <p>Seu story</p>
    </div>
  ` + users.map(u => `
    <div class="story" onclick="alert('Story de ${u.name}')">
      <img src="${u.img}">
      <p>${u.name}</p>
    </div>
  `).join("");
}

function renderPosts() {
  feed.innerHTML = posts.map((p, i) => `
    <article class="post">
      <img class="post-image"
        src="${escapeHTML(p.image)}"
        ondblclick="likePost(${i})">

      <div class="post-overlay">
        <span>❤️ ${p.likes}</span>
        <span>💬 ${p.comments?.length || 0}</span>
      </div>
    </article>
  `).join("");

  document.getElementById("postCount").textContent =
    posts.length;
}

function escapeHTML(text) {
  return String(text).replace(/[&<>"']/g, c => ({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#39;'
  })[c]);
}

function likePost(i) {
  posts[i].liked = !posts[i].liked;
  posts[i].likes += posts[i].liked ? 1 : -1;
  renderPosts();
}

function createPost() {
  const image = document.getElementById("photo").value.trim();
  const caption = document.getElementById("description").value.trim();

  if (!image) {
    alert("Adicione uma imagem!");
    return;
  }

  posts.unshift({
    image,
    caption,
    likes: 0,
    liked: false,
    comments: []
  });

  document.getElementById("photo").value = "";
  document.getElementById("description").value = "";

  renderPosts();
}

loadProfile();
renderStories();
renderPosts();

const scriptMotos = document.createElement("script");
scriptMotos.src = "motos.js";
scriptMotos.onload = () => renderPosts();
document.body.appendChild(scriptMotos);

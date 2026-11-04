// DADOS DOS PERFIS FALSOS PARA O MODAL
const profiles = {
  miranha: {
    name: "Peter Parker (Homem-Aranha)",
    bio: "Seu amigo da vizinhança. Fotógrafo freelancer e viciado em Fortnite nas horas vagas.",
    friends: "3.4K",
    posts: "142",
    cover: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&q=80",
    avatarClass: "avatar-aranha",
    letter: "A"
  },
  hulk: {
    name: "Bruce Banner (Hulk)",
    bio: "Cientista de dia, esmagador de noite. NÃO ME FAÇA FICAR ZANGADO COM O TECLADO!",
    friends: "890",
    posts: "52",
    cover: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
    avatarClass: "avatar-hulk",
    letter: "H"
  },
  justiceiro: {
    name: "Frank Castle (Justiceiro)",
    bio: "Apenas um homem cumprindo o dever. Sniper de elite no Fortnite e na vida real.",
    friends: "12",
    posts: "15",
    cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    avatarClass: "avatar-punisher",
    letter: "J"
  },
  thanos: {
    name: "Thanos (Titan)",
    bio: "Buscador das 6 Joias do Infinito. Perfeitamente equilibrado, como todas as coisas devem ser.",
    friends: "1",
    posts: "6",
    cover: "https://images.unsplash.com/photo-1618477388954-7f1540e4f711?w=800&q=80",
    avatarClass: "avatar-thanos",
    letter: "T"
  },
  cidadao: {
    name: "Cidadão de Nova York",
    bio: "Apenas tentando sobreviver aos ataques de alienígenas toda semana.",
    friends: "450",
    posts: "88",
    cover: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    avatarClass: "avatar-civile",
    letter: "C"
  },
  mj: {
    name: "Mary Jane Watson",
    bio: "Atriz, modelo e namorada do fotógrafo mais atrapalhado do mundo.",
    friends: "2.1K",
    posts: "410",
    cover: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
    avatarClass: "avatar-mj",
    letter: "M"
  }
};

// INTERAÇÃO DE CURTIR COM CONTADOR VIVO
function toggleLike(btn, initialCount) {
  const isLiked = btn.classList.contains("active");
  const post = btn.closest(".post");
  const statsSpan = post.querySelector(".reactions");

  if (!isLiked) {
    btn.classList.add("active");
    btn.innerHTML = "👍 Curtido";
    statsSpan.innerHTML = `❤️👍 ${initialCount + 1}`;
  } else {
    btn.classList.remove("active");
    btn.innerHTML = "👍 Curtir";
    statsSpan.innerHTML = `❤️👍 ${initialCount}`;
  }
}

// ADICIONAR NOVO COMENTÁRIO AO PRESSIONAR ENTER
function addComment(event, input) {
  if (event.key === "Enter" && input.value.trim() !== "") {
    const commentsContainer = input.closest(".comments-section");
    const newComment = document.createElement("div");
    newComment.className = "comment";
    newComment.innerHTML = `
      <div class="avatar avatar-aranha" onclick="openProfile('miranha')">A</div>
      <div class="comment-bubble">
        <strong onclick="openProfile('miranha')">Homem-Aranha</strong>
        <p>${input.value}</p>
      </div>
    `;
    commentsContainer.insertBefore(newComment, input.closest(".add-comment-box"));
    input.value = "";
  }
}

// PUBLICAR NOVO POST NO FEED
function publishPost() {
  const input = document.getElementById("new-post-input");
  if (input.value.trim() === "") return;

  const feed = document.querySelector(".feed");
  const newArticle = document.createElement("article");
  newArticle.className = "card post";
  newArticle.innerHTML = `
    <div class="post-header">
      <div class="avatar avatar-aranha" onclick="openProfile('miranha')">A</div>
      <div class="post-info">
        <strong onclick="openProfile('miranha')">Homem-Aranha</strong>
        <span class="time">Agora mesmo · 🌎</span>
      </div>
    </div>
    <p class="post-text">${input.value}</p>
    <div class="post-stats">
      <span class="reactions">👍 1</span>
      <span class="comments-count">0 comentários</span>
    </div>
    <div class="post-actions-bar">
      <button class="btn-interact like-btn" onclick="toggleLike(this, 1)">👍 Curtir</button>
      <button class="btn-interact">💬 Comentar</button>
    </div>
    <div class="comments-section">
      <div class="add-comment-box">
        <div class="avatar avatar-aranha">A</div>
        <input type="text" placeholder="Escreva um comentário..." onkeypress="addComment(event, this)">
      </div>
    </div>
  `;

  feed.insertBefore(newArticle, feed.children[1]);
  input.value = "";
}

// ABRIR MODAL DE PERFIL FALSO
function openProfile(key) {
  const data = profiles[key];
  if (!data) return;

  document.getElementById("prof-name").textContent = data.name;
  document.getElementById("prof-bio").textContent = data.bio;
  document.getElementById("prof-friends").textContent = data.friends;
  document.getElementById("prof-posts").textContent = data.posts;
  document.getElementById("prof-cover").style.backgroundImage = `url('${data.cover}')`;

  const avatar = document.getElementById("prof-avatar");
  avatar.className = `profile-avatar-large ${data.avatarClass}`;
  avatar.textContent = data.letter;

  document.getElementById("profile-modal").classList.add("open");
}

// FECHAR MODAL
function closeModal() {
  document.getElementById("profile-modal").classList.remove("open");
}

function closeProfile(event) {
  if (event.target.id === "profile-modal") {
    closeModal();
  }
}
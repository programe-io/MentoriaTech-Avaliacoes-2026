const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuToggle.textContent = nav.classList.contains("active") ? "✕" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuToggle.textContent = "☰";
  });
});

// PUBLICAÇÕES INICIAIS

let posts = [
  {
    id: 1,
    author: "Comunidade Patas do Bem",
    avatar: "🐶",
    category: "Conscientização",
    text: "Abandonar um animal é deixar para trás uma vida que depende de cuidado e responsabilidade. Antes de adotar, pense no compromisso para toda a vida. Compartilhe essa mensagem! 🐾",
    likes: 12,
    liked: false,
    comments: ["Todo animal merece respeito! ❤️"]
  },
  {
    id: 2,
    author: "Amigos dos Animais",
    avatar: "🐱",
    category: "Adoção",
    text: "A adoção responsável pode transformar duas vidas: a do animal que encontra um lar e a da pessoa que ganha um companheiro. Divulgue essa ideia e procure protetores responsáveis da sua região!",
    likes: 24,
    liked: false,
    comments: ["Adotar é um ato de amor!"]
  },
  {
    id: 3,
    author: "Patas do Bem",
    avatar: "🐾",
    category: "Pedido de ajuda",
    text: "Encontrou um animal aparentemente perdido? Se possível, ofereça água em segurança, observe se há identificação e procure ajuda de uma ONG, protetor ou serviço público local. Não coloque sua segurança em risco.",
    likes: 18,
    liked: false,
    comments: []
  }
];

function renderPosts() {
  const container = document.getElementById("postsContainer");

  container.innerHTML = posts.map(post => `
    <article class="post">

      <div class="post-header">
        <div class="avatar">${post.avatar}</div>
        <div>
          <div class="post-author">${escapeHTML(post.author)}</div>
          <div class="post-date">Comunidade Patas do Bem</div>
        </div>
      </div>

      <span class="post-category">${escapeHTML(post.category)}</span>

      <p class="post-text">${escapeHTML(post.text).replace(/\n/g, "<br>")}</p>

      <div class="post-actions">
        <button class="${post.liked ? "liked" : ""}" onclick="likePost(${post.id})">
          ${post.liked ? "♥ Curtido" : "♡ Curtir"} (${post.likes})
        </button>

        <button onclick="toggleComments(${post.id})">
          💬 Comentar (${post.comments.length})
        </button>

        <button onclick="sharePost(${post.id})">
          ↗ Compartilhar
        </button>
      </div>

      <div class="comment-area" id="comments-${post.id}">
        <div class="comment-list">
          ${post.comments.map(comment => `
            <div class="comment-item">${escapeHTML(comment)}</div>
          `).join("")}
        </div>

        <input
          type="text"
          id="input-${post.id}"
          placeholder="Escreva um comentário..."
          maxlength="250"
          onkeydown="if(event.key === 'Enter') addComment(${post.id})"
        >

        <button class="btn" style="margin-top:10px"
          onclick="addComment(${post.id})">
          ENVIAR
        </button>
      </div>

    </article>
  `).join("");
}

// PROTEÇÃO CONTRA INSERÇÃO DE HTML EM TEXTO DO USUÁRIO

function escapeHTML(text) {
  return String(text).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

// PUBLICAR

function publishPost() {
  const textInput = document.getElementById("postText");
  const categoryInput = document.getElementById("postCategory");

  const text = textInput.value.trim();

  if (!text) {
    alert("Escreva alguma coisa antes de publicar!");
    return;
  }

  const newPost = {
    id: Date.now(),
    author: "Visitante",
    avatar: "🐾",
    category: categoryInput.value,
    text: text,
    likes: 0,
    liked: false,
    comments: []
  };

  posts.unshift(newPost);
  textInput.value = "";

  renderPosts();
}

// CURTIR

function likePost(id) {
  const post = posts.find(item => item.id === id);

  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;

  renderPosts();
}

// COMENTÁRIOS

function toggleComments(id) {
  const area = document.getElementById(`comments-${id}`);
  area.classList.toggle("active");
}

function addComment(id) {
  const input = document.getElementById(`input-${id}`);
  const comment = input.value.trim();

  if (!comment) return;

  const post = posts.find(item => item.id === id);

  if (!post) return;

  post.comments.push(comment);
  renderPosts();

  document.getElementById(`comments-${id}`).classList.add("active");
}

// COMPARTILHAR

function sharePost(id) {
  const post = posts.find(item => item.id === id);

  if (!post) return;

  const content = `${post.category}\n\n${post.text}\n\nPatas do Bem 🐾`;

  if (navigator.share) {
    navigator.share({
      title: "Patas do Bem",
      text: content
    }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(content)
      .then(() => alert("Publicação copiada!"))
      .catch(() => alert("Não foi possível copiar."));
  } else {
    alert(content);
  }
}

// CARREGAR PUBLICAÇÕES

renderPosts();
// Posts iniciais do feed
let posts = [
  {
    id: 1,
    autor: "Mariana Costa",
    avatar: "https://i.pravatar.cc/150?img=5",
    tempo: "2 h",
    texto: "Finalizando meu primeiro projeto web com HTML, CSS e JavaScript puro! Muito feliz com o resultado.",
    imagem: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    curtidas: 24,
    curtidoPorMim: false,
    comentarios: [
      { autor: "Lucas Oliveira", texto: "Ficou top demais! Parabéns pela evolução." }
    ]
  },
  {
    id: 2,
    autor: "Pedro Alves",
    avatar: "https://i.pravatar.cc/150?img=12",
    tempo: "5 h",
    texto: "Alguém mais codando hoje à noite com café do lado? ☕💻",
    imagem: "",
    curtidas: 11,
    curtidoPorMim: true,
    comentarios: []
  }
];

// Elementos do DOM
const feedList = document.getElementById("feed-list");
const postTextInput = document.getElementById("post-text");
const postImageInput = document.getElementById("post-image");
const publishBtn = document.getElementById("publish-btn");

// Renderiza todos os posts na tela
function renderFeed() {
  feedList.innerHTML = "";

  posts.forEach((post) => {
    const card = document.createElement("article");
    card.classList.add("post-card");

    const imageHTML = post.imagem
      ? `<img src="${post.imagem}" alt="Imagem da publicação" class="post-img">`
      : "";

    const commentsHTML = post.comentarios
      .map(
        (c) => `
        <div class="comment-item">
          <strong>${c.autor}</strong>
          <span>${c.texto}</span>
        </div>
      `
      )
      .join("");

    card.innerHTML = `
      <div class="post-header">
        <img src="${post.avatar}" alt="${post.autor}" class="avatar">
        <div class="post-author-info">
          <h4>${post.autor}</h4>
          <span>${post.tempo}</span>
        </div>
      </div>

      <p class="post-content">${post.texto}</p>
      ${imageHTML}

      <div class="post-stats">
        <span>👍 ${post.curtidas} curtidas</span>
        <span>${post.comentarios.length} comentários</span>
      </div>

      <div class="post-buttons">
        <button class="action-btn ${post.curtidoPorMim ? "liked" : ""}" onclick="toggleLike(${post.id})">
          👍 ${post.curtidoPorMim ? "Curtido" : "Curtir"}
        </button>
        <button class="action-btn" onclick="focusComment(${post.id})">
          💬 Comentar
        </button>
      </div>

      <div class="comments-section">
        ${commentsHTML}
        <form class="comment-form" onsubmit="addComment(event, ${post.id})">
          <input type="text" id="comment-input-${post.id}" class="comment-input" placeholder="Escreva um comentário..." required>
          <button type="submit" class="comment-submit">Enviar</button>
        </form>
      </div>
    `;

    feedList.appendChild(card);
  });
}

// Cria uma nova postagem
publishBtn.addEventListener("click", () => {
  const texto = postTextInput.value.trim();
  const imagem = postImageInput.value.trim();

  if (!texto && !imagem) {
    alert("Escreva algo ou insira o link de uma imagem antes de publicar.");
    return;
  }

  const novoPost = {
    id: Date.now(),
    autor: "Você",
    avatar: "https://i.pravatar.cc/150?img=11",
    tempo: "Agora mesmo",
    texto: texto,
    imagem: imagem,
    curtidas: 0,
    curtidoPorMim: false,
    comentarios: []
  };

  posts.unshift(novoPost);
  postTextInput.value = "";
  postImageInput.value = "";
  renderFeed();
});

// Alterna curtida
function toggleLike(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;

  post.curtidoPorMim = !post.curtidoPorMim;
  post.curtidas += post.curtidoPorMim ? 1 : -1;
  renderFeed();
}

// Foca no campo de comentário ao clicar em "Comentar"
function focusComment(id) {
  const input = document.getElementById(`comment-input-${id}`);
  if (input) input.focus();
}

// Adiciona um novo comentário
function addComment(event, id) {
  event.preventDefault();
  const input = document.getElementById(`comment-input-${id}`);
  const texto = input.value.trim();
  if (!texto) return;

  const post = posts.find((p) => p.id === id);
  if (!post) return;

  post.comentarios.push({
    autor: "Você",
    texto: texto
  });

  renderFeed();
}

// Inicializa o feed
renderFeed();
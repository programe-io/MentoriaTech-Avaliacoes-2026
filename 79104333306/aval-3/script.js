const posts = [
  {
    id: 0,
    emoji: "👏👻",
    titulo: "Esconde-Esconde",
    legenda: "invocacaodomal_oficial: Quer brincar de bater palmas no escuro? 🕯️ #InvocacaoDoMal #TheConjuring",
    likes: 1420,
    curtido: false,
    comentarios: ["ed_warren: Fiquem longe do porão!", "lorraine: Sinto uma presença maligna aqui."]
  },
  {
    id: 1,
    emoji: "🎎🔒",
    titulo: "Museu Oculto",
    legenda: "invocacaodomal_oficial: Aviso: Sob nenhuma circunstância abra esta vitrine. ⚠️ #Annabelle",
    likes: 2890,
    curtido: false,
    comentarios: ["fa_terror: Melhor cena de abertura!"]
  },
  {
    id: 2,
    emoji: "🕰️3:07",
    titulo: "03:07 da Manhã",
    legenda: "invocacaodomal_oficial: Todos os relógios da casa pararam exatamente às 03:07. O que isso significa?",
    likes: 980,
    curtido: false,
    comentarios: ["curioso99: É a hora da bruxa!"]
  },
  {
    id: 3,
    emoji: "🌳🪢",
    titulo: "A Árvore do Lago",
    legenda: "invocacaodomal_oficial: A propriedade em Harrisville guarda segredos desde 1863.",
    likes: 1750,
    curtido: false,
    comentarios: []
  },
  {
    id: 4,
    emoji: "✝️📖",
    titulo: "O Exorcismo",
    legenda: "invocacaodomal_oficial: 'Em nome do Pai, do Filho e do Espírito Santo, eu te ordeno!'",
    likes: 3410,
    curtido: false,
    comentarios: ["cinema_br: Clássico moderno do terror!"]
  },
  {
    id: 5,
    emoji: "🎵📦",
    titulo: "Caixinha de Música",
    legenda: "invocacaodomal_oficial: Olhe pelo espelho da caixinha quando a música parar...",
    likes: 2105,
    curtido: false,
    comentarios: []
  }
];

let postAtualIndex = 0;

// Renderizar grade de publicações
function renderizarFeed() {
  const grid = document.getElementById("posts-grid");
  grid.innerHTML = "";

  posts.forEach((post, index) => {
    const card = document.createElement("div");
    card.className = "post-card";
    card.innerHTML = `
      <span class="emoji">${post.emoji}</span>
      <span class="title">${post.titulo}</span>
    `;
    card.onclick = () => abrirModal(index);
    grid.appendChild(card);
  });
}

// Botão Seguir / Seguindo
const btnFollow = document.getElementById("btn-follow");
btnFollow.addEventListener("click", () => {
  btnFollow.classList.toggle("following");
  btnFollow.textContent = btnFollow.classList.contains("following") ? "Seguindo ✔" : "Seguir";
});

// Destaques (Stories)
function abrirStory(titulo, texto) {
  alert(`📌 DESTAQUE: ${titulo}\n\n${texto}`);
}

// Modal de Post
function abrirModal(index) {
  postAtualIndex = index;
  const post = posts[index];

  document.getElementById("modal-art").innerHTML = `<div>${post.emoji}</div><div style="font-size:16px; margin-top:8px;">${post.titulo}</div>`;
  document.getElementById("modal-caption").textContent = post.legenda;
  atualizarModalInfo();

  document.getElementById("post-modal").classList.remove("hidden");
}

function fecharModal() {
  document.getElementById("post-modal").classList.add("hidden");
}

function atualizarModalInfo() {
  const post = posts[postAtualIndex];
  const likeBtn = document.getElementById("modal-like-btn");
  likeBtn.textContent = post.curtido ? "❤️ Curtido" : "🤍 Curtir";
  document.getElementById("modal-likes-count").textContent = `${post.likes} curtidas`;

  const commentsDiv = document.getElementById("modal-comments");
  commentsDiv.innerHTML = post.comentarios.length
    ? post.comentarios.map(c => `<p>💬 ${c}</p>`).join("")
    : `<p style="color:#777;">Nenhum comentário ainda.</p>`;
}

function curtirPostAtual() {
  const post = posts[postAtualIndex];
  post.curtido = !post.curtido;
  post.likes += post.curtido ? 1 : -1;
  atualizarModalInfo();
}

function adicionarComentario() {
  const input = document.getElementById("comment-input");
  const texto = input.value.trim();
  if (texto !== "") {
    posts[postAtualIndex].comentarios.push(`voce: ${texto}`);
    input.value = "";
    atualizarModalInfo();
  }
}

// Iniciar página
renderizarFeed();

// Dados simulados das postagens
const posts = [
  {
    id: 1,
    title: "Por que os gatos amassam pãozinho?",
    category: "Comportamento",
    date: "20 de Novembro, 2026",
    image: "https://unsplash.com",
    summary: "Descubra a origem instintiva desse gesto fofo que remete aos primeiros dias de vida dos felinos.",
    content: "O ato de 'amassar pãozinho' é um comportamento instintivo que os gatos trazem desde filhotes. Quando estão mamando, eles pressionam as patas contra a barriga da mãe para estimular a produção de leite. Na fase adulta, os gatos repetem esse movimento quando se sentem extremamente seguros, relaxados e felizes perto de seus tutores.",
    likes: 14,
    liked: false
  },
  {
    id: 2,
    title: "Como incentivar seu gato a beber mais água",
    category: "Cuidados",
    date: "22 de Novembro, 2026",
    image: "https://unsplash.com",
    summary: "Gatos têm tendência a beber pouca água. Veja dicas práticas para evitar problemas renais.",
    content: "Como descendentes de animais do deserto, os gatos têm pouca sede natural. Para aumentar a ingestão hídrica: espalhe vários potes de água pela casa (longe da caixa de areia e da comida), invista em fontes de água corrente e ofereça sachês ou patês diariamente na dieta.",
    likes: 28,
    liked: false
  },
  {
    id: 3,
    title: "O mistério do ronronar: muito além da felicidade",
    category: "Curiosidades",
    date: "25 de Novembro, 2026",
    image: "https://unsplash.com",
    summary: "Você sabia que o ronronar dos gatos tem frequências capazes de ajudar na recuperação física?",
    content: "Embora o ronronar seja o sinal clássico de um gato contente, eles também ronronam quando estão com dor ou estressados para se acalmarem. Estudos indicam que a vibração do ronronar (entre 25 e 150 Hertz) ajuda a regenerar tecidos, fortalecer ossos e aliviar dores.",
    likes: 19,
    liked: false
  }
];

const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");

// Elementos do Modal
const modal = document.getElementById("postModal");
const closeModal = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalBody = document.getElementById("modalBody");

let currentCategory = "todos";

// Renderiza os cards na tela
function renderPosts() {
  const searchTerm = searchInput.value.toLowerCase();
  postsContainer.innerHTML = "";

  const filteredPosts = posts.filter(post => {
    const matchesCategory = currentCategory === "todos" || post.category === currentCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                          post.summary.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  if (filteredPosts.length === 0) {
    postsContainer.innerHTML = "<p>Nenhum artigo encontrado 😿</p>";
    return;
  }

  filteredPosts.forEach(post => {
    const card = document.createElement("article");
    card.className = "post-card";
    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <div class="post-content">
        <span class="badge">${post.category}</span>
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
        <div class="post-footer">
          <button class="read-btn" onclick="openPost(${post.id})">Ler artigo</button>
          <button class="like-btn ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
            ${post.liked ? '❤️' : '🤍'} ${post.likes}
          </button>
        </div>
      </div>
    `;
    postsContainer.appendChild(card);
  });
}

// Abre o modal com o texto completo
function openPost(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;

  modalImage.src = post.image;
  modalCategory.textContent = post.category;
  modalTitle.textContent = post.title;
  modalDate.textContent = post.date;
  modalBody.innerHTML = `<p>${post.content}</p>`;
  modal.style.display = "flex";
}

// Alterna curtida
function toggleLike(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderPosts();
}

// Eventos de filtro por categoria
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderPosts();
  });
});

// Evento de busca em tempo real
searchInput.addEventListener("input", renderPosts);

// Fechar modal
closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Inicializa o blog
renderPosts();

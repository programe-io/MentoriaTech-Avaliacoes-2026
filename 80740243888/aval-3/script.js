// 1. STORIES DE PESSOAS ALEATÓRIAS
const randomStories = [
  { user: "camila.glam", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" },
  { user: "lucas_mendes", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80" },
  { user: "julia.beauty", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80" },
  { user: "bia_alves", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&q=80" },
  { user: "fernanda.sp", img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&q=80" },
  { user: "rafaela_moda", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&q=80" },
  { user: "carol.nails", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80" },
  { user: "amanda_vlogs", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&q=80" }
];

const storiesContainer = document.getElementById("stories-container");

randomStories.forEach(story => {
  const item = document.createElement("div");
  item.className = "story-item";
  item.innerHTML = `
    <div class="story-ring">
      <img src="${story.img}" alt="${story.user}">
    </div>
    <span class="story-user">${story.user}</span>
  `;
  item.addEventListener("click", () => {
    alert(`Visualizando o story de @${story.user}: "Gente, vocês viram a unha nova da @sara_nails12?? Perfeita demais! 😍💅"`);
  });
  storiesContainer.appendChild(item);
});

// 2. COMENTÁRIOS DE ELOGIOS DA PUBLICAÇÃO VIRAL
const initialComments = [
  { user: "camila.glam", text: "MEU DEUS SARA!! Essa é literalmente a unha mais linda que eu já vi na minha vida 😭💖✨" },
  { user: "blogueira_beauty", text: "O acabamento dessa cutícula e esse brilho rosa bebê... impecável demais!! 🔥👏" },
  { user: "amanda.sp", text: "EU QUERO!! Já te mandei mensagem no direct, guarda um horário pra mim pelo amor de Deus 😍💅" },
  { user: "studio.unhasluxo", text: "Referência nacional!! Trabalho de milhões, parabéns pelo talento ❤️" },
  { user: "larissa_nails", text: "Que delicadeza absurda! Parece até filtro de tão perfeita que ficou 🌸✨" },
  { user: "juliana_makeup", text: "Vim pelo Explorar e já segui! Que trabalho perfeitoooo 💕" },
  { user: "mariana.spa", text: "A curvatura dessa unha está de outro mundo, zero defeitos! 👏👏" },
  { user: "gabrielly_rocha", text: "Salvei aqui pra mostrar pra minha manicure, mas duvido ficar igual à sua 😍" },
  { user: "patricia_lima", text: "Simplesmente perfeita! Esse tom de rosa bebê combina com tudo 💖" },
  { user: "nathalia.style", text: "Viralizou muito merecido!! Rainha do alongamento 👑💅" }
];

const commentsList = document.getElementById("comments-list");
const commentCountEl = document.getElementById("comment-count");
let totalComments = 4832;

function renderComment(user, text, prepend = false) {
  const div = document.createElement("div");
  div.className = "comment-item";
  div.innerHTML = `
    <div class="comment-text">
      <strong>${user}</strong> ${text}
    </div>
    <button class="comment-like" title="Curtir comentário"><i class="ri-heart-3-line"></i></button>
  `;

  // Curtir comentário individual
  const likeCommentBtn = div.querySelector(".comment-like");
  likeCommentBtn.addEventListener("click", () => {
    likeCommentBtn.classList.toggle("active");
    const icon = likeCommentBtn.querySelector("i");
    icon.className = likeCommentBtn.classList.contains("active") ? "ri-heart-3-fill" : "ri-heart-3-line";
  });

  if (prepend) {
    commentsList.prepend(div);
  } else {
    commentsList.appendChild(div);
  }
}

initialComments.forEach(c => renderComment(c.user, c.text));

// 3. ADICIONAR NOVO COMENTÁRIO
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const focusCommentBtn = document.getElementById("focus-comment-btn");

focusCommentBtn.addEventListener("click", () => commentInput.focus());

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = commentInput.value.trim();
  if (!text) return;

  renderComment("sara_nails12", text, true);
  totalComments++;
  commentCountEl.textContent = totalComments.toLocaleString("pt-BR");
  commentInput.value = "";
});

// 4. SISTEMA DE CURTIDAS (BOTÃO + DUPLO CLIQUE NA FOTO + CONTADOR VIRAL AO VIVO)
const likeBtn = document.getElementById("like-btn");
const likeIcon = document.getElementById("like-icon");
const likeCountEl = document.getElementById("like-count");
const postMedia = document.getElementById("post-media");
const bigHeart = document.getElementById("big-heart");

let isLiked = true;
let likesCount = 284915;

function updateLikeUI() {
  if (isLiked) {
    likeBtn.classList.add("liked");
    likeIcon.className = "ri-heart-3-fill";
  } else {
    likeBtn.classList.remove("liked");
    likeIcon.className = "ri-heart-3-line";
  }
  likeCountEl.textContent = likesCount.toLocaleString("pt-BR");
}

likeBtn.addEventListener("click", () => {
  isLiked = !isLiked;
  likesCount += isLiked ? 1 : -1;
  updateLikeUI();
});

// Duplo clique na foto da unha
postMedia.addEventListener("dblclick", () => {
  if (!isLiked) {
    isLiked = true;
    likesCount++;
    updateLikeUI();
  }
  bigHeart.classList.add("show");
  setTimeout(() => bigHeart.classList.remove("show"), 700);
});

// Simulação de publicação viralizando em tempo real (curtidas subindo sozinhas)
setInterval(() => {
  likesCount += Math.floor(Math.random() * 4) + 1;
  likeCountEl.textContent = likesCount.toLocaleString("pt-BR");
}, 2500);

// 5. SALVAR PUBLICAÇÃO
const saveBtn = document.getElementById("save-btn");
const saveIcon = document.getElementById("save-icon");
let isSaved = false;

saveBtn.addEventListener("click", () => {
  isSaved = !isSaved;
  saveIcon.className = isSaved ? "ri-bookmark-fill" : "ri-bookmark-line";
  saveIcon.style.color = isSaved ? "#f4669c" : "";
});

// 6. DROPDOWNS DE NOTIFICAÇÕES (CURTIDAS E MENSAGENS)
const btnLikes = document.getElementById("btn-likes");
const panelLikes = document.getElementById("panel-likes");
const btnDm = document.getElementById("btn-dm");
const panelDm = document.getElementById("panel-dm");

btnLikes.addEventListener("click", (e) => {
  e.stopPropagation();
  panelDm.classList.remove("open");
  panelLikes.classList.toggle("open");
});

btnDm.addEventListener("click", (e) => {
  e.stopPropagation();
  panelLikes.classList.remove("open");
  panelDm.classList.toggle("open");
});

document.addEventListener("click", () => {
  panelLikes.classList.remove("open");
  panelDm.classList.remove("open");
});

// Botões de "Seguir" na barra lateral
document.querySelectorAll(".follow-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "Seguir") {
      btn.textContent = "Seguindo";
      btn.style.background = "#e9ecef";
      btn.style.color = "#333";
    } else {
      btn.textContent = "Seguir";
      btn.style.background = "";
      btn.style.color = "";
    }
  });
});
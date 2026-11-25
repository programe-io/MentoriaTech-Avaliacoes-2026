// Botão Seguir / Seguindo
const followBtn = document.getElementById("follow-btn");
const followersCount = document.getElementById("followers-count");
let isFollowing = false;
let followers = 666;

followBtn.addEventListener("click", () => {
  isFollowing = !isFollowing;
  if (isFollowing) {
    followers++;
    followBtn.textContent = "Seguindo";
    followBtn.classList.add("following");
  } else {
    followers--;
    followBtn.textContent = "Seguir";
    followBtn.classList.remove("following");
  }
  followersCount.textContent = followers;
});

// Sistema de Curtidas (clique no coração ou duplo clique na imagem)
const likedPosts = { 1: false, 2: false };

function toggleLike(postId) {
  const btn = document.getElementById(`like-btn-${postId}`);
  const likesEl = document.getElementById(`likes-${postId}`);
  let currentLikes = parseInt(likesEl.textContent, 10);

  likedPosts[postId] = !likedPosts[postId];

  if (likedPosts[postId]) {
    btn.textContent = "❤️";
    likesEl.textContent = currentLikes + 1;
  } else {
    btn.textContent = "🤍";
    likesEl.textContent = currentLikes - 1;
  }
}

// Adicionar Comentários nas Publicações
function addComment(postId) {
  const input = document.getElementById(`input-${postId}`);
  const commentsList = document.getElementById(`comments-${postId}`);
  const text = input.value.trim();

  if (text !== "") {
    const newComment = document.createElement("p");
    newComment.innerHTML = `<strong>voce</strong> ${text}`;
    commentsList.appendChild(newComment);
    input.value = "";
  }
}

// Dicionário simples de tradução simulação (PT -> EN)
const translations = {
  "post-1": "Watching the new movie at the theater! The 3D experience was simply amazing! 🎬🕸️",
  "post-2": "Finalizing the last tweaks on my new HTML and CSS web project. Practicing is the best way to evolve! 💻🚀"
};

// Função para Curtir / Descurtir com Animação
function toggleLike(postId) {
  const post = document.getElementById(postId);
  const likeBtn = post.querySelector('.like-btn');
  const mediaBox = post.querySelector('.post-media');
  const likeIcon = likeBtn.querySelector('i');
  const countSpan = document.getElementById(`like-count-${postId}`);
  
  let currentLikes = parseInt(countSpan.textContent);

  if (likeBtn.classList.contains('liked')) {
    // Descurtir
    likeBtn.classList.remove('liked');
    likeIcon.className = 'fa-regular fa-heart';
    countSpan.textContent = currentLikes - 1;
  } else {
    // Curtir
    likeBtn.classList.add('liked');
    likeIcon.className = 'fa-solid fa-heart';
    countSpan.textContent = currentLikes + 1;

    // Dispara animação de coração na imagem
    mediaBox.classList.add('liked');
    setTimeout(() => {
      mediaBox.classList.remove('liked');
    }, 800);
  }
}

// Função de Tradução do Post
function translatePost(postId) {
  const post = document.getElementById(postId);
  const textElement = post.querySelector('.post-text');
  const transBtnText = post.querySelector('.trans-text');
  
  const isTranslated = textElement.getAttribute('data-translated') === 'true';

  if (!isTranslated) {
    textElement.textContent = translations[postId];
    textElement.setAttribute('data-translated', 'true');
    transBtnText.textContent = 'Ver original';
  } else {
    textElement.textContent = textElement.getAttribute('data-original');
    textElement.setAttribute('data-translated', 'false');
    transBtnText.textContent = 'Traduzir';
  }
}

// Focar no campo de comentário
function focusComment(postId) {
  const input = document.getElementById(`comment-input-${postId}`);
  input.focus();
}


function toggleLike(icon) {
  const post = icon.closest('.post');
  const likes = post.querySelector('.likes');

  let count = parseInt(likes.textContent.replace(/\D/g, ''));

  if (icon.classList.contains('liked')) {
    icon.classList.remove('liked', 'bxs-heart');
    icon.classList.add('bx-heart');
    count--;
  } else {
    icon.classList.remove('bx-heart');
    icon.classList.add('liked', 'bxs-heart');
    count++;
  }

  likes.textContent = count.toLocaleString('pt-BR') + ' curtidas';
}

function likePost(image) {
  const post = image.closest('.post');
  const icon = post.querySelector('.like-icon');

  if (!icon.classList.contains('liked')) {
    toggleLike(icon);
  }
}

function addComment(button) {
  const area = button.closest('.comment-area');
  const input = area.querySelector('input');
  const post = button.closest('.post');

  const text = input.value.trim();

  if (!text) return;

  const comment = document.createElement('p');
  const user = document.createElement('strong');

  user.textContent = 'seu_usuario ';
  comment.appendChild(user);
  comment.appendChild(document.createTextNode(text));

  post.querySelector('.post-content').insertBefore(
    comment,
    area
  );

  input.value = '';
}

// Modal de publicação
const modal = document.getElementById('modal');

document.getElementById('createBtn').onclick = () => {
  modal.style.display = 'flex';
};

document.getElementById('closeModal').onclick = () => {
  modal.style.display = 'none';
};

modal.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Criar publicação
document.getElementById('publishBtn').onclick = () => {
  const imageUrl = document.getElementById('imageUrl').value.trim();
  const caption = document.getElementById('caption').value.trim();

  if (!imageUrl) {
    alert('Informe o endereço de uma imagem!');
    return;
  }

  try {
    const url = new URL(imageUrl);

    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error('URL inválida');
    }
  } catch {
    alert('Informe uma URL válida!');
    return;
  }

  const post = document.createElement('article');
  post.className = 'post';

  post.innerHTML = `
    <div class="post-header">
      <img src="https://i.pravatar.cc/150?img=12">
      <strong>seu_usuario</strong>
      <span class="time">• agora</span>
      <i class='bx bx-dots-horizontal-rounded more-icon'></i>
    </div>

    <div class="post-image">
      <img src="${imageUrl}" ondblclick="likePost(this)">
    </div>

    <div class="post-actions">
      <div>
        <i class='bx bx-heart like-icon' onclick="toggleLike(this)"></i>
        <i class='bx bx-message-rounded'></i>
        <i class='bx bx-send'></i>
      </div>
      <i class='bx bx-bookmark'></i>
    </div>

    <div class="post-content">
      <strong class="likes">0 curtidas</strong>
      <p><strong>seu_usuario</strong> ${escapeHTML(caption)}</p>
      <span class="comments">Ver todos os comentários</span>
      <div class="comment-area">
        <input type="text" placeholder="Adicione um comentário...">
        <button onclick="addComment(this)">Publicar</button>
      </div>
    </div>
  `;

  // Validar se a imagem carregou
  const img = post.querySelector('.post-image img');
  img.onerror = () => {
    post.remove();
    alert('Não foi possível carregar essa imagem.');
  };

  document.getElementById('posts').prepend(post);

  document.getElementById('imageUrl').value = '';
  document.getElementById('caption').value = '';
  modal.style.display = 'none';
};

function escapeHTML(text) {
  return text.replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[char]);

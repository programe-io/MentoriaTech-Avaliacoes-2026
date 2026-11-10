const form = document.querySelector('#post-form');
const textInput = document.querySelector('#post-text');
const imageInput = document.querySelector('#post-image');
const imageName = document.querySelector('#image-name');
const imagePreview = document.querySelector('#image-preview');
const postsContainer = document.querySelector('#posts');
const postCount = document.querySelector('#post-count');

let selectedImage = '';
let publicationCount = postsContainer.querySelectorAll('.post').length;

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  selectedImage = '';
  imagePreview.replaceChildren();
  imagePreview.hidden = true;
  imageName.textContent = '';

  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('Selecione um arquivo de imagem válido.');
    imageInput.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    selectedImage = reader.result;
    const preview = document.createElement('img');
    preview.src = selectedImage;
    preview.alt = 'Prévia da imagem selecionada';
    imagePreview.append(preview);
    imagePreview.hidden = false;
  };
  reader.readAsDataURL(file);
  imageName.textContent = file.name;
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const content = textInput.value.trim();
  if (!content) {
    textInput.focus();
    return;
  }

  const post = document.createElement('article');
  post.className = 'post card';

  const header = document.createElement('div');
  header.className = 'post-header';
  header.innerHTML = '<div class="avatar">A</div><div class="author"><strong>Você</strong><span>Agora · <span class="public-icon">◎</span> Público</span></div>';

  const paragraph = document.createElement('p');
  paragraph.className = 'post-text';
  paragraph.textContent = content;

  post.append(header, paragraph);

  if (selectedImage) {
    const img = document.createElement('img');
    img.className = 'post-image';
    img.src = selectedImage;
    img.alt = 'Imagem adicionada à publicação';
    post.append(img);
  }

  const stats = document.createElement('div');
  stats.className = 'post-stats';
  stats.innerHTML = '<span>♡ <span class="like-count">0</span> curtidas</span><span>0 comentários</span>';

  const actions = document.createElement('div');
  actions.className = 'post-actions';
  actions.innerHTML = '<button class="action-button like-button" aria-label="Curtir publicação" aria-pressed="false">♡ <span>Curtir</span></button><button class="action-button comment-button">▢ <span>Comentar</span></button><button class="action-button share-button">↗ <span>Compartilhar</span></button>';

  post.append(stats, actions);
  postsContainer.prepend(post);
  publicationCount += 1;
  updatePostCount();
  form.reset();
  selectedImage = '';
  imageName.textContent = '';
  imagePreview.replaceChildren();
  imagePreview.hidden = true;
});

function updatePostCount() {
  postCount.textContent = `${publicationCount} publicações`;
}

postsContainer.addEventListener('click', async (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  if (button.classList.contains('like-button')) {
    const liked = button.getAttribute('aria-pressed') === 'true';
    const count = button.closest('.post').querySelector('.like-count');
    count.textContent = Number(count.textContent) + (liked ? -1 : 1);
    button.setAttribute('aria-pressed', String(!liked));
    button.classList.toggle('liked', !liked);
    button.querySelector('span').textContent = liked ? 'Curtir' : 'Curtido';
    button.firstChild.textContent = liked ? '♡ ' : '♥ ';
  }

  if (button.classList.contains('comment-button')) {
    const comment = prompt('Escreva seu comentário:');
    if (comment && comment.trim()) {
      const stats = button.closest('.post').querySelector('.post-stats span:last-child');
      const current = Number.parseInt(stats.textContent, 10) || 0;
      stats.textContent = `${current + 1} comentários`;
      alert('Comentário adicionado!');
    }
  }

  if (button.classList.contains('share-button')) {
    const postText = button.closest('.post').querySelector('.post-text').textContent;
    try {
      await navigator.clipboard.writeText(postText);
      alert('Texto da publicação copiado para compartilhar!');
    } catch {
      alert('Não foi possível acessar a área de transferência neste navegador.');
    }
  }
});

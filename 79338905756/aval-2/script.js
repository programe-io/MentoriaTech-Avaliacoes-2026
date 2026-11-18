
const posts = document.getElementById('posts');

// Curtidas
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('like-btn')) {
        const button = e.target;
        const post = button.closest('.post');
        const likes = post.querySelector('.likes');

        let count = parseInt(likes.textContent.replace(/\D/g, ''));

        if (button.classList.contains('liked')) {
            button.classList.remove('liked');
            button.classList.replace('fa-solid', 'fa-regular');
            count--;
        } else {
            button.classList.add('liked');
            button.classList.replace('fa-regular', 'fa-solid');
            count++;
        }

        likes.textContent = count.toLocaleString('pt-BR') + ' curtidas';
    }

    // Salvar publicação
    if (e.target.classList.contains('bookmark-btn')) {
        e.target.classList.toggle('fa-regular');
        e.target.classList.toggle('fa-solid');
    }
});

// Curtir com dois cliques na foto
document.addEventListener('dblclick', function(e) {
    if (e.target.classList.contains('post-image')) {
        const post = e.target.closest('.post');
        const button = post.querySelector('.like-btn');

        if (!button.classList.contains('liked')) {
            button.click();
        }
    }
});

// Adicionar comentários
document.addEventListener('keydown', function(e) {
    if (e.target.classList.contains('comment-input') && e.key === 'Enter') {
        const input = e.target;
        const text = input.value.trim();

        if (!text) return;

        const post = input.closest('.post');
        const comment = document.createElement('p');

        const username = document.createElement('strong');
        username.textContent = 'seu_usuario ';

        comment.appendChild(username);
        comment.appendChild(document.createTextNode(text));

        input.before(comment);
        input.value = '';
    }
});

// Modal de criação
const modal = document.getElementById('modal');
const createBtn = document.getElementById('createBtn');
const closeModal = document.getElementById('closeModal');
const publishBtn = document.getElementById('publishBtn');
const imageInput = document.getElementById('imageInput');
const captionInput = document.getElementById('captionInput');

createBtn.addEventListener('click', function(e) {
    e.preventDefault();
    modal.classList.add('active');
});

closeModal.addEventListener('click', function() {
    modal.classList.remove('active');
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Publicar foto
publishBtn.addEventListener('click', function() {
    const file = imageInput.files[0];
    const caption = captionInput.value.trim();

    if (!file) {
        alert('Selecione uma imagem primeiro!');
        return;
    }

    if (!file.type.startsWith('image/')) {
        alert('Selecione um arquivo de imagem válido.');
        return;
    }

    const imageURL = URL.createObjectURL(file);

    const post = document.createElement('article');
    post.className = 'post';

    const header = document.createElement('div');
    header.className = 'post-header';

    const avatar = document.createElement('img');
    avatar.src = 'https://i.pravatar.cc/100?img=12';

    const username = document.createElement('strong');
    username.textContent = 'seu_usuario';

    const time = document.createElement('span');
    time.className = 'time';
    time.textContent = '• agora';

    const menu = document.createElement('i');
    menu.className = 'fa-solid fa-ellipsis';

    header.append(avatar, username, time, menu);

    const image = document.createElement('img');
    image.className = 'post-image';
    image.src = imageURL;

    const actions = document.createElement('div');
    actions.className = 'post-actions';

    const leftActions = document.createElement('div');

    const heart = document.createElement('i');
    heart.className = 'fa-regular fa-heart like-btn';

    const commentIcon = document.createElement('i');
    commentIcon.className = 'fa-regular fa-comment';

    const sendIcon = document.createElement('i');
    sendIcon.className = 'fa-regular fa-paper-plane';

    leftActions.append(heart, commentIcon, sendIcon);

    const bookmark = document.createElement('i');
    bookmark.className = 'fa-regular fa-bookmark bookmark-btn';

    actions.append(leftActions, bookmark);

    const info = document.createElement('div');
    info.className = 'post-info';

    const likes = document.createElement('strong');
    likes.className = 'likes';
    likes.textContent = '0 curtidas';

    const description = document.createElement('p');
    const name = document.createElement('strong');
    name.textContent = 'seu_usuario ';

    description.append(name, document.createTextNode(caption));

    const commentInput = document.createElement('input');
    commentInput.className = 'comment-input';
    commentInput.placeholder = 'Adicione um comentário...';

    info.append(likes, description, commentInput);

    post.append(header, image, actions, info);

    posts.prepend(post);

    modal.classList.remove('active');

    imageInput.value = '';
    captionInput.value = '';
});

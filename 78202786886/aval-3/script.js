
function likePost(button) {
    const post = button.closest('.post');
    const likes = post.querySelector('.likes span');
    let total = Number(likes.textContent.replace('.', ''));

    if (button.classList.contains('active')) {
        button.classList.remove('active');
        button.textContent = '♡';
        total--;
    } else {
        button.classList.add('active');
        button.textContent = '♥';
        total++;
    }

    likes.textContent = total.toLocaleString('pt-BR');
}

function savePost(button) {
    button.classList.toggle('active');
    button.textContent = button.classList.contains('active') ? '🔖' : '♧';
}

function focusComment(button) {
    const input = button.closest('.post').querySelector('.comment-box input');
    input.focus();
}

function addComment(button) {
    const post = button.closest('.post');
    const input = post.querySelector('.comment-box input');
    const comments = post.querySelector('.comments');

    if (input.value.trim() === '') {
        alert('Digite um comentário primeiro!');
        return;
    }

    const p = document.createElement('p');
    const strong = document.createElement('strong');

    strong.textContent = 'enzo.vibes ';
    p.appendChild(strong);
    p.appendChild(document.createTextNode(input.value));

    comments.appendChild(p);
    input.value = '';
}

function followUser(button) {
    if (button.textContent === 'Seguir') {
        button.textContent = 'Seguindo';
        button.style.color = '#999';
    } else {
        button.textContent = 'Seguir';
        button.style.color = '#d52c85';
    }
}

function createPost() {
    const text = document.getElementById('postText').value.trim();
    const imageUrl = document.getElementById('postImage').value.trim();
    const file = document.getElementById('imageFile').files[0];

    if (!text && !imageUrl && !file) {
        alert('Adicione um texto ou uma foto!');
        return;
    }

    const publish = (image) => {
        const post = document.createElement('article');
        post.className = 'post';
        post.dataset.user = 'enzo';

        post.innerHTML = `
            <div class="post-header">
                <img src="https://i.pravatar.cc/100?img=12" alt="">
                <div>
                    <strong>enzo.vibes</strong>
                    <small>Publicado agora</small>
                </div>
                <button class="more" onclick="this.closest('.post').remove()">✕</button>
            </div>

            ${image ? `<img class="post-image" src="${image}" alt="Nova publicação">` : ''}

            <div class="post-actions">
                <button class="like" onclick="likePost(this)">♡</button>
                <button onclick="focusComment(this)">♧</button>
                <button onclick="alert('Link copiado!')">➤</button>
                <button class="save" onclick="savePost(this)">♧</button>
            </div>

            <p class="likes">❤️ <span>0</span> curtidas</p>
            <p><strong>enzo.vibes</strong> ${escapeHTML(text)}</p>
            <div class="comments"></div>
            <div class="comment-box">
                <input type="text" placeholder="Adicione um comentário...">
                <button onclick="addComment(this)">Publicar</button>
            </div>
        `;

        document.getElementById('feed').prepend(post);
        document.getElementById('postText').value = '';
        document.getElementById('postImage').value = '';
        document.getElementById('imageFile').value = '';

        post.scrollIntoView({ behavior: 'smooth' });
    };

    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            publish(event.target.result);
        };

        reader.readAsDataURL(file);
    } else {
        publish(imageUrl);
    }
}

function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function viewStory(name) {
    const modal = document.getElementById('storyModal');
    const photos = {
        Mariana: 47,
        Lucas: 11,
        Ana: 44,
        Pedro: 13,
        Julia: 49
    };

    document.getElementById('storyName').textContent = name;
    document.getElementById('storyPhoto').src =
        `https://i.pravatar.cc/500?img=${photos[name]}`;

    modal.style.display = 'flex';
}

function closeStory() {
    document.getElementById('storyModal').style.display = 'none';
}

document.getElementById('search').addEventListener('input', function() {
    const search = this.value.toLowerCase();

    document.querySelectorAll('.post').forEach(post => {
        post.style.display = post.innerText.toLowerCase().includes(search)
            ? 'block'
            : 'none';
    });
});

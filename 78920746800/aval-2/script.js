
function likePost(button) {
    const post = button.closest('.post');
    const likes = post.querySelector('.likes');

    let count = parseInt(likes.textContent.replace(/\D/g, '')) || 0;

    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        button.textContent = '♡';
        count--;
    } else {
        button.classList.add('liked');
        button.textContent = '♥';
        count++;
    }

    likes.textContent = count.toLocaleString('pt-BR') + ' curtidas';
}

function createPost() {
    const text = document.getElementById('postText').value.trim();
    const image = document.getElementById('postImage').value.trim();

    if (!text) {
        alert('Escreva algo sobre sua moto!');
        return;
    }

    if (image && !/^https?:\/\//i.test(image)) {
        alert('Insira um endereço de imagem válido.');
        return;
    }

    const post = document.createElement('article');
    post.className = 'post';

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=11">
            <div>
                <strong>Motociclista</strong>
                <small>Agora mesmo</small>
            </div>
            <span class="more">•••</span>
        </div>

        ${image ? `<img class="post-image" src="${escapeHTML(image)}" alt="Foto da publicação">` : ''}

        <div class="post-actions">
            <button class="like" onclick="likePost(this)">♡</button>
            <button onclick="commentPost(this)">💬</button>
            <button onclick="sharePost(this)">↗</button>
        </div>

        <div class="post-info">
            <strong class="likes">0 curtidas</strong>
            <p><strong>Motociclista</strong> ${escapeHTML(text)}</p>
            <div class="comments"></div>
            <small>Agora mesmo</small>
        </div>
    `;

    document.getElementById('posts').prepend(post);

    document.getElementById('postText').value = '';
    document.getElementById('postImage').value = '';
}

function escapeHTML(value) {
    return value.replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[char]);
}

function commentPost(button) {
    const post = button.closest('.post');
    const comment = prompt('Digite seu comentário:');

    if (comment && comment.trim()) {
        const comments = post.querySelector('.comments');
        const paragraph = document.createElement('p');
        paragraph.textContent = 'Você: ' + comment.trim();
        comments.appendChild(paragraph);
    }
}

function sharePost(button) {
    const post = button.closest('.post');
    const text = post.querySelector('.post-info p').innerText;

    if (navigator.share) {
        navigator.share({
            title: 'MOTOgram',
            text: text
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(text)
            .then(() => alert('Publicação copiada!'))
            .catch(() => alert('Não foi possível copiar.'));
    }
}

function followUser(button) {
    if (button.textContent === 'Seguir') {
        button.textContent = 'Seguindo';
        button.style.color = '#999';
    } else {
        button.textContent = 'Seguir';
        button.style.color = '#ff3434';
    }
}

document.getElementById('search').addEventListener('input', function() {
    const search = this.value.toLowerCase();

    document.querySelectorAll('.post').forEach(post => {
        const content = post.innerText.toLowerCase();
        post.style.display = content.includes(search) ? 'block' : 'none';
    });
});

function showHome() {
    document.getElementById('posts').scrollIntoView({
        behavior: 'smooth'
    });
}

function showNotifications() {
    alert('Você ainda não possui notificações novas! ❤️');
}

function showProfile() {
    alert('Perfil do motociclista');
}

/* NAVEGAÇÃO */

function changeView(view, button) {
    document.getElementById('feedView').style.display =
        view === 'feed' ? 'block' : 'none';

    ['explore', 'saved', 'profile'].forEach(id => {
        document.getElementById(id + 'View')
            .classList.toggle('visible', view === id);
    });

    document.querySelectorAll('.nav button').forEach(btn =>
        btn.classList.remove('active')
    );

    if (button) button.classList.add('active');

    const titles = {
        feed: ['Seu universo hoje.', 'Ideias, pessoas e descobertas em um só lugar.'],
        explore: ['Explore novas ideias.', 'Descubra conteúdo além do seu círculo.'],
        saved: ['Suas descobertas.', 'Tudo que você decidiu guardar.'],
        profile: ['Seu espaço.', 'Um pouco de quem você é.']
    };

    document.getElementById('viewTitle').textContent = titles[view][0];
    document.getElementById('viewSubtitle').textContent = titles[view][1];

    if(view === 'saved') renderSaved();
    if(view === 'profile') renderProfile();
    if(view === 'explore') renderExplore();
}

function mobileView(view, key) {
    changeView(view);

    document.querySelectorAll('.mobile-bottom button')
        .forEach(btn => btn.classList.remove('active'));

    const map = {
        home: 0,
        search: 1,
        saved: 3,
        profile: 4
    };

    document.querySelectorAll('.mobile-bottom button')[map[key]]
        .classList.add('active');
}

/* CURTIDAS */

function likePost(button) {
    button.classList.toggle('liked');

    if(button.classList.contains('liked')) {
        button.innerHTML = '♥ <span>Curtido</span>';
    } else {
        button.innerHTML = '♡ <span>Curtir</span>';
    }
}

/* SALVAR */

function savePost(button) {
    const post = button.closest('.post');
    const saved = post.dataset.saved === 'true';

    post.dataset.saved = saved ? 'false' : 'true';

    button.innerHTML = saved ? '◇' : '◆';
    button.classList.toggle('saved', !saved);

    showMessage(saved
        ? 'Publicação removida dos salvos.'
        : 'Publicação salva!'
    );

    renderSaved();
}

/* COMENTÁRIOS */

function focusComment(button) {
    const input = button.closest('.post')
        .querySelector('.comment-box input');

    input.focus();
}

function commentEnter(event, input) {
    if(event.key === 'Enter') {
        addComment(input.nextElementSibling);
    }
}

function addComment(button) {
    const box = button.closest('.comment-box');
    const input = box.querySelector('input');
    const post = button.closest('.post');

    const text = input.value.trim();

    if(!text) return;

    const comment = document.createElement('div');
    comment.className = 'comments-preview';
    comment.textContent = 'Você: ' + text;

    box.before(comment);
    input.value = '';

    const preview = post.querySelector('.comments-preview');

    if(preview) {
        preview.textContent = 'Comentários atualizados';
    }
}

/* SEGUIR */

function followPerson(button) {
    const following = button.classList.toggle('following');

    button.textContent = following ? 'Seguindo' : 'Seguir';
}

/* PUBLICAÇÃO */

function openModal() {
    document.getElementById('postModal').classList.add('show');
}

function closeModal() {
    document.getElementById('postModal').classList.remove('show');
}

function publishPost() {
    const text = document.getElementById('postText').value.trim();

    const category =
        document.getElementById('postCategory').value.trim() || 'Geral';

    if(!text) {
        showMessage('Escreva algo antes de publicar.');
        return;
    }

    const post = document.createElement('article');

    post.className = 'post';
    post.dataset.search = text.toLowerCase() + ' ' + category.toLowerCase();
    post.dataset.own = 'true';

    post.innerHTML = `
        <div class="post-header">
            <div class="post-user">
                <div class="avatar">🪐</div>
                <div>
                    <strong>Alex Morgan</strong>
                    <small>agora · ${escapeHTML(category)}</small>
                </div>
            </div>
            <button class="more">•••</button>
        </div>

        <p class="post-text"></p>

        <div class="post-actions">
            <button class="action like-action" onclick="likePost(this)">♡ <span>Curtir</span></button>
            <button class="action" onclick="focusComment(this)">◯ <span>Comentar</span></button>
            <button class="action save-action" onclick="savePost(this)">◇</button>
        </div>

        <div class="likes">0 curtidas</div>

        <div class="comment-box">
            <input placeholder="Escreva um comentário..." onkeydown="commentEnter(event,this)">
            <button onclick="addComment(this)">Enviar</button>
        </div>
    `;

    post.querySelector('.post-text').textContent = text;

    document.getElementById('posts').prepend(post);

    document.getElementById('postText').value = '';
    document.getElementById('postCategory').value = '';

    closeModal();
    changeView('feed');

    showMessage('Publicação criada com sucesso!');
}

/* PERFIL */

function renderProfile() {
    const target = document.getElementById('profilePosts');

    target.innerHTML = '';

    const ownPosts = document.querySelectorAll('.post[data-own="true"]');

    ownPosts.forEach(post => {
        target.appendChild(post.cloneNode(true));
    });

    document.getElementById('profileStats').textContent =
        ownPosts.length + ' publicações';
}

/* SALVOS */

function renderSaved() {
    const target = document.getElementById('savedPosts');

    target.innerHTML = '';

    document.querySelectorAll('.post[data-saved="true"]').forEach(post => {
        target.appendChild(post.cloneNode(true));
    });

    if(!target.children.length) {
        target.innerHTML = `
            <div class="empty-state">
                <h2>Nada por aqui ainda.</h2>
                <p>Salve publicações que você deseja rever mais tarde.</p>
            </div>
        `;
    }
}

/* EXPLORAR */

function renderExplore() {
    const target = document.getElementById('explorePosts');

    target.innerHTML = '';

    document.querySelectorAll('#posts .post').forEach(post => {
        target.appendChild(post.cloneNode(true));
    });
}

/* PESQUISA */

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();

    if(query) changeView('explore');

    const posts = document.querySelectorAll('#posts .post');

    posts.forEach(post => {
        const text = (post.dataset.search || post.innerText).toLowerCase();

        post.style.display = text.includes(query) ? '' : 'none';
    });

    if(!query) {
        posts.forEach(post => post.style.display = '');
        changeView('feed');
    }
});

/* SEGURANÇA DE TEXTO */

function escapeHTML(text) {
    return text.replace(/[&<>"']/g, function(char) {
        const map = {
            '&':'&amp;',
            '<':'&lt;',
            '>':'&gt;',
            '"':'&quot;',
            "'":'&#039;'
        };

        return map[char];
    });
}

/* MENSAGENS */

function showMessage(message) {
    let toast = document.getElementById('toast');

    if(!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';

        toast.style.cssText = `
            position:fixed;
            bottom:85px;
            left:50%;
            transform:translateX(-50%);
            background:#142e31;
            color:white;
            padding:14px 20px;
            border-radius:12px;
            font-size:13px;
            z-index:999;
            box-shadow:0 5px 25px rgba(0,0,0,.15);
        `;

        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.display = 'block';

    clearTimeout(window.toastTimeout);

    window.toastTimeout = setTimeout(() => {
        toast.style.display = 'none';
    }, 2500);
}

/* MODAL */

document.getElementById('postModal').addEventListener('click', function(event) {
    if(event.target === this) closeModal();
});

/* INICIALIZAÇÃO */

renderSaved();

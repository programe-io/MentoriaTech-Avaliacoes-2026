// ============================
// Alternar tema claro/escuro
// ============================
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

// ============================
// Curtir / descurtir postagens
// ============================
document.querySelectorAll('.like-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('liked');
        const iconEl = btn.querySelector('i');
        if (btn.classList.contains('liked')) {
            iconEl.className = 'fa-solid fa-thumbs-up';
        } else {
            iconEl.className = 'fa-regular fa-thumbs-up';
        }
    });
});

// ============================
// Enviar comentário (Enter)
// ============================
document.querySelectorAll('.comment-input input').forEach((input) => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            const post = input.closest('.post');
            const commentsArea = post.querySelector('.comments');

            const comment = document.createElement('div');
            comment.className = 'comment';
            comment.innerHTML = `
                <img class="avatar sm" src="https://i.pravatar.cc/80?img=12" alt="Você">
                <div class="comment-bubble">
                    <strong>Você</strong>
                    <p>${input.value}</p>
                </div>
            `;

            if (commentsArea) {
                commentsArea.appendChild(comment);
            } else {
                post.insertBefore(comment, input.parentElement);
            }

            input.value = '';
        }
    });
});

// ============================
// Botão "Publicar" (nova publicação)
// ============================
const newPostInput = document.querySelector('.new-post-top input');
const publishBtn = document.querySelector('.btn-primary');

publishBtn.addEventListener('click', () => {
    if (newPostInput.value.trim() === '') return;

    const feed = document.querySelector('.feed');
    const newPost = document.createElement('article');
    newPost.className = 'post';
    newPost.innerHTML = `
        <header class="post-header">
            <img class="avatar" src="https://i.pravatar.cc/80?img=12" alt="Você">
            <div class="post-author">
                <strong>Você <i class="fa-solid fa-circle-check verified"></i></strong>
                <span>agora mesmo · <i class="fa-solid fa-earth-americas"></i> Público</span>
            </div>
        </header>
        <p class="post-text">${newPostInput.value}</p>
        <div class="post-stats">
            <span><i class="fa-solid fa-thumbs-up" style="color:#1e88e5"></i> 0</span>
            <span>0 comentários</span>
        </div>
        <div class="post-actions">
            <button class="like-btn"><i class="fa-regular fa-thumbs-up"></i> Curtir</button>
            <button><i class="fa-regular fa-comment"></i> Comentar</button>
            <button><i class="fa-solid fa-share"></i> Compartilhar</button>
        </div>
    `;

    // Reanexa comportamento de curtida
    newPost.querySelector('.like-btn').addEventListener('click', (e) => {
        const b = e.currentTarget;
        b.classList.toggle('liked');
        b.querySelector('i').className = b.classList.contains('liked')
            ? 'fa-solid fa-thumbs-up'
            : 'fa-regular fa-thumbs-up';
    });

    // Insere após a área de nova publicação
    const newPostSection = document.querySelector('.new-post');
    newPostSection.insertAdjacentElement('afterend', newPost);

    newPostInput.value = '';
    newPost.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
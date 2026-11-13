document.addEventListener('DOMContentLoaded', () => {
    const headerContent = document.querySelector('.header-content');
    const navLinks = document.querySelectorAll('header nav a');
    const main = document.querySelector('main');
    const newPostSection = document.querySelector('.new-post');
    const userTextContainer = newPostSection.querySelector('.user > div:last-child');
    const placeholderSpan = userTextContainer.querySelector('span');
    const publishBtn = newPostSection.querySelector('button');

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Pesquisar no feed...';
    searchInput.className = 'js-search-input';
    headerContent.insertBefore(searchInput, document.querySelector('header nav'));

    const profileCard = document.createElement('section');
    profileCard.className = 'js-profile-card';
    profileCard.innerHTML = `
        <div class="user">
            <div class="avatar">K</div>
            <div>
                <strong>Julia Fernandes</strong>
                <span>@juliafernandes • Perfil ativo</span>
            </div>
        </div>
        <div id="js-post-counter" style="color: #bb86fc; font-weight: bold;"></div>
    `;
    main.insertBefore(profileCard, newPostSection);

    const textarea = document.createElement('textarea');
    textarea.rows = 2;
    textarea.placeholder = placeholderSpan.textContent;
    textarea.className = 'js-post-textarea';
    placeholderSpan.replaceWith(textarea);

    const toolsDiv = document.createElement('div');
    toolsDiv.className = 'js-post-tools';
    toolsDiv.innerHTML = `
        <label class="js-file-label">
            📷 Adicionar Foto
            <input type="file" accept="image/*" style="display: none;">
        </label>
        <span class="js-file-status" style="font-size: 12px; color: #888;"></span>
    `;
    userTextContainer.appendChild(toolsDiv);

    const previewImg = document.createElement('img');
    previewImg.className = 'js-preview-img';
    userTextContainer.appendChild(previewImg);

    const fileInput = toolsDiv.querySelector('input[type="file"]');
    const fileStatus = toolsDiv.querySelector('.js-file-status');
    let uploadedImageBase64 = '';

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        fileStatus.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (ev) => {
            uploadedImageBase64 = ev.target.result;
            previewImg.src = uploadedImageBase64;
            previewImg.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });

    function setupPost(postEl) {
        if (postEl.dataset.initialized) return;
        postEl.dataset.initialized = 'true';

        const header = postEl.querySelector('.post-header');
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'js-delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.title = 'Excluir publicação';
        header.appendChild(deleteBtn);

        const actions = postEl.querySelector('.post-actions');
        const buttons = actions.querySelectorAll('button');
        const likeBtn = buttons[0];
        const commentBtn = buttons[1];

        let likes = Math.floor(Math.random() * 15) + 1;
        let liked = false;
        likeBtn.textContent = `🤍 Curtir (${likes})`;

        const shareBtn = document.createElement('button');
        shareBtn.textContent = '🔗 Compartilhar';
        actions.appendChild(shareBtn);

        const commentsBox = document.createElement('div');
        commentsBox.className = 'js-comments-box';
        commentsBox.innerHTML = `
            <div class="js-comments-list"></div>
            <div class="js-comment-form">
                <input type="text" class="js-comment-input" placeholder="Escreva um comentário...">
                <button type="button">Enviar</button>
            </div>
        `;
        postEl.appendChild(commentsBox);

        const commentsList = commentsBox.querySelector('.js-comments-list');
        const commentInput = commentsBox.querySelector('.js-comment-input');
        const sendCommentBtn = commentsBox.querySelector('button');

        likeBtn.addEventListener('click', () => {
            liked = !liked;
            likes += liked ? 1 : -1;
            likeBtn.classList.toggle('liked', liked);
            likeBtn.textContent = liked ? `❤️ Curtido (${likes})` : `🤍 Curtir (${likes})`;
        });

        commentBtn.addEventListener('click', () => {
            commentsBox.classList.toggle('open');
            if (commentsBox.classList.contains('open')) commentInput.focus();
        });

        function addComment() {
            const text = commentInput.value.trim();
            if (!text) return;
            const item = document.createElement('div');
            item.className = 'js-comment-item';
            item.innerHTML = `<strong>Julia Fernandes:</strong> ${text}`;
            commentsList.appendChild(item);
            commentInput.value = '';
            const total = commentsList.children.length;
            commentBtn.textContent = `💬 Comentar (${total})`;
        }

        sendCommentBtn.addEventListener('click', addComment);
        commentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addComment();
        });

        shareBtn.addEventListener('click', () => {
            const originalText = shareBtn.textContent;
            shareBtn.textContent = '✅ Link copiado!';
            setTimeout(() => shareBtn.textContent = originalText, 2000);
        });

        deleteBtn.addEventListener('click', () => {
            postEl.remove();
            updateCounter();
        });
    }

    function updateCounter() {
        const count = document.querySelectorAll('.Post').length;
        document.getElementById('js-post-counter').textContent = `${count} publicações no feed`;
    }

    document.querySelectorAll('.Post').forEach(setupPost);
    updateCounter();

    publishBtn.addEventListener('click', () => {
        const text = textarea.value.trim();
        if (!text && !uploadedImageBase64) return;

        const article = document.createElement('article');
        article.className = 'Post';
        article.innerHTML = `
            <div class="post-header">
                <div class="avatar">K</div>
                <div>
                    <strong>julia fernandes</strong>
                    <span>Agora mesmo</span>
                </div>
            </div>
            <div class="post-text">${text}</div>
            ${uploadedImageBase64 ? `<img src="${uploadedImageBase64}" alt="imagem publicada">` : ''}
            <div class="post-actions">
                <button>Curtir</button>
                <button>Comentar</button>
            </div>
        `;

        newPostSection.insertAdjacentElement('afterend', article);
        setupPost(article);
        updateCounter();

        textarea.value = '';
        fileInput.value = '';
        fileStatus.textContent = '';
        uploadedImageBase64 = '';
        previewImg.style.display = 'none';
    });

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.Post').forEach(post => {
            const content = post.textContent.toLowerCase();
            post.style.display = content.includes(term) ? 'block' : 'none';
        });
    });

    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active-nav'));
            link.classList.add('active-nav');

            if (index === 1) {
                profileCard.classList.add('visible');
                document.querySelectorAll('.Post').forEach(post => {
                    const author = post.querySelector('.post-header strong').textContent.toLowerCase();
                    post.style.display = author.includes('julia') ? 'block' : 'none';
                });
            } else {
                profileCard.classList.remove('visible');
                document.querySelectorAll('.Post').forEach(post => {
                    post.style.display = 'block';
                });
            }
        });
    });
});
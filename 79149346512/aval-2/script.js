document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const state = {
        posts: [
            {
                id: 1,
                author: 'Ana Souza',
                handle: '@anasouza',
                avatar: 'A',
                content: 'Acabei de migrar meu feed para essa nova interface! O que acharam?',
                timestamp: '2h atrás',
                likes: 15,
                isLiked: false,
                image: 'https://images.pexels.com/photos/5050181/pexels-photo-5050181.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                comments: [{ author: 'Julia', text: 'Ficou incrível!' }]
            }
        ],
        currentTab: 'feed',
        selectedImage: null
    };

    const dom = {
        feed: document.getElementById('feed'),
        postText: document.getElementById('postText'),
        publishBtn: document.getElementById('publishBtn'),
        fileInput: document.getElementById('fileInput'),
        imagePreviewContainer: document.getElementById('imagePreviewContainer'),
        imagePreview: document.getElementById('imagePreview'),
        removeImage: document.getElementById('removeImage'),
        searchInput: document.getElementById('searchInput'),
        navBtns: document.querySelectorAll('.nav-btn'),
        profileSection: document.getElementById('profileSection'),
        postCount: document.getElementById('postCount')
    };

    const init = () => {
        renderFeed();
        setupEventListeners();
    };

    const setupEventListeners = () => {
        dom.postText.addEventListener('input', validateComposer);
        dom.fileInput.addEventListener('change', handleImageUpload);
        dom.removeImage.addEventListener('click', clearImage);
        dom.publishBtn.addEventListener('click', createPost);
        dom.searchInput.addEventListener('input', filterPosts);

        dom.navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                dom.navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.currentTab = btn.dataset.tab;
                toggleProfileView();
                renderFeed();
            });
        });
    };

    const validateComposer = () => {
        const hasText = dom.postText.value.trim().length > 0;
        const hasImage = !!state.selectedImage;
        dom.publishBtn.disabled = !(hasText || hasImage);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            state.selectedImage = ev.target.result;
            dom.imagePreview.src = state.selectedImage;
            dom.imagePreviewContainer.classList.remove('hidden');
            validateComposer();
        };
        reader.readAsDataURL(file);
    };

    const clearImage = () => {
        state.selectedImage = null;
        dom.fileInput.value = '';
        dom.imagePreviewContainer.classList.add('hidden');
        validateComposer();
    };

    const createPost = () => {
        const newPost = {
            id: Date.now(),
            author: 'Julia Fernandes',
            handle: '@juliafernandes',
            avatar: 'K',
            content: dom.postText.value.trim(),
            timestamp: 'Agora mesmo',
            likes: 0,
            isLiked: false,
            image: state.selectedImage,
            comments: []
        };

        state.posts.unshift(newPost);
        dom.postText.value = '';
        clearImage();
        renderFeed();
    };

    const toggleLike = (id) => {
        const post = state.posts.find(p => p.id === id);
        if (post) {
            post.isLiked = !post.isLiked;
            post.likes += post.isLiked ? 1 : -1;
            renderFeed();
        }
    };

    const deletePost = (id) => {
        state.posts = state.posts.filter(p => p.id !== id);
        renderFeed();
    };

    const addComment = (id, text) => {
        const post = state.posts.find(p => p.id === id);
        if (post && text.trim()) {
            post.comments.push({ author: 'Julia', text: text.trim() });
            renderFeed();
        }
    };

    const toggleProfileView = () => {
        dom.profileSection.classList.toggle('hidden', state.currentTab !== 'profile');
        dom.postCount.textContent = state.posts.filter(p => p.author === 'Julia Fernandes').length;
    };

    const filterPosts = () => {
        const term = dom.searchInput.value.toLowerCase();
        renderFeed(term);
    };

    const renderFeed = (searchTerm = '') => {
        dom.feed.innerHTML = '';
        
        const filtered = state.posts.filter(p => {
            const matchesSearch = p.content.toLowerCase().includes(searchTerm);
            const matchesTab = state.currentTab === 'feed' || (state.currentTab === 'profile' && p.author === 'Julia Fernandes');
            return matchesSearch && matchesTab;
        });

        filtered.forEach(post => {
            const article = document.createElement('article');
            article.className = 'post';
            article.innerHTML = `
                <div class="post-header">
                    <div class="post-user-info">
                        <div class="avatar">${post.avatar}</div>
                        <div>
                            <strong>${post.author}</strong>
                            <span>${post.handle} • ${post.timestamp}</span>
                        </div>
                    </div>
                    <button class="btn-delete" onclick="window.deletePost(${post.id})"><i data-lucide="trash-2"></i></button>
                </div>
                <div class="post-content">${post.content}</div>
                ${post.image ? `<img src="${post.image}" class="post-image">` : ''}
                <div class="post-footer">
                    <button class="footer-btn ${post.isLiked ? 'liked' : ''}" onclick="window.toggleLike(${post.id})">
                        <i data-lucide="heart"></i> ${post.likes}
                    </button>
                    <button class="footer-btn" onclick="window.toggleComments(${post.id})">
                        <i data-lucide="message-circle"></i> ${post.comments.length}
                    </button>
                </div>
                <div class="comments-section" id="comments-${post.id}">
                    <div class="comment-list">
                        ${post.comments.map(c => `<div class="comment-item"><strong>${c.author}:</strong> ${c.text}</div>`).join('')}
                    </div>
                    <div class="comment-input-group">
                        <input type="text" placeholder="Comentar..." id="input-${post.id}">
                        <button onclick="window.submitComment(${post.id})"><i data-lucide="send"></i></button>
                    </div>
                </div>
            `;
            dom.feed.appendChild(article);
        });
        lucide.createIcons();
    };

    window.toggleLike = toggleLike;
    window.deletePost = deletePost;
    window.toggleComments = (id) => {
        document.getElementById(`comments-${id}`).classList.toggle('open');
    };
    window.submitComment = (id) => {
        const input = document.getElementById(`input-${id}`);
        addComment(id, input.value);
        input.value = '';
    };

    init();
});
